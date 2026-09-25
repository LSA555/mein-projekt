---
tags: [nigel, ai-workforce, access-request, discovery]
status: awaiting-approval
date: 2026-09-25
source: claude
chat_url: "https://claude.ai/code/session_01JsQoSQbozeyt2EYitpEXuf"
para: "03 Areas/AI Workforce/Nigel"
---

# NIGEL 2.0 – Zugriffsanfrage für die Discovery-Phase

Grundlage: Blueprint Abschnitt 2.1 und 12. Alles hier ist **lesend**. Schreibzugriffe folgen erst nach Gate 1 und Gate 2.

## Was diese Session sieht und was nicht

| Quelle | Stand am 2026-09-25 | Beleg |
|---|---|---|
| Obsidian Vault (`C:\Users\LeilaWeberCYSPA\OneDrive - CYSPA GmbH\Dokumente\Obsidian Vault`) | **nicht erreichbar** | Die Session läuft in einem Cloud-Container ohne Zugriff auf deinen Rechner oder dein CYSPA-OneDrive |
| `CLAUDE.md` im Vault, `00 Kontext/Schreibstil.md` | **nicht gelesen** | wie oben; die Regeln daraus konnte ich deshalb nicht anwenden |
| Repo `lsa555/mein-projekt` | lesbar und beschreibbar | vor dieser Session nur `README.md` |
| Connectoren in der Session: Gmail, Google Calendar, Google Drive, HubSpot, Canva, Gamma, Higgsfield, Webflow, Supermetrics, GitHub | **vorhanden, nicht getestet** | Ich habe bewusst nichts abgefragt. Ohne deine Freigabe lese ich keine Postfächer und kein CRM |
| Tavily (Websuche) | nicht autorisiert | muss in den claude.ai-Connector-Einstellungen verbunden werden |
| Microsoft 365 / Graph (Outlook, Teams, SharePoint, OneDrive CYSPA), Entra, Apollo | **kein Connector vorhanden** | nicht in der Tool-Liste dieser Session |

## Anfragen (in empfohlener Reihenfolge)

| # | Anfrage | Zweck | Risiko | Wie |
|---|---|---|---|---|
| A1 | Inventur-Skript lokal laufen lassen, `SUMMARY.md` + `INVENTORY.csv` teilen | Ist-Zustand des Vaults ohne Cloud-Zugriff | niedrig: nur lesend, Ausgabe ausserhalb des Vaults, keine Geheimnisse im Output | siehe `README.md`, Abschnitt «Inventur ausführen» |
| A2 | Inhalt von `CLAUDE.md` (Vault-Wurzel) und `00 Kontext/Schreibstil.md` hier einfügen oder ins Repo legen | Verbindliche Regeln und Schreibstil anwenden | niedrig | Copy & Paste |
| A3 | Alle `SKILL.md`, `AGENT.md` und Agent-Registry-Notizen (Liste kommt aus `AGENT_SKILL_CANDIDATES.csv`) | Skill- und Agentenbewertung nach Blueprint 2.2 und 6 | mittel: können Kundennamen enthalten, vorher durchsehen | Dateien in einen Ordner `nigel/input/` im Repo legen, sensible vorher schwärzen |
| A4 | Lauf mit `-IncludeClaudeConfig` | Welche MCP-Server lokal konfiguriert sind (nur Namen, nie Werte) | niedrig | Schalter ans Skript anhängen |
| A5 | Freigabe für je **einen** lesenden Verbindungstest pro Connector (z. B. HubSpot: Anzahl Kontakte; Kalender: Liste der Kalender; Gmail: Liste der Labels) | Blueprint 8: kein Connector gilt als aktiv ohne erfolgreichen Lesetest | mittel: Zugriff auf Geschäftsdaten, deshalb nur Metadaten | Antwort «A5 freigegeben für: …» |
| A6 | Entscheidung, ob Microsoft 365 per Connector angebunden werden soll | Outlook/Teams/Kalender von CYSPA sind der Kern des Pilot-Workflows (Blueprint 11) | hoch: braucht Admin-Consent im CYSPA-Tenant | erst nach Gate 2 (Berechtigungsmodell) |
| A7 | Liste der Firmen und Projekte mit Zuordnung (welche gehören rechtlich/kommerziell zusammen) | Mandantentrennung nach Blueprint 1 und 2.1 | niedrig | kurze Tabelle genügt |

Für A7 die Kandidaten aus dem Blueprint, alle **unbestätigt**: CYSPA, NEX Partnerprogramm, ChocoSwiss DXB, Rock & Arts, Alpha AI, Pixel Valley, private Administration, Verein/Non-Profit.
