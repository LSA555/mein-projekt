<#
.SYNOPSIS
    Self-test for Invoke-NigelVaultInventory.ps1 against a synthetic vault. No real data involved.
    Exit code 0 = all checks passed.
#>
$ErrorActionPreference = 'Stop'
$script = Join-Path (Join-Path (Split-Path -Parent $PSScriptRoot) 'scripts') 'Invoke-NigelVaultInventory.ps1'
$tmp = Join-Path ([System.IO.Path]::GetTempPath()) ('nigel-test-' + [guid]::NewGuid().ToString('N'))
$vault = Join-Path $tmp 'Vault'
$out = Join-Path $tmp 'Out'

function New-Note([string]$rel, [string]$content) {
    $p = Join-Path $vault $rel
    New-Item -ItemType Directory -Path (Split-Path -Parent $p) -Force | Out-Null
    [System.IO.File]::WriteAllText($p, $content, (New-Object System.Text.UTF8Encoding($false)))
}

New-Note '01 Inbox/Idee.md' "---`ntags: [inbox, idee]`nstatus: draft`nsource: claude`nchat_url: https://example.invalid/x`n---`nSiehe [[Nigel]] und [[Gibt es nicht]].`n"
New-Note '03 Areas/AI Workforce/Nigel/Nigel.md' "---`ntags:`n  - nigel`n  - agent`nstatus: active`n---`nText`n"
New-Note '03 Areas/AI Workforce/Skills/linkedin/SKILL.md' "# LinkedIn Skill`n"
New-Note '02 Projects/CYSPA/Kopie A.md' "Gleicher Inhalt"
New-Note '02 Projects/Pixel Valley/Kopie B.md' "Gleicher Inhalt"
New-Note '02 Projects/Pixel Valley/Idee.md' "Kein Frontmatter"
New-Note '04 Resources/secrets.md' "api_key = abcdefghijklmnop`nkein Treffer hier`n"
New-Note '04 Resources/kaputt.md' "---`ntags: [x]`nkein Abschluss"
New-Note '.obsidian/community-plugins.json' '["dataview","templater-obsidian"]'
New-Note '.obsidian/core-plugins.json' '{"daily-notes":true,"canvas":false}'

$before = @(Get-ChildItem -LiteralPath $vault -Recurse -File -Force | ForEach-Object { $_.FullName + '|' + $_.Length + '|' + $_.LastWriteTimeUtc.Ticks })

$failures = New-Object System.Collections.Generic.List[string]
function Check([bool]$cond, [string]$msg) {
    if ($cond) { Write-Host "PASS  $msg" } else { Write-Host "FAIL  $msg"; $failures.Add($msg) }
}

# Guard: output inside vault must be refused
$refused = $false
try { & $script -VaultPath $vault -OutputPath (Join-Path $vault 'audit') *> $null } catch { $refused = $true }
Check $refused 'refuses output folder inside the vault'
Check (-not (Test-Path (Join-Path $vault 'audit'))) 'nothing created inside the vault by the refused run'

& $script -VaultPath $vault -OutputPath $out | Out-Null

$inv = @(Import-Csv (Join-Path $out 'INVENTORY.csv'))
Check ($inv.Count -eq 8) "inventory lists 8 files without .obsidian (got $($inv.Count))"
$idee = $inv | Where-Object { $_.RelativePath -eq '01 Inbox/Idee.md' }
Check ($idee.FmTags -eq 'inbox;idee') "inline tag list parsed (got '$($idee.FmTags)')"
Check ($idee.FmSource -eq 'claude') 'source parsed'
Check ($idee.FmChatUrl -eq 'True') 'chat_url presence recorded, value not exported'
$nigel = $inv | Where-Object { $_.Name -eq 'Nigel.md' }
Check ($nigel.FmTags -eq 'nigel;agent') "block tag list parsed (got '$($nigel.FmTags)')"
$kaputt = $inv | Where-Object { $_.Name -eq 'kaputt.md' }
Check ($kaputt.FrontmatterOK -eq 'False') 'unclosed frontmatter flagged invalid'
$skill = $inv | Where-Object { $_.Name -eq 'SKILL.md' }
Check ($skill.RoleGuess -eq 'Skill') 'SKILL.md recognised'

$dups = @(Import-Csv (Join-Path $out 'DUPLICATES_RAW.csv'))
Check (@($dups | Where-Object { $_.Kind -eq 'SameContent' }).Count -eq 2) 'identical content detected'
Check (@($dups | Where-Object { $_.Kind -eq 'SameNoteName' }).Count -eq 2) 'same note name in two folders detected'

$broken = @(Import-Csv (Join-Path $out 'BROKEN_LINKS.csv'))
Check ($broken.Count -eq 1 -and $broken[0].Target -eq 'Gibt es nicht') "exactly one broken link (got $($broken.Count))"

$sensFile = Join-Path $out 'SENSITIVE_FINDINGS.csv'
$sens = @(Import-Csv $sensFile)
Check (@($sens | Where-Object { $_.RelativePath -eq '04 Resources/secrets.md' -and $_.Pattern -eq 'CredentialAssign' -and $_.Line -eq '1' }).Count -eq 1) 'credential pattern found with line number'
Check (-not ((Get-Content -Raw $sensFile) -match 'abcdefghijklmnop')) 'secret value NOT written to output'
Check (-not ((Get-Content -Raw (Join-Path $out 'INVENTORY.csv')) -match 'abcdefghijklmnop|example\.invalid')) 'no secret or URL value in INVENTORY.csv'

$plugins = @(Import-Csv (Join-Path $out 'OBSIDIAN_PLUGINS.csv'))
Check ($plugins.Count -eq 4) "plugins listed (got $($plugins.Count))"

$manifest = Get-Content -Raw (Join-Path $out 'RUN_MANIFEST.json') | ConvertFrom-Json
Check ($manifest.filesInventoried -eq 8) 'manifest file count'
$hashOk = $true
foreach ($p in $manifest.outputSha256.PSObject.Properties) {
    if ((Get-FileHash -LiteralPath (Join-Path $out $p.Name) -Algorithm SHA256).Hash -ne $p.Value) { $hashOk = $false }
}
Check $hashOk 'manifest hashes match output files'

# Claude config: server names and env var NAMES only
New-Note '.mcp.json' '{"mcpServers":{"hubspot":{"command":"C:\\tools\\npx.cmd","args":["x"],"env":{"HUBSPOT_TOKEN":"pat-SECRETVALUE123"}}}}'
$out2 = Join-Path $tmp 'Out2'
& $script -VaultPath $vault -OutputPath $out2 -IncludeClaudeConfig | Out-Null
$cc = @(Import-Csv (Join-Path $out2 'CLAUDE_CONFIG.csv') | Where-Object { $_.Server -eq 'hubspot' })
Check ($cc.Count -eq 1 -and $cc[0].EnvVarNames -eq 'HUBSPOT_TOKEN') 'MCP server and env var name listed'
$leak = Get-ChildItem -LiteralPath $out2 -File | Where-Object { (Get-Content -Raw -LiteralPath $_.FullName) -match 'SECRETVALUE' }
Check ($null -eq $leak) 'MCP env value NOT written to any output file'
$before = @(Get-ChildItem -LiteralPath $vault -Recurse -File -Force | ForEach-Object { $_.FullName + '|' + $_.Length + '|' + $_.LastWriteTimeUtc.Ticks })
& $script -VaultPath $vault -OutputPath (Join-Path $tmp 'Out3') | Out-Null

$after = @(Get-ChildItem -LiteralPath $vault -Recurse -File -Force | ForEach-Object { $_.FullName + '|' + $_.Length + '|' + $_.LastWriteTimeUtc.Ticks })
Check ((Compare-Object $before $after) -eq $null) 'vault unchanged after run (read-only)'

Remove-Item -LiteralPath $tmp -Recurse -Force
if ($failures.Count -gt 0) { Write-Host "`n$($failures.Count) check(s) failed"; exit 1 }
Write-Host "`nAll checks passed"
exit 0
