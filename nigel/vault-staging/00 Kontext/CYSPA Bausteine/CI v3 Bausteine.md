---
tags: [cyspa, ci, ci-v3, design, bausteine, referenz]
status: aktiv, offene CI-Entscheide LWE
date: 2026-09-28
source: "claude, abgeleitet aus Skill cyspa-designer (CI v3.0), cyspa-marketing/ci-referenz/CI-v3-kurzreferenz.md, Beispielen von LWE (Flyer CISO as a Service, SECURITY4KMU Tipp #19), linkedin/visuals-ci3/_build/build.mjs und content.mjs, visuals-ci3/README.md, web/flyer-tabletop.html/.md, web/landingpage-tabletop.html/.md, 00-FREIGABELISTE-VOR-FERIEN.md"
chat_url: "https://claude.ai/code/session_01JsQoSQbozeyt2EYitpEXuf"
---

# CI v3 Bausteine

Wiederverwendbare Gestaltungselemente im gültigen CYSPA CI v3.0 (Navy/Gold, Raleway). Jedes Element mit exakter Spezifikation, Häufigkeit (wo es in den Arbeiten vom 25. bis 28.09.2026 verwendet wurde) und Do/Don't. Die Werte stammen aus dem Quellcode der gebauten und geprüften Dateien, nicht aus dem Gedächtnis.

> **Gültig ist nur CI v3.0.** Das Repo-CI im Branch `claude/cyspa-linkedin-strategy-vte419` (Deep Space Blue `#0A1F44`, Cyber Cyan `#00AEEF`, Montserrat/Inter/JetBrains Mono, Logo-Plakette, Single Graphic 1200×1500) ist **ungültig**. Siehe [[Qualitätscheckliste]], Punkt «veraltete CI-Angaben».

Häufigkeit: Zählung über 55 Quelldateien (cyspa-marketing, vault-staging, QA-Protokolle), `_alt-ci` ausgenommen. «Visuals» = 9 LinkedIn-Visuals #07, #09 bis #16 (6 Fakten-Karten, 3 Carousels mit je 6 Slides).

## 1. Farbtoken

| Token | Web | OOXML | Rolle | Verwendet in |
|---|---|---|---|---|
| Gold | `#ffc000` | `FFC000` | einzige Akzent- und CTA-Farbe | alle 9 Visuals, Flyer, Landingpage, PPTX-Flyer, Freigabeliste-DOCX |
| Navy | `#103157` | `103157` | Anker, dunkle Flächen, Headline Zeile 1 auf hell | überall |
| Navy Deep | `#071828` | `071828` | Hero, tiefste Ebene, Kontaktleiste | Fakten-Karte (Verlaufstart), Flyer, Landingpage |
| Primary Blue | `#425b76` | `425B76` | Section-Labels, Claim, Kopfleiste mittlere Formatkarte | Carousel-Labels, Flyer, Landingpage |
| Hover Blue | `#2062af` | `2062AF` | **nur** Button-Hover | Landingpage |
| Ink | `#1a1a1a` | `1A1A1A` | Headings, Headline Zeile 2 auf hell | Carousel, Landingpage |
| Body | `#5a5a5a` | `5A5A5A` | Fliesstext | alle |
| Muted | `#8a8a8a` | `8A8A8A` | Meta, Quellen, PPTX-Footer | Landingpage, Flyer |
| Border | `#e6e6e6` | `E6E6E6` | Linien, Rahmen | alle |
| Gray | `#f8f8f8` | `F8F8F8` | Sekundärfläche | Carousel-Karten, Flyer «Ablauf», Landingpage `.alt` |

**Abgeleitete Hilfstöne (nicht im CI, in den Builds eingeführt, bei Wiederverwendung beibehalten):**

| Ton | Wert | Zweck | Status |
|---|---|---|---|
| Verlauf-Endton | `#1a4576` | Ende des Fakten-Karten-Verlaufs (steht so im CI) | CI |
| On-dark-2 | `#d6dee9` | Sekundärtext auf Navy | abgeleitet |
| On-dark-3 | `#b8c4d3` | Quellenzeile auf Navy, volldeckend | abgeleitet, ersetzt CI-Wert `rgba(255,255,255,.5)` (Kontrast nur ca. 3,7:1) |
| Headline-Block opak | `#eef1f5` | Headline-Block auf Cover ohne Foto | abgeleitet |
| Hero-Mitte | `#0c2645` | Flyer/Landingpage-Verlauf | abgeleitet |

**Do:** Kontrast prüfen (Text 4,5:1, Headlines 3:1). Gemessen 27.09.: Weiss auf hellstem Verlaufston 9,7:1, Gold 5,9:1, Primary Blue auf Weiss 7,0:1, Body auf Weiss 6,9:1, Quellenzeile `#b8c4d3` auf `#1a4576` 5,5:1.
**Don't:** Gold als Flächenhintergrund · Gold mit kleinem Text auf `#f8f8f8` · farbige Schatten (nur `rgba(0,0,0,x)`) · zweite Akzentfarbe · Emoji ausser Checklisten-Häkchen · Cyan oder Deep Space Blue.

## 2. Schrift

| Einsatz | Schrift | Quelle |
|---|---|---|
| Web, Social | **Raleway** 400 bis 900, OFL, lokal eingebettet (npm `@fontsource/raleway`) | CI v3, alle Visuals, Landingpage |
| Flyer-Headlines, Eyebrows, Kontaktangaben (Druck) | **Source Serif 4** 600/700, OFL | abgeleitet aus Flyer «CISO as a Service» (Serifen-Headlines), Entscheid offen |
| PPTX/DOCX | **Calibri** (CI v3). Flyer-PPTX zusätzlich **Cambria** für Headlines als Serif-Ersatz | CI v3; Cambria ist Abweichung, Entscheid offen |

Zahlen: `font-feature-settings:"lnum" 1` bzw. `font-variant-numeric:lining-nums`.
**Don't:** Montserrat, Inter, JetBrains Mono (Repo-CI).

## 3. Eyebrow mit Gold-Tick

| Parameter | Social (Visuals) | Web/Flyer |
|---|---|---|
| Tick | Block `2.4em × 0.18em`, Gold, `margin-bottom:.6em` (über dem Text) | Linie links vom Text: Web `2.4em × .18em` (min. 3 px), Flyer `9 mm × 0,7 mm`, Abstand 4 mm |
| Text | 24 px, 800, Laufweite `.22em`, Versalien, Gold, zweizeilig | Web `.74rem`/800/`.26em` weiss; Flyer Serif 7,6 pt/700/`.34em` |
| Zeile 1 / Zeile 2 | `SECURITY4KMU` / Rubrik (z. B. `EXECUTIVE BRIEFING`) | ein Label, z. B. `TABLETOP-ÜBUNG`, `DAS FORMAT`, `NÄCHSTER SCHRITT` |

Häufigkeit: auf allen 9 Visuals (24 Seiten), Flyer 3×, Landingpage 1× plus Kicker. `SECURITY4KMU` 9 Nennungen in 7 Dateien.
**Do:** Rubrik aus der Serienliste (§13) nehmen. **Don't:** Nummer «#NN» setzen, solange die Serien-Nummerierung nicht entschieden ist (offener Entscheid E3).

## 4. Gold-Seitenbalken und Gold-Kante

| Variante | Spezifikation | Wo |
|---|---|---|
| Fakten-Karte | Kante links volle Höhe, `12px` (= 1em bei 12 px Basis) | 6 Fakten-Karten |
| Flyer | `3 mm Beschnitt + 2,4 mm`, läuft in den Beschnitt, an dunklen Flächen | Flyer S. 1 und 2 |
| Landingpage | `6px` (`--bar`), an dunklen Abschnitten; auch als linker Rand von Zitat, Hinweisbox, geöffneter FAQ | Landingpage 4 Einsatzarten |
| PPTX | `x:0, y:0, w:0.10, h:7.5` Zoll, Fill `FFC000`, auf allen Dark Slides | Skill cyspa-designer |
| Merksatz-Rand | `border-left: 8px solid Gold`, Text 36 px/700 weiss | CTA-Slides der 3 Carousels |

Häufigkeit: «Seitenbalken» 10 Nennungen in 6 Dateien, als Element in jedem Produkt.
**Do:** nur an dunklen Flächen oder als Akzentrand. **Don't:** als Fläche, als Hintergrund, doppelt nebeneinander.

## 5. Weisser Headline-Block mit Gold-Balken

| Parameter | Carousel-Cover (gebaut) | Square Post (CI, noch nicht gebaut) |
|---|---|---|
| Block | `left:0; top:772px; width:86%`, Hintergrund `#eef1f5` **opak**, Padding `66/64/70/80 px` | `rgba(255,255,255,.78)` + `backdrop-filter: blur(2px)` auf Foto |
| Headline | 54 px, 800, Laufweite `-.025em`, Zeilenhöhe 1.12; Zeile 1 Navy, Zeile 2 Ink | 4.5em/800/`-.03em`, Zeile 1 Navy, Zeile 2 Ink |
| Gold-Balken | `42% × 20px`, `left:44%`, bündig rechts unter dem Block (per Skript an die Blockhöhe gehängt) | `38% × 1.7em` rechts unter dem Block |

Varianten mit gleichem Motiv: Frage-Box der Fakten-Karte #11 (`rgba(255,255,255,.94)`, Navy 36 px/800, Balken `38% × 18px` rechts unten).
Häufigkeit: 3 Carousel-Covers, 1 Fakten-Karte.
**Do:** Balken per Skript an die tatsächliche Blockhöhe hängen (`FIX_JS`). **Don't:** Transparenz im Druck (siehe §14).

## 6. Nutzenkarte mit Gold-Oberkante und Navy-Rund-Icon

| Parameter | Flyer | Landingpage |
|---|---|---|
| Karte | Weiss, Rahmen `0,3 mm #e6e6e6`, Radius `1,2 mm`, Schatten `0 1,2mm 0 #dfe3e8` | Weiss, Rahmen `1px #e6e6e6`, Radius `6px`, Schatten `0 3px 0 #e1e5ea, 0 6px 18px rgba(0,0,0,.05)` |
| Gold-Oberkante | `13 mm × 1 mm`, links 5 mm eingerückt | `56px × 4px`, links `1.5rem` |
| Icon | Kreis `11 mm`, Navy, Icon weiss `5,2 mm` | Kreis `2.6rem`, Navy, Nummer weiss 800 |
| Titel | Serif 9,6 pt/700 Navy | 1.15rem Navy |
| Raster | 3 Spalten, `4,5 mm` Abstand, überlappt Hero um `-17 mm` | 2 Spalten ab 720 px |

Vorbild: Flyer «CISO as a Service» von LWE (drei Karten). Häufigkeit: 3 Varianten (CISO-Flyer, Flyer Tabletop, Landingpage).
**Don't:** Gold-Oberkante über die ganze Breite, farbige Schatten.

## 7. Prozessleiste

| Parameter | Flyer (horizontal, 4 Schritte) | Landingpage (5 Schritte, ab 900 px horizontal) |
|---|---|---|
| Knoten | Ring `13 mm`, Rand `0,55 mm` Navy, weiss; erster Schritt Navy gefüllt | Kreis `3.2rem`, Navy, Rand weiss 70 %; erster Schritt mit Gold-Rand |
| Verbindungslinie | `0,3 mm #b9c4d0`, von 12,5 % bis 87,5 % | `1px` weiss 30 % |
| Titel | Serif 9 pt/700 Navy | h3 |
| Fläche | Gray `#f8f8f8` | Navy-Abschnitt |

Vorbild: «Unser Leistungsansatz» im CISO-Flyer (4 Kreis-Icons). Häufigkeit: 3 (CISO-Flyer, Flyer Tabletop, Landingpage).
**Do:** Schrittzahl über alle Medien gleich halten oder Zusammenfassung im Redaktionshinweis begründen (Flyer 4 vs. Landingpage 5 Schritte ist ausgewiesen).

## 8. Kontaktleiste

Flyer: Fläche Navy Deep, Oberkante `0,9 mm` Gold, drei Einträge mit Gold-Icons (`4,6 mm`, Strich 1,8) in Serif 9,4 pt/700 weiss: Adresse · Web · Mail. Unten Beschnitt eingerechnet.
PPTX-Footer (Skill): `CYSPA · cyspa.ch · +41 41 521 61 61`, 7,5 pt `8a8a8a`, Seitenzahl rechts 9 pt Gold.
Text siehe [[Textbausteine]] §2. Häufigkeit: CISO-Flyer, Flyer Tabletop (2×), Landingpage-Fuss, Webseite (Kontaktzeile, Unternehmensangaben).

## 9. Fakten-Karte 1200×1200

| Teil | Spezifikation |
|---|---|
| Fläche | `linear-gradient(155deg, #071828 0%, #103157 55%, #1a4576 100%)`, Padding `88/96/64/124 px`, Basis 12 px |
| Raster | Linien weiss 3,5 %, Zelle 40 px |
| Gold-Kante | links 12 px |
| Eyebrow | 24 px (siehe §3) |
| Kicker | 30 px/600 `#d6dee9`, Abstand oben 52 px |
| Headline | 62 px (5.2em)/800/`-.03em`, Zeilenhöhe 1.08; Variante `small` 52 px. Zeile 2 **Gold** (Entscheid offen, E2) |
| Fusszeile | Wortmarke 30 px links, Quelle 24 px/500 `#b8c4d3` rechts |

Varianten:

| Variante | Aufbau | Eingesetzt |
|---|---|---|
| `rows` | Zeilen mit Pill-Badge (272 px breit, 24 px/800 Gold, Rand 2 px Gold, rund), Kopf 34 px/700, Unterzeile 26 px; Trennlinien weiss 16 %; optional nummeriert (Pill 72×72), `compact`, Hinweisbox (Hintergrund `rgba(7,24,40,.55)`, Gold-Rand links 6 px), Schlusszeile (Gold-Strich 56×6 px + 34 px/800) | #07, #09, #12, #14 |
| `timeline` | vertikale Linie Gold 55 %, Punkte 44 px mit 4 px Gold-Rand, `hot` = Gold gefüllt; Zeitmarke 24 px/800 Gold `.2em`; Legende; optionale Frage-Box | #11, #13 |
| `stat` | Grosszahl 14em + Gold-Strich + Kacheln; `min-height:0` auf dem Stat-Block | **nicht eingesetzt**: keine belegte Kennzahl |

Häufigkeit: 6 von 9 Visuals, 18 Nennungen in 9 Dateien. Grund: Square Post braucht Vollbild-Foto, es gibt keine freigegebenen Fotos, KI-Personen sind ausgeschlossen.
**Do:** `stat` nur mit Zahl aus Primärquelle. **Don't:** Quelle in `rgba(.5)` setzen, Zahlen ohne Quelle.

## 10. Tipp-Carousel 1080×1350

| Slide | Aufbau |
|---|---|
| Cover (dunkel) | Verlauf `180deg, #081a2f 0%, #0d2847 45%, #123867 80%, #1a4576 100%`, Raster 54 px; Kopf: Eyebrow links, Wortmarke 44 px rechts; Unterzeile 34 px/500 mit Gold-Strich 64×6 px; Headline-Block (§5); `www.cyspa.ch` 26 px/700 `.14em` unten rechts |
| Lead / Vergleich (weiss) | Bildmarke oben rechts (PNG, Höhe 82 px); `padding-top:17%` plus 120 px; Label 24 px/800 Primary Blue `.2em`; Lead 48 px/800 Navy; Body 30 px/500 Ink; Karten Gray mit linkem Rand 8 px Navy (Ja) bzw. Body-Grau (Nein) |
| Inhalt / Checkliste (weiss) | Häkchen-Kreis 46 px Navy, Häkchen Gold (Strich 3,4); Einstellungs-Kasten (Rahmen 2 px Border, Gray, Label Primary Blue); Grosszahl-Variante `horizon` 150 px/900 Navy + Gold-Strich 120×10 px |
| CTA (dunkel) | Gold-Strich 84×8 px oder Label; Titel 56 px/800, Zeile 2 Gold; Liste mit Gold-Kreisen und Navy-Häkchen; Merksatz mit Gold-Rand (§4); Hinweis mit Gold-Strich 40×4 px |
| alle | Pager «n / 6» 24 px/700 unten links, URL unten rechts, beide 64 px über dem Rand |

Gebaut: #10 Tabletop, #15 Gastkonten, #16 Roadmap, je **6 Slides** statt CI 4 (Entscheid offen, E4). PDF 810×1012,5 pt, Raleway eingebettet, Textlayer, PDF-Titel gesetzt.
**Do:** Textslides mit `padding-top:17%`, sonst kollidiert die Headline mit dem Logo. Zweite Listenspalte nur, wenn gefüllt.

## 11. Wortmarke und Bildmarke

| Marke | Spezifikation | Einsatz |
|---|---|---|
| Wortmarke «CYSPA.ch» | Text, Raleway 800, Laufweite `.14em` (Social) bzw. `.28em` (Web) bzw. Serif `.3em` (Flyer); «.ch» Gold | alle dunklen Flächen, Kopfzeilen, Fusszeilen; 15 Nennungen in 11 Dateien |
| Claim | «CYBER SECURITY PARTNERS», Versalien, Laufweite `.34em` bis `.36em`, Primary Blue | Kopfzeile Flyer S. 2, Landingpage |
| Bildmarke | PNG 288×122 px (`cyspa-logo-transparent.png`, Branch-Asset): CYS blau, PA grau, Unterstrich blau/hellblau/gold, Claim | nur auf weissen Carousel-Slides (Höhe 82 px) |
| Bildmarke hell | `cyspa-logo-hell.png`, **abgeleitet**, nicht freigegeben; Druckfassung ohne Alpha `cyspa-logo-hell-flyer.png` | Grafik Flyer S. 1 |
| PPTX-Logo | `CYSPA` 20 pt bold, `charSpacing:8`, weiss auf dunkel, `103157` auf hell | Skill |

**Don't:** Logo-Plakette (Repo-CI), Icon ohne Text, Bildmarke unter ca. 350 dpi im Druck.

## 12. Platzhalter-Stil

| Medium | Stil |
|---|---|
| Text (MD) | `[PLATZHALTER: …]` für fehlende Angaben, `> Redaktion:` für interne Hinweise |
| Web/Flyer (HTML) | `.ph`: Weiss, Navy 700, Rahmen gestrichelt `#8a8a8a` (Web 1,5 px, Flyer 0,3 mm), Radius klein |
| Canva/Designs | graue Fläche `#b6becb` mit Label `FOTO`, gestrichelter Logo-Rahmen (Skill) |
| Meeting-Briefs | `NEEDS INPUT` (57 Nennungen in 18 Dateien) |

Häufigkeit `PLATZHALTER`: 45 in 9 Dateien. **Regel:** kein Platzhalter und keine `> Redaktion:`-Zeile erreicht die Publikation (Gate 2).

## 13. Serien-Labels (Eyebrow Zeile 2)

Eingesetzt: `REGULATORIK IM KLARTEXT` (P6) · `AUS DEM CISO-ALLTAG` (P8) · `LESSONS FROM THE FIELD` (P9) · `EXECUTIVE BRIEFING` (P12) · `FUTURE SECURITY` (P10) · `INSIDE CYSPA` (P11) · `QUICK TIP` (P1) · `RESILIENZ KONKRET` (P4) · `MICROSOFT SECURITY PRAXIS` (P5). Aus Beispielen LWE: `TIPP DER WOCHE #NN`, `FAQ QUICK GUIDES #NN`.

## 14. Druck (Flyer, Print-PDF)

| Regel | Spezifikation |
|---|---|
| Format | A4 hoch; Datei 216 × 303 mm (inkl. 3 mm Beschnitt je Seite); Chromium rundet auf 816 px, rechts 2,9 mm |
| Boxen | TrimBox 210 × 297 mm und BleedBox mit pdf-lib setzen |
| Satzspiegel | Text mindestens 16 mm vom Endformat (CSS `--x:19mm` ab Dateirand) |
| **Keine Transparenz** | Verläufe nur mit deckenden Stopps, Raster als deckende Vektorlinien, Text auf dunkel als deckende Mischfarbe statt `rgba`, keine weichen Schatten, keine Masken, kein `backdrop-filter`, Logo ohne Alphakanal |
| Prüfung | PDF ohne `/SMask`, alle Alphawerte 1, mit pdf.js rastern und jede Seite ansehen |
| Schriften | eingebettet, OFL-Lizenztexte beilegen |
| Farbraum | RGB aus HTML; CMYK/Pantone offen (Entscheid LWE) |
| Druckfreigabe | Preflight Druckerei, Vektorlogo, Papier/Auflage |

Anlass: magentafarbener Streifen Hero/Grafik Flyer S. 1 durch Verlauf mit Transparenz (27.09., behoben).

## 15. PPTX

`LAYOUT_WIDE` 13,33 × 7,5 Zoll (Deck) bzw. A4 hoch (Flyer-PPTX), Farbcodes ohne `#`. Headlines Cambria (nur Flyer-PPTX, Abweichung), Text Calibri. Hintergründe mit Raster als Bild, alles andere als Textfelder und Formen. Typo: Titel 44 bis 48 pt, Slide-Titel 24 bis 28 pt, Body 14 bis 18 pt, nichts unter 12 pt (Footer 7,5 pt ausgenommen). Navy-Header `h:0.92` + Gold-Linie `y:0.92, h:0.05`. Für den Druck bleibt das PDF massgeblich.

## 16. Render- und Prüfpipeline (Social)

- Renderer `chromium_headless_shell` (Playwright), Screenshot **über das Element** `.page`, nicht über das Fenster. Standard-Chromium im neuen Headless-Modus zählt die Fensterleiste mit: weisser Balken 87 px unten.
- Automatische Prüfung: Masse exakt, Überlauf, Anteil weisser Pixel je Randzeile/-spalte.
- PDF-Seiten auf exakt 810 × 1012,5 pt setzen, Titel, Autor «CYSPA GmbH», Sprache `de-CH`.
- Mindestgrösse: kein Text unter 24 px im 1200er-Raster, auch auf 1080er-Slides (Ausnahme Claim in der Bildmarke).
- Kontaktbogen `contact-sheet.png` für die Sichtprüfung.
- Textänderungen nur in `content.mjs`, danach neu rendern und Alt-Text nachführen.

## Offene CI-Entscheide (LWE)

| # | Entscheid | Stand | Quelle |
|---|---|---|---|
| E1 | **Logo:** helle Bildmarke für dunklen Grund liefern (SVG oder PNG ≥ 600 px) oder abgeleitete Variante freigeben; Vektorlogo für Druck | offen, bis dahin Wortmarke auf dunkel | README visuals-ci3, Flyer, Freigabeliste |
| E1b | **Widerspruch Unterstrich:** Skill verbietet «tricolor-Unterstrich», Beispiele von LWE zeigen ihn | offen | CI-Kurzreferenz, Skill |
| E2 | **Gold als Textfarbe** der zweiten Headline-Zeile auf Fakten-Karten (CI Square: Zeile 2 Ink) | offen, derzeit Gold | Freigabeliste §2 |
| E3 | **Eyebrow «SECURITY4KMU»** auf allen Posts (auch Pentest, NIS2) und Nummerierung «TIPP DER WOCHE #NN» ab #20 | offen, derzeit Rubrik ohne Nummer | README, Freigabeliste |
| E4 | **Carousel 6 statt 4 Slides** | offen, Begründung im README | README |
| E5 | **Serifen-Headlines** im Flyer (Source Serif 4; PPTX Cambria) statt reiner Raleway/Calibri | offen | Freigabeliste §2, Flyer |
| E6 | **CMYK-/Pantone-Werte** für Navy, Navy Deep, Gold | offen | Flyer |
| E7 | Quellenzeile volldeckend `#b8c4d3` statt CI `rgba(255,255,255,.5)` (Kontrastgrund) | umgesetzt, CI-Anpassung bestätigen | README |
| E8 | Opaker Headline-Block `#eef1f5` auf Covers ohne Foto | umgesetzt, bestätigen | build.mjs |
