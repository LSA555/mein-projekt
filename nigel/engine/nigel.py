#!/usr/bin/env python3
"""NIGEL task engine: task ledger, checkpoints, approvals, idempotent external actions,
tenant isolation, bounded retries, bounded night runs and the learning workflow.

The engine does no AI work itself. Claude (main session, Nigel, specialist agents) does the
work and records every step here. The engine enforces order, gates and limits.

Paths:
  NIGEL_BASE   folder with policy/, registry/, flows/, proposals/  (default: nigel/ next to engine/)
  NIGEL_STATE  folder for live state: tasks, ledger, outbox       (default: <repo>/.nigel)
  NIGEL_NOW    ISO timestamp to fake the clock (tests only)

Exit codes: 0 ok · 1 usage/validation error · 3 stopped for approval · 4 action in doubt
            5 limit reached (retries, night budget, lock) · 6 refused (isolation/protection)
"""
import argparse
import datetime as dt
import hashlib
import json
import os
import re
import subprocess
import sys
import time
import uuid

ENGINE_VERSION = "1.0.0"
EXIT_OK, EXIT_ERR, EXIT_APPROVAL, EXIT_DOUBT, EXIT_LIMIT, EXIT_REFUSED = 0, 1, 3, 4, 5, 6
FINAL_STATES = ("done", "cancelled", "failed")

HERE = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.abspath(os.environ.get("NIGEL_BASE", os.path.dirname(HERE)))
REPO = os.path.dirname(BASE) if os.path.basename(BASE) == "nigel" else BASE
STATE = os.path.abspath(os.environ.get("NIGEL_STATE", os.path.join(REPO, ".nigel")))


class NigelError(Exception):
    def __init__(self, msg, code=EXIT_ERR):
        super().__init__(msg)
        self.code = code


# ------------------------------------------------------------------ helpers
def now():
    fake = os.environ.get("NIGEL_NOW")
    if fake:
        return dt.datetime.fromisoformat(fake.replace("Z", "+00:00"))
    return dt.datetime.now(dt.timezone.utc)


def iso(t=None):
    return (t or now()).strftime("%Y-%m-%dT%H:%M:%SZ")


def sha(text):
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def read_json(path, default=None):
    if not os.path.exists(path):
        if default is not None:
            return default
        raise NigelError("missing file: %s" % path)
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def write_json(path, data):
    """Atomic write: a crash leaves either the old or the new file, never half of one."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    tmp = "%s.%s.tmp" % (path, uuid.uuid4().hex[:8])
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.flush()
        os.fsync(f.fileno())
    if os.environ.get("NIGEL_TEST_CRASH_BEFORE_REPLACE"):   # test hook: simulate power loss mid-write
        os._exit(9)
    os.replace(tmp, path)


class Lock:
    """Single-writer lock on the state folder, so parallel sessions cannot interleave writes."""

    def __init__(self, timeout=10.0, stale=120.0):
        self.path = os.path.join(STATE, ".lock")
        self.timeout, self.stale = timeout, stale

    def __enter__(self):
        os.makedirs(STATE, exist_ok=True)
        start = time.time()
        while True:
            try:
                fd = os.open(self.path, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
                os.write(fd, str(os.getpid()).encode())
                os.close(fd)
                return self
            except FileExistsError:
                try:
                    if time.time() - os.path.getmtime(self.path) > self.stale:
                        os.remove(self.path)
                        continue
                except FileNotFoundError:
                    continue
                if time.time() - start > self.timeout:
                    raise NigelError("state is locked by another process: %s" % self.path, EXIT_LIMIT)
                time.sleep(0.05)

    def __exit__(self, *exc):
        try:
            os.remove(self.path)
        except FileNotFoundError:
            pass


# ------------------------------------------------------------------ configuration
def policy():
    return read_json(os.path.join(BASE, "policy", "policy.json"))


def tenants():
    return read_json(os.path.join(BASE, "policy", "tenants.json")).get("tenants", {})


def registry():
    return read_json(os.path.join(BASE, "registry", "agents.json"))


def skills_registry():
    return read_json(os.path.join(BASE, "registry", "skills.json"))


def flow(flow_id):
    path = os.path.join(BASE, "flows", flow_id + ".json")
    if not os.path.exists(path):
        raise NigelError("unknown flow: %s" % flow_id)
    return read_json(path)


def phases():
    return [p["id"] for p in policy()["checkpoints"]]


# ------------------------------------------------------------------ ledger (hash chained)
def ledger(task, actor, action, detail=None):
    path = os.path.join(STATE, "ledger.jsonl")
    prev, seq = "0" * 64, 0
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            lines = [l for l in f.read().splitlines() if l.strip()]
        if lines:
            last = json.loads(lines[-1])
            prev, seq = last["hash"], last["seq"]
    entry = {
        "seq": seq + 1, "ts": iso(), "task_id": task.get("task_id") if task else None,
        "tenant": task.get("tenant") if task else None, "actor": actor, "action": action,
        "detail": detail or {}, "engine": ENGINE_VERSION, "prev_hash": prev,
    }
    entry["hash"] = sha(prev + json.dumps(entry, sort_keys=True, ensure_ascii=False))
    with open(path, "a", encoding="utf-8") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")
        f.flush()
        os.fsync(f.fileno())
    return entry


def incident(task, actor, kind, detail):
    ledger(task, actor, "incident", dict(detail, kind=kind))
    with open(os.path.join(STATE, "incidents.jsonl"), "a", encoding="utf-8") as f:
        f.write(json.dumps({"ts": iso(), "kind": kind, "actor": actor,
                            "task_id": task.get("task_id") if task else None, "detail": detail},
                           ensure_ascii=False) + "\n")


def verify_ledger():
    path = os.path.join(STATE, "ledger.jsonl")
    prev, count = "0" * 64, 0
    if not os.path.exists(path):
        return True, 0, None
    with open(path, encoding="utf-8") as f:
        for n, line in enumerate(f, 1):
            if not line.strip():
                continue
            e = json.loads(line)
            h = e.pop("hash")
            if e["prev_hash"] != prev or sha(prev + json.dumps(e, sort_keys=True, ensure_ascii=False)) != h:
                return False, count, n
            prev, count = h, count + 1
    return True, count, None


# ------------------------------------------------------------------ task storage
def task_path(task_id):
    if not re.match(r"^NGL-\d{8}-[0-9a-f]{6}$", task_id):
        raise NigelError("invalid task id: %s" % task_id)
    return os.path.join(STATE, "tasks", task_id + ".json")


def load(task_id):
    p = task_path(task_id)
    if not os.path.exists(p):
        raise NigelError("unknown task: %s" % task_id)
    return read_json(p)


def save(task):
    task["updated_at"] = iso()
    write_json(task_path(task["task_id"]), task)


def all_tasks():
    folder = os.path.join(STATE, "tasks")
    if not os.path.isdir(folder):
        return []
    return [read_json(os.path.join(folder, n)) for n in sorted(os.listdir(folder)) if n.endswith(".json")]


def last_confirmed(task):
    last = None
    for p in phases():
        if task["checkpoints"][p]["status"] == "confirmed":
            last = p
        else:
            break
    return last


def next_phase(task):
    for p in phases():
        if task["checkpoints"][p]["status"] != "confirmed":
            return p
    return None


def pending_gates(task, before_phase):
    fl = flow(task["flow"])
    return [g["gate_id"] for g in fl.get("approval_gates", [])
            if g.get("before_phase") == before_phase and g["gate_id"] not in task["gate_approvals"]]


def night_active():
    folder = os.path.join(STATE, "night")
    if not os.path.isdir(folder):
        return None
    for n in os.listdir(folder):
        if n.endswith(".json"):
            run = read_json(os.path.join(folder, n))
            if run.get("status") == "running" and now() < dt.datetime.fromisoformat(run["ends_at"].replace("Z", "+00:00")):
                return run
    return None


# ------------------------------------------------------------------ commands: tasks
def cmd_new(a):
    pol, tn = policy(), tenants()
    if a.tenant not in tn:
        raise NigelError("unknown tenant '%s' (define it in policy/tenants.json)" % a.tenant, EXIT_REFUSED)
    fl = flow(a.flow)
    for t in all_tasks():   # intake idempotency: same request key returns the existing task
        if a.request_key and t.get("request_key") == a.request_key and t["tenant"] == a.tenant:
            print(json.dumps({"task_id": t["task_id"], "duplicate_request": True}))
            return EXIT_OK
    task_id = "NGL-%s-%s" % (now().strftime("%Y%m%d"), uuid.uuid4().hex[:6])
    budget = dict(pol["defaults"]["budget"])
    budget.update(fl.get("budget", {}))
    task = {
        "task_id": task_id, "request_key": a.request_key, "title": a.title, "tenant": a.tenant,
        "project": a.project, "flow": a.flow, "flow_version": fl["version"], "requester": a.requester,
        "owner": a.owner or tn[a.tenant].get("owner"), "sandbox": bool(a.sandbox), "due": a.due,
        "status": "open", "created_at": iso(), "updated_at": iso(),
        "checkpoints": {p: {"status": "pending", "evidence": [], "actor": None, "at": None} for p in phases()},
        "dod": {c["id"]: {"met": False, "value": None, "evidence": None} for c in fl["dod"]},
        "budget": budget, "attempts": {}, "assignments": [], "context": [],
        "gate_approvals": {}, "actions": {}, "failure_reason": None, "next_action": "intake",
    }
    with Lock():
        save(task)
        ledger(task, a.actor, "task.created", {"flow": a.flow, "sandbox": task["sandbox"]})
    print(json.dumps({"task_id": task_id}))
    return EXIT_OK


def cmd_show(a):
    t = load(a.task_id)
    if a.tenant and t["tenant"] != a.tenant:
        incident(t, a.actor, "tenant.cross_read", {"requested_tenant": a.tenant})
        raise NigelError("task belongs to another tenant", EXIT_REFUSED)
    print(json.dumps(t, ensure_ascii=False, indent=2))
    return EXIT_OK


def cmd_list(a):
    rows = [t for t in all_tasks() if t["tenant"] == a.tenant]
    if a.open:
        rows = [t for t in rows if t["status"] not in FINAL_STATES]
    for t in rows:
        print("%s  %-18s %-22s next=%-16s %s" % (t["task_id"], t["status"], t["flow"], next_phase(t) or "-", t["title"]))
    return EXIT_OK


def cmd_resume(a):
    t = load(a.task_id)
    in_doubt = [k for k, v in t["actions"].items() if v["state"] == "reserved"]
    out = {
        "task_id": t["task_id"], "status": t["status"], "last_confirmed": last_confirmed(t),
        "resume_at": next_phase(t), "saved_but_unconfirmed": [p for p in phases() if t["checkpoints"][p]["status"] == "saved"],
        "actions_in_doubt": in_doubt, "awaiting_approval": [k for k, v in t["actions"].items() if v["state"] == "awaiting_approval"],
        "pending_gates": pending_gates(t, next_phase(t)) if next_phase(t) else [],
        "instruction": "Continue at resume_at. Do NOT repeat confirmed phases.",
    }
    if in_doubt:
        out["instruction"] = ("External action(s) in doubt: reserved but not committed. Do NOT execute again. "
                              "Check the target system, then a human runs: action reconcile.")
    print(json.dumps(out, ensure_ascii=False, indent=2))
    return EXIT_DOUBT if in_doubt else EXIT_OK


def cmd_checkpoint(a):
    with Lock():
        t = load(a.task_id)
        if t["status"] in FINAL_STATES:
            raise NigelError("task is %s" % t["status"])
        ph = phases()
        if a.phase not in ph:
            raise NigelError("unknown phase %s (valid: %s)" % (a.phase, ", ".join(ph)))
        idx = ph.index(a.phase)
        cp = t["checkpoints"][a.phase]
        if cp["status"] == "confirmed":
            print(json.dumps({"task_id": t["task_id"], "phase": a.phase, "already_confirmed": True}))
            return EXIT_OK
        if idx > 0 and t["checkpoints"][ph[idx - 1]]["status"] != "confirmed":
            raise NigelError("phase %s requires %s to be confirmed first" % (a.phase, ph[idx - 1]))

        gates = pending_gates(t, a.phase)
        if gates:
            t["status"] = "awaiting_approval"
            t["next_action"] = "human approval of gate(s): " + ", ".join(gates)
            save(t)
            ledger(t, a.actor, "gate.stop", {"phase": a.phase, "gates": gates})
            print(json.dumps({"stopped": "approval", "gates": gates}))
            return EXIT_APPROVAL

        if a.evidence:
            cp["evidence"].extend(a.evidence)
        cp["actor"] = cp["actor"] or a.actor
        cp["status"] = "saved"
        cp["at"] = iso()

        if a.confirm:
            if not cp["evidence"]:
                raise NigelError("confirm needs at least one --evidence")
            if a.phase == "verify":
                executor = t["checkpoints"]["execute"]["actor"]
                if a.actor == executor:
                    raise NigelError("verify must be done by someone other than the executor (%s)" % executor, EXIT_REFUSED)
            if a.phase == "confirmed_change":
                open_actions = [k for k, v in t["actions"].items() if v["state"] in ("reserved", "awaiting_approval", "approved")]
                if open_actions:
                    raise NigelError("open external actions: %s" % ", ".join(open_actions))
            if a.phase == "close":
                missing = [k for k, v in t["dod"].items() if not v["met"]]
                if missing:
                    raise NigelError("Definition of Done not met: %s" % ", ".join(missing))
            cp["status"] = "confirmed"
            cp["confirmed_by"] = a.actor
            t["attempts"].pop(a.phase, None)

        t["status"] = "done" if t["checkpoints"]["close"]["status"] == "confirmed" else "in_progress"
        t["next_action"] = next_phase(t) or "none"
        save(t)
        ledger(t, a.actor, "checkpoint." + cp["status"], {"phase": a.phase, "evidence_count": len(cp["evidence"])})
    print(json.dumps({"task_id": t["task_id"], "phase": a.phase, "status": cp["status"], "task_status": t["status"]}))
    return EXIT_OK


def cmd_fail(a):
    with Lock():
        t = load(a.task_id)
        ph = next_phase(t)
        n = t["attempts"].get(ph, 0) + 1
        t["attempts"][ph] = n
        limit = t["budget"]["retry_limit"]
        if n > limit:
            t["status"] = "failed"
            t["failure_reason"] = "%s failed %d times (limit %d): %s" % (ph, n, limit, a.reason)
            t["next_action"] = "human escalation"
            save(t)
            ledger(t, a.actor, "task.escalated", {"phase": ph, "attempts": n})
            print(json.dumps({"escalated": True, "phase": ph, "attempts": n}))
            return EXIT_LIMIT
        save(t)
        ledger(t, a.actor, "attempt.failed", {"phase": ph, "attempt": n, "reason": a.reason[:200]})
    print(json.dumps({"retry_allowed": True, "phase": ph, "attempt": n, "remaining": limit - n}))
    return EXIT_OK


def cmd_dod(a):
    with Lock():
        t = load(a.task_id)
        crit = {c["id"]: c for c in flow(t["flow"])["dod"]}
        if a.criterion not in crit:
            raise NigelError("unknown criterion %s" % a.criterion)
        c = crit[a.criterion]
        val = a.value
        target = c["target"]
        ops = {">=": lambda x, y: x >= y, "<=": lambda x, y: x <= y, "==": lambda x, y: x == y}
        if isinstance(target, bool):
            val = str(val).lower() in ("1", "true", "yes", "ja")
        elif isinstance(target, (int, float)):
            val = float(val)
        met = ops[c["op"]](val, target)
        t["dod"][a.criterion] = {"met": met, "value": val, "evidence": a.evidence, "at": iso(), "by": a.actor}
        save(t)
        ledger(t, a.actor, "dod.recorded", {"criterion": a.criterion, "met": met})
    print(json.dumps({"criterion": a.criterion, "met": met, "value": val, "target": "%s %s" % (c["op"], target)}))
    return EXIT_OK if met else EXIT_ERR


# ------------------------------------------------------------------ routing and context
def cmd_route(a):
    with Lock():
        t = load(a.task_id)
        agents = {x["agent_id"]: x for x in registry()["agents"]}
        ag = agents.get(a.agent)
        reason = None
        if not ag:
            reason = "agent not in registry"
        elif ag["status"] == "active":
            pass
        elif ag["status"] in ("sandbox", "approved") and t["sandbox"]:
            pass
        else:
            reason = "agent status is '%s' (needs active, or sandbox/approved on a sandbox task)" % ag["status"]
        if not reason and t["tenant"] not in ag.get("company_scope", []):
            reason = "agent not scoped for tenant %s" % t["tenant"]
            incident(t, a.actor, "tenant.agent_out_of_scope", {"agent": a.agent})
        if not reason and not set(ag.get("roles", [])) & set(flow(t["flow"])["roles"]):
            reason = "agent roles do not match flow roles"
        if reason:
            ledger(t, a.actor, "route.refused", {"agent": a.agent, "reason": reason})
            raise NigelError("route refused: " + reason, EXIT_REFUSED)
        t["assignments"].append({"agent": a.agent, "phase": next_phase(t), "at": iso(), "by": a.actor})
        save(t)
        ledger(t, a.actor, "route.assigned", {"agent": a.agent, "agent_version": ag.get("version")})
    print(json.dumps({"routed": a.agent, "definition": ag.get("definition"), "tools_allowed": ag.get("tools_allowed", [])}))
    return EXIT_OK


def _inside(path, root):
    path, root = os.path.normcase(os.path.realpath(path)), os.path.normcase(os.path.realpath(root))
    return path == root or path.startswith(root.rstrip(os.sep) + os.sep)


def cmd_context(a):
    with Lock():
        t = load(a.task_id)
        tn = tenants()
        own = [os.path.join(REPO, r) if not os.path.isabs(r) else r for r in tn[t["tenant"]].get("data_roots", [])]
        shared = [os.path.join(REPO, r) if not os.path.isabs(r) else r for r in policy().get("shared_roots", [])]
        if not any(_inside(a.path, r) for r in own + shared):
            owner = [k for k, v in tn.items() for r in v.get("data_roots", [])
                     if _inside(a.path, os.path.join(REPO, r) if not os.path.isabs(r) else r)]
            incident(t, a.actor, "tenant.cross_context", {"path_sha": sha(os.path.abspath(a.path))[:16], "belongs_to": owner})
            raise NigelError("path is outside the data roots of tenant %s" % t["tenant"], EXIT_REFUSED)
        if not os.path.exists(a.path):
            raise NigelError("path not found")
        st = os.stat(a.path)
        ref = {"path": os.path.relpath(a.path, REPO), "modified": iso(dt.datetime.fromtimestamp(st.st_mtime, dt.timezone.utc)), "added_at": iso()}
        if os.path.isfile(a.path):
            with open(a.path, "rb") as f:
                ref["sha256"] = hashlib.sha256(f.read()).hexdigest()
        t["context"].append(ref)
        save(t)
        ledger(t, a.actor, "context.added", {"path": ref["path"]})
    print(json.dumps(ref))
    return EXIT_OK


# ------------------------------------------------------------------ external actions (at most once)
def action_key(task_id, typ, target, payload):
    return sha("|".join([task_id, typ, target, sha(payload)]))[:24]


def cmd_action(a):
    pol = policy()
    external = set(pol["external_action_types"])
    with Lock():
        t = load(a.task_id)
        if a.op == "request":
            payload = a.payload or ""
            if a.payload_file:
                with open(a.payload_file, encoding="utf-8") as f:
                    payload = f.read()
            fl = flow(t["flow"])
            if a.type in fl.get("forbidden_action_types", []):
                incident(t, a.actor, "action.forbidden", {"type": a.type})
                raise NigelError("action type %s is forbidden in flow %s" % (a.type, t["flow"]), EXIT_REFUSED)
            key = action_key(t["task_id"], a.type, a.target, payload)
            existing = t["actions"].get(key)
            if existing:
                st = existing["state"]
                if st == "committed":
                    ledger(t, a.actor, "action.duplicate_skipped", {"key": key})
                    print(json.dumps({"key": key, "duplicate": True, "state": st, "execute": False}))
                    return EXIT_OK
                if st == "reserved":
                    print(json.dumps({"key": key, "state": st, "execute": False, "reason": "in doubt, reconcile first"}))
                    return EXIT_DOUBT
                if st == "awaiting_approval":
                    print(json.dumps({"key": key, "state": st, "execute": False}))
                    return EXIT_APPROVAL
            else:
                existing = {"type": a.type, "target_sha": sha(a.target)[:16], "payload_sha": sha(payload)[:16],
                            "external": a.type in external, "state": "new", "requested_at": iso(), "requested_by": a.actor}
                t["actions"][key] = existing
            if existing["external"]:
                if night_active():
                    existing["state"] = "awaiting_approval"
                    save(t)
                    ledger(t, a.actor, "action.blocked_night", {"key": key, "type": a.type})
                    print(json.dumps({"key": key, "execute": False, "reason": "night run: no external actions"}))
                    return EXIT_APPROVAL
                if existing["state"] != "approved":
                    existing["state"] = "awaiting_approval"
                    t["status"] = "awaiting_approval"
                    t["next_action"] = "human approval of action %s (%s)" % (key, a.type)
                    save(t)
                    ledger(t, a.actor, "action.approval_stop", {"key": key, "type": a.type})
                    print(json.dumps({"key": key, "execute": False, "state": "awaiting_approval"}))
                    return EXIT_APPROVAL
            existing["state"] = "reserved"
            existing["reserved_at"] = iso()
            t["status"] = "in_progress"
            save(t)
            ledger(t, a.actor, "action.reserved", {"key": key, "type": a.type})
            print(json.dumps({"key": key, "execute": True, "then": "action commit %s %s --evidence ..." % (t["task_id"], key)}))
            return EXIT_OK

        key = a.key
        if key not in t["actions"]:
            raise NigelError("unknown action key")
        act = t["actions"][key]
        if a.op == "commit":
            if act["state"] != "reserved":
                raise NigelError("action is %s, not reserved" % act["state"])
            act.update(state="committed", committed_at=iso(), evidence=a.evidence)
        elif a.op == "reconcile":
            if act["state"] != "reserved":
                raise NigelError("only reserved (in doubt) actions can be reconciled")
            _require_human(t, a.actor, "reconcile")
            act.update(state="committed" if a.outcome == "executed" else "approved", reconciled_by=a.actor, reconciled_at=iso())
        save(t)
        ledger(t, a.actor, "action." + act["state"], {"key": key})
    print(json.dumps({"key": key, "state": act["state"]}))
    return EXIT_OK


def _require_human(task, actor, what):
    humans = policy().get("approvers", [])
    agent_ids = {x["agent_id"] for x in registry()["agents"]}
    if actor not in humans or actor in agent_ids:
        incident(task, actor, "approval.unauthorized", {"what": what})
        raise NigelError("%s is not an authorised human approver for %s" % (actor, what), EXIT_REFUSED)


def cmd_approve(a):
    """Human only. The PreToolUse hook blocks Claude from running this command."""
    with Lock():
        t = load(a.task_id)
        _require_human(t, a.by, "approve")
        if a.gate:
            gates = [g["gate_id"] for g in flow(t["flow"]).get("approval_gates", [])]
            if a.gate not in gates:
                raise NigelError("unknown gate %s" % a.gate)
            t["gate_approvals"][a.gate] = {"by": a.by, "at": iso(), "note": a.note}
            what = {"gate": a.gate}
        else:
            act = t["actions"].get(a.key)
            if not act or act["state"] != "awaiting_approval":
                raise NigelError("no action awaiting approval with this key")
            act.update(state="approved", approved_by=a.by, approved_at=iso(), note=a.note)
            what = {"key": a.key}
        still = [k for k, v in t["actions"].items() if v["state"] == "awaiting_approval"]
        if not still:
            t["status"] = "in_progress"
            t["next_action"] = next_phase(t)
        save(t)
        ledger(t, a.by, "approval.granted", what)
    print(json.dumps(dict(what, approved_by=a.by, task_status=t["status"])))
    return EXIT_OK


# ------------------------------------------------------------------ night run (bounded)
def cmd_night(a):
    pol = policy()["night"]
    folder = os.path.join(STATE, "night")
    os.makedirs(folder, exist_ok=True)
    path = os.path.join(folder, a.date + ".json")
    with Lock():
        if a.op == "plan":
            if os.path.exists(path):
                print(json.dumps({"refused": "night run for %s already exists" % a.date}))
                return EXIT_LIMIT
            max_tasks = min(a.max_tasks or pol["max_tasks"], pol["max_tasks"])
            max_minutes = min(a.max_minutes or pol["max_minutes"], pol["max_minutes"])
            picked, skipped = [], []
            for t in sorted(all_tasks(), key=lambda x: (x.get("due") or "9999", x["created_at"])):
                if t["status"] in FINAL_STATES:
                    continue
                reason = None
                nxt = next_phase(t)
                if t["status"] == "awaiting_approval":
                    reason = "awaiting approval"
                elif any(v["state"] == "reserved" for v in t["actions"].values()):
                    reason = "action in doubt"
                elif nxt not in flow(t["flow"]).get("night_allowed_phases", []):
                    reason = "phase %s not allowed at night" % nxt
                elif pending_gates(t, nxt):
                    reason = "gate pending"
                if reason:
                    skipped.append({"task_id": t["task_id"], "reason": reason})
                elif len(picked) >= max_tasks:
                    skipped.append({"task_id": t["task_id"], "reason": "task limit reached"})
                else:
                    picked.append({"task_id": t["task_id"], "tenant": t["tenant"], "phase": nxt, "state": "planned"})
            run = {"date": a.date, "status": "running", "started_at": iso(),
                   "ends_at": iso(now() + dt.timedelta(minutes=max_minutes)), "max_tasks": max_tasks,
                   "max_minutes": max_minutes, "tasks": picked, "skipped": skipped}
            write_json(path, run)
            ledger(None, a.actor, "night.planned", {"date": a.date, "tasks": len(picked)})
            print(json.dumps(run, indent=2))
            return EXIT_OK

        run = read_json(path)
        if a.op == "check":
            over = now() >= dt.datetime.fromisoformat(run["ends_at"].replace("Z", "+00:00"))
            if run["status"] != "running" or over:
                print(json.dumps({"continue": False, "reason": "time budget used" if over else run["status"]}))
                return EXIT_LIMIT
            if a.task_id and a.task_id not in [x["task_id"] for x in run["tasks"]]:
                print(json.dumps({"continue": False, "reason": "task not in tonight's plan"}))
                return EXIT_LIMIT
            print(json.dumps({"continue": True, "ends_at": run["ends_at"]}))
            return EXIT_OK

        if a.op == "report":
            run["status"] = "closed"
            run["closed_at"] = iso()
            lines = ["# Nachtlauf %s" % a.date, "",
                     "Zeitfenster: %s bis %s (max. %d Min., max. %d Aufgaben)" % (run["started_at"], run["ends_at"], run["max_minutes"], run["max_tasks"]),
                     "", "| Aufgabe | Mandant | Phase geplant | Status jetzt | Nächster Schritt |", "|---|---|---|---|---|"]
            for x in run["tasks"]:
                t = load(x["task_id"])
                x["state"] = t["status"]
                lines.append("| %s | %s | %s | %s | %s |" % (t["task_id"], t["tenant"], x["phase"], t["status"], t["next_action"]))
            lines += ["", "## Nicht bearbeitet", ""] + ["- %s: %s" % (s["task_id"], s["reason"]) for s in run["skipped"]]
            lines += ["", "Externe Aktionen im Nachtlauf: keine erlaubt."]
            run["report"] = "\n".join(lines)
            write_json(path, run)
            with open(os.path.join(folder, a.date + "-report.md"), "w", encoding="utf-8") as f:
                f.write(run["report"] + "\n")
            ledger(None, a.actor, "night.closed", {"date": a.date})
            print(run["report"])
            return EXIT_OK
    raise NigelError("unknown night op")


# ------------------------------------------------------------------ learning workflow
def _version_tuple(v):
    return tuple(int(x) for x in v.split("."))


def _proposal_path(pid):
    if not re.match(r"^P-\d{8}-[0-9a-f]{6}$", pid):
        raise NigelError("invalid proposal id")
    return os.path.join(BASE, "proposals", pid + ".json")


def _allowed_tools_line(text):
    m = re.search(r"^allowed-tools:.*$", text or "", re.M)
    return m.group(0) if m else None


def cmd_learn(a):
    pol = policy()["learning"]
    if a.op == "propose":
        with Lock():
            t = load(a.task_id)
            if t["status"] != "done":
                raise NigelError("learnings are collected from completed tasks only")
            with open(a.change_file, encoding="utf-8") as f:
                change = f.read()
            if a.kind == "registry":
                fields = json.loads(change)
                bad = sorted(set(fields) & set(pol["protected_registry_fields"]))
                if bad:
                    incident(t, a.actor, "learning.protected_field", {"fields": bad, "target": a.target})
                    raise NigelError("agents may not change permissions or security fields: %s" % ", ".join(bad), EXIT_REFUSED)
            else:
                target = a.target.replace("\\", "/")
                if any(target.startswith(p) for p in pol["protected_paths"]) or not any(target.startswith(p) for p in pol["allowed_file_prefixes"]):
                    incident(t, a.actor, "learning.protected_path", {"target": target})
                    raise NigelError("target path not allowed for learning changes: %s" % target, EXIT_REFUSED)
                old_path = os.path.join(REPO, target)
                old = open(old_path, encoding="utf-8").read() if os.path.exists(old_path) else ""
                if _allowed_tools_line(old) != _allowed_tools_line(change):
                    incident(t, a.actor, "learning.permission_change", {"target": target})
                    raise NigelError("change alters allowed-tools (permissions); human only", EXIT_REFUSED)
            pid = "P-%s-%s" % (now().strftime("%Y%m%d"), uuid.uuid4().hex[:6])
            prop = {"proposal_id": pid, "status": "proposed", "task_id": t["task_id"], "tenant": t["tenant"],
                    "kind": a.kind, "target": a.target, "change": change, "change_sha": sha(change),
                    "rationale": a.rationale, "proposed_by": a.actor, "proposed_at": iso(),
                    "executors": sorted({c["actor"] for c in t["checkpoints"].values() if c["actor"]}),
                    "reviews": [], "tests": []}
            write_json(_proposal_path(pid), prop)
            ledger(t, a.actor, "learning.proposed", {"proposal": pid, "target": a.target})
        print(json.dumps({"proposal_id": pid}))
        return EXIT_OK

    prop = read_json(_proposal_path(a.proposal_id))
    if a.op == "review":
        if a.by == prop["proposed_by"] or a.by in prop["executors"]:
            raise NigelError("review must be independent of proposer and executors", EXIT_REFUSED)
        prop["reviews"].append({"by": a.by, "verdict": a.verdict, "notes": a.notes, "at": iso(), "change_sha": prop["change_sha"]})
        prop["status"] = "reviewed" if a.verdict == "approve" else "rejected"
    elif a.op == "test":
        r = subprocess.run(a.command, shell=True, cwd=REPO, capture_output=True, text=True, timeout=a.timeout)
        prop["tests"].append({"command": a.command, "exit_code": r.returncode, "output_sha": sha(r.stdout + r.stderr), "at": iso()})
    elif a.op == "apply":
        if prop["status"] != "reviewed":
            raise NigelError("proposal is %s; needs an approving independent review" % prop["status"])
        if not prop["tests"] or prop["tests"][-1]["exit_code"] != 0:
            raise NigelError("latest test run missing or failed")
        if prop["tests"][-1]["at"] < prop["reviews"][-1]["at"]:
            raise NigelError("tests must run after the review")
        if prop["kind"] == "registry":
            reg = registry()
            ag = next((x for x in reg["agents"] if x["agent_id"] == prop["target"]), None)
            if not ag:
                raise NigelError("unknown agent")
            current = ag.get("version", "0.0.0")
            if _version_tuple(a.version) <= _version_tuple(current):
                raise NigelError("new version must be greater than %s" % current)
            ag.update(json.loads(prop["change"]))
            ag["version"] = a.version
            ag.setdefault("changelog", []).append({"version": a.version, "proposal": prop["proposal_id"], "at": iso()})
            write_json(os.path.join(BASE, "registry", "agents.json"), reg)
        else:
            sreg = skills_registry()
            entry = next((x for x in sreg["files"] if x["path"] == prop["target"]), None)
            current = entry["version"] if entry else "0.0.0"
            if _version_tuple(a.version) <= _version_tuple(current):
                raise NigelError("new version must be greater than %s" % current)
            path = os.path.join(REPO, prop["target"])
            os.makedirs(os.path.dirname(path), exist_ok=True)
            with open(path, "w", encoding="utf-8") as f:
                f.write(prop["change"])
            if not entry:
                entry = {"path": prop["target"], "changelog": []}
                sreg["files"].append(entry)
            entry["version"] = a.version
            entry.setdefault("changelog", []).append({"version": a.version, "proposal": prop["proposal_id"], "at": iso()})
            write_json(os.path.join(BASE, "registry", "skills.json"), sreg)
        prop.update(status="applied", applied_version=a.version, applied_by=a.by, applied_at=iso())
    write_json(_proposal_path(a.proposal_id), prop)
    ledger({"task_id": prop["task_id"], "tenant": prop["tenant"]}, getattr(a, "by", None) or a.actor, "learning." + a.op, {"proposal": a.proposal_id})
    print(json.dumps({"proposal_id": a.proposal_id, "status": prop["status"],
                      "last_test_exit": prop["tests"][-1]["exit_code"] if prop["tests"] else None}))
    if a.op == "test" and prop["tests"][-1]["exit_code"] != 0:
        return EXIT_ERR
    return EXIT_OK


def cmd_ledger(a):
    ok, count, bad_line = verify_ledger()
    print(json.dumps({"ledger_ok": ok, "entries": count, "first_bad_line": bad_line}))
    return EXIT_OK if ok else EXIT_ERR


# ------------------------------------------------------------------ CLI
def build_parser():
    p = argparse.ArgumentParser(prog="nigel", description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--actor", default=os.environ.get("NIGEL_ACTOR", "claude-main"), help="who is acting (agent id or human)")
    s = p.add_subparsers(dest="cmd", required=True)

    x = s.add_parser("new"); x.set_defaults(fn=cmd_new)
    x.add_argument("--tenant", required=True); x.add_argument("--project", required=True)
    x.add_argument("--flow", required=True); x.add_argument("--title", required=True)
    x.add_argument("--requester", required=True); x.add_argument("--owner")
    x.add_argument("--due"); x.add_argument("--request-key"); x.add_argument("--sandbox", action="store_true")

    x = s.add_parser("show"); x.set_defaults(fn=cmd_show); x.add_argument("task_id"); x.add_argument("--tenant")
    x = s.add_parser("list"); x.set_defaults(fn=cmd_list); x.add_argument("--tenant", required=True); x.add_argument("--open", action="store_true")
    x = s.add_parser("resume"); x.set_defaults(fn=cmd_resume); x.add_argument("task_id")

    x = s.add_parser("checkpoint"); x.set_defaults(fn=cmd_checkpoint)
    x.add_argument("task_id"); x.add_argument("phase"); x.add_argument("--evidence", action="append")
    x.add_argument("--confirm", action="store_true")

    x = s.add_parser("fail"); x.set_defaults(fn=cmd_fail); x.add_argument("task_id"); x.add_argument("--reason", required=True)
    x = s.add_parser("dod"); x.set_defaults(fn=cmd_dod)
    x.add_argument("task_id"); x.add_argument("criterion"); x.add_argument("--value", required=True); x.add_argument("--evidence", required=True)
    x = s.add_parser("route"); x.set_defaults(fn=cmd_route); x.add_argument("task_id"); x.add_argument("agent")
    x = s.add_parser("context"); x.set_defaults(fn=cmd_context); x.add_argument("task_id"); x.add_argument("path")

    x = s.add_parser("action"); x.set_defaults(fn=cmd_action)
    x.add_argument("op", choices=["request", "commit", "reconcile"]); x.add_argument("task_id"); x.add_argument("key", nargs="?")
    x.add_argument("--type"); x.add_argument("--target"); x.add_argument("--payload"); x.add_argument("--payload-file")
    x.add_argument("--evidence"); x.add_argument("--outcome", choices=["executed", "not_executed"])

    x = s.add_parser("approve", help="HUMAN ONLY"); x.set_defaults(fn=cmd_approve)
    x.add_argument("task_id"); x.add_argument("--by", required=True); g = x.add_mutually_exclusive_group(required=True)
    g.add_argument("--key"); g.add_argument("--gate"); x.add_argument("--note")

    x = s.add_parser("night"); x.set_defaults(fn=cmd_night)
    x.add_argument("op", choices=["plan", "check", "report"]); x.add_argument("--date", required=True)
    x.add_argument("--max-tasks", type=int); x.add_argument("--max-minutes", type=int); x.add_argument("--task-id")

    x = s.add_parser("learn"); x.set_defaults(fn=cmd_learn)
    x.add_argument("op", choices=["propose", "review", "test", "apply"]); x.add_argument("proposal_id", nargs="?")
    x.add_argument("--task-id"); x.add_argument("--kind", choices=["registry", "file"]); x.add_argument("--target")
    x.add_argument("--change-file"); x.add_argument("--rationale"); x.add_argument("--by")
    x.add_argument("--verdict", choices=["approve", "reject"]); x.add_argument("--notes")
    x.add_argument("--command"); x.add_argument("--timeout", type=int, default=600); x.add_argument("--version")

    x = s.add_parser("ledger"); x.set_defaults(fn=cmd_ledger); x.add_argument("op", choices=["verify"])
    return p


def main(argv=None):
    args = build_parser().parse_args(argv)
    try:
        return args.fn(args)
    except NigelError as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        return e.code


if __name__ == "__main__":
    sys.exit(main())
