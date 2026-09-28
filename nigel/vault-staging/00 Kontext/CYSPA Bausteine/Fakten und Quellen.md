---
tags: [cyspa, fakten, quellen, regulatorik, faktencheck, referenz]
status: aktiv, vor jeder Verwendung Gültigkeit prüfen
date: 2026-09-28
source: "claude, abgeleitet aus linkedin/freigabe/2026-09-29-07-nis2-schweizer-unternehmen.md (F1 bis F9), 2026-10-08-10-tabletop-uebung.md, 2026-10-13-11-harvest-now-decrypt-later.md, linkedin/posts-neu/*.md, nigel/vault-staging/06 Meetings/Check-in/2026-09-28 Cyber Security Briefing GL.md, web/sicherheits-check/README.md, QA-Protokolle KW 40"
chat_url: "https://claude.ai/code/session_01JsQoSQbozeyt2EYitpEXuf"
---

# Fakten und Quellen

Mehrfach verwendete Fakten mit Kennzeichnung. **Nichts hier ist neu recherchiert.** Status und Abrufdatum stammen aus den Faktenchecks der Quelldateien.

**Kennzeichnung**
- `VERIFIED`: Primärquelle bzw. offizieller Datensatz oder offizieller Quelltext selbst gelesen.
- `REPORTED`: aus Suchergebnissen oder Sekundärquellen; Primärquelle war gesperrt (admin.ch, fedlex, bacs, nist.gov, cisa.gov, w3.org, owasp.org, learn.microsoft.com, cyspa.ch; Stand 27.09.2026).
- `INFERRED`: eigene Schlussfolgerung, auch jede daraus abgeleitete **Frist**.
- Nur-Suchtreffer sind **nie** `VERIFIED`. Eine REPORTED-Aussage darf in einen Post nur mit Fach-OK (Gate 1, §4.5) und nie an Kunden ohne Bestätigung an der Originalquelle.

## 1. Schweiz: ISG-Meldepflicht

| # | Fakt | Status | Quelle, Abruf | Verwendet in | Gültigkeit |
|---|---|---|---|---|---|
| CH1 | Meldepflicht für Cyberangriffe auf kritische Infrastrukturen in Kraft seit **1. April 2025** | REPORTED | bacs.admin.ch/de/meldepflicht (gesperrt, via Suchergebnis); infosec.ch, sits.com; Abruf 27.09.2026 | #07 Post und Visual, #10 Faktencheck, Webseite 2.6 (6 Nennungen, 4 Dateien) | Stichtag fix; Wortlaut vor Verwendung erneut prüfen ab 01.01.2027 |
| CH2 | Frist **24 Stunden** nach Entdeckung an das BACS; Ergänzung innert 14 Tagen möglich | REPORTED | wie CH1; Primärtext ISG Art. 74a ff., fedlex.admin.ch/eli/cc/2022/232/de (gesperrt) | #07 Post und Visual, #10 | vor Verwendung erneut prüfen ab 01.01.2027 oder bei Revision ISG/CSV |
| CH3 | **Sanktionen** (Busse bis CHF 100'000, Art. 74h ISG) erst seit **1. Oktober 2025** | REPORTED | Suchergebnis SITS, Abruf 27.09.2026 | nur Faktenchecks #07, #10 (nicht im Post) | vor Verwendung erneut prüfen, Betrag an Primärquelle bestätigen |
| CH4 | Meldepflichtig sind nur Angriffe, die die ISG-Kriterien erfüllen (z. B. Gefährdung der Funktionsfähigkeit, Erpressung). Formulierung «meldepflichtige Cyberangriffe» ist präziser | REPORTED | Hinweis Faktencheck #07 | #07 | mit CH1 |
| CH5 | revDSG Art. 24: Verletzungen der Datensicherheit mit voraussichtlich hohem Risiko «so rasch als möglich» an den EDÖB, **keine feste Stundenfrist** | REPORTED | datenschutzpartner.ch/dsg/dsg-24, datenschutz.law; EDÖB-Leitfaden gesperrt; Abruf 27.09.2026 | #10 Faktencheck | vor Verwendung erneut prüfen ab 01.01.2027 |

**Standardformulierung (#07, geprüft):** «Betreiber kritischer Infrastrukturen melden Cyberangriffe seit dem 1. April 2025 innert 24 Stunden dem Bundesamt für Cybersicherheit (BACS). So verlangt es das Informationssicherheitsgesetz.»

## 2. BACS-Aussagen

| # | Fakt | Status | Quelle | Verwendet in | Gültigkeit |
|---|---|---|---|---|---|
| B1 | BACS meldet mehr Phishing gegen Microsoft-365-Konten, danach Versand weiterer Betrugsmails | REPORTED | bacs.admin.ch/de/aktuelle-vorfaelle (Websuche 27.09.2026, nicht geöffnet) | Cyber Briefing KW 40 | nur bis Bestätigung, Frist Massnahme 02.10.2026 |
| B2 | BACS meldet mehr kompromittierte Schweizer Webseiten, die Schadsoftware verteilen | REPORTED | wie B1 | Cyber Briefing KW 40 | wie B1 |
| B3 | Halbjahresbericht 2026/1: 27'128 freiwillige Meldungen, 200 meldepflichtige Vorfälle | REPORTED, **bis Bestätigung nicht verwenden** (Entscheid E3: nicht in #07) | bacs.admin.ch/de/hjb-26-de1 (Websuche) | Cyber Briefing | bis zur Bestätigung gesperrt |
| B4 | Seit November 2025 warnt der Bund zusätzlich über Alertswiss, die Warn-App des Bundes | REPORTED | Websuche 27.09.2026 | Cyber Briefing | vor Verwendung prüfen |
| B5 | NCSC/BACS «Technologiebetrachtung Passkeys» (PDF, 09.01.2025) | REPORTED (gefunden, nicht gelesen) | ncsc.admin.ch/…/technologiebetrachtung.html | #13 Quellenliste | als Kommentarbeleg erst nach Lektüre |

## 3. NIS2 (EU, DE, AT)

| # | Fakt | Status | Quelle, Abruf 27.09.2026 | Verwendet in | Gültigkeit |
|---|---|---|---|---|---|
| N1 | NIS2 = Richtlinie (EU) 2022/2555; betrifft Schweizer Unternehmen über EU-Töchter, Lieferkette, Marktzugang | REPORTED (Rechtstext nicht abgerufen) | EUR-Lex (nicht abgerufen), Sekundärquellen | #07, Webseite 2.6 | stabil; Fach-OK |
| N2 | Direktanwendung für bestimmte digitale Dienste ohne EU-Niederlassung (Cloud, Rechenzentren, DNS, Managed Services), Pflicht zur EU-Vertretung (Art. 26 Abs. 3) | REPORTED | nisd2.eu, sidd.swiss | #07 Post (Fach-OK offen), **nicht** im Visual | Fach-Owner muss bestätigen oder streichen |
| N3 | Lieferkettenpflicht Art. 21 Abs. 2 lit. d, Pflichten der Leitungsorgane Art. 20 | REPORTED | nis-2-templates.com, rescana.com | #07 | stabil |
| N4 | **Deutschland:** NIS2-Umsetzungsgesetz (NIS2UmsuCG) in Kraft seit **06.12.2025** | REPORTED | usd.de, isico.de | #07 optionaler Aktualitätssatz (nicht eingebaut) | vor Verwendung erneut prüfen |
| N5 | **Österreich:** NISG 2026, kundgemacht 23.12.2025, tritt am **01.10.2026** in Kraft | REPORTED | wko.at, usp.gv.at | #07 optionaler Satz | **zeitkritisch:** Formulierung «tritt in Kraft» ab 01.10.2026 falsch, dann «gilt seit»; erneut prüfen ab 01.10.2026 |
| N6 | Kommission beschloss am 08.07.2026, IE, ES, FR, NL an den EuGH zu verweisen (Umsetzungsverzug) | REPORTED | compliancehub.wiki, ecs-org.eu | nur für Kommentare | kurzlebig, vor Verwendung prüfen |
| N7 | Sektorenliste (Energie, Transport, Gesundheit, digitale Dienste, verarbeitendes Gewerbe u. a.) | REPORTED | Anhänge I/II laut Sekundärquellen | #07 Prüffrage 1 | stabil, mit «u. a.» |

## 4. Post-Quantum (NIST)

| # | Fakt | Status | Quelle | Verwendet in | Gültigkeit |
|---|---|---|---|---|---|
| Q1 | NIST hat am **13.08.2024** die ersten PQC-Standards finalisiert: **FIPS 203** (ML-KEM), **FIPS 204** (ML-DSA), **FIPS 205** (SLH-DSA) | REPORTED | nist.gov News 2024/08 (gesperrt); cloudsecurityalliance.org 15.08.2024 | #11 Post (ohne Normnummern), optionaler Kommentar | stabil; Link csrc.nist.gov vor Verwendung im Browser prüfen |
| Q2 | Hybrider Schlüsselaustausch X25519MLKEM768 standardmässig in Chrome, Firefox, Safari und OpenSSL 3.5+ | REPORTED | encryptionconsulting.com, pqaudit.org, IETF draft-ietf-tls-ecdhe-mlkem | #11 Faktencheck | kurzlebig, vor Verwendung prüfen |
| Q3 | UK NCSC Migrationsziele 2028 (Inventar/Plan), 2031 (Priorität), 2035 (Abschluss) | REPORTED | postquantum.com, quantumsentinel.uk | #11 Faktencheck (nicht im Post) | vor Verwendung prüfen |
| Q4 | Quantencomputer bedrohen Public-Key-Verfahren (RSA/ECC), symmetrische weniger | REPORTED / Lehrbuch | Wikipedia HNDL | #11 | stabil |
| Q5 | Kein belastbares Datum für den relevanten Quantencomputer; keine Jahreszahl nennen | INFERRED | Einschätzung #11 | #11 | Regel |

## 5. CISA KEV und Schwachstellen

| # | Fakt | Status | Quelle | Verwendet in | Gültigkeit |
|---|---|---|---|---|---|
| K1 | 01. bis 25.09.2026: **39** Schwachstellen neu im KEV-Katalog | VERIFIED | offizieller Datensatz github.com/cisagov/kev-data, Katalogversion 2026.09.25, Abruf 27.09.2026 | Cyber Briefing, Check-in, Spickzettel | Momentaufnahme; nur mit Zeitraum und Katalogversion zitieren |
| K2 | davon **17** in Netzwerk-, Zugangs- und Fernwartungsprodukten, **10** im engen Sinn (Fernzugang, Firewall, Fernwartung) | VERIFIED | wie K1 | Cyber Briefing, Spickzettel | wie K1; Kategorie exakt benennen (Runde 2 fand Fehlbenennung) |
| K3 | **CVE-2026-87902**, WordPress Core, Remote File Inclusion (CWE-98), im KEV seit **25.09.2026**, «Forensic Triage: Yes» | VERIFIED (KEV-Eintrag) | KEV-Datensatz; Advisory GHSA-7hp8-65ch-5whp; NVD | Briefing, Sicherheits-Check, Webseite (14 Nennungen, 6 Dateien) | korrigierte Version **nicht** genannt (nicht aus geprüfter Quelle); im Advisory nachlesen |
| K4 | CVE-2026-87886 Acronis-Backup-Plugin cPanel/WHM, Plesk (16.09.) | VERIFIED | KEV | Briefing | Verallgemeinerung «Backups werden verstärkt angegriffen» ist INFERRED |
| K5 | Lage «erhöht» | INFERRED | Einstufung aus K1/K2 | Briefing | nur mit Kennzeichnung |

## 6. Microsoft Entra ID (Gastkonten)

| # | Fakt | Status | Quelle | Gültigkeit |
|---|---|---|---|---|
| M1 | Standardmässig dürfen alle Benutzer, auch Gäste, Gäste einladen | VERIFIED (Quelltext MicrosoftDocs/entra-docs, Commit 902ee3b vom 25.09.2026) | «Configure external collaboration settings» (ms.date 24.04.2026) | Portal-Bezeichnungen ändern sich: vor Verwendung erneut prüfen ab 01.01.2027 |
| M2 | Guest Inviter ohne höhere Admin-Rolle; Standard «limited access»; strengste Stufe nur eigenes Profil; Einladende werden Sponsor | VERIFIED | wie M1; «Sponsors field for B2B users» | wie M1 |
| M3 | Access Reviews brauchen Entra ID Governance, einzelne Funktionen mit P2 | VERIFIED | «What are access reviews?» (ms.date 12.03.2026) | Lizenzen ändern sich: vor jeder Verwendung prüfen |

## 7. Passkeys und MFA

| # | Fakt | Status | Quelle |
|---|---|---|---|
| P1 | Credential Stuffing = automatisiertes Einspielen gestohlener Zugangsdaten | VERIFIED (Quelltext OWASP, Commit 0d7bd93, 27.09.2026) | owasp.org Credential_stuffing |
| P2 | Manuell eingegebene Codes (OTP, Out-of-Band) gelten nicht als phishing-resistent | VERIFIED | NIST SP 800-63B-4 (Aug. 2025), Repo usnistgov/800-63-4 Commit 4f2487b |
| P3 | Privater Schlüssel wird keiner anderen Partei offengelegt, Bindung an Origin, Biometrie nur lokal | VERIFIED | W3C WebAuthn Level 3, Repo w3c/webauthn Commit 9d88b76 |
| P4 | «Schlüssel verlässt Ihr Gerät nie» ist für synchronisierte Passkeys **falsch** | Befund Prüfrunde 1 | nicht verwenden |

Hinweis: VERIFIED heisst hier «offizieller Quelltext im Repository gelesen», nicht die publizierte Webseite. Fach-Owner gleicht bei Bedarf ab.

## 8. Sonstige

| # | Fakt | Status | Quelle | Gültigkeit |
|---|---|---|---|---|
| S1 | Oktober = European Cybersecurity Month (ECSM 2026: 01. bis 31.10.2026) | REPORTED | enisa.europa.eu; better-internet-for-kids.europa.eu | nur Oktober 2026; für 2027 neu prüfen |
| S2 | Art. 716a OR (Verwaltungsrat, Oberleitung) als Aufhänger #03 | nicht geprüft in diesen Quellen | 05-redaktionsplan | Fach-OK GRC |

## Pflegeregel

- Jeder Fakt trägt Abrufdatum. Bei REPORTED: Primärquelle nachtragen, sobald erreichbar, und Status erst dann auf VERIFIED setzen.
- Fristen, Stichtage und Lagebeurteilungen, die aus Fakten **abgeleitet** sind, stehen immer als `INFERRED`.
- Neue Posts übernehmen die Formulierung aus dieser Notiz, nicht aus älteren Entwürfen.
