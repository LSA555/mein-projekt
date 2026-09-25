---
tags: [nigel, ai-workforce, audit, cycle-report]
status: awaiting-approval
date: 2026-09-25
source: claude
chat_url: "https://claude.ai/code/session_01JsQoSQbozeyt2EYitpEXuf"
para: "03 Areas/AI Workforce/Nigel"
---

# NIGEL 2.0 – Zyklus 0: Discovery-Vorbereitung

Stand: **geplant + implementiert + getestet (synthetisch)**. Nichts ist freigegeben oder produktiv. Über das Vault gibt es noch keine Befunde, weil es von hier aus nicht erreichbar ist (siehe `ACCESS_REQUEST.md`).

## Erledigt

| Was | Datei |
|---|---|
| Lesendes Inventur-Skript für das Vault (PowerShell) | `nigel/scripts/Invoke-NigelVaultInventory.ps1` |
| Selbsttest mit synthetischem Vault | `nigel/tests/Test-NigelVaultInventory.ps1` |
| Zugriffsanfrage mit 7 Punkten | `nigel/ACCESS_REQUEST.md` |
| Anleitung | `nigel/README.md` |

Das Skript liefert die Rohdaten für `INVENTORY.csv`, `DUPLICATES.md`, `RISK_REGISTER.md` (Teil Geheimnisse/Personendaten) und `GAP_ANALYSIS.md` (Teil Frontmatter). `AUDIT_REPORT.md`, `DEPENDENCY_MAP.md` und `MIGRATION_PLAN.md` entstehen erst aus echten Daten.

## Validiert

- 21 von 21 Prüfungen bestanden, PowerShell 7.4.6 unter Linux.
- Geprüft wird: Vault bleibt unverändert (Grösse und Zeitstempel jeder Datei), Ausgabe im Vault wird abgelehnt, ohne dort etwas anzulegen, Frontmatter (Inline- und Blocklisten, fehlender Abschluss), Duplikate nach Inhalt und Name, kaputte Wikilinks, Geheimnis-Muster mit Zeilennummer, **ohne** den Wert zu exportieren, MCP-Konfiguration nur mit Variablennamen, Manifest-Hashes.
- Zwei Fehler hat der Test gefunden und ich habe sie behoben: (1) der Schutz gegen Ausgabe im Vault legte den Ordner an, bevor er prüfte; (2) Absturz beim CSV-Export durch einen PowerShell-Bug mit generischen Listen.

**Grenzen:**
- Nicht unter Windows PowerShell 5.1 getestet. Der Code verzichtet auf 7er-Syntax, ein echter Lauf auf deinem Rechner bleibt trotzdem der eigentliche Test.
- Die OneDrive-Erkennung für «nur online» verfügbare Dateien (Attribute `RecallOnDataAccess`/`Offline`) ist unter Linux nicht testbar.
- Die Geheimnis-Muster sind Heuristiken und liefern Fehlalarme (IBAN, Kreditkarten-ähnliche Zahlen).

## Wartet auf Freigabe

1. **A1–A7** in `ACCESS_REQUEST.md`, vor allem A1 (Skript laufen lassen) und A2 (`CLAUDE.md`, `Schreibstil.md`).
2. **Widersprüche zwischen Blueprint und deinen bestehenden Regeln**, bitte entscheiden:
   - Blueprint Abschnitt 7 schlägt `05 Archives/` vor. Deine Daily-Note-Regel nutzt `05 Daily Notes/`. Mein Vorschlag: bestehende Nummerierung behalten, der Blueprint passt sich an.
   - Blueprint Abschnitt 7 nennt `source: chatgpt` als Standard. Deine Regel sagt `source: claude` bzw. der tatsächlich erzeugende Agent. Mein Vorschlag: immer die echte Quelle.
   - Blueprint Abschnitt 7 kennt kein `00 Kontext/`. Den Ordner gibt es laut deinen Einstellungen. Mein Vorschlag: `00 Kontext/` als Ort für verbindliche Regeln aufnehmen.

## Blockiert

- Vault, `CLAUDE.md`, `Schreibstil.md`: kein Zugriff aus der Cloud-Session. Deshalb habe ich auch den Schreibstil-Self-Check nicht gegen deine Datei gemacht.
- Microsoft 365 / Graph: kein Connector.
- Daily Note: kann ich nicht ins Vault schreiben. Entwurf liegt unter `nigel/vault-staging/05 Daily Notes/2026-09-25.md` zum Rüberkopieren.

## Nächste Schritte

| # | Owner | Priorität | Aufgabe | Nutzen | Aufwand | Abnahme |
|---|---|---|---|---|---|---|
| 1 | Leila | hoch | Skript lokal laufen lassen, `SUMMARY.md` + `INVENTORY.csv` teilen | Erste belastbare Ist-Aufnahme | ca. 10 Min. | Dateien liegen vor, `RUN_MANIFEST.json` ohne Fehler |
| 2 | Leila | hoch | `CLAUDE.md` und `Schreibstil.md` bereitstellen | Verbindliche Regeln greifen | 5 Min. | Inhalt im Chat oder Repo |
| 3 | Claude | hoch | Aus den Daten `AUDIT_REPORT.md`, `DUPLICATES.md`, `RISK_REGISTER.md`, `GAP_ANALYSIS.md` erstellen | Gate 1 vorbereiten | 1 Session | Jede Aussage mit Pfad belegt, Unbekanntes markiert |
| 4 | Leila | mittel | A7: Firmen- und Projektzuordnung | Grundlage für Mandantentrennung | 15 Min. | Tabelle Firma → Projekte → Datenklasse |
| 5 | Claude | mittel | Nach A5: je ein lesender Verbindungstest pro Connector | Integrationsstatus belegt statt vermutet | 1 Session | Log pro Connector: Zeitpunkt, Aufruf, Ergebnis |
| 6 | Claude | niedrig | Nach A3: SKILL.md/AGENT.md gegen das Schema aus Blueprint 5 und 6 bewerten | Kompetenzlücken-Matrix | 1–2 Sessions | Bewertung pro Kriterium mit Beleg, kein A1 ohne Test |

Kosten: Für die Schritte oben fallen keine zusätzlichen Lizenzen an. Modellkosten pro Session kann ich von hier aus nicht messen, deshalb nenne ich keine Zahl.
