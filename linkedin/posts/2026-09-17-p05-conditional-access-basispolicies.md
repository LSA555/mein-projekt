# Conditional Access: 3 Basis-Policies + die Report-only-Falle

## Steckbrief
| Feld | Wert |
|------|------|
| Slot | Donnerstag, 17.09.2026, 08:15 Uhr |
| Pfeiler / Serie | P5 — MICROSOFT SECURITY PRAXIS |
| Format | Carousel (6 Slides, PDF-Dokument-Post) |
| Zielgruppe | primär Technical (Microsoft/System Engineers), sekundär Technology Leadership |
| Ziel(e) | A, C |
| Erkenntnisgewinn | Die Leserin kennt die drei Conditional-Access-Policies, die jede Entra-ID-Umgebung braucht, das saubere Einführungsvorgehen über Report-only — und den typischen Fehler, Report-only nie zu verlassen. |
| CTA-Typ | Selbstcheck im eigenen Tenant |
| Status | Draft — bereit für Fachreview |

## Post-Text (copy-paste-fertig)

```text
Die teuerste Conditional-Access-Policy ist die, die seit Monaten auf «Report-only» steht.

Sie sieht im Portal aus wie Schutz. Sie schützt nichts.

Report-only ist ein hervorragendes Werkzeug: Man sieht, was eine Policy blockieren WÜRDE, ohne jemanden auszusperren. Aber es ist ein Einführungsmodus, kein Betriebsmodus. In der Praxis sehen wir Umgebungen, in denen genau die wichtigsten Policies dort vergessen gingen.

Die drei Policies, die jede Entra-ID-Umgebung braucht:

1. MFA für alle Benutzer — nicht nur für Administratoren. Ausnahmen sind einzeln begründet, nicht historisch gewachsen.

2. Legacy-Authentifizierung blockieren. Alte Protokolle kennen kein MFA — solange sie offen sind, laufen Ihre übrigen Regeln ins Leere. Vorher in den Sign-in-Logs prüfen, was noch darüber läuft.

3. Verschärfte Anforderungen für Admin-Rollen: phishing-resistente MFA (Passkey/FIDO2) und keine Anmeldung von nicht verwalteten Geräten.

Und das Handwerk drumherum:

→ Notfallkonten (Break Glass) von allen Policies ausnehmen — und jede Anmeldung dieser Konten alarmieren.
→ Neue Policy: erst Report-only, Auswirkungen prüfen (auch mit dem What-If-Tool), dann aktivieren. Mit Termin im Kalender — sonst bleibt Report-only für immer.
→ Kleinstumgebung ohne Entra ID P1? Dann Security Defaults aktivieren. Weniger granular, aber deutlich besser als nichts.

Selbstcheck für heute: Öffnen Sie Ihre Policy-Liste und sortieren Sie nach Status. Jede Zeile mit «Report-only», die älter als 30 Tage ist, verdient eine Entscheidung: aktivieren oder löschen.

#MicrosoftSecurity #EntraID #ConditionalAccess #M365 #CYSPA
```

## Erster Kommentar
Keiner nötig.

## Visual-Briefing
- **Format:** 6 Slides, 1080×1350 px, Deep Space Blue, Serien-Badge `MICROSOFT SECURITY PRAXIS`.
- **Slide 1 (Hook):** «Die teuerste CA-Policy? Die auf Report-only vergessene.» (Montserrat Bold)
- **Slide 2:** Report-only erklärt: Einführungsmodus ≠ Betriebsmodus (Zweispalter mit Cyan-Trennlinie).
- **Slides 3–5:** Je eine Basis-Policy; Policy-Namen und Begriffe (`Block legacy authentication`, `Require MFA`, `Require phishing-resistant MFA`) in JetBrains Mono auf Card-Fläche `#1D2535`.
- **Slide 6 (CTA):** Selbstcheck-Anleitung in 2 Zeilen + Logo + www.cyspa.ch.

## Alt-Text
«Carousel von CYSPA, Serie Microsoft Security Praxis, über Conditional Access in Microsoft Entra ID: Report-only ist ein Einführungs-, kein Betriebsmodus. Drei Basis-Policies: MFA für alle Benutzer, Blockieren der Legacy-Authentifizierung, verschärfte Anforderungen für Admin-Rollen mit phishing-resistenter MFA. Dazu Notfallkonten ausnehmen und überwachen. Alle Inhalte stehen auch im Beitragstext.»

## Quality-Gate-Vermerke
- Fachreview (Microsoft Security Specialist): offen. Prüfen: Aktueller Stand Microsoft-managed Policies / Security Defaults, Lizenzgrenzen (P1 für CA) korrekt benannt, Terminologie im Portal.
- Legal: offen. Produktbezug rein beschreibend, keine Herstellerkritik ✔.
- Accessibility: offen. Slide-Inhalte im Text redundant ✔; JetBrains-Mono-Begriffe im Alt-Text ausgeschrieben ✔.
- Security-Redline: n/a (defensive Konfiguration).
