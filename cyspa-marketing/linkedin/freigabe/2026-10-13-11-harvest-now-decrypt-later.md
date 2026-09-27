---
tags: [linkedin, freigabe, batch-1, p10, post-quantum, future-security]
status: freigabepaket-gates-offen
date: 2026-09-27
source: claude
post_nr: "11"
slot: "2026-10-13 08:15"
---

# #11 – «Harvest now, decrypt later»

Freigabepaket für LWE. Grundlage: Repo-Draft `linkedin/posts/2026-10-13-p10-harvest-now-decrypt-later.md`. Erstellt mit KI-Unterstützung. Die Faktenverantwortung liegt beim Fach-Owner (§4.5).

## 1. Steckbrief

| Feld | Wert |
|------|------|
| Slot | Dienstag, 13.10.2026, 08:15 Uhr |
| Pfeiler / Serie | P10 – FUTURE SECURITY |
| Zielgruppe | primär Security/Technology Leadership (CTO), sekundär Enterprise/reguliert |
| Ziel | A (Expertise), C (informieren) |
| Format | **Empfehlung: Static** (Single Graphic 1200×1500 px) + Textpost |
| CTA-Typ | Selbstcheck (Relevanz-Test + Krypto-Inventar) |
| Asset im Repo | `linkedin/assets/export/2026-10-13-p10-harvest/2026-10-13-p10-harvest.png` (Static-Fallback, **nicht verwenden, Renderfehler**) |
| Asset zur Publikation | `cyspa-marketing/linkedin/freigabe/assets/11-harvest/2026-10-13-p10-harvest.png` (neu gerendert, Inhalt identisch) |
| Fach-Owner | CISO / Security Advisor |

### Motion oder Static – Empfehlung: **Static**

| Kriterium | Motion | Static |
|-----------|--------|--------|
| Verfügbarkeit | Nicht produziert. Dafür braucht es Motion Designer, Review und einen Accessibility-Check (Blitzeffekte, Lesbarkeit ohne Ton). Vorlauf laut §1: 5–10 Arbeitstage. | Liegt vor, fehlerfrei neu gerendert |
| Freigabe vor 30.09. | unrealistisch, LWE kann das Endprodukt nicht mehr sehen | möglich |
| Aussagekraft | bessere Mechanik-Erklärung, Autoplay-Aufmerksamkeit | Dreiteiler «abfangen → speichern → entschlüsseln» plus Schlussfrage. Das reicht für die Kernaussage. |
| Risiko | Freigabe eines nicht gesehenen Assets widerspricht der Gate-Logik | gering |

**Empfehlung:** Am 13.10. Static publizieren. Das Motion-Format in Batch 2 als Format-Experiment nachziehen. Die Mix-Kontrolle von Batch 1 («1 Motion») ist damit nicht erfüllt. Das im KPI-Review KW 43 vermerken.

## 2. Finaler Post-Text (copy-paste-fertig)

```text
«Harvest now, decrypt later»: Daten, die heute abgefangen werden, können morgen entschlüsselt werden.

Für manche Ihrer Daten ist Quantencomputing deshalb kein Zukunftsthema. Sondern ein heutiges.

Die Mechanik dahinter ist simpel: Verschlüsselter Datenverkehr lässt sich heute aufzeichnen und günstig speichern. Sobald leistungsfähige Quantencomputer die heute üblichen Public-Key-Verfahren brechen können, wird rückwirkend lesbar, was eigentlich noch Jahrzehnte vertraulich bleiben müsste.

Niemand weiss seriös, wann es so weit ist. Aber das ist auch nicht die entscheidende Frage. Die entscheidende Frage lautet:

Wie lange müssen Ihre Daten vertraulich bleiben?

→ Forschungs- und Konstruktionsdaten, Rezepturen: oft viele Jahre, teils Jahrzehnte.
→ Gesundheits- und Personendaten: teils ein Leben lang.
→ Verträge, M&A-Unterlagen, Behördendaten: viele Jahre.

Wenn die nötige Vertraulichkeitsdauer plus die Zeit für Ihre eigene Umstellung länger ist als die Zeit bis zum relevanten Quantencomputer, dann ist «später» bereits zu spät. Genau diese Überlegung treibt derzeit Regulatoren und Grosskunden um.

Die Standards sind übrigens da: Das US-Standardisierungsinstitut NIST hat 2024 die ersten Post-Quantum-Verfahren finalisiert, Hersteller bauen sie schrittweise in Produkte und Protokolle ein.

Und der erste Schritt für Sie kostet keine neue Technologie, sondern Übersicht: ein Krypto-Inventar.

1. Wo setzen wir welche Verschlüsselung ein: Übertragung, Speicherung, Signaturen, Archive?
2. Welche dieser Stellen schützen langlebige Daten?
3. Welche Systeme könnten wir überhaupt umstellen, und welche Hersteller haben eine Roadmap? (Stichwort Crypto Agility)

Wer dieses Inventar hat, kann gelassen priorisieren. Wer es nicht hat, diskutiert über Schlagzeilen.

#PostQuantum #QuantumSecurity #CyberResilienz #CISO #CYSPA
```

### Änderungen gegenüber Repo-Draft

| Stelle | Draft | Final | Begründung |
|--------|-------|-------|------------|
| Liste Vertraulichkeitsdauer, Zeile 1 | «oft 10–20 Jahre und mehr» | «oft viele Jahre, teils Jahrzehnte» | Gate 1 (Zahlen-Regel: «nur mit verifizierbarer Quelle; sonst streichen oder als Grössenordnung kennzeichnen»): Die Spanne 10–20 Jahre hat keine Quelle. Neu steht dort eine Grössenordnung ohne Scheinpräzision. Die Aussage bleibt gleich. |
| NIST-Satz | «Das US-Institut NIST» | «Das US-Standardisierungsinstitut NIST» | Gate 3: Die Abkürzung wird halbsatzweise erklärt (sekundäre Zielgruppe Enterprise/Executive) |
| Absatz Mosca-Logik | «relevanten Quantencomputer — dann ist «später» bereits zu spät» | «relevanten Quantencomputer, dann ist «später» bereits zu spät» | CI v3 Copy-Regel (kein Gedankenstrich im Satzfluss) |
| Inventar-Frage 1 | «Verschlüsselung ein — Übertragung, Speicherung» | «Verschlüsselung ein: Übertragung, Speicherung» | CI v3 Copy-Regel (kein Gedankenstrich im Satzfluss) |
| Inventar-Frage 3 | «umstellen — und welche Hersteller» | «umstellen, und welche Hersteller» | CI v3 Copy-Regel (kein Gedankenstrich im Satzfluss) |
| Rest | – | unverändert | – |

Hinweis zu den Zeilen «CI v3 Copy-Regel» (27.09.2026): Die Spalte «Draft» zeigt dort die bisherige Freigabefassung, nicht den Repo-Draft. Nur Zeichensetzung geändert, Aussagen unverändert.

## 3. Faktencheck

nist.gov und csrc.nist.gov waren aus dieser Umgebung gesperrt. Deshalb ist alles REPORTED (Abruf 27.09.2026).

| # | Aussage | Status | Quelle |
|---|---------|--------|--------|
| F1 | NIST hat 2024 die ersten Post-Quantum-Standards finalisiert: am 13.08.2024 FIPS 203 (ML-KEM), FIPS 204 (ML-DSA), FIPS 205 (SLH-DSA). Im Post bewusst ohne Normnummern. | REPORTED | Suchergebnis zur NIST-Meldung https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards (gesperrt); https://cloudsecurityalliance.org/blog/2024/08/15/nist-fips-203-204-and-205-finalized-an-important-step-towards-a-quantum-safe-future |
| F2 | «Hersteller bauen sie schrittweise in Produkte und Protokolle ein»: hybrider Schlüsselaustausch X25519MLKEM768 standardmässig in gängigen Browsern (Chrome, Firefox, Safari) und in OpenSSL 3.5+ | REPORTED | https://www.encryptionconsulting.com/pqc-support-in-web-browsers/ , https://pqaudit.org/algorithms/hybrid-tls-x25519mlkem768/ , IETF-Draft https://datatracker.ietf.org/doc/draft-ietf-tls-ecdhe-mlkem/ |
| F3 | «Genau diese Überlegung treibt derzeit Regulatoren … um»: Beispiel UK NCSC mit Migrationszielen 2028 (Inventar/Plan), 2031 (Priorität), 2035 (Abschluss). Das Krypto-Inventar ist dort der erste Schritt. | REPORTED | https://postquantum.com/quantum-policy/uk-ncsc-timelines-pqc/ , https://quantumsentinel.uk/ncsc-post-quantum-migration-timeline-2028-2031-2035/ . Steht **nicht** im Post, stützt aber die Aussage. |
| F4 | Mechanik HNDL, Quantencomputer bedrohen Public-Key-Verfahren (RSA/ECC via Shor), symmetrische Verfahren sind weniger betroffen | REPORTED / Lehrbuchwissen | https://en.wikipedia.org/wiki/Harvest_now,_decrypt_later . Der Post sagt korrekt «Public-Key-Verfahren». |
| F5 | «Niemand weiss seriös, wann es so weit ist» | Einschätzung | Konsistent mit dem Fehlen eines belastbaren Datums in den Quellen. Keine Jahreszahl im Post ✔. |
| F6 | «Grosskunden» | Erfahrungs- bzw. Markteinschätzung | nicht extern prüfbar, weich formuliert |

Hinweis für den Fach-Owner: Die Mosca-Logik («Vertraulichkeitsdauer + Umstellungszeit > Zeit bis zum Quantencomputer») ist korrekt vereinfacht.

## 4. Gate-Vorprüfung

| Gate | Befund | Status |
|------|--------|--------|
| **1 Fach** (CISO) | NIST-Aussage stimmt mit F1 überein. Unbelegte Zahlenspanne entfernt. Keine Panik-Jahreszahlen. **Nicht durch KI ersetzbar.** | Vorprüfung bestanden · **menschlich offen** |
| **2 Legal** | Keine Superlative, keine Herstellerbewertung ✔. Keine Platzhalter ✔. | Vorprüfung bestanden |
| **3 Accessibility** | Repo-PNG mit **weissem 87-px-Balken** (Renderfehler). Neues Asset in `freigabe/assets/11-harvest/`. Der **Alt-Text im Draft beschreibt eine Animation**. Für Static ist das falsch. Neuer Alt-Text siehe unten. Kosmetik: Im Dreiteiler ist die erste Box niedriger als die beiden anderen (einzeiliges Label). Das ist kein Barrierefreiheitsmangel. Grafikinhalte stehen auch im Text ✔. Hashtags in korrekter Schreibweise ✔. Keine Emojis ✔. | **Korrektur nötig → erledigt** |
| **4 Security-Redline** | Laut Matrix §3 Standard-Post: Redline als Stichprobe. Keine Angriffsdetails. | Stichprobe CISO |

**Alt-Text (Static):**

> Grafik von CYSPA, Serie Future Security: «Harvest now, decrypt later». Titel: Heute abgefangen. Morgen entschlüsselt. Eine Zeitachse mit drei Stationen: Heute, abfangen: Verschlüsselter Datenverkehr wird aufgezeichnet. Jahrelang, speichern: Aufzeichnen und Lagern ist günstig. Morgen, entschlüsseln: sobald Quantencomputer heutige Public-Key-Verfahren brechen. Darunter die Frage: Wie lange müssen Ihre Daten vertraulich bleiben? Fusszeile: Erster Schritt im Beitrag, das Krypto-Inventar.

(Alt-Text am 27.09.2026 an das neue Visual im CYSPA CI v3.0 angepasst. Neues Visual: `cyspa-marketing/linkedin/visuals-ci3/11-harvest/2026-10-13-p10-harvest.png`, Fakten-Karte 1200×1200, Variante «timeline», Static. Grafiktext gegenüber dem alten Visual: Headline «Heute abgefangen. Morgen entschlüsselt.» nach dem ersten Satz des Post-Texts, der Begriff steht als Kicker darüber; Schloss- und Archiv-Icons durch eine Zeitachse mit Kurzbeschreibungen aus dem Post-Text ersetzt. Keine Jahreszahl, keine Zahl in der Grafik.)

## 5. Erster Kommentar

Laut Draft keiner nötig.
**Optional ECSM und Quelle (durch die Stellvertretung, nur wenn verfügbar):**

```text
Zum European Cybersecurity Month ein Lesetipp für Ihr Krypto-Inventar: Die Standards FIPS 203, 204 und 205 des NIST sind öffentlich und kostenlos verfügbar (csrc.nist.gov).
```

(Den Link csrc.nist.gov vorab im Browser prüfen. Er ist aus dieser Umgebung gesperrt.)

## 6. Freigabe durch LWE

- ☐ Fachlich freigegeben (Name: ____________________, CISO / Security Advisor)
- ☐ Legal
- ☐ Accessibility
- ☐ Redline (Stichprobe)
- ☐ Freigabe Head of Content/LWE, inkl. **Entscheid Static statt Motion**

**Publikationsanleitung**

1. Bis **Mi 30.09.2026** für **Di 13.10.2026, 08:15 Uhr** einplanen.
2. Bild: `cyspa-marketing/linkedin/freigabe/assets/11-harvest/2026-10-13-p10-harvest.png`
3. Alt-Text (Static) aus Abschnitt 4.
4. Post-Text aus Abschnitt 2. Kein Pflichtkommentar.
5. Engagement 08:15–09:15 Uhr: **Social Selling Specialist** und **CISO / Security Advisor** (Fachfragen zu PQC. Keine Aussagen zu konkreten Jahreszahlen. Keine Produktempfehlungen in Kommentaren).
