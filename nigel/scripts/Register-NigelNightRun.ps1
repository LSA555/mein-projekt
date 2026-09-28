<#
.SYNOPSIS
    Richtet den begrenzten NIGEL-Nachtlauf als Windows-Aufgabe ein (oder zeigt nur an, was passieren würde).

.DESCRIPTION
    Startet jede Nacht Claude Code headless im Projektordner mit dem Auftrag "/nigel-run Nachtlauf".
    Die Grenzen setzt die Engine, nicht dieses Skript: max. 5 Aufgaben, max. 60 Minuten, keine externen
    Aktionen, nur Phasen, die der Ablauf nachts erlaubt. Morgens liegt der Bericht unter .nigel/night/.

    Ohne -Register passiert nichts ausser einer Vorschau (Standard).

    Werkzeuge im Nachtlauf (--allowedTools): nur Lesen, Schreiben von Entwürfen und die Engine.
    Kein WebFetch, keine MCP-Connectoren, also kein Mail- oder CRM-Zugriff.

.EXAMPLE
    .\Register-NigelNightRun.ps1 -ProjectPath "C:\Users\me\code\mein-projekt"            # nur Vorschau
    .\Register-NigelNightRun.ps1 -ProjectPath "C:\Users\me\code\mein-projekt" -Register  # einrichten
    Unregister-ScheduledTask -TaskName "NIGEL Nachtlauf" -Confirm:$false                  # entfernen
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$ProjectPath,
    [string]$Time = "02:15",
    [string]$TaskName = "NIGEL Nachtlauf",
    [switch]$Register
)
$ErrorActionPreference = 'Stop'

if (-not (Test-Path -LiteralPath (Join-Path $ProjectPath 'nigel\engine\nigel.py'))) {
    throw "Kein NIGEL-Projekt gefunden unter: $ProjectPath"
}
$claude = (Get-Command claude -ErrorAction SilentlyContinue)
if (-not $claude) { throw "Claude Code (Befehl 'claude') nicht im PATH." }
$python = (Get-Command python3 -ErrorAction SilentlyContinue)
if (-not $python) {
    Write-Warning "'python3' nicht im PATH. Der Schutz-Hook und die Engine laufen damit nicht. Erst beheben (siehe SECTION_13_REPORT.md, Voraussetzung 2)."
}

$allowed = 'Read Grep Glob Write Edit "Bash(python3 nigel/engine/nigel.py:*)"'
$log = Join-Path $ProjectPath '.nigel\night\claude-run.log'
$inner = "Set-Location -LiteralPath '$ProjectPath'; New-Item -ItemType Directory -Force -Path '.nigel\night' | Out-Null; " +
         "claude -p '/nigel-run Nachtlauf fuer heute. Halte dich strikt an night plan/check/report.' " +
         "--allowedTools $allowed --max-turns 80 *>> '$log'"
$argument = "-NoProfile -ExecutionPolicy Bypass -Command `"$inner`""

Write-Host "Aufgabe     : $TaskName"
Write-Host "Zeit        : täglich $Time"
Write-Host "Ordner      : $ProjectPath"
Write-Host "Befehl      : powershell.exe $argument"
Write-Host "Log         : $log"

if (-not $Register) {
    Write-Host ""
    Write-Host "Nur Vorschau. Zum Einrichten mit -Register erneut ausführen."
    return
}

$action = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument $argument -WorkingDirectory $ProjectPath
$trigger = New-ScheduledTaskTrigger -Daily -At $Time
$settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit (New-TimeSpan -Minutes 75) -StartWhenAvailable -DontStopOnIdleEnd
Register-ScheduledTask -TaskName $TaskName -Action $action -Trigger $trigger -Settings $settings `
    -Description "NIGEL begrenzter Nachtlauf (max. 5 Aufgaben / 60 Min., keine externen Aktionen)" -Force | Out-Null
Write-Host "Eingerichtet. Prüfen: Get-ScheduledTask -TaskName '$TaskName'"
