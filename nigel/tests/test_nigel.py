"""Synthetic tests for the NIGEL engine, flows, registry, hook and Claude Code files.

No real tenants, contacts or systems. Every test builds its own temporary repo with synthetic
tenants (acme-synth, globex-synth), a synthetic active agent and a synthetic human approver.

Run:  python3 -m unittest discover -s nigel/tests -v
"""
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import unittest

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ENGINE = os.path.join(REPO, "nigel", "engine", "nigel.py")
GUARD = os.path.join(REPO, "nigel", "hooks", "guard.py")
NIGHT = "2026-09-25T22:00:00Z"


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def jread(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


class Sandbox(unittest.TestCase):
    """Temporary repo: <tmp>/nigel/{policy,flows,registry,proposals} copied from the real files."""

    def setUp(self):
        self.root = tempfile.mkdtemp(prefix="nigel-test-")
        base = os.path.join(self.root, "nigel")
        for sub in ("policy", "flows", "registry"):
            shutil.copytree(os.path.join(REPO, "nigel", sub), os.path.join(base, sub))
        os.makedirs(os.path.join(base, "proposals"))
        os.makedirs(os.path.join(self.root, ".claude", "skills", "nigel-run"))
        shutil.copy(os.path.join(REPO, ".claude", "skills", "nigel-run", "SKILL.md"),
                    os.path.join(self.root, ".claude", "skills", "nigel-run", "SKILL.md"))
        for t in ("acme", "globex"):
            os.makedirs(os.path.join(self.root, "data", t))
            with open(os.path.join(self.root, "data", t, "brief.md"), "w") as f:
                f.write("synthetic %s brief\n" % t)
        self.base, self.state = base, os.path.join(self.root, ".nigel")

        pol = self.jload("policy/policy.json")
        pol["approvers"] = ["test-owner"]
        self.jsave("policy/policy.json", pol)
        self.jsave("policy/tenants.json", {"tenants": {
            "acme-synth": {"owner": "test-owner", "data_roots": ["data/acme"]},
            "globex-synth": {"owner": "test-owner", "data_roots": ["data/globex"]}}})
        reg = self.jload("registry/agents.json")
        reg["agents"] += [
            {"agent_id": "synth-writer", "status": "active", "roles": ["executive-ops", "marketing-content"],
             "company_scope": ["acme-synth"], "version": "1.0.0", "definition": None},
            {"agent_id": "synth-sandbox", "status": "sandbox", "roles": ["executive-ops"],
             "company_scope": ["acme-synth"], "version": "0.1.0", "definition": None}]
        self.jsave("registry/agents.json", reg)

    def tearDown(self):
        shutil.rmtree(self.root, ignore_errors=True)

    def jload(self, rel):
        with open(os.path.join(self.base, rel), encoding="utf-8") as f:
            return json.load(f)

    def jsave(self, rel, data):
        with open(os.path.join(self.base, rel), "w", encoding="utf-8") as f:
            json.dump(data, f)

    def n(self, *args, actor="claude-main", now=NIGHT, env=None):
        e = dict(os.environ, NIGEL_BASE=self.base, NIGEL_STATE=self.state, NIGEL_NOW=now)
        e.update(env or {})
        r = subprocess.run([sys.executable, ENGINE, "--actor", actor] + list(args), capture_output=True, text=True, env=e)
        out = None
        for stream in (r.stdout, r.stderr):
            try:
                out = json.loads(stream)
                break
            except ValueError:
                continue
        return r.returncode, out, r.stdout + r.stderr

    def new(self, tenant="acme-synth", flow="meeting-followup", sandbox=False, key=None):
        args = ["new", "--tenant", tenant, "--project", "p", "--flow", flow, "--title", "synthetic", "--requester", "tester"]
        if sandbox:
            args.append("--sandbox")
        if key:
            args += ["--request-key", key]
        code, out, raw = self.n(*args)
        self.assertEqual(code, 0, raw)
        return out["task_id"]

    def to_phase(self, tid, upto, actor="claude-main"):
        for ph in ["intake", "scope", "plan", "execute", "verify", "confirmed_change", "close"]:
            if ph == upto:
                return
            who = "nigel-orchestrator" if ph == "verify" else actor
            code, _, raw = self.n("checkpoint", tid, ph, "--evidence", "synthetic:" + ph, "--confirm", actor=who)
            self.assertEqual(code, 0, raw)

    def task(self, tid):
        with open(os.path.join(self.state, "tasks", tid + ".json"), encoding="utf-8") as f:
            return json.load(f)

    def incidents(self):
        p = os.path.join(self.state, "incidents.jsonl")
        return [json.loads(l)["kind"] for l in read(p).splitlines()] if os.path.exists(p) else []


# ------------------------------------------------------------------ 1. agent invocation
class TestAgentInvocation(Sandbox):
    def test_active_agent_in_scope_is_routed(self):
        tid = self.new()
        code, out, raw = self.n("route", tid, "synth-writer")
        self.assertEqual(code, 0, raw)
        self.assertEqual(self.task(tid)["assignments"][0]["agent"], "synth-writer")

    def test_blueprint_only_agent_is_refused(self):
        tid = self.new()
        code, out, _ = self.n("route", tid, "sofia")
        self.assertEqual(code, 6)
        self.assertIn("proposed", out["error"])

    def test_unknown_agent_is_refused(self):
        code, out, _ = self.n("route", self.new(), "ghost-agent")
        self.assertEqual(code, 6)
        self.assertIn("not in registry", out["error"])

    def test_sandbox_agent_only_on_sandbox_task(self):
        self.assertEqual(self.n("route", self.new(), "synth-sandbox")[0], 6)
        self.assertEqual(self.n("route", self.new(sandbox=True), "synth-sandbox")[0], 0)

    def test_agent_outside_tenant_scope_is_refused_and_logged(self):
        code, _, _ = self.n("route", self.new(tenant="globex-synth"), "synth-writer")
        self.assertEqual(code, 6)
        self.assertIn("tenant.agent_out_of_scope", self.incidents())

    def test_role_mismatch_is_refused(self):
        code, out, _ = self.n("route", self.new(flow="security-assessment"), "synth-writer")
        self.assertEqual(code, 6)
        self.assertIn("roles", out["error"])

    def test_real_registry_has_no_routable_specialist(self):
        with open(os.path.join(REPO, "nigel", "registry", "agents.json"), encoding="utf-8") as f:
            reg = json.load(f)
        active = [a for a in reg["agents"] if a["status"] in ("active", "approved")]
        self.assertEqual([a["agent_id"] for a in active], ["nigel-orchestrator"], "only Nigel is activated")
        for a in active:
            self.assertEqual(a["evidence_level"], "runtime-verified", "activation needs runtime evidence")
        self.assertEqual(len(reg["agents"]), 36)

    def test_claude_code_files_are_well_formed(self):
        def front(path):
            text = read(os.path.join(REPO, path))
            m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
            self.assertIsNotNone(m, path)
            return dict(l.split(":", 1) for l in m.group(1).splitlines() if ":" in l)
        agent = front(".claude/agents/nigel-orchestrator.md")
        self.assertEqual(agent["name"].strip(), "nigel-orchestrator")
        tools = [t.strip() for t in agent["tools"].split(",")]
        self.assertEqual(set(tools), {"Read", "Grep", "Glob", "Bash"}, "Nigel must not write files")
        skill = front(".claude/skills/nigel-run/SKILL.md")
        self.assertEqual(skill["name"].strip(), "nigel-run")
        claude_md = read(os.path.join(REPO, "CLAUDE.md"))
        self.assertIn("nigel-run", claude_md)
        self.assertIn("nigel-orchestrator", claude_md)
        self.assertLess(len(claude_md.splitlines()), 40, "CLAUDE.md stays short")


# ------------------------------------------------------------------ 2. tenant isolation
class TestSpecialistAgents(Sandbox):
    def front(self, path):
        m = re.match(r"^---\n(.*?)\n---\n", read(os.path.join(REPO, path)), re.S)
        self.assertIsNotNone(m, path)
        return dict((k.strip(), v.strip()) for k, v in (l.split(":", 1) for l in m.group(1).splitlines() if ":" in l))

    def test_definition_files_match_registry(self):
        reg = jread(os.path.join(REPO, "nigel", "registry", "agents.json"))
        with_file = [a for a in reg["agents"] if a.get("definition")]
        self.assertGreaterEqual(len(with_file), 4)
        for a in with_file:
            fm = self.front(a["definition"])
            self.assertEqual(fm["name"], a["agent_id"])
            tools = {t.strip() for t in fm["tools"].split(",")}
            self.assertEqual(tools, set(a["tools_allowed"]), a["agent_id"])
            self.assertTrue(set(a["roles"]), a["agent_id"])
            if a["agent_id"] != "nigel-orchestrator":
                self.assertIn(a["status"], ("sandbox", "active"), a["agent_id"])
                text = read(os.path.join(REPO, a["definition"]))
                self.assertIn("approve", text, "prohibition on approvals must be stated")
                self.assertIn("action request", text, "external effects only via engine request")
        for a in reg["agents"]:
            if a["status"] == "proposed":
                self.assertIsNone(a.get("definition"), a["agent_id"])

    def test_sandbox_specialist_not_routable_on_real_task(self):
        reg = self.jload("registry/agents.json")
        for a in reg["agents"]:
            if a["agent_id"] == "ava":
                a["company_scope"] = ["acme-synth"]
        self.jsave("registry/agents.json", reg)
        self.assertEqual(self.n("route", self.new(flow="general-task"), "ava")[0], 6)
        self.assertEqual(self.n("route", self.new(flow="general-task", sandbox=True), "ava")[0], 0)

    def test_general_task_runs_to_done(self):
        tid = self.new(flow="general-task")
        self.to_phase(tid, "close")
        for crit, val in [("deliverable-exists", "true"), ("acceptance-met", "1"), ("claims-sourced", "1"), ("open-issues", "0")]:
            self.assertEqual(self.n("dod", tid, crit, "--value", val, "--evidence", "synthetic", actor="nigel-orchestrator")[0], 0)
        self.assertEqual(self.n("checkpoint", tid, "close", "--evidence", "x", "--confirm")[0], 0)
        self.assertEqual(self.task(tid)["status"], "done")

    def test_general_task_stops_before_external_effect(self):
        tid = self.new(flow="general-task")
        code, _, _ = self.n("action", "request", tid, "--type", "send_email", "--target", "a", "--payload", "b")
        self.assertEqual(code, 3)
        self.assertEqual(self.n("action", "request", tid, "--type", "purchase", "--target", "a", "--payload", "b")[0], 6)


class TestTenantIsolation(Sandbox):
    def test_own_context_allowed(self):
        tid = self.new()
        code, out, raw = self.n("context", tid, os.path.join(self.root, "data", "acme", "brief.md"))
        self.assertEqual(code, 0, raw)
        self.assertIn("sha256", out)

    def test_foreign_context_refused_and_logged_without_path(self):
        tid = self.new()
        code, _, _ = self.n("context", tid, os.path.join(self.root, "data", "globex", "brief.md"))
        self.assertEqual(code, 6)
        self.assertIn("tenant.cross_context", self.incidents())
        self.assertNotIn("globex/brief.md", read(os.path.join(self.state, "incidents.jsonl")))

    def test_path_traversal_refused(self):
        tid = self.new()
        code, _, _ = self.n("context", tid, os.path.join(self.root, "data", "acme", "..", "globex", "brief.md"))
        self.assertEqual(code, 6)

    def test_listing_and_reading_are_tenant_bound(self):
        a, g = self.new(), self.new(tenant="globex-synth")
        code, _, raw = self.n("list", "--tenant", "acme-synth")
        self.assertIn(a, raw)
        self.assertNotIn(g, raw)
        self.assertEqual(self.n("show", g, "--tenant", "acme-synth")[0], 6)
        self.assertIn("tenant.cross_read", self.incidents())

    def test_unknown_tenant_refused(self):
        code, _, _ = self.n("new", "--tenant", "nobody", "--project", "p", "--flow", "meeting-followup",
                            "--title", "x", "--requester", "r")
        self.assertEqual(code, 6)

    def test_real_tenants_are_owned_by_an_approver(self):
        tenants = jread(os.path.join(REPO, "nigel", "policy", "tenants.json"))["tenants"]
        pol = jread(os.path.join(REPO, "nigel", "policy", "policy.json"))
        reg = jread(os.path.join(REPO, "nigel", "registry", "agents.json"))
        self.assertTrue(tenants)
        for name, t in tenants.items():
            self.assertIn(t["owner"], pol["approvers"], name)
            self.assertTrue(t["data_roots"], name)
        for a in reg["agents"]:
            self.assertTrue(set(a.get("company_scope", [])) <= set(tenants), a["agent_id"])
        agent_ids = {a["agent_id"] for a in reg["agents"]}
        self.assertFalse(set(pol["approvers"]) & agent_ids, "approvers must be humans, not agents")


# ------------------------------------------------------------------ 3. resume after interruption
class TestResume(Sandbox):
    def test_resume_at_last_confirmed_checkpoint(self):
        tid = self.new()
        self.to_phase(tid, "execute")
        self.n("checkpoint", tid, "execute", "--evidence", "draft 1 of 3")   # saved, not confirmed
        code, out, _ = self.n("resume", tid)
        self.assertEqual(code, 0)
        self.assertEqual(out["last_confirmed"], "plan")
        self.assertEqual(out["resume_at"], "execute")
        self.assertEqual(out["saved_but_unconfirmed"], ["execute"])

    def test_confirmed_phase_is_not_repeated(self):
        tid = self.new()
        self.to_phase(tid, "scope")
        before = self.task(tid)["checkpoints"]["intake"]
        code, out, _ = self.n("checkpoint", tid, "intake", "--evidence", "again", "--confirm")
        self.assertTrue(out["already_confirmed"])
        self.assertEqual(self.task(tid)["checkpoints"]["intake"], before)

    def test_phases_cannot_be_skipped(self):
        tid = self.new()
        code, out, _ = self.n("checkpoint", tid, "verify", "--evidence", "x", "--confirm")
        self.assertEqual(code, 1)
        self.assertIn("requires", out["error"])

    def test_crash_mid_write_keeps_last_confirmed_state(self):
        tid = self.new()
        self.to_phase(tid, "execute")
        code, _, _ = self.n("checkpoint", tid, "execute", "--evidence", "x", "--confirm",
                            env={"NIGEL_TEST_CRASH_BEFORE_REPLACE": "1"})
        self.assertEqual(code, 9, "simulated crash")
        os.remove(os.path.join(self.state, ".lock"))          # crashed process left its lock
        code, out, _ = self.n("resume", tid)                  # task file still valid JSON
        self.assertEqual(out["last_confirmed"], "plan")
        self.assertEqual(out["resume_at"], "execute")
        self.assertEqual(self.n("checkpoint", tid, "execute", "--evidence", "x", "--confirm")[0], 0)

    def test_same_request_does_not_create_second_task(self):
        a = self.new(key="mail-4711")
        code, out, _ = self.n("new", "--tenant", "acme-synth", "--project", "p", "--flow", "meeting-followup",
                              "--title", "x", "--requester", "r", "--request-key", "mail-4711")
        self.assertEqual(out["task_id"], a)
        self.assertTrue(out["duplicate_request"])
        self.assertEqual(len(os.listdir(os.path.join(self.state, "tasks"))), 1)


# ------------------------------------------------------------------ 4. approval stop and idempotency
class TestApprovalStop(Sandbox):
    def request(self, tid, payload="Hallo"):
        return self.n("action", "request", tid, "--type", "send_email", "--target", "x@example.invalid", "--payload", payload)

    def test_external_action_stops_without_approval(self):
        tid = self.new()
        self.to_phase(tid, "execute")
        code, out, _ = self.request(tid)
        self.assertEqual(code, 3)
        self.assertFalse(out["execute"])
        self.assertEqual(self.task(tid)["status"], "awaiting_approval")

    def test_agents_and_unknown_humans_cannot_approve(self):
        tid = self.new()
        _, out, _ = self.request(tid)
        self.assertEqual(self.n("approve", tid, "--key", out["key"], "--by", "nigel-orchestrator")[0], 6)
        self.assertEqual(self.n("approve", tid, "--key", out["key"], "--by", "claude-main")[0], 6)
        self.assertEqual(self.n("approve", tid, "--key", out["key"], "--by", "someone")[0], 6)
        self.assertEqual(self.incidents().count("approval.unauthorized"), 3)

    def test_approved_action_runs_exactly_once(self):
        tid = self.new()
        _, out, _ = self.request(tid)
        key = out["key"]
        self.assertEqual(self.n("approve", tid, "--key", key, "--by", "test-owner")[0], 0)
        code, out, _ = self.request(tid)
        self.assertEqual((code, out["execute"]), (0, True))
        self.assertEqual(self.n("action", "commit", tid, key, "--evidence", "msg-id-1")[0], 0)
        code, out, _ = self.request(tid)            # retry after success
        self.assertEqual((code, out["duplicate"], out["execute"]), (0, True, False))

    def test_changed_content_needs_new_approval(self):
        tid = self.new()
        _, out, _ = self.request(tid, "Version A")
        self.n("approve", tid, "--key", out["key"], "--by", "test-owner")
        code, _, _ = self.request(tid, "Version B")
        self.assertEqual(code, 3)

    def test_in_doubt_action_is_never_repeated(self):
        tid = self.new()
        _, out, _ = self.request(tid)
        key = out["key"]
        self.n("approve", tid, "--key", key, "--by", "test-owner")
        self.request(tid)                             # reserved, then "crash" before commit
        code, out, _ = self.n("resume", tid)
        self.assertEqual(code, 4)
        self.assertEqual(out["actions_in_doubt"], [key])
        self.assertEqual(self.request(tid)[0], 4)
        self.assertEqual(self.n("action", "reconcile", tid, key, "--outcome", "executed")[0], 6)
        self.assertEqual(self.n("action", "reconcile", tid, key, "--outcome", "executed", actor="test-owner")[0], 0)
        self.assertTrue(self.request(tid)[1]["duplicate"])

    def test_open_action_blocks_confirmed_change(self):
        tid = self.new()
        self.to_phase(tid, "confirmed_change")
        _, out, _ = self.request(tid)
        self.n("approve", tid, "--key", out["key"], "--by", "test-owner")
        code, out, _ = self.n("checkpoint", tid, "confirmed_change", "--evidence", "x", "--confirm")
        self.assertEqual(code, 1)
        self.assertIn("open external actions", out["error"])

    def test_phase_gate_blocks_security_testing_until_authorised(self):
        tid = self.new(flow="security-assessment")
        self.to_phase(tid, "execute")
        code, out, _ = self.n("checkpoint", tid, "execute", "--evidence", "scan")
        self.assertEqual(code, 3)
        self.assertEqual(out["gates"], ["written-authorization"])
        self.n("approve", tid, "--gate", "written-authorization", "--by", "test-owner")
        self.assertEqual(self.n("checkpoint", tid, "execute", "--evidence", "scan")[0], 0)

    def test_forbidden_action_type_refused(self):
        tid = self.new(flow="meeting-followup")
        code, _, _ = self.n("action", "request", tid, "--type", "purchase", "--target", "shop", "--payload", "x")
        self.assertEqual(code, 6)

    def test_verify_must_be_independent(self):
        tid = self.new()
        self.to_phase(tid, "verify")
        code, out, _ = self.n("checkpoint", tid, "verify", "--evidence", "self check", "--confirm")
        self.assertEqual(code, 6)

    def test_close_requires_definition_of_done(self):
        tid = self.new()
        self.to_phase(tid, "close")
        code, out, _ = self.n("checkpoint", tid, "close", "--evidence", "x", "--confirm")
        self.assertEqual(code, 1)
        self.assertIn("Definition of Done", out["error"])


# ------------------------------------------------------------------ 5. bounded retries
class TestBoundedRetries(Sandbox):
    def test_escalates_after_retry_limit(self):
        tid = self.new()
        self.to_phase(tid, "execute")
        self.assertEqual(self.n("fail", tid, "--reason", "timeout")[0], 0)
        self.assertEqual(self.n("fail", tid, "--reason", "timeout")[0], 0)
        code, out, _ = self.n("fail", tid, "--reason", "timeout")
        self.assertEqual(code, 5)
        self.assertTrue(out["escalated"])
        t = self.task(tid)
        self.assertEqual(t["status"], "failed")
        self.assertEqual(t["next_action"], "human escalation")
        self.assertEqual(self.n("checkpoint", tid, "execute", "--evidence", "x")[0], 1)

    def test_flow_specific_lower_limit(self):
        tid = self.new(flow="security-assessment")
        self.assertEqual(self.n("fail", tid, "--reason", "x")[0], 0)
        self.assertEqual(self.n("fail", tid, "--reason", "x")[0], 5)


# ------------------------------------------------------------------ 6. night run
class TestNightRun(Sandbox):
    def test_night_selection_budget_and_stop(self):
        eligible = []
        for _ in range(3):
            t = self.new()
            self.to_phase(t, "execute")
            eligible.append(t)
        waiting = self.new()
        self.to_phase(waiting, "execute")
        self.n("action", "request", waiting, "--type", "send_email", "--target", "a", "--payload", "b")
        sec = self.new(flow="security-assessment")
        self.to_phase(sec, "execute")

        code, run, raw = self.n("night", "plan", "--date", "2026-09-25", "--max-tasks", "2", "--max-minutes", "500")
        self.assertEqual(code, 0, raw)
        self.assertEqual(run["max_minutes"], 60, "capped by policy")
        self.assertEqual(len(run["tasks"]), 2)
        reasons = {s["task_id"]: s["reason"] for s in run["skipped"]}
        self.assertEqual(reasons[waiting], "awaiting approval")
        self.assertIn("not allowed at night", reasons[sec])
        self.assertEqual(list(reasons.values()).count("task limit reached"), 1)

        self.assertEqual(self.n("night", "plan", "--date", "2026-09-25")[0], 5, "one run per night")
        picked = run["tasks"][0]["task_id"]
        self.assertEqual(self.n("night", "check", "--date", "2026-09-25", "--task-id", picked)[0], 0)
        self.assertEqual(self.n("night", "check", "--date", "2026-09-25", "--task-id", sec)[0], 5)
        self.assertEqual(self.n("night", "check", "--date", "2026-09-25", now="2026-09-25T23:00:01Z")[0], 5)

    def test_no_external_actions_at_night_even_if_approved(self):
        tid = self.new()
        _, out, _ = self.n("action", "request", tid, "--type", "send_email", "--target", "a", "--payload", "b")
        self.n("approve", tid, "--key", out["key"], "--by", "test-owner")
        self.n("night", "plan", "--date", "2026-09-25")
        code, out, _ = self.n("action", "request", tid, "--type", "send_email", "--target", "a", "--payload", "b")
        self.assertEqual(code, 3)
        self.assertIn("night", out["reason"])

    def test_morning_report(self):
        tid = self.new()
        self.to_phase(tid, "execute")
        self.n("night", "plan", "--date", "2026-09-25")
        code, _, raw = self.n("night", "report", "--date", "2026-09-25")
        self.assertEqual(code, 0)
        path = os.path.join(self.state, "night", "2026-09-25-report.md")
        text = read(path)
        self.assertIn(tid, text)
        self.assertIn("Externe Aktionen im Nachtlauf: keine erlaubt.", text)
        self.assertEqual(self.n("night", "check", "--date", "2026-09-25")[0], 5, "closed run stops")


# ------------------------------------------------------------------ 7. learning workflow
class TestLearning(Sandbox):
    def done_task(self):
        tid = self.new(flow="night-run")
        self.to_phase(tid, "close")
        for crit, val in [("within-time", "42"), ("within-tasks", "3"), ("no-external-actions", "0"), ("report-written", "true")]:
            self.assertEqual(self.n("dod", tid, crit, "--value", val, "--evidence", "synthetic", actor="nigel-orchestrator")[0], 0)
        self.assertEqual(self.n("checkpoint", tid, "close", "--evidence", "report", "--confirm")[0], 0)
        self.assertEqual(self.task(tid)["status"], "done")
        return tid

    def change(self, text):
        p = os.path.join(self.root, "change.txt")
        with open(p, "w", encoding="utf-8") as f:
            f.write(text)
        return p

    def propose(self, tid, kind, target, text, actor="claude-main"):
        return self.n("learn", "propose", "--task-id", tid, "--kind", kind, "--target", target,
                      "--change-file", self.change(text), "--rationale", "synthetic", actor=actor)

    def test_only_completed_tasks(self):
        tid = self.new()
        self.assertEqual(self.propose(tid, "file", "nigel/notes/x.md", "x")[0], 1)

    def test_permissions_and_security_are_not_self_editable(self):
        tid = self.done_task()
        self.assertEqual(self.propose(tid, "registry", "nigel-orchestrator", json.dumps({"tools_allowed": ["Write"]}))[0], 6)
        self.assertEqual(self.propose(tid, "registry", "ava", json.dumps({"status": "active"}))[0], 6)
        self.assertEqual(self.propose(tid, "file", "nigel/policy/policy.json", "{}")[0], 6)
        self.assertEqual(self.propose(tid, "file", ".claude/settings.json", "{}")[0], 6)
        skill = read(os.path.join(self.root, ".claude/skills/nigel-run/SKILL.md"))
        widened = skill.replace("description:", "allowed-tools: Bash(*)\ndescription:", 1)
        self.assertEqual(self.propose(tid, "file", ".claude/skills/nigel-run/SKILL.md", widened)[0], 6)
        self.assertGreaterEqual(len(self.incidents()), 5)

    def test_full_cycle_review_test_version(self):
        tid = self.done_task()
        target = ".claude/skills/nigel-run/SKILL.md"
        new_text = read(os.path.join(self.root, target)) + "\n## Erkenntnis\n\nSynthetisch.\n"
        code, out, raw = self.propose(tid, "file", target, new_text)
        self.assertEqual(code, 0, raw)
        pid = out["proposal_id"]

        self.assertEqual(self.n("learn", "apply", pid, "--version", "1.1.0", "--by", "test-owner")[0], 1, "no review yet")
        self.assertEqual(self.n("learn", "review", pid, "--by", "claude-main", "--verdict", "approve")[0], 6, "proposer")
        self.assertEqual(self.n("learn", "review", pid, "--by", "nigel-orchestrator", "--verdict", "approve")[0], 6, "executor")
        self.assertEqual(self.n("learn", "review", pid, "--by", "independent-reviewer", "--verdict", "approve")[0], 0)
        self.assertEqual(self.n("learn", "apply", pid, "--version", "1.1.0", "--by", "test-owner")[0], 1, "no tests yet")
        self.assertEqual(self.n("learn", "test", pid, "--command", "exit 1")[0], 1)
        self.assertEqual(self.n("learn", "apply", pid, "--version", "1.1.0", "--by", "test-owner")[0], 1, "failed test")
        self.assertEqual(self.n("learn", "test", pid, "--command", "exit 0")[0], 0)
        self.assertEqual(self.n("learn", "apply", pid, "--version", "1.0.0", "--by", "test-owner")[0], 1, "no version bump")
        self.assertEqual(self.n("learn", "apply", pid, "--version", "1.1.0", "--by", "test-owner")[0], 0)

        self.assertIn("Synthetisch.", read(os.path.join(self.root, target)))
        entry = [f for f in self.jload("registry/skills.json")["files"] if f["path"] == target][0]
        self.assertEqual(entry["version"], "1.1.0")
        self.assertEqual(entry["changelog"][-1]["proposal"], pid)

    def test_registry_learning_on_allowed_field(self):
        tid = self.done_task()
        code, out, _ = self.propose(tid, "registry", "synth-writer", json.dumps({"training_completed": ["safety-101"]}))
        pid = out["proposal_id"]
        self.n("learn", "review", pid, "--by", "independent-reviewer", "--verdict", "approve")
        self.n("learn", "test", pid, "--command", "exit 0")
        self.assertEqual(self.n("learn", "apply", pid, "--version", "1.0.1", "--by", "test-owner")[0], 0)
        ag = [a for a in self.jload("registry/agents.json")["agents"] if a["agent_id"] == "synth-writer"][0]
        self.assertEqual((ag["version"], ag["training_completed"], ag["status"]), ("1.0.1", ["safety-101"], "active"))


# ------------------------------------------------------------------ 8. audit trail
class TestLedger(Sandbox):
    def test_hash_chain_detects_tampering(self):
        tid = self.new()
        self.to_phase(tid, "execute")
        self.assertEqual(self.n("ledger", "verify")[1]["ledger_ok"], True)
        p = os.path.join(self.state, "ledger.jsonl")
        lines = read(p).splitlines()
        e = json.loads(lines[1]); e["actor"] = "someone-else"; lines[1] = json.dumps(e)
        with open(p, "w", encoding="utf-8") as f:
            f.write("\n".join(lines) + "\n")
        code, out, _ = self.n("ledger", "verify")
        self.assertEqual((code, out["ledger_ok"], out["first_bad_line"]), (1, False, 2))

    def test_ledger_holds_no_payload(self):
        tid = self.new()
        self.n("action", "request", tid, "--type", "send_email", "--target", "ceo@example.invalid", "--payload", "GEHEIMER INHALT")
        text = read(os.path.join(self.state, "ledger.jsonl")) + json.dumps(self.task(tid))
        self.assertNotIn("GEHEIMER INHALT", text)
        self.assertNotIn("ceo@example.invalid", text)


# ------------------------------------------------------------------ 9. guard hook (outside the model)
class TestGuardHook(unittest.TestCase):
    def run_hook(self, tool, tool_input, raw=None):
        data = raw if raw is not None else json.dumps({"tool_name": tool, "tool_input": tool_input, "cwd": REPO})
        r = subprocess.run([sys.executable, GUARD], input=data, capture_output=True, text=True,
                           env=dict(os.environ, CLAUDE_PROJECT_DIR=REPO))
        return r.returncode

    def test_blocks(self):
        cases = [
            ("Bash", {"command": "python3 nigel/engine/nigel.py approve NGL-1 --key k --by leila"}),
            ("Bash", {"command": "python3 ./nigel/engine/nigel.py --actor x action reconcile NGL-1 k --outcome executed"}),
            ("Bash", {"command": "sed -i 's/\"approvers\": \\[\\]/x/' nigel/policy/policy.json"}),
            ("Bash", {"command": "echo '{}' > .claude/settings.json"}),
            ("Bash", {"command": "rm -rf .nigel/tasks"}),
            ("Edit", {"file_path": os.path.join(REPO, ".claude/settings.json")}),
            ("Write", {"file_path": os.path.join(REPO, "nigel/policy/tenants.json")}),
            ("Edit", {"file_path": os.path.join(REPO, ".claude/agents/nigel-orchestrator.md")}),
            ("Write", {"file_path": os.path.join(REPO, ".claude/skills/nigel-run/SKILL.md")}),
            ("Edit", {"file_path": "nigel/registry/agents.json"}),
            ("Edit", {"file_path": os.path.join(REPO, "nigel/hooks/guard.py")}),
            # v1.1: disguised approvals and indirect writes
            ("Bash", {"command": "python3 nigel/engine/nigel.py --actor=x approve NGL-1 --key k --by LWE"}),
            ("Bash", {"command": "python3 nigel/engine/nigel.py \"approve\" NGL-1 --key k --by LWE"}),
            ("Bash", {"command": "ls; python3 nigel/engine/nigel.py approve NGL-1 --gate g --by LWE"}),
            ("Bash", {"command": "cd nigel/policy && rm policy.json"}),
            ("Bash", {"command": "Set-Content -Path nigel\\policy\\policy.json -Value x"}),
        ]
        for tool, inp in cases:
            self.assertEqual(self.run_hook(tool, inp), 2, inp)

    def test_allows(self):
        cases = [
            ("Bash", {"command": "cat nigel/policy/policy.json"}),
            ("Bash", {"command": "python3 nigel/engine/nigel.py checkpoint NGL-1 execute --evidence x 2>&1"}),
            ("Bash", {"command": "python3 nigel/engine/nigel.py learn propose --target .claude/skills/nigel-run/SKILL.md --change-file /tmp/c"}),
            ("Bash", {"command": "git add nigel/registry && git status"}),
            ("Write", {"file_path": os.path.join(REPO, "linkedin/posts/neu.md")}),
            ("Read", {"file_path": os.path.join(REPO, "nigel/policy/policy.json")}),
            # v1.1: free text in quotes and redirects to other targets are no longer false alarms
            ("Bash", {"command": "python3 nigel/engine/nigel.py checkpoint NGL-1 intake --evidence \"Selbstfreigabe (approve) abgelehnt\" --confirm"}),
            ("Bash", {"command": "python3 nigel/engine/nigel.py checkpoint NGL-1 plan --evidence \"brief -> agenda\" --confirm"}),
            ("Bash", {"command": "python3 nigel/engine/nigel.py show NGL-1 > /tmp/task.json"}),
        ]
        for tool, inp in cases:
            self.assertEqual(self.run_hook(tool, inp), 0, inp)

    def test_fails_closed(self):
        self.assertEqual(self.run_hook(None, None, raw="not json"), 2)


# ------------------------------------------------------------------ 10. flow definitions
class TestFlows(unittest.TestCase):
    def test_five_flows_measurable(self):
        folder = os.path.join(REPO, "nigel", "flows")
        pol = jread(os.path.join(REPO, "nigel", "policy", "policy.json"))
        phase_ids = [p["id"] for p in pol["checkpoints"]]
        flows = {f[:-5]: jread(os.path.join(folder, f)) for f in os.listdir(folder)}
        self.assertEqual(set(flows), {"meeting-followup", "linkedin-lead", "lead-offer", "security-assessment", "night-run",
                                      "general-task"})
        for fid, fl in flows.items():
            self.assertTrue(fl["dod"], fid)
            for c in fl["dod"]:
                self.assertIn(c["op"], (">=", "<=", "=="), (fid, c["id"]))
                self.assertIsInstance(c["target"], (int, float, bool), (fid, c["id"]))
                self.assertTrue(c["evidence"], (fid, c["id"]))
            for s in fl["steps"]:
                self.assertIn(s["phase"], phase_ids, (fid, s["id"]))
                self.assertIn(s["role"], fl["roles"], (fid, s["id"]))
            for g in fl["approval_gates"]:
                self.assertTrue(g.get("before_phase") in phase_ids or g.get("action_types"), (fid, g["gate_id"]))
            used = {t for g in fl["approval_gates"] for t in g.get("action_types", [])}
            self.assertFalse(used & set(fl["forbidden_action_types"]), fid)
        self.assertEqual(set(flows["night-run"]["forbidden_action_types"]), set(pol["external_action_types"]))


if __name__ == "__main__":
    unittest.main()
