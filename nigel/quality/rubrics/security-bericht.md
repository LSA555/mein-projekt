---
rubric: security-bericht
version: 1.0.0
threshold: 90
applies_to: Security-Assessment-Bericht, Gap-Analyse, GRC-Nachweis
---

# Bewertungsraster: Security-Bericht

## Muss-Kriterien (eines verfehlt → nicht bestanden)

- M1 Schriftliche Beauftragung liegt vor, Scope ist im Bericht genannt, nichts ausserhalb des Scopes bewertet.
- M2 Jeder Befund hat einen Beleg (Datei, Zeile, Konfigurationsauszug) und eine Schweregrad-Begründung.
- M3 Keine Zugangsdaten, Schlüssel oder personenbezogenen Daten im Bericht.
- M4 Menschliche fachliche Abnahme ist vorgesehen und benannt.

## Punkte (100)

| # | Kriterium | Punkte | Voll erfüllt, wenn |
|---|---|---|---|
| 1 | Management Summary | 15 | Eine Seite: Gesamtbild, Top-3-Risiken, Entscheidungsbedarf |
| 2 | Befundqualität | 20 | Reproduzierbar, konkret, ohne Übertreibung |
| 3 | Schweregrad | 10 | Einheitliche Methode (z. B. CVSS oder Matrix), nachvollziehbar |
| 4 | Kontrollzuordnung | 15 | Jeder Befund einer Kontrolle zugeordnet (ISO 27001:2022, NIS2, revDSG), Version genannt |
| 5 | Empfehlungen | 15 | Umsetzbar, priorisiert, mit Aufwand und Verantwortlichem |
| 6 | Struktur | 10 | Scope, Methode, Befunde, Massnahmenplan, Anhang |
| 7 | CI und Sprache | 10 | `cyspa-docx`, präzise Fachsprache, Deutsch (Schweiz) |
| 8 | Vertraulichkeit | 5 | Klassifizierung auf jeder Seite, Verteiler genannt |
