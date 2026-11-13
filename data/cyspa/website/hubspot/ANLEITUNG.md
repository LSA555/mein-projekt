---
tags: [cyspa, website, hubspot, anleitung]
status: entwurf
date: 2026-11-13
source: Export aus data/cyspa/website/preview/index.html (Nigel-Task NGL-20261104-368091)
---

# CYSPA-Website in HubSpot übertragen (Copy-Paste)

Das Paket enthält jede Seite als fertigen HTML-Block. Die Navigation, die Fusszeile und der Basic-Check-Abschnitt liegen als globale Bausteine bei. Das CSS gilt für alle Seiten gemeinsam.

## Inhalt dieses Ordners

| Datei | Zweck |
|---|---|
| `cyspa.css` | Gestaltung (CI-Farben, Raleway, alle Bausteine). Einmal einbinden. |
| `site.js` | Mobiles Menü und Stellenfilter. Einmal einbinden. |
| `global-header.html` | Navigation mit Logo und Basic-Check-Button |
| `global-cta-basic-check.html` | Abschnitt „Wie sicher ist Ihr Unternehmen wirklich?“, auf allen Seiten ausser Kontakt |
| `global-footer.html` | Fusszeile |
| `seiten/*.html` | Inhalt je Seite, 25 Seiten |
| `jsonld/*.html` | Strukturierte Daten je Seite (Organisation, Leistung, FAQ) für Google |
| `seo-seitenplan.csv` | Slug, Seitentitel, Meta-Beschreibung und H1 je Seite |
| `weiterleitungen-301.csv` | Weiterleitungen, damit bestehende Google-Rankings erhalten bleiben |
| `bilder/` | Teamfotos und Logo. Sie werden in den File Manager hochgeladen. |
| `../downloads/cyspa-lageplan.pdf` | Lageplan als PDF |

## Schritt für Schritt

1. **Bilder hochladen:** Marketing > Dateien. Ordner `website-2026` anlegen und alles aus `bilder/` hochladen. Danach in den Seiten-Dateien `bilder/…` durch die HubSpot-URL ersetzen. Mit „Suchen und Ersetzen“ im Editor geht das schnell.
2. **CSS und JS einbinden:** Einstellungen > Inhalte > Seiten > Vorlagen. Bei „Site-Header-HTML“ einfügen:
   `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800;900&display=swap">` und den Inhalt von `cyspa.css` in `<style>…</style>`. Bei „Site-Footer-HTML“ den Inhalt von `site.js` in `<script>…</script>`.
   Besser ist es, beides als Dateien im Design-Manager anzulegen und im Template zu verlinken.
3. **Vorlage:** Eine leere Vorlage ohne eigenes Theme-Styling verwenden, zum Beispiel ein Drag-and-drop-Template mit nur einer Spalte. Theme-Styles können sonst Schriften und Abstände überschreiben.
4. **Globale Bausteine:** Je ein globales „Rich Text“- bzw. „Custom HTML“-Modul für Header, Basic-Check-Abschnitt und Footer anlegen und den Inhalt der drei `global-*.html` einfügen.
5. **Seiten anlegen:** Für jede Zeile in `seo-seitenplan.csv` eine Website-Seite erstellen:
   - URL-Slug, Seitentitel und Meta-Beschreibung aus der CSV übernehmen.
   - Ein „Custom HTML“-Modul einfügen und den Inhalt der Datei aus `seiten/` hineinkopieren.
   - Unter Einstellungen > Erweitert > „Head-HTML“ den Inhalt der passenden Datei aus `jsonld/` einfügen.
6. **Formulare ersetzen:** Das Kontaktformular, das Basic-Check-Formular und das Download-Fenster sind in der Vorschau nur Attrappen. In HubSpot durch HubSpot-Formulare ersetzen:
   - **Kontakt:** Felder Vorname, Nachname, E-Mail, Unternehmen, Ansprechperson (Auswahl: Rodney Fortune, Michael Russo, Leila Weber), Thema, Nachricht.
   - **Basic Check:** am besten das HubSpot-Meetings-Tool einbetten, wie heute auf `/kontakt-0`.
   - **Whitepaper:** Formular mit Datei-Weiterleitung („Gated Content“).
7. **Karte:** Im Abschnitt „So finden Sie uns in Rotkreuz“ die schematische Karte durch eine eingebettete Google-Karte ersetzen. Google Maps > Teilen > Karte einbetten. Den Button „Lageplan als PDF“ auf die hochgeladene PDF verlinken.
8. **Weiterleitungen:** Einstellungen > Inhalte > Domains und URLs > URL-Weiterleitungen. Die Zeilen aus `weiterleitungen-301.csv` als permanente Weiterleitungen (301) anlegen.
9. **Vor dem Veröffentlichen prüfen:**
   - Alle Links klicken.
   - Ansicht auf dem Handy prüfen.
   - In der Google Search Console die Sitemap neu einreichen.
   - Mit dem Rich-Results-Test von Google die FAQ-Daten prüfen.

## Wichtig für das Ranking

Die Slugs der bestehenden Leistungsseiten bleiben unverändert: `/dienstleistungen/ciso-as-a-service`, `/security-testing`, `/security-consulting`, `/security-audit`, `/security-awareness`, `/unternehmen` und `/kontakt`. So bleiben die heutigen Google-Platzierungen erhalten. Bei „CISO as a Service“ steht cyspa.ch heute auf Platz 9.
