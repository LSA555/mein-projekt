# 04 — Redaktionsprozess & Quality Gates

## 1. Workflow: Von der Idee zur Publikation

```
IDEE ──▶ BRIEFING ──▶ DRAFT ──▶ FACHREVIEW ──▶ KREATION ──▶ GATES ──▶ FREIGABE ──▶ PUBLIKATION ──▶ ENGAGEMENT ──▶ MESSUNG
```

| Schritt | Verantwortlich | Inhalt | Ergebnis |
|---------|----------------|--------|----------|
| **1. Idee** | Alle; Sammlung durch Head of Content | Themenquelle: Kundengespräche, Findings-Muster, Regulatorik-Kalender, Kommentarfragen, KPI-Erkenntnisse | Eintrag im Themen-Backlog des Pfeilers |
| **2. Briefing** | Head of Content | Segmentierungs-Deklaration (Zielgruppe, Ziel A–E, Erkenntnisgewinn in einem Satz), Pfeiler, Format, Slot | Beitragsdatei angelegt (Template s. [posts/README.md](posts/README.md)) |
| **3. Draft** | Executive Ghostwriter + Fach-Owner | Text nach Post-Anatomie; Visual-Briefing-Skizze; Alt-Text-Entwurf | Draft in Beitragsdatei, Status `Draft` |
| **4. Fachreview** | Pfeiler-Owner (vgl. [01-strategie.md](01-strategie.md) §5.2) | Fachliche Korrektheit, Aktualität (Features, Fristen, Rechtsstand), Präzision der Begriffe | Korrigierter Draft, Status `Fachlich geprüft` |
| **5. Kreation** | Creative Director → Designer/Motion/Video | Visual nach [03-styleguide.md](03-styleguide.md) §5, finaler Alt-Text | Asset + Alt-Text abgelegt |
| **6. Gates** | Legal Reviewer, Accessibility Reviewer, ggf. CISO | Siehe §2 — parallele Prüfung, jede Rolle mit Veto | Gate-Vermerke in Beitragsdatei |
| **7. Freigabe** | Head of Content | Gesamtbild: Hook, Mix-Regeln, Slot | Status `Freigegeben` |
| **8. Publikation** | Head of Content / Demand Gen | Di/Do 08:15 Uhr; Link-Kommentar sofort nach Publikation als erster Kommentar | Status `Publiziert` + URL |
| **9. Engagement** | Social Selling + Fach-Owner | Erste 60 Minuten: jede Frage beantwortet, jeder substanzielle Kommentar gewürdigt; Fachfragen beantwortet der Fach-Owner | Kommentar-Log bei relevanten Signalen |
| **10. Messung** | Data & Performance Analyst | KPI-Erfassung nach 7 Tagen (vgl. [06-kpi-reporting.md](06-kpi-reporting.md)) | Eintrag im Monatsreport |

**Vorlaufzeiten (Faustregel):** Textpost 3 Arbeitstage vor Slot im Draft; Carousel/Graphic 5 Arbeitstage; Video 10 Arbeitstage.

---

## 2. Quality Gates

Jedes Gate hat Veto-Recht. Ein Veto blockiert die Publikation, bis der Punkt behoben ist. Gates werden in der Beitragsdatei dokumentiert (wer, wann, Befund).

### Gate 1 — Fachlich (Pfeiler-Owner)
- [ ] Aussagen fachlich korrekt und aktuell (Produktstände, Normversionen, Rechtslage mit Datum verifiziert)
- [ ] Erkenntnisgewinn vorhanden und nicht trivial
- [ ] Keine Übervereinfachung, die in der Zielgruppe als falsch gilt
- [ ] Zahlen/Statistiken: nur mit verifizierbarer Quelle; sonst streichen oder als Grössenordnung kennzeichnen. **Keine erfundenen Zahlen — ausnahmslos.**

### Gate 2 — Legal / Compliance
- [ ] **Lauterkeit (UWG):** keine unrichtigen oder irreführenden Angaben, keine Herabsetzung von Wettbewerbern, keine unbelegbaren Superlative («führend», «Nr. 1»)
- [ ] **Kunden & Fälle:** keine Kundennamen, Logos oder Fallschilderungen ohne schriftliche Freigabe; Anonymisierung so, dass kein Rückschluss möglich ist (Branche+Grösse+Vorfall kann identifizierend sein)
- [ ] **Keine Rechtsberatung:** Regulatorik-/Haftungsposts als allgemeine Einordnung formuliert; bei P3/P6 Kennzeichnung «Allgemeine Einordnung, keine Rechtsberatung» im Post
- [ ] **Bild- und Urheberrecht:** nur eigene oder lizenzierte Assets; Personenfotos und Tags nur mit dokumentierter Einwilligung (revDSG / Recht am eigenen Bild); Einwilligung ist widerruflich → Ablageort bekannt
- [ ] **Datenschutz:** keine Personendaten Dritter; Screenshots ohne echte Namen/Adressen/Kennungen
- [ ] **Platzhalter-Kontrolle:** kein `[PLATZHALTER …]` erreicht die Publikation

### Gate 3 — Accessibility
Checkliste aus [03-styleguide.md](03-styleguide.md) §6: Alt-Text, Text-im-Bild-Redundanz, Kontrast ≥ 4.5:1, keine Unicode-Formatierung/Emoji-Aufzählungen, Untertitel, CamelCase-Hashtags, verständliche Sprache.

### Gate 4 — Security-Redline (CISO; obligatorisch bei P9, P11, IR-Bezug; stichprobenartig sonst)
- [ ] Keine Informationen, die Angriffe erleichtern: keine Exploit-Details, keine Schritt-für-Schritt-Offensivtechniken, keine Anleitungen für Angriffs-Tools, keine ungefixten Schwachstellen Dritter
- [ ] Keine Details über interne CYSPA- oder Kunden-Infrastruktur (Produkte im Einsatz, Hostnamen, Tenant-Kennungen, Netzpläne)
- [ ] Screenshots/Fotos geprüft: keine sichtbaren Zugangsdaten, Badges, QR-Codes, Bildschirme, Whiteboards
- [ ] Kein Bezug zu laufenden Vorfällen, aus dem Betroffene oder Ermittlungsstände ableitbar sind

---

## 3. Freigabematrix

| Beitragstyp | Fachreview | Legal | Accessibility | Security-Redline | Finale Freigabe |
|--------------|:---:|:---:|:---:|:---:|:---:|
| Standard-Post (P1, P4, P5, P7, P10) | ✔ | ✔ | ✔ | Stichprobe | Head of Content |
| Haftung/Regulatorik (P3, P6) | ✔ (GRC bzw. Regulatory) | ✔ verstärkt | ✔ | – | Head of Content |
| Offensive Security (P9) | ✔ (Pentest-Owner) | ✔ | ✔ | ✔ obligatorisch | Head of Content + CISO |
| Events/Team (P11) | – | ✔ (Einwilligungen) | ✔ | ✔ (OPSEC) | Head of Content |
| Whitepaper/Tabletop (P12) | ✔ (IR + GRC) | ✔ | ✔ | ✔ bei IR-Inhalten | Head of Content |
| Posts zu realen Vorfällen (Newsjacking) | ✔ CISO | ✔ | ✔ | ✔ | Geschäftsführung |

---

## 4. Sonderregeln

### 4.1 Newsjacking / aktuelle Vorfälle
Beiträge zu öffentlich bekannten Sicherheitsvorfällen sind erlaubt, wenn:
1. der Vorfall aus mindestens zwei verlässlichen Quellen bestätigt ist (keine Spekulation über Täter oder Ursachen),
2. der Beitrag eine Lehre für die Zielgruppe formuliert (nicht nur berichtet),
3. respektvoll über das betroffene Unternehmen gesprochen wird («Das kann jeden treffen»-Haltung, kein Spott, keine Belehrung des Opfers),
4. kein CYSPA-Verkaufsangebot direkt an den Vorfall gekoppelt wird (kein Ambulance Chasing).

### 4.2 Posting-Stopp (Incident-Regel)
Der Incident Response Specialist oder CISO kann jederzeit einen Posting-Stopp auslösen:
- bei einem laufenden, öffentlich sichtbaren Grossvorfall in der Schweiz mit unklarer Lage (Pietät/Timing),
- bei einem Sicherheitsvorfall bei CYSPA selbst oder einem erkennbaren Kunden — dann gilt: **keine reguläre Content-Publikation**, Kommunikation ausschliesslich über den Krisenkommunikations-Prozess der Geschäftsführung.
Geplante Posts werden verschoben, nicht gelöscht.

### 4.3 Kommentar- und DM-Umgang
- Fachliche Kritik: sachlich beantworten, Fehler transparent korrigieren (Korrektur im Post-Text mit «Update:» kennzeichnen, nicht stillschweigend).
- Trolle/Provokation: einmal sachlich, danach nicht weiter füttern; Beleidigungen melden/verbergen.
- Support-/Vorfallsanfragen in Kommentaren («wir wurden gehackt»): sofort in DM/Telefon überführen, keine Details öffentlich.
- **Vertrauliches gehört nie in LinkedIn-DMs:** keine Vorfalldetails, keine Zugangsdaten — Übergabe an E-Mail/Telefon (info@cyspa.ch, +41 41 521 61 61).

### 4.4 Mitarbeitenden-Guidelines (Reshare/Eigenposts)
- Freiwilligkeit; kein Reshare-Zwang, keine Like-Quoten.
- Empfehlung: Reshare mit eigenem Satz («Was ich daraus mitnehme …») statt nacktem Reshare.
- Eigene Fachposts willkommen; bei Kunden-, Vorfalls- oder Offensive-Bezug gelten die Gates 2 und 4 sinngemäss — im Zweifel vorher Head of Content fragen.
- Private Meinung bleibt privat gekennzeichnet; keine vertraulichen Projektinformationen.

### 4.5 KI-Einsatz in der Content-Erstellung
- KI-gestützte Entwürfe sind erlaubt; Verantwortung für Fakten trägt immer der menschliche Fach-Owner (Gate 1 ist durch KI nicht ersetzbar).
- Keine Kundendaten oder vertraulichen Informationen in externe KI-Tools (die eigene Shadow-AI-Regel gilt zuerst für uns).
- KI-generierte Bilder: keine fotorealistischen Menschendarstellungen als vermeintliche Team-/Kundenfotos; Stilgrafiken sind ok, wenn CI-konform.
