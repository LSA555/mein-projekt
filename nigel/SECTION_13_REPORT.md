---
tags: [nigel, ai-workforce, blueprint-13, cycle-report]
status: awaiting-approval
date: 2026-09-25
source: claude
chat_url: "https://claude.ai/code/session_01JsQoSQbozeyt2EYitpEXuf"
para: "03 Areas/AI Workforce/Nigel"
---

# NIGEL – Umsetzung Abschnitt 13

**Grundlage:** Der Text von Blueprint v2.1 Abschnitt 13 lag in der Session nicht vor. Hochgeladen war nur v2.0 (Abschnitte 0–12). Massgeblich waren deshalb die sechs Punkte aus dem Auftrag vom 2026-09-25. Die Details zu 13.5 habe ich aus dem Auftrag und aus v2.0 Abschnitt 11 abgeleitet. Bitte gegen den Originaltext von 13.5 prüfen. Andere Blueprint-Abschnitte habe ich nicht überarbeitet.

## Angelegt

| Datei | Zweck |
|---|---|
| `CLAUDE.md` | Kurz: mehrstufige Aufgaben → `nigel-run` + `nigel-orchestrator`, Verweis auf Projektregeln |
| `.claude/skills/nigel-run/SKILL.md` | Ablauf mit Prüfpunkten, Freigabestopp, Wiederaufnahme, Nachtlauf, Lernen |
| `.claude/agents/nigel-orchestrator.md` | Nigel als Projektagent; Werkzeuge nur Read, Grep, Glob, Bash; schreibt nicht, gibt nicht frei |
| `.claude/settings.json` | Registriert den Schutz-Hook (PreToolUse) |
| `.gitignore` | Live-State `.nigel/` wird nicht versioniert |
| `nigel/engine/nigel.py` | Engine: Task-ID, 7 Prüfpunkte, Ledger mit Hash-Kette, Freigaben, Aktionen höchstens einmal, Mandantentrennung, Korrekturgrenze, Nachtlauf, Lernablauf |
| `nigel/hooks/guard.py` | Hook ausserhalb des Modells: blockt `approve`/`reconcile` durch Claude, schützt Policy, Engine, Hook, Agentendateien, Settings; Register, Skills und State nur über die Engine |
| `nigel/policy/policy.json` | Prüfpunkte, externe Aktionstypen, Budgets, Nachtgrenzen, geschützte Felder. `approvers` ist leer |
| `nigel/policy/tenants.json` | Leer. Mandanten sind nicht bestätigt (A7) |
| `nigel/flows/*.json` | 5 Abläufe: `meeting-followup`, `linkedin-lead`, `lead-offer`, `security-assessment`, `night-run` |
| `nigel/registry/agents.json`, `ABGLEICH.md` | Register mit 36 Agenten und Nachweisstufe, Abgleich mit Company OS |
| `nigel/registry/skills.json` | Versionen der Repo-Skills, Liste der Account-Skills |
| `nigel/tests/test_nigel.py` | 44 Tests mit synthetischen Daten |

### Die fünf Abläufe: Abschlusskriterien (Auszug)

| Ablauf | Messbare Kriterien | Freigabestopps |
|---|---|---|
| Meeting bis Nachbearbeitung | 100 % der Aussagen im Briefing mit Quelle · 100 % der Aufgaben mit Verantwortlichem und Termin · Follow-up genau 1× versendet · Statusreview terminiert | Agenda an Externe, Follow-up-Mail |
| LinkedIn bis Lead | 100 % der Aussagen geprüft · 4 von 4 Gates (Fach, Legal, Accessibility, Security-Redline) · genau 1 Publikation · 0 CRM-Dubletten · Leads nach 7 Tagen gemessen | Publikation, CRM-Übergabe |
| Lead bis Angebot | 100 % der ICP-Kriterien begründet · älteste Quelle ≤ 90 Tage · 0 offene Prüfpunkte · genau 1 Versand · genau 1 CRM-Stufenwechsel | Preis vor Prüfung, Versand, CRM |
| Security Assessment | schriftliche Beauftragung liegt vor · 0 Testhandlungen ausserhalb des Scopes · 100 % der Befunde mit Beleg und Kontrollzuordnung · menschliche Abnahme | **vor jeder Ausführung** Beauftragung; jede aktive Testhandlung einzeln; Berichtsübergabe |
| Begrenzte Nachtbearbeitung | ≤ 60 Min. · ≤ 5 Aufgaben · 0 externe Aktionen · Morgenbericht vorhanden | Nachts keine externen Aktionen, auch keine bereits freigegebenen |

Eindeutiger Status je Aufgabe: `open`, `in_progress`, `awaiting_approval`, `failed`, `done`, `cancelled`. Dazu der Stand jedes Prüfpunkts (`pending`, `saved`, `confirmed`).

## Getestet

**Synthetisch, 44 von 44 bestanden** (`python3 -m unittest discover -s nigel/tests -v`, Python 3.11, Linux):

| Bereich | Tests | Geprüft |
|---|---|---|
| Agentenaufruf | 8 | aktiver Agent routbar; `proposed`, unbekannt, falscher Mandant, falsche Rolle abgelehnt; Sandbox-Agent nur auf Sandbox-Aufgabe; echtes Register ohne aktiven Fachagenten; Agentendatei ohne Schreibwerkzeuge |
| Mandantentrennung | 6 | fremder Kontext abgelehnt und protokolliert (ohne Pfad im Protokoll); Pfad-Trick `../` abgelehnt; Liste und Anzeige mandantengebunden; unbekannter Mandant abgelehnt |
| Wiederaufnahme | 5 | Fortsetzung am letzten bestätigten Prüfpunkt; bestätigte Phasen nicht wiederholt; keine Phase überspringbar; **simulierter Absturz mitten im Schreiben** lässt den letzten Stand intakt; gleiche Anfrage erzeugt keine zweite Aufgabe |
| Freigabestopp | 10 | externe Aktion stoppt (Exit 3); Agenten und Unbekannte können nicht freigeben; freigegebene Aktion läuft genau einmal, Wiederholung wird übersprungen; geänderter Inhalt braucht neue Freigabe; unklare Aktion wird nie wiederholt, nur ein Mensch klärt; Security-Test vor Beauftragung blockiert; Prüfung nicht durch den Ausführenden; Abschluss nur mit erfüllter DoD |
| Korrekturversuche | 2 | nach 2 Fehlversuchen → `failed` + Eskalation; Security-Ablauf mit Grenze 1 |
| Nachtlauf | 3 | Auswahl nach Phase und Freigabestatus; Aufgaben- und Zeitgrenze (500 Min. angefragt → 60); ein Lauf pro Nacht; Stopp nach Zeitablauf; keine externe Aktion nachts; Morgenbericht |
| Lernen | 4 | nur aus abgeschlossenen Aufgaben; Berechtigungen, Status, Scope, Policy, Settings und `allowed-tools` nicht änderbar; Übernahme erst nach unabhängigem Review, bestandenem Test nach dem Review und höherer Version |
| Audit | 2 | Manipulation im Ledger erkannt; kein Mail-Inhalt, keine Empfängeradresse im Ledger |
| Hook | 3 | 11 Sperrfälle, 6 erlaubte Fälle, blockiert bei unlesbarer Eingabe |
| Abläufe | 1 | 5 Abläufe vorhanden, alle Kriterien messbar, keine Widersprüche zwischen Freigabe und Verbot |

**Gegenprobe:** 9 Schutzmechanismen habe ich absichtlich ausgeschaltet (Freigabeprüfung, Mandantenscope, atomares Schreiben, Korrekturgrenze, Nachtsperre, unabhängige Prüfung, geschützte Felder, Freigabe nur durch Menschen, Duplikatschutz). Jede Mutation hat mindestens einen Test fehlschlagen lassen.

**Live beobachtet (keine Testsuite):** In dieser Cloud-Session hat der Hook nach dem Anlegen von `.claude/settings.json` zweimal eigene Befehle von Claude blockiert, einmal ein Schreiben in `nigel/policy/`, einmal einen Befehl mit `nigel.py approve`. Der Hook greift also in einer echten Claude-Code-Session.

## Aktiviert

**Nichts produktiv.**

- Branch `claude/cool-fermi-irqllf`, PR [LSA555/mein-projekt#1](https://github.com/LSA555/mein-projekt/pull/1), nicht gemergt.
- `approvers` ist leer, `tenants` ist leer. Die Engine lehnt echte Aufgaben ab (geprüft: `new --tenant cyspa` → Exit 6).
- Alle 35 Fachagenten stehen auf `proposed`, Nigel auf `sandbox`.
- Kein Zeitplan eingerichtet (keine Routine, keine Windows-Aufgabe).
- Keine API-Verbindung und keine Vault-Anbindung geprüft oder genutzt.

## Blockiert

| Was | Grund | Lösung |
|---|---|---|
| Echter Agentenaufruf-Test (headless Claude-Session ruft `nigel-orchestrator` auf) | Der Berechtigungsprüfer dieser Session hat `claude -p --dangerously-skip-permissions` abgelehnt. Ich habe das nicht umgangen | Du führst den Test lokal aus (Voraussetzung 5) oder erlaubst ihn ausdrücklich |
| Abgleich mit dem Vault-Register | kein Vault-Zugriff | Inventur-Skript laufen lassen (A1/A3) |
| Mandanten | nicht bestätigt | A7 |
| Nigel vs. Hermes Conductor | Doppelte Orchestrierung | deine Entscheidung, siehe `registry/ABGLEICH.md` |
| Originaltext Abschnitt 13 (v2.1) | nicht hochgeladen | Datei nachreichen, dann gleiche ich die Abläufe ab |

## Bekannte Grenzen

- **Der Hook ist eine Leitplanke, keine Sandbox.** Er prüft Befehlstexte. Ein Skript, das die geschützten Pfade nicht im Befehl nennt, kommt durch. Das ist in dieser Session selbst passiert, beim Anlegen der Testkopie im Scratchpad (nicht im Repo). Die letzte Kontrolle bleibt der menschliche Review jedes Pull Requests. Empfehlung: Branch-Schutz auf `main` mit Pflicht-Review, dazu CODEOWNERS für `nigel/policy/`, `nigel/engine/`, `nigel/hooks/` und `.claude/`.
- **Freigaben sind nicht kryptografisch authentisiert.** `approve --by` prüft nur, ob die Kennung auf der Liste steht. Claude kann den Befehl wegen des Hooks nicht ausführen, aber jeder Mensch mit Shell-Zugriff kann es. Für mehr Sicherheit bräuchte es signierte Freigaben oder Freigaben über ein separates System (z. B. Teams-Approval).
- **Der State liegt als JSON in `.nigel/`.** Das reicht für Sandbox und Pilot. Blueprint 7 verlangt für den Betrieb eine richtige operative Ablage. `.nigel/` nicht in einen OneDrive-synchronisierten Ordner legen.
- **Subagenten können keine weiteren Subagenten starten.** Das Routing zu Fachagenten läuft deshalb über die Hauptsession. Nigel plant und prüft, führt aber nicht aus.
- Die Engine macht keine KI-Arbeit. Sie erzwingt Reihenfolge, Freigaben und Grenzen. Ob Belege inhaltlich stimmen, prüft Nigel bzw. ein Mensch.

## Voraussetzungen für die Aktivierung

1. **PR #1 prüfen und mergen.** Erst dann gelten `CLAUDE.md`, Skill, Agent und Hook in Claude Code auf `main`.
2. **Python 3.9+ als `python3` im PATH** auf jedem Rechner, auf dem Claude Code in diesem Projekt läuft. Unter Windows heisst der Befehl oft `python` oder `py`. Dann muss `.claude/settings.json` angepasst werden. **Fehlt Python, blockiert der Hook nichts** (Hook-Fehler sind in Claude Code nicht blockierend). Test: `python3 nigel/hooks/guard.py < NUL` muss Exit 2 liefern.
3. **Deine Kennung in `nigel/policy/policy.json` → `approvers`** eintragen (selbst, per PR).
4. **Mandanten in `nigel/policy/tenants.json`** mit Datenordnern (A7), selbst, per PR.
5. **Live-Test lokal:** In einer Kopie mit synthetischem Mandanten eine Meeting-Aufgabe starten und prüfen, dass
   - `nigel-run` geladen wird,
   - `nigel-orchestrator` Eingang, Umfang und Plan anlegt,
   - bei der Follow-up-Mail Exit 3 kommt,
   - ein Freigabeversuch durch Claude am Hook scheitert,
   - der fremde Mandant abgelehnt wird.
   
   Ergebnis: Ledger-Auszug. Erst dann steht Nigel auf `runtime-verified`.
6. **Pro Fachagent**, bevor er routbar wird: Agentendatei, Rollenkarte nach Blueprint 5, Tests, Review, von dir auf `active` gesetzt. Empfohlen als erstes: Ava (Meeting-Ablauf), weil es mit Company OS «Executive Assistant/Meeting-Agent» eine gute Deckung gibt.
7. **Connectoren für externe Aktionen** (Mail, Kalender, CRM) je einmal nur lesend testen (A5). Vorher führt kein Ablauf eine externe Aktion aus. Die Engine gibt nur frei, ausführen muss ein Werkzeug.
8. **Nachtlauf-Zeitplan** erst nach 1 bis 7. Entweder Windows-Aufgabenplanung mit `claude -p "/nigel-run night"` oder eine Routine. Nicht eingerichtet.
