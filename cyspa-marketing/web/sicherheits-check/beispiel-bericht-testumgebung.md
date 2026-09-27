---
tags: [cyspa, sicherheits-check, webseite, e2]
status: Beispiel (Testumgebung)
date: 2026-09-27
source: Check-Invoke-CyspaWebCheck.ps1 v1.0 (passiv, lokal ausgeführt)
klassifizierung: internal
---

# Web-Sicherheits-Check localhost:8443

> **BEISPIEL aus der Testumgebung, nicht cyspa.ch.** Erzeugt am 27.09.2026 gegen einen lokalen Nachbau eines WordPress-Servers (selbstsigniertes Zertifikat, absichtlich fehlerhafte Header). Zeigt nur Aufbau und Lesart des Berichts. Befunde, Entscheide und Abnahme-Tabelle sind nicht auf CYSPA übertragbar.

**Zeitpunkt:** 27.09.2026 21:06 · **Methode:** nur passive GET-Abrufe öffentlicher Seiten, keine Scans, keine Logins, keine Benutzerabfragen · **Bezug:** Entscheid E2, Cyber Security Briefing KW 40

> Achtung: Lauf mit -SkipCertificateCheck (Testmodus).

## Management-Summary

**Gesamtlage:** Rot – Handlungsbedarf · **Befunde:** Handlungsbedarf: 4 · Info: 3 · OK: 2 · Prüfen: 10

**Top-3-Befunde**

1. **CVE-2026-87902 (WordPress Core, CISA KEV)** (Handlungsbedarf): WordPress erkannt. Version im WP-Backend prüfen und mit dem Hersteller-Advisory abgleichen. → Massnahme M-CVE, Kontrolle A.8.8 Handhabung technischer Schwachstellen
2. **Zertifikat** (Handlungsbedarf): gültig bis 17.10.2026 (19 Tage), Aussteller: CN=localhost; Prüfung: RemoteCertificateChainErrors → Massnahme M-TLS, Kontrolle A.8.24 Verwendung von Kryptographie
3. **Content-Security-Policy** (Handlungsbedarf): Header fehlt → Massnahme M-CSP, Kontrolle A.8.26 Anforderungen an die Anwendungssicherheit; A.8.9 Konfigurationsmanagement

**Entscheidungsbedarf der Geschäftsleitung**

| # | Frage (Ja/Nein) | Empfehlung |
|---|---|---|
| D1 | Wird die WordPress-Version sofort im Backend gegen CVE-2026-87902 geprüft und bei Bedarf aktualisiert (Owner: Webseiten-Verantwortliche, Fallback LWE)? | **Ja**, vor jeder weiteren Änderung an der Webseite. |
| D2 | Werden die 4 Befunde mit Handlungsbedarf durch Webseiten-Verantwortliche bzw. Hoster behoben, mit Termin und erneutem Check? | **Ja**, Termin: [durch GL festzulegen]. |
| D3 | Werden die 10 Befunde «Prüfen» vom Webseiten-Owner mit Security (Michael) bewertet und begründet umgesetzt oder akzeptiert? | **Ja**, im nächsten Änderungsfenster. |
| D4 | Werden neue Inhalte (z. B. /tabletop) erst nach Umsetzung der obigen Entscheide eingepflegt (Entscheid E2: Check vor der nächsten Änderung)? | **Ja.** |

## Befunde im Detail

| Bereich | Prüfpunkt | Bewertung | Befund | Massnahme (README) | Kontrolle ISO/IEC 27001:2022 Anhang A |
|---|---|---|---|---|---|
| CMS | CVE-2026-87902 (WordPress Core, CISA KEV) | **Handlungsbedarf** | WordPress erkannt. Version im WP-Backend prüfen und mit dem Hersteller-Advisory abgleichen. | M-CVE | A.8.8 Handhabung technischer Schwachstellen |
| Transport | Zertifikat | **Handlungsbedarf** | gültig bis 17.10.2026 (19 Tage), Aussteller: CN=localhost; Prüfung: RemoteCertificateChainErrors | M-TLS | A.8.24 Verwendung von Kryptographie |
| Header | Content-Security-Policy | **Handlungsbedarf** | Header fehlt | M-CSP | A.8.26 Anforderungen an die Anwendungssicherheit; A.8.9 Konfigurationsmanagement |
| Header | X-Content-Type-Options | **Handlungsbedarf** | Header fehlt | M-XCTO | A.8.9 Konfigurationsmanagement |
| Transport | HTTP -> HTTPS | **Prüfen** | HTTP 302 (temporär) nach https://localhost:8443/ | M-REDIR | A.8.24 Verwendung von Kryptographie |
| Header | Strict-Transport-Security (HSTS) | **Prüfen** | max-age 300 s ist kürzer als 6 Monate (empfohlen: 31536000) | M-HSTS | A.8.24 Verwendung von Kryptographie |
| CMS | /xmlrpc.php | **Prüfen** | XML-RPC aktiv (HTTP 405) | M-XMLRPC | A.8.9 Konfigurationsmanagement |
| Cookies | Cookie-Flags (Startseite) | **Prüfen** | pll_language: fehlt Secure, HttpOnly, SameSite | M-COOKIE | A.8.9 Konfigurationsmanagement; A.5.34 Privatsphäre und Schutz personenbezogener Daten |
| CMS | /readme.html | **Prüfen** | HTTP 200, WordPress-Readme öffentlich | M-README | A.8.9 Konfigurationsmanagement |
| Header | Server / X-Powered-By | **Prüfen** | X-Powered-By: PHP/8.1.2; Server mit Version: Apache/2.4.57 (Debian) | M-BANNER | A.8.9 Konfigurationsmanagement |
| CMS | Versionsanzeige (Generator-Meta) | **Prüfen** | Version 6.8.1 öffentlich sichtbar | M-CMS-VERSION | A.8.9 Konfigurationsmanagement |
| Kontakt | /.well-known/security.txt | **Prüfen** | nicht vorhanden (HTTP 404) | M-SECTXT | A.8.8 Handhabung technischer Schwachstellen (Meldeweg für Schwachstellen) |
| Header | Referrer-Policy | **Prüfen** | Header fehlt (Browser-Standard strict-origin-when-cross-origin greift) | M-REF | A.8.9 Konfigurationsmanagement |
| Header | Permissions-Policy | **Prüfen** | Header fehlt | M-PERM | A.8.9 Konfigurationsmanagement |
| Transport | TLS-Protokoll (ausgehandelt) | **OK** | Tls13, TLS_AES_256_GCM_SHA384 | M-TLS | A.8.24 Verwendung von Kryptographie |
| Header | X-Frame-Options / frame-ancestors | **OK** | X-Frame-Options: SAMEORIGIN | M-FRAME | A.8.26 Anforderungen an die Anwendungssicherheit; A.8.9 Konfigurationsmanagement |
| CMS | /wp-json/ (REST-API-Index) | **Info** | HTTP 200, erreichbar (Normalbetrieb; Benutzer-Endpunkte bewusst nicht abgefragt) | M-WPJSON | A.8.9 Konfigurationsmanagement |
| CMS | System-Erkennung | **Info** | WordPress erkannt (Generator-Meta, Pfad /wp-content/, Pfad /wp-includes/, Link-Header api.w.org, /wp-json/ antwortet mit WP-REST-Index, /readme.html (WordPress)); Generator: WordPress 6.8.1 | – | – |
| Erreichbarkeit | Startseite HTTPS | **Info** | Kette: 200 https://localhost:8443/ | – | – |

*Kontroll-Zuordnung zur Orientierung (ISO/IEC 27001:2022 Anhang A, Umsetzungshinweise in ISO/IEC 27002:2022). Keine Audit- oder Konformitätsaussage.*

## CVE-2026-87902 – WordPress Core

- **Art:** Remote File Inclusion in WordPress Core (CWE-98). Ein nicht angemeldeter Angreifer kann laut CISA die Seitenvorlagen-Auflösung dazu bringen, eine lesbare lokale `.php`-Datei ausserhalb der Theme-Verzeichnisse einzubinden. Folge: Ausführung von Code auf dem Server.
- **Status:** Im CISA-Katalog KEV (aktiv ausgenutzte Schwachstellen) seit 25.09.2026. Forensische Triage empfohlen.
- **Dieses Skript kann die Verwundbarkeit nicht feststellen.** Die öffentlich sichtbare Version ist oft ausgeblendet oder falsch. Massgeblich ist die Version im WordPress-Backend (Dashboard → Aktualisierungen).
- **Vorgehen:** Version im Backend ablesen → mit dem Hersteller-Advisory abgleichen (https://github.com/WordPress/wordpress-develop/security/advisories/GHSA-7hp8-65ch-5whp, NVD: https://nvd.nist.gov/vuln/detail/CVE-2026-87902) → aktualisieren → bei Verdacht auf Kompromittierung Massnahme M-CVE im README befolgen.

## Rohdaten Startseite (Antwort-Header)

| Header | Wert |
|---|---|
| Connection | keep-alive |
| Content-Type | text/html |
| Date | Sun, 27 Sep 2026 21:06:10 GMT |
| Keep-Alive | timeout=5 |
| Link | <https://localhost:8443/wp-json/>; rel="https://api.w.org/" |
| Server | Apache/2.4.57, (Debian) |
| Set-Cookie | (Werte nicht protokolliert, siehe Cookie-Flags) |
| Strict-Transport-Security | max-age=300 |
| Transfer-Encoding | chunked |
| X-Frame-Options | SAMEORIGIN |
| X-Powered-By | PHP/8.1.2 |

## Abgerufene Adressen

- GET http://localhost:8080/ → HTTP 302
- GET https://localhost:8443/ → HTTP 200
- GET https://localhost:8443/ → HTTP 200
- GET https://localhost:8443/wp-json/ → HTTP 200
- GET https://localhost:8443/readme.html → HTTP 200
- GET https://localhost:8443/xmlrpc.php → HTTP 405
- GET https://localhost:8443/.well-known/security.txt → HTTP 404
- TLS-Handshake localhost:8443 → Tls13

## Verteiler und Abnahme

**Klassifizierung:** intern. Der Bericht kann Schwachstellen benennen und wird nicht öffentlich geteilt. Externe (Hoster, Agentur) erhalten nach Freigabe nur den Massnahmen-Auszug.

**Verteiler:** LWE (Inhaberin, Geschäftsleitung) · Michael (Security) · Webseiten-Verantwortliche/r [NEEDS INPUT] · Hoster/Agentur nur Auszug nach Freigabe

| Rolle | Name | Datum | Visum / Bemerkung |
|---|---|---|---|
| Check ausgeführt | [Name] | 27.09.2026 | |
| Fachliche Prüfung und Bewertung | Michael (Security) | | |
| Freigabe Massnahmen | LWE (Inhaberin) | | |

## Grenzen

Geprüft wurden nur öffentlich sichtbare Merkmale der Startseite und weniger Standardpfade. Nicht geprüft: Plugins und Themes, Versionsstände im Backend, Konfiguration des Servers, Admin-Zugänge, Unterseiten, Formulare, E-Mail-Sicherheit (SPF/DKIM/DMARC). Ein unauffälliger Bericht ist kein Nachweis, dass die Webseite sicher ist.

