---
tags: [linkedin, freigabe, batch-1, p6, nis2, isg]
status: freigabepaket-gates-offen
date: 2026-09-27
source: claude
post_nr: "07"
slot: "2026-09-29 08:15"
---

# #07 – NIS2 trifft Schweizer Unternehmen, über Verträge

Freigabepaket für LWE. Grundlage: Repo-Draft `linkedin/posts/2026-09-29-p06-nis2-schweizer-unternehmen.md` (Branch `claude/cyspa-linkedin-strategy-vte419`). Erstellt mit KI-Unterstützung. Die Faktenverantwortung liegt nach §4.5 beim menschlichen Fach-Owner.

## 1. Steckbrief

| Feld | Wert |
|------|------|
| Slot | Dienstag, 29.09.2026, 08:15 Uhr (LWE noch im Büro) |
| Pfeiler / Serie | P6 – REGULATORIK IM KLARTEXT |
| Zielgruppe | primär Governance, sekundär Executive; Mid-Market, Exporteure |
| Ziel | C (informieren), D (Gespräche) |
| Format | Textpost + Single Graphic 1200×1500 px |
| CTA-Typ | Selbstcheck (3 Prüffragen), weich |
| Asset im Repo | `linkedin/assets/export/2026-09-29-p06-nis2/2026-09-29-p06-nis2.png` (**nicht verwenden, Renderfehler, siehe Gate 3**) |
| Asset zur Publikation | `cyspa-marketing/linkedin/freigabe/assets/07-nis2/2026-09-29-p06-nis2.png` (neu gerendert, Inhalt identisch) |
| Fach-Owner | NIS2 / Regulatory Expert |
| Freigabeweg (Matrix §3) | Fachreview (Regulatory) · Legal verstärkt · Accessibility · Redline entfällt · Head of Content |

## 2. Finaler Post-Text (copy-paste-fertig)

```text
NIS2 ist EU-Recht. Die Schweiz kennt kein NIS2. Und trotzdem landet es gerade auf den Tischen von Schweizer Geschäftsleitungen: in Form von Kundenverträgen und Fragebögen.

Drei Wege, über die NIS2 Schweizer Unternehmen erreicht:

1. Tochtergesellschaften und Niederlassungen in der EU: Wer dort als wesentliche oder wichtige Einrichtung gilt, ist direkt betroffen, inklusive Pflichten für die Führungsebene.

2. Die Lieferkette: NIS2 verpflichtet betroffene Unternehmen, die Sicherheit ihrer Lieferanten und Dienstleister zu managen. Diese Pflicht wird weitergereicht: als Vertragsklausel, Sicherheitsfragebogen oder Audit-Recht. Wer Schweizer Zulieferer eines EU-regulierten Kunden ist, spürt NIS2 zuerst im Vertragsanhang.

3. Der Marktzugang: Wer kritische Dienste für EU-Kunden erbringt, wird faktisch an deren Anforderungen gemessen, unabhängig vom eigenen Firmensitz. Für bestimmte digitale Dienste, etwa Cloud, Rechenzentren oder ausgelagerten IT-Betrieb, kann NIS2 sogar direkt gelten, wenn sie in der EU angeboten werden und das Unternehmen die Grössenschwellen erreicht. Dann ist eine Vertretung in der EU zu benennen.

Und parallel dazu die Schweiz selbst: Betreiber kritischer Infrastrukturen melden Cyberangriffe seit dem 1. April 2025 innert 24 Stunden dem Bundesamt für Cybersicherheit (BACS). So verlangt es das Informationssicherheitsgesetz.

Drei Prüffragen für Ihre nächste Sitzung:

→ Haben wir Kunden in der EU, die in regulierte Sektoren fallen (Energie, Transport, Gesundheit, digitale Dienste, verarbeitendes Gewerbe u.a.)?
→ Sind in den letzten Monaten Sicherheitsfragebögen oder neue Vertragsklauseln zur Informationssicherheit eingetroffen?
→ Können wir unsere Sicherheitsmassnahmen nachweisbar belegen, zum Beispiel entlang einer anerkannten Struktur wie ISO 27001?

Die Erfahrung zeigt: Regulatorik erreicht Schweizer Unternehmen selten als Gesetz, meist als Vertragsklausel. Gut vorbereitet ist, wer Nachweise liefern kann, bevor der Fragebogen kommt.

(Allgemeine Einordnung, keine Rechtsberatung.)

#NIS2 #Compliance #ISO27001 #Lieferkette #CYSPA
```

Länge: 2'079 Zeichen inkl. Zeilenumbrüche (nach der Copy-Anpassung CI v3 am 27.09.2026 nachgezählt; zuvor als «rund 2'030» angegeben). Das liegt über dem Styleguide-Korridor von 900–1'800 Zeichen. Der Repo-Draft lag bei rund 1'810. Für einen Governance-Post ist das vertretbar. Wenn gekürzt werden soll, zuerst den Satz «Wer Schweizer Zulieferer … Vertragsanhang.» streichen.

**Optionaler Aktualitätsvorschlag, nicht eingebaut. Entscheid Fach-Owner/LWE.** Einfügen nach Punkt 3, vor «Und parallel dazu die Schweiz selbst»:

> In den Nachbarländern ist das bereits Realität: In Deutschland gilt das NIS2-Umsetzungsgesetz seit Dezember 2025, in Österreich tritt das NISG 2026 am 1. Oktober 2026 in Kraft.

Beide Angaben sind nur REPORTED (siehe Faktencheck F6, F7). Vor dem Einbau müsste der Fach-Owner sie in der Primärquelle prüfen.

### Änderungen gegenüber Repo-Draft

| Stelle | Draft | Final | Begründung |
|--------|-------|-------|------------|
| Punkt 3 «Marktzugang» | Nur «faktisch an deren Anforderungen gemessen» | Ergänzt um einen Satz: Direktanwendung für bestimmte digitale Dienste und Pflicht zur EU-Vertretung | Gate-1-Befund: Übervereinfachung. Nach Art. 26 NIS2 fallen bestimmte Anbieter ohne EU-Niederlassung direkt unter NIS2, wenn sie Dienste in der EU anbieten. Dazu gehören Cloud-, Rechenzentrums-, DNS- und Managed-Service-Anbieter. Sie müssen eine Vertretung in der EU benennen (F4, REPORTED). Für Schweizer IT-Dienstleister ist das die relevanteste Aussage. «Faktisch» allein untertreibt sie. **Der Fach-Owner muss die Formulierung bestätigen oder streichen.** |
| Titel (H1) | «Schweizer Unternehmen – über Verträge» | «Schweizer Unternehmen, über Verträge» | CI v3 Copy-Regel (kein Gedankenstrich im Satzfluss) |
| Einstieg, 3. Satz | «Geschäftsleitungen — in Form von Kundenverträgen» | «Geschäftsleitungen: in Form von Kundenverträgen» | CI v3 Copy-Regel (kein Gedankenstrich im Satzfluss) |
| Punkt 1 | «direkt betroffen — inklusive Pflichten» | «direkt betroffen, inklusive Pflichten» | CI v3 Copy-Regel (kein Gedankenstrich im Satzfluss) |
| Punkt 2 | «weitergereicht — als Vertragsklausel» | «weitergereicht: als Vertragsklausel» | CI v3 Copy-Regel (kein Gedankenstrich im Satzfluss) |
| Punkt 3 | «gemessen — unabhängig vom eigenen Firmensitz» | «gemessen, unabhängig vom eigenen Firmensitz» | CI v3 Copy-Regel (kein Gedankenstrich im Satzfluss) |
| Absatz Schweiz | «(BACS) — so verlangt es» | «(BACS). So verlangt es» | CI v3 Copy-Regel (kein Gedankenstrich im Satzfluss) |
| Prüffrage 3 | «nachweisbar belegen — zum Beispiel» | «nachweisbar belegen, zum Beispiel» | CI v3 Copy-Regel (kein Gedankenstrich im Satzfluss) |
| Schlussabsatz | «selten als Gesetz — meist als Vertragsklausel» | «selten als Gesetz, meist als Vertragsklausel» | CI v3 Copy-Regel (kein Gedankenstrich im Satzfluss) |
| Rest | – | unverändert | – |

Hinweis zu den Zeilen «CI v3 Copy-Regel» (27.09.2026): Die Spalte «Draft» zeigt dort die bisherige Freigabefassung, nicht den Repo-Draft. Nur Zeichensetzung geändert, Aussagen unverändert.

## 3. Faktencheck

Legende: **VERIFIED** heisst, die Primärquelle wurde selbst gelesen. **REPORTED** heisst, die Aussage stammt aus Suchergebnissen oder Sekundärquellen, weil die Primärquelle aus dieser Umgebung gesperrt war. Die Sperre betraf bacs.admin.ch, fedlex.admin.ch und nist.gov, geprüft am 27.09.2026. Eine Aussage ist hier deshalb **nie VERIFIED**. Die Prüfung in der Primärquelle bleibt Aufgabe des Fach-Owners.

| # | Aussage | Status | Quelle (Datum Abruf 27.09.2026) |
|---|---------|--------|-------------------------------|
| F1 | ISG-Meldepflicht für Cyberangriffe auf kritische Infrastrukturen in Kraft seit 01.04.2025 | REPORTED | Suchergebnis zu BACS «Meldepflicht» https://www.bacs.admin.ch/de/meldepflicht (Seite gesperrt); Sekundär: https://www.infosec.ch/blog/fachartikel-swiss-infosec-neu-meldepflicht-fur-cyberangriffe-ab-1-april-2025/ , https://sits.com/ch/blog/ab-1-april-2025-meldepflicht-fuer-cyberangriffe-auf-kritische-infrastrukturen-in-der-schweiz/ |
| F2 | Frist 24 Stunden nach Entdeckung an das BACS. Ergänzung innert 14 Tagen möglich | REPORTED | wie F1; Primärquelle zum Nachlesen: ISG Art. 74a ff., https://www.fedlex.admin.ch/eli/cc/2022/232/de (gesperrt) |
| F3 | Sanktionen (Busse bis CHF 100'000, Art. 74h ISG) erst seit 01.10.2025 in Kraft | REPORTED | wie F1 (Suchergebnis SITS). Steht **nicht** im Post und ist dort auch nicht nötig. |
| F4 | NIS2 gilt direkt für bestimmte digitale Dienste ohne EU-Niederlassung und verlangt dann eine EU-Vertretung (Art. 26 Abs. 3) | REPORTED | https://nisd2.eu/en/wiki/scope/nis2-headquarters-outside-eu , https://www.sidd.swiss/en/insights/nis2-self-assessment-switzerland/ ; Primärtext: EUR-Lex Richtlinie (EU) 2022/2555 Art. 26 (nicht abgerufen) |
| F5 | Lieferkettenpflicht (Art. 21 Abs. 2 lit. d) und Pflichten der Leitungsorgane (Art. 20) | REPORTED | https://www.nis-2-templates.com/article-20-management-liability/ , https://www.rescana.com/learn/compliance/nis2-supply-chain/ |
| F6 | Umsetzungsstand: Deutschland NIS2UmsuCG in Kraft seit 06.12.2025 | REPORTED | https://www.usd.de/en/nis2umsucg-officially-in-force/ , https://www.isico.de/blog/nis2-umsetzungsgesetz-ist-in-kraft-getreten |
| F7 | Österreich NISG 2026 tritt am 01.10.2026 in Kraft (kundgemacht 23.12.2025) | REPORTED | https://www.wko.at/it-sicherheit/nis2-uebersicht , https://www.usp.gv.at/aktuelles/newsliste/NIS-2.html |
| F8 | Stand EU-weit: Mehrere Staaten noch ohne vollständige Umsetzung. Am 08.07.2026 beschloss die Kommission, IE, ES, FR und NL an den EuGH zu verweisen | REPORTED | https://compliancehub.wiki/nis2-cjeu-referral-ireland-spain-france-netherlands-2026/ , https://ecs-org.eu/policy/nis2-directive-transposition-tracker/ . Steht nicht im Post. Relevant nur, falls in Kommentaren nach dem Stand gefragt wird. |
| F9 | Sektorenliste in Prüffrage 1 (Energie, Transport, Gesundheit, digitale Dienste, verarbeitendes Gewerbe) | REPORTED | Anhänge I/II NIS2 laut Sekundärquellen (Glocert, s. oben). Mit «u.a.» bewusst offen gehalten. |

Hinweis für den Fach-Owner: «melden Cyberangriffe» ist leicht verkürzt. Meldepflichtig sind nur Angriffe, die die ISG-Kriterien erfüllen, zum Beispiel Gefährdung der Funktionsfähigkeit oder Erpressung. Optional lässt sich «melden meldepflichtige Cyberangriffe» schreiben. Das ist nicht zwingend.

## 4. Gate-Vorprüfung

| Gate | Befund | Status |
|------|--------|--------|
| **1 Fach** (Regulatory Expert) | Kernaussagen decken sich mit den Suchergebnissen (F1–F5). Befund Art. 26 ist eingearbeitet (siehe Änderungen). Keine Zahlen ohne Quelle. Die Primärquellen konnten aus der KI-Umgebung nicht gelesen werden. **Nach §4.5 nicht durch KI ersetzbar.** | Vorprüfung bestanden · **menschlich offen** |
| **2 Legal** (verstärkt, P6) | Disclaimer «Allgemeine Einordnung, keine Rechtsberatung» ist enthalten ✔. Keine Superlative, keine Bussgeld-Dramatisierung ✔. Keine Kundennamen ✔. Keine Platzhalter ✔. Keine EU-Embleme in der Grafik (nur Text «EU»/«CH» und ein schematisches Kreuz) ✔. | Vorprüfung bestanden |
| **3 Accessibility** | Repo-PNG hat einen **weissen Balken von 87 px am unteren Rand** (Renderfehler: Headless-Chromium-Fenster, Zeile 1413–1499). Deshalb wurde neu gerendert. Die Datei in `freigabe/assets/07-nis2/` ist fehlerfrei, geprüft mit einer Pixelanalyse. Alle Grafikinhalte stehen auch im Text ✔. Weiss auf #0A1F44 ✔. Hashtags in korrekter Schreibweise (Einzelwörter) ✔. Keine Unicode-Formatierung, keine Emojis ✔. «→» als Listenmarker ist laut Styleguide erlaubt. BACS ist ausgeschrieben ✔. Alt-Text siehe unten (ca. 440 Zeichen) ✔. | **Korrektur nötig → erledigt** (neues Asset verwenden) |
| **4 Security-Redline** | Laut Matrix nicht obligatorisch. Kein Angriffswissen, keine Infrastrukturdetails. | n/a |

**Alt-Text (für das LinkedIn-Feld):**

> Grafik von CYSPA, Serie Regulatorik im Klartext. Titel: NIS2 ist EU-Recht. Und erreicht die Schweiz trotzdem. Drei Wege in die Schweiz: EU-Tochter, Tochtergesellschaften in der EU sind direkt betroffen, inklusive Pflichten der Führungsebene. Lieferkette, Anforderungen Ihrer EU-Kunden kommen als Vertragsklausel, Fragebogen oder Audit-Recht. Marktzugang, Dienste für EU-Kunden werden an den Anforderungen der Kunden gemessen. Hinweis Schweiz: Parallel gilt die ISG-Meldepflicht. Betreiber kritischer Infrastrukturen melden Cyberangriffe seit 1. April 2025 innert 24 Stunden dem Bundesamt für Cybersicherheit (BACS). Quellen: Richtlinie (EU) 2022/2555, ISG Art. 74a ff. Prüffragen im Beitragstext.

(Alt-Text am 27.09.2026 an das neue Visual im CYSPA CI v3.0 angepasst. Neues Visual: `cyspa-marketing/linkedin/visuals-ci3/07-nis2/2026-09-29-p06-nis2.png`, Fakten-Karte 1200×1200, Variante «rows». Es ersetzt das Asset im alten Repo-CI. Grafiktext gegenüber dem alten Visual: Pfeile EU→CH durch drei Zeilen mit Kurzbeschreibung ersetzt; der Gedankenstrich in der Fussnote entfernt; «24 h ans BACS» ausgeschrieben; Quellenzeile ergänzt. Die Art.-26-Direktanwendung steht bewusst nicht in der Grafik, solange der Fach-Owner sie nicht bestätigt hat.)

## 5. Erster Kommentar

Keiner vorgesehen. Laut Draft ist ein Kommentar nur bei einer verfügbaren Checkliste-PDF gedacht. Diese liegt nicht vor.
Der ECSM-Hinweis entfällt, weil der Post im September erscheint.

## 6. Freigabe durch LWE

- ☐ Fachlich freigegeben (Name: ____________________, NIS2/Regulatory Expert), inkl. Entscheid zur Art.-26-Ergänzung und zum optionalen Aktualitätssatz
- ☐ Legal
- ☐ Accessibility
- ☐ Redline (n/a, abhaken als «entfällt»)
- ☐ Freigabe Head of Content/LWE

**Publikationsanleitung**

1. Di 29.09.2026, 08:15 Uhr: selbst posten oder vorab in LinkedIn einplanen.
2. Bild hochladen: `cyspa-marketing/linkedin/freigabe/assets/07-nis2/2026-09-29-p06-nis2.png` (nicht das Repo-PNG).
3. Alt-Text aus Abschnitt 4 in das Alt-Text-Feld kopieren.
4. Post-Text aus Abschnitt 2 einfügen. Kein erster Kommentar.
5. Engagement 08:15–09:15 Uhr: LWE als Head of Content, dazu NIS2/Regulatory Expert für Fachfragen. Kommentare der Art «Betrifft uns das?» nicht öffentlich beurteilen, sondern ins Gespräch überführen (keine Rechtsberatung in Kommentaren).
