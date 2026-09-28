---
tags: [nigel, ai-workforce, agent-registry, abgleich]
status: awaiting-approval
date: 2026-09-25
source: claude
chat_url: "https://claude.ai/code/session_01JsQoSQbozeyt2EYitpEXuf"
---

# Agentenregister: Abgleich Blueprint ↔ tatsächlicher Bestand

Maschinenlesbar: `agents.json`. Ein Name im Blueprint ist kein Nachweis. Geprüfte Quellen:

- Repo lsa555/mein-projekt (alle Branches): keine Agentendateien
- ~/.claude/agents in dieser Session: nicht vorhanden
- Account-Skills (synchronisiert): cyspa-organigramm beschreibt Company OS
- Obsidian Vault Agent Registry: NICHT geprüft (kein Zugriff)

**Ergebnis:** Kein Fachagent existiert als ausführbare Definition. Alle 35 Fachagenten stehen auf `proposed` und sind nicht routbar. Nigel ist als Datei angelegt und steht auf `sandbox`.

## Offene Entscheidung: Nigel und Hermes Conductor

Das Company-OS-Organigramm hat mit dem **Hermes Conductor** bereits einen Orchestrator (Routing, Delegation, Workflow-Steuerung). Nigel deckt dieselbe Aufgabe ab. Varianten:

1. Nigel ersetzt Hermes Conductor (Organigramm anpassen, `cyspa-organigramm` Version hochzählen).
2. Nigel ist der Name des Hermes Conductor (nur Umbenennung).
3. Nigel ist eine Executive-Schicht über Hermes (zwei Orchestratoren, mehr Übergaben; nicht empfohlen).

Empfehlung: Variante 2. Sie hält die bestehende Struktur und vermeidet doppelte Orchestrierung.

## Abgleich

| Blueprint | Team | Company OS | Deckung | Vorhandene Skills | Nachweis | Status |
|---|---|---|---|---|---|---|
| Nigel | Executive Office | Hermes Conductor (gleiche Aufgabe: Routing, Delegation, Workflow-Steuerung) | — | — | definition-file | sandbox |
| Ava | Executive Office | 01 Executive Assistant · E-Mail-Agent · Meeting-Agent | gut | morning | organigramm-documented | proposed |
| Atlas | Executive Office | Hermes Planer · 04 Projekt-Agent | teilweise | — | organigramm-documented | proposed |
| Iris | Executive Office | Steuerebene Wissensmanager · 01 Dokumenten-Agent | teilweise | — | organigramm-documented | proposed |
| Morgan | Marketing | 05 CMO-Agent | gut | — | organigramm-documented | proposed |
| Alex | Marketing | 05 Content-Strategist | teilweise (kein LinkedIn-Spezialist im Organigramm) | — | organigramm-documented | proposed |
| Sofia | Marketing | — | keine | — | blueprint-only | proposed |
| Elena | Marketing | — | keine | text-revision-style | blueprint-only | proposed |
| Maya | Marketing | — | keine | cyspa-designer, cyspa-pptx, cyspa-kantonsdeck | blueprint-only | proposed |
| Noah | Marketing | — | keine | — | blueprint-only | proposed |
| Robin | Marketing | 05 Kampagnen-Agent · SEO-/Growth-Agent | teilweise | — | organigramm-documented | proposed |
| Grace | Marketing | Hermes Prüfer | teilweise | — | organigramm-documented | proposed |
| Victor | Sales | 02 Vertriebsleiter | gut | — | organigramm-documented | proposed |
| Lena | Sales | 02 Lead-Rechercheur · Recherche-Agent | gut | deep-research, lumen-competitive | organigramm-documented | proposed |
| Oliver | Sales | 02 Angebots-Intelligenz | gut | cyspa-angebot, cyspa-docx, xlsx | organigramm-documented | proposed |
| Nora | Sales | 04 Kundenleiter · Onboarding-Agent · Success-Agent | gut | — | organigramm-documented | proposed |
| Ethan | Sales | — | keine | — | blueprint-only | proposed |
| Felix | Sales | — | keine | — | blueprint-only | proposed |
| Michael | Security | 06 Sicherheit & Governance | teilweise | — | organigramm-documented | proposed |
| Sentinel | Security | — | keine | — | blueprint-only | proposed |
| Raven | Security | — | keine | — | blueprint-only | proposed |
| Cora | Security | — | keine | — | blueprint-only | proposed |
| Quinn | Security | — | keine | — | blueprint-only | proposed |
| Rhea | Security | — | keine | — | blueprint-only | proposed |
| Adrian | Engineering | 06 CTO-Agent | teilweise | — | organigramm-documented | proposed |
| Jules | Engineering | — | keine | — | blueprint-only | proposed |
| Jasper | Engineering | — | keine | — | blueprint-only | proposed |
| Jade | Engineering | — | keine | — | blueprint-only | proposed |
| Devon | Engineering | 06 Automatisierungs-Ingenieur | gut | — | organigramm-documented | proposed |
| Kira | Engineering | 06 DevOps-Agent · Monitoring-Agent | gut | — | organigramm-documented | proposed |
| Theo | Engineering | 04 Delivery-QA-Agent | teilweise | — | organigramm-documented | proposed |
| Clara | Finance/Legal/HR/Control | 03 CFO-Agent · Controlling-Agent · Forecast-Agent | gut | — | organigramm-documented | proposed |
| Helena | Finance/Legal/HR/Control | — | keine | — | blueprint-only | proposed |
| Harper | Finance/Legal/HR/Control | — | keine | — | blueprint-only | proposed |
| Vera | Finance/Legal/HR/Control | 06 Sicherheit & Governance | teilweise | — | organigramm-documented | proposed |
| Oscar | Finance/Legal/HR/Control | Hermes Prüfer | teilweise | — | organigramm-documented | proposed |

## Company-OS-Rollen ohne Gegenstück im Blueprint

- Hermes Input
- Hermes Sammler
- Hermes Recherche
- Hermes Prompt-Engineer
- Hermes Produktion
- 02 Outreach-Agent
- 02 Nachfass-Agent
- 03 Rechnungs-Agent
- 03 Forderungs-Agent

## Nicht geprüft

Das Agent Registry im Obsidian Vault (`03 Areas/AI Workforce/Agent Registry/`, falls vorhanden). Der Abgleich ist erst vollständig, wenn das Inventur-Skript gelaufen ist (Zugriffsanfrage A1/A3).
