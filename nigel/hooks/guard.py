#!/usr/bin/env python3
"""PreToolUse guard for Claude Code (registered in .claude/settings.json).

Enforces outside the model:
  - approvals and in-doubt reconciliation are human-only (engine commands `approve`, `action reconcile`)
  - policy, engine, hook, agent definitions and settings are not changed by Claude
  - registry, skills and live state change only through the engine (learning workflow)

Version 1.1: shell commands are tokenised like a shell (quotes, ;, &&, |, redirections), so free text
in quotes (e.g. --evidence "... approve ...", "a -> b") no longer triggers false alarms. Unparseable
commands fall back to the strict v1.0 checks.

Exit 2 blocks the tool call and shows stderr to Claude. Fails closed on unreadable input.
This is a guard rail, not a sandbox: a script file that does not name the protected paths is not
detected. The final control is human review of every change via pull request.
"""
import json
import os
import re
import shlex
import sys

VERSION = "1.1.0"

# never changed by Claude
LOCKED = ["nigel/policy/", "nigel/engine/", "nigel/hooks/", ".claude/settings.json", ".claude/agents/"]
# changed only through the engine's learning workflow or its state handling
ENGINE_ONLY = ["nigel/registry/", ".claude/skills/", ".nigel/"]
PROTECTED = LOCKED + ENGINE_ONLY

MSG_APPROVE = "Freigaben erteilt nur ein Mensch (nigel.py approve). Stoppe und melde der Inhaberin, was freizugeben ist."
MSG_RECONCILE = "Unklare Aktionen klärt nur ein Mensch (nigel.py action reconcile). Stoppe und melde es der Inhaberin."
MSG_WRITE = ("Schreibender Befehl auf geschützten Pfad %s. Policy, Hook, Engine und Agentendateien ändert nur ein "
             "Mensch; Register und Skills nur über 'nigel.py learn'. Zum Lesen das Read-Werkzeug verwenden.")

SEPARATORS = {";", "&&", "||", "|", "&", "|&", "(", ")", "\n"}
REDIRECTS = {">", ">>", ">|", "&>", "&>>", "<>"}
WRITE_COMMANDS = {"rm", "mv", "cp", "tee", "truncate", "chmod", "chown", "ln", "dd", "install", "rsync",
                  "touch", "shred", "unlink", "rmdir", "patch",
                  "set-content", "add-content", "out-file", "remove-item", "move-item", "copy-item",
                  "new-item", "rename-item", "clear-content"}
INTERPRETERS = {"python", "python3", "py", "perl", "ruby", "node", "bash", "sh", "zsh", "pwsh", "powershell"}
INLINE_FLAGS = {"-c", "-e", "-command", "-encodedcommand", "--eval", "-p"}
GIT_WRITE = {"checkout", "restore", "rm", "mv", "apply", "reset", "clean", "stash"}
WRAPPERS = {"sudo", "env", "nohup", "time", "exec", "command", "xargs"}

# strict v1.0 fallback
STRICT_APPROVE = re.compile(r"nigel\.py\b.*\bapprove\b", re.S)
STRICT_RECONCILE = re.compile(r"nigel\.py\b.*\breconcile\b", re.S)
STRICT_WRITE = re.compile(
    r"(>|\btee\b|\bsed\s+-i|\brm\b|\bmv\b|\bcp\b|\btruncate\b|\bchmod\b|\bln\b|\bdd\b|\bperl\b|"
    r"\bpython3?\s+-c|\bnode\s+-e|Set-Content|Add-Content|Out-File|Remove-Item|Move-Item|Copy-Item|"
    r"\bgit\s+(checkout|restore|rm|mv|apply)\b)")


def block(msg):
    sys.stderr.write("NIGEL-Guard: %s\n" % msg)
    sys.exit(2)


def protected_ref(token):
    t = token.replace("\\", "/")
    for p in PROTECTED:
        bare = p.rstrip("/")
        if p in t or t.endswith(bare) or ("/" + bare) in t or t == bare:
            return p
    return None


def tokenize(cmd):
    cmd = cmd.replace("\\\n", " ")
    # Windows paths (nigel\policy\x.json): a backslash before a path character is a separator, not an escape
    cmd = re.sub(r"\\(?=[A-Za-z0-9._\-])", "/", cmd)
    lex = shlex.shlex(cmd, posix=True, punctuation_chars=";&|()<>")
    lex.whitespace_split = True
    lex.commenters = ""
    return list(lex)


def segments(tokens):
    seg = []
    for tok in tokens:
        if tok in SEPARATORS:
            if seg:
                yield seg
            seg = []
        else:
            seg.append(tok)
    if seg:
        yield seg


def command_word(seg):
    """Return index of the real command, skipping VAR=value assignments and wrappers like sudo/env."""
    i = 0
    while i < len(seg):
        tok = seg[i]
        if re.match(r"^[A-Za-z_][A-Za-z0-9_]*=", tok):
            i += 1
        elif os.path.basename(tok).lower() in WRAPPERS:
            i += 1
        else:
            return i
    return None


def engine_subcommand(seg, idx):
    """seg[idx] is the path to nigel.py; skip global options and return the subcommand tokens."""
    rest = seg[idx + 1:]
    j = 0
    while j < len(rest) and rest[j].startswith("-"):
        j += 1 if "=" in rest[j] else 2   # --actor x  |  --actor=x  (argparse also accepts --act x)
    return rest[j:j + 2]


def check_bash(cmd):
    try:
        tokens = tokenize(cmd)
    except ValueError:
        # unbalanced quotes etc.: strict v1.0 behaviour
        if STRICT_APPROVE.search(cmd):
            block(MSG_APPROVE)
        if STRICT_RECONCILE.search(cmd):
            block(MSG_RECONCILE)
        norm = re.sub(r"\d?>&\d|\d?>\s*/dev/null", "", cmd).replace("\\", "/")
        for p in PROTECTED:
            if p.rstrip("/") in norm and STRICT_WRITE.search(norm):
                block(MSG_WRITE % p)
        return

    in_protected_dir = None
    for seg in segments(tokens):
        # 1. human-only engine commands, wherever nigel.py appears as a word (quoted or not)
        for k, tok in enumerate(seg):
            if tok.replace("\\", "/").endswith("nigel.py"):
                sub = engine_subcommand(seg, k)
                if sub[:1] == ["approve"]:
                    block(MSG_APPROVE)
                if sub == ["action", "reconcile"]:
                    block(MSG_RECONCILE)

        c = command_word(seg)
        if c is None:
            continue
        word = os.path.basename(seg[c]).lower()
        args = seg[c + 1:]

        if word in ("cd", "pushd", "set-location"):
            in_protected_dir = next((protected_ref(a) for a in args if protected_ref(a)), in_protected_dir)
            continue

        # 2. redirections: only the target matters
        for k, tok in enumerate(seg):
            if tok in REDIRECTS and k + 1 < len(seg):
                target = seg[k + 1]
                if target.startswith("&") or target.isdigit() or target == "/dev/null":
                    continue
                hit = protected_ref(target) or in_protected_dir
                if hit:
                    block(MSG_WRITE % hit)

        # 3. writing commands and opaque inline code touching protected paths
        hit = next((protected_ref(a) for a in args if protected_ref(a)), None) or in_protected_dir
        if not hit:
            continue
        lowered = [a.lower() for a in args]
        if word in WRITE_COMMANDS:
            block(MSG_WRITE % hit)
        if word == "sed" and any(a.startswith("-i") or a == "--in-place" for a in args):
            block(MSG_WRITE % hit)
        if word == "git" and args and args[0] in GIT_WRITE:
            block(MSG_WRITE % hit)
        if word in INTERPRETERS and any(a in INLINE_FLAGS for a in lowered):
            block(MSG_WRITE % hit)


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
        check_bash(inp.get("command", ""))
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
