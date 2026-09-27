---
tags: [cyspa, cyber-briefing, geschaeftsleitung, check-in]
status: NEEDS INPUT
date: 2026-09-28
kw: 2026-W40
meeting: "[[2026-09-28 Check-in Meeting]]"
mandant: cyspa
owner: LWE
erstellt_von: Michael (Skill cyber-briefing), Nigel-Aufgabe NGL-20260927-aad8c0, Runde 3
klassifizierung: internal
quellenstand: "CISA KEV Katalog 2026.09.25; BACS über Websuche 27.09.2026"
last_review: 2026-09-27
source: claude
chat_url: "https://claude.ai/code/session_01JsQoSQbozeyt2EYitpEXuf"
---

# Cyber Security Briefing für die Geschäftsleitung, KW 40

**Lesezeit 3 Minuten · für das Check-in 28.09.2026, 08:00**

**Zur Quellenlage:**
- Die Schwachstellen stammen aus dem offiziellen Datensatz des CISA-Katalogs und sind selbst ausgewertet: `VERIFIED`.
- Die Aussagen zur Schweiz stammen aus Suchergebnissen zum BACS, die Originalseiten waren gesperrt: `REPORTED`. Vor einer Weitergabe an Kunden sind sie zu bestätigen.

## Lage

**Erhöht** `INFERRED`: Vom 1. bis 25. September wurden 39 Schwachstellen neu als aktiv ausgenutzt gemeldet, 17 davon in Netzwerk-, Zugangs- und Fernwartungsprodukten, wie sie auch bei KMU üblich sind.

## Fünf Kernaussagen

**1. Netzwerk-, Zugangs- und Fernwartungsprodukte stehen im Zentrum.** `VERIFIED`
17 von 39 neu gelisteten Schwachstellen betreffen solche Produkte (10 davon Fernzugang, Firewall und Fernwartung im engen Sinn), darunter Fortinet, Citrix NetScaler, SonicWall, Check Point, F5, Cisco, MikroTik und die Fernwartung ScreenConnect. Der Katalog KEV (Known Exploited Vulnerabilities) enthält nur Schwachstellen mit belegter Ausnutzung im Feld; die US-Behörde CISA führt ihn.
→ **Für uns und Kunden:** Wer eines dieser Produkte betreibt und nicht aktualisiert hat, ist ein naheliegendes Ziel. Das ist ein konkreter Anlass für einen kurzen Check bei unseren Kunden (E1). `INFERRED`

**2. Microsoft-Umgebungen sind doppelt betroffen.** `VERIFIED` / `REPORTED`
Im Katalog stehen zwei Windows-Schwachstellen und eine SharePoint-Schwachstelle (`VERIFIED`). Das Bundesamt für Cybersicherheit (BACS) meldet mehr Phishing (gefälschte Anmeldeseiten und Mails, die Zugangsdaten abgreifen) gegen Microsoft-365-Konten, mit denen Angreifer danach weitere Betrugsmails versenden (`REPORTED`).
→ **Für uns:** Aktuelle Updates und eine Anmeldung, die sich nicht abphishen lässt (Multi-Faktor-Authentifizierung mit Sicherheitsschlüsseln oder Passkeys), sind die zwei wirksamsten Hebel. `INFERRED`

**3. Webseiten und Online-Shops werden gekapert.** `VERIFIED` / `REPORTED`
Am 25.09. kam eine Schwachstelle in **WordPress Core** dazu, im September zudem zwei in Adobe Commerce/Magento (`VERIFIED`). Das BACS meldet mehr kompromittierte Schweizer Webseiten, die Schadsoftware verteilen (`REPORTED`).
→ **Für uns:** Das betrifft unsere eigene Webseite, sie steht morgen auch auf der Agenda. Auf welchem System sie läuft: `UNKNOWN`. Ein Sicherheits-Check vor der nächsten Änderung ist angezeigt (E2). `INFERRED`

**4. Auch Backup-Software ist betroffen.** `VERIFIED` / `INFERRED`
Am 16.09. wurde eine Schwachstelle im Acronis-Backup-Plugin für die Hosting-Oberflächen cPanel/WHM und Plesk gelistet: Zu offene Standardrechte erlauben eine Ausweitung von Berechtigungen (`VERIFIED`). Ob Backups generell verstärkt angegriffen werden, lässt sich aus einem Eintrag nicht ableiten (`INFERRED`).
→ **Für uns und Kunden:** Bei Ransomware (Schadsoftware, die Daten verschlüsselt und Lösegeld fordert) sind Backups die letzte Verteidigungslinie. Getrennte Zugänge und regelmässige Wiederherstellungstests bleiben Pflicht. `INFERRED`

**5. Auch KI- und Entwicklerwerkzeuge sind im Katalog.** `VERIFIED`
Gelistet sind unter anderem LiteLLM (ein verbreiteter Vermittler zwischen Anwendungen und KI-Modellen), GitLab und JFrog Artifactory.
→ **Für uns:** Wir setzen selbst KI-Agenten ein. Ob einer dieser Bausteine bei uns im Einsatz ist: `UNKNOWN`, das wird intern geklärt. `INFERRED`

## Entscheidungsbedarf der Geschäftsleitung

| # | Frage (Ja/Nein) | Empfehlung |
|---|---|---|
| E1 | Erhalten bestehende Kunden eine kurze Warnung zu Netzwerk-, Zugangs- und Fernwartungsprodukten (Produktliste im Anhang)? | **Ja.** Michael erstellt einen Entwurf, versendet wird erst nach Freigabe durch LWE. |
| E2 | Machen wir vor der nächsten Änderung einen Sicherheits-Check der CYSPA-Webseite? | **Ja.** Geringer Aufwand, hohes Reputationsrisiko. |
| E3 | Sollen die BACS-Zahlen erst nach Bestätigung an der Originalquelle und nur in späteren Posts verwendet werden, **nicht** im NIS2-Post vom 29.09.? | **Ja.** Der Fachreview von #07 ist noch offen. Eine unbestätigte Quelle würde ihn zusätzlich belasten, und das ist bis Dienstag nicht machbar. |

## Massnahmen

| Bereich | Massnahme | Owner | Bis |
|---|---|---|---|
| Intern | Eigene Fernzugänge, Firewall, Fernwartung, Microsoft 365 und Backup gegen die Liste im Anhang prüfen | LWE (Fallback), IT-Verantwortliche `NEEDS INPUT` | 30.09. |
| Intern | Einsatz von LiteLLM, GitLab und Artifactory klären | LWE (Fallback) | 30.09. |
| Intern | BACS-Aussagen an der Originalquelle bestätigen | LWE (Fallback) | 02.10. |
| Kunden | Entwurf Kurzwarnung (nur bei E1 = Ja) | Michael (Entwurf), LWE (Freigabe) | 30.09. |
| Webseite | System und Versionsstand feststellen, Sicherheits-Check (nur bei E2 = Ja) | Webseiten-Owner `NEEDS INPUT`, Fallback LWE | 02.10. |
| Marketing | BACS-Zahlen nach Bestätigung für Oktober-Posts bewerten (nur bei E3 = Ja) | Head of Content `NEEDS INPUT`, Fallback LWE | 06.10. |

## Anhang für IT: aktiv ausgenutzte Schwachstellen, 01.–25.09.2026

Quelle: CISA KEV, offizieller Datensatz, Katalogversion 2026.09.25, 39 Einträge `VERIFIED`

**Fernzugang, Firewall, Netzwerk (15)**

| Gelistet | Produkt | CVE |
|---|---|---|
| 02.09. | SonicWall SMA1000 (2) | CVE-2026-83548, CVE-2026-83549 |
| 09.09. | Citrix NetScaler | CVE-2026-19490 |
| 09.09. | Fortinet (mehrere Produkte) | CVE-2025-25249 |
| 09.09. | Cisco Secure Firewall Management Center | CVE-2026-20079 |
| 10.09. / 25.09. | MikroTik RouterOS (3) | CVE-2026-86060, CVE-2026-67277, CVE-2026-67279 |
| 14.09. | Cisco Secure Email Gateway | CVE-2026-76461 |
| 16.09. | Cisco Identity Services Engine | CVE-2026-76460 |
| 21.09. | Zyxel GS1900 Switches | CVE-2026-7273 |
| 22.09. | Check Point (2) | CVE-2026-85102, CVE-2026-93616 |
| 22.09. | F5 BIG-IP APM | CVE-2026-94127 |
| 22.09. | Arista VeloCloud Orchestrator | CVE-2026-93952 |

**Fernwartung (2)**
- 08.09. N-able N-central, CVE-2026-86218
- 11.09. ConnectWise ScreenConnect, CVE-2026-84869

**Microsoft (3)**
- 08.09. Windows, CVE-2026-81963 und CVE-2026-85880
- 25.09. SharePoint, CVE-2026-65660

**Web und Shop (3)**
- 08.09. Adobe Commerce/Magento, CVE-2026-75650
- 24.09. Adobe Commerce/Magento, CVE-2026-71362
- 25.09. WordPress Core, CVE-2026-87902

**Backup (1)**
- 16.09. Acronis Backup Plugin für cPanel/WHM und Plesk, CVE-2026-87886

**KI und Entwicklung (7)**
- 02.09. BerriAI LiteLLM, CVE-2026-59822
- 02.09. JFrog Artifactory, CVE-2026-82329
- 11.09. JFrog Artifactory, CVE-2026-42016 und CVE-2026-42018
- 11.09. GitLab CE/EE, CVE-2026-85706
- 02.09. Kestra OSS, CVE-2026-49869
- 02.09. Starlette, CVE-2026-48710

**Weitere (8)**
- 04.09. / 09.09. Google Chromium V8, CVE-2026-85046 und CVE-2026-87491
- 16.09. Google Pixel, CVE-2026-58704
- 18.09. Linux Kernel (3), CVE-2025-39964, CVE-2026-53266, CVE-2025-39682
- 24.09. WSO2 (mehrere Produkte), CVE-2026-5430
- 02.09. Sangoma Switchvox, CVE-2026-9586

## Quellen

- CISA Known Exploited Vulnerabilities, offizieller Datensatz (Katalogversion 2026.09.25, abgerufen 27.09.2026): https://raw.githubusercontent.com/cisagov/kev-data/main/known_exploited_vulnerabilities.json · Katalog: https://www.cisa.gov/known-exploited-vulnerabilities-catalog `VERIFIED`
- BACS, Halbjahresbericht 2026/1: https://www.bacs.admin.ch/de/hjb-26-de1 (Websuche 27.09.2026, Seite nicht geöffnet) `REPORTED`
- BACS, Aktuelle Vorfälle: https://www.bacs.admin.ch/de/aktuelle-vorfaelle (Websuche 27.09.2026, Seite nicht geöffnet) `REPORTED`

**Zur späteren Verwendung, nicht Teil der Kernaussagen:** Laut Suchergebnis zum BACS-Halbjahresbericht gab es im ersten Halbjahr 2026 27'128 freiwillige Meldungen und 200 meldepflichtige Vorfälle (`REPORTED`, bis zur Bestätigung nicht verwenden). Seit November 2025 warnt der Bund zusätzlich über Alertswiss, die Warn-App des Bundes (`REPORTED`).
