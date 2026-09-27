---
tags: [linkedin, visuals, ci-v3, oktober-2026]
status: publikationsreif-entscheide-lwe-offen
date: 2026-09-27
source: "CI-v3-Kurzreferenz (cyspa-marketing/ci-referenz/), Beispiele von LWE vom 27.09.2026, Beitragsdateien in linkedin/freigabe/ und linkedin/posts-neu/"
---

# LinkedIn-Visuals Oktober 2026 im CYSPA CI v3.0

Alle Visuals für #07 und #09 bis #16 wurden am 27.09.2026 im CI v3.0 neu gebaut (Navy/Gold, Raleway 400–900). Sie ersetzen die Assets im alten Repo-CI (Deep Space Blue, Cyan, Montserrat, Logo-Plakette) unter `freigabe/assets/` und `assets-neu/`. #08 hat bewusst kein Visual.

Kontaktbogen aller Visuals: `contact-sheet.png`.

## Dateien und Formatwahl

| Post | Slot | Serie (Eyebrow Zeile 2) | Format CI v3 | Variante | Dateien |
|---|---|---|---|---|---|
| #07 NIS2 | Di 29.09. | REGULATORIK IM KLARTEXT | Fakten-Karte 1200×1200 | rows (drei Wege + Hinweis Schweiz) | `07-nis2/2026-09-29-p06-nis2.png` |
| #09 Pentest | Di 06.10. | LESSONS FROM THE FIELD | Fakten-Karte 1200×1200 | rows (vier Befundklassen) | `09-pentest/2026-10-06-p09-pentest.png` |
| #10 Tabletop | Do 08.10. | EXECUTIVE BRIEFING | Tipp-Carousel 1080×1350, 6 Slides | Cover, Lead, 3 Inhaltsslides, CTA | `10-tabletop/2026-10-08-p12-tabletop.pdf` + `slide-01…06.png` |
| #11 Harvest | Di 13.10. | FUTURE SECURITY | Fakten-Karte 1200×1200 | timeline (heute, jahrelang, morgen) | `11-harvest/2026-10-13-p10-harvest.png` |
| #12 Partner Plan B | Do 15.10. | INSIDE CYSPA | Fakten-Karte 1200×1200 | rows, nummeriert (vier Prinzipien) | `12-partner-planb/2026-10-15-p11-partner-planb.png` |
| #13 Passwordless | Di 20.10. | QUICK TIP | Fakten-Karte 1200×1200 | timeline (vier Schritte, 1 und 2 hervorgehoben) | `13-passwordless/2026-10-20-p01-passwordless.png` |
| #14 IT-Vertrag | Do 22.10. | RESILIENZ KONKRET | Fakten-Karte 1200×1200 | rows (fünf Fragen) | `14-it-vertrag/2026-10-22-p04-it-vertrag.png` |
| #15 Gastkonten | Di 27.10. | MICROSOFT SECURITY PRAXIS | Tipp-Carousel 1080×1350, 6 Slides | Cover, 4 Prüfpunkt-Slides, CTA | `15-gastkonten/2026-10-27-p05-gastkonten.pdf` + `slide-01…06.png` |
| #16 Roadmap | Do 29.10. | AUS DEM CISO-ALLTAG | Tipp-Carousel 1080×1350, 6 Slides | Cover, Lead, 3 Horizont-Slides, CTA | `16-roadmap/2026-10-29-p08-roadmap.pdf` + `slide-01…06.png` |

Begründung Formatwahl:

- **Single Graphics → Fakten-Karte.** Die Square-Post-Klasse braucht ein Vollbild-Foto; es gibt keine freigegebenen Fotos, KI-Personen sind ausgeschlossen. Die Fakten-Karte trägt die Inhalte ohne Foto.
- **Keine Variante `stat`.** Keiner der Posts hat eine belegte Kennzahl, die als Grosszahl trägt. Die einzigen Zahlen in den Grafiken sind Fristen und Daten aus Rechtsquellen (#07: 24 Stunden, 1. April 2025, Quelle ISG in der Fusszeile) oder Schwellen in Fragen (#15: 90 Tage).
- **Carousels → Tipp-Carousel.** Cover im Navy-Verlauf mit feinem Raster wie im Beispiel, ohne Foto. Textslides weiss mit Bildmarke, CTA-Slide wieder Navy.

### Carousel mit 6 statt 4 Slides (Begründung)

Das CI sieht für das Tipp-Carousel 4 Slides vor (Cover, Lead, Checkliste, CTA). Alle drei Carousels behalten 6 Slides:

- **#10 Tabletop:** Vier typische Erkenntnisse mit je zwei Leitfragen. Auf einer Checkliste würden die Fragen auf Stichworte schrumpfen, und genau die Fragen sind der Nutzen für die Geschäftsleitung. Der Alt-Text und die Gate-Prüfungen im Freigabepaket beziehen sich zudem auf 6 Slides.
- **#15 Gastkonten:** Fünf Prüfpunkte, jeder mit dem Namen der Einstellung in Entra ID. Auf 4 Slides müssten Einstellungsnamen wegfallen, die Admins zum Nachschlagen brauchen.
- **#16 Roadmap:** Drei Horizonte mit je drei Beispielen plus Vergleich «Entscheidbar / lange Liste». Ein Horizont pro Slide ist der Kern des Formats.

Die Slides folgen trotzdem der CI-Logik: Slide 1 Cover, Slide 2 Lead oder erster Inhalt, Slides 3 bis 5 im Checklisten- und Lead-Stil (Gold-Häkchen in Navy-Kreis, Lead 800 Navy, Body 500 Ink), Slide 6 CTA mit Gold-Strich und Merksatz.

## Offene Entscheide für LWE

1. **Logo-Variante auf dunklem Grund.** Die Datei `linkedin/assets/img/cyspa-logo-transparent.png` (Branch `claude/cyspa-linkedin-strategy-vte419`, 288×122 px) entspricht der Bildmarke aus den Beispielen: CYS blau, PA grau, Unterstrich blau/hellblau/gold, Claim «CYBER SECURITY PARTNERS». Es gibt aber nur die dunkle Variante für hellen Grund. Eingesetzt:
   - auf den weissen Carousel-Slides die Bildmarke (PNG, Höhe 82 px, keine Plakette);
   - auf allen dunklen Flächen (Fakten-Karten, Covers, CTA-Slides) die Wortmarke «CYSPA.ch» als Text, Raleway 800, Laufweite .14em, «.ch» in Gold.
   **Bitte liefern:** helle Variante der Bildmarke (SVG oder PNG ≥ 600 px Breite) für dunkle Flächen, dann kann sie auf Cover und CTA ergänzt werden. Offen bleibt zudem der Widerspruch aus der CI-Kurzreferenz: Der Skill verbietet den dreifarbigen Unterstrich, die Beispiele zeigen ihn.
2. **Serien-Nummerierung.** Das Beispiel trägt «TIPP DER WOCHE #19». Die Nummerierung der bestehenden Serie ist unbekannt. Deshalb steht in Zeile 2 des Eyebrows die Rubrik des Posts (z. B. «EXECUTIVE BRIEFING»), ohne Nummer. Entscheid: Sollen die Oktober-Posts in die Zählung «TIPP DER WOCHE #NN» aufgenommen werden, und ab welcher Nummer? Die Änderung ist eine Zeile in `_build/content.mjs` (Feld `series`).
3. **Carousel 6 statt 4 Slides** (siehe Begründung oben). Bestätigen oder auf 4 kürzen lassen.
4. **Asset-Pfade in den Freigabepaketen.** Erledigt am 27.09.2026: Steckbrief und Publikationsanleitung in `freigabe/*.md` sowie `posts-neu/00-planung-20-29-okt.md` zeigen auf `visuals-ci3/`. Die alten Cyan-Dateien liegen in `freigabe/_alt-ci-assets/` und `assets-neu/` (nicht verwenden).

## Grafiktext-Änderungen (in den Beitragsdateien nachgetragen)

- #07: Pfeile EU→CH ersetzt durch drei Zeilen mit Kurzbeschreibung, Hinweis Schweiz ohne Gedankenstrich, Quellenzeile. Die Art.-26-Direktanwendung ist nicht in der Grafik (Fach-Owner offen).
- #09: Kurzbeschreibung je Befundklasse aus dem Post-Text; Merksatz «Identitäten und Angriffsfläche zuerst. Dann der Rest.»
- #10: Gedankenstriche entfernt, «Tabletop = Entscheidungsübung» ausgeschrieben, Slide 6 um die drei Bestandteile aus dem Post-Text ergänzt. 90 Minuten / halber Tag unverändert, Entscheid IR-Owner.
- #11: Headline «Heute abgefangen. Morgen entschlüsselt.», Begriff als Kicker; Zeitachse statt Icons.
- #12: je Prinzip eine Kurzzeile aus dem Post-Text; «CYSPA · Cyber Security Partners» ohne Gedankenstrich.
- #13, #14: Inhalt unverändert, neu Quellenzeile (#13) bzw. Themen-Badges (#14).
- #15: unverändert.
- #16: Lead-Satz auf Slide 2 ergänzt.

## Prüfungen (27.09.2026)

- **Masse:** alle PNG exakt 1200×1200 bzw. 1080×1350 (automatische Prüfung in `build.mjs`). PDFs je 6 Seiten, exakt 810×1012,5 pt (= 1080×1350 px), Raleway als Subset eingebettet (alle Fonts eingebettet), Textlayer vorhanden, PDF-Titel gesetzt.
- **Kein Weissbalken:** Screenshot pro Seite über das Element, nicht über das Fenster. Randzeilen und -spalten der dunklen Visuals ohne weisse Pixel; die weissen Carousel-Slides sind gestalterisch weiss.
- **Sichtprüfung:** jedes PNG und das Tabletop-PDF (gerendert mit PyMuPDF) angesehen und mit den Beispielbildern verglichen.
- **Kontrast (WCAG):** kleinster Wert 5,5:1 (Quellenzeile #b8c4d3 auf #1a4576). Weiss 9,7:1, Gold 5,9:1 auf dem hellsten Verlaufston; Primary Blue auf Weiss 7,0:1; Body #5a5a5a auf Weiss 6,9:1. Abweichung vom CI: Fusszeilen-Quelle nicht `rgba(255,255,255,.5)` (nur ca. 3,7:1), sondern volldeckend #b8c4d3.
- **Schriftgrössen:** kleinster Text 24 px (Eyebrow, Badges, Quellen, Pager), auch auf den 1080er-Slides. Ausnahme: der Claim in der Bildmarke (Teil des Logos).
- **Copy:** keine Gedankenstriche im Satzfluss, kein ß, keine Ausrufezeichen in den Grafiktexten (automatisch geprüft). Keine Kundennamen, keine KI-Personen, keine Fotos.

## Neu rendern

```bash
# einmalig in einem Arbeitsordner ausserhalb des Repos
npm i @fontsource/raleway playwright-core pngjs pdf-lib
# rendern (alle Visuals + Kontaktbogen)
cd cyspa-marketing/linkedin/visuals-ci3/_build
NODE_PATH=<arbeitsordner>/node_modules node build.mjs
# nur ein Visual: ONLY=15 …   PDF-Prüfung: node pdfcheck.mjs ../*/*.pdf
```

- `_build/content.mjs`: alle Grafiktexte. Textänderungen nur hier, dann neu rendern und Alt-Text in der Beitragsdatei nachziehen.
- `_build/build.mjs`: Layouts (Fakten-Karte, Tipp-Carousel), Rendern mit `chromium_headless_shell` (Playwright), Pixel- und Überlaufprüfung, PDF-Normalisierung, Kontaktbogen.
- `_build/html/`: die generierten HTML-Seiten (Fonts eingebettet), zur Kontrolle oder für eine spätere Canva-Übergabe.
- `_build/assets/cyspa-logo-transparent.png`: Bildmarke aus dem Strategie-Branch.
