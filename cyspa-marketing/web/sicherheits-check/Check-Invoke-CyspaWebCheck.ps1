#Requires -Version 7.0
<#
.SYNOPSIS
    Passiver Sicherheits-Check der eigenen Webseite (CYSPA, Entscheid E2 Cyber Security Briefing KW 40).

.DESCRIPTION
    Führt ausschliesslich normale HTTPS-/HTTP-Aufrufe (GET/HEAD) auf öffentliche Seiten der
    angegebenen Domain aus und erstellt einen Markdown-Bericht. Geprüft werden:
      - TLS-Verbindung (Protokoll, Zertifikat, Ablaufdatum) und Weiterleitung HTTP -> HTTPS
      - Sicherheits-Header: HSTS, CSP, X-Content-Type-Options, X-Frame-Options/frame-ancestors,
        Referrer-Policy, Permissions-Policy
      - Server- und X-Powered-By-Banner
      - CMS-Hinweise (WordPress-Generator-Meta, /wp-json/, /readme.html, /xmlrpc.php)
      - Hinweis auf CVE-2026-87902 (WordPress Core, CISA KEV seit 25.09.2026)
      - /.well-known/security.txt
      - Cookie-Flags (Secure, HttpOnly, SameSite) - Cookie-Werte werden NICHT ausgegeben

    NICHT enthalten (bewusst): Port-Scans, Verzeichnis-Raten, Fuzzing, Brute-Force,
    Login-Versuche, Benutzer-Enumeration (z. B. /wp-json/wp/v2/users, ?author=1), POST-Anfragen.
    Insgesamt ca. 8 Anfragen mit Pause dazwischen.

    Nur gegen die EIGENE Domain bzw. mit schriftlicher Erlaubnis der Inhaberin ausführen.

.PARAMETER Domain
    Hostname der eigenen Webseite, ohne Schema und Pfad. Standard: www.cyspa.ch
    Ein Port ist erlaubt (host:port), z. B. für Tests.

.PARAMETER OutFile
    Pfad des Markdown-Berichts. Standard: .\cyspa-webcheck_<domain>_<zeitstempel>.md

.PARAMETER TimeoutSec
    Zeitlimit je Anfrage in Sekunden. Standard: 15

.PARAMETER HttpPort
    Port für die HTTP->HTTPS-Prüfung. Standard: 80 (nur für Tests ändern).

.PARAMETER SkipCertificateCheck
    Nur für Tests mit selbstsignierten Zertifikaten. Zertifikatsfehler werden trotzdem im Bericht gemeldet.

.PARAMETER SelfTest
    Prüft nur die Parser-Funktionen offline (keine Netzwerkzugriffe). Exit-Code 0 = alle Tests bestanden.

.EXAMPLE
    pwsh -NoProfile -File .\Check-Invoke-CyspaWebCheck.ps1
.EXAMPLE
    pwsh -NoProfile -File .\Check-Invoke-CyspaWebCheck.ps1 -Domain www.cyspa.ch -OutFile .\bericht.md
.EXAMPLE
    pwsh -NoProfile -File .\Check-Invoke-CyspaWebCheck.ps1 -SelfTest

.NOTES
    Version 1.0 · 27.09.2026 · CYSPA GmbH · Entwurf, Freigabe LWE ausstehend
    Exit-Codes: 0 = Bericht erstellt (bzw. Selbsttest bestanden), 1 = Fehler/Selbsttest fehlgeschlagen,
                2 = Webseite nicht erreichbar
#>
[CmdletBinding()]
param(
    [string]$Domain = 'www.cyspa.ch',
    [string]$OutFile,
    [ValidateRange(3, 120)][int]$TimeoutSec = 15,
    [ValidateRange(1, 65535)][int]$HttpPort = 80,
    [switch]$SkipCertificateCheck,
    [switch]$SelfTest
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$script:ToolVersion = '1.0'
$script:UserAgent   = "CYSPA-WebCheck/$($script:ToolVersion) (passiv; Eigenpruefung)"
$script:PauseMs     = 500
$script:MaxBodyBytes = 1MB

# ============================================================================
#  Parser-Funktionen (ohne Netzwerk, im Selbsttest geprüft)
# ============================================================================

function ConvertTo-NormalizedDomain {
    <# Entfernt Schema, Pfad und Leerzeichen; prüft auf gültigen Hostnamen (optional mit Port). #>
    param([Parameter(Mandatory)][string]$Value)
    $v = $Value.Trim()
    $v = $v -replace '^[a-zA-Z][a-zA-Z0-9+.-]*://', ''
    $v = ($v -split '[/?#]', 2)[0]
    $v = $v.TrimEnd('.').ToLowerInvariant()
    if ($v -notmatch '^(?=.{1,253}(:|$))([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*(:\d{1,5})?$') {
        throw "Ungültiger Domainname: '$Value'"
    }
    return $v
}

function Split-HostPort {
    param([Parameter(Mandatory)][string]$Authority, [int]$DefaultPort = 443)
    if ($Authority -match '^(?<h>[^:]+):(?<p>\d{1,5})$') {
        return [pscustomobject]@{ Host = $Matches.h; Port = [int]$Matches.p }
    }
    return [pscustomobject]@{ Host = $Authority; Port = $DefaultPort }
}

function Get-BaseDomain {
    <# www.cyspa.ch -> cyspa.ch (einfache Heuristik: führendes www. entfernen). #>
    param([Parameter(Mandatory)][string]$HostName)
    return ($HostName -replace '^www\.', '')
}

function Test-SameSiteHost {
    param([Parameter(Mandatory)][string]$HostName, [Parameter(Mandatory)][string]$BaseDomain)
    $h = $HostName.ToLowerInvariant()
    return ($h -eq $BaseDomain -or $h.EndsWith('.' + $BaseDomain))
}

function Get-HstsAssessment {
    param([AllowNull()][string]$Value)
    $r = [ordered]@{ Present = $false; MaxAge = $null; IncludeSubDomains = $false; Preload = $false; Rating = 'Handlungsbedarf'; Note = 'Header fehlt' }
    if ([string]::IsNullOrWhiteSpace($Value)) { return [pscustomobject]$r }
    $r.Present = $true
    if ($Value -match '(?i)max-age\s*=\s*"?(\d+)"?') { $r.MaxAge = [long]$Matches[1] }
    $r.IncludeSubDomains = [bool]($Value -match '(?i)includeSubDomains')
    $r.Preload = [bool]($Value -match '(?i)\bpreload\b')
    if ($null -eq $r.MaxAge) {
        $r.Rating = 'Handlungsbedarf'; $r.Note = 'max-age fehlt oder ungültig'
    } elseif ($r.MaxAge -eq 0) {
        $r.Rating = 'Handlungsbedarf'; $r.Note = 'max-age=0 deaktiviert HSTS'
    } elseif ($r.MaxAge -lt 15552000) {
        $r.Rating = 'Pruefen'; $r.Note = "max-age $($r.MaxAge) s ist kürzer als 6 Monate (empfohlen: 31536000)"
    } else {
        $r.Rating = 'OK'; $r.Note = "max-age $($r.MaxAge) s"
    }
    return [pscustomobject]$r
}

function Get-CspAssessment {
    param([AllowNull()][string]$Value, [AllowNull()][string]$ReportOnlyValue)
    $r = [ordered]@{ Present = $false; ReportOnly = $false; HasFrameAncestors = $false; UnsafeInline = $false; UnsafeEval = $false; HasDefaultSrc = $false; Rating = 'Handlungsbedarf'; Note = 'Header fehlt' }
    if ([string]::IsNullOrWhiteSpace($Value)) {
        if (-not [string]::IsNullOrWhiteSpace($ReportOnlyValue)) {
            $r.ReportOnly = $true; $r.Rating = 'Pruefen'; $r.Note = 'Nur Content-Security-Policy-Report-Only (nicht durchgesetzt)'
        }
        return [pscustomobject]$r
    }
    $r.Present = $true
    $directives = @{}
    foreach ($part in ($Value -split ';')) {
        $p = $part.Trim()
        if (-not $p) { continue }
        $name, $rest = $p -split '\s+', 2
        $directives[$name.ToLowerInvariant()] = [string]$rest
    }
    $r.HasFrameAncestors = $directives.ContainsKey('frame-ancestors')
    $r.HasDefaultSrc = $directives.ContainsKey('default-src')
    $scriptSrc = if ($directives.ContainsKey('script-src')) { $directives['script-src'] } elseif ($directives.ContainsKey('default-src')) { $directives['default-src'] } else { '' }
    $r.UnsafeInline = [bool]($scriptSrc -match "(?i)'unsafe-inline'")
    $r.UnsafeEval = [bool]($scriptSrc -match "(?i)'unsafe-eval'")
    $notes = @()
    if (-not $r.HasDefaultSrc -and -not $directives.ContainsKey('script-src')) { $notes += 'weder default-src noch script-src gesetzt' }
    if ($r.UnsafeInline) { $notes += "script-src erlaubt 'unsafe-inline'" }
    if ($r.UnsafeEval) { $notes += "script-src erlaubt 'unsafe-eval'" }
    if ($notes.Count -eq 0) { $r.Rating = 'OK'; $r.Note = 'vorhanden' } else { $r.Rating = 'Pruefen'; $r.Note = ($notes -join '; ') }
    return [pscustomobject]$r
}

function Get-FramingAssessment {
    param([AllowNull()][string]$XFrameOptions, [bool]$CspHasFrameAncestors)
    if ($CspHasFrameAncestors) { return [pscustomobject]@{ Rating = 'OK'; Note = 'CSP frame-ancestors gesetzt' } }
    if (-not [string]::IsNullOrWhiteSpace($XFrameOptions)) {
        $v = $XFrameOptions.Trim().ToUpperInvariant()
        if ($v -in @('DENY', 'SAMEORIGIN')) { return [pscustomobject]@{ Rating = 'OK'; Note = "X-Frame-Options: $v" } }
        return [pscustomobject]@{ Rating = 'Pruefen'; Note = "X-Frame-Options mit unüblichem Wert: $XFrameOptions" }
    }
    return [pscustomobject]@{ Rating = 'Handlungsbedarf'; Note = 'Weder X-Frame-Options noch CSP frame-ancestors (Clickjacking-Schutz fehlt)' }
}

function Get-XctoAssessment {
    param([AllowNull()][string]$Value)
    if ([string]::IsNullOrWhiteSpace($Value)) { return [pscustomobject]@{ Rating = 'Handlungsbedarf'; Note = 'Header fehlt' } }
    if ($Value.Trim() -ieq 'nosniff') { return [pscustomobject]@{ Rating = 'OK'; Note = 'nosniff' } }
    return [pscustomobject]@{ Rating = 'Pruefen'; Note = "unerwarteter Wert: $Value" }
}

function Get-ReferrerPolicyAssessment {
    param([AllowNull()][string]$Value)
    if ([string]::IsNullOrWhiteSpace($Value)) { return [pscustomobject]@{ Rating = 'Pruefen'; Note = 'Header fehlt (Browser-Standard strict-origin-when-cross-origin greift)' } }
    $last = (($Value -split ',') | ForEach-Object { $_.Trim().ToLowerInvariant() } | Where-Object { $_ })[-1]
    $good = @('no-referrer', 'same-origin', 'strict-origin', 'strict-origin-when-cross-origin')
    if ($last -in $good) { return [pscustomobject]@{ Rating = 'OK'; Note = $last } }
    return [pscustomobject]@{ Rating = 'Pruefen'; Note = "schwacher Wert: $last" }
}

function Get-PermissionsPolicyAssessment {
    param([AllowNull()][string]$Value)
    if ([string]::IsNullOrWhiteSpace($Value)) { return [pscustomobject]@{ Rating = 'Pruefen'; Note = 'Header fehlt' } }
    return [pscustomobject]@{ Rating = 'OK'; Note = 'vorhanden' }
}

function Get-BannerAssessment {
    <# Bewertet Server- und X-Powered-By-Header. Versionsnummern gelten als unnötige Preisgabe. #>
    param([AllowNull()][string]$Server, [AllowNull()][string]$PoweredBy)
    $notes = @(); $rating = 'OK'
    if (-not [string]::IsNullOrWhiteSpace($PoweredBy)) {
        $rating = 'Pruefen'; $notes += "X-Powered-By: $PoweredBy"
    }
    if (-not [string]::IsNullOrWhiteSpace($Server)) {
        if ($Server -match '\d+\.\d+') { $rating = 'Pruefen'; $notes += "Server mit Version: $Server" }
        else { $notes += "Server: $Server (ohne Version)" }
    }
    if ($notes.Count -eq 0) { $notes += 'keine Banner' }
    return [pscustomobject]@{ Rating = $rating; Note = ($notes -join '; ') }
}

function ConvertFrom-SetCookieHeader {
    <# Liest Name und Flags eines Set-Cookie-Headers. Der Cookie-Wert wird verworfen. #>
    param([Parameter(Mandatory)][string]$Line)
    $parts = $Line -split ';'
    $first = $parts[0].Trim()
    $name = ($first -split '=', 2)[0].Trim()
    $attrs = @($parts | Select-Object -Skip 1 | ForEach-Object { $_.Trim() })
    $sameSite = $null
    foreach ($a in $attrs) { if ($a -match '(?i)^samesite\s*=\s*(\w+)') { $sameSite = $Matches[1] } }
    return [pscustomobject]@{
        Name     = $name
        Secure   = [bool]($attrs | Where-Object { $_ -match '(?i)^secure$' })
        HttpOnly = [bool]($attrs | Where-Object { $_ -match '(?i)^httponly$' })
        SameSite = $sameSite
    }
}

function Get-CookieAssessment {
    param([AllowNull()][AllowEmptyCollection()][object[]]$Cookies = @())
    if (-not $Cookies -or $Cookies.Count -eq 0) { return [pscustomobject]@{ Rating = 'OK'; Note = 'Startseite setzt keine Cookies' } }
    $issues = @()
    foreach ($c in $Cookies) {
        $miss = @()
        if (-not $c.Secure) { $miss += 'Secure' }
        if (-not $c.HttpOnly) { $miss += 'HttpOnly' }
        if (-not $c.SameSite) { $miss += 'SameSite' }
        elseif ($c.SameSite -ieq 'None' -and -not $c.Secure) { $miss += 'SameSite=None ohne Secure' }
        if ($miss.Count) { $issues += "$($c.Name): fehlt $($miss -join ', ')" }
    }
    if ($issues.Count -eq 0) { return [pscustomobject]@{ Rating = 'OK'; Note = "$($Cookies.Count) Cookie(s), Flags gesetzt" } }
    return [pscustomobject]@{ Rating = 'Pruefen'; Note = ($issues -join '; ') }
}

function Test-HeaderKey {
    <# Prüft case-insensitiv, ob ein Header vorhanden ist (Hashtable oder Dictionary). #>
    param([AllowNull()][System.Collections.IDictionary]$Headers, [string]$Name)
    if (-not $Headers) { return $false }
    foreach ($k in $Headers.Keys) { if ([string]$k -ieq $Name) { return $true } }
    return $false
}

function Get-CmsIndicators {
    <# Sucht in HTML und Headern nach CMS-Hinweisen. #>
    param([AllowNull()][string]$Html, [AllowNull()][System.Collections.IDictionary]$Headers)
    $r = [ordered]@{ Generator = $null; WordPressVersion = $null; WordPressHints = @(); OtherCms = $null }
    if ($Html) {
        $m = [regex]::Match($Html, '(?is)<meta\b[^>]*\bname\s*=\s*["'']generator["''][^>]*>')
        if ($m.Success) {
            $c = [regex]::Match($m.Value, '(?is)\bcontent\s*=\s*["'']([^"'']*)["'']')
            if ($c.Success) { $r.Generator = $c.Groups[1].Value.Trim() }
        }
        if ($r.Generator -and $r.Generator -match '(?i)^WordPress\s*([\d.]+)?') {
            $r.WordPressHints += 'Generator-Meta'
            if ($Matches[1]) { $r.WordPressVersion = $Matches[1] }
        }
        if ($Html -match '(?i)/wp-content/') { $r.WordPressHints += 'Pfad /wp-content/' }
        if ($Html -match '(?i)/wp-includes/') { $r.WordPressHints += 'Pfad /wp-includes/' }
        if ($Html -match '(?i)api\.w\.org') { $r.WordPressHints += 'REST-API-Link (api.w.org)' }
        if (-not $r.WordPressVersion) {
            $v = [regex]::Match($Html, '(?i)/wp-includes/[^"''\s>]+\?ver=(\d+\.\d+(?:\.\d+)?)')
            if ($v.Success) { $r.WordPressHints += "ver-Parameter in /wp-includes/ ($($v.Groups[1].Value), nur Indiz)" }
        }
        if (-not $r.WordPressHints -and $r.Generator) {
            foreach ($cms in 'Joomla', 'Drupal', 'TYPO3', 'Wix', 'Squarespace', 'Webflow', 'Jimdo', 'Shopify', 'Ghost', 'HubSpot') {
                if ($r.Generator -match "(?i)$cms") { $r.OtherCms = $cms; break }
            }
        }
        if (-not $r.OtherCms -and -not $r.WordPressHints) {
            if ($Html -match '(?i)data-wf-site|webflow\.com') { $r.OtherCms = 'Webflow (Indiz)' }
            elseif ($Html -match '(?i)static\.wixstatic\.com') { $r.OtherCms = 'Wix (Indiz)' }
            elseif ($Html -match '(?i)squarespace\.com') { $r.OtherCms = 'Squarespace (Indiz)' }
            elseif ($Html -match '(?i)/typo3(conf|temp)/') { $r.OtherCms = 'TYPO3 (Indiz)' }
            elseif ($Html -match '(?i)/sites/default/files/') { $r.OtherCms = 'Drupal (Indiz)' }
        }
    }
    if ($Headers) {
        foreach ($k in @('Link')) {
            if ((Test-HeaderKey $Headers $k) -and (($Headers[$k] -join ' ') -match '(?i)api\.w\.org')) { $r.WordPressHints += 'Link-Header api.w.org' }
        }
        if ((Test-HeaderKey $Headers 'X-Generator') -and -not $r.Generator) { $r.Generator = ($Headers['X-Generator'] -join ', ') }
    }
    $r.WordPressHints = @($r.WordPressHints | Select-Object -Unique)
    return [pscustomobject]$r
}

function Get-SecurityTxtAssessment {
    param([int]$StatusCode, [AllowNull()][string]$ContentType, [AllowNull()][string]$Body, [datetime]$Now = (Get-Date))
    if ($StatusCode -ne 200 -or [string]::IsNullOrWhiteSpace($Body)) {
        return [pscustomobject]@{ Rating = 'Pruefen'; Note = "nicht vorhanden (HTTP $StatusCode)"; Contact = $null; Expires = $null }
    }
    if ($ContentType -and $ContentType -notmatch '(?i)text/plain') {
        return [pscustomobject]@{ Rating = 'Pruefen'; Note = "Antwort ist kein text/plain ($ContentType), vermutlich Fehlerseite"; Contact = $null; Expires = $null }
    }
    $contact = @([regex]::Matches($Body, '(?im)^\s*Contact:\s*(\S+)') | ForEach-Object { $_.Groups[1].Value })
    $expM = [regex]::Match($Body, '(?im)^\s*Expires:\s*(\S+)')
    $expires = $null
    if ($expM.Success) {
        $tmp = [datetimeoffset]::MinValue
        if ([datetimeoffset]::TryParse($expM.Groups[1].Value, [cultureinfo]::InvariantCulture, [System.Globalization.DateTimeStyles]::AssumeUniversal, [ref]$tmp)) { $expires = $tmp }
    }
    $notes = @(); $rating = 'OK'
    if ($contact.Count -eq 0) { $rating = 'Pruefen'; $notes += 'Contact fehlt (Pflichtfeld)' } else { $notes += "Contact: $($contact -join ', ')" }
    if (-not $expires) { $rating = 'Pruefen'; $notes += 'Expires fehlt (Pflichtfeld)' }
    elseif ($expires.UtcDateTime -lt $Now.ToUniversalTime()) { $rating = 'Pruefen'; $notes += "abgelaufen seit $($expires.ToString('dd.MM.yyyy'))" }
    else { $notes += "gültig bis $($expires.ToString('dd.MM.yyyy'))" }
    return [pscustomobject]@{ Rating = $rating; Note = ($notes -join '; '); Contact = $contact; Expires = $expires }
}

function Get-XmlRpcAssessment {
    param([int]$StatusCode, [AllowNull()][string]$Body)
    if ($StatusCode -eq 0) { return [pscustomobject]@{ Rating = 'Info'; Note = 'nicht abrufbar' } }
    if ($Body -and $Body -match '(?i)XML-RPC server accepts POST requests only') {
        return [pscustomobject]@{ Rating = 'Pruefen'; Note = "XML-RPC aktiv (HTTP $StatusCode)" }
    }
    if ($StatusCode -in 401, 403, 404, 410) { return [pscustomobject]@{ Rating = 'OK'; Note = "gesperrt/nicht vorhanden (HTTP $StatusCode)" } }
    return [pscustomobject]@{ Rating = 'Info'; Note = "HTTP $StatusCode, keine XML-RPC-Signatur" }
}

function ConvertTo-MdCell {
    param([AllowNull()][object]$Value, [int]$Max = 180)
    if ($null -eq $Value) { return '–' }
    $s = [string]$Value
    $s = $s -replace '[\r\n]+', ' ' -replace '\|', '\|'
    if ($s.Length -gt $Max) { $s = $s.Substring(0, $Max) + ' …' }
    if ([string]::IsNullOrWhiteSpace($s)) { return '–' }
    return $s
}

# ============================================================================
#  Netzwerk (nur GET/HEAD, keine automatischen Weiterleitungen, keine Cookies)
# ============================================================================

function New-PassiveHttpClient {
    param([int]$TimeoutSec, [switch]$SkipCertificateCheck)
    $h = [System.Net.Http.HttpClientHandler]::new()
    $h.AllowAutoRedirect = $false
    $h.UseCookies = $false
    $h.AutomaticDecompression = [System.Net.DecompressionMethods]::GZip -bor [System.Net.DecompressionMethods]::Deflate -bor [System.Net.DecompressionMethods]::Brotli
    if ($SkipCertificateCheck) { $h.ServerCertificateCustomValidationCallback = [System.Net.Http.HttpClientHandler]::DangerousAcceptAnyServerCertificateValidator }
    $c = [System.Net.Http.HttpClient]::new($h)
    $c.Timeout = [timespan]::FromSeconds($TimeoutSec)
    $c.DefaultRequestHeaders.UserAgent.ParseAdd($script:UserAgent)
    $c.DefaultRequestHeaders.Accept.ParseAdd('text/html,application/json,text/plain;q=0.9,*/*;q=0.5')
    return $c
}

function Invoke-PassiveRequest {
    param(
        [Parameter(Mandatory)][System.Net.Http.HttpClient]$Client,
        [Parameter(Mandatory)][uri]$Uri,
        [ValidateSet('GET', 'HEAD')][string]$Method = 'GET',
        [long]$MaxBodyBytes = $script:MaxBodyBytes
    )
    Start-Sleep -Milliseconds $script:PauseMs
    $res = [ordered]@{ Uri = $Uri; Method = $Method; StatusCode = 0; Headers = $null; SetCookies = @(); Body = $null; Location = $null; Error = $null }
    $req = [System.Net.Http.HttpRequestMessage]::new([System.Net.Http.HttpMethod]::new($Method), $Uri)
    try {
        $resp = $Client.SendAsync($req, [System.Net.Http.HttpCompletionOption]::ResponseHeadersRead).GetAwaiter().GetResult()
        $res.StatusCode = [int]$resp.StatusCode
        $hdr = [System.Collections.Generic.Dictionary[string, string[]]]::new([System.StringComparer]::OrdinalIgnoreCase)
        foreach ($kv in $resp.Headers) { $hdr[$kv.Key] = @($kv.Value) }
        foreach ($kv in $resp.Content.Headers) { $hdr[$kv.Key] = @($kv.Value) }
        $res.Headers = $hdr
        if ($hdr.ContainsKey('Set-Cookie')) { $res.SetCookies = @($hdr['Set-Cookie']) }
        if ($resp.Headers.Location) {
            $res.Location = if ($resp.Headers.Location.IsAbsoluteUri) { $resp.Headers.Location } else { [uri]::new($Uri, $resp.Headers.Location) }
        }
        if ($Method -eq 'GET') {
            $stream = $resp.Content.ReadAsStreamAsync().GetAwaiter().GetResult()
            $ms = [System.IO.MemoryStream]::new()
            $buf = [byte[]]::new(65536); $total = 0
            while (($n = $stream.Read($buf, 0, $buf.Length)) -gt 0) {
                $take = [math]::Min($n, $MaxBodyBytes - $total)
                if ($take -gt 0) { $ms.Write($buf, 0, $take); $total += $take }
                if ($total -ge $MaxBodyBytes) { break }
            }
            $stream.Dispose()
            $res.Body = [System.Text.Encoding]::UTF8.GetString($ms.ToArray())
        }
        $resp.Dispose()
    } catch {
        $e = $_.Exception
        while ($e.InnerException) { $e = $e.InnerException }
        $res.Error = $e.Message
    } finally { $req.Dispose() }
    return [pscustomobject]$res
}

function Get-RedirectChain {
    <# Folgt Weiterleitungen manuell (max. 5), nur innerhalb der eigenen Domain. #>
    param([System.Net.Http.HttpClient]$Client, [uri]$Start, [string]$BaseDomain, [ValidateSet('GET', 'HEAD')][string]$Method = 'GET')
    $hops = [System.Collections.Generic.List[object]]::new()
    $current = $Start
    for ($i = 0; $i -lt 6; $i++) {
        $r = Invoke-PassiveRequest -Client $Client -Uri $current -Method $Method
        $hops.Add($r)
        if ($r.Error -or -not $r.Location -or $r.StatusCode -lt 300 -or $r.StatusCode -ge 400) { break }
        if (-not (Test-SameSiteHost -HostName $r.Location.Host -BaseDomain $BaseDomain)) { break }
        $current = $r.Location
    }
    return , $hops
}

function Get-TlsInfo {
    param([string]$HostName, [int]$Port = 443, [int]$TimeoutSec = 15)
    $r = [ordered]@{ Ok = $false; Protocol = $null; CipherSuite = $null; Subject = $null; Issuer = $null; NotAfter = $null; DaysLeft = $null; PolicyErrors = 'None'; Error = $null }
    $state = @{ Errors = [System.Net.Security.SslPolicyErrors]::None }
    $tcp = [System.Net.Sockets.TcpClient]::new()
    try {
        $t = $tcp.ConnectAsync($HostName, $Port)
        if (-not $t.Wait([timespan]::FromSeconds($TimeoutSec))) { throw 'Zeitlimit beim Verbindungsaufbau' }
        $cb = [System.Net.Security.RemoteCertificateValidationCallback] {
            param($s, $cert, $chain, $errors)
            $state.Errors = $errors
            return $true   # Verbindung zulassen, Fehler aber im Bericht melden
        }.GetNewClosure()
        $ssl = [System.Net.Security.SslStream]::new($tcp.GetStream(), $false, $cb)
        $ssl.ReadTimeout = $TimeoutSec * 1000; $ssl.WriteTimeout = $TimeoutSec * 1000
        $ssl.AuthenticateAsClient($HostName)
        $r.Protocol = [string]$ssl.SslProtocol
        try { $r.CipherSuite = [string]$ssl.NegotiatedCipherSuite } catch { $r.CipherSuite = $null }
        $cert = [System.Security.Cryptography.X509Certificates.X509Certificate2]::new($ssl.RemoteCertificate)
        $r.Subject = $cert.Subject; $r.Issuer = $cert.Issuer; $r.NotAfter = $cert.NotAfter
        $r.DaysLeft = [int][math]::Floor(($cert.NotAfter - (Get-Date)).TotalDays)
        $r.PolicyErrors = [string]$state.Errors
        $r.Ok = $true
        $ssl.Dispose()
    } catch {
        $e = $_.Exception; while ($e.InnerException) { $e = $e.InnerException }
        $r.Error = $e.Message
    } finally { $tcp.Dispose() }
    return [pscustomobject]$r
}

function Get-ControlRef {
    <# Zuordnung Massnahme -> ISO/IEC 27001:2022 Anhang A (Orientierung, keine Audit-Aussage). #>
    param([AllowNull()][string]$Measure)
    $map = @{
        'M-CVE'         = 'A.8.8 Handhabung technischer Schwachstellen'
        'M-TLS'         = 'A.8.24 Verwendung von Kryptographie'
        'M-REDIR'       = 'A.8.24 Verwendung von Kryptographie'
        'M-HSTS'        = 'A.8.24 Verwendung von Kryptographie'
        'M-CSP'         = 'A.8.26 Anforderungen an die Anwendungssicherheit; A.8.9 Konfigurationsmanagement'
        'M-FRAME'       = 'A.8.26 Anforderungen an die Anwendungssicherheit; A.8.9 Konfigurationsmanagement'
        'M-XCTO'        = 'A.8.9 Konfigurationsmanagement'
        'M-REF'         = 'A.8.9 Konfigurationsmanagement'
        'M-PERM'        = 'A.8.9 Konfigurationsmanagement'
        'M-BANNER'      = 'A.8.9 Konfigurationsmanagement'
        'M-CMS-VERSION' = 'A.8.9 Konfigurationsmanagement'
        'M-README'      = 'A.8.9 Konfigurationsmanagement'
        'M-WPJSON'      = 'A.8.9 Konfigurationsmanagement'
        'M-XMLRPC'      = 'A.8.9 Konfigurationsmanagement'
        'M-SECTXT'      = 'A.8.8 Handhabung technischer Schwachstellen (Meldeweg für Schwachstellen)'
        'M-COOKIE'      = 'A.8.9 Konfigurationsmanagement; A.5.34 Privatsphäre und Schutz personenbezogener Daten'
    }
    if ($Measure -and $map.ContainsKey($Measure)) { return $map[$Measure] }
    return '–'
}

function Get-HeaderValue {
    param([AllowNull()][System.Collections.IDictionary]$Headers, [string]$Name)
    if (-not $Headers -or -not (Test-HeaderKey $Headers $Name)) { return $null }
    # Server/User-Agent bestehen aus Produkt-Tokens (Leerzeichen-getrennt), alle anderen Header sind Listen.
    $sep = if ($Name -in 'Server', 'User-Agent') { ' ' } else { ', ' }
    return (@($Headers[$Name]) -join $sep)
}

# ============================================================================
#  Selbsttest (offline)
# ============================================================================

function Invoke-SelfTest {
    $script:fail = 0; $script:pass = 0
    function Assert([string]$Name, [bool]$Cond) {
        if ($Cond) { $script:pass++; Write-Host "  [OK]     $Name" } else { $script:fail++; Write-Host "  [FEHLER] $Name" -ForegroundColor Red }
    }
    Write-Host 'Selbsttest Parser-Funktionen (offline)'
    Assert 'Domain: Schema/Pfad entfernt' ((ConvertTo-NormalizedDomain 'https://WWW.cyspa.ch/pfad?x=1') -eq 'www.cyspa.ch')
    Assert 'Domain: Port erlaubt' ((ConvertTo-NormalizedDomain 'localhost:8443') -eq 'localhost:8443')
    $bad = $false; try { ConvertTo-NormalizedDomain 'cyspa.ch; rm -rf /' | Out-Null } catch { $bad = $true }
    Assert 'Domain: ungültige Eingabe abgelehnt' $bad
    Assert 'Host/Port getrennt' ((Split-HostPort 'a.ch:8443').Port -eq 8443 -and (Split-HostPort 'a.ch').Port -eq 443)
    Assert 'Same-Site: www -> Basisdomain' (Test-SameSiteHost 'cyspa.ch' (Get-BaseDomain 'www.cyspa.ch'))
    Assert 'Same-Site: fremde Domain' (-not (Test-SameSiteHost 'evilcyspa.ch' 'cyspa.ch'))

    Assert 'HSTS fehlt -> Handlungsbedarf' ((Get-HstsAssessment $null).Rating -eq 'Handlungsbedarf')
    $h = Get-HstsAssessment 'max-age=31536000; includeSubDomains; preload'
    Assert 'HSTS 1 Jahr -> OK, Flags erkannt' ($h.Rating -eq 'OK' -and $h.IncludeSubDomains -and $h.Preload)
    Assert 'HSTS kurz -> Pruefen' ((Get-HstsAssessment 'max-age=300').Rating -eq 'Pruefen')
    Assert 'HSTS max-age=0 -> Handlungsbedarf' ((Get-HstsAssessment 'max-age=0').Rating -eq 'Handlungsbedarf')

    $c = Get-CspAssessment "default-src 'self'; script-src 'self' 'unsafe-inline'; frame-ancestors 'none'" $null
    Assert 'CSP: frame-ancestors erkannt' $c.HasFrameAncestors
    Assert 'CSP: unsafe-inline -> Pruefen' ($c.UnsafeInline -and $c.Rating -eq 'Pruefen')
    Assert 'CSP: sauber -> OK' ((Get-CspAssessment "default-src 'self'" $null).Rating -eq 'OK')
    Assert 'CSP: nur Report-Only -> Pruefen' ((Get-CspAssessment $null "default-src 'self'").Rating -eq 'Pruefen')
    Assert 'CSP: fehlt -> Handlungsbedarf' ((Get-CspAssessment $null $null).Rating -eq 'Handlungsbedarf')

    Assert 'Framing: XFO SAMEORIGIN -> OK' ((Get-FramingAssessment 'sameorigin' $false).Rating -eq 'OK')
    Assert 'Framing: nichts -> Handlungsbedarf' ((Get-FramingAssessment $null $false).Rating -eq 'Handlungsbedarf')
    Assert 'Framing: CSP frame-ancestors -> OK' ((Get-FramingAssessment $null $true).Rating -eq 'OK')
    Assert 'XCTO nosniff -> OK' ((Get-XctoAssessment 'nosniff').Rating -eq 'OK')
    Assert 'Referrer: letzter Wert zählt' ((Get-ReferrerPolicyAssessment 'unsafe-url, strict-origin-when-cross-origin').Rating -eq 'OK')
    Assert 'Referrer: unsafe-url -> Pruefen' ((Get-ReferrerPolicyAssessment 'unsafe-url').Rating -eq 'Pruefen')
    Assert 'Banner: Version -> Pruefen' ((Get-BannerAssessment 'Apache/2.4.57 (Debian)' $null).Rating -eq 'Pruefen')
    Assert 'Banner: ohne Version -> OK' ((Get-BannerAssessment 'nginx' $null).Rating -eq 'OK')
    Assert 'Banner: X-Powered-By -> Pruefen' ((Get-BannerAssessment $null 'PHP/8.1.2').Rating -eq 'Pruefen')

    $ck = ConvertFrom-SetCookieHeader 'wp_sess=GEHEIM123; path=/; Secure; HttpOnly; SameSite=Lax'
    Assert 'Cookie: Flags erkannt' ($ck.Name -eq 'wp_sess' -and $ck.Secure -and $ck.HttpOnly -and $ck.SameSite -eq 'Lax')
    Assert 'Cookie: Wert wird nicht gespeichert' (-not (($ck | Out-String) -match 'GEHEIM123'))
    $ck2 = ConvertFrom-SetCookieHeader 'pll_language=de; path=/'
    Assert 'Cookie: fehlende Flags -> Pruefen' ((Get-CookieAssessment @($ck2)).Rating -eq 'Pruefen')
    Assert 'Cookie: keine Cookies -> OK' ((Get-CookieAssessment @()).Rating -eq 'OK')

    $html = '<html><head><meta name="generator" content="WordPress 6.8.1" /><link rel="https://api.w.org/" href="/wp-json/"><script src="/wp-includes/js/jquery.min.js?ver=3.7.1"></script></head></html>'
    $cms = Get-CmsIndicators $html $null
    Assert 'CMS: WordPress-Generator erkannt' ($cms.WordPressHints -contains 'Generator-Meta')
    Assert 'CMS: WP-Version aus Generator' ($cms.WordPressVersion -eq '6.8.1')
    Assert 'CMS: api.w.org erkannt' ($cms.WordPressHints -contains 'REST-API-Link (api.w.org)')
    $cms2 = Get-CmsIndicators '<meta content="Joomla! - Open Source" name="generator">' $null
    Assert 'CMS: anderes CMS (Attribut-Reihenfolge egal)' ($cms2.OtherCms -eq 'Joomla')
    Assert 'CMS: kein Hinweis' ((@((Get-CmsIndicators '<html></html>' $null).WordPressHints)).Count -eq 0)

    $now = [datetime]'2026-09-27'
    Assert 'security.txt gültig -> OK' ((Get-SecurityTxtAssessment 200 'text/plain; charset=utf-8' "Contact: mailto:security@example.ch`nExpires: 2027-09-01T00:00:00Z" $now).Rating -eq 'OK')
    Assert 'security.txt abgelaufen -> Pruefen' ((Get-SecurityTxtAssessment 200 'text/plain' "Contact: mailto:a@b.ch`nExpires: 2026-01-01T00:00:00Z" $now).Note -match 'abgelaufen')
    Assert 'security.txt HTML-Fehlerseite -> Pruefen' ((Get-SecurityTxtAssessment 200 'text/html' '<html>' $now).Note -match 'text/plain')
    Assert 'security.txt 404 -> Pruefen' ((Get-SecurityTxtAssessment 404 $null $null $now).Rating -eq 'Pruefen')
    Assert 'XML-RPC aktiv erkannt' ((Get-XmlRpcAssessment 405 'XML-RPC server accepts POST requests only.').Rating -eq 'Pruefen')
    Assert 'XML-RPC gesperrt -> OK' ((Get-XmlRpcAssessment 403 'Forbidden').Rating -eq 'OK')
    Assert 'Markdown: Pipe escaped' ((ConvertTo-MdCell 'a|b') -eq 'a\|b')
    Assert 'Kontrolle: M-CVE -> A.8.8' ((Get-ControlRef 'M-CVE') -like 'A.8.8*')
    Assert 'Kontrolle: M-TLS -> A.8.24' ((Get-ControlRef 'M-TLS') -like 'A.8.24*')
    Assert 'Kontrolle: unbekannt -> Strich' ((Get-ControlRef 'X') -eq '–')

    Write-Host ("Ergebnis: {0} bestanden, {1} fehlgeschlagen" -f $script:pass, $script:fail)
    return ($script:fail -eq 0)
}

# ============================================================================
#  Hauptablauf
# ============================================================================

if ($SelfTest) {
    if (Invoke-SelfTest) { exit 0 } else { exit 1 }
}

try { $authority = ConvertTo-NormalizedDomain $Domain } catch { Write-Error $_; exit 1 }
$hp = Split-HostPort $authority
$baseDomain = Get-BaseDomain $hp.Host
$stamp = Get-Date
if (-not $OutFile) { $OutFile = Join-Path (Get-Location) ("cyspa-webcheck_{0}_{1}.md" -f ($authority -replace '[^a-z0-9.-]', '_'), $stamp.ToString('yyyyMMdd-HHmm')) }

Write-Host "CYSPA Web-Check (passiv) für $authority"
Write-Host 'Hinweis: Nur gegen die eigene Domain ausführen. Es werden ca. 8 normale Seitenabrufe gemacht.'

$client = New-PassiveHttpClient -TimeoutSec $TimeoutSec -SkipCertificateCheck:$SkipCertificateCheck
$findings = [System.Collections.Generic.List[object]]::new()
function Add-Finding([string]$Area, [string]$Check, [string]$Rating, [string]$Detail, [string]$Measure) {
    $findings.Add([pscustomobject]@{ Area = $Area; Check = $Check; Rating = $Rating; Detail = $Detail; Measure = $Measure })
}

# 1) HTTP -> HTTPS
Write-Host '  [1/6] Weiterleitung HTTP -> HTTPS'
$httpAuthority = if ($HttpPort -eq 80) { $hp.Host } else { "$($hp.Host):$HttpPort" }
$httpChain = Get-RedirectChain -Client $client -Start ([uri]"http://$httpAuthority/") -BaseDomain $baseDomain -Method 'GET'
$firstHttp = $httpChain[0]
if ($firstHttp.Error) {
    Add-Finding 'Transport' 'HTTP -> HTTPS' 'Info' "HTTP (Port $HttpPort) nicht erreichbar: $($firstHttp.Error)" 'M-REDIR'
} elseif ($firstHttp.StatusCode -in 301, 302, 303, 307, 308 -and $firstHttp.Location -and $firstHttp.Location.Scheme -eq 'https') {
    $perm = if ($firstHttp.StatusCode -in 301, 308) { 'dauerhaft' } else { 'temporär' }
    $rt = if ($perm -eq 'dauerhaft') { 'OK' } else { 'Pruefen' }
    Add-Finding 'Transport' 'HTTP -> HTTPS' $rt "HTTP $($firstHttp.StatusCode) ($perm) nach $($firstHttp.Location)" 'M-REDIR'
} else {
    Add-Finding 'Transport' 'HTTP -> HTTPS' 'Handlungsbedarf' "Keine direkte Weiterleitung auf HTTPS (HTTP $($firstHttp.StatusCode))" 'M-REDIR'
}

# 2) TLS
Write-Host '  [2/6] TLS-Verbindung und Zertifikat'
$tls = Get-TlsInfo -HostName $hp.Host -Port $hp.Port -TimeoutSec $TimeoutSec
if (-not $tls.Ok) {
    Add-Finding 'Transport' 'TLS' 'Handlungsbedarf' "Keine TLS-Verbindung: $($tls.Error)" 'M-TLS'
} else {
    $protoRating = if ($tls.Protocol -match 'Tls13|Tls12') { 'OK' } else { 'Handlungsbedarf' }
    Add-Finding 'Transport' 'TLS-Protokoll (ausgehandelt)' $protoRating "$($tls.Protocol)$(if($tls.CipherSuite){", $($tls.CipherSuite)"})" 'M-TLS'
    $certRating = if ($tls.PolicyErrors -ne 'None') { 'Handlungsbedarf' } elseif ($tls.DaysLeft -lt 14) { 'Handlungsbedarf' } elseif ($tls.DaysLeft -lt 30) { 'Pruefen' } else { 'OK' }
    Add-Finding 'Transport' 'Zertifikat' $certRating ("gültig bis {0:dd.MM.yyyy} ({1} Tage), Aussteller: {2}; Prüfung: {3}" -f $tls.NotAfter, $tls.DaysLeft, $tls.Issuer, $tls.PolicyErrors) 'M-TLS'
}

# 3) Startseite
Write-Host '  [3/6] Startseite (Header, Cookies, CMS-Hinweise)'
$chain = Get-RedirectChain -Client $client -Start ([uri]"https://$authority/") -BaseDomain $baseDomain -Method 'GET'
$homeResp = $chain[$chain.Count - 1]
if ($homeResp.Error -or $homeResp.StatusCode -eq 0) {
    Add-Finding 'Erreichbarkeit' 'Startseite HTTPS' 'Handlungsbedarf' "nicht abrufbar: $($homeResp.Error)" 'M-TLS'
    $unreachable = $true
} else {
    $unreachable = $false
    $hopText = ($chain | ForEach-Object { "$($_.StatusCode) $($_.Uri)" }) -join ' → '
    $lastLoc = $homeResp.Location
    if ($homeResp.StatusCode -ge 300 -and $homeResp.StatusCode -lt 400 -and $lastLoc) {
        Add-Finding 'Erreichbarkeit' 'Startseite HTTPS' 'Info' "Weiterleitung auf fremde Domain: $lastLoc (nicht weiter verfolgt)" '–'
    } else {
        Add-Finding 'Erreichbarkeit' 'Startseite HTTPS' 'Info' "Kette: $hopText" '–'
    }
}
$H = if ($unreachable) { $null } else { $homeResp.Headers }

if (-not $unreachable) {
    $hsts = Get-HstsAssessment (Get-HeaderValue $H 'Strict-Transport-Security')
    Add-Finding 'Header' 'Strict-Transport-Security (HSTS)' $hsts.Rating $hsts.Note 'M-HSTS'
    $csp = Get-CspAssessment (Get-HeaderValue $H 'Content-Security-Policy') (Get-HeaderValue $H 'Content-Security-Policy-Report-Only')
    Add-Finding 'Header' 'Content-Security-Policy' $csp.Rating $csp.Note 'M-CSP'
    $xcto = Get-XctoAssessment (Get-HeaderValue $H 'X-Content-Type-Options')
    Add-Finding 'Header' 'X-Content-Type-Options' $xcto.Rating $xcto.Note 'M-XCTO'
    $fr = Get-FramingAssessment (Get-HeaderValue $H 'X-Frame-Options') $csp.HasFrameAncestors
    Add-Finding 'Header' 'X-Frame-Options / frame-ancestors' $fr.Rating $fr.Note 'M-FRAME'
    $ref = Get-ReferrerPolicyAssessment (Get-HeaderValue $H 'Referrer-Policy')
    Add-Finding 'Header' 'Referrer-Policy' $ref.Rating $ref.Note 'M-REF'
    $pp = Get-PermissionsPolicyAssessment (Get-HeaderValue $H 'Permissions-Policy')
    Add-Finding 'Header' 'Permissions-Policy' $pp.Rating $pp.Note 'M-PERM'
    $ban = Get-BannerAssessment (Get-HeaderValue $H 'Server') (Get-HeaderValue $H 'X-Powered-By')
    Add-Finding 'Header' 'Server / X-Powered-By' $ban.Rating $ban.Note 'M-BANNER'
    $cookies = @($chain | ForEach-Object { $_.SetCookies } | Where-Object { $_ } | ForEach-Object { ConvertFrom-SetCookieHeader $_ })
    $ca = Get-CookieAssessment $cookies
    Add-Finding 'Cookies' 'Cookie-Flags (Startseite)' $ca.Rating $ca.Note 'M-COOKIE'
}

# 4) CMS
Write-Host '  [4/6] CMS-Erkennung (/wp-json/, /readme.html, /xmlrpc.php)'
$cms = Get-CmsIndicators ($(if ($unreachable) { $null } else { $homeResp.Body })) $H
$siteRoot = if ($unreachable) { [uri]"https://$authority/" } else { [uri]::new($homeResp.Uri, '/') }
$skipped = [pscustomobject]@{ Uri = $null; Method = 'GET'; StatusCode = 0; Headers = $null; Body = $null; Error = 'uebersprungen' }
$wpJson = if ($unreachable) { $skipped } else { Invoke-PassiveRequest -Client $client -Uri ([uri]::new($siteRoot, '/wp-json/')) -Method 'GET' -MaxBodyBytes 65536 }
$wpJsonIsWp = ($wpJson.StatusCode -eq 200 -and $wpJson.Body -and $wpJson.Body -match '"namespaces"\s*:')
if ($wpJsonIsWp) { $cms.WordPressHints = @($cms.WordPressHints + '/wp-json/ antwortet mit WP-REST-Index') }
$readme = if ($unreachable) { $skipped } else { Invoke-PassiveRequest -Client $client -Uri ([uri]::new($siteRoot, '/readme.html')) -Method 'GET' -MaxBodyBytes 65536 }
$readmeIsWp = ($readme.StatusCode -eq 200 -and $readme.Body -and $readme.Body -match '(?i)wordpress')
if ($readmeIsWp) { $cms.WordPressHints = @($cms.WordPressHints + '/readme.html (WordPress)') }
$xmlrpc = if ($unreachable) { $skipped } else { Invoke-PassiveRequest -Client $client -Uri ([uri]::new($siteRoot, '/xmlrpc.php')) -Method 'GET' -MaxBodyBytes 8192 }

$isWp = (@($cms.WordPressHints).Count -gt 0)
$cmsText = if ($isWp) { "WordPress erkannt ($(@($cms.WordPressHints) -join ', '))" } elseif ($cms.OtherCms) { "Anderes System: $($cms.OtherCms)" } else { 'Kein CMS eindeutig erkannt' }
if ($cms.Generator) { $cmsText += "; Generator: $($cms.Generator)" }
Add-Finding 'CMS' 'System-Erkennung' 'Info' $cmsText '–'
if ($isWp) {
    if ($cms.WordPressVersion) { Add-Finding 'CMS' 'Versionsanzeige (Generator-Meta)' 'Pruefen' "Version $($cms.WordPressVersion) öffentlich sichtbar" 'M-CMS-VERSION' }
    $wjRating = if ($wpJsonIsWp) { 'Info' } else { 'OK' }
    Add-Finding 'CMS' '/wp-json/ (REST-API-Index)' $wjRating "HTTP $($wpJson.StatusCode)$(if($wpJsonIsWp){', erreichbar (Normalbetrieb; Benutzer-Endpunkte bewusst nicht abgefragt)'})" 'M-WPJSON'
    $rmRating = if ($readmeIsWp) { 'Pruefen' } else { 'OK' }
    Add-Finding 'CMS' '/readme.html' $rmRating "HTTP $($readme.StatusCode)$(if($readmeIsWp){', WordPress-Readme öffentlich'})" 'M-README'
    $xa = Get-XmlRpcAssessment $xmlrpc.StatusCode $xmlrpc.Body
    Add-Finding 'CMS' '/xmlrpc.php' $xa.Rating $xa.Note 'M-XMLRPC'
}
$cveNeeded = $isWp -or (-not $cms.OtherCms)
if ($cveNeeded) {
    $cveDetail = if ($isWp) { 'WordPress erkannt. Version im WP-Backend prüfen und mit dem Hersteller-Advisory abgleichen.' } else { 'System unklar. Falls WordPress im Einsatz ist: Version im WP-Backend prüfen.' }
    Add-Finding 'CMS' 'CVE-2026-87902 (WordPress Core, CISA KEV)' 'Handlungsbedarf' $cveDetail 'M-CVE'
}

# 5) security.txt
Write-Host '  [5/6] security.txt'
$sec = $skipped
if (-not $unreachable) {
    $sec = Invoke-PassiveRequest -Client $client -Uri ([uri]::new($siteRoot, '/.well-known/security.txt')) -Method 'GET' -MaxBodyBytes 65536
    $sa = Get-SecurityTxtAssessment $sec.StatusCode (Get-HeaderValue $sec.Headers 'Content-Type') $sec.Body
    Add-Finding 'Kontakt' '/.well-known/security.txt' $sa.Rating $sa.Note 'M-SECTXT'
}

# 6) Bericht
Write-Host '  [6/6] Bericht schreiben'
$order = @{ 'Handlungsbedarf' = 0; 'Pruefen' = 1; 'OK' = 2; 'Info' = 3 }
$label = @{ 'Handlungsbedarf' = 'Handlungsbedarf'; 'Pruefen' = 'Prüfen'; 'OK' = 'OK'; 'Info' = 'Info' }
# Priorität innerhalb gleicher Bewertung (für Management-Summary)
$measurePrio = @{ 'M-CVE' = 0; 'M-TLS' = 1; 'M-REDIR' = 2; 'M-HSTS' = 3; 'M-CSP' = 4; 'M-FRAME' = 5; 'M-XCTO' = 6; 'M-XMLRPC' = 7; 'M-COOKIE' = 8; 'M-README' = 9; 'M-BANNER' = 10; 'M-CMS-VERSION' = 11; 'M-SECTXT' = 12; 'M-REF' = 13; 'M-PERM' = 14; 'M-WPJSON' = 15 }
$sorted = @($findings | Sort-Object @{ Expression = { $order[$_.Rating] } }, @{ Expression = { if ($measurePrio.ContainsKey($_.Measure)) { $measurePrio[$_.Measure] } else { 99 } } }, Area)
$top = @($sorted | Where-Object { $_.Rating -in 'Handlungsbedarf', 'Pruefen' } | Select-Object -First 3)
$nHigh = @($findings | Where-Object Rating -eq 'Handlungsbedarf').Count
$nMid = @($findings | Where-Object Rating -eq 'Pruefen').Count
$overall = if ($nHigh -gt 0) { 'Rot – Handlungsbedarf' } elseif ($nMid -gt 0) { 'Gelb – Verbesserungen prüfen' } else { 'Grün – keine auffälligen Befunde (im Rahmen dieses Checks)' }
$cnt = $findings | Group-Object Rating | ForEach-Object { "$($label[$_.Name]): $($_.Count)" }

$sb = [System.Text.StringBuilder]::new()
[void]$sb.AppendLine('---')
[void]$sb.AppendLine('tags: [cyspa, sicherheits-check, webseite, e2]')
[void]$sb.AppendLine('status: Bericht – Auswertung durch Security (Michael) und Freigabe LWE')
[void]$sb.AppendLine("date: $($stamp.ToString('yyyy-MM-dd'))")
[void]$sb.AppendLine("source: Check-Invoke-CyspaWebCheck.ps1 v$($script:ToolVersion) (passiv, lokal ausgeführt)")
[void]$sb.AppendLine('klassifizierung: internal')
[void]$sb.AppendLine('---')
[void]$sb.AppendLine()
[void]$sb.AppendLine("# Web-Sicherheits-Check $authority")
[void]$sb.AppendLine()
[void]$sb.AppendLine("**Zeitpunkt:** $($stamp.ToString('dd.MM.yyyy HH:mm')) · **Methode:** nur passive GET-Abrufe öffentlicher Seiten, keine Scans, keine Logins, keine Benutzerabfragen · **Bezug:** Entscheid E2, Cyber Security Briefing KW 40")
[void]$sb.AppendLine()
if ($SkipCertificateCheck) { [void]$sb.AppendLine('> Achtung: Lauf mit -SkipCertificateCheck (Testmodus).'); [void]$sb.AppendLine() }
[void]$sb.AppendLine('## Management-Summary')
[void]$sb.AppendLine()
[void]$sb.AppendLine("**Gesamtlage:** $overall · **Befunde:** $($cnt -join ' · ')")
[void]$sb.AppendLine()
[void]$sb.AppendLine('**Top-3-Befunde**')
[void]$sb.AppendLine()
if ($top.Count -eq 0) { [void]$sb.AppendLine('Keine Befunde mit Handlungsbedarf oder Prüfbedarf.') }
$i = 0
foreach ($t in $top) { $i++; [void]$sb.AppendLine("$i. **$($t.Check)** ($($label[$t.Rating])): $(ConvertTo-MdCell $t.Detail 200) → Massnahme $($t.Measure), Kontrolle $(Get-ControlRef $t.Measure)") }
[void]$sb.AppendLine()
[void]$sb.AppendLine('**Entscheidungsbedarf der Geschäftsleitung**')
[void]$sb.AppendLine()
[void]$sb.AppendLine('| # | Frage (Ja/Nein) | Empfehlung |')
[void]$sb.AppendLine('|---|---|---|')
$d = 0
if ($cveNeeded) { $d++; [void]$sb.AppendLine("| D$d | Wird die WordPress-Version sofort im Backend gegen CVE-2026-87902 geprüft und bei Bedarf aktualisiert (Owner: Webseiten-Verantwortliche, Fallback LWE)? | **Ja**, vor jeder weiteren Änderung an der Webseite. |") }
if ($nHigh -gt 0) { $d++; [void]$sb.AppendLine("| D$d | Werden die $nHigh Befunde mit Handlungsbedarf durch Webseiten-Verantwortliche bzw. Hoster behoben, mit Termin und erneutem Check? | **Ja**, Termin: [durch GL festzulegen]. |") }
if ($nMid -gt 0) { $d++; [void]$sb.AppendLine("| D$d | Werden die $nMid Befunde «Prüfen» vom Webseiten-Owner mit Security (Michael) bewertet und begründet umgesetzt oder akzeptiert? | **Ja**, im nächsten Änderungsfenster. |") }
$d++; [void]$sb.AppendLine("| D$d | Werden neue Inhalte (z. B. /tabletop) erst nach Umsetzung der obigen Entscheide eingepflegt (Entscheid E2: Check vor der nächsten Änderung)? | **Ja.** |")
[void]$sb.AppendLine()
[void]$sb.AppendLine('## Befunde im Detail')
[void]$sb.AppendLine()
[void]$sb.AppendLine('| Bereich | Prüfpunkt | Bewertung | Befund | Massnahme (README) | Kontrolle ISO/IEC 27001:2022 Anhang A |')
[void]$sb.AppendLine('|---|---|---|---|---|---|')
foreach ($f in $sorted) {
    [void]$sb.AppendLine("| $(ConvertTo-MdCell $f.Area) | $(ConvertTo-MdCell $f.Check) | **$($label[$f.Rating])** | $(ConvertTo-MdCell $f.Detail 260) | $(ConvertTo-MdCell $f.Measure) | $(Get-ControlRef $f.Measure) |")
}
[void]$sb.AppendLine()
[void]$sb.AppendLine('*Kontroll-Zuordnung zur Orientierung (ISO/IEC 27001:2022 Anhang A, Umsetzungshinweise in ISO/IEC 27002:2022). Keine Audit- oder Konformitätsaussage.*')
[void]$sb.AppendLine()
if ($cveNeeded) {
    [void]$sb.AppendLine('## CVE-2026-87902 – WordPress Core')
    [void]$sb.AppendLine()
    [void]$sb.AppendLine('- **Art:** Remote File Inclusion in WordPress Core (CWE-98). Ein nicht angemeldeter Angreifer kann laut CISA die Seitenvorlagen-Auflösung dazu bringen, eine lesbare lokale `.php`-Datei ausserhalb der Theme-Verzeichnisse einzubinden. Folge: Ausführung von Code auf dem Server.')
    [void]$sb.AppendLine('- **Status:** Im CISA-Katalog KEV (aktiv ausgenutzte Schwachstellen) seit 25.09.2026. Forensische Triage empfohlen.')
    [void]$sb.AppendLine('- **Dieses Skript kann die Verwundbarkeit nicht feststellen.** Die öffentlich sichtbare Version ist oft ausgeblendet oder falsch. Massgeblich ist die Version im WordPress-Backend (Dashboard → Aktualisierungen).')
    [void]$sb.AppendLine('- **Vorgehen:** Version im Backend ablesen → mit dem Hersteller-Advisory abgleichen (https://github.com/WordPress/wordpress-develop/security/advisories/GHSA-7hp8-65ch-5whp, NVD: https://nvd.nist.gov/vuln/detail/CVE-2026-87902) → aktualisieren → bei Verdacht auf Kompromittierung Massnahme M-CVE im README befolgen.')
    [void]$sb.AppendLine()
}
[void]$sb.AppendLine('## Rohdaten Startseite (Antwort-Header)')
[void]$sb.AppendLine()
if ($H) {
    [void]$sb.AppendLine('| Header | Wert |'); [void]$sb.AppendLine('|---|---|')
    foreach ($k in ($H.Keys | Sort-Object)) {
        $val = if ($k -ieq 'Set-Cookie') { '(Werte nicht protokolliert, siehe Cookie-Flags)' } else { @($H[$k]) -join ', ' }
        [void]$sb.AppendLine("| $(ConvertTo-MdCell $k) | $(ConvertTo-MdCell $val 300) |")
    }
} else { [void]$sb.AppendLine('Keine Header (Startseite nicht erreichbar).') }
[void]$sb.AppendLine()
[void]$sb.AppendLine('## Abgerufene Adressen')
[void]$sb.AppendLine()
$all = @(@($httpChain) + @($chain) + @($wpJson, $readme, $xmlrpc, $sec) | Where-Object { $null -ne $_.Uri })
foreach ($r in $all) { [void]$sb.AppendLine("- $($r.Method) $($r.Uri) → $(if($r.Error){"Fehler: $(ConvertTo-MdCell $r.Error 120)"}else{"HTTP $($r.StatusCode)"})") }
[void]$sb.AppendLine("- TLS-Handshake $($hp.Host):$($hp.Port) → $(if($tls.Ok){$tls.Protocol}else{"Fehler: $($tls.Error)"})")
[void]$sb.AppendLine()
[void]$sb.AppendLine('## Verteiler und Abnahme')
[void]$sb.AppendLine()
[void]$sb.AppendLine('**Klassifizierung:** intern. Der Bericht kann Schwachstellen benennen und wird nicht öffentlich geteilt. Externe (Hoster, Agentur) erhalten nach Freigabe nur den Massnahmen-Auszug.')
[void]$sb.AppendLine()
[void]$sb.AppendLine('**Verteiler:** LWE (Inhaberin, Geschäftsleitung) · Michael (Security) · Webseiten-Verantwortliche/r [NEEDS INPUT] · Hoster/Agentur nur Auszug nach Freigabe')
[void]$sb.AppendLine()
[void]$sb.AppendLine('| Rolle | Name | Datum | Visum / Bemerkung |')
[void]$sb.AppendLine('|---|---|---|---|')
[void]$sb.AppendLine('| Check ausgeführt | [Name] | ' + $stamp.ToString('dd.MM.yyyy') + ' | |')
[void]$sb.AppendLine('| Fachliche Prüfung und Bewertung | Michael (Security) | | |')
[void]$sb.AppendLine('| Freigabe Massnahmen | LWE (Inhaberin) | | |')
[void]$sb.AppendLine()
[void]$sb.AppendLine('## Grenzen')
[void]$sb.AppendLine()
[void]$sb.AppendLine('Geprüft wurden nur öffentlich sichtbare Merkmale der Startseite und weniger Standardpfade. Nicht geprüft: Plugins und Themes, Versionsstände im Backend, Konfiguration des Servers, Admin-Zugänge, Unterseiten, Formulare, E-Mail-Sicherheit (SPF/DKIM/DMARC). Ein unauffälliger Bericht ist kein Nachweis, dass die Webseite sicher ist.')

try {
    Set-Content -LiteralPath $OutFile -Value $sb.ToString() -Encoding utf8
} catch { Write-Error "Bericht konnte nicht geschrieben werden: $_"; exit 1 }

Write-Host ''
Write-Host "Bericht: $OutFile"
Write-Host ("Übersicht: {0}" -f ($cnt -join ' · '))
$client.Dispose()
if ($unreachable) { exit 2 } else { exit 0 }
