#!/usr/bin/env python3
"""PreToolUse guard for Claude Code (registered in .claude/settings.json).

Enforces outside the model:
  - approvals and in-doubt reconciliation are human-only (engine commands `approve`, `action reconcile`)
  - policy, engine, hook, agent definitions and settings are not changed by Claude
  - registry, skills and live state change only through the engine (learning workflow)

Exit 2 blocks the tool call and shows stderr to Claude. Fails closed on unreadable input.
This is a guard rail, not a sandbox: a determined actor with shell access can bypass string checks.
The final control is human review of every change via pull request.
"""
import json
import os
import re
import sys

HUMAN_ONLY = [
    (re.compile(r"nigel\.py\b.*\bapprove\b", re.S), "Freigaben erteilt nur ein Mensch (nigel.py approve)."),
    (re.compile(r"nigel\.py\b.*\baction\s+reconcile\b", re.S), "Unklare Aktionen klärt nur ein Mensch (action reconcile)."),
]
# never changed by Claude
LOCKED = ["nigel/policy/", "nigel/engine/", "nigel/hooks/", ".claude/settings.json", ".claude/agents/"]
# changed only through the engine's learning workflow or its state handling
ENGINE_ONLY = ["nigel/registry/", ".claude/skills/", ".nigel/"]
WRITEISH = re.compile(
    r"(>|\btee\b|\bsed\s+-i|\brm\b|\bmv\b|\bcp\b|\btruncate\b|\bchmod\b|\bln\b|\bdd\b|\bperl\b|"
    r"\bpython3?\s+-c|\bnode\s+-e|Set-Content|Add-Content|Out-File|Remove-Item|Move-Item|Copy-Item|"
    r"\bgit\s+(checkout|restore|rm|mv|apply)\b)")


def block(msg):
    sys.stderr.write("NIGEL-Guard: %s\n" % msg)
    sys.exit(2)


def rel(path, root):
    p = os.path.normpath(os.path.join(root, path)).replace("\\", "/")
    r = os.path.normpath(root).replace("\\", "/").rstrip("/") + "/"
    return p[len(r):] if p.startswith(r) else p


def main():
    try:
        data = json.load(sys.stdin)
        tool = data.get("tool_name", "")
        inp = data.get("tool_input", {}) or {}
    except Exception:
        block("Hook-Eingabe nicht lesbar, Aufruf aus Sicherheitsgründen blockiert.")
    root = os.environ.get("CLAUDE_PROJECT_DIR") or data.get("cwd") or os.getcwd()

    if tool == "Bash":
        cmd = inp.get("command", "")
        for rx, msg in HUMAN_ONLY:
            if rx.search(cmd):
                block(msg + " Stoppe und melde der Inhaberin, was freizugeben ist.")
        cleaned = re.sub(r"\d?>&\d|\d?>\s*/dev/null", "", cmd)
        norm = cleaned.replace("\\", "/")
        for prefix in LOCKED + ENGINE_ONLY:
            if prefix.rstrip("/") in norm and WRITEISH.search(cleaned):
                block("Schreibender Befehl auf geschützten Pfad %s. Policy, Hook, Engine und Agentendateien "
                      "ändert nur ein Mensch; Register und Skills nur über 'nigel.py learn'." % prefix)
        sys.exit(0)

    if tool in ("Edit", "Write", "MultiEdit", "NotebookEdit"):
        path = inp.get("file_path") or inp.get("notebook_path") or ""
        r = rel(path, root)
        for prefix in LOCKED:
            if r.startswith(prefix) or r == prefix.rstrip("/"):
                block("%s ist geschützt (Berechtigungen/Sicherheitsregeln). Nur ein Mensch ändert das per Pull Request." % r)
        for prefix in ENGINE_ONLY:
            if r.startswith(prefix):
                block("%s ändert sich nur über den Lernablauf: nigel.py learn propose → review → test → apply." % r)
    sys.exit(0)


if __name__ == "__main__":
    main()
