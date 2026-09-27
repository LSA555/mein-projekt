#!/bin/sh
# Starts the NIGEL guard with whatever Python 3 is available (python3, python, py -3).
# Fails closed: without a working Python 3 every guarded tool call is blocked (exit 2),
# instead of Claude Code silently running unguarded.
dir=$(dirname "$0")
for py in python3 python "py -3"; do
  exe=${py%% *}
  if command -v "$exe" >/dev/null 2>&1 && $py -c "import sys; sys.exit(0 if sys.version_info[0] == 3 else 1)" >/dev/null 2>&1; then
    exec $py "$dir/guard.py"
  fi
done
echo "NIGEL-Guard: Kein Python 3 gefunden (python3, python oder py -3). Aus Sicherheitsgründen blockiert. Python 3 installieren und Claude Code neu starten." >&2
exit 2
