---
tags: [cyspa, qualitaet, checkliste, pruefung, lessons-learned]
status: aktiv
date: 2026-09-28
source: "claude, abgeleitet aus QA-Protokollen coreteam/data/intern/weekly/2026-W40-qa.md und 2026-W40-qa-o2o-checkout.md, Prüfprotokollen coreteam/data/cyspa/pruefung/NGL-20260927-6124b9-runde1 bis runde3.md, Rubrics coreteam/nigel/quality/rubrics/*.md, Änderungstabellen und Gate-Vorprüfungen in linkedin/freigabe/*.md und linkedin/posts-neu/*.md, web/00-uebersicht-web.md, flyer-tabletop.md, visuals-ci3/README.md, 00-FREIGABELISTE-VOR-FERIEN.md, Branch claude/cyspa-linkedin-strategy-vte419 (03-styleguide.md, 04-prozess-qualitaet.md, 05-redaktionsplan.md)"
chat_url: "https://claude.ai/code/session_01JsQoSQbozeyt2EYitpEXuf"
---

# Qualitätscheckliste

Fehler, die in den Prüfrunden vom 27. und 28.09.2026 **mehrfach** auftraten, mit Anzahl und Beispielen. Darunter die Vorab-Checkliste für jeden künftigen Text, Post und jedes Visual.

Zählweise: Fälle = einzelne Befunde (in Prüfprotokollen, Änderungstabellen «Draft → Final» oder Gate-Vorprüfungen), nicht Textstellen. Grundlage: 7 Prüfprotokolle (Briefing, Check-in, One-to-One, Check-out, Passwordless R1 bis R3), 10 Freigabe- bzw. Beitragsdateien, Web- und Flyer-Übersichten.

## A. Wiederkehrende Fehler (nach Häufigkeit)

| # | Fehlerbild | Fälle | Beispiele | Gegenmassnahme |
|---|---|---|---|---|
| 1 | **Gedankenstrich im Satzfluss** | 67 ersetzt (32 LinkedIn #07 bis #12, 26 Webseite, 7 Landingpage MD, 2 HTML); rund 150 Reststellen in internen Metadaten | «Geschäftsleitungen — in Form von», «Führungsrunde — Szenario», Titel «Schweizer Unternehmen – über Verträge», Kommentar «CYSPA — Ablauf». Rest: Steckbrief «P1 — QUICK TIP», Status «Draft — …», sicherheits-check/README.md (23) | Punkt, Komma, Doppelpunkt oder Klammer. Automatisch prüfen (`/ [–—] /`). Zahlenbereiche (3–6–12) bleiben erlaubt |
| 2 | **Abkürzung oder Fachbegriff nicht erklärt** | 15 | #08 MFA, CISO · #10 BACS · #11 NIST · Briefing R1 MFA, Passkeys, KEV, Alertswiss · Briefing R2 Phishing, Ransomware · Check-in ISG · Passwordless FIDO2/Domain/Passkey, «phishing-resistent» · #16 MFA, Restore-Test | Liste in [[Textbausteine]] §10; in Executive-Texten jeden Begriff beim ersten Auftreten in einem Halbsatz |
| 3 | **Veraltete Pfade oder Angaben nach Änderungen** | 17 | Gate-3-Text #07, #09, #11: Pfad «visuals-ci3/ (alt: _alt-ci-assets/) 07-nis2/» verstümmelt · Steckbriefe #07, #09, #11, #12, #13, #14 «1200×1500» (gebaut 1200×1200) · #07, #12 «Weiss auf #0A1F44» (Repo-CI) · #12 Steckbrief beschreibt Plan-B-Asset als «Deep Space Blue, Montserrat, Cyan, Logo-Plakette» · #15 «JetBrains-Mono-Begriffe» · Übersicht 07–12 «liegen unter `assets/`» · 00-uebersicht-web: Kommentar-Link in `linkedin/posts/…p12…` statt Freigabepaket · webseite-texte Prüfliste «Cyber Cyan nur als Akzent» · One-to-One/Check-out «Stand laut Repo 26.08.» obwohl Freigabepakete vom 27.09. vorliegen (2) | Nach jeder Änderung: `grep` auf alte Pfade, alte Farben (`0A1F44`, `00AEEF`, Cyan, Montserrat, Inter, JetBrains, Plakette, 1200×1500) und alte Dateinamen |
| 4 | **Unbelegte Mengen-, Nutzen- oder Angebotsaussage (UWG)** | 10 | #08 «die Mehrheit der Vorfälle» · #09 «ein Mehrfaches» · #11 «10–20 Jahre» · #12 «jede Woche» · Passwordless «Die meisten Kontoübernahmen», «brauchen kein neues System» · #16 «Roadmap-Workshop» · Check-in «läuft nach Plan» · verhindert: CISO-Flyer «100+ Kunden», Studie; Landingpage «Übermittlung erfolgt verschlüsselt» | Streichen, als Erfahrung kennzeichnen («nach unserer Erfahrung») oder belegen. Angebote nur aus bestätigter Leistungsliste |
| 5 | **Schlussfolgerung oder erschlossene Frist als VERIFIED** | 5 | Check-out R1 Frist «heute» · Check-in R2 erschlossene Fristen · One-to-One R1 Guard-Zusammenhang · Check-in R1 Passwordless «bereit» · Briefing R2 Acronis-Einzelfall verallgemeinert | Jede Frist, Lage, Wirkung und Verallgemeinerung = `INFERRED`. VERIFIED nur für selbst gelesene Primärquelle (Muss-Kriterium M1 in cyber-briefing und meeting-brief) |
| 6 | **Fachliche Übervereinfachung / falsche Kategorie** | 5 | «Schlüssel verlässt Ihr Gerät nie» (falsch für synchronisierte Passkeys) · #07 Art. 26 NIS2 fehlte · «melden Cyberangriffe» (nur meldepflichtige) · Briefing «17» falsch benannt · Zeitraum «September» statt 01.–25.09. | Kategorie und Zeitraum exakt; Fach-OK (Gate 1) bleibt menschlich |
| 7 | **Segment-/Mix-Regel falsch geprüft** | 8 | Repo-Plan meldet «Segment-Wechsel eingehalten», verletzt bei #02→#03 und #05→#06 · Check-in R1 fälschlich «eingehalten» · Check-in R2 #06→#07→#08 fälschlich als Verstoss · Flex-Regel auf Dauerthema angewendet · «1 Motion» in Batch 1 nicht erfüllt · KW 43 Review-Woche mit neuen Posts belegt · Oktober-Kampagnenklammer gegen Planregel | Regeln wörtlich aus 05 §2 prüfen; Tabelle Primär/Sekundär je Slot; Abweichung ausweisen, nicht glätten |
| 8 | **Alt-Text nicht nachgeführt** | 6 | #11 Alt-Text beschrieb eine Animation, publiziert wird Static · Alt-Texte #07, #09, #10, #11, #12 nach CI-v3-Neubau neu zu fassen · #10 nicht slide-genau | Alt-Text ist Teil jeder Grafikänderung (`content.mjs` → Rendern → Alt-Text) |
| 9 | **Platzhalter oder unbestätigte URL vor Publikation** | 45 Platzhalter in 9 Dateien; 4 kritische Fälle | Repo-Kommentar #10 `[PLATZHALTER …]` · #12 Plan A `[OFFEN …]` · Arbeits-URL `/tabletop` · Arbeits-URL `/leistungen#ciso-as-a-service` | Gate 2 Platzhalterkontrolle; URL live im Browser testen, sonst Fallback `/kontakt` mit gleichen UTM |
| 10 | **Renderfehler weisser Balken (Headless-Chromium)** | 10 betroffene Visuals (#01 bis #06 im Repo, #07, #09, #10, #11 im Repo-Export); 18 Nennungen in 10 Dateien | 87 px weiss unten (1200×1500: Zeilen 1413 bis 1499; 1080×1350: Zeilen 1263 bis 1349). Ursache: `--window-size` zählt Fensterleiste mit | `chromium_headless_shell`, Screenshot über das Element, automatische Randpixel-Prüfung, Kontaktbogen ansehen |
| 11 | **Transparenz bzw. Alpha, wo deckend nötig** | 3 | Flyer S. 1 magentafarbener Streifen (Verlauf mit Transparenz im Druck-PDF) · Quellenzeile `rgba(255,255,255,.5)` nur ca. 3,7:1 · Headline-Block `rgba(.78)` ohne Foto | Druck-PDF ohne `/SMask`, alle Alpha 1, mit pdf.js rastern; Text volldeckend |
| 12 | **Superlativ oder Absolutheit** | 6 | Briefing R1 Überschrift · Passwordless «lösen das an der Wurzel» · «100 % phishing-resistent» (vermieden) · #12 «Jedes unserer Ergebnisse» · #08 «häufigste Budgetfrage» (als Wahrnehmung zulässig) · Briefing R2 «jetzt Angriffsziel» | Keine «führend», «Nr. 1», «immer», «nie» ohne Beleg; Wahrnehmung als solche kennzeichnen |
| 13 | **Inkonsistenz zwischen Medien** | 6 | 90 Minuten vs. halber Tag (#10, Slide 1 vs. Slide 6) · Ablauf 4 vs. 5 Schritte (Flyer vs. Landingpage) · Kommentartext Freigabepaket vs. Landingpage · Prinzipien Post #12 vs. Webseite vs. CISO-Flyer · UTM-Schema (3 Varianten) · Leistungsschritte CISO (Webseite vs. Flyer) | Eine Quelle der Wahrheit ([[Textbausteine]]), alle Medien daraus; bei Änderung alle Fundstellen nachziehen |
| 14 | **Quellen nicht abrufbar, Gate 1 offen** | alle 10 Posts, Briefing (BACS), Passwordless 3 Runden | Netzsperre admin.ch, nist.gov, cisa.gov, w3.org, owasp.org, learn.microsoft.com, cyspa.ch | Offizielle Quelltext-Repositories lesen (GitHub), sonst REPORTED; Mensch ruft ab oder Domain freigeben |
| 15 | **Unzulässige Owner oder Daten** | 2 | Owner «Alex» (Status proposed) · private Mailadresse im YAML | Owner nur aktive Agenten laut Register oder `NEEDS INPUT` mit Fallback LWE |

## B. Vorab-Checkliste (15 Punkte, vor jeder Abgabe)

Für jeden Text, Post, jede Webseite, jedes Visual und jeden Brief.

1. **CI v3:** Navy/Gold, Raleway (PPTX Calibri). Kein Cyan, kein `#0A1F44`, kein Montserrat, keine Plakette, Fakten-Karte 1200×1200.
2. **Copy:** kein Gedankenstrich im Satzfluss (auch Titel, Kommentar, Alt-Text), «ss», keine Ausrufezeichen, Guillemets, Sie-Form.
3. **Jede Zahl, Frist, Menge hat eine Quelle** mit Abrufdatum. Sonst streichen oder als Erfahrung kennzeichnen.
4. **Kennzeichnung:** VERIFIED nur bei selbst gelesener Primärquelle; Suchtreffer REPORTED; jede abgeleitete Frist, Lage oder Wirkung INFERRED.
5. **Fakten** aus [[Fakten und Quellen]] übernehmen und Gültigkeitsdatum prüfen (z. B. NISG AT ab 01.10.2026).
6. **Keine Angebots- oder Leistungsaussage** ausserhalb der bestätigten Leistungsliste und Tabletop-Fakten ([[Textbausteine]] §3, §4).
7. **Keine Superlative, keine Absolutheiten,** keine Kundennamen (ausser KKC intern), keine Angstrhetorik, Risiko immer mit Handlungsoption.
8. **Abkürzungen und Fachbegriffe** beim ersten Auftreten erklärt (Executive-Texte immer).
9. **Disclaimer** «Allgemeine Einordnung, keine Rechtsberatung» bei Regulatorik, Haftung, Verträgen, Meldepflichten.
10. **Platzhalter und `> Redaktion:`** vollständig entfernt; Ziel-URL live getestet, UTM nach Schema.
11. **Alt-Text** passt zum aktuellen Visual, Abkürzungen ausgeschrieben, Grafikinhalt steht auch im Text.
12. **Render-Prüfung:** exakte Masse, kein weisser Rand (headless_shell, Element-Screenshot), kein Überlauf, kein Text unter 24 px, Kontrast 4,5:1, jede Seite angesehen.
13. **Druck:** keine Transparenz (`/SMask` = 0), 3 mm Beschnitt, TrimBox/BleedBox, Fonts eingebettet, Satzspiegel 16 mm.
14. **Mix-Regeln** (Segmentwechsel, harter CTA höchstens jeder 4., Pfeilerabstand 2 Wochen, Format-Mix) wörtlich geprüft, Abweichungen ausgewiesen.
15. **Konsistenz:** alle Fundstellen in anderen Medien und alle Pfade, Masse, Status nach der Änderung nachgezogen (`grep`).
