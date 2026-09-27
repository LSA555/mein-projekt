# Ein starkes Passwort schützt nicht auf der falschen Seite

## Steckbrief
| Feld | Wert |
|------|------|
| Slot | Dienstag, 20.10.2026, 08:15 Uhr |
| Pfeiler / Serie | P1 — QUICK TIP |
| Format | Textpost + Single Graphic (1200×1500, 4 Schritte) |
| Zielgruppe | primär Technology Leadership (CIO, IT-Leitung), sekundär Technical; KMU und Mid-Market |
| Ziel(e) | A (Expertise) |
| Erkenntnisgewinn | Die Leserin weiss, dass Passkeys vor Echtzeit-Phishing schützen, weil der Schlüssel an die echte Webadresse gebunden ist und nie an die Website geht, und kennt die vier Schritte dorthin. |
| CTA-Typ | Dialog («Welcher der vier Schritte ist bei Ihnen der schwierigste?») |
| Herkunft | Geprüfter Entwurf NGL-20260927-6124b9, Runde 3 (83/90), Restpunkte in dieser Fassung abgearbeitet (siehe Gate-Vermerke) |
| Status | Draft — Vorprüfung durch KI, bereit für Fachreview |

## Post-Text (copy-paste-fertig)

```text
Ein starkes Passwort schützt nicht, wenn Sie es auf der falschen Seite eintippen.
Genau dort setzen Passkeys an.

Zwei Wege, wie Angreifer an Konten kommen, ohne ein Passwort zu knacken:

→ Wiederverwendung: Ein privates Konto wird geleakt. Skripte probieren dieselben Zugangsdaten automatisch auf Firmenportalen aus.
→ Echtzeit-Phishing: Eine täuschend echte Anmeldeseite reicht Passwort und Code sofort an die echte Website weiter. Auch SMS-Codes und einfache Push-Bestätigungen schützen dann nicht.

Passkeys sind Anmeldeschlüssel statt Passwörter. Sie beruhen auf FIDO2, einem offenen Standard von FIDO Alliance und W3C.

Ihr Gerät meldet Sie mit einem geheimen Schlüssel an, den die Website nie zu sehen bekommt.
Der Schlüssel ist an die echte Webadresse gebunden.
Eine gefälschte Seite erhält nichts, das sie weiterreichen könnte.

Fingerabdruck oder Gesicht entsperren nur den Schlüssel auf Ihrem Gerät. Übertragen werden sie nicht.

Gegen wiederverwendete Passwörter wirkt das erst ganz, wenn Passwort-Logins abgeschaltet sind. Wir empfehlen deshalb diese Reihenfolge:

1. Ein eigenes Passwort pro Konto, ohne Ausnahme.
2. Passwort-Manager für alle Mitarbeitenden.
3. Phishing-resistente Multi-Faktor-Authentifizierung (MFA): etwa Sicherheitsschlüssel, die nur auf der echten Webadresse funktionieren. Zuerst für die Admin-Konten.
4. Passkeys für alle einführen und Passwort-Logins schrittweise abschalten.

Schritt 1 und 2 lassen sich ohne grosses Projekt starten.

Was man nicht eintippen kann, kann auch keine gefälschte Seite abgreifen.

Welcher der vier Schritte ist bei Ihnen der schwierigste?

#CYSPA #Passkeys #CyberSecurity #KMU
```

Länge: 1'645 Zeichen (Korridor 900–1'800 ✔). Hook (erste zwei Zeilen) 112 Zeichen ✔.

## Erster Kommentar
Keiner nötig (Dialog-CTA, kein Link). Für Gesprächsanfragen aus Kommentaren gilt der Tracking-Link aus dem Entwurf: `https://www.cyspa.ch/?utm_source=linkedin&utm_medium=organic&utm_campaign=passwordless-2026-10` (Kampagnenmonat von 09 auf 10 angepasst, da der Slot im Oktober liegt).

## Visual-Briefing
- **Format:** Single Graphic 1200×1500 px, Deep Space Blue, Serien-Badge `QUICK TIP`, Cyan nur als Akzentlinie und Nummernrahmen.
- **Headline (Montserrat Bold):** «Was man nicht eintippen kann, kann auch keine gefälschte Seite abgreifen.» (identisch mit dem Merksatz im Post)
- **Unterzeile:** «Der Weg zu Passkeys in vier Schritten»
- **Liste 1–4** mit Nummern-Chips, Inhalt identisch mit den vier Schritten im Post (gekürzt).
- **Merksatz-Zeile:** «Schritt 1 und 2 lassen sich ohne grosses Projekt starten.»
- Logo auf weisser Plakette unten rechts, www.cyspa.ch unten links.
- **Datei:** `cyspa-marketing/linkedin/assets-neu/2026-10-20-p01-passwordless/2026-10-20-p01-passwordless.png` (visuell geprüft: Text lesbar, kein Überlauf, Cyan nur Akzent).

## Alt-Text
«Grafik von CYSPA, Serie Quick Tip. Titel: Was man nicht eintippen kann, kann auch keine gefälschte Seite abgreifen. Der Weg zu Passkeys in vier Schritten: 1. Ein eigenes Passwort pro Konto, ohne Ausnahme. 2. Passwort-Manager für alle Mitarbeitenden. 3. Phishing-resistente MFA, zuerst für Admin-Konten. 4. Passkeys für alle, Passwort-Logins schrittweise abschalten. Hinweis: Schritt 1 und 2 lassen sich ohne grosses Projekt starten.»

## Quellen und Kennzeichnung

Abrufdatum aller Quellen: 27.09.2026. Die Web-Adressen von owasp.org, w3.org, cisa.gov, fidoalliance.org und ncsc.admin.ch sind in der Arbeitsumgebung weiterhin gesperrt. Deshalb wurden, wo möglich, die offiziellen Quelltext-Repositories der Herausgeber auf GitHub gelesen. Das ist inhaltlich die Primärquelle, aber nicht die publizierte Webseite; der Fachreview gleicht bei Bedarf mit der publizierten Fassung ab.

| # | Aussage im Post | Quelle | Kennzeichnung |
|---|---|---|---|
| F1 | Geleakte Zugangsdaten werden automatisiert auf anderen Diensten ausprobiert (Credential Stuffing) | OWASP, «Credential stuffing», Quelltext der Seite https://owasp.org/www-community/attacks/Credential_stuffing im Repository github.com/OWASP/www-community (Datei pages/attacks/Credential_stuffing.md). Kernzitat: «Credential stuffing is the automated injection of stolen username and password pairs ("credentials") in to website login forms» | VERIFIED (Quelltext gelesen) |
| F2 | Echtzeit-Phishing reicht Passwort und Code weiter; SMS-Codes und einfache Push-Verfahren sind nicht phishing-resistent | (a) NIST SP 800-63B-4 (August 2025), Abschnitt «Phishing Resistance», gelesen im offiziellen Repository github.com/usnistgov/800-63-4 (sp800-63b.html; offizielle Fassung https://doi.org/10.6028/NIST.SP.800-63b-4). Kernzitat: «Authenticators that involve the manual entry of an authenticator output (e.g., out-of-band and OTP authenticators) SHALL NOT be considered phishing-resistant […] an impostor verifier could relay an authenticator output to the verifier». (b) Microsoft Learn, «Authentication strengths» (ms.date 04.03.2025), Quelltext github.com/MicrosoftDocs/entra-docs: In der eingebauten Stärke «Phishing-resistant MFA» sind nur Windows Hello for Business/Platform Credential, FIDO2-Sicherheitsschlüssel und zertifikatsbasierte MFA enthalten; SMS und Push («something the user has: text message, voice, push notification …») nicht. | VERIFIED |
| F2b | (ursprünglich) CISA Fact Sheet «Implementing Phishing-Resistant MFA», Okt. 2022 | https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf | nicht abgerufen (gesperrt). Nicht mehr tragend, da F2 durch NIST und Microsoft belegt ist. |
| F3 | Passkeys beruhen auf FIDO2 (FIDO Alliance, W3C); der geheime Schlüssel wird der Website nie gezeigt | (a) W3C, «Web Authentication: An API for accessing Public Key Credentials – Level 3», Quelltext index.bs im Repository github.com/w3c/webauthn (Branch main). Kernzitat: «The credential private key is bound to a particular authenticator […] and is expected to never be exposed to any other party». Passkey ist dort als «client-side discoverable credential» definiert; die Spezifikation verweist für das Geräteprotokoll auf [FIDO-CTAP] der FIDO Alliance. (b) Microsoft Learn, «Passkeys (FIDO2) authentication method», entra-docs: «Passkeys (FIDO2) follow FIDO2 standards, using WebAuthn for browsers and CTAP for authenticator communication.» | VERIFIED |
| F4 | Der Schlüssel ist an die echte Webadresse gebunden; eine gefälschte Seite erhält nichts Verwertbares | W3C WebAuthn Level 3 (wie F3), Abschnitt zum Sicherheitsmodell: «ensures that all operations are scoped to a particular origin, and cannot be replayed against a different origin». Ergänzend Microsoft Learn (wie F3b): «an authenticator only releases secrets to the Relying Party (RP) the passkey was registered with and not an attacker pretending to be that RP.» | VERIFIED |
| F5 | Fingerabdruck oder Gesicht entsperren nur lokal und werden nicht übertragen | W3C WebAuthn Level 3 (wie F3), Datenschutzabschnitt Biometrie: «Biometric data is not revealed to the WebAuthn Relying Party; it is used only locally to perform user verification» | VERIFIED |
| F6 | Reihenfolge der vier Schritte | CYSPA-Empfehlung auf Basis der internen Lunch-&-Learn-Roadmap; «zuerst für die Admin-Konten» ist CYSPA-Priorisierung. Im Post als Empfehlung gekennzeichnet («Wir empfehlen»). | Einschätzung CYSPA, keine Faktenbehauptung |
| F7 | Phishing-resistente MFA funktioniert nur auf der echten Webadresse (z. B. FIDO2-Sicherheitsschlüssel) | NIST SP 800-63B-4 (wie F2a): phishing resistance über «channel binding» oder «verifier name binding»; Microsoft Learn (wie F2b): FIDO2-Sicherheitsschlüssel in «Phishing-resistant MFA strength» | VERIFIED |
| CH | Schweizer Einordnung (Restpunkt 2 aus Runde 3) | NCSC/BACS, «Technologiebetrachtung Passkeys» (PDF, 09.01.2025), gelistet auf https://www.ncsc.admin.ch/ncsc/en/home/dokumentation/technologiebetrachtung.html | REPORTED (per Websuche am 27.09.2026 gefunden, Dokument nicht selbst gelesen, Domain gesperrt). Nicht im Post zitiert; Fachreview kann es als Beleg im Kommentar ergänzen. |

**Bewusst weggelassen:** Kundennamen und Kundenzahlen, Mengenaussagen («die meisten», Prozentwerte), «100 % phishing-resistent», Medienfälle, die Aussage «verlässt Ihr Gerät nie» (bei synchronisierten Passkeys nicht zutreffend).

## Quality-Gate-Vermerke
- **Vorprüfung KI (27.09.2026):** Restpunkte aus Prüfprotokoll Runde 3 bearbeitet: (1) Schritt 3 präzisiert wie vorgeschlagen ✔; (2) Schweizer Quelle als REPORTED ergänzt, Abruf offen; (3) Steckbrief Ziel A + CTA-Typ Dialog angeglichen ✔; (4) Arbeitsvermerke entfernt, Faktenliste F1–F7 geordnet ✔; (5) Kürzung bewusst nicht vorgenommen, um den geprüften Wortlaut nicht zu verändern. Muss-Kriterium M1 (Quellen): F1–F5 und F7 jetzt über Primärquellen-Quelltext selbst gelesen.
- **Fachreview (Owner P1: Cyber Resilience Specialist; Mitprüfung Microsoft Security Specialist für F2b/F3b):** offen. Bitte prüfen: (a) ob der Abgleich mit der publizierten Fassung von w3.org/owasp.org nötig ist; (b) Themennähe zu #01 «MFA ist nicht gleich MFA» vom 08.09. — Echtzeit-Phishing und «Passkeys, Start bei Admins» kommen dort auch vor. Unterschied hier: Passwort-Wiederverwendung und das Abschalten von Passwort-Logins. Wenn das nicht reicht, den Echtzeit-Phishing-Absatz kürzen.
- **Legal:** offen. Keine Kundennamen, keine Superlative, keine Herstellerkritik ✔. Produkt- und Standardnamen rein beschreibend.
- **Accessibility:** offen. Visual-Inhalt steht vollständig im Post ✔; Alt-Text vorhanden ✔; Hashtags CamelCase ✔; keine Emojis, Pfeile als Listenzeichen ✔; MFA beim ersten Auftreten ausgeschrieben ✔.
- **Security-Redline:** Stichprobe; defensive Inhalte, keine Angriffsanleitung ✔.
