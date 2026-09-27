---
tags: [cyspa, marketing, flyer, print, tabletop, incident-response, ci-v3]
status: Entwurf, Freigabe LWE ausstehend
date: 2026-09-27
source: "landingpage-tabletop.md; linkedin/freigabe/2026-10-08-10-tabletop-uebung.md; ci-referenz/CI-v3-kurzreferenz.md; ci-referenz/beispiel-flyer-ciso-as-a-service.jpg (Gestaltung und Adresse, Flyer von LWE)"
chat_url: "https://claude.ai/code/session_01JsQoSQbozeyt2EYitpEXuf"
---

# Flyer «Tabletop-Übung für Geschäftsleitungen» (A4 hoch, 2 Seiten, CI v3.0)

Ergänzt den bestehenden Flyer «CISO as a Service» von LWE und übernimmt dessen Gestaltung. Der frühere Flyer «CYSPA im Überblick» im Cyan-Design ist ungültig und liegt unter `_alt-ci/`.

| Datei | Inhalt |
|---|---|
| `flyer-tabletop.pdf` | Druck-PDF, 2 Seiten, Vektortext, Fonts eingebettet, TrimBox 210 × 297 mm und BleedBox gesetzt |
| `flyer-tabletop-s1.png`, `-s2.png` | Vorschau Seite 1 und 2 (inkl. Beschnitt) |
| `flyer-tabletop.html` | Quelle (HTML/CSS) für Textänderungen und Neu-Rendern |

## Gestaltung (CI v3.0, nach Flyer «CISO as a Service»)

- Flächen Navy Deep `#071828` und Navy `#103157`, Gold `#ffc000` nur als Akzent: Seitenbalken links an dunklen Flächen, Eyebrow-Strich, Hervorhebungswort, Häkchen, Karten-Oberkante, Kontakt-Icons.
- Headlines in Serifenschrift **Source Serif 4** (OFL, npm `@fontsource/source-serif-4`), Text in **Raleway** (OFL, npm `@fontsource/raleway`). Eyebrow und Section-Labels in gesperrten Versalien.
- Weisse Nutzenkarten mit Gold-Oberkante und Navy-Rund-Icons, Prozessleiste mit Kreis-Icons, Navy-Deep-Kontaktleiste mit Gold-Icons, Kopfzeile Seite 2 «CYSPA.ch» gesperrt mit «.ch» in Gold und «CYBER SECURITY PARTNERS».
- Keine Personenfotos. Statt Foto: Navy-Grafik mit feinem Raster und Icon-Komposition (vier Felder «Befugnisse, Kommunikation, Meldefristen, Dienstleister»), darin die helle Variante der Bildmarke.
- Keine Statistiken, keine Kundenzahlen. «100+ Kunden» und die Mobiliar-Studie aus dem CISO-Flyer sind bewusst nicht übernommen (Quelle für uns nicht prüfbar).

## Text Seite 1

**Eyebrow:** TABLETOP-ÜBUNG

**Headline:** Ein Plan ist eine Hypothese. / Die Übung ist ihr **Test.** (Gold)

**Subline:** Wer entscheidet, wenn es ernst wird? Die Tabletop-Übung für Ihre Geschäftsleitung.

**Kurztext:** Samstag, 06:40 Uhr. Die Dateiserver sind verschlüsselt, die Produktion steht. Eine Tabletop-Übung zeigt Ihrer Führungsrunde, ob die Antwort auf diese Frage feststeht, bevor der Ernstfall sie stellt.

**Grafik:** Wer entscheidet jetzt was? · Samstag, 06:40 Uhr · Befugnisse · Kommunikation · Meldefristen · Dienstleister · Getestet wird die Organisation

**Nutzenkarten**
1. **Erkenntnisliste mit Verantwortlichen.** Jede Lücke hat einen Namen und einen nächsten Schritt.
2. **Geklärte Befugnisse.** Wer entscheidet was, auch am Wochenende und ohne die üblichen Kanäle.
3. **Ein getesteter Plan.** Aus einer Annahme wird eine geübte Fähigkeit. Oder Sie wissen genau, was im Plan fehlt.

**Ablauf der Übung**
1. **Vorgespräch.** Wir klären Teilnehmende, Rahmen und Schwerpunkt des Szenarios.
2. **Szenario.** Ein realistisches, fiktives Szenario entwickelt sich Schritt für Schritt. Ihre Führungsrunde entscheidet, wir moderieren.
3. **Auswertung.** Was lief gut, wo fehlten Befugnisse, Informationen oder Kontakte?
4. **Erkenntnisliste.** Dokumentierte Erkenntnisse mit klaren Verantwortlichkeiten.

Zeile darunter: **Eine moderierte Entscheidungsübung, keine Technik-Simulation.** An Ihren Systemen wird nichts getestet oder verändert.

> Redaktion: Die Landingpage hat 5 Schritte. Für die 4-Schritt-Leiste sind «Szenario» und «Moderierte Entscheidungen» zusammengefasst. Belegt sind «Szenario, moderierte Entscheidung, dokumentierte Erkenntnisliste»; Vorgespräch und Auswertung als eigene Schritte sind wie auf der Landingpage durch LWE bzw. Incident Response Specialist zu bestätigen.

**Vertrauens-/Nutzenblock: Worauf Sie sich verlassen können**
- Getestet wird die Organisation, nicht die Firewall
- Realistisches, fiktives Szenario, zum Beispiel ein Ransomware-Angriff
- Was in der Übung besprochen wird, bleibt vertraulich
- Nachvollziehbar dokumentiert: eine Grundlage für Verwaltungsrat und Versicherer

**Rechts:** ½ Tag · mit Ihrer Führungsrunde, davon rund 90 Minuten Übung im Szenario. Am Ende steht eine dokumentierte Erkenntnisliste.

> Redaktion: «½ Tag» und «rund 90 Minuten» sind Angebotsangaben von CYSPA (Freigabepaket #10, F4), keine Statistik. Vom IR-Owner zu bestätigen, identisch mit Beitrag #10 und Landingpage. «Grundlage für Verwaltungsrat und Versicherer» ist eine Folgerung, kein Versprechen gegenüber Versicherern (Legal prüfen, wie Landingpage).

**Kontaktleiste:** Erlenstrasse 4B, CH-6343 Rotkreuz · www.cyspa.ch · info@cyspa.ch

## Text Seite 2

**Kopfzeile:** CYSPA.ch · CYBER SECURITY PARTNERS

**Eyebrow:** DAS FORMAT

**Headline:** Ein halber Tag. / Eine dokumentierte **Erkenntnisliste.** (Gold)

**Text:** Die wertvollsten Erkenntnisse aus Übungen sind fast immer organisatorisch, nicht technisch. Deshalb sitzen die Personen am Tisch, die im Ernstfall entscheiden. Einen fertigen Notfallplan brauchen Sie nicht: Gibt es keinen, zeigt die Übung, welche Entscheide ein Plan regeln muss.

**Kasten:** Moderierte Entscheidungsübung · Keine Technik-Simulation · Realistisches, fiktives Szenario · Klare Verantwortlichkeiten

**Formatkarten**
- **Dauer:** Ein halber Tag. Davon rund 90 Minuten Übung im Szenario.
- **Teilnehmende:** Ihre Führungsrunde. Geschäftsleitung, dazu je nach Organisation IT-Verantwortliche und Kommunikation. [PLATZHALTER: Gruppengrösse]
- **Ergebnis:** Dokumentierte Erkenntnisliste. Mit klaren Verantwortlichkeiten. [PLATZHALTER: Lieferfrist]

**Was typischerweise sichtbar wird** (gekürzt aus Beitrag #10)
- **Unklare Befugnisse.** Wer darf Systeme vom Netz nehmen, auch wenn damit das Geschäft steht?
- **Kommunikation ohne die üblichen Kanäle.** Wie erreichen Sie Mitarbeitende und Kunden, wenn E-Mail und Chat betroffen sind?
- **Meldefristen unter Zeitdruck.** Datenschutzbehörde, Vertragspartner, allenfalls Aufsicht oder BACS: Wer meldet was bis wann?
- **Die Dienstleisterfrage.** Wer ist der erste Anruf? Gilt der Support-Vertrag auch am Wochenende?

> Redaktion: «BACS» steht auf dem Flyer ohne Ausschreibung (Platz). Auf Seite 2 ist es im Kontext von Aufsicht und Meldestellen eindeutig; wer die Ausschreibung wünscht: «Bundesamt für Cybersicherheit (BACS)», dann Karte um eine Zeile länger.

**Häufige Fragen**
- **Ist das ein technischer Test unserer IT?** Nein. Es wird nichts an Ihren Systemen getestet oder verändert. Die Übung prüft Entscheidungswege, Zuständigkeiten und Kommunikation.
- **Wo findet die Übung statt?** [PLATZHALTER: vor Ort, in Rotkreuz und/oder online]
- **Welches Szenario wird geübt?** Ein realistisches, fiktives Szenario, zum Beispiel ein Ransomware-Angriff. [PLATZHALTER: Zuschnitt auf Branche?]
- **Wie vertraulich ist das?** Was in der Übung besprochen wird, bleibt vertraulich. [PLATZHALTER: Vertraulichkeitsvereinbarung?]
- **Beraten Sie uns rechtlich zu Meldepflichten?** Nein. Wir ordnen Meldepflichten im Szenario allgemein ein. Für Ihren Einzelfall ziehen Sie Ihre Rechtsberatung bei.
- **Was kostet die Übung?** [PLATZHALTER: Preis oder «Offerte nach Vorgespräch»]

**CTA:** NÄCHSTER SCHRITT · Gespräch **vereinbaren.** In einem kurzen Gespräch klären wir, ob eine Tabletop-Übung für Sie jetzt der richtige Schritt ist und wie sie bei Ihnen aussehen würde. Unverbindlich.
www.cyspa.ch/tabletop · info@cyspa.ch · +41 41 521 61 61 · Erlenstrasse 4B, CH-6343 Rotkreuz · [PLATZHALTER: QR-Code auf /tabletop, erst nach Livegang]

Copy-Regeln CI v3 geprüft: kein Gedankenstrich im Satzfluss, «ss» statt «ß», keine Ausrufezeichen, keine Zahlen ohne Quelle.

## Druckhinweise

- **Format:** A4 hoch, 2 Seiten (Vorder- und Rückseite). Datei 215,9 × 303 mm inkl. 3 mm Beschnitt je Seite. TrimBox 210 × 297 mm und BleedBox gesetzt. Hinweis: Chromium rundet die Seitenbreite auf 816 px, deshalb misst der Beschnitt rechts 2,9 mm statt 3,0 mm. Alle randabfallenden Flächen (Hero, Seitenbalken, Kontaktleiste) laufen vollständig in den Beschnitt; die Druckerei nach Toleranz fragen.
- **Sicherheitsabstand:** Text mindestens 16 mm vom Endformatrand links/rechts; kein Text im Beschnitt.
- **Farben:** Die PDF ist RGB (aus HTML gerendert). Für den Offsetdruck die Druckerei um Konvertierung bitten oder CMYK-Werte für Navy, Navy Deep und Gold bei LWE anfordern. [PLATZHALTER: CMYK-/Pantone-Werte CI v3]
- **Schriften:** Source Serif 4 und Raleway, beide SIL Open Font License, eingebettet. Lizenztexte: `assets/fonts/OFL-*.txt`.
- **Logo:** Die Bildmarke liegt nur als PNG 288 × 122 px vor und ist im Flyer auf ca. 21 mm Breite gesetzt (ca. 350 dpi, knapp ausreichend). Die helle Variante `assets/img/cyspa-logo-hell.png` ist aus dem PNG abgeleitet (Grau zu Weiss, Blau leicht aufgehellt) und nicht von LWE freigegeben. Für den Druck Vektorlogo (SVG/PDF) anfordern. Der Logo-Widerspruch (dreifarbiger Unterstrich, siehe CI-Kurzreferenz) ist offen, Entscheid LWE.
- **Papier/Auflage:** [PLATZHALTER: Papier, Auflage, Druckerei]
- **Neu rendern:** Skript im Scratchpad (`ci3-web/flyer.cjs`, Chromium Headless Shell, danach TrimBox/BleedBox mit pdf-lib).

## Abweichungen vom Beispiel-Flyer

- Kein Personenfoto: Navy-Rastergrafik mit Icon-Komposition statt Foto.
- Keine «Ausgangslage»-Statistik und kein «100+»-Block. An deren Stelle steht rechts im Vertrauensblock die Formatangabe «½ Tag» aus den Quellen.
- Fliesstext in Raleway statt Serif (Vorgabe CI v3); nur Headlines, Eyebrows und Kontaktangaben in Serif.
- Seite 2 statt «Pakete» mit Formatkarten (Kopfleiste der mittleren Karte in Primary Blue wie «Essential»), Themenfeldern, FAQ und CTA.
- Bildmarke in heller Variante in der Grafik von Seite 1 (im Beispiel nicht sichtbar); Wortmarke in der Kopfzeile von Seite 2 wie im Beispiel.

## Offene Platzhalter und Punkte (vor dem Druck)

| Punkt | Wer |
|---|---|
| Gruppengrösse | LWE / Incident Response Specialist |
| Lieferfrist der Erkenntnisliste | LWE / Incident Response Specialist |
| Ort (vor Ort, Rotkreuz, online) | LWE |
| Preis oder «Offerte nach Vorgespräch» | LWE |
| Szenario-Zuschnitt auf Branche | Incident Response Specialist |
| Vertraulichkeitsvereinbarung | LWE / Legal |
| Ablauf in 4 Schritten und «½ Tag / 90 Minuten» bestätigen | Incident Response Specialist |
| QR-Code und URL `www.cyspa.ch/tabletop` erst nach Livegang und Test der Seite | Oliver / Webentwicklung |
| Vektorlogo, Freigabe helle Logovariante, Logo-Widerspruch | LWE |
| CMYK-Werte, Papier, Auflage, Druckerei | LWE |
