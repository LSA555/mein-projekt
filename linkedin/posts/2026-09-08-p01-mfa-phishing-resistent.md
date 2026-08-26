# MFA ist nicht gleich MFA — 5 Massnahmen

## Steckbrief
| Feld | Wert |
|------|------|
| Slot | Dienstag, 08.09.2026, 08:15 Uhr |
| Pfeiler / Serie | P1 — QUICK TIP |
| Format | Carousel (7 Slides, PDF-Dokument-Post) |
| Zielgruppe | primär Technical, sekundär Technology Leadership; KMU/Mid-Market |
| Ziel(e) | A (Expertise), C (informieren) |
| Erkenntnisgewinn | Die Leserin weiss, dass klassische Push-MFA durch Echtzeit-Phishing und MFA-Fatigue umgangen wird — und kennt die 5 Härtungsschritte in der richtigen Reihenfolge. |
| CTA-Typ | Selbstcheck |
| Status | Draft — bereit für Fachreview |

## Post-Text (copy-paste-fertig)

```text
MFA ist Pflicht. Aber MFA ist nicht gleich MFA.

Angreifer brechen heute keine Verschlüsselung. Sie umgehen den zweiten Faktor, indem sie Menschen täuschen:

→ MFA-Fatigue: Push-Anfragen im Minutentakt, bis jemand entnervt «Genehmigen» tippt.
→ Echtzeit-Phishing: Eine gefälschte Login-Seite reicht Passwort und Code direkt an die echte weiter. Die Anmeldung funktioniert — nur eben für den Angreifer.

Beide Techniken hebeln klassische Push- und Code-Verfahren aus. Deshalb zählt nicht, OB Sie MFA haben, sondern WELCHE.

5 Massnahmen in sinnvoller Reihenfolge:

1. Einfache Push-Bestätigung ersetzen: Number Matching aktivieren — blindes Bestätigen fällt weg.

2. Phishing-resistente Verfahren einführen: Passkeys bzw. FIDO2. Der Schlüssel funktioniert nur auf der echten Domain — eine Fälschung geht ins Leere. Start: Admin-Konten.

3. Legacy-Protokolle abschalten (IMAP/POP/SMTP Basic Auth). Sie umgehen MFA komplett und sind ein beliebtes Einfallstor.

4. MFA auf ALLE Zugänge ausweiten: VPN, Firewall-Admin, Fernwartung, Hosting-Portale — nicht nur Microsoft 365.

5. Notfallkonten (Break Glass) definieren, vom Regelwerk ausnehmen und jede Nutzung alarmieren.

Merksatz: Entscheidend ist nicht, wie stark der zweite Faktor ist — sondern ob er sich phishen lässt.

Wie viele der fünf Punkte sind bei Ihnen umgesetzt? Die Antwort ist Ihre To-do-Liste für diese Woche.

#CyberSecurity #MFA #Passkeys #KMU #CYSPA
```

## Erster Kommentar
Keiner nötig (kein Link-CTA).

## Visual-Briefing
- **Format:** 7 Slides, 1080×1350 px, Deep Space Blue `#0A1F44`, Text Signal White, Cyan-Akzentlinie unter Titel, Serien-Badge `QUICK TIP` oben links.
- **Slide 1 (Hook):** «MFA ist nicht gleich MFA.» gross (Montserrat Bold), darunter klein: «5 Massnahmen gegen Phishing & MFA-Fatigue». Pfeil-Hinweis auf Weiterblättern.
- **Slide 2 (Problem):** Zweiteilig: «MFA-Fatigue» / «Echtzeit-Phishing» mit je einem Satz; einfaches Icon-Schema (Push-Flut / Weiterleitungs-Pfeil über gefälschte Seite). Keine Angriffsanleitung, nur Mechanik-Schema.
- **Slides 3–7:** Je eine Massnahme, Nummer gross in Montserrat Bold mit Cyan-Rahmen, max. 30 Wörter, Einstellungsbegriffe (z.B. «Number Matching») in JetBrains Mono.
- **Slide 7 zusätzlich (CTA-Zone unten):** Merksatz + Logo + www.cyspa.ch.

## Alt-Text
«Carousel von CYSPA, Serie Quick Tip: MFA ist nicht gleich MFA. Erklärt, warum MFA-Fatigue und Echtzeit-Phishing klassische Push- und Code-Verfahren umgehen, und zeigt fünf Massnahmen: Number Matching aktivieren, Passkeys/FIDO2 einführen, Legacy-Protokolle abschalten, MFA auf alle Zugänge ausweiten, Notfallkonten definieren und überwachen. Alle Inhalte stehen auch im Beitragstext.»

## Quality-Gate-Vermerke
- Fachreview (Microsoft Security Specialist + Resilience): offen. Prüfen: aktueller Stand der Entra-ID-Terminologie (Number Matching ist bei Microsoft Authenticator Standard), Formulierung «Passkeys bzw. FIDO2» für Zielgruppe ok.
- Legal: offen. Keine Kunden-/Herstellerkritik, keine Statistiken — unkritisch.
- Accessibility: offen. Carousel-Inhalte im Post-Text redundant ✔, Alt-Text vorhanden ✔, CamelCase-Hashtags ✔.
- Security-Redline: ok (Stichprobe empfohlen): Angriffe nur als Mechanik benannt, keine Tools, keine Schritt-für-Schritt-Anleitung.
