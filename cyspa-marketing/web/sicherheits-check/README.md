---
tags: [cyspa, sicherheits-check, webseite, e2, wordpress, anleitung]
status: Entwurf – Freigabe LWE ausstehend
date: 2026-09-27
source: claude
chat_url: "https://claude.ai/code/session_01JsQoSQbozeyt2EYitpEXuf"
bezug: "[[2026-09-28 Cyber Security Briefing GL]] – Entscheid E2"
klassifizierung: internal
---

# Passiver Sicherheits-Check der CYSPA-Webseite

## Wozu

Das Cyber Security Briefing für die Geschäftsleitung (KW 40, Check-in 28.09.2026) empfiehlt mit **Entscheid E2**: «Machen wir vor der nächsten Änderung einen Sicherheits-Check der CYSPA-Webseite? – Ja. Geringer Aufwand, hohes Reputationsrisiko.» Die Massnahme dort: System und Versionsstand feststellen, Sicherheits-Check, Owner Webseiten-Verantwortliche (Fallback LWE), Termin 02.10.2026.

Anlass ist unter anderem **CVE-2026-87902** in WordPress Core, seit 25.09.2026 im CISA-Katalog der aktiv ausgenutzten Schwachstellen (KEV). Auf welchem System cyspa.ch läuft, ist bisher `UNKNOWN`. Dieses Skript klärt das von aussen und prüft die wichtigsten öffentlich sichtbaren Sicherheitsmerkmale.

**Voraussetzung:** Entscheid E2 = Ja. Ohne diesen Entscheid nicht ausführen.

## Dateien

| Datei | Zweck |
|---|---|
| `Check-Invoke-CyspaWebCheck.ps1` | Das Skript (PowerShell 7) |
| `beispiel-bericht-testumgebung.md` | Beispielbericht aus einer lokalen Testumgebung, **nicht** von cyspa.ch |
| `README.md` | Diese Anleitung mit Massnahmenkatalog |

## Was das Skript tut – und was nicht

**Tut:** rund 8 normale Seitenabrufe (GET) mit je einer halben Sekunde Pause, wie ein Browser:

| # | Abruf | Zweck |
|---|---|---|
| 1 | `http://<domain>/` | Weiterleitung auf HTTPS? |
| 2 | TLS-Verbindungsaufbau zu `<domain>:443` | Protokoll, Zertifikat, Ablaufdatum |
| 3 | `https://<domain>/` (Weiterleitungen innerhalb der eigenen Domain) | Sicherheits-Header, Banner, Cookies, CMS-Merkmale im HTML |
| 4 | `/wp-json/` | WordPress-REST-Index vorhanden? (nur die Startseite der API) |
| 5 | `/readme.html` | WordPress-Readme öffentlich? |
| 6 | `/xmlrpc.php` (GET) | XML-RPC-Schnittstelle aktiv? |
| 7 | `/.well-known/security.txt` | Meldeadresse für Sicherheitslücken vorhanden? |

**Tut ausdrücklich nicht:** Port-Scans, Verzeichnis-Raten, Fuzzing, Brute-Force, Login-Versuche, POST-Anfragen, Benutzer-Enumeration (keine Abfrage von `/wp-json/wp/v2/users`, `?author=`), keine Ausnutzung von Schwachstellen, keine Drittanbieter-Dienste. Cookie-Werte werden nicht gespeichert, nur Name und Flags.

**Grundsatz:** Nur gegen die **eigene** Domain ausführen. Liegt die Webseite bei einem Hoster oder einer Agentur, ist ein solcher passiver Abruf üblich und unkritisch. Eine Vorab-Info an den Dienstleister schadet trotzdem nicht.

## Anleitung

**Voraussetzung:** PowerShell 7 (Windows, macOS oder Linux). Prüfen mit `pwsh -v`. Installation: https://learn.microsoft.com/powershell/scripting/install/installing-powershell

1. Ordner `sicherheits-check` auf den eigenen Rechner kopieren.
2. Terminal in diesem Ordner öffnen.
3. Optional Selbsttest (offline, ohne Netzwerk):
   ```powershell
   pwsh -NoProfile -File .\Check-Invoke-CyspaWebCheck.ps1 -SelfTest
   ```
   Erwartet: «40 bestanden, 0 fehlgeschlagen».
4. Check ausführen:
   ```powershell
   pwsh -NoProfile -File .\Check-Invoke-CyspaWebCheck.ps1
   # oder mit anderer Domain / eigenem Berichtspfad:
   pwsh -NoProfile -File .\Check-Invoke-CyspaWebCheck.ps1 -Domain cyspa.ch -OutFile .\webcheck-cyspa.md
   ```
   Unter Windows blockiert eventuell die Ausführungsrichtlinie heruntergeladene Skripte. Dann einmalig `Unblock-File .\Check-Invoke-CyspaWebCheck.ps1` ausführen, nachdem der Inhalt geprüft wurde.
5. Der Bericht `cyspa-webcheck_<domain>_<zeitstempel>.md` liegt im aktuellen Ordner. Ablage im Vault unter dem Meeting bzw. der Massnahme E2. Klassifizierung: **intern** (nicht öffentlich teilen, da er Schwachstellen benennen kann).
6. **Unabhängig vom Ergebnis:** WordPress-Version im Backend ablesen, falls WordPress im Einsatz ist (siehe M-CVE).

**Parameter**

| Parameter | Standard | Bedeutung |
|---|---|---|
| `-Domain` | `www.cyspa.ch` | Hostname ohne `https://` und Pfad |
| `-OutFile` | automatisch | Pfad des Markdown-Berichts |
| `-TimeoutSec` | 15 | Zeitlimit je Abruf |
| `-SelfTest` | – | nur Parser-Selbsttest, kein Netzwerk |
| `-HttpPort`, `-SkipCertificateCheck` | – | nur für Tests in einer Laborumgebung, nicht für den echten Check |

**Exit-Codes:** 0 = Bericht erstellt · 1 = Eingabe- oder Schreibfehler · 2 = Webseite nicht erreichbar (Bericht trotzdem erstellt)

## Interpretation

| Bewertung | Bedeutung | Reaktion |
|---|---|---|
| **Handlungsbedarf** | Fehlende Grundabsicherung oder konkretes Risiko | Massnahme bis zum nächsten Änderungsfenster umsetzen, bei M-CVE und M-TLS sofort |
| **Prüfen** | Verbesserung sinnvoll oder Kontext nötig | Mit Webseiten-Verantwortlichen bzw. Hoster besprechen, begründet entscheiden |
| **OK** | Entspricht gängiger Praxis | Keine Aktion |
| **Info** | Feststellung ohne Wertung | Zur Kenntnis |

**Wichtig**
- Die Bewertungen sind Faustregeln für eine KMU-Webseite, keine Norm-Prüfung.
- Der Befund «CVE-2026-87902» erscheint **immer**, wenn WordPress erkannt wird oder das System unklar ist. Das Skript kann nicht feststellen, ob die Webseite verwundbar ist. Das kann nur der Versionsabgleich im Backend.
- Ein Bericht ohne Handlungsbedarf heisst nicht «sicher». Plugins, Themes, Admin-Zugänge, Hosting und Backups sieht das Skript nicht.
- Läuft cyspa.ch hinter einem CDN oder einer Web Application Firewall, zeigen die Header teilweise deren Werte.

## Massnahmenkatalog je Befund

Die Kürzel stehen im Bericht in der Spalte «Massnahme». Umsetzung durch Webseiten-Verantwortliche bzw. Hoster. Vor jeder Änderung Backup und, wenn möglich, Test auf einer Staging-Kopie.

### M-CVE – CVE-2026-87902 (WordPress Core, aktiv ausgenutzt)
- **Was:** Remote File Inclusion in WordPress Core (CWE-98). Laut CISA kann ein nicht angemeldeter Angreifer die Auflösung der Seitenvorlagen so beeinflussen, dass eine lesbare lokale `.php`-Datei ausserhalb der Theme-Verzeichnisse eingebunden wird. Folge: Ausführung von Code auf dem Server. Im CISA-KEV seit 25.09.2026, Kennzeichen «Forensic Triage: Yes».
- **Sofort:**
  1. Im WordPress-Backend unter **Dashboard → Aktualisierungen** die installierte Version ablesen und notieren.
  2. Mit dem Hersteller-Advisory abgleichen: https://github.com/WordPress/wordpress-develop/security/advisories/GHSA-7hp8-65ch-5whp (weitere Angaben: https://nvd.nist.gov/vuln/detail/CVE-2026-87902). Die korrigierte Version steht im Advisory. Sie ist hier bewusst nicht genannt, weil sie nicht aus einer geprüften Quelle vorliegt.
  3. Backup erstellen, dann WordPress Core aktualisieren. Automatische Sicherheitsupdates für den Core aktiv lassen bzw. aktivieren.
- **Bei Verdacht auf Kompromittierung** (unbekannte Admin-Konten, unbekannte `.php`-Dateien in `wp-content/uploads`, veränderte Seiten, Weiterleitungen auf fremde Seiten, Warnungen des Hosters): Hoster informieren, Logs sichern, Passwörter und Schlüssel (`wp-config.php` Salts) nach Bereinigung erneuern. Ob eine Meldepflicht besteht (z. B. revDSG bei betroffenen Personendaten), klärt LWE. Allgemeine Einordnung, keine Rechtsberatung.
- **Nachweis:** Version vorher/nachher und Datum im Vault festhalten (Massnahme E2).

### M-TLS – Verschlüsselung und Zertifikat
- Nur TLS 1.2 und 1.3 zulassen, TLS 1.0/1.1 abschalten (Hoster-Einstellung).
- Zertifikat automatisch erneuern (z. B. Let's Encrypt über den Hoster). Warnschwelle: weniger als 30 Tage Restlaufzeit.
- Zertifikatsfehler (Name, Kette) sofort beheben: Besucher sehen sonst eine Warnseite.

### M-REDIR – Weiterleitung HTTP → HTTPS
- Alle HTTP-Aufrufe dauerhaft (301 oder 308) auf `https://` umleiten, auf eine einheitliche Adresse (mit oder ohne `www`).
- Temporäre Weiterleitungen (302/307) durch dauerhafte ersetzen.

### M-HSTS – Strict-Transport-Security
- Zielwert: `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- Schrittweise einführen (z. B. zuerst `max-age=86400`), wenn Subdomains ohne HTTPS existieren. `preload` nur bewusst setzen (schwer rückgängig zu machen).

### M-CSP – Content-Security-Policy
- Schützt vor eingeschleustem Skriptcode (Cross-Site Scripting).
- Bei WordPress mit Plugins zuerst als `Content-Security-Policy-Report-Only` einführen, Meldungen beobachten, dann durchsetzen.
- Minimaler Einstieg, wenn eine volle Policy noch nicht möglich ist: `Content-Security-Policy: frame-ancestors 'self'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests`
- `'unsafe-inline'` und `'unsafe-eval'` in `script-src` mittelfristig abbauen.

### M-XCTO – X-Content-Type-Options
- Setzen: `X-Content-Type-Options: nosniff`

### M-FRAME – Schutz vor Einbettung (Clickjacking)
- Setzen: `Content-Security-Policy: frame-ancestors 'self'` (modern) und zusätzlich `X-Frame-Options: SAMEORIGIN` (ältere Browser).

### M-REF – Referrer-Policy
- Setzen: `Referrer-Policy: strict-origin-when-cross-origin`

### M-PERM – Permissions-Policy
- Nicht benötigte Browser-Funktionen abschalten, z. B.: `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
- Vorher prüfen, ob eingebundene Dienste (z. B. Kartendienst, Terminbuchung) eine Funktion brauchen.

### M-BANNER – Server- und X-Powered-By-Angaben
- Versionsnummern von Webserver und PHP ausblenden (Apache: `ServerTokens Prod`, `ServerSignature Off`; nginx: `server_tokens off`; PHP: `expose_php = Off`). Bei Managed Hosting: Hoster fragen.
- Hinweis: Das verringert nur die Sichtbarkeit. Entscheidend bleibt, dass die Versionen aktuell sind.

### M-CMS-VERSION – WordPress-Version öffentlich sichtbar
- Generator-Meta entfernen (Theme-Funktion oder Sicherheits-Plugin). Nebenwirkung wie bei M-BANNER: Sichtbarkeit sinkt, Aktualität bleibt Pflicht.

### M-WPJSON – WordPress-REST-API
- Der Index unter `/wp-json/` ist im Normalbetrieb erreichbar und kein Befund an sich.
- Prüfen lassen (durch die Webseiten-Verantwortlichen im Backend, nicht per Abfrage von aussen), ob die Benutzerliste öffentlich abrufbar ist. Falls ja, per Plugin oder Konfiguration auf angemeldete Benutzer beschränken. Nicht die ganze REST-API abschalten: Der Block-Editor braucht sie.

### M-README – /readme.html
- Datei entfernen oder den Zugriff sperren. Achtung: Sie kommt bei Core-Updates zurück. Sperre deshalb in der Serverkonfiguration oder per Sicherheits-Plugin.

### M-XMLRPC – /xmlrpc.php
- Wird XML-RPC nicht gebraucht (typisch: keine Jetpack-Nutzung, keine Veröffentlichung per App), in der Serverkonfiguration oder per Plugin sperren. XML-RPC wird häufig für automatisierte Passwort-Rateversuche missbraucht.

### M-SECTXT – security.txt
- Datei `/.well-known/security.txt` (RFC 9116) anlegen, damit Sicherheitsforschende Lücken melden können. Vorlage:
  ```
  Contact: mailto:[PLATZHALTER: Meldeadresse, z. B. security@cyspa.ch oder info@cyspa.ch]
  Expires: [PLATZHALTER: Datum in max. 12 Monaten, Format 2027-09-30T00:00:00.000Z]
  Preferred-Languages: de, en
  Canonical: https://www.cyspa.ch/.well-known/security.txt
  ```
- Für ein Cybersecurity-Unternehmen ist die Datei auch ein Glaubwürdigkeitsmerkmal.
- `Expires` im Kalender vormerken und jährlich erneuern.

### M-COOKIE – Cookie-Flags
- Alle Cookies mit `Secure` und `SameSite=Lax` (oder `Strict`), Sitzungs-Cookies zusätzlich mit `HttpOnly`.
- Cookies, die vor einer Einwilligung gesetzt werden, mit dem Cookie-Banner und der Datenschutzerklärung abgleichen (revDSG, bei EU-Besuchenden allenfalls DSGVO).

## Nach dem Check

1. Bericht an Michael (Security) zur Auswertung.
2. Massnahmen mit Owner und Termin im Vault erfassen (Massnahme E2, Termin 02.10.2026 laut Briefing).
3. Umsetzung durch Webseiten-Verantwortliche bzw. Hoster. Änderungen an der Live-Webseite nur nach Freigabe durch LWE.
4. Check nach Umsetzung erneut ausführen und beide Berichte ablegen.
5. **Erst danach** die neuen Seiten (`/tabletop`, überarbeitete Texte) einpflegen – gemäss E2 «vor der nächsten Änderung».

## Prüfung des Skripts (27.09.2026)

- Syntaxprüfung mit `[scriptblock]::Create(...)` unter PowerShell 7.4.6: bestanden.
- Selbsttest `-SelfTest`: 40 von 40 Prüfungen bestanden.
- Ende-zu-Ende-Test gegen einen lokalen Nachbau (WordPress-Merkmale, selbstsigniertes Zertifikat, fehlende Header): alle Befunde wie erwartet erkannt, genau 7 Abrufe plus TLS-Handshake, keine weiteren Pfade abgefragt. Ergebnis siehe `beispiel-bericht-testumgebung.md`.
- **Nicht getestet:** gegen cyspa.ch selbst (aus der Erstellungsumgebung nicht erreichbar) und unter Windows. Der erste echte Lauf erfolgt durch LWE bzw. die IT.
