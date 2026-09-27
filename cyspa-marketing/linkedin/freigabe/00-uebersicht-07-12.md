---
tags: [linkedin, freigabe, batch-1, uebersicht]
status: freigabepakete-bereit-gates-offen
date: 2026-09-27
source: claude
post_nr: "07-12"
slot: "2026-09-29 bis 2026-10-15"
---

# Freigabe LinkedIn #07–#12: Übersicht für LWE

Stand So 27.09.2026. LWE ist ab **Do 01.10.2026** in den Ferien. **Letzter Arbeitstag für Freigaben und Einplanung: Mi 30.09.2026.**
Die Pakete wurden mit KI-Unterstützung erstellt. Gate 1 (Fach) ist nur vorgeprüft und bleibt nach §4.5 beim menschlichen Fach-Owner. Die Primärquellen (admin.ch, nist.gov) waren aus der Arbeitsumgebung gesperrt. Deshalb sind alle Faktenprüfungen **REPORTED**, keine ist VERIFIED.

> **Hinweis:** Copy-Regeln CI v3 angewendet am 27.09.2026; Visuals werden im CI v3 neu gebaut (visuals-ci3/).

## Tabelle

| Post | Slot | Status Paket | Was LWE vor Mi 30.09. tun muss | Risiko |
|------|------|--------------|--------------------------------|--------|
| [#07 NIS2](2026-09-29-07-nis2-schweizer-unternehmen.md) (P6) | Di 29.09., 08:15 | Text final; Gates 2/3 vorgeprüft; Asset neu gerendert | Fach-OK Regulatory Expert (inkl. Art.-26-Ergänzung, optionaler Aktualitätssatz DE/AT). Legal (verstärkt). Selbst posten, anwesend. | **niedrig**. Nur das korrigierte PNG verwenden. |
| [#08 Budget](2026-10-01-08-security-budget-reihenfolge.md) (P8) | Do 01.10., 08:15 | Text final (MFA/CISO ausgeschrieben, «Mehrheit» entschärft); bewusst ohne Visual | Fach-OK CISO. **Einplanen**, weil der Slot auf den ersten Ferientag fällt. Engagement-Stellvertretung benennen. | **mittel**: knapper Vorlauf, erster Ferientag |
| [#09 Pentest](2026-10-06-09-pentest-login.md) (P9) | Di 06.10., 08:15 | Text final («Mehrfaches» entschärft); Asset neu gerendert | Fach-OK Pentest-Owner **und obligatorische Redline plus Freigabe durch den CISO**, dann einplanen. Ohne CISO-Freigabe nicht einplanen. | **hoch**: zwei Personen, Veto möglich |
| [#10 Tabletop](2026-10-08-10-tabletop-uebung.md) (P12) | Do 08.10., 08:15 | Text final (BACS ausgeschrieben); PDF vorhanden; erster Kommentar mit Arbeits-URL | Fach-OK IR und GRC (inkl. Klärung 90 Min / halber Tag). **Landingpage-URL `https://www.cyspa.ch/tabletop` bestätigen** (ZU BESTÄTIGEN). Stellvertretung für den ersten Kommentar und die Lead-Übergabe bestimmen. PDF einmal durchblättern. | **hoch**: harter CTA hängt an URL und manuellem Kommentar |
| [#11 Harvest](2026-10-13-11-harvest-now-decrypt-later.md) (P10) | Di 13.10., 08:15 | Text final (Zahlenspanne 10–20 J. entfernt); Static empfohlen, neuer Alt-Text | Fach-OK CISO. **Entscheid Static statt Motion** (Empfehlung: Static). Einplanen. | **niedrig** |
| [#12 Partner](2026-10-15-12-inside-cyspa-partner.md) (P11) | Do 15.10., 08:15 | Plan B (typografische Grafik, ohne Platzhalter) publikationsreif; Plan A offen | **Entscheid Plan A oder B.** Plan A nur mit dokumentierten Einwilligungen aller Abgebildeten, OPSEC-Check und dem vom Team geschriebenen Absatz. Sonst Plan B. Einplanen. | **mittel** bei Plan A (Einwilligungen), **niedrig** bei Plan B |

## Querschnittsbefunde

1. **Renderfehler in allen Repo-PNGs:** Unten sitzt ein weisser Balken von 87 px (1200×1500: Zeilen 1413–1499; 1080×1350: Zeilen 1263–1349). Ursache: `build.mjs` rendert mit dem neuen Headless-Chromium. Dort zählt `--window-size` die Fensterleiste mit. Alle Assets für #07, #09, #10 und #11 wurden mit `chromium_headless_shell` neu gerendert, **Inhalt unverändert**, und per Pixelprüfung als fehlerfrei bestätigt. Sie liegen unter `assets/`. **Den gleichen Fehler haben auch die Repo-PNGs der bereits geplanten oder publizierten Posts #01–#06.** Bitte prüfen. Die Korrektur der Pipeline im Repo ist nicht Teil dieses Auftrags.
2. **Stellvertretung während der Ferien (01.10.–?):** Für #08–#12 braucht es eine Person mit Admin- oder Kommentarrechten auf der Unternehmensseite für das 60-Minuten-Engagement und für den ersten Kommentar von #10. Rollen laut Strategie: Social Selling Specialist und der jeweilige Fach-Owner. **Namen muss LWE festlegen.**
3. **Planungsfunktion LinkedIn (ZU PRÜFEN):** Nicht verifiziert ist, ob Dokument-Posts (#10) vorplanbar sind und ob ein erster Kommentar vorplanbar ist. Falls nicht, veröffentlicht die Stellvertretung manuell.
4. **Posting-Stopp (§4.2):** Bei einem Grossvorfall in der Schweiz oder einem Vorfall mit Bezug zu CYSPA oder einem Kunden verschiebt die Stellvertretung geplante Posts. Das gilt besonders für #10 (Ransomware-Szenario). LWE sollte festlegen, wer das in ihrer Abwesenheit entscheidet (laut §4.2: IR Specialist oder CISO).
5. **Mix-Kontrolle:** Harter CTA nur in #10 ✔. Segmentwechsel bleibt unverändert ✔. «1 Motion» in Batch 1 entfällt, wenn #11 als Static erscheint. Das im KPI-Review KW 43 vermerken.
6. **ECSM:** Für #08–#12 sind optionale Kommentarsätze enthalten, nie als Aufhänger. Sie müssen nicht gesetzt werden.

## Assets (Freigabeordner)

| Post | Datei |
|------|-------|
| #07 | `assets/07-nis2/2026-09-29-p06-nis2.png` |
| #08 | – (bewusst Textpost) |
| #09 | `assets/09-pentest/2026-10-06-p09-pentest.png` |
| #10 | `assets/10-tabletop/2026-10-08-p12-tabletop.pdf` (+ `slide-01…06.png` Vorschau) |
| #11 | `assets/11-harvest/2026-10-13-p10-harvest.png` |
| #12 | Plan B: `assets/12-partner-planb/2026-10-15-p11-partner-planb.png` · Plan A: Teamfoto fehlt |

## Freigabe-Sammelblock

| Post | Fach | Legal | Accessibility | Redline | Head of Content/LWE |
|------|------|-------|---------------|---------|---------------------|
| #07 | ☐ | ☐ | ☐ | n/a | ☐ |
| #08 | ☐ | ☐ | ☐ | Stichprobe | ☐ |
| #09 | ☐ | ☐ | ☐ | ☐ **obligatorisch** | ☐ + CISO ☐ |
| #10 | ☐ IR ☐ GRC | ☐ (URL) | ☐ | ☐ | ☐ |
| #11 | ☐ | ☐ | ☐ | Stichprobe | ☐ (Static) |
| #12 | n/a | ☐ (Plan A: Einwilligungen) | ☐ | ☐ OPSEC | ☐ (Plan A/B) |
