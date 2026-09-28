# Projektregeln

## Mehrstufige Aufgaben → Nigel

Bei jeder Aufgabe mit mehr als einem Arbeitsschritt, einer externen Wirkung (Mail, Post, CRM, Angebot, Kalender, Test gegen Systeme) oder mehr als einem beteiligten Agenten:

1. Skill **`nigel-run`** laden und befolgen.
2. Planung und unabhängige Prüfung über den Projektagenten **`nigel-orchestrator`**.
3. Jeder Schritt wird in der Engine erfasst: `python3 nigel/engine/nigel.py …` (Task-ID, Prüfpunkte, Belege).

Einzelne Fragen und kleine Einzeländerungen brauchen Nigel nicht.

## Geltende Regeln

- Governance und Betriebsmodell: NIGEL Master Blueprint (Stand im Repo: `nigel/`), Abläufe in `nigel/flows/`, Policy in `nigel/policy/`.
- Agentenstatus nur laut `nigel/registry/agents.json`. Ein Name im Blueprint ist kein Nachweis. Nicht aktive Agenten werden nicht aufgerufen.
- Freigaben erteilt nur ein Mensch. Bei Exit-Code 3 der Engine: anhalten, melden, was freizugeben ist.
- Policy, Engine, Hook, Agentendateien und `.claude/settings.json` ändert Claude nicht. Register und Skills ändern sich nur über `nigel.py learn`.
- Vault-Regeln (`CLAUDE.md` im Vault-Stamm, `00 Kontext/Schreibstil.md`) gelten zusätzlich. Sie sind in diesem Repo nicht vorhanden. Wenn sie gebraucht werden, bei der Inhaberin anfordern.
- Vault-Notizen: YAML mit `tags`, `status`, `date`, `source` (tatsächliche Quelle), `chat_url` (nur wenn bekannt, nie erfinden).
- LinkedIn: Prozess und Quality Gates aus `linkedin/04-prozess-qualitaet.md` (Branch `claude/cyspa-linkedin-strategy-vte419`).
