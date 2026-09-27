---
tags: [cyspa, marketing, webseite, flyer, sicherheits-check, uebersicht]
status: Entwurf, Freigabe LWE ausstehend
date: 2026-09-27
source: claude
chat_url: "https://claude.ai/code/session_01JsQoSQbozeyt2EYitpEXuf"
---

# Webseite, Landingpage, Flyer, Sicherheits-Check: Übersicht

**Stand:** So 27.09.2026 · **Ziel:** bis Mi 30.09. freigabefertig (LWE ab Do 01.10. in den Ferien)
**Rollen:** Oliver (Web/Content), Michael (Security) · **Freigabe:** nur LWE

**Wichtige Einschränkung:** cyspa.ch war aus der Erstellungsumgebung nicht erreichbar, und es gibt keinen Zugang zum CMS. Alles hier sind **Texte, Konzepte und Dateien zum Einpflegen**. Nichts wurde publiziert, versendet oder im CMS geändert. Der heutige Stand der Webseite ist nicht abgeglichen.

## 1. Was fertig ist

| Nr. | Datei | Inhalt | Stand |
|---|---|---|---|
| 1 | `webseite-texte.md` | Startseite (Hero, Nutzen, Leistungen-Teaser, Vertrauen, CTA), Leistungen (7 Blöcke: Problem, Vorgehen, Ergebnis, für wen), Über uns; SEO je Seite (Title ≤ 60, Meta ≤ 155, H1) | Entwurf fertig |
| 2 | `landingpage-tabletop.md` | Landingpage `/tabletop` für LinkedIn-Beitrag #10 (08.10.): Hero, Problem, Ablauf, Ergebnis für GL, FAQ, CTA, Formularfelder, revDSG-Hinweis, UTM-Schema | Entwurf fertig |
| 2 | `landingpage-tabletop.html` + `assets/` | Eigenständige, responsive HTML-Vorlage im **CI v3.0** (Raleway lokal, Navy/Navy Deep, Gold nur Akzent und CTA-Button mit Navy-Text, Hover Blue nur für Hover, Gold-Seitenbalken, Kopfzeile «CYSPA.ch»). Inhalte, Formular (Pflichtfelder Name, Unternehmen, E-Mail), UTM-Skript und Platzhalter unverändert. Geprüft bei 320, 375 und 1280 px ohne horizontales Scrollen, UTM-Übernahme getestet (27.09.) | Vorlage fertig |
| 3 | `flyer-tabletop.md` | Flyer «Tabletop-Übung für Geschäftsleitungen»: Text, Druckhinweise, Abweichungen vom Beispiel, offene Platzhalter | Entwurf fertig |
| 3 | `flyer-tabletop.pdf` | **CI v3.0** im Stil des Flyers «CISO as a Service» von LWE (Serifen-Headlines, Gold-Akzente, Navy-Flächen). A4 hoch, 2 Seiten, 3 mm Beschnitt, TrimBox/BleedBox, Fonts eingebettet, kein Personenfoto, keine Statistiken | Entwurf mit markierten Platzhaltern |
| 3 | `flyer-tabletop-s1.png`, `-s2.png`, `flyer-tabletop.html` | Vorschau und Quelle | n/a |
| 3 | `_alt-ci/flyer-cyspa.*` | Alter Flyer «CYSPA im Überblick» im ungültigen Cyan-Design, nur Archiv | ungültig |
| 4 | `sicherheits-check/Check-Invoke-CyspaWebCheck.ps1` | Passiver Web-Check (PowerShell 7), Markdown-Bericht mit Management-Summary (Top-3, Entscheidungsbedarf), Zuordnung ISO/IEC 27001:2022 Anhang A, Verteiler und Abnahme (Michael, LWE) | Syntax geprüft, Selbsttest 43/43, Ende-zu-Ende-Test gegen lokalen Nachbau |
| 4 | `sicherheits-check/README.md` | Anleitung, Grenzen, Interpretation, Massnahmenkatalog, Bezug E2 | fertig |
| 4 | `sicherheits-check/beispiel-bericht-testumgebung.md` | Beispielbericht (Testumgebung, nicht cyspa.ch) | n/a |

## 2. Was LWE tun muss

### Bis Mo 28.09. (Check-in)
1. **Entscheid E2 bestätigen** (Sicherheits-Check der Webseite vor der nächsten Änderung).
2. **Webseiten-Owner benennen** (im Briefing `NEEDS INPUT`). Wer pflegt die Texte ein, wer hat CMS-Zugang?
3. **Sicherheits-Check ausführen lassen** (LWE oder IT, 5 Minuten): `sicherheits-check/README.md`. **Unabhängig vom Ergebnis:** Falls WordPress im Einsatz ist, die Version im Backend gegen CVE-2026-87902 prüfen und aktualisieren. Die Schwachstelle wird aktiv ausgenutzt.

### Bis Mi 30.09. (vor den Ferien)
4. **Leistungsportfolio bestätigen** (`webseite-texte.md` Kap. 2). Unsicher sind: 2.3 Security-Baseline als eigene Leistung, 2.5 Nachtest, 2.7 AI Security. Bewusst weggelassen: Krypto-Inventar/Post-Quantum, Whitepaper.
5. **Platzhalter liefern oder Streichung freigeben** (Liste in Kapitel 3).
6. **Texte und Gestaltung freigeben:** Webseite, Landingpage, Flyer Tabletop (CI v3). Legal-Gate: keine Superlative, keine Kundennamen, keine unbelegten Zahlen (vorgeprüft, Freigabe durch LWE).
7. **Stellvertretung für Anfragen** über `/tabletop` ab 08.10. bestimmen (LWE in den Ferien).
8. **Umsetzung beauftragen:** Landingpage bis spätestens **Mi 07.10.** live und getestet, sonst Fallback-Link auf `/kontakt` im Kommentar zu Beitrag #10.

### Reihenfolge der Umsetzung (gemäss E2)
Sicherheits-Check → Massnahmen «Handlungsbedarf» (insbesondere M-CVE) → Texte und `/tabletop` einpflegen → Check erneut ausführen.

## 3. Offene Platzhalter

| Platzhalter | Datei(en) | Wer |
|---|---|---|
| UID / Handelsregister (Impressum) | Webseite | LWE |
| Gründungsjahr, Kurzgeschichte | Webseite (Über uns, Vertrauen) | LWE, nur wenn belegt |
| Teamvorstellung, Teamgrösse, Fotos mit Einwilligung | Webseite (Über uns) | LWE |
| Zertifizierungen, Mitgliedschaften, Partnerschaften | Webseite (Vertrauen, Über uns) | LWE, nur mit Nachweis |
| Referenzen/Kundenstimmen | Webseite | nur mit schriftlicher Kundenfreigabe, sonst Block streichen |
| Preismodell (allgemein, Tabletop) | Webseite, Landingpage | LWE |
| CISO-as-a-Service: Pensum, Vertragsdauer | Webseite 2.1 | LWE |
| Tabletop: Vorgespräch, Ort, Gruppengrösse, Szenario-Zuschnitt, Lieferfrist, Vertraulichkeitsvereinbarung, Preis; Ablauf in 4 Schritten und «½ Tag / 90 Minuten» bestätigen | Landingpage, Flyer Tabletop | LWE / Incident Response Specialist |
| Antwortfrist nach Anfrage, Notfall-Erreichbarkeit | Landingpage, Webseite | LWE |
| Datenschutzerklärung-Link, Impressum-Link | Landingpage (HTML) | Webentwicklung |
| Formular-Endpunkt (CMS/CRM/Mail), Speicherort der Daten | Landingpage (HTML) | Webentwicklung, Datenschutzerklärung ergänzen |
| Analytics-Werkzeug | Landingpage | Webentwicklung |
| og:image | Landingpage | Oliver (z. B. Slide 1 des Carousels) |
| Vektorlogo (SVG/PDF), Freigabe der abgeleiteten hellen Logovariante, Logo-Widerspruch (Unterstrich) | Flyer (Druck), Landingpage | LWE |
| QR-Code und URL `/tabletop`, Druckstand, Auflage, Papier, CMYK-Werte | Flyer Tabletop | nach Livegang `/tabletop`, CMYK: LWE |
| security.txt: Meldeadresse, Ablaufdatum | Sicherheits-Check README (M-SECTXT) | LWE |
| Kommentar-Link Beitrag #10 | `linkedin/posts/2026-10-08-p12-tabletop-exercise.md` | Oliver, Text liegt in `landingpage-tabletop.md` Kap. 1 |

## 4. Hinweise und Risiken

- **CI v3.0 umgesetzt (27.09.):** Flyer und Landingpage folgen jetzt `ci-referenz/CI-v3-kurzreferenz.md` und dem Flyer «CISO as a Service» von LWE. Das Cyan-Design aus dem LinkedIn-Repo ist ersetzt; der alte Flyer liegt unter `_alt-ci/`. Schriften lokal unter `assets/fonts/` (Raleway, Source Serif 4, OFL). Die Kennzahlen des CISO-Flyers («100+ Kunden», Mobiliar-Studie) sind bewusst nicht übernommen, weil die Quelle für uns nicht prüfbar ist.

- **Konsistenz mit LinkedIn:** Die Arbeitsprinzipien (Webseite, Flyer) stammen aus dem Beitrag vom 15.10. (Draft). Beitrag und Webseite sollten gleich lauten. Wird der Beitrag geändert, Webseite und Flyer nachziehen.
- **Legal-Gate:** Kein `[PLATZHALTER …]` und keine `> Redaktion:`-Zeile darf live gehen.
- **Logo:** Nur als PNG 288 × 122 px vorhanden. Im Flyer Tabletop auf ca. 21 mm Breite gesetzt (ca. 350 dpi). Die helle Variante `assets/img/cyspa-logo-hell.png` ist abgeleitet und nicht freigegeben. Vektorlogo anfordern.
- **Sicherheits-Check:** gegen cyspa.ch selbst und unter Windows noch nicht gelaufen. Erster echter Lauf durch LWE bzw. IT.
- **Nicht erledigt, weil ausserhalb dieser Umgebung:** Abgleich mit der bestehenden Webseite, Einpflegen im CMS, Druckauftrag.

## 5. Änderungsprotokoll Copy-Regeln CI v3 (27.09.2026)

Regeln: kein Gedankenstrich im Satzfluss, «ss» statt «ß», keine Ausrufezeichen. Zahlenbereiche bleiben.

| Datei | Änderung |
|---|---|
| `webseite-texte.md` | 26 Gedankenstriche ersetzt durch Punkt, Komma oder Doppelpunkt (u. a. Hero-Lead, Leistungs-Teaser, Arbeitsprinzip 1, CTA-H2, Platzhaltertexte). SEO-Titles mit «\|» bzw. «:» statt «–», Längen unverändert (47, 51, 50). H1 Über uns: «Cyber Security Partners. Mit Betonung auf Partner». Leere Tabellenzellen «–» durch «n/a». Adresse eingesetzt: Erlenstrasse 4B, CH-6343 Rotkreuz (Quelle: Flyer «CISO as a Service» von LWE). «ß» und «!» kamen nicht vor. |
| `landingpage-tabletop.md` | 7 Gedankenstriche ersetzt (Befugnisse, Meldefristen, Titel, Metadaten, Analytics-Platzhalter), Kommentar-Text «CYSPA — Ablauf» zu «CYSPA. Ablauf». Leere Tabellenzellen «n/a». Übergabe-Abschnitt auf CI v3 umgeschrieben. **Offen:** Das Freigabepaket `linkedin/freigabe/2026-10-08-10-tabletop-uebung.md` (Post-Text und Kommentar) enthält noch Gedankenstriche und wurde hier nicht geändert; vor der Publikation angleichen. |
| `landingpage-tabletop.html` | Dieselben 2 Textstellen wie in der .md (Befugnisse, Meldefristen). FAQ-Symbol «–» durch Minuszeichen ersetzt. Fusszeile mit voller Adresse. |
| `flyer-tabletop.*` | Neu im CI v3 gesetzt, regelkonform geprüft. |
| `00-uebersicht-web.md` | Status und Titel ohne Gedankenstrich. |
