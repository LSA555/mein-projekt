<#
.SYNOPSIS
    Read-only inventory of an Obsidian vault for the NIGEL 2.0 discovery phase (Blueprint section 2.1).

.DESCRIPTION
    Walks the vault, records metadata per file and writes CSV/JSON/Markdown results to an output
    folder OUTSIDE the vault. The script never writes, moves or deletes anything inside the vault.

    Outputs (in -OutputPath):
      INVENTORY.csv              one row per file: path, size, dates, hash, frontmatter fields, role guess
      FOLDER_SUMMARY.csv         file count, size and last change per first- and second-level folder
      DUPLICATES_RAW.csv         identical content (same SHA256) and identical note names in different folders
      BROKEN_LINKS.csv           [[wikilinks]] whose target does not exist in the vault
      AGENT_SKILL_CANDIDATES.csv files that look like agents, skills, prompts, SOPs, templates or configs
      SENSITIVE_FINDINGS.csv     file + line + pattern name for possible secrets / personal data (never the value)
      OBSIDIAN_PLUGINS.csv       enabled core and community plugins
      CLAUDE_CONFIG.csv          only with -IncludeClaudeConfig: MCP server names and env var NAMES (never values)
      SUMMARY.md                 counts only, no interpretation
      RUN_MANIFEST.json          parameters, timings, errors and SHA256 of every output file

    OneDrive: files that are "online only" are NOT opened by default, because reading them would
    download them. They are listed with ContentStatus = CloudOnlySkipped. Use -HydrateCloudFiles to read them.

    Compatible with Windows PowerShell 5.1 and PowerShell 7+.

.EXAMPLE
    powershell -ExecutionPolicy Bypass -File .\Invoke-NigelVaultInventory.ps1 `
        -VaultPath "C:\Users\me\OneDrive - Firma\Dokumente\Obsidian Vault"

.EXAMPLE
    .\Invoke-NigelVaultInventory.ps1 -VaultPath "D:\Vault" -OutputPath "D:\Audit\run1" -IncludeClaudeConfig
#>
[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$VaultPath,

    [string]$OutputPath,

    # Also read hidden/system folders like .obsidian and .trash into INVENTORY.csv (plugins are always listed).
    [switch]$IncludeHidden,

    # Read OneDrive "online only" files (triggers download).
    [switch]$HydrateCloudFiles,

    # Inspect local Claude Desktop / Claude Code config files for MCP server names (values are never exported).
    [switch]$IncludeClaudeConfig,

    # Files larger than this are listed but not hashed or scanned.
    [int]$MaxContentMB = 20
)

Set-StrictMode -Version 2.0
$ErrorActionPreference = 'Stop'
$ScriptVersion = '1.0.0'
$startedUtc = (Get-Date).ToUniversalTime()
$runErrors = New-Object System.Collections.Generic.List[string]

# ---------------------------------------------------------------- paths and guards
if (-not (Test-Path -LiteralPath $VaultPath -PathType Container)) {
    throw "VaultPath not found or not a folder: $VaultPath"
}
$vaultRoot = (Resolve-Path -LiteralPath $VaultPath).ProviderPath.TrimEnd('\', '/')

if (-not $OutputPath) {
    $homeDir = $env:USERPROFILE
    if (-not $homeDir) { $homeDir = $env:HOME }
    $OutputPath = Join-Path (Join-Path $homeDir 'NigelAudit') ($startedUtc.ToString('yyyyMMdd-HHmmss'))
}
# check BEFORE creating anything, so a wrong path never touches the vault
$outRoot = $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath($OutputPath).TrimEnd('\', '/')
$sep = [System.IO.Path]::DirectorySeparatorChar
if (($outRoot + $sep).StartsWith($vaultRoot + $sep, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "OutputPath must be outside the vault (read-only rule). Got: $outRoot"
}
if (-not (Test-Path -LiteralPath $outRoot)) {
    New-Item -ItemType Directory -Path $outRoot -Force | Out-Null
}

function Get-RelativePath([string]$fullPath) {
    return $fullPath.Substring($vaultRoot.Length).TrimStart('\', '/').Replace('\', '/')
}

# ---------------------------------------------------------------- patterns
# Sensitive patterns: only the NAME of a hit is exported, never the matched text.
$sensitivePatterns = [ordered]@{
    'PrivateKeyBlock'   = '-----BEGIN [A-Z ]*PRIVATE KEY-----'
    'AnthropicKey'      = 'sk-ant-[A-Za-z0-9_\-]{20,}'
    'OpenAIStyleKey'    = '\bsk-[A-Za-z0-9]{20,}'
    'GitHubToken'       = '\bgh[pousr]_[A-Za-z0-9]{30,}'
    'AWSAccessKey'      = '\bAKIA[0-9A-Z]{16}\b'
    'SlackToken'        = '\bxox[abprs]-[A-Za-z0-9\-]{10,}'
    'JWT'               = '\beyJ[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]{5,}'
    'CredentialAssign'  = '(?i)\b(password|passwort|kennwort|pwd|api[_\-]?key|client[_\-]?secret|secret|token)\s*[:=]\s*[^\s]{6,}'
    'IBAN'              = '\b[A-Z]{2}\d{2}(?:\s?[A-Z0-9]{4}){3,7}(?:\s?[A-Z0-9]{1,4})?\b'
    'SwissAHV'          = '\b756\.\d{4}\.\d{4}\.\d{2}\b'
    'CreditCardLike'    = '\b(?:\d{4}[ \-]?){3}\d{4}\b'
}

$wikilinkRegex = [regex]'!?\[\[([^\]\|#\^]+)(?:[#\^][^\]\|]*)?(?:\|[^\]]*)?\]\]'
$textExtensions = @('.md', '.txt', '.json', '.yaml', '.yml', '.csv', '.canvas', '.js', '.ts', '.py', '.ps1', '.toml', '.ini', '.xml', '.html', '.css')

function Get-RoleGuess([string]$rel, [string]$name) {
    $n = $name.ToLowerInvariant()
    $r = $rel.ToLowerInvariant()
    if ($n -eq 'skill.md') { return 'Skill' }
    if ($n -eq 'agent.md' -or $n -eq 'claude.md' -or $n -eq 'agents.md') { return 'AgentDefinition' }
    if ($n -match 'mcp' -and $n -match '\.json$') { return 'McpConfig' }
    if ($r -match '(^|/)\.claude/') { return 'ClaudeConfig' }
    if ($r -match 'agent registry|agent-registry|/agents?/') { return 'AgentRecord' }
    if ($r -match '/skills?/') { return 'SkillMaterial' }
    if ($r -match 'prompt') { return 'Prompt' }
    if ($r -match '(^|/)(sops?|runbooks?)(/|$)' -or $n -match '^sop[ _\-]') { return 'SOP' }
    if ($r -match 'template|vorlage') { return 'Template' }
    if ($r -match 'daily' -and $n -match '^\d{4}-\d{2}-\d{2}') { return 'DailyNote' }
    if ($r -match 'meeting|besprechung|protokoll') { return 'MeetingNote' }
    if ($r -match 'automation|workflow|n8n|zapier|power automate') { return 'Automation' }
    return ''
}

function Read-Frontmatter([string]$text) {
    $result = @{}
    if (-not $text) { return $result }
    $lines = $text -split "`r?`n"
    if ($lines.Count -lt 2 -or $lines[0].Trim() -ne '---') { return $result }
    $result['__present'] = $true
    $currentKey = $null
    for ($i = 1; $i -lt $lines.Count; $i++) {
        $line = $lines[$i]
        if ($line.Trim() -eq '---' -or $line.Trim() -eq '...') { return $result }
        if ($line -match '^([A-Za-z0-9_\-]+)\s*:\s*(.*)$') {
            $currentKey = $Matches[1].ToLowerInvariant()
            $val = $Matches[2].Trim()
            $val = ($val -replace '\s+#.*$', '').Trim()
            if ($val.StartsWith('[') -and $val.EndsWith(']')) {
                $val = ($val.Trim('[', ']') -split ',' | ForEach-Object { $_.Trim().Trim('"', "'") } | Where-Object { $_ }) -join ';'
            }
            $result[$currentKey] = $val.Trim('"', "'")
        }
        elseif ($currentKey -and $line -match '^\s+-\s+(.+)$') {
            $item = $Matches[1].Trim().Trim('"', "'")
            if ($result[$currentKey]) { $result[$currentKey] = $result[$currentKey] + ';' + $item }
            else { $result[$currentKey] = $item }
        }
    }
    # no closing delimiter: not valid frontmatter
    return @{ '__present' = $true; '__invalid' = $true }
}

function Get-Fm($fm, [string]$key) {
    if ($fm.ContainsKey($key)) { return [string]$fm[$key] }
    return ''
}

# ---------------------------------------------------------------- walk the vault
Write-Host "NIGEL vault inventory v$ScriptVersion (read-only)"
Write-Host "Vault : $vaultRoot"
Write-Host "Output: $outRoot"

$allFiles = @(Get-ChildItem -LiteralPath $vaultRoot -Recurse -File -Force -ErrorAction SilentlyContinue)
if (-not $IncludeHidden) {
    $allFiles = @($allFiles | Where-Object {
            $rel = Get-RelativePath $_.FullName
            -not ($rel -match '(^|/)\.(obsidian|trash|git)(/|$)')
        })
}

$cloudOnlyMask = 0x00400000 -bor 0x00001000 -bor 0x00040000   # RecallOnDataAccess | Offline | RecallOnOpen
$inventory = New-Object System.Collections.Generic.List[object]
$sensitive = New-Object System.Collections.Generic.List[object]
$linkRecords = New-Object System.Collections.Generic.List[object]
$noteNames = @{}   # lowercase basename-without-extension and relative path -> $true

foreach ($f in $allFiles) {
    $rel = Get-RelativePath $f.FullName
    $noteNames[$f.BaseName.ToLowerInvariant()] = $true
    $noteNames[$f.Name.ToLowerInvariant()] = $true
    $noteNames[($rel.ToLowerInvariant() -replace '\.md$', '')] = $true
}

$i = 0
foreach ($f in $allFiles) {
    $i++
    if ($i % 200 -eq 0) { Write-Progress -Activity 'Inventory' -Status "$i / $($allFiles.Count)" -PercentComplete (100 * $i / $allFiles.Count) }

    $rel = Get-RelativePath $f.FullName
    $parts = $rel -split '/'
    $top = ''
    if ($parts.Count -gt 1) { $top = $parts[0] }
    $second = ''
    if ($parts.Count -gt 2) { $second = $parts[0] + '/' + $parts[1] }
    $ext = $f.Extension.ToLowerInvariant()

    $row = [ordered]@{
        RelativePath    = $rel
        TopFolder       = $top
        SecondFolder    = $second
        Name            = $f.Name
        Extension       = $ext
        SizeBytes       = $f.Length
        LastModifiedUtc = $f.LastWriteTimeUtc.ToString('yyyy-MM-ddTHH:mm:ssZ')
        CreatedUtc      = $f.CreationTimeUtc.ToString('yyyy-MM-ddTHH:mm:ssZ')
        RoleGuess       = Get-RoleGuess $rel $f.Name
        ContentStatus   = 'NotRead'
        SHA256          = ''
        HasFrontmatter  = ''
        FrontmatterOK   = ''
        FmTags          = ''
        FmStatus        = ''
        FmDate          = ''
        FmSource        = ''
        FmChatUrl       = ''
        FmOwner         = ''
        FmCompany       = ''
        FmProject       = ''
        FmPara          = ''
        WordCount       = ''
        WikilinkCount   = ''
        SensitiveHits   = ''
    }

    $isCloudOnly = (([int]$f.Attributes) -band $cloudOnlyMask) -ne 0
    if ($isCloudOnly -and -not $HydrateCloudFiles) {
        $row.ContentStatus = 'CloudOnlySkipped'
    }
    elseif ($f.Length -gt ($MaxContentMB * 1MB)) {
        $row.ContentStatus = 'TooLargeSkipped'
    }
    else {
        try {
            $row.SHA256 = (Get-FileHash -LiteralPath $f.FullName -Algorithm SHA256).Hash
            $row.ContentStatus = 'Hashed'
            if ($textExtensions -contains $ext) {
                $text = [System.IO.File]::ReadAllText($f.FullName, [System.Text.Encoding]::UTF8)
                $row.ContentStatus = 'Read'

                if ($ext -eq '.md') {
                    $fm = Read-Frontmatter $text
                    $row.HasFrontmatter = [bool]$fm.ContainsKey('__present')
                    if ($fm.ContainsKey('__present')) { $row.FrontmatterOK = -not $fm.ContainsKey('__invalid') }
                    $row.FmTags = Get-Fm $fm 'tags'
                    $row.FmStatus = Get-Fm $fm 'status'
                    $row.FmDate = Get-Fm $fm 'date'
                    $row.FmSource = Get-Fm $fm 'source'
                    $row.FmChatUrl = [bool](Get-Fm $fm 'chat_url')
                    $row.FmOwner = Get-Fm $fm 'owner'
                    $row.FmCompany = Get-Fm $fm 'company'
                    $row.FmProject = Get-Fm $fm 'project'
                    $row.FmPara = Get-Fm $fm 'para'
                    $row.WordCount = @($text -split '\s+' | Where-Object { $_ }).Count

                    $links = $wikilinkRegex.Matches($text)
                    $row.WikilinkCount = $links.Count
                    foreach ($m in $links) {
                        $linkRecords.Add([pscustomobject]@{ Source = $rel; Target = $m.Groups[1].Value.Trim() })
                    }
                }

                $hitNames = New-Object System.Collections.Generic.List[string]
                $lines = $text -split "`r?`n"
                for ($ln = 0; $ln -lt $lines.Count; $ln++) {
                    foreach ($pName in $sensitivePatterns.Keys) {
                        if ($lines[$ln] -match $sensitivePatterns[$pName]) {
                            $sensitive.Add([pscustomobject]@{ RelativePath = $rel; Line = $ln + 1; Pattern = $pName })
                            if (-not $hitNames.Contains($pName)) { $hitNames.Add($pName) }
                        }
                    }
                }
                $row.SensitiveHits = ($hitNames -join ';')
            }
        }
        catch {
            $row.ContentStatus = 'Error'
            $runErrors.Add("$rel : $($_.Exception.Message)")
        }
    }
    $inventory.Add([pscustomobject]$row)
}
Write-Progress -Activity 'Inventory' -Completed

# ---------------------------------------------------------------- derived reports
$folderSummary = @(
    $inventory | Where-Object { $_.TopFolder } | Group-Object TopFolder | ForEach-Object {
        [pscustomobject]@{
            Level = 1; Folder = $_.Name; Files = $_.Count
            SizeBytes = ($_.Group | Measure-Object SizeBytes -Sum).Sum
            Markdown = @($_.Group | Where-Object { $_.Extension -eq '.md' }).Count
            LastModifiedUtc = ($_.Group | Sort-Object LastModifiedUtc -Descending | Select-Object -First 1).LastModifiedUtc
        }
    }
    $inventory | Where-Object { $_.SecondFolder } | Group-Object SecondFolder | ForEach-Object {
        [pscustomobject]@{
            Level = 2; Folder = $_.Name; Files = $_.Count
            SizeBytes = ($_.Group | Measure-Object SizeBytes -Sum).Sum
            Markdown = @($_.Group | Where-Object { $_.Extension -eq '.md' }).Count
            LastModifiedUtc = ($_.Group | Sort-Object LastModifiedUtc -Descending | Select-Object -First 1).LastModifiedUtc
        }
    }
)

$duplicates = New-Object System.Collections.Generic.List[object]
$inventory | Where-Object { $_.SHA256 -and $_.SizeBytes -gt 0 } | Group-Object SHA256 | Where-Object { $_.Count -gt 1 } | ForEach-Object {
    $key = $_.Name
    foreach ($item in $_.Group) { $duplicates.Add([pscustomobject]@{ Kind = 'SameContent'; GroupKey = $key.Substring(0, 12); RelativePath = $item.RelativePath; LastModifiedUtc = $item.LastModifiedUtc }) }
}
$inventory | Where-Object { $_.Extension -eq '.md' } | Group-Object { $_.Name.ToLowerInvariant() } | Where-Object { $_.Count -gt 1 } | ForEach-Object {
    $key = $_.Name
    foreach ($item in $_.Group) { $duplicates.Add([pscustomobject]@{ Kind = 'SameNoteName'; GroupKey = $key; RelativePath = $item.RelativePath; LastModifiedUtc = $item.LastModifiedUtc }) }
}

$brokenLinks = @(
    $linkRecords | Where-Object {
        $t = $_.Target.ToLowerInvariant().Replace('\', '/')
        -not ($noteNames.ContainsKey($t) -or $noteNames.ContainsKey(($t -replace '\.md$', '')) -or $noteNames.ContainsKey([System.IO.Path]::GetFileName($t)))
    }
)

$candidates = @($inventory | Where-Object { $_.RoleGuess } | Select-Object RelativePath, RoleGuess, SizeBytes, LastModifiedUtc, FmStatus, FmOwner, FmSource, ContentStatus)

# ---------------------------------------------------------------- Obsidian plugins (read-only)
$plugins = New-Object System.Collections.Generic.List[object]
$obsDir = Join-Path $vaultRoot '.obsidian'
foreach ($pair in @(@('core', 'core-plugins.json'), @('community', 'community-plugins.json'))) {
    $p = Join-Path $obsDir $pair[1]
    if (Test-Path -LiteralPath $p) {
        try {
            $json = [System.IO.File]::ReadAllText($p, [System.Text.Encoding]::UTF8) | ConvertFrom-Json
            if ($json -is [System.Array]) {
                foreach ($id in $json) { $plugins.Add([pscustomobject]@{ Type = $pair[0]; PluginId = [string]$id; Enabled = $true }) }
            }
            else {
                foreach ($prop in $json.PSObject.Properties) { $plugins.Add([pscustomobject]@{ Type = $pair[0]; PluginId = $prop.Name; Enabled = [bool]$prop.Value }) }
            }
        }
        catch { $runErrors.Add("$($pair[1]) : $($_.Exception.Message)") }
    }
}

# ---------------------------------------------------------------- optional: Claude configs (names only)
$claudeConfig = New-Object System.Collections.Generic.List[object]
if ($IncludeClaudeConfig) {
    $homeDir = $env:USERPROFILE
    if (-not $homeDir) { $homeDir = $env:HOME }
    $configFiles = @()
    if ($env:APPDATA) { $configFiles += (Join-Path (Join-Path $env:APPDATA 'Claude') 'claude_desktop_config.json') }
    $configFiles += (Join-Path $homeDir '.claude.json')
    $configFiles += (Join-Path (Join-Path $homeDir '.claude') 'settings.json')
    $configFiles += (Join-Path $vaultRoot '.mcp.json')
    $configFiles += (Join-Path (Join-Path $vaultRoot '.claude') 'settings.json')

    foreach ($cf in $configFiles) {
        if (-not (Test-Path -LiteralPath $cf)) { continue }
        try {
            $json = [System.IO.File]::ReadAllText($cf, [System.Text.Encoding]::UTF8) | ConvertFrom-Json
            $servers = $null
            if ($json.PSObject.Properties.Name -contains 'mcpServers') { $servers = $json.mcpServers }
            if ($servers) {
                foreach ($s in $servers.PSObject.Properties) {
                    $cmd = ''; $envNames = ''; $kind = ''
                    if ($s.Value.PSObject.Properties.Name -contains 'command') { $cmd = [System.IO.Path]::GetFileName([string]$s.Value.command) }
                    if ($s.Value.PSObject.Properties.Name -contains 'type') { $kind = [string]$s.Value.type }
                    if ($s.Value.PSObject.Properties.Name -contains 'url') { $kind = ($kind + ' url').Trim() }
                    if ($s.Value.PSObject.Properties.Name -contains 'env' -and $s.Value.env) { $envNames = ($s.Value.env.PSObject.Properties.Name -join ';') }
                    $claudeConfig.Add([pscustomobject]@{ ConfigFile = $cf; Server = $s.Name; Command = $cmd; Transport = $kind; EnvVarNames = $envNames })
                }
            }
            else {
                $claudeConfig.Add([pscustomobject]@{ ConfigFile = $cf; Server = '(no mcpServers key)'; Command = ''; Transport = ''; EnvVarNames = '' })
            }
        }
        catch { $runErrors.Add("$cf : $($_.Exception.Message)") }
    }
}

# ---------------------------------------------------------------- write outputs
function Save-Csv($data, [string]$name) {
    $path = Join-Path $outRoot $name
    # plain loop: @() on a generic List fails in some PowerShell versions
    $arr = New-Object System.Collections.ArrayList
    if ($null -ne $data) { foreach ($x in $data) { [void]$arr.Add($x) } }
    if ($arr.Count -gt 0) { $arr | Export-Csv -LiteralPath $path -NoTypeInformation -Encoding UTF8 }
    else { Set-Content -LiteralPath $path -Value '' -Encoding UTF8 }
}

Save-Csv $inventory 'INVENTORY.csv'
Save-Csv $folderSummary 'FOLDER_SUMMARY.csv'
Save-Csv $duplicates 'DUPLICATES_RAW.csv'
Save-Csv $brokenLinks 'BROKEN_LINKS.csv'
Save-Csv $candidates 'AGENT_SKILL_CANDIDATES.csv'
Save-Csv $sensitive 'SENSITIVE_FINDINGS.csv'
Save-Csv $plugins 'OBSIDIAN_PLUGINS.csv'
if ($IncludeClaudeConfig) { Save-Csv $claudeConfig 'CLAUDE_CONFIG.csv' }

$md = @($inventory | Where-Object { $_.Extension -eq '.md' })
$count = {
    param($items, $filter)
    @($items | Where-Object $filter).Count
}
$summary = @"
# Vault Inventory Summary

Generated: $($startedUtc.ToString('yyyy-MM-dd HH:mm')) UTC, script v$ScriptVersion, read-only.
Counts only. Interpretation belongs in AUDIT_REPORT.md after review.

| Metric | Value |
|---|---|
| Files total | $($inventory.Count) |
| Markdown notes | $($md.Count) |
| Notes with frontmatter | $(& $count $md { $_.HasFrontmatter -eq $true }) |
| Notes with invalid frontmatter | $(& $count $md { $_.FrontmatterOK -eq $false }) |
| Notes without tags | $(& $count $md { -not $_.FmTags }) |
| Notes without status | $(& $count $md { -not $_.FmStatus }) |
| Notes without source | $(& $count $md { -not $_.FmSource }) |
| Online-only files skipped (OneDrive) | $(& $count $inventory { $_.ContentStatus -eq 'CloudOnlySkipped' }) |
| Files with read errors | $(& $count $inventory { $_.ContentStatus -eq 'Error' }) |
| Duplicate rows (same content) | $(& $count $duplicates { $_.Kind -eq 'SameContent' }) |
| Duplicate rows (same note name) | $(& $count $duplicates { $_.Kind -eq 'SameNoteName' }) |
| Broken wikilinks | $($brokenLinks.Count) |
| Agent/skill/prompt/SOP candidates | $($candidates.Count) |
| Files with sensitive-pattern hits | $(@($sensitive | Select-Object -ExpandProperty RelativePath -Unique).Count) |
| Obsidian plugins listed | $($plugins.Count) |

## Role guesses

| Role | Files |
|---|---|
$((@($candidates | Group-Object RoleGuess | Sort-Object Count -Descending | ForEach-Object { "| $($_.Name) | $($_.Count) |" })) -join "`n")

## First-level folders

| Folder | Files | Markdown | Last change (UTC) |
|---|---|---|---|
$((@($folderSummary | Where-Object { $_.Level -eq 1 } | Sort-Object Folder | ForEach-Object { "| $($_.Folder) | $($_.Files) | $($_.Markdown) | $($_.LastModifiedUtc) |" })) -join "`n")

Sensitive-pattern hits are heuristics (false positives likely). Review SENSITIVE_FINDINGS.csv locally before sharing any output.
"@
Set-Content -LiteralPath (Join-Path $outRoot 'SUMMARY.md') -Value $summary -Encoding UTF8

$outputHashes = [ordered]@{}
Get-ChildItem -LiteralPath $outRoot -File | Where-Object { $_.Name -ne 'RUN_MANIFEST.json' } | Sort-Object Name | ForEach-Object {
    $outputHashes[$_.Name] = (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash
}
$manifest = [ordered]@{
    script             = 'Invoke-NigelVaultInventory.ps1'
    scriptVersion      = $ScriptVersion
    powershell         = $PSVersionTable.PSVersion.ToString()
    startedUtc         = $startedUtc.ToString('yyyy-MM-ddTHH:mm:ssZ')
    finishedUtc        = (Get-Date).ToUniversalTime().ToString('yyyy-MM-ddTHH:mm:ssZ')
    vaultPath          = $vaultRoot
    outputPath         = $outRoot
    includeHidden      = [bool]$IncludeHidden
    hydrateCloudFiles  = [bool]$HydrateCloudFiles
    includeClaudeConfig = [bool]$IncludeClaudeConfig
    maxContentMB       = $MaxContentMB
    filesInventoried   = $inventory.Count
    errors             = @($runErrors)
    outputSha256       = $outputHashes
}
$manifest | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath (Join-Path $outRoot 'RUN_MANIFEST.json') -Encoding UTF8

Write-Host ''
Write-Host "Done. $($inventory.Count) files, $($runErrors.Count) errors."
Write-Host "Results: $outRoot"
Write-Host 'Check SENSITIVE_FINDINGS.csv before sharing anything. Share SUMMARY.md and INVENTORY.csv first.'
