---
tags: [cyspa, ideen, backlog, marketing, linkedin, webseite]
status: offen, Priorisierung LWE
date: 2026-09-28
source: "claude, abgeleitet aus linkedin/freigabe/*.md, linkedin/posts-neu/00-planung-20-29-okt.md und Beitragsdateien, visuals-ci3/README.md, web/webseite-texte.md, landingpage-tabletop.md, flyer-tabletop.md, 00-uebersicht-web.md, 00-FREIGABELISTE-VOR-FERIEN.md, vault-staging (Check-in, One-to-One, Check-out, Cyber Security Briefing, Daily Notes 25. bis 28.09.), Branch claude/cyspa-linkedin-strategy-vte419 (02-content-pfeiler.md, 05-redaktionsplan.md)"
chat_url: "https://claude.ai/code/session_01JsQoSQbozeyt2EYitpEXuf"
---

# Ideen-Backlog

Ideen, die in den Arbeiten vom 25. bis 28.09.2026 aufkamen und noch nicht umgesetzt sind. Aufwand: S (unter 2 h), M (halber Tag), L (mehrere Tage). Nichts davon ist beauftragt.

## Priorität 1: nach den Ferien zuerst (Nutzen hoch, Abhängigkeit klar)

| # | Idee | Nutzen | Aufwand | Nächster Schritt | Quelle |
|---|---|---|---|---|---|
| I1 | **Aktualitätshaken NISG Österreich** (in Kraft 01.10.2026) und NIS2UmsuCG Deutschland | Anlass für Regulatorik-Post oder Kommentar zu #07; DACH-Bezug für Exporteure | S | Regulatory Expert prüft beide Angaben an der Primärquelle; Formulierung ab 01.10. «gilt seit» | #07 F6/F7 |
| I2 | **Serien-Nummerierung «TIPP DER WOCHE #NN»** fortführen (letzte bekannte Nummer #19) | Wiedererkennung, Anschluss an bestehende Serie SECURITY4KMU | S (eine Zeile `series` in `content.mjs`, neu rendern) | Entscheid LWE (E3), Nummerierung der bestehenden Serie liefern | README visuals-ci3 |
| I3 | **Landingpage `/tabletop` live** und weitere Landingpages (`/leistungen#ciso-as-a-service` für #16) | Harter CTA #10 und #16 braucht Zielseite; UTM ins CRM | M je Seite (Vorlage liegt vor) | Webseiten-Owner benennen, Sicherheits-Check E2 vorher | landingpage-tabletop.md, #16 |
| I4 | **Flyer CISO as a Service in CI v3 überarbeiten** (Fakten prüfen, Pakete, Leistungsansatz) | Zwei Flyer im gleichen System; unbelegte Kennzahlen («100+», Studie) bereinigen | M | LWE: Quelle Studie und Kundenzahl belegen oder streichen; Paketpreise bestätigen | Flyer LWE, flyer-tabletop.md |
| I5 | **Helle Bildmarke und Vektorlogo** | Logo auf dunklen Covers und im Druck | S für uns, Lieferung LWE | LWE liefert SVG/PDF; Widerspruch Unterstrich entscheiden | README, Flyer |
| I6 | **Repo-Pipeline korrigieren** (headless_shell, Element-Screenshot) und #01 bis #06 prüfen | Verhindert erneut weisse Balken; publizierte Posts ggf. ersetzen | M | Separater Auftrag; zuerst prüfen, ob #01 bis #06 so publiziert wurden | Übersicht 07–12, Freigabeliste §6 |

## Priorität 2: Batch 2 (KW 44 bis 49)

| # | Idee | Nutzen | Aufwand | Nächster Schritt | Quelle |
|---|---|---|---|---|---|
| I7 | **Passwordless-Folgeposts:** «MFA ist nicht gleich MFA: Stufen von Push bis Passkey», Passwort-Rotation ohne Anlass, Admin-Konten (Break-Glass) | Geprüfte Quellenbasis (W3C, NIST, OWASP VERIFIED) wiederverwenden | M je Post | Performance #13 im Review abwarten; Themennähe zu #01 beachten | #13, P1-Backlog |
| I8 | **Motion für #11 «Harvest now, decrypt later»** als Format-Experiment | Erfüllt «1 Motion» der Mix-Regel, Mechanik besser erklärbar | L (Motion Designer, Accessibility-Check) | Format im Batch-2-Plan setzen, Vorlauf 5 bis 10 Arbeitstage | #11 Empfehlung Static |
| I9 | **P12-Whitepaper «Incident-Readiness für Schweizer KMU»** plus **Decision Guide «Die ersten 24 Stunden nach Ransomware-Befund»** | Demand-Gen-Anker (Dokument-Post, Download-Funnel), vertieft Tabletop | L | Gliederung mit IR Specialist; Legal (keine Rechtsberatung); Funnel mit Demand Gen | 02 P12, 05 §4 |
| I10 | **Folgepost M365-Freigaben: anonyme Links («Anyone links»)** | Ergänzt #15; hoher Nutzwert Technical | M | Microsoft-Doku im Quelltext-Repo suchen (war nicht erreichbar) | #15 «bewusst weggelassen» |
| I11 | **Krypto-Inventar / Crypto Agility** (Folge zu #11) und ggf. als Gesprächsleistung | Vertieft P10; Leistung nur nach Entscheid LWE | M | Entscheid, ob Leistung; sonst reiner Wissenspost | #11, webseite-texte (weggelassen) |
| I12 | **BACS-Halbjahreszahlen** nach Bestätigung | Schweizer Zahlen für Lagebild-Post | S | Originalquelle bestätigen (Massnahme bis 02.10.) | Briefing E3 |
| I13 | **Schweizer Passkey-Quelle** (NCSC «Technologiebetrachtung Passkeys») als Kommentarbeleg zu #13 | Schweiz-Bezug | S | Dokument lesen, dann VERIFIED | #13 |
| I14 | **Serien-Staffel des stärksten Formats**, erstes Video (Talking Head CISO) | laut 05 §4 für Batch 2 vorgesehen | L | KPI-Review KW 43 abwarten | 05 §4 |
| I15 | **FAQ-Serie aus Kommentaren** («Wir sind zu klein, um ein Ziel zu sein» #05) | Themenquelle aus echter Nachfrage | S je FAQ | Kommentare #05 bis #16 sammeln | Check-in, P2 |

## Priorität 3: Plattform, Prozess, Webseite

| # | Idee | Nutzen | Aufwand | Nächster Schritt | Quelle |
|---|---|---|---|---|---|
| I16 | **Canva-Übergabe** der Visuals (HTML mit `data-document-role="page"`) | Selbst bearbeitbar durch das Team | M | HTML aus `_build/html/` nach Skill §4 anpassen | README, Skill |
| I17 | **Automatische Copy-Prüfung** (Gedankenstrich, ß, !, alte CI-Werte) für alle MD und Visuals | Häufigster Fehler (67 Fälle) automatisch verhindert | S | Skript als Vorschlag über `nigel.py learn` einbringen | Qualitätscheckliste |
| I18 | **Webseite: Leistungsportfolio ergänzen** (IKT-Minimalstandard, ISO 27001/ISMS, LLM Penetration Testing, Sparring) | Webseite deckt Angebot laut Abstimmungsmeeting ab | M | LWE bestätigt Leistungsliste | Textbausteine §3 |
| I19 | **security.txt** auf cyspa.ch (M-SECTXT) | Glaubwürdigkeit als Security-Anbieter | S | Meldeadresse und Ablaufdatum durch LWE | sicherheits-check |
| I20 | **og:image** für Landingpages aus Slide 1 (1200×627) | bessere Link-Vorschau | S | nach Livegang | landingpage-tabletop.md |
| I21 | **Tabletop-Flyer Druck** mit QR-Code nach Livegang `/tabletop` | Offline-Einsatz an Events | M | Preflight Druckerei, CMYK, Vektorlogo | flyer-tabletop.md |
| I22 | **Kundenwarnung E1** als wiederverwendbare Vorlage (Produktliste aus KEV) | Nützlicher Bestandskunden-Kontakt | M | nur nach Entscheid E1 und Freigabe LWE | Briefing |
| I23 | **Prüfen, ob LinkedIn Dokument-Posts und erste Kommentare vorplanbar** sind | Entlastet Stellvertretung | S | einmal im LinkedIn-Planer testen | Freigabeliste |
