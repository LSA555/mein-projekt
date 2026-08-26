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
| **Single Graphic** | Quick Tip, Merksatz, Zitat | 1200×1500 px (4:5). Eine Kernaussage, kein Textteppich |
| **Carousel / Dokument-Post (PDF)** | Checklisten, Frameworks, Whitepaper-Auszüge | 1080×1350 px je Slide, 5–9 Slides. Slide 1 = Hook, letzte Slide = CTA + Logo |
| **Kurzvideo** | Talking Head (CISO beantwortet), Screen-Walkthrough (P5) | 30–90 Sek., 4:5 oder 1:1, **immer mit eingebrannten oder SRT-Untertiteln**, Kernaussage in den ersten 3 Sek. |
| **Motion Graphic** | Mechanik-Erklärungen (z.B. «Harvest now, decrypt later»), Zahlen | 10–30 Sek., Loop-fähig, ohne Ton verständlich |
| **Umfrage (Poll)** | Puls-Check als Gesprächsöffner | Max. 1×/Monat, nur mit fachlicher Auswertung als Folgepost |

## 5. Visual Guidelines (CI-Anbindung)

Basis ist die CYSPA-CI (vgl. interne Skills `cyspa-docx` / `cyspa-pptx`). Für LinkedIn gilt:

### Farben
| Token | Hex | Einsatz auf LinkedIn |
|-------|-----|----------------------|
| Deep Space Blue | `#0A1F44` | Primärer Visual-Hintergrund (Dark-Brand-Look), Serien-Header |
| Counter Navy | `#103157` | Sekundärflächen, Tabellen/Boxen auf dunklem Grund |
| Cyber Cyan | `#00AEEF` | **Nur Akzent:** Linien, Rahmen, Highlight-Elemente, Serien-Badge-Rahmen |
| Signal White | `#FFFFFF` | Text auf allen dunklen Flächen |
| Security Grey | `#F2F2F2` | Heller Hintergrund (Light-Variante), Boxen auf Weiss |
| Charcoal Grey | `#58595B` | Sekundärtext auf hellem Grund, Meta-Zeilen |

**Verbindliche CI-Regeln:**
- **Cyber Cyan nie als Textfarbe auf dunklem Hintergrund** — nur als Akzentlinie/Rahmen. Text auf Dunkel ist immer Weiss.
- Auf hellem Grund: Cyan nicht für kleinen Text (Kontrast unzureichend, siehe Accessibility) — Textfarben hell: `#0A1F44` oder `#000000`.
- Das Wort **CYSPA** immer in Montserrat Bold.

### Typografie
| Rolle | Font | Einsatz |
|-------|------|---------|
| Display / Headlines / «CYSPA» | **Montserrat Bold** | Slide-Titel, Hook-Zeile auf Visuals, Serien-Label |
| Body | **Inter** | Fliesstext, Listen, Captions |
| Technisch | **JetBrains Mono** | Befehle, Einstellungsnamen, Code-Fragmente (P5, Technical) |

Mindestgrössen bei 1080 px Breite: Headlines ≥ 64 px, Body ≥ 36 px, Meta/Fussnoten ≥ 28 px. Textmenge pro Slide: maximal ~40 Wörter.

### Layout-System (Wiedererkennung)
- **Serien-Badge** oben links: Serien-Label (z.B. `QUICK TIP`) in Montserrat Bold, Weiss, mit Cyan-Rahmenlinie.
- **Cyan-Akzentlinie** als konstantes Gestaltungselement (horizontal unter dem Titel oder vertikal am Slide-Rand).
- **Logo** (transparente Wortmarke) unten rechts auf jeder Single Graphic und der letzten Carousel-Slide; auf Zwischenslides optional klein.
- **URL-Zeile** www.cyspa.ch nur auf der CTA-Slide, Inter, Meta-Grösse.
- Fotografie (P11): natürlich, keine Stock-Klischees (Kapuzenpullover, Matrix-Regen, Vorhängeschloss-Collagen sind verboten).

### Motion/Video
- Intro ohne Logo-Animation — die Kernaussage kommt zuerst, Logo am Ende (3 Sek. Endcard: Logo + URL auf Deep Space Blue).
- Untertitel: Inter, Weiss auf halbtransparentem dunklem Balken, max. 2 Zeilen.
- Ohne Ton verständlich (Feed-Autoplay ist stumm).

## 6. Accessibility-Standards (Gate-Kriterien)

Der Accessibility Reviewer prüft jeden Beitrag gegen diese Liste:

1. **Alt-Text** für jedes Bild/jede Grafik im LinkedIn-Alt-Text-Feld: beschreibt Inhalt und Aussage (nicht «Infografik»), max. ~500 Zeichen. Bei Carousels: Kerninhalte der Slides erscheinen zusätzlich im Post-Text oder in den Dokument-Textebenen (PDF mit echtem Text statt verbildertem Text, wo möglich).
2. **Text im Bild ≙ Text im Post:** Zentrale Aussagen eines Visuals stehen auch im Post-Text — niemand darf auf das Bild angewiesen sein.
3. **Kontrast:** Textkontrast mindestens 4.5:1 (WCAG AA). Erfüllt durch Weiss auf `#0A1F44` / `#103157` und `#0A1F44` auf Weiss/`#F2F2F2`. Cyan `#00AEEF` erfüllt AA auf keinem unserer Hintergründe für normalen Text → deshalb nur Akzent (siehe CI-Regeln).
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
- [ ] de-CH-Schreibung, Guillemets, keine Unicode-Formatierung
- [ ] 3–5 Hashtags in CamelCase, Link nur im Kommentar
- [ ] Visual nach CI, Alt-Text vorhanden
