---
tags: [linkedin, freigabe, batch-1, p12, tabletop, incident-response, carousel]
status: freigabepaket-gates-offen-url-zu-bestaetigen
date: 2026-09-27
source: claude
post_nr: "10"
slot: "2026-10-08 08:15"
---

# #10 – Tabletop: Aus Plan wird Fähigkeit

Freigabepaket für LWE. Grundlage: Repo-Draft `linkedin/posts/2026-10-08-p12-tabletop-exercise.md`. Erstellt mit KI-Unterstützung. Die Faktenverantwortung liegt bei den Fach-Ownern IR und GRC (§4.5).

> **Einziger harter CTA in #07–#12.** Er funktioniert nur, wenn die Landingpage am 08.10. online ist und jemand den **ersten Kommentar mit Link** sofort nach der Publikation setzt. LWE ist abwesend, daher eine Stellvertretung bestimmen.

## 1. Steckbrief

| Feld | Wert |
|------|------|
| Slot | Donnerstag, 08.10.2026, 08:15 Uhr |
| Pfeiler / Serie | P12 – EXECUTIVE BRIEFING |
| Zielgruppe | primär Executive, sekundär Security Leadership; KMU/Mid-Market |
| Ziel | B, D |
| Format | Carousel / Dokument-Post, 6 Slides 1080×1350 px, PDF |
| CTA-Typ | **Hart**: Tabletop-Angebot, Link im ersten Kommentar |
| Asset im Repo | `linkedin/assets/export/2026-10-08-p12-tabletop/2026-10-08-p12-tabletop.pdf` (PDF, Seitenformat 810×1013 pt ≙ 1080×1350 px. Der PNG-Renderfehler betrifft laut Druckpfad nur die PNGs, nicht das PDF.) |
| Asset zur Publikation | `cyspa-marketing/linkedin/freigabe/assets/10-tabletop/2026-10-08-p12-tabletop.pdf` (neu gerendert, Inhalt identisch). Dazu Slide-PNGs `slide-01…06.png` ohne weissen Balken, nur zur Vorschau. |
| Dokumenttitel (LinkedIn-Pflichtfeld) | Tabletop-Übung: Aus Plan wird Fähigkeit |
| Fach-Owner | Incident Response Specialist + GRC Expert |
| Freigabeweg | Fachreview IR+GRC · Legal · Accessibility · Redline (IR-Bezug) · Head of Content |

## 2. Finaler Post-Text (copy-paste-fertig)

```text
Samstag, 06:40 Uhr. Die Dateiserver sind verschlüsselt, die Produktion steht, auf dem Bildschirm eine Lösegeldforderung.

Wer entscheidet jetzt was?

Wenn die ehrliche Antwort «kommt darauf an, wer erreichbar ist» lautet, fehlt Ihnen keine Technik. Ihnen fehlt eine Übung.

Eine Tabletop-Übung ist eine moderierte Entscheidungsübung: ein realistisches Szenario, die richtigen Personen am Tisch, 90 Minuten. Keine Technik-Simulation, kein Test der Firewall — ein Test der Organisation.

Was dabei typischerweise sichtbar wird:

1. Unklare Befugnisse. Wer darf Systeme vom Netz nehmen, auch wenn damit das Geschäft steht? Wer gibt Externen den Auftrag — und bis zu welchem Betrag?

2. Kommunikation ohne die üblichen Kanäle. Wie erreichen Sie Mitarbeitende und Kunden, wenn E-Mail und Chat selbst betroffen sind? Wo liegen die Notfallkontakte — hoffentlich nicht nur auf dem verschlüsselten Server?

3. Meldefristen unter Zeitdruck. Datenschutzbehörden, Vertragspartner, allenfalls Aufsicht oder das Bundesamt für Cybersicherheit (BACS): Wer meldet was bis wann — und wer formuliert es?

4. Die Dienstleisterfrage. Wer ist der erste Anruf? Gilt der Support-Vertrag auch am Wochenende? Steht die Nummer des Versicherers im Plan?

Der eigentliche Wert: Ein Incident-Response-Plan ist eine Hypothese. Die Übung ist ihr Test. Und die wertvollsten Erkenntnisse sind fast immer organisatorisch, nicht technisch.

Unser Format dafür: ein halber Tag mit Ihrer Führungsrunde — Szenario, moderierte Entscheidung, dokumentierte Erkenntnisliste mit klaren Verantwortlichkeiten. Details und Terminanfrage: Link im ersten Kommentar.

#IncidentResponse #TabletopExercise #Krisenmanagement #Führung #CYSPA
```

### Änderungen gegenüber Repo-Draft

| Stelle | Draft | Final | Begründung |
|--------|-------|-------|------------|
| Punkt 3 | «allenfalls Aufsicht oder BACS» | «allenfalls Aufsicht oder das Bundesamt für Cybersicherheit (BACS)» | Gate 3 und Styleguide §2: Abkürzung im Executive-Post beim ersten Auftreten ausschreiben |
| Rest | – | unverändert | – |

**Offener Punkt für den IR-Owner, nicht geändert:** Text und Slide 1 sprechen von «90 Minuten», der Angebotsteil und Slide 6 von «ein halber Tag». Beides ist vereinbar, wenn der halbe Tag Einführung und Auswertung einschliesst. Leserinnen könnten es aber als Widerspruch lesen, und für die Angebotsbeschreibung gilt die UWG-Genauigkeit. Die Angaben müssen mit der Landingpage übereinstimmen. Mögliche Präzisierung, **nur wenn sie dem tatsächlichen Format entspricht**:

> Unser Format dafür: ein halber Tag mit Ihrer Führungsrunde — Einführung, Szenario mit moderierter Entscheidung, Auswertung und eine dokumentierte Erkenntnisliste mit klaren Verantwortlichkeiten.

## 3. Faktencheck

Primärquellen (fedlex.admin.ch, bacs.admin.ch, edoeb.admin.ch) waren aus dieser Umgebung gesperrt. Deshalb ist alles REPORTED (Abruf 27.09.2026).

| # | Aussage / Implizite Annahme | Status | Quelle |
|---|-----------------------------|--------|--------|
| F1 | Datenschutz: Verletzungen der Datensicherheit mit voraussichtlich hohem Risiko meldet der Verantwortliche dem EDÖB «so rasch als möglich» (Art. 24 revDSG). Keine feste Stundenfrist. | REPORTED | Suchergebnisse: https://www.datenschutzpartner.ch/dsg/dsg-24/ , https://datenschutz.law/revdsg/3-kapitel/art-24 ; EDÖB-Leitfaden (PDF, gesperrt): https://www.edoeb.admin.ch/ |
| F2 | ISG: Betreiber kritischer Infrastrukturen melden Cyberangriffe innert 24 Stunden dem BACS (seit 01.04.2025, Bussen seit 01.10.2025) | REPORTED | https://www.bacs.admin.ch/de/meldepflicht (gesperrt, via Suchergebnis); https://www.infosec.ch/blog/fachartikel-swiss-infosec-neu-meldepflicht-fur-cyberangriffe-ab-1-april-2025/ |
| F3 | Der Post stellt keine Meldepflicht als allgemein geltend dar («allenfalls Aufsicht oder BACS») | geprüft am Text ✔ | Korrekt generisch. Die ISG-Pflicht betrifft nur kritische Infrastrukturen, der revDSG-Massstab ist «so rasch als möglich». Für EU-Töchter gälte zusätzlich die DSGVO. Das ist nicht im Post und muss dort auch nicht stehen. |
| F4 | «90 Minuten» / «ein halber Tag» | Angebotsangabe von CYSPA, nicht extern prüfbar | Abgleich mit der Landingpage und dem IR-Owner (siehe oben) |
| F5 | Oktober = European Cybersecurity Month (für den optionalen Kommentar) | REPORTED | https://www.enisa.europa.eu/topics/cyber-hygiene/european-cybersecurity-month |

## 4. Gate-Vorprüfung

| Gate | Befund | Status |
|------|--------|--------|
| **1 Fach** (IR + GRC) | Meldefristen bewusst generisch und korrekt (F1–F3). Szenario realistisch, ohne Angstsuperlative. 90 Min / halber Tag klären. **Nicht durch KI ersetzbar.** | Vorprüfung bestanden · **menschlich offen** |
| **2 Legal** | Angebot ohne Erfolgsversprechen ✔. Kundennamen keine ✔. **Platzhalter im Kommentar:** Der Repo-Kommentar enthält `[PLATZHALTER …]`. Er ist hier durch die Arbeits-URL ersetzt, die aber **ZU BESTÄTIGEN** ist. Solange die URL nicht bestätigt ist (Seite live, Pfad korrekt), gilt das Gate als nicht erfüllt. Die Formatangaben müssen zur Landingpage passen. | **Korrektur nötig** (URL bestätigen) · menschlich offen |
| **3 Accessibility** | Slide-PNGs im Repo mit **weissem 87-px-Balken** (Renderfehler). Das zur Publikation vorgesehene PDF wird über den Druckpfad gerendert und hat das korrekte Seitenformat. Die neu gerenderten Slide-PNGs sind fehlerfrei. **Das PDF vor dem Upload einmal durchblättern**, weil es aus dieser Umgebung nicht als Bild geprüft werden konnte. Alle Slide-Inhalte stehen auch im Text ✔. Hook-Slide ohne Schreckbild ✔. BACS ist jetzt ausgeschrieben ✔. Hashtags in korrekter Schreibweise ✔. Keine Emojis ✔. Die Glyphen ✓/✗ auf Slide 2 sind mit Text beschriftet («Testet die Organisation» / «Testet nicht die Firewall»), tragen also keine Bedeutung allein ✔. | **Korrektur nötig → erledigt** (Asset) · PDF-Sichtprüfung offen |
| **4 Security-Redline** (IR-Bezug) | Szenario fiktiv und generisch. Keine realen Vorfalls- oder Kundendetails, keine Taktiken. Posting-Stopp-Regel §4.2 beachten: Bei einem laufenden Grossvorfall in der Schweiz am 08.10. verschieben, weil das Ransomware-Szenario pietätlos wirken könnte. | Vorprüfung bestanden · **menschlich offen** |

**Alt-Text (Dokument-Post: in LinkedIn gibt es für PDFs kein eigenes Alt-Text-Feld. Deshalb stehen die Inhalte redundant im Post-Text. Diesen Text trotzdem ablegen oder als Beschreibung verwenden, falls das Feld angeboten wird):**

> Carousel von CYSPA, Serie Executive Briefing, über Tabletop-Übungen. Slide 1: Samstag, 06:40 Uhr. Wer entscheidet jetzt was? Slide 2: Tabletop ist eine Entscheidungsübung, sie testet die Organisation, nicht die Firewall. Slides 3 bis 5: typische Erkenntnisse – unklare Befugnisse, Kommunikation ohne E-Mail, Meldefristen und der erste Anruf beim Dienstleister. Slide 6: Ein halber Tag, eine dokumentierte Erkenntnisliste. Alle Inhalte stehen auch im Beitragstext.

## 5. Erster Kommentar (sofort nach Publikation setzen)

```text
Hier geht es zum Executive-Tabletop-Format von CYSPA — Ablauf, Aufwand und Terminanfrage: https://www.cyspa.ch/tabletop?utm_source=linkedin&utm_medium=organic&utm_campaign=p12-tabletop

Passend zum European Cybersecurity Month im Oktober: Ein guter Anlass, den Notfallplan einmal gemeinsam durchzuspielen.
```

- **URL `https://www.cyspa.ch/tabletop` = Arbeits-URL, ZU BESTÄTIGEN.** Aus dieser Umgebung wurde nicht geprüft, ob die Seite existiert. Vor dem 08.10. im Browser aufrufen. Dabei prüfen: kein 404, Terminformular funktioniert, Formatangaben stimmen mit dem Post überein.
- Unter `cyspa-marketing/web/landingpage-tabletop.md` liegt ein Landingpage-**Entwurf** für `/tabletop` (Status «Freigabe LWE ausstehend»). Die Seite ist also noch nicht live. Der Entwurf löst den Widerspruch 90 Min / halber Tag bereits so auf: «Ein halber Tag, davon rund 90 Minuten Übung im Szenario». Post und Landingpage passen damit zusammen, wenn der IR-Owner diese Struktur bestätigt. Fallback laut Entwurf, falls die Seite am 08.10. nicht live ist: `https://www.cyspa.ch/kontakt` mit denselben UTM-Parametern.
- UTM-Parameter wie im Repo-Draft vorgeschlagen.
- Der ECSM-Satz ist optional. Er ist Nebenhinweis, nicht der Aufhänger.

## 6. Freigabe durch LWE

- ☐ Fachlich freigegeben (Name IR: ____________________, Name GRC: ____________________), inkl. Entscheid 90 Min / halber Tag
- ☐ Legal (inkl. **URL bestätigt**: ______________________________)
- ☐ Accessibility (inkl. PDF durchgeblättert)
- ☐ Redline (IR-Bezug; Name: ____________________)
- ☐ Freigabe Head of Content/LWE

**Publikationsanleitung**

1. Bis **Mi 30.09.2026** für **Do 08.10.2026, 08:15 Uhr** einplanen, als Dokument-Post mit PDF und dem Titel «Tabletop-Übung: Aus Plan wird Fähigkeit». **ZU PRÜFEN:** ob LinkedIn Dokument-Posts auf der Unternehmensseite vorplanen lässt. Falls nicht, veröffentlicht die Stellvertretung manuell um 08:15 Uhr.
2. PDF: `cyspa-marketing/linkedin/freigabe/assets/10-tabletop/2026-10-08-p12-tabletop.pdf`
3. Post-Text aus Abschnitt 2.
4. **Ersten Kommentar sofort nach der Publikation** manuell durch die Stellvertretung setzen. Nach unserem Kenntnisstand lässt sich ein erster Kommentar nicht vorplanen (ZU PRÜFEN). Wenn niemand verfügbar ist, bleibt als Notlösung der Link im Post-Text (Reichweitennachteil, Styleguide §3).
5. Engagement 08:15–09:15 Uhr: **Social Selling Specialist** (Terminanfragen per DM oder Telefon übernehmen, Lead-Übergabe an **B2B Demand Generation**) und **Incident Response Specialist** für Fachfragen. Vertrauliches nie in DMs (§4.3), sondern an info@cyspa.ch / Telefon.
