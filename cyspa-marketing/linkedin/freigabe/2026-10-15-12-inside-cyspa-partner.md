---
tags: [linkedin, freigabe, batch-1, p11, inside-cyspa, einwilligung]
status: freigabepaket-entscheid-lwe-offen
date: 2026-09-27
source: claude
post_nr: "12"
slot: "2026-10-15 08:15"
---

# #12 – Inside CYSPA: Was «Partner» für uns bedeutet

Freigabepaket für LWE. Grundlage: Repo-Draft `linkedin/posts/2026-10-15-p11-inside-cyspa-partner.md`. Erstellt mit KI-Unterstützung.

> **Entscheid LWE bis Mi 30.09.:** Plan A (echtes Teamfoto) **oder** Plan B (typografische Grafik, fertig). Plan A ist nur zulässig, wenn **alle Einwilligungen dokumentiert** vorliegen (Gate 2) und der OPSEC-Check gemacht ist (Gate 4). Sonst gilt automatisch Plan B.

## 1. Steckbrief

| Feld | Wert |
|------|------|
| Slot | Donnerstag, 15.10.2026, 08:15 Uhr |
| Pfeiler / Serie | P11 – INSIDE CYSPA |
| Zielgruppe | alle Segmente (Vertrauensebene) |
| Ziel | E (Vertrauen) |
| Format | Plan A: Textpost + Teamfoto · Plan B: Textpost + Single Graphic 1200×1500 px |
| CTA-Typ | Follow (Serien-Ausblick) |
| Asset im Repo | **keines**. Das Teamfoto fehlt, bewusst nicht generiert (CI- und Legal-Regel §4.5: keine KI-Personenfotos). |
| Asset Plan B | `cyspa-marketing/linkedin/freigabe/assets/12-partner-planb/2026-10-15-p11-partner-planb.png` (neu erstellt mit der Repo-Pipeline, CI v3: Deep Space Blue, Montserrat/Inter, Cyan nur als Akzent, Logo-Plakette) |
| Owner | Head of Content + Creative Director (kein Fachreview nötig) |
| Freigabeweg | Legal (Einwilligungen) · Accessibility · Redline (OPSEC) · Head of Content |

### Was LWE entscheiden muss

| # | Entscheid | Optionen | Empfehlung |
|---|-----------|----------|------------|
| E1 | Bild | A: Teamfoto · B: typografische Grafik | **B**, ausser Foto **und** schriftliche Einwilligungen **und** OPSEC-Check liegen bis 30.09. vor. Während der Ferien kann niemand mehr ein Foto freigeben. |
| E2 | Persönlicher Absatz | A: Team schreibt 2–3 echte Sätze · B: Absatz entfällt | Bei Plan B entfällt er. Der Text trägt auch ohne ihn. Bei Plan A muss er bis 30.09. vorliegen, **KI schreibt ihn nicht** (Authentizität, keine erfundenen Einblicke). |
| E3 | «jede Woche» im Schlussabsatz | Draft «jede Woche» · final «regelmässig» | «regelmässig», siehe Änderungen |
| E4 | Ablage der Einwilligungen (nur Plan A) | Ort benennen | Muss bekannt sein, weil Einwilligungen widerruflich sind (Gate 2) |

## 2. Finaler Post-Text (copy-paste-fertig)

### Plan B – ohne Foto, ohne persönlichen Absatz (publikationsreif nach Freigabe)

```text
CYSPA steht für Cyber Security Partners. Das Wort «Partner» steht dort nicht, weil es gut klingt, sondern weil wir eine klare Vorstellung davon haben, wie Security-Arbeit für Schweizer Unternehmen funktionieren muss.

Vier Prinzipien, an denen wir uns messen lassen:

1. Prioritäten statt Papier.
Ein Assessment, das nicht in einer umsetzbaren Roadmap endet, ist Dekoration. Jedes unserer Ergebnisse beantwortet die Frage: Was tun wir zuerst, und warum?

2. Sicherheit im Massstab des Unternehmens.
Ein Betrieb mit 50 Mitarbeitenden braucht keine Konzern-Governance. Er braucht die Massnahmen mit der grössten Wirkung fürs Geld. Und die Ehrlichkeit, den Rest wegzulassen.

3. Befähigen statt abhängig machen.
Unser Erfolg zeigt sich daran, dass Ihr Team nach dem Mandat mehr kann und mehr versteht als vorher. Abhängigkeit ist kein Geschäftsmodell, das zu «Partner» passt.

4. Klartext im Management-Report.
Risiken in Geschäftssprache, Entscheidungsvorlagen statt Techniklisten. Wenn der Verwaltungsrat nach 15 Minuten die Lage versteht, haben wir unseren Job gemacht.

Auf dieser Seite teilen wir regelmässig, was wir in der Praxis sehen: von Microsoft-Security-Handwerk über Regulatorik im Klartext bis zu Übungen mit Führungsteams. Folgen Sie CYSPA, wenn Sie pragmatische Schweizer Security-Perspektiven direkt im Feed möchten.

#CYSPA #CyberSecurity #Schweiz #KMU #Team
```

### Plan A – mit Teamfoto: gleicher Text, dazu der persönliche Absatz

Den Absatz vor «Auf dieser Seite teilen wir …» einfügen:

```text
[OFFEN – vom Team zu schreiben, 2–3 Sätze: wer wir sind, was uns diese Woche beschäftigt hat, ein echter Einblick. Kein Marketing-Satz. Ohne Kunden- oder Projektbezug.]
```

Dieser Platzhalter darf **nicht** publiziert werden (Gate 2). Liegt der Absatz nicht bis 30.09. vor, gilt Plan B.

### Änderungen gegenüber Repo-Draft

| Stelle | Draft | Final | Begründung |
|--------|-------|-------|------------|
| Persönlicher Absatz | `[PLATZHALTER — persönlicher Absatz …]` | Plan B: entfernt · Plan A: offen, durch das Team zu füllen | Gate 2 (Platzhalter-Kontrolle). KI erfindet keine persönlichen Einblicke. |
| Schlussabsatz | «teilen wir jede Woche» | «teilen wir regelmässig» | Gate 2 (keine unrichtige Angabe): Batch 1 endet am 15.10. Batch 2 startet laut Redaktionsplan §4 erst in KW 44. KW 43 war als Review-Woche ohne Posts vorgesehen. Nachtrag 27.09.2026: LWE hat Posts für 20./22.10. beauftragt (cyspa-marketing/linkedin/posts-neu/), damit wäre «jede Woche» bis Ende Oktober belegbar. «Regelmässig» bleibt trotzdem die sichere Formulierung, weil die Oktober-Posts noch nicht freigegeben sind. |
| Einstieg | «gut klingt — sondern weil wir» | «gut klingt, sondern weil wir» | CI v3 Copy-Regel (kein Gedankenstrich im Satzfluss) |
| Prinzip 1 | «Was tun wir zuerst — und warum?» | «Was tun wir zuerst, und warum?» | CI v3 Copy-Regel (kein Gedankenstrich im Satzfluss) |
| Prinzip 2 | «Wirkung fürs Geld — und die Ehrlichkeit» | «Wirkung fürs Geld. Und die Ehrlichkeit» | CI v3 Copy-Regel (kein Gedankenstrich im Satzfluss) |
| Rest | – | unverändert | – |

Hinweis zu den Zeilen «CI v3 Copy-Regel» (27.09.2026): Die Spalte «Draft» zeigt dort die bisherige Freigabefassung, nicht den Repo-Draft. Nur Zeichensetzung geändert, Aussagen unverändert.

## 3. Faktencheck

| # | Aussage | Status | Bemerkung |
|---|---------|--------|-----------|
| F1 | «CYSPA steht für Cyber Security Partners» | geprüft am Asset | Die Wortmarke im Repo-Logo trägt die Unterzeile «Cyber Security Partners» ✔ |
| F2 | Vier Prinzipien | Selbstverpflichtung | keine Tatsachenbehauptung über Dritte ✔ |
| F3 | «50 Mitarbeitende», «15 Minuten» | illustrative Beispielwerte | keine Statistik. Als Beispiel erkennbar ✔ |
| F4 | «jede Woche» → «regelmässig» | abgeglichen mit `05-redaktionsplan.md` §3/§4 | siehe Änderungen |

## 4. Gate-Vorprüfung

| Gate | Befund | Status |
|------|--------|--------|
| **1 Fach** | laut Matrix nicht nötig (kein Fachinhalt) | n/a |
| **2 Legal** | **Plan A:** Blocker, bis die dokumentierte Einwilligung **aller** abgebildeten Personen vorliegt (revDSG, Recht am eigenen Bild) und der Ablageort bekannt ist. Personen nur mit Einverständnis taggen. **Plan B:** keine Personen, keine Einwilligung nötig ✔. Platzhalter: in Plan B entfernt ✔, in Plan A offen. «Jedes unserer Ergebnisse …» ist eine absolute Selbstverpflichtung. Tragbar, weil sie als Prinzip formuliert ist. Legal kann auf «Unsere Ergebnisse beantworten …» abschwächen (optional). | Plan B: Vorprüfung bestanden · Plan A: **menschlich offen (Blocker)** |
| **3 Accessibility** | Plan B: Alt-Text siehe unten ✔. Die Grafik zeigt die vier Prinzipien, die auch im Text stehen ✔. Weiss auf #0A1F44 ✔. Hashtags in korrekter Schreibweise (#CyberSecurity) ✔. Keine Emojis ✔. Plan A: Alt-Text muss nach der Fotoauswahl konkret geschrieben werden (Entwurf unten). | Plan B: Vorprüfung bestanden · Plan A: offen |
| **4 Security-Redline** (P11-OPSEC, obligatorisch) | Plan B: typografisch, keine Bildschirme, Badges, Whiteboards, QR-Codes ✔. Plan A: Foto prüfen auf lesbare Bildschirme, Whiteboards oder Flipcharts mit Kundenbezug, Badges, Dokumente, Türschilder und Netzwerkgeräte-Labels. | Plan B: Vorprüfung bestanden · Plan A: **menschlich offen** |

**Alt-Text Plan B:**

> Grafik von CYSPA, Serie Inside CYSPA. Titel: Was «Partner» für uns bedeutet. Vier Prinzipien, an denen wir uns messen lassen: 1. Prioritäten statt Papier: Jedes Ergebnis sagt, was zuerst kommt und warum. 2. Sicherheit im Massstab des Unternehmens: die Massnahmen mit der grössten Wirkung fürs Geld. 3. Befähigen statt abhängig machen: Ihr Team kann nach dem Mandat mehr als vorher. 4. Klartext im Management-Report: Risiken in Geschäftssprache, Entscheidungsvorlagen statt Techniklisten. Fusszeile: CYSPA, Cyber Security Partners.

(Alt-Text Plan B am 27.09.2026 an das neue Visual im CYSPA CI v3.0 angepasst, Gedankenstrich entfernt. Neues Visual Plan B: `cyspa-marketing/linkedin/visuals-ci3/12-partner-planb/2026-10-15-p11-partner-planb.png`, Fakten-Karte 1200×1200, Variante «rows» mit Nummern. Es ersetzt die Plan-B-Grafik im alten Repo-CI (Deep Space Blue, Montserrat, Logo-Plakette). Grafiktext: je Prinzip eine Kurzzeile aus dem Post-Text ergänzt; Schlusszeile «CYSPA – Cyber Security Partners» als Fusszeile «CYSPA · Cyber Security Partners» ohne Gedankenstrich. Falls Legal «Jedes unserer Ergebnisse» abschwächt, Zeile 1 in der Grafik entsprechend auf «Unsere Ergebnisse sagen, was zuerst kommt und warum» ändern.)

**Alt-Text Plan A (Vorlage, nach Fotoauswahl konkretisieren):**

> [OFFEN: Bildinhalt konkret beschreiben: wer/wie viele Personen, Situation, Ort nur wenn unkritisch.] Der Beitrag beschreibt die vier Arbeitsprinzipien von CYSPA: Prioritäten statt Papier, Sicherheit im Massstab des Unternehmens, Befähigen statt abhängig machen, Klartext im Management-Report.

## 5. Erster Kommentar

Laut Draft keiner nötig.
**Optional ECSM (durch die Stellvertretung):**

```text
Zum Abschluss unserer ersten Beitragsserie im European Cybersecurity Month: Welches Thema sollen wir als Nächstes vertiefen? Wir lesen jede Antwort.
```

(Dialog-CTA. Nur setzen, wenn jemand in der ersten Stunde die Antworten betreuen kann, weil sonst das Versprechen «wir lesen jede Antwort» leer bleibt.)

## 6. Freigabe durch LWE

- ☐ **Entscheid Plan A / Plan B:** ________
- ☐ Fachlich freigegeben (n/a)
- ☐ Legal (Plan A: Einwilligungen aller Abgebildeten dokumentiert, Ablageort: ____________________)
- ☐ Accessibility
- ☐ Redline / OPSEC (Name: ____________________)
- ☐ Freigabe Head of Content/LWE

**Publikationsanleitung**

1. Bis **Mi 30.09.2026** für **Do 15.10.2026, 08:15 Uhr** einplanen.
2. Asset: Plan B `cyspa-marketing/linkedin/freigabe/assets/12-partner-planb/2026-10-15-p11-partner-planb.png` · Plan A: freigegebenes Teamfoto.
3. Den passenden Alt-Text aus Abschnitt 4 einfügen.
4. Post-Text: Plan B unverändert. Plan A mit dem vom Team geschriebenen Absatz, ohne eckige Klammern.
5. Engagement 08:15–09:15 Uhr: **Social Selling Specialist** und ein Mitglied der Geschäftsleitung oder des Teams als Stellvertretung von LWE (Kommentare zu Team und Kultur persönlich beantworten).
