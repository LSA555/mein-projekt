# Asset-Pipeline — Batch-1-Visuals

Produktionssystem für die LinkedIn-Visuals nach den Visual-Briefings in [../posts/](../posts/) und den Visual Guidelines in [../03-styleguide.md](../03-styleguide.md).

## Werkzeug-Entscheidung

Geprüft wurden drei Wege; gewählt wurde der Code-Renderer:

| Option | Bewertung |
|--------|-----------|
| **Higgsfield / generative Bild-KI** | Ungeeignet für diese Asset-Klasse: Die Visuals sind typografische Informationsgrafiken mit exaktem Wortlaut, exakten CI-Hexwerten und CI-Fonts. Generative Modelle rendern Text unzuverlässig und garantieren weder Farbtreue noch WCAG-Kontraste. Zudem CI-Regel: keine fotorealistische KI-Darstellung von Personen. Denkbar später für das Motion-Format (P10) — dort ist aber CSS/SVG-Animation CI-treuer. |
| **Canva / Gamma (Design-Tools via API)** | Möglich, aber pro Iteration «blind» (Ergebnis erst nach Export sichtbar), begrenzte Pixel-Kontrolle über API und hoher Aufwand pro Korrekturschleife. Sinnvoll erst, wenn das Team Vorlagen manuell weiterbearbeiten will — dann als Brand-Template-Nachbau dieses Systems. |
| **Code-Renderer (HTML/CSS → headless Chromium)** ✅ | CI-Fonts und Logo liegen lokal vor, Chromium ist vorinstalliert. Deterministisch, pixelgenau (Hex, Fonts, Kontraste), batchfähig und wiederverwendbar: Neue Posts brauchen nur einen Eintrag in `content.mjs`. PNG für Feed-Posts, echtes Vektor-PDF für Dokument-Posts. |

## Aufbau

| Datei | Zweck |
|-------|-------|
| `content.mjs` | Inhalte aller Visuals (Slide-Typen + Copy). **Hier neue Posts ergänzen.** |
| `build.mjs` | Designsystem (CI-Tokens, Slide-Templates) + Renderer |
| `fonts/` | Montserrat Bold, Inter, JetBrains Mono (CI-Fonts, Latin-Subsets, OFL-lizenziert) |
| `img/` | CYSPA-Logo (transparente Wortmarke) |
| `export/` | Ergebnis: PNGs (Feed) und PDFs (Carousel-/Dokument-Posts), plus `contact-sheet.png` als Gesamtübersicht |

## Nutzung

```bash
node build.mjs        # rendert alle Visuals nach export/
node build.mjs sheet  # zusätzlich Kontaktbogen export/contact-sheet.png
```

Voraussetzungen: Node ≥ 18 und Chromium (Pfad via Umgebungsvariable `CHROME`, Standard: `/opt/pw-browsers/chromium`).

## Formate & Design-Regeln (implementiert)

- **Single Graphic:** 1200×1500 px (4:5) · **Carousel-Slides:** 1080×1350 px, als PDF für LinkedIn-Dokument-Posts (Vektor, Fonts eingebettet)
- Deep Space Blue `#0A1F44` als Grund, Weiss als Textfarbe, **Cyber Cyan `#00AEEF` ausschliesslich als Akzent** (Linien, Rahmen, Chips) — nie als Textfarbe
- Serien-Badge oben links, Pager oben rechts (Carousels), Cyan-Akzentlinie als Signaturelement
- Montserrat Bold für Headlines, Inter für Fliesstext, JetBrains Mono für technische Begriffe
- **Logo auf weisser Plakette** auf dunklen Flächen: Die Wortmarke enthält Dunkelgrau-Anteile und wäre direkt auf Navy nicht ausreichend kontrastreich; die Plakette hält die Logo-Originalfarben unangetastet (Accessibility-Gate). Auf der hellen Variante (P3) liegt das Logo direkt auf dem Grund.
- Light-Variante (Security Grey `#F2F2F2`, Text Deep Space Blue) für P3/Chefsache Cyber

## Status Batch 1

Erstellt: 10 von 12 Posts (26 PNGs, 3 PDFs). Bewusst ohne generiertes Asset:
- **P8 (01.10., Security-Budget):** per Briefing reiner Textpost (Format-Experiment)
- **P11 (15.10., Inside CYSPA):** benötigt ein echtes Teamfoto — wird nicht generiert (CI-/Legal-Regel); OPSEC- und Einwilligungs-Check gemäss Beitragsdatei

Die Visuals sind Entwürfe im Sinne von Prozess-Schritt 5 (Kreation) und durchlaufen vor Publikation die Gates aus [../04-prozess-qualitaet.md](../04-prozess-qualitaet.md).
