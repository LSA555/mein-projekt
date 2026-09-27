---
tags: [cyspa, marketing, webseite, texte, seo]
status: Entwurf – Freigabe LWE ausstehend
date: 2026-09-27
source: claude
chat_url: "https://claude.ai/code/session_01JsQoSQbozeyt2EYitpEXuf"
grundlage: "linkedin/01-strategie.md, 02-content-pfeiler.md, 03-styleguide.md, 04-prozess-qualitaet.md, posts/2026-10-01-p08, posts/2026-10-08-p12, posts/2026-10-15-p11 (Branch claude/cyspa-linkedin-strategy-vte419)"
---

# Webseite cyspa.ch – Seitentexte (Entwurf)

**Zweck:** Texte zum Einpflegen ins CMS durch die Webseiten-Verantwortlichen. Die bestehende Webseite war aus dieser Umgebung nicht erreichbar. Die Texte sind deshalb **nicht** mit dem heutigen Stand von cyspa.ch abgeglichen.

**Lesehilfe**

- `[PLATZHALTER: …]` = Angabe fehlt in den Repo-Dokumenten. Vor Publikation ersetzen oder den Satz streichen (Gate 2, Platzhalterkontrolle).
- `> Redaktion:` = interner Hinweis. **Nicht** auf die Webseite übernehmen.
- Jede Leistung stammt aus einem Content-Pfeiler oder Beitrag im Repo. Die Quelle steht jeweils im Redaktionshinweis.
- Keine Superlative, keine Kundennamen, keine Zahlen ohne Beleg (Legal-Gate, `04-prozess-qualitaet.md` §2).
- Kontaktangaben nur aus dem Repo: www.cyspa.ch · info@cyspa.ch · +41 41 521 61 61 · Rotkreuz · LinkedIn-Unternehmensseite.

**Seitenstruktur (Vorschlag)**

| Seite | Arbeits-URL | Inhalt |
|---|---|---|
| Startseite | `/` | Hero, Nutzen, Leistungen-Teaser, Vertrauen, CTA |
| Leistungen | `/leistungen` | Übersicht und sieben Leistungsblöcke (je als Anker oder Unterseite) |
| Über uns | `/ueber-uns` | Positionierung, Arbeitsprinzipien, Team (Platzhalter) |
| Tabletop-Übung | `/tabletop` | Landingpage, siehe `landingpage-tabletop.md` |
| Kontakt | `/kontakt` | [PLATZHALTER: bestehende Kontaktseite weiterverwenden?] |

---

## 1. Startseite

### SEO

| Feld | Text | Länge |
|---|---|---|
| Title | CYSPA – Cybersecurity-Partner für Schweizer KMU | 47 |
| Meta-Description | CISO-as-a-Service, Tabletop-Übungen und Security-Assessments für Schweizer KMU und Mid-Market. Wir übersetzen Cyberrisiken in Entscheide. | 139 |
| H1 | Cyberrisiken in Geschäftsentscheide übersetzen | – |

### Hero

**Kicker:** CYSPA – Cyber Security Partners · Rotkreuz

**H1:** Cyberrisiken in Geschäftsentscheide übersetzen

**Subline:**
Wir übersetzen Cyberrisiken in Geschäftsentscheide – und Geschäftsentscheide in umsetzbare Sicherheit. Im Massstab von Schweizer KMU und Mid-Market-Unternehmen.

**Buttons:**
- Primär: «Erstgespräch vereinbaren» → `/kontakt`
- Sekundär: «Leistungen ansehen» → `/leistungen`

> Redaktion: Positionierungskern wörtlich aus `01-strategie.md` §1.

### Nutzen

**Zwischentitel (H2):** Was Sie von uns erwarten können

1. **Klarheit für die Geschäftsleitung**
   Risiken in Geschäftssprache statt Techniklisten. Sie erhalten Entscheidungsvorlagen, keine Alarmstatistik.

2. **Die richtige Reihenfolge**
   Nicht die perfekte Endausbaustufe, sondern der nächste sinnvolle Schritt. Wir fragen: Welches Risiko reduziert der nächste Franken am stärksten?

3. **Schweizer Kontext**
   Obligationenrecht, revidiertes Datenschutzgesetz (revDSG), Informationssicherheitsgesetz (ISG) mit Meldepflicht ans BACS, FINMA-Vorgaben: Wir ordnen Anforderungen im Schweizer Rahmen ein.

4. **Befähigen statt abhängig machen**
   Ihr Team soll nach dem Mandat mehr können und mehr verstehen als vorher.

> Redaktion: Punkte 1, 2 und 4 aus den Arbeitsprinzipien (`posts/2026-10-15-p11`) und `posts/2026-10-01-p08`; Punkt 3 aus `01-strategie.md` §1 und `README` Leitplanken. Bei Punkt 3 keine Rechtsberatung andeuten.

### Leistungen-Teaser

**Zwischentitel (H2):** Leistungen

| Karte | Kurztext | Link |
|---|---|---|
| **CISO-as-a-Service** | Security-Führung, ohne eine eigene CISO-Stelle zu schaffen: Standortbestimmung, Roadmap, Management-Reporting. | `/leistungen#ciso-as-a-service` |
| **Tabletop-Übung** | Ein halber Tag mit Ihrer Führungsrunde: realistisches Szenario, moderierte Entscheidungen, dokumentierte Erkenntnisliste. | `/tabletop` |
| **Security-Baseline für KMU** | Die ersten Massnahmen in der richtigen Reihenfolge – mit ehrlicher Aufwandsangabe. | `/leistungen#baseline` |
| **Microsoft-365-Security-Assessment** | Ihre Microsoft-Umgebung auf Konfigurationsebene geprüft: Identitäten, Zugriffe, Datenfreigaben. | `/leistungen#m365` |
| **Pentest und Attack Simulation** | Angriffspfade sichtbar machen, bevor es jemand anderes tut – mit sauberem Scope und priorisierter Behebung. | `/leistungen#pentest` |
| **Regulatorik und Compliance** | Betrifft uns das? NIS2, ISG, revDSG, ISO 27001, DORA – eingeordnet für Ihr Unternehmen. | `/leistungen#regulatorik` |
| **AI Security und Governance** | KI kontrolliert nutzen statt verbieten: Richtlinie, Datenklassen, Berechtigungen. | `/leistungen#ai-security` |

### Vertrauenselemente

**Zwischentitel (H2):** Woran Sie uns messen können

**Vier Arbeitsprinzipien**
1. **Prioritäten statt Papier.** Jedes Ergebnis beantwortet: Was tun wir zuerst – und warum?
2. **Sicherheit im Massstab des Unternehmens.** Die Massnahmen mit der grössten Wirkung fürs Geld, und die Ehrlichkeit, den Rest wegzulassen.
3. **Befähigen statt abhängig machen.** Ihr Team kann nach dem Mandat mehr als vorher.
4. **Klartext im Management-Report.** Risiken in Geschäftssprache, Entscheidungsvorlagen statt Techniklisten.

**Belege (nur mit Nachweis einsetzen)**
- [PLATZHALTER: Zertifizierungen der Mitarbeitenden bzw. des Unternehmens – nur mit Nachweis, z. B. Zertifikatsnummer]
- [PLATZHALTER: Mitgliedschaften und Partnerschaften – nur bestehende, mit Logo-Nutzungsrecht]
- [PLATZHALTER: Kundenstimme oder Referenz – nur mit schriftlicher Freigabe des Kunden, sonst Block weglassen]
- [PLATZHALTER: Gründungsjahr / seit wann tätig – nur wenn belegt]

**LinkedIn-Hinweis:**
Was wir in der Praxis sehen, teilen wir regelmässig auf LinkedIn: von Microsoft-Security-Handwerk über Regulatorik im Klartext bis zu Übungen mit Führungsteams. → «CYSPA auf LinkedIn folgen» (https://www.linkedin.com/company/56471500/)

> Redaktion: Prinzipien aus `posts/2026-10-15-p11` (dort noch Draft, Gate offen). Auf der Webseite erst nach Freigabe des Posts oder gleichzeitig mit ihm veröffentlichen, damit beide gleich lauten. Keine Kundenzahlen, Projektzahlen oder «seit X Jahren» ohne Beleg.

### Abschluss-CTA

**H2:** Wo stehen Sie – und was ist der nächste sinnvolle Schritt?

**Text:**
Ein erstes Gespräch klärt, wo Sie stehen und ob wir der richtige Partner sind. Sachlich, ohne Verkaufsdruck.

**Button:** «Erstgespräch vereinbaren» → `/kontakt`

**Kontaktzeile:** info@cyspa.ch · +41 41 521 61 61

**Hinweis für Vertrauliches:**
Bei einem akuten Vorfall bitte telefonisch melden und keine Details per Formular oder LinkedIn senden. [PLATZHALTER: Gibt es eine Notfallnummer bzw. Erreichbarkeit ausserhalb der Bürozeiten? Wenn nein, Satz auf «telefonisch melden» belassen.]

> Redaktion: Hinweis nach `04-prozess-qualitaet.md` §4.3. Keine Reaktionszeit versprechen, solange keine definiert ist.

---

## 2. Leistungen

### SEO

| Feld | Text | Länge |
|---|---|---|
| Title | Leistungen – CISO-as-a-Service, Tabletop, Assessments \| CYSPA | 60 |
| Meta-Description | CISO-as-a-Service, Tabletop-Übungen, Microsoft-365-Assessment, Pentest, Regulatorik und AI Security für Schweizer KMU und Mid-Market. | 134 |
| H1 | Leistungen für Geschäftsleitung, IT und Security | – |

**Intro:**
Wir beginnen dort, wo der nächste Franken das grösste Risiko reduziert. Jede Leistung endet mit einem Ergebnis, das Sie umsetzen oder entscheiden können: eine priorisierte Liste, eine Roadmap, eine Entscheidungsvorlage.

**Preise und Pensum:** [PLATZHALTER: Preismodell bzw. Hinweis «Angebot nach Erstgespräch» – von LWE festzulegen]

---

### 2.1 CISO-as-a-Service {#ciso-as-a-service}

**Problem**
Die IT-Leitung ist da, die Sicherheitsorganisation im Aufbau. Kunden, Versicherer und Verwaltungsrat stellen Fragen, die eine verantwortliche Security-Rolle beantworten sollte. Eine eigene CISO-Stelle ist für viele Unternehmen zu gross oder schwer zu besetzen. Und die Budgetfrage wird oft falsch gestellt: «Wie viel?» statt «Welches Risiko reduziert der nächste Franken am stärksten?»

**Vorgehen**
1. **Standortbestimmung:** Was schützen wir? Welche Systeme, Prozesse und Daten tragen das Geschäft?
2. **Priorisierung:** Grundhygiene vor Spezialwerkzeug. Die Reihenfolge: wissen, was man schützt → Grundhygiene (Identitäten, Aktualisierungen, getestete Backups, Berechtigungen) → Erkennen und Reagieren → Spezialisierung.
3. **Roadmap auf einer Seite:** Horizont 3, 6 und 12 Monate, mit Verantwortlichen.
4. **Management-Reporting und Begleitung:** Entscheidungsvorlagen für Geschäftsleitung und Verwaltungsrat, laufende Ansprechperson für Security-Fragen. Pensum: [PLATZHALTER: z. B. Tage pro Monat, Vertragsdauer].

**Ergebnis**
- Eine priorisierte Security-Roadmap, die Ihre Geschäftsleitung versteht
- Management-Reporting mit Entscheidungsvorlagen statt Alarmlisten
- Eine verantwortliche Security-Rolle, geteilt statt voll finanziert

**Für wen**
Geschäftsleitungen und IT-Leitungen von KMU und Mid-Market-Unternehmen ohne eigene CISO-Stelle. Wann sich ein externer CISO nicht lohnt, sagen wir im Erstgespräch offen.

> Redaktion: Quelle `02-content-pfeiler.md` P8, `01-strategie.md` §3.2 (Make-or-Buy), `posts/2026-10-01-p08`. Primärer Schwerpunkt im Oktober (Post 01.10.).

---

### 2.2 Tabletop-Übung für die Führungsrunde {#tabletop}

**Problem**
Samstag, 06:40 Uhr. Die Dateiserver sind verschlüsselt, die Produktion steht. Wer entscheidet jetzt was? Lautet die ehrliche Antwort «kommt darauf an, wer erreichbar ist», fehlt keine Technik, sondern eine Übung. Ein Incident-Response-Plan ist eine Hypothese, bis er geübt wurde.

**Vorgehen**
Eine moderierte Entscheidungsübung, keine Technik-Simulation: ein realistisches, fiktives Szenario, die richtigen Personen am Tisch, rund 90 Minuten Übung im Rahmen eines halben Tages. Wir moderieren, Sie entscheiden.

**Ergebnis**
Eine dokumentierte Erkenntnisliste mit klaren Verantwortlichkeiten. Typischerweise sichtbar werden: unklare Befugnisse, Kommunikation ohne die üblichen Kanäle, Meldefristen unter Zeitdruck und offene Fragen zu Dienstleistern.

**Für wen**
Geschäftsleitungen, Verwaltungsräte und Security-Verantwortliche von KMU und Mid-Market-Unternehmen.

**Link:** «Mehr zur Tabletop-Übung» → `/tabletop`

> Redaktion: Quelle `posts/2026-10-08-p12` und `02-content-pfeiler.md` P12.

---

### 2.3 Security-Baseline für KMU {#baseline}

**Problem**
Keine eigene Security-Abteilung, die IT ist klein oder extern, das Budget begrenzt. Die Frage ist nicht, ob etwas getan werden muss, sondern womit man anfängt.

**Vorgehen**
Baseline-Check entlang der Grundlagen: Identitäten und Multi-Faktor-Authentifizierung, Rechte-Hygiene, Aktualisierungen, Backup und Wiederherstellung, Notfallorganisation, Rolle des IT-Dienstleisters im Ernstfall.

**Ergebnis**
Eine Massnahmenliste in der richtigen Reihenfolge, mit ehrlicher Aufwandsangabe und klaren Prüffragen für die Geschäftsleitung.

**Für wen**
Geschäftsleitungen und IT-Verantwortliche von Schweizer KMU.

> Redaktion: Quelle `02-content-pfeiler.md` P4 (CTA «Baseline-Check, Incident-Readiness-Gespräch»). LWE bestätigen, dass dies als eigenständige Leistung angeboten wird.

---

### 2.4 Microsoft-365-Security-Assessment {#m365}

**Problem**
Viele Unternehmen arbeiten vollständig in Microsoft 365. Die Plattform bringt starke Schutzfunktionen mit, doch Konfiguration und Berechtigungen liegen in der Verantwortung des Unternehmens. Häufig offen: Ausnahmen bei der Multi-Faktor-Authentifizierung, veraltete Anmeldeverfahren, gewachsene Datenfreigaben.

**Vorgehen**
Prüfung auf Konfigurationsebene, unter Berücksichtigung Ihrer Lizenzen: Conditional Access, Blockierung veralteter Anmeldeverfahren (Legacy Authentication), Microsoft Defender, Entra ID, Freigaben in SharePoint, OneDrive und Teams.

**Ergebnis**
Priorisierte Empfehlungen mit Aufwand, getrennt nach «mit bestehenden Lizenzen umsetzbar» und «erfordert Zusatzlizenz».

**Für wen**
IT-Leitungen, Microsoft-Administratorinnen und -Administratoren, Security-Verantwortliche.

> Redaktion: Quelle `02-content-pfeiler.md` P5 (CTA «M365-Security-Assessment»). Produktnamen vor Publikation auf aktuellen Stand prüfen (Fachreview P5).

---

### 2.5 Pentest und Attack Simulation {#pentest}

**Problem**
Viele kritische Befunde brauchen keinen Exploit, sondern nur ein Login. Gleichzeitig verbrennt ein unklarer Scope («einfach mal alles testen») Budget, und ein Testbericht ohne Behebung verändert nichts.

**Vorgehen**
Gemeinsame Klärung, was sinnvoll ist: Vulnerability Scan, Penetrationstest oder Angriffssimulation. Sauberer Scope, Durchführung nach Vereinbarung, Übersetzung der Angriffspfade für die Geschäftsleitung. Nachtest: [PLATZHALTER: im Angebot enthalten oder optional?]

**Ergebnis**
Befunde nach Risiko priorisiert, verständlich für IT und Management, mit Empfehlungen zur Behebung.

**Für wen**
Security- und IT-Verantwortliche, die Wirksamkeit nachweisen oder Prioritäten setzen müssen.

> Redaktion: Quelle `02-content-pfeiler.md` P9. P9-Redline: keine Angriffsdetails auf der Webseite.

---

### 2.6 Regulatorik und Compliance {#regulatorik}

**Problem**
NIS2 ist EU-Recht und betrifft Schweizer Unternehmen trotzdem, etwa über EU-Tochtergesellschaften, Lieferketten oder Marktzugang. Dazu kommen die Meldepflicht nach ISG für Betreiberinnen kritischer Infrastrukturen, das revDSG, im Finanzsektor FINMA und DORA-Ausstrahlung sowie Sicherheitsfragebogen von Grosskunden.

**Vorgehen**
Betroffenheits-Check («Betrifft uns das – und über welchen Weg?»), danach Gap-Assessment gegen die relevanten Anforderungen (z. B. ISO 27001) und Unterstützung beim Beantworten von Kundenfragebogen.

**Ergebnis**
Klarheit über die Betroffenheit, eine Lückenliste mit Prioritäten und nachvollziehbare Nachweise.

**Für wen**
Geschäftsleitungen, Compliance- und Risikoverantwortliche, Datenschutzverantwortliche.

**Pflichthinweis auf der Seite:** Allgemeine Einordnung, keine Rechtsberatung.

> Redaktion: Quelle `02-content-pfeiler.md` P6. Fristen und Rechtsstand vor Publikation durch Regulatory Expert verifizieren (Gate 1).

---

### 2.7 AI Security und Governance {#ai-security}

**Problem**
Mitarbeitende nutzen KI-Werkzeuge, ob erlaubt oder nicht. Ein Verbot macht die Nutzung nur unsichtbar. KI-Assistenten mit Datenzugriff bringen zudem ein neues Risikoprofil: Was schlecht berechtigt ist, wird plötzlich durchsuchbar.

**Vorgehen**
AI-Governance-Quickcheck: Welche Werkzeuge werden genutzt, welche Daten fliessen wohin? Danach Richtlinien-Workshop: Datenklassen für KI-Werkzeuge, Mindestinhalte einer KI-Richtlinie, Zuständigkeiten, Berechtigungs-Hygiene vor der Einführung von KI-Assistenten.

**Ergebnis**
Eine KI-Richtlinie mit klaren Regeln, wer über KI-Einsatz entscheidet und wie das dokumentiert wird.

**Für wen**
Geschäftsleitungen, Governance- und Datenschutzverantwortliche, IT-Leitungen vor einer KI-Einführung.

> Redaktion: Quelle `02-content-pfeiler.md` P7.

---

### Abschluss-CTA Leistungen

**H2:** Nicht sicher, wo Sie anfangen sollen?
**Text:** Genau dafür ist das Erstgespräch da. Wir klären, welche Leistung jetzt sinnvoll ist – und welche noch warten kann.
**Button:** «Erstgespräch vereinbaren» → `/kontakt`

> Redaktion: Bewusst nicht aufgenommen, weil im Repo nur als Gesprächsthema, nicht als Leistung belegt: Krypto-Inventar / Post-Quantum (P10), Whitepaper und Decision Guide (P12, noch nicht erstellt). Aufnahme nur nach Entscheid LWE.

---

## 3. Über uns

### SEO

| Feld | Text | Länge |
|---|---|---|
| Title | Über uns – CYSPA Cyber Security Partners, Rotkreuz | 50 |
| Meta-Description | CYSPA GmbH aus Rotkreuz: pragmatische Cybersecurity für Schweizer KMU und Mid-Market. Unsere Arbeitsprinzipien und wie wir arbeiten. | 132 |
| H1 | Cyber Security Partners – mit Betonung auf Partner | – |

### Einstieg

CYSPA steht für Cyber Security Partners. Das Wort «Partner» steht dort nicht, weil es gut klingt, sondern weil wir eine klare Vorstellung davon haben, wie Security-Arbeit für Schweizer Unternehmen funktionieren muss: konkret, ehrlich im Aufwand und verständlich für die Geschäftsleitung.

Wir arbeiten für Schweizer KMU und Mid-Market-Unternehmen, für Geschäftsleitungen und Verwaltungsräte ebenso wie für IT- und Security-Teams. Unser Sitz ist in Rotkreuz. [PLATZHALTER: Gründungsjahr und Kurzgeschichte – nur wenn belegt]

### Wofür wir stehen

- **Kompetenz ohne Show:** Microsoft Security, Offensive Security, Regulatorik und AI Security, erklärt auf Augenhöhe.
- **Pragmatismus:** Der nächste sinnvolle Schritt statt der perfekten Endausbaustufe. KMU-Realität statt Konzern-Blaupause.
- **Vertrauenswürdigkeit:** Schweizer Bezug in Recht, Aufsicht und Kultur. Sachlicher Ton, keine Angstmache, keine leeren Versprechen.

### Vier Arbeitsprinzipien

1. **Prioritäten statt Papier.** Ein Assessment, das nicht in einer umsetzbaren Roadmap endet, ist Dekoration. Jedes unserer Ergebnisse beantwortet die Frage: Was tun wir zuerst – und warum?
2. **Sicherheit im Massstab des Unternehmens.** Ein Betrieb mit 50 Mitarbeitenden braucht keine Konzern-Governance. Er braucht die Massnahmen mit der grössten Wirkung fürs Geld und die Ehrlichkeit, den Rest wegzulassen.
3. **Befähigen statt abhängig machen.** Unser Erfolg zeigt sich daran, dass Ihr Team nach dem Mandat mehr kann und mehr versteht als vorher.
4. **Klartext im Management-Report.** Risiken in Geschäftssprache, Entscheidungsvorlagen statt Techniklisten. Wenn der Verwaltungsrat nach 15 Minuten die Lage versteht, haben wir unseren Job gemacht.

> Redaktion: Die «50 Mitarbeitenden» sind ein Beispiel für eine Betriebsgrösse, keine Firmenkennzahl. Quelle `posts/2026-10-15-p11`.

### Team

[PLATZHALTER: Team-Vorstellung – Namen, Rollen, Fachgebiete. Fotos nur echte Aufnahmen und nur mit dokumentierter Einwilligung der abgebildeten Personen (revDSG, Recht am eigenen Bild). Keine KI-generierten Personenbilder.]

[PLATZHALTER: Teamgrösse – nur wenn gewünscht und belegt]

[PLATZHALTER: Zertifizierungen und Qualifikationen – nur mit Nachweis]

### Unternehmensangaben

- CYSPA GmbH, Rotkreuz
- [PLATZHALTER: Strasse, Hausnummer, PLZ]
- [PLATZHALTER: UID / Handelsregistereintrag – gehört ins Impressum]
- info@cyspa.ch · +41 41 521 61 61 · www.cyspa.ch
- LinkedIn: https://www.linkedin.com/company/56471500/

### CTA

**H2:** Lernen wir uns kennen
**Text:** Im Erstgespräch hören wir zu, stellen Fragen und sagen offen, ob und wie wir helfen können.
**Button:** «Erstgespräch vereinbaren» → `/kontakt`

---

## 4. Prüfliste vor dem Einpflegen

- [ ] Alle `[PLATZHALTER: …]` ersetzt oder Satz gestrichen
- [ ] Alle `> Redaktion:`-Zeilen entfernt
- [ ] Leistungsportfolio von LWE bestätigt (insbesondere 2.3, 2.5 Nachtest, 2.7)
- [ ] Fachreview: Microsoft-Produktnamen (2.4), Regulatorik-Aussagen (2.6)
- [ ] Legal: keine Superlative, keine Kundennamen, Hinweis «keine Rechtsberatung» auf 2.6
- [ ] Datenschutzerklärung und Impressum aktuell und verlinkt
- [ ] Accessibility: Alt-Texte für Bilder, Kontrast mindestens 4.5:1, Cyber Cyan nur als Akzent, nie als Textfarbe
- [ ] Titles und Meta-Descriptions im CMS-SEO-Feld eingetragen (Längen oben geprüft)
- [ ] Vor Änderungen an der Webseite: Sicherheits-Check gemäss Entscheid E2 (siehe `sicherheits-check/README.md`)
