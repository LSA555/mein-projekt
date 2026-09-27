---
tags: [cyspa, sicherheits-check, webseite, e2]
status: Beispiel (Testumgebung)
date: 2026-09-27
source: Check-Invoke-CyspaWebCheck.ps1 v1.0 (passiv, lokal ausgefuehrt)
klassifizierung: internal
---

# Web-Sicherheits-Check localhost:8443

> **BEISPIEL aus der Testumgebung, nicht cyspa.ch.** Erzeugt am 27.09.2026 gegen einen lokalen Nachbau eines WordPress-Servers (selbstsigniertes Zertifikat, absichtlich fehlerhafte Header). Zeigt nur Aufbau und Lesart des Berichts.

**Zeitpunkt:** 27.09.2026 20:56 · **Methode:** nur passive GET-Abrufe öffentlicher Seiten, keine Scans, keine Logins, keine Benutzerabfragen · **Bezug:** Entscheid E2, Cyber Security Briefing KW 40

> Achtung: Lauf mit -SkipCertificateCheck (Testmodus).

**Übersicht:** Handlungsbedarf: 4 · Info: 3 · OK: 2 · Prüfen: 10

| Bereich | Prüfpunkt | Bewertung | Befund | Massnahme (README) |
|---|---|---|---|---|
| CMS | CVE-2026-87902 (WordPress Core, CISA KEV) | **Handlungsbedarf** | WordPress erkannt. Version im WP-Backend pruefen und mit dem Hersteller-Advisory abgleichen. | M-CVE |
| Header | Content-Security-Policy | **Handlungsbedarf** | Header fehlt | M-CSP |
| Header | X-Content-Type-Options | **Handlungsbedarf** | Header fehlt | M-XCTO |
| Transport | Zertifikat | **Handlungsbedarf** | gueltig bis 17.10.2026 (19 Tage), Aussteller: CN=localhost; Pruefung: RemoteCertificateChainErrors | M-TLS |
| CMS | /xmlrpc.php | **Prüfen** | XML-RPC aktiv (HTTP 405) | M-XMLRPC |
| CMS | /readme.html | **Prüfen** | HTTP 200, WordPress-Readme oeffentlich | M-README |
| CMS | Versionsanzeige (Generator-Meta) | **Prüfen** | Version 6.8.1 oeffentlich sichtbar | M-CMS-VERSION |
| Cookies | Cookie-Flags (Startseite) | **Prüfen** | pll_language: fehlt Secure, HttpOnly, SameSite | M-COOKIE |
| Header | Permissions-Policy | **Prüfen** | Header fehlt | M-PERM |
| Header | Strict-Transport-Security (HSTS) | **Prüfen** | max-age 300 s ist kuerzer als 6 Monate (empfohlen: 31536000) | M-HSTS |
| Header | Referrer-Policy | **Prüfen** | Header fehlt (Browser-Standard strict-origin-when-cross-origin greift) | M-REF |
| Header | Server / X-Powered-By | **Prüfen** | X-Powered-By: PHP/8.1.2; Server mit Version: Apache/2.4.57 (Debian) | M-BANNER |
| Kontakt | /.well-known/security.txt | **Prüfen** | nicht vorhanden (HTTP 404) | M-SECTXT |
| Transport | HTTP -> HTTPS | **Prüfen** | HTTP 302 (temporaer) nach https://localhost:8443/ | M-REDIR |
| Header | X-Frame-Options / frame-ancestors | **OK** | X-Frame-Options: SAMEORIGIN | M-FRAME |
| Transport | TLS-Protokoll (ausgehandelt) | **OK** | Tls13, TLS_AES_256_GCM_SHA384 | M-TLS |
| CMS | /wp-json/ (REST-API-Index) | **Info** | HTTP 200, erreichbar (Normalbetrieb; Benutzer-Endpunkte bewusst nicht abgefragt) | M-WPJSON |
| CMS | System-Erkennung | **Info** | WordPress erkannt (Generator-Meta, Pfad /wp-content/, Pfad /wp-includes/, Link-Header api.w.org, /wp-json/ antwortet mit WP-REST-Index, /readme.html (WordPress)); Generator: WordPress 6.8.1 | – |
| Erreichbarkeit | Startseite HTTPS | **Info** | Kette: 200 https://localhost:8443/ | – |

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
| Date | Sun, 27 Sep 2026 20:56:18 GMT |
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

## Grenzen

Geprüft wurden nur öffentlich sichtbare Merkmale der Startseite und weniger Standardpfade. Nicht geprüft: Plugins und Themes, Versionsstände im Backend, Konfiguration des Servers, Admin-Zugänge, Unterseiten, Formulare, E-Mail-Sicherheit (SPF/DKIM/DMARC). Ein unauffälliger Bericht ist kein Nachweis, dass die Webseite sicher ist.

