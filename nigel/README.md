# NIGEL 2.0 – Discovery-Werkzeuge

Arbeitsstand für den Blueprint «NIGEL 2.0 | Claude Master Execution Blueprint». Aktueller Stand und offene Entscheidungen: [`CYCLE_0_REPORT.md`](CYCLE_0_REPORT.md). Benötigte Zugriffe: [`ACCESS_REQUEST.md`](ACCESS_REQUEST.md).

## Inventur ausführen

Das Skript liest nur. Es schreibt nichts ins Vault und lehnt einen Ausgabeordner im Vault ab.

1. `scripts/Invoke-NigelVaultInventory.ps1` auf deinen Rechner laden (nicht ins Vault legen).
2. PowerShell öffnen und ausführen:

   ```powershell
   powershell -ExecutionPolicy Bypass -File .\Invoke-NigelVaultInventory.ps1 `
     -VaultPath "C:\Users\LeilaWeberCYSPA\OneDrive - CYSPA GmbH\Dokumente\Obsidian Vault"
   ```

   Optional: `-IncludeClaudeConfig` listet konfigurierte MCP-Server (nur Namen und Variablennamen).

3. Ergebnis liegt in `%USERPROFILE%\NigelAudit\<Zeitstempel>\`.
4. **Vor dem Teilen** `SENSITIVE_FINDINGS.csv` lokal ansehen. Es enthält nur Pfad, Zeile und Mustername, aber schon ein Dateiname kann vertraulich sein.
5. `SUMMARY.md` und `INVENTORY.csv` hier teilen (Chat oder `nigel/input/` im Repo).

| Schalter | Wirkung |
|---|---|
| `-OutputPath` | anderer Ausgabeordner (muss ausserhalb des Vaults liegen) |
| `-IncludeHidden` | `.obsidian`, `.trash` mit inventarisieren |
| `-HydrateCloudFiles` | OneDrive-Dateien «nur online» auch lesen (lädt sie herunter) |
| `-IncludeClaudeConfig` | Claude-Desktop-/Claude-Code-Konfiguration auf MCP-Server prüfen |
| `-MaxContentMB` | grössere Dateien nur auflisten (Standard 20) |

## Ausgaben

| Datei | Inhalt |
|---|---|
| `INVENTORY.csv` | eine Zeile pro Datei: Pfad, Grösse, Datum, SHA256, Frontmatter-Felder, Rollenvermutung |
| `FOLDER_SUMMARY.csv` | Dateien, Grösse, letzte Änderung pro Ordner (Ebene 1 und 2) |
| `DUPLICATES_RAW.csv` | gleicher Inhalt oder gleicher Notizname in verschiedenen Ordnern |
| `BROKEN_LINKS.csv` | Wikilinks ohne Ziel |
| `AGENT_SKILL_CANDIDATES.csv` | Skills, Agenten, Prompts, SOPs, Vorlagen, Configs |
| `SENSITIVE_FINDINGS.csv` | mögliche Geheimnisse/Personendaten, ohne Wert |
| `OBSIDIAN_PLUGINS.csv` | Core- und Community-Plugins |
| `CLAUDE_CONFIG.csv` | nur mit `-IncludeClaudeConfig` |
| `SUMMARY.md` | Zählwerte, keine Bewertung |
| `RUN_MANIFEST.json` | Parameter, Fehler, SHA256 aller Ausgaben |

## Test

```powershell
pwsh -NoProfile -File nigel/tests/Test-NigelVaultInventory.ps1
```

Baut ein synthetisches Vault in einem Temp-Ordner, prüft 21 Punkte und räumt danach auf. Exit-Code 0 heisst bestanden.
