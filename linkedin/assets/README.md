# Asset-Pipeline — Batch-1-Visuals (CI v3.0)

Produktionssystem für die LinkedIn-Visuals nach den Visual-Briefings in [../posts/](../posts/) und den Visual Guidelines in [../03-styleguide.md](../03-styleguide.md). Seit 28.09.2026 gerendert im **CYSPA CI v3.0** (Navy/Gold, Raleway) gemäss Skill `cyspa-designer` und Referenzbild [img/ci-v3-referenz.webp](img/ci-v3-referenz.webp); CI v3.0 ersetzt ältere Farb-/Font-Angaben (Cyan, Montserrat/Inter) in bestehenden Briefings.

## Werkzeug-Entscheidung

Geprüft wurden drei Wege; gewählt wurde der Code-Renderer:

| Option | Bewertung |
|--------|-----------|
| **Higgsfield / generative Bild-KI** | Ungeeignet für diese Asset-Klasse: typografische Informationsgrafiken mit exaktem Wortlaut, exakten CI-Hexwerten und CI-Fonts. Generative Modelle rendern Text unzuverlässig und garantieren weder Farbtreue noch WCAG-Kontraste. |
| **Canva / Gamma (Design-Tools via API)** | Möglich, aber pro Iteration «blind» und aufwendig pro Korrekturschleife. Sinnvoll erst als Canva-Übergabe für manuelle Weiterbearbeitung (Skill `cyspa-designer` §4). |
| **Code-Renderer (HTML/CSS → headless Chromium)** ✅ | Deterministisch, pixelgenau (Hex, Fonts, Kontraste), batchfähig, wiederverwendbar: Neue Posts brauchen nur einen Eintrag in `content.mjs`. PNG für Feed-Posts, echtes Vektor-PDF für Dokument-Posts. |

## Aufbau

| Datei | Zweck |
|-------|-------|
| `content.mjs` | Inhalte aller Visuals (Slide-Typen + Copy nach CI-v3.0-Regeln). **Hier neue Posts ergänzen.** |
| `build.mjs` | Designsystem (CI-v3.0-Tokens, Fakten-Karten-Layouts) + Renderer |
| `fonts/raleway-var.ttf` | Raleway Variable (100–900), einzige CI-v3.0-Schrift für Social (OFL) |
| `img/ci-v3-referenz.webp` | Referenzbild der Inhaberin für den CI-v3.0-Look |
| `export/` | Ergebnis: PNGs (Feed) und PDFs (Carousel-/Dokument-Posts), plus `contact-sheet.png` |

Die Alt-CI-Dateien (Montserrat/Inter/JetBrains-Fonts, Logo-PNG mit Tricolor-Balken) sind entfernt — CI v3.0 nutzt die Text-Wortmarke `CYSPA` + `.ch` in Gold; die alten Stände bleiben in der Git-Historie.

## Nutzung

```bash
node build.mjs        # rendert alle Visuals nach export/
node build.mjs sheet  # zusätzlich Kontaktbogen export/contact-sheet.png
```

Voraussetzungen: Node ≥ 18 und Chromium (Pfad via Umgebungsvariable `CHROME`, Standard: `/opt/pw-browsers/chromium`).

## Design-Regeln (implementiert, CI v3.0)

- **Formate:** Einzelgrafik = Fakten-Karte **1200×1200 px**; Carousel-Slides **1080×1350 px**, als Vektor-PDF für LinkedIn-Dokument-Posts (Fonts eingebettet)
- **Grund:** Gradient `155deg, #071828 → #103157 55% → #1a4576` + Grid-Overlay (~3.5%) + **Gold-Kante links** (1 Rastereinheit)
- **Gold `#ffc000` als einzige Akzentfarbe:** Ticks, Häkchen, Striche, Pfeile, grosse Ziffern, `.ch` — nie als Fläche, nie als kleiner Text auf hell
- **Section-Label:** Gold-Tick + Versalien (Serien-Label), Pager rechts; **Fusszeile:** Wortmarke `CYSPA.ch` links, Quelle/Hinweis rechts
- **Typografie:** Raleway 800 für Headlines, 400–600 für Text und Pills (technische Begriffe)
- **Kacheln:** transparente Flächen mit feiner heller Border, grosse weisse Zahlen
- **Light-Variante** (P3): Weiss, Navy-Headline, Gold-Akzente, Label in Primary Blue `#425b76`
- **Copy auf Visuals:** keine Gedankenstriche im Satzfluss, keine Ausrufezeichen, ss-Schreibung

## Status Batch 1

Im CI v3.0 gerendert: 10 von 12 Posts (26 PNGs, 3 PDFs). Bewusst ohne generiertes Asset:
- **P8 (Security-Budget):** per Briefing reiner Textpost (Format-Experiment)
- **P11 (Inside CYSPA):** benötigt ein echtes Teamfoto — wird nicht generiert (CI-/Legal-Regel)

Die Visuals sind Entwürfe im Sinne von Prozess-Schritt 5 (Kreation) und durchlaufen vor Publikation die Gates aus [../04-prozess-qualitaet.md](../04-prozess-qualitaet.md).
