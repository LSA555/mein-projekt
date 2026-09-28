# Prüfprotokoll — CI v3.0 Redesign LinkedIn-Batch-1-Visuals

**Task:** NGL-20260928-e93823 (tenant cyspa, project linkedin, flow general-task)
**Auftrag:** LWE, 28.09.2026 — Umstellung der LinkedIn-Batch-1-Visuals auf CYSPA CI v3.0 (Navy/Gold, Raleway) nach Referenzbild.
**Standard:** Skill `cyspa-designer` (CI v3.0, Juni 2026), Referenz `linkedin/assets/img/ci-v3-referenz.webp`.
**Ausführung:** Hauptsession mit Skill `cyspa-designer`. **Prüfung:** nigel-orchestrator (unabhängig).

## Abnahmekriterien

| # | Kriterium | Ergebnis | Beleg |
|---|-----------|----------|-------|
| K1 | Nur CI-v3.0-Tokens (Gold #ffc000, Navy #103157, Navy Deep #071828, Raleway); kein Cyan/Montserrat/Inter/JetBrains; Text-Wortmarke CYSPA.ch statt Logo-PNG; Alt-Dateien entfernt | erfüllt | `build.mjs` (Token-Block, nur `raleway-var.ttf`), `fonts/` enthält nur noch Raleway, Alt-Fonts + Logo-PNG per `git rm` entfernt |
| K2 | Fakten-Karten-Layout (Gradient 155°, Grid, Gold-Kante links, Gold-Tick + Label, Fusszeile CYSPA.ch); Einzelgrafik 1200×1200, Carousel 1080×1350, PDF gleiches Format | erfüllt | Kontaktbogen `export/contact-sheet.png`, PNG-Masse, PDF-MediaBox 810×1013 pt = 1080×1350 px |
| K3 | Copy-Regeln §2 (keine Gedankenstriche im Satzfluss, keine Ausrufezeichen, ss-Schreibung) | erfüllt | `content.mjs`: 0×`—`, 0×`ß`, keine Ausrufezeichen in Copy |
| K4 | Doku aktualisiert: 03-styleguide.md §5, assets/README.md, Hinweis in posts/README.md | erfüllt | genannte Dateien auf CI v3.0; README-Aussage «Alt-Dateien entfernt» stimmt mit Dateisystem überein |
| K5 | Committet + gepusht auf `claude/cyspa-linkedin-strategy-vte419`; Prüfprotokoll unter `data/cyspa/` | siehe Commit-/Push-Abschnitt | dieses Protokoll; Commit-Hash + Push-Ausgabe im execute-Beleg |

## Visuelle QA gegen Referenzbild

- Gradient, Grid-Overlay, Gold-Kante links, Gold-Tick-Label und Wortmarke `CYSPA.ch` (goldenes `.ch`) auf allen Slides vorhanden.
- Footer-Abschneiden (im Skill dokumentierter Stat-Block-Effekt) durch `margin-top:auto` behoben.
- Light-Variante (P3) mit Navy-Headline, Gold-Akzent, Label in Primary Blue korrekt abgesetzt.

## Verbotsliste (Skill §1) — geprüft

Kein Gold als Fläche · kein Gold-Kleintext auf hell · keine zweite Akzentfarbe · keine farbigen Schatten · keine Emojis ausser Checklisten-Häkchen. Eingehalten.

## Umfang / Nicht enthalten

- Kein LinkedIn-Publizieren (wäre freigabepflichtig, ausserhalb Scope).
- P8 bleibt Textpost (kein Visual), P11 wartet auf echtes Teamfoto.
- Post-Briefings inhaltlich unverändert ausser CI-Hinweis in `posts/README.md`.
