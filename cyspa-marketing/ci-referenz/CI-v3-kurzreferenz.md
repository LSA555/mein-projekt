---
tags: [cyspa, ci, design, referenz]
status: aktiv
date: 2026-09-27
source: "Skill cyspa-designer (CI v3.0, Juni 2026) und Beispiele von LWE vom 27.09.2026"
---

# CYSPA CI v3.0, Kurzreferenz für die Produktion

Gilt für alle Visuals, Flyer und Webseiten. Das Repo-CI im Branch `claude/cyspa-linkedin-strategy-vte419` (Deep Space Blue, Cyan) ist **nicht** das gültige CI.

## Farben

| Rolle | Wert |
|---|---|
| Gold, einzige Akzent- und CTA-Farbe | `#ffc000` |
| Navy, Anker und dunkle Flächen | `#103157` |
| Navy Deep, Hero und tiefste Ebene | `#071828` |
| Primary Blue, Section-Labels | `#425b76` |
| Hover Blue, nur Button-Hover | `#2062af` |
| Heading / Ink | `#1a1a1a` |
| Body | `#5a5a5a` |
| Muted, Meta und Quellen | `#8a8a8a` |
| Border | `#e6e6e6` |
| Gray, Sekundärfläche | `#f8f8f8` |

Schrift: **Raleway** 400–900 für Web und Social, Calibri für PPTX/DOCX.

**Verboten:** Gold als Flächenhintergrund · Gold mit kleinem Text auf `#f8f8f8` · farbige Schatten (nur `rgba(0,0,0,x)`) · zweite Akzentfarbe · Emoji ausser Checklisten-Häkchen.

## Copy-Regeln

- Kein Gedankenstrich im Satzfluss. Punkt oder Komma setzen.
- `ss` statt `ß`.
- Keine Ausrufezeichen.
- Sie-Form, aktiv, ohne Angstrhetorik. Zahlen mit Quelle oder gar nicht.
- Zweizeilige Headlines: Zeile 1 setzt die Prämisse, Zeile 2 dreht sie.

## Social-Formate

1. **Square Post 1200×1200:** Vollbild-Foto, Verlauf `180deg, rgba(7,24,40,.62) → transparent 44%`, Rubrik-Label oben links (Gold-Tick 2.4em × 0.18em, Label 1.5em/800, Laufweite .22em, Versalien), Logo oben rechts (18 % Breite), Headline-Block unten in `rgba(255,255,255,.78)` mit `backdrop-filter: blur(2px)`, Zeile 1 Navy, Zeile 2 Ink, 4.5em/800, Laufweite -.03em, Gold-Balken rechts unter dem Block (38 % × 1.7em), `CYSPA.ch` unten links.
2. **FAQ Quick Guide 1080×1350:** Navy links, Foto rechts (41.4 %), Gold-Eyebrow zweizeilig (`SECURITY4KMU` / `FAQ QUICK GUIDES #NN`) mit Schloss-Icon, weisse Frage 6.2em/800, Gold-Pfeil bei 71 % Höhe, `www.cyspa.ch` unten rechts.
3. **Tipp-Carousel 1080×1350, 4 Slides:** Cover (Navy-Verlauf mit feinem Raster oder Foto, Eyebrow `SECURITY4KMU` / `TIPP DER WOCHE #NN` in Gold, weisser Headline-Block mit Gold-Balken, `www.cyspa.ch` unten rechts) · Lead (weiss, Lead 3.5em/800 Navy, Body 2.5em/500 Ink) · Checkliste (Gold-Häkchen, «Was hilft:» / «Warum das entscheidend ist:», Closing unten) · CTA (Gold-Strich, Titel, Body). Textslides `padding-top: 17%`.
4. **Fakten-Karte 1200×1200:** Verlauf `155deg, #071828 → #103157 55% → #1a4576`, Raster-Overlay 3.5 %, Gold-Kante links (1em), Section-Label, Headline 5.2em/800, Varianten `stat`, `timeline`, `rows`, Fusszeile `CYSPA.ch` und Quelle 1.9em in `rgba(255,255,255,.5)`.

Mindestgrössen: kein Text unter 24 px im 1200er-Raster, Kontrast 4.5:1 (Headlines 3:1), volldeckende Schrift auf Foto- und Akzentflächen.

## Logo

Die Beispiele von LWE (siehe `beispiel-*.jpg`) zeigen die Bildmarke «CYSPA» (CYS blau, PA grau, Unterstrich blau/gold, Claim «CYBER SECURITY PARTNERS») sowie die Wortmarke «CYSPA.ch» mit «.ch» in Gold. Der Skill verbietet einen dreifarbigen Unterstrich. **Offener Widerspruch, Entscheid LWE.** Bis dahin: die Bildmarke wie in den Beispielen verwenden (auf dunklem Grund in heller Variante), die Wortmarke in Kopf- und Fusszeilen.

## Beispiele von LWE

- `beispiel-security4kmu-tipp.jpg`: Tipp-Carousel, Cover und Lead-Slide (Serie «SECURITY4KMU · TIPP DER WOCHE #19»)
- `beispiel-flyer-ciso-as-a-service.jpg`: Flyer CISO as a Service (Serifen-Headlines, Gold-Akzente, Navy-Flächen, Gold-Seitenbalken links)
