# Gastkonten in Entra ID: 5 Prüfpunkte

## Steckbrief
| Feld | Wert |
|------|------|
| Slot | Dienstag, 27.10.2026, 08:15 Uhr |
| Pfeiler / Serie | P5 — MICROSOFT SECURITY PRAXIS |
| Format | Carousel (6 Slides, PDF-Dokument-Post) |
| Zielgruppe | primär Technical (Microsoft/System Engineers, M365-Admins), sekundär Technology Leadership; KMU und Mid-Market |
| Ziel(e) | A (Expertise), C (informieren) |
| Erkenntnisgewinn | Die Leserin weiss, dass in Entra ID standardmässig alle Benutzer (auch Gäste) Gäste einladen dürfen, und kennt fünf Einstellungen und Routinen, mit denen sie Gastkonten sichtbar, begrenzt und verantwortet macht. |
| Backlog-Thema | P5: «M365-Datenfreigaben: anonyme Links, Gast-Zugriffe, Teams-Wildwuchs im Griff» (Teilaspekt Gast-Zugriffe) |
| CTA-Typ | Selbstcheck im eigenen Tenant |
| Status | Draft — Vorprüfung durch KI, bereit für Fachreview |

## Post-Text (copy-paste-fertig)

```text
In Microsoft Entra ID dürfen standardmässig alle Benutzer Gäste einladen. Auch Gäste.

Für die Zusammenarbeit ist das bequem. Es heisst aber auch: Ohne Anpassung entscheidet niemand zentral, wer von aussen Zugriff bekommt. Und ein Gastkonto bleibt bestehen, bis jemand es entfernt.

Fünf Prüfpunkte für Ihren Tenant:

1. Gäste sichtbar machen
Benutzerliste im Entra Admin Center nach Benutzertyp «Guest» filtern und die Spalte «Last interactive sign-in time» einblenden. Jedes Konto ohne Anmeldung seit Monaten braucht einen Entscheid: behalten oder entfernen.

2. Einladen eingrenzen
Unter External collaboration settings › Guest invite settings festlegen, wer einladen darf. Für Fachbereiche, die regelmässig mit Externen arbeiten, gibt es die Rolle Guest Inviter, ohne weitere Admin-Rechte.

3. Sicht der Gäste begrenzen
Standard ist «limited access»: Gäste können zum Beispiel keine Benutzer und Gruppen auflisten. Die strengste Stufe zeigt Gästen nur ihr eigenes Profil. Vor der Umstellung prüfen, ob Ihre Zusammenarbeit weiter funktioniert.

4. Verantwortung festhalten
Wer einlädt, wird standardmässig Sponsor des Gasts. Pflegen Sie das Sponsor-Feld, damit für jedes Konto klar ist, wer über den weiteren Zugriff entscheidet.

5. Regelmässig bestätigen
Access Reviews lassen Gruppenbesitzer oder festgelegte Prüfer bestätigen, ob ein Gast noch Zugriff braucht. Dafür ist Microsoft Entra ID Governance nötig, einzelne Funktionen laufen mit Entra ID P2. Ohne diese Lizenz: Gästeliste einmal pro Quartal exportieren und im IT-Meeting entscheiden.

Jeder Gast ist ein Zugang, dessen Identität jemand anderes verwaltet. Die Verantwortung für den Zugriff bleibt bei Ihnen.

Selbstcheck für diese Woche: Wie viele Gäste haben sich seit 90 Tagen nicht angemeldet?

#MicrosoftSecurity #EntraID #M365 #IdentitySecurity #CYSPA
```

Länge: 1'822 Zeichen (Technical-Post, Überschreitung des Korridors um 22 Zeichen vertretbar laut Styleguide §3 «Technical-Posts dürfen länger sein»). Hook 86 Zeichen ✔.

### Copy-Anpassungen CI v3

Geprüft am 27.09.2026 (Post-Text, erster Kommentar, Titel): kein Gedankenstrich im Satzfluss, «ss» statt «ß», keine Ausrufezeichen, Sie-Form, Zahlen nur mit Quelle.

| Stelle | alt | neu | Begründung |
|--------|-----|-----|------------|
| Post-Text und erster Kommentar | – | keine Änderung nötig | CI v3 Copy-Regel: keine Verstösse gefunden |

## Erster Kommentar
Keiner nötig.

## Visual-Briefing
- **Format (CI v3.0):** Tipp-Carousel, 6 Slides 1080×1350 px, als PDF-Dokument-Post (810×1012,5 pt, Raleway eingebettet, Textlayer). Das CI sieht 4 Slides vor; hier 6, weil fünf Prüfpunkte je eine Einstellung brauchen (Begründung im README `visuals-ci3/README.md`).
- **Eyebrow auf allen Slides:** `SECURITY4KMU` / `MICROSOFT SECURITY PRAXIS`. Pager «n / 6» unten links, `www.cyspa.ch` unten rechts.
- **Slide 1 (Cover, Navy-Verlauf mit Raster, Wortmarke CYSPA.ch):** Headline-Block «Wer darf in Ihrem Tenant» / «Gäste einladen?» mit Gold-Balken; darüber «Standard in Entra ID: alle Benutzer, auch Gäste. Fünf Prüfpunkte für Ihre Gastkonten.»
- **Slides 2–5 (weiss, Bildmarke):** Label «Prüfpunkt 1–4», Lead-Titel, Body, Kasten «Einstellung in Entra ID» mit `Last interactive sign-in time`, `Guest invite settings`, `Guest user access restrictions`, `Sponsors`. Texte wie bisher.
- **Slide 6 (CTA, Navy):** «Prüfpunkt 5: Regelmässig bestätigen» mit Body und Merksatz «Selbstcheck: Wie viele Gäste haben sich seit 90 Tagen nicht angemeldet?»
- **Dateien:** `cyspa-marketing/linkedin/visuals-ci3/15-gastkonten/` (2026-10-27-p05-gastkonten.pdf, slide-01…06.png; ersetzt die Dateien im alten Repo-CI unter `assets-neu/`; alle Slides visuell geprüft am 27.09.2026). PDF-Titel: «Gastkonten in Entra ID: 5 Prüfpunkte».

## Alt-Text
«Carousel von CYSPA, Serie Microsoft Security Praxis, über Gastkonten in Microsoft Entra ID, sechs Slides. Titel: Wer darf in Ihrem Tenant Gäste einladen? Standardmässig dürfen alle Benutzer, auch Gäste, Gäste einladen. Fünf Prüfpunkte: 1. Gäste sichtbar machen, Einstellung Last interactive sign-in time. 2. Einladen eingrenzen, Einstellung Guest invite settings und die Rolle Guest Inviter. 3. Sicht der Gäste begrenzen, Einstellung Guest user access restrictions. 4. Jeder Gast hat einen Sponsor, Einstellung Sponsors. 5. Regelmässig bestätigen mit Access Reviews oder einer Quartalsliste. Selbstcheck: Wie viele Gäste haben sich seit 90 Tagen nicht angemeldet? Alle Inhalte stehen auch im Beitragstext.»

## Quellen und Kennzeichnung

Alle Microsoft-Learn-Artikel wurden am 27.09.2026 im offiziellen Quelltext-Repository github.com/MicrosoftDocs/entra-docs (Stand Commit 902ee3b vom 25.09.2026) gelesen; learn.microsoft.com selbst ist in der Arbeitsumgebung gesperrt.

| # | Aussage im Post | Quelle | Kennzeichnung |
|---|---|---|---|
| G1 | Standardmässig dürfen alle Benutzer, auch Gäste, Gäste einladen | Microsoft Learn, «Configure external collaboration settings» (ms.date 24.04.2026), https://learn.microsoft.com/entra/external-id/external-collaboration-settings-configure : «By default, all users in your organization, including B2B collaboration guest users, can invite external users to B2B collaboration.» Gleichlautend in «B2B collaboration overview» (what-is-b2b) und «b2b-fundamentals». | VERIFIED |
| G2 | Einstellung «Guest invite settings», Rolle Guest Inviter ohne höhere Admin-Rolle | wie G1: «With the Guest Inviter role, you can give individual users the ability to invite guests without assigning them a higher privilege administrator role.» | VERIFIED |
| G3 | Standard «limited access», Gäste können keine Benutzer/Gruppen auflisten; strengste Stufe nur eigenes Profil | wie G1, Abschnitt «Guest user access»: «(Default) This setting blocks guests from certain directory tasks, like enumerating users, groups, or other directory resources» und «most restrictive […] guests can access only their own profiles» | VERIFIED |
| G4 | Wer einlädt, wird standardmässig Sponsor | Microsoft Learn, «Sponsors field for B2B users» (ms.date 24.04.2026): «When you invite a guest user, you become their sponsor by default.» | VERIFIED |
| G5 | Spalte «Last interactive sign-in time» in der Benutzerliste; Filter nach Datum | Microsoft Learn, «How to manage inactive user accounts» (ms.date 21.02.2025): «select + Add column, select Last interactive sign-in time». Hinweis dort: Abfrage per Graph (`lastSuccessfulSignInDateTime`) braucht Entra ID P1 oder P2. | VERIFIED |
| G6 | Access Reviews brauchen Entra ID Governance, einzelne Funktionen laufen mit P2 | Microsoft Learn, «What are access reviews?» (ms.date 12.03.2026), Lizenzabschnitt (Include entra-p2-governance-license): «This feature requires Microsoft Entra ID Governance or Microsoft Entra Suite subscriptions […] Some capabilities […] may operate with a Microsoft Entra ID P2 subscription.» | VERIFIED |
| G7 | «Ein Gastkonto bleibt bestehen, bis jemand es entfernt» | Ableitung: Entra ID kennt ohne Access Reviews oder Lifecycle Workflows keinen automatischen Ablauf von Gastkonten; Microsoft nennt in «What are access reviews?» ausdrücklich eingeladene Gäste, «that haven't been removed». | Einschätzung CYSPA auf Basis G6, Fachreview bestätigt |
| G8 | Portal-Pfad und englische Einstellungsnamen | wie G1/G5; Portal-Beschriftungen können sich ändern | VERIFIED für Stand der Dokumentation; Fachreview prüft im Portal |
| – | Quartalsliste als Ersatz, 90-Tage-Schwelle im Selbstcheck | CYSPA-Empfehlung (Schwelle ist eine Arbeitsgrösse, keine Microsoft-Vorgabe) | Einschätzung CYSPA |

**Bewusst weggelassen:** SharePoint-/OneDrive-Freigabelinks («Anyone links») — die Microsoft-Dokumentation dazu war nicht erreichbar (Repository nicht öffentlich, learn.microsoft.com gesperrt); Kandidat für einen Folgepost. Keine Aussagen über Häufigkeiten verwaister Gastkonten.

## Quality-Gate-Vermerke
- **Nachbesserung nach Prüfrunde 1 (27.09.2026):** Slide 2 auf die Portal-Bezeichnung vereinheitlicht («Benutzertyp «Guest»», wie im Post), mit chromium_headless_shell neu gerendert (PNG + PDF), visuell und auf weissen Rand geprüft.
- **Vorprüfung KI (27.09.2026):** Alle technischen Kernaussagen gegen Microsoft-Dokumentation belegt ✔. Lizenzrealität benannt (P5-Qualitätsmassstab) ✔. Keine Herstellerkritik ✔.
- **Fachreview (Owner P5: Microsoft Security Specialist):** offen. Prüfen: aktueller Portal-Pfad und Spaltenname im Entra Admin Center; ob die strengste Gast-Stufe bekannte Einschränkungen in Teams/SharePoint hat, die im Post konkreter benannt werden sollten; Lizenzformulierung Access Reviews.
- **Legal:** offen. Produktnamen beschreibend, keine Herabsetzung ✔.
- **Accessibility:** offen. Slide-Inhalte im Post-Text redundant ✔; JetBrains-Mono-Begriffe im Alt-Text ausgeschrieben ✔; PDF mit echtem Textlayer ✔.
- **Security-Redline:** Stichprobe; defensive Konfiguration, keine Tenant-Kennungen ✔.
