---
tags: [cyspa, marketing, webseite, landingpage, tabletop, linkedin, p12]
status: Entwurf – Freigabe LWE ausstehend
date: 2026-09-27
source: claude
chat_url: "https://claude.ai/code/session_01JsQoSQbozeyt2EYitpEXuf"
grundlage: "linkedin/posts/2026-10-08-p12-tabletop-exercise.md, 02-content-pfeiler.md P12, 03-styleguide.md, 04-prozess-qualitaet.md, 06-kpi-reporting.md (UTM) – Branch claude/cyspa-linkedin-strategy-vte419"
kampagne: "LinkedIn-Beitrag #10, Do 08.10.2026, 08:15 Uhr (P12 Executive Briefing)"
---

# Landingpage «Tabletop-Übung» – `/tabletop`

**Einsatz:** Ziel des Links im ersten Kommentar zum LinkedIn-Beitrag #10 vom 08.10.2026 («Tabletop: Aus Plan wird Fähigkeit»). Die Seite löst den CTA des Beitrags ein: «Details und Terminanfrage».

**Dateien:**
- Texte: diese Datei
- Umsetzungsvorlage: `landingpage-tabletop.html` (eigenständig, responsive, CI, inline CSS; Fonts und Logo unter `assets/`)

**Abhängigkeit:** Die Seite muss vor dem 08.10., 08:15 Uhr, live und getestet sein. Sonst zeigt der Kommentar-Link ins Leere. Fallback: Link auf www.cyspa.ch/kontakt mit denselben UTM-Parametern.

---

## 1. SEO und Tracking

| Feld | Text | Länge |
|---|---|---|
| URL | `https://www.cyspa.ch/tabletop` | – |
| Title | Tabletop-Übung für die Geschäftsleitung \| CYSPA | 47 |
| Meta-Description | Ein halber Tag mit Ihrer Führungsrunde: realistisches Szenario, moderierte Entscheidungen, dokumentierte Erkenntnisliste. Jetzt Gespräch vereinbaren. | 149 |
| H1 | Wer entscheidet, wenn es ernst wird? | – |
| Indexierung | `index, follow` (Seite ist auch ohne Kampagne nützlich) | – |
| Open Graph | og:title = Title, og:description = Meta-Description, og:image = [PLATZHALTER: 1200×627-Bild, z. B. Slide 1 des Carousels] | – |

**UTM-Schema** (gemäss `06-kpi-reporting.md`):

```
https://www.cyspa.ch/tabletop?utm_source=linkedin&utm_medium=organic&utm_campaign=p12-tabletop
```

| Parameter | Wert | Bedeutung |
|---|---|---|
| `utm_source` | `linkedin` | Kanal |
| `utm_medium` | `organic` | unbezahlter Beitrag |
| `utm_campaign` | `p12-tabletop` | Pfeiler P12, Thema Tabletop |
| `utm_content` (optional) | `erster-kommentar` bzw. `profil-<kuerzel>` | unterscheidet Page-Kommentar und Reshares persönlicher Profile |

**Kommentar-Text für den Beitrag (ersetzt den Platzhalter in der Beitragsdatei):**
«Hier geht es zum Executive-Tabletop-Format von CYSPA: https://www.cyspa.ch/tabletop?utm_source=linkedin&utm_medium=organic&utm_campaign=p12-tabletop»

**Messung:** Die UTM-Werte werden im Formular als versteckte Felder mitgesendet (siehe HTML). So landet die Quelle «LinkedIn / P12» mit der Anfrage im CRM (Feld Quelle gemäss `06-kpi-reporting.md`). Welches Analytics-Werkzeug die Seitenaufrufe erfasst: [PLATZHALTER: Analytics-Tool auf cyspa.ch – im Cookie-Banner und in der Datenschutzerklärung berücksichtigen].

---

## 2. Seitentexte

### Hero

**Kicker (Serien-Badge):** EXECUTIVE BRIEFING · TABLETOP-ÜBUNG

**H1:** Wer entscheidet, wenn es ernst wird?

**Lead:**
Samstag, 06:40 Uhr. Die Dateiserver sind verschlüsselt, die Produktion steht. Eine Tabletop-Übung zeigt Ihrer Führungsrunde, ob die Antwort auf diese Frage feststeht, bevor der Ernstfall sie stellt.

**Fakten-Zeile:** Ein halber Tag · Ihre Führungsrunde · Dokumentierte Erkenntnisliste

**Button:** «Gespräch vereinbaren» → Anker `#anfrage`

### Problem

**H2:** Ein Plan ist eine Hypothese. Die Übung ist ihr Test.

Wenn die ehrliche Antwort auf «Wer entscheidet jetzt?» lautet: «Kommt darauf an, wer erreichbar ist», dann fehlt Ihnen keine Technik. Dann fehlt eine Übung.

Die wertvollsten Erkenntnisse aus Übungen sind fast immer organisatorisch, nicht technisch. Typischerweise werden vier Dinge sichtbar:

1. **Unklare Befugnisse.** Wer darf Systeme vom Netz nehmen, auch wenn damit das Geschäft steht? Wer gibt Externen den Auftrag – und bis zu welchem Betrag?
2. **Kommunikation ohne die üblichen Kanäle.** Wie erreichen Sie Mitarbeitende und Kunden, wenn E-Mail und Chat selbst betroffen sind? Wo liegen die Notfallkontakte?
3. **Meldefristen unter Zeitdruck.** Datenschutzbehörde, Vertragspartner, allenfalls Aufsicht oder BACS: Wer meldet was bis wann – und wer formuliert es?
4. **Die Dienstleisterfrage.** Wer ist der erste Anruf? Gilt der Support-Vertrag auch am Wochenende? Steht die Nummer des Versicherers im Plan?

### Ablauf der Übung

**H2:** So läuft die Übung ab

**Grundsatz:** Eine moderierte Entscheidungsübung, keine Technik-Simulation. Getestet wird die Organisation, nicht die Firewall. An Ihren Systemen wird nichts verändert.

| Schritt | Was passiert |
|---|---|
| **1. Vorgespräch** | Wir klären Teilnehmende, Rahmen und Schwerpunkt des Szenarios. [PLATZHALTER: Dauer und Form des Vorgesprächs bestätigen] |
| **2. Szenario** | Ein realistisches, fiktives Szenario, das sich Schritt für Schritt entwickelt. |
| **3. Moderierte Entscheidungen** | Rund 90 Minuten Übung: Ihre Führungsrunde entscheidet, wir moderieren und halten fest. |
| **4. Auswertung** | Gemeinsame Besprechung: Was lief gut, wo fehlten Befugnisse, Informationen oder Kontakte? |
| **5. Erkenntnisliste** | Dokumentierte Erkenntnisse mit klaren Verantwortlichkeiten. [PLATZHALTER: Lieferfrist nach der Übung] |

> Redaktion: Belegt im Repo sind «halber Tag», «rund 90 Minuten Übung», «Szenario, moderierte Entscheidung, dokumentierte Erkenntnisliste mit klaren Verantwortlichkeiten». Vorgespräch und Auswertung als eigene Schritte sind eine Strukturierung; von LWE bzw. Incident Response Specialist zu bestätigen.

### Ergebnis für die Geschäftsleitung

**H2:** Was Ihre Geschäftsleitung danach in der Hand hat

- **Eine Erkenntnisliste mit Verantwortlichen:** Jede Lücke hat einen Namen und einen nächsten Schritt.
- **Geklärte Befugnisse:** Wer entscheidet was, auch am Wochenende und ohne die üblichen Kanäle.
- **Einen getesteten Plan:** Aus einer Annahme wird eine geübte Fähigkeit. Oder Sie wissen genau, was im Plan fehlt.
- **Eine Grundlage für Verwaltungsrat und Versicherer:** Nachvollziehbar dokumentiert, dass die Führung den Ernstfall geübt hat.

> Redaktion: Letzter Punkt ist eine Folgerung (Dokumentation als Nachweis), kein Versprechen gegenüber Versicherern. Legal prüfen. Kein Erfolgsversprechen formuliert.

### FAQ

**H2:** Häufige Fragen

**Ist das ein technischer Test unserer IT?**
Nein. Es wird nichts an Ihren Systemen getestet oder verändert. Die Übung prüft Entscheidungswege, Zuständigkeiten und Kommunikation.

**Wer sollte teilnehmen?**
Die Personen, die im Ernstfall entscheiden: Geschäftsleitung, dazu je nach Organisation IT-Verantwortliche und Kommunikation. [PLATZHALTER: empfohlene Gruppengrösse]

**Wie lange dauert die Übung?**
Ein halber Tag, davon rund 90 Minuten Übung im Szenario.

**Brauchen wir dafür einen fertigen Notfallplan?**
Nein. Gibt es einen Plan, wird er getestet. Gibt es keinen, zeigt die Übung, welche Entscheide ein Plan regeln muss.

> Redaktion: Antwort fachlich durch Incident Response Specialist bestätigen.

**Welches Szenario wird geübt?**
Ein realistisches, fiktives Szenario, zum Beispiel ein Ransomware-Angriff (Schadsoftware, die Daten verschlüsselt und Lösegeld fordert). [PLATZHALTER: Wird das Szenario auf Branche und Organisation zugeschnitten?]

**Wo findet die Übung statt?**
[PLATZHALTER: bei Ihnen vor Ort, bei CYSPA in Rotkreuz und/oder online]

**Was kostet die Übung?**
[PLATZHALTER: Pauschalpreis in CHF oder «Offerte nach Vorgespräch»]

**Wie vertraulich ist das?**
Was in der Übung besprochen wird, bleibt vertraulich. [PLATZHALTER: Vertraulichkeitsvereinbarung auf Wunsch bzw. standardmässig?]

**Beraten Sie uns auch rechtlich zu Meldepflichten?**
Nein. Wir ordnen Meldepflichten im Szenario allgemein ein. Für die rechtliche Beurteilung Ihres Einzelfalls ziehen Sie Ihre Rechtsberatung bei.

### CTA

**H2:** Gespräch vereinbaren

**Text:** In einem kurzen Gespräch klären wir, ob eine Tabletop-Übung für Sie jetzt der richtige Schritt ist und wie sie bei Ihnen aussehen würde. Unverbindlich.

**Alternativen:** info@cyspa.ch · +41 41 521 61 61

**Button (Formular absenden):** «Gespräch anfragen»

**Bestätigung nach Absenden:** «Danke. Wir melden uns [PLATZHALTER: Antwortfrist, z. B. innert zwei Arbeitstagen] bei Ihnen.»

> Redaktion: Antwortfrist nur einsetzen, wenn sie in der Ferienzeit von LWE (ab 01.10.) eingehalten werden kann. Wer bearbeitet Anfragen vom 08.10. an? [PLATZHALTER: Stellvertretung]

---

## 3. Formular

Minimal gehalten (Datensparsamkeit, revDSG). Kein Pflicht-Opt-in für Marketing.

| Feld | Typ | Pflicht | Hinweis |
|---|---|---|---|
| Vorname und Name | Text | ja | `autocomplete="name"` |
| Unternehmen | Text | ja | `autocomplete="organization"` |
| Funktion | Text | nein | hilft bei der Vorbereitung |
| E-Mail (geschäftlich) | E-Mail | ja | `autocomplete="email"` |
| Telefon | Tel. | nein | für Rückruf |
| Nachricht | Textfeld | nein | Platzhaltertext: «Worum geht es Ihnen? Bitte keine vertraulichen Details zu Vorfällen.» |
| `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` | versteckt | – | aus der URL übernommen |
| Honeypot `website` | versteckt | – | Spam-Schutz ohne Tracking (für Menschen unsichtbar, muss leer bleiben) |

**Datenschutzhinweis (unter dem Formular):**
«Wir verwenden Ihre Angaben ausschliesslich, um Ihre Anfrage zu beantworten. Die Übermittlung erfolgt verschlüsselt. Weitere Informationen finden Sie in unserer [PLATZHALTER Datenschutzerklärung-Link].»

> Redaktion revDSG: Ein Informationshinweis mit Link zur Datenschutzerklärung genügt für die Bearbeitung einer Anfrage; eine Einwilligungs-Checkbox ist dafür nicht nötig. Soll zusätzlich ein Newsletter angeboten werden, braucht es eine separate, nicht vorausgewählte Checkbox. Allgemeine Einordnung, durch Legal zu bestätigen. Zu klären: Wohin gehen die Formulardaten (CMS-Formular, CRM, Mail)? Wo werden sie gespeichert (Land)? Das gehört in die Datenschutzerklärung. [PLATZHALTER: Formular-Backend]

---

## 4. Übergabe an Webentwicklung

- `landingpage-tabletop.html` ist eine vollständige Vorlage: semantisches HTML, inline CSS, keine externen Abhängigkeiten, keine Tracker, Schriftarten lokal (`assets/fonts/`, Fallback Systemschrift).
- Das Formular hat `action="[PLATZHALTER-FORMULAR-ENDPUNKT]"`. Es sendet erst, wenn ein Endpunkt eingetragen ist. Ein kleines Inline-Skript überträgt nur die UTM-Parameter in versteckte Felder.
- Farben: Deep Space Blue `#0A1F44`, Counter Navy `#103157`, Cyber Cyan `#00AEEF` nur als Akzent (Linien, Rahmen, Fokusrahmen), Text auf Dunkel weiss. Kontrast geprüft nach `03-styleguide.md` §6.
- Das Logo liegt nur als PNG mit 288×122 px vor. Für Retina-Displays: [PLATZHALTER: Logo als SVG anfordern].
- In WordPress o. Ä.: Abschnitte als Blöcke nachbauen oder die Vorlage als eigenes Seiten-Template verwenden. Kopf- und Fussbereich der bestehenden Seite übernehmen, Impressum und Datenschutz verlinken.

## 5. Prüfliste vor Livegang

- [ ] Alle `[PLATZHALTER …]` ersetzt, alle `> Redaktion:`-Zeilen entfernt
- [ ] Formular-Endpunkt eingetragen und Testanfrage empfangen (inkl. UTM-Werte)
- [ ] Datenschutzerklärung verlinkt und um Formular sowie Analytics ergänzt
- [ ] Seite mobil geprüft (320 px Breite), Tastaturbedienung und Fokusrahmen geprüft
- [ ] Kommentar-Link im Beitrag #10 aktualisiert (Beitragsdatei, Gate-2-Platzhalterkontrolle)
- [ ] Stellvertretung für eingehende Anfragen während der Ferien von LWE bestimmt
- [ ] Vor der Änderung an der Webseite: Sicherheits-Check gemäss Entscheid E2
