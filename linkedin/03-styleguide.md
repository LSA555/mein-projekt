# 03 — Styleguide: Sprache, Post-Anatomie, Visuals, Accessibility

## 1. Tonalität

**In einem Satz:** Ein erfahrener Schweizer Security-Partner erklärt auf Augenhöhe — klar, konkret, ohne Angst und ohne Buzzword-Nebel.

| Wir sind | Wir sind nicht |
|----------|----------------|
| Klar und direkt («Das Problem ist X. Prüfen Sie Y.») | Alarmistisch («Hacker-Tsunami bedroht alle KMU!!») |
| Konkret (Prüffragen, Reihenfolgen, Aufwände) | Abstrakt («Ganzheitliche 360°-Sicherheit») |
| Ehrlich (Grenzen und Aufwände benennen) | Verkäuferisch («Nur mit Lösung X sind Sie sicher») |
| Schweizerisch geerdet (OR, revDSG, BACS, KMU-Realität) | Übersetzter US-Content («Ihre CISA-Compliance …») |
| Respektvoll gegenüber IT-Teams und Dienstleistern | Besserwisserisch («Was Ihre IT alles falsch macht») |

**Haltungs-Regeln:**
- Risiko immer mit Handlungsoption. Ein Post, der nur Angst hinterlässt, ist gescheitert.
- Wir schreiben über Probleme und Muster, nie abwertend über konkrete Dritte (Wettbewerber, Hersteller, betroffene Unternehmen). Zu öffentlich bekannten Vorfällen: einordnen und Lehren ziehen, nicht auf Kosten des Opfers pointieren.
- Meinung ist erlaubt und erwünscht («Wir halten X für falsch priorisiert») — begründet, nie polemisch.

## 2. Sprache (de-CH)

- **Schweizer Hochdeutsch, keine ß-Schreibung:** Massnahmen, gross, heisst, regelmässig.
- **Anführungszeichen:** Guillemets «…» (CH-Standard).
- **Anrede:** «Sie» in allen Segmenten. Leserbezug aktiv («Prüfen Sie», «Stellen Sie die Frage»), nicht passiv («Es sollte geprüft werden»).
- **Zahlen/Daten:** Format 08.09.2026; Uhrzeiten 08:15 Uhr; Beträge CHF 25'000 (Hochkomma als Tausendertrennzeichen).
- **Fachbegriffe:** Englische Fachbegriffe sind ok, wo sie Standard sind (Conditional Access, Ransomware, Phishing). Regel je Segment: In Executive-Posts wird jeder Fachbegriff beim ersten Auftreten in einem Halbsatz erklärt; in Technical-Posts nicht nötig.
- **Abkürzungen:** Beim ersten Auftreten ausschreiben, ausser sie sind in der Zielgruppe Standard (MFA in Technical ok, in Executive: «Multi-Faktor-Authentifizierung (MFA)»).
- **Gender:** Neutrale Formen bevorzugen (Mitarbeitende, IT-Verantwortliche, Geschäftsleitung). Kein Binnen-I, kein Genderstern in Posts (Lesbarkeit/Screenreader).
- **Satzlänge:** Faustregel maximal ~15 Wörter im Schnitt. Ein Gedanke pro Satz. Ein Satz pro Zeile ist auf LinkedIn erlaubt und erwünscht.
- **Keine Gedankenstriche im Satzfluss** (CI v3.0): Punkt oder Komma setzen.
- **Keine Ausrufezeichen.** Die Aussage trägt sich selbst.

## 3. Post-Anatomie (Textpost)

```
[HOOK — 1–2 Zeilen, max. ~200 Zeichen]   ← sichtbar vor dem «… mehr»-Umbruch
[Leerzeile]
[KONTEXT — warum das Thema jetzt/hier relevant ist, 1–3 Zeilen]
[Leerzeile]
[KERN — der Erkenntnisgewinn: Liste, Prüffragen, Mechanik-Erklärung]
[Leerzeile]
[MERKSATZ — die Essenz in einem zitierfähigen Satz]
[Leerzeile]
[CTA — passend zu Zielgruppe und Ziel, siehe unten]
[Leerzeile]
[3–5 Hashtags]
```

### Hook-Regeln
Der Hook entscheidet über 80% der Performance. Er muss vor dem Klapp-Umbruch («… mehr», je nach Client nach ca. 200 Zeichen bzw. 2–3 Zeilen) eine Spannung aufbauen, die der Post auflöst.

Bewährte Hook-Mechaniken:
- **Widerspruch:** «Ihr Backup ist keine Versicherung. Ihr letzter Restore-Test ist eine.»
- **Zitat aus der Praxis:** «‹Wir sind zu klein, um ein Ziel zu sein.› Diesen Satz hören wir öfter als jeden anderen.»
- **Szenario:** «Samstag, 06:40 Uhr. Die Dateiserver sind verschlüsselt. Wer entscheidet jetzt was?»
- **Reframe:** «‹Wie hoch soll unser Security-Budget sein?› ist die falsche Frage.»

Verboten im Hook: Clickbait ohne Einlösung, Engagement-Bait («Kommentiere JA für …»), Angst-Superlative.

### Body-Regeln
- Kurze Absätze (1–2 Sätze), Leerzeilen als Gliederung.
- Listen mit einfachen Markern: `1.` `2.` `3.` oder `→` oder `–`. **Keine Emoji-Aufzählungszeichen** (Screenreader lesen jedes Emoji vor).
- **Keine Unicode-Pseudo-Formatierung** (𝗙𝗲𝘁𝘁 via Mathe-Alphabete): für Screenreader unlesbar, wirkt unseriös. LinkedIn kennt kein natives Fett — Struktur entsteht durch Zeilenführung.
- Emojis: maximal zurückhaltend und funktional (z.B. ✅/❌ im Do/Don't-Kontext). In Executive- und Governance-Posts: keine.
- Länge: 900–1'800 Zeichen als Korridor. Executive-Posts eher kurz, Technical-Posts dürfen länger sein, wenn jede Zeile trägt.

### CTA-Logik je Ziel
| Ziel | CTA-Typ | Beispiel |
|------|---------|----------|
| A/C | Selbstcheck / Weiterlesen | «Wie viele der fünf Punkte sind bei Ihnen umgesetzt?» |
| B/E | Dialog | «Welche Frage sollen wir als Nächstes beantworten?» |
| D | Gesprächsangebot / Asset | «Der Decision Guide fasst das auf 2 Seiten zusammen — Link im ersten Kommentar.» / «Sprechen wir darüber: www.cyspa.ch» |

Regel: Ein CTA pro Post. Harte CTAs (Gespräch/Angebot) maximal in jedem vierten Beitrag (Mix-Regel, [05-redaktionsplan.md](05-redaktionsplan.md)).

### Links & Hashtags
- **Externe Links nicht in den Post-Text** (dämpft organische Reichweite): Link in den ersten Kommentar, im Post ankündigen. Ausnahme: Event-Anmeldungen, wenn Conversion wichtiger ist als Reichweite.
- **Hashtags:** 3–5 am Postende. Muster: 1× Marke (#CYSPA) + 2–3× Thema (#Cybersecurity #MFA #NIS2 …) + 1× Kontext (#KMU #Schweiz). Keine Hashtags im Fliesstext.
- **Tagging:** Personen nur mit Einverständnis, Firmen nur bei echtem Bezug. Kein Tagging für Reichweite.

## 4. Format-Baukasten

| Format | Einsatz | Spezifikation |
|--------|---------|---------------|
| **Textpost (ohne Visual)** | Meinung, FAQ, Praxis-Perspektive | Nur wenn der Text allein stark genug ist; Hook trägt alles |
| **Single Graphic** | Quick Tip, Merksatz, Zitat | 1200×1200 px (Fakten-Karte, CI v3.0). Eine Kernaussage, kein Textteppich |
| **Carousel / Dokument-Post (PDF)** | Checklisten, Frameworks, Whitepaper-Auszüge | 1080×1350 px je Slide, 5–9 Slides. Slide 1 = Hook, letzte Slide = CTA + Wortmarke |
| **Kurzvideo** | Talking Head (CISO beantwortet), Screen-Walkthrough (P5) | 30–90 Sek., 4:5 oder 1:1, **immer mit eingebrannten oder SRT-Untertiteln**, Kernaussage in den ersten 3 Sek. |
| **Motion Graphic** | Mechanik-Erklärungen (z.B. «Harvest now, decrypt later»), Zahlen | 10–30 Sek., Loop-fähig, ohne Ton verständlich |
| **Umfrage (Poll)** | Puls-Check als Gesprächsöffner | Max. 1×/Monat, nur mit fachlicher Auswertung als Folgepost |

## 5. Visual Guidelines (CI v3.0 — Navy/Gold)

Massgeblicher Standard ist das **CYSPA CI v3.0** (Skill `cyspa-designer`, Juni 2026); Referenzbild: [assets/img/ci-v3-referenz.webp](assets/img/ci-v3-referenz.webp). CI v3.0 ersetzt alle älteren Farb- und Font-Angaben (Cyan, Montserrat/Inter) — auch dort, wo ältere Visual-Briefings sie noch nennen.

### Farben
| Token | Hex | Einsatz auf LinkedIn |
|-------|-----|----------------------|
| Gold | `#ffc000` | **Einzige Akzentfarbe:** Kante links, Ticks, Häkchen, Striche, Pfeile, `.ch` der Wortmarke, grosse Ziffern |
| Navy | `#103157` | Anker, Gradient-Mitte, Headlines auf hellen Flächen |
| Navy Deep | `#071828` | Tiefste Ebene, Gradient-Start |
| Primary Blue | `#425b76` | Section-Labels auf hellen Flächen |
| Ink / Body / Muted | `#1a1a1a` / `#5a5a5a` / `#8a8a8a` | Text auf hellen Flächen |
| Border / Gray | `#e6e6e6` / `#f8f8f8` | Linien und Sekundärflächen hell |

**Verboten:** Gold als Flächenhintergrund · Gold mit kleinem Text auf hellen Flächen · zweite Akzentfarbe · farbige Schatten · Emojis ausser Checklisten-Häkchen.

### Typografie
Eine Familie: **Raleway** (400–900). Headlines 800, Lead/Betonung 600–700, Fliesstext 400–500. Keine Montserrat-/Inter-/Mono-Schriften mehr in Social-Assets; technische Begriffe als Pill-Badge in Raleway 600.

### Wortmarke
`CYSPA` in Weiss (auf dunkel) bzw. Navy (auf hell) plus `.ch` in Gold, Raleway 800. Kein Logo-Bild, kein Tricolor-Unterstrich, kein Icon ohne Text.

### Layout-System (Fakten-Karten-Sprache)
- Hintergrund: Gradient `155deg, #071828 → #103157 55% → #1a4576` mit dezentem Grid-Overlay (~3.5%)
- **Gold-Kante** links über die volle Höhe (1 Einheit des 100er-Rasters)
- Section-Label oben links: Gold-Tick + Versalien mit Letterspacing (Serien-Label aus [02-content-pfeiler.md](02-content-pfeiler.md))
- Fusszeile: Wortmarke `CYSPA.ch` links, Quelle/Hinweis rechts in gedämpftem Weiss
- Kacheln: transparente Flächen mit feiner heller Border, grosse weisse Zahlen
- Light-Variante (z.B. P3): weisse Fläche, Navy-Headline, Gold-Akzente, Label in Primary Blue

### Formate & Mindestgrössen
- Einzelgrafik (Fakten-Karte): **1200×1200 px**
- Carousel/Dokument-Post: 1080×1350 px je Slide, PDF mit identischem Seitenformat
- Kein Text unter 24 px im 1200er-Raster (Ausnahme: Quellenzeile gemäss CI); Kontrast 4.5:1, Headlines mindestens 3:1

### Motion/Video
- Kernaussage zuerst, Endcard: Wortmarke `CYSPA.ch` auf Navy-Gradient
- Untertitel: Raleway, Weiss auf halbtransparentem dunklem Balken, max. 2 Zeilen
- Ohne Ton verständlich (Feed-Autoplay ist stumm)

## 6. Accessibility-Standards (Gate-Kriterien)

Der Accessibility Reviewer prüft jeden Beitrag gegen diese Liste:

1. **Alt-Text** für jedes Bild/jede Grafik im LinkedIn-Alt-Text-Feld: beschreibt Inhalt und Aussage (nicht «Infografik»), max. ~500 Zeichen. Bei Carousels: Kerninhalte der Slides erscheinen zusätzlich im Post-Text oder in den Dokument-Textebenen (PDF mit echtem Text statt verbildertem Text, wo möglich).
2. **Text im Bild ≙ Text im Post:** Zentrale Aussagen eines Visuals stehen auch im Post-Text — niemand darf auf das Bild angewiesen sein.
3. **Kontrast:** Textkontrast mindestens 4.5:1 (WCAG AA). Erfüllt durch Weiss auf Navy `#103157` / Navy Deep `#071828` sowie Ink/Navy auf Weiss. Gold `#ffc000` nur für Akzente, grosse Ziffern und Headline-Grössen (CI-Regel ≥ 3:1) — nie für kleinen Fliesstext auf hellen Flächen.
4. **Keine Unicode-Pseudo-Formatierung**, keine Emoji-Aufzählungen, Emojis nie als Bedeutungsträger.
5. **Videos:** Untertitel immer (eingebrannt oder SRT); keine Blitz-/Stroboskop-Effekte; Information nie nur über Farbe oder nur über Ton.
6. **Sprache:** Abkürzungen ausgeschrieben (Segment-Regel in Abschnitt 2), klare Satzstruktur, aussagekräftige Link-Ankündigungen («Leitfaden im ersten Kommentar» statt «hier klicken»).
7. **Hashtags in CamelCase** für Screenreader-Lesbarkeit: #CyberSecurity, #SwissCISO — nicht #cybersecurity.

---

**Kurz-Checkliste vor jedem Draft-Abschluss:**
- [ ] Hook funktioniert vor dem Umbruch (≤ ~200 Zeichen) und wird eingelöst
- [ ] Erkenntnisgewinn in einem Satz benennbar
- [ ] Zielgruppen-Sprache eingehalten (Jargon-Check je Segment)
- [ ] Ein CTA, passend zum Ziel
- [ ] de-CH-Schreibung, Guillemets, keine Gedankenstriche im Satzfluss, keine Ausrufezeichen, keine Unicode-Formatierung
- [ ] 3–5 Hashtags in CamelCase, Link nur im Kommentar
- [ ] Visual nach CI, Alt-Text vorhanden
