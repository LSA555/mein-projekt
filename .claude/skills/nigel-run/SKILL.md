---
name: nigel-run
description: Führt mehrstufige Aufgaben unter Nigel-Steuerung aus – mit Task-ID, gespeicherten Prüfpunkten (Eingang, Umfang, Plan, Ausführung, Prüfung, bestätigte Änderung, Abschluss), Freigabestopp, idempotenten externen Aktionen, begrenzten Korrekturversuchen und Wiederaufnahme nach Unterbrechung. Verwenden bei Aufgaben mit mehreren Schritten, externer Wirkung (Mail, Post, CRM, Angebot, Kalender, Security-Test) oder mehreren Agenten, bei "nigel", "weiter mit Task NGL-…", "Nachtlauf", und für die Abläufe Meeting bis Nachbearbeitung, LinkedIn bis Lead, Lead bis Angebot, Security Assessment.
---

# nigel-run

Engine: `python3 nigel/engine/nigel.py` (kurz `N`). Jeder Aufruf ist ein Beleg im Ledger. Erst erfassen, dann handeln.

## 0. Vor dem Start

- Läuft schon eine Aufgabe dazu? `N list --tenant <mandant> --open`. Wenn ja, **fortsetzen statt neu anlegen** (Abschnitt 4).
- Mandant nicht in `nigel/policy/tenants.json` → anhalten, Inhaberin fragen. Nicht raten, nicht mischen.

## 1. Eingang, Umfang, Plan (Nigel)

Agent `nigel-orchestrator` aufrufen mit Anfrage und Mandant. Er legt an und bestätigt:

```
N --actor nigel-orchestrator new --tenant T --project P --flow F --title "…" --requester R --request-key <stabiler Schlüssel der Anfrage>
N --actor nigel-orchestrator checkpoint <ID> intake --evidence "<Quelle der Anfrage>" --confirm
N --actor nigel-orchestrator checkpoint <ID> scope  --evidence "<Abgrenzung>" --confirm
N --actor nigel-orchestrator checkpoint <ID> plan   --evidence "<Plan-Pfad oder Schritte>" --confirm
```

Abläufe (`--flow`): `meeting-followup`, `linkedin-lead`, `lead-offer`, `security-assessment`, `night-run`. Schritte, Freigabepunkte und Abschlusskriterien stehen in `nigel/flows/<flow>.json`.

## 2. Ausführung

- Pro Schritt: `N route <ID> <agent_id>`. Wird das abgelehnt (Exit 6), ist der Agent nicht aktiv oder nicht für den Mandanten freigegeben. Dann führt die Hauptsession den Schritt selbst mit dem passenden Skill aus (z. B. `cyspa-angebot`) oder meldet die Blockade. **Nie einen nicht registrierten Agenten aufrufen.**
- Kontext nur über `N context <ID> <pfad>`. Wird das abgelehnt, gehört die Quelle einem anderen Mandanten: nicht lesen, nicht umgehen.
- Ergebnis sichern: `N checkpoint <ID> execute --evidence "<pfad>"`. Nach dem letzten Teilschritt `--confirm`.
- Fehlgeschlagen: `N fail <ID> --reason "…"`. Exit 5 heisst: Grenze erreicht, eskaliert. **Keinen weiteren Versuch.**

## 3. Externe Aktionen (genau einmal, nur mit Freigabe)

```
N action request <ID> --type send_email --target "<empfänger>" --payload-file <entwurf>
```

| Exit | Bedeutung | Was du tust |
|---|---|---|
| 0 + `"execute": true` | reserviert | jetzt genau einmal ausführen, dann `N action commit <ID> <key> --evidence "<referenz>"` |
| 0 + `"duplicate": true` | schon ausgeführt | **nicht** nochmals ausführen |
| 3 | Freigabe fehlt | anhalten; der Inhaberin Aktion, Empfänger, Inhalt und `key` nennen; Zug beenden |
| 4 | unklar (reserviert, nicht bestätigt) | nicht ausführen; im Zielsystem nachsehen und der Inhaberin melden |

`approve` und `action reconcile` sind Befehle für Menschen. Der Hook blockiert sie für Claude. Nicht umgehen.

## 4. Wiederaufnahme nach Unterbrechung

`N resume <ID>` → bei `resume_at` weitermachen. Bestätigte Phasen nicht wiederholen. Phasen mit `saved_but_unconfirmed` prüfen: Beleg vorhanden, dann bestätigen, sonst Schritt neu. `actions_in_doubt` nie erneut ausführen.

## 5. Prüfung, bestätigte Änderung, Abschluss

- Prüfung durch `nigel-orchestrator` (nicht durch den Ausführenden): DoD-Kriterien messen und erfassen: `N dod <ID> <kriterium> --value <messwert> --evidence "<beleg>"`. Danach `N --actor nigel-orchestrator checkpoint <ID> verify --evidence "<prüfprotokoll>" --confirm`.
- `confirmed_change` geht erst, wenn keine externe Aktion offen ist.
- `close` geht erst, wenn alle DoD-Kriterien erfüllt sind.

## 6. Nachtlauf (begrenzt)

```
N night plan --date YYYY-MM-DD          # wählt nur Aufgaben, deren nächste Phase nachts erlaubt ist
N night check --date … --task-id <ID>   # vor JEDEM Schritt; Exit 5 = sofort aufhören
N night report --date …                 # Morgenbericht nach .nigel/night/
```

Nachts keine externen Aktionen. Die Engine stellt sie automatisch zurück.

## 7. Lernen

Nach `close`: Erkenntnisse als Vorschlag, nie als direkte Änderung.

```
N learn propose --task-id <ID> --kind file|registry --target <pfad|agent_id> --change-file <datei> --rationale "…"
```

Übernahme erst nach `learn review` (unabhängig, nicht Vorschlagender oder Ausführender), `learn test` (nach dem Review, Exit 0) und `learn apply --version <höher>`. Berechtigungen, Status, Scope, Tools und Freigaberegeln lehnt die Engine ab. Diese Felder ändert nur ein Mensch.

## Abschlussbericht an die Inhaberin

Getrennt nach: **Erledigt** (mit Belegen) · **Geprüft** · **Wartet auf Freigabe** (was genau) · **Blockiert** · **Nächste Schritte**. Nichts als erledigt melden, was nur geplant oder nur synthetisch getestet ist.
