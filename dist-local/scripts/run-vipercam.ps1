Param(
  [int]$Port = 3000
)

# Move to project root (parent of scripts folder)
Set-Location -Path (Join-Path $PSScriptRoot "..")

Write-Host "=== Vipercam Website - Local Runner (PowerShell) ===" -ForegroundColor Cyan

if (-not (Test-Path "package.json")) {
  Write-Error "package.json not found. Please run this script from the extracted vipercam-local folder."
  Read-Host "Press Enter to exit"
  exit 1
}

# Ensure Node 18+
$node = Get-Command node -ErrorAction SilentlyContinue
$needInstall = $false
if (-not $node) { $needInstall = $true }

function Get-NodeMajor {
  try {
    $v = (& node -v) 2>$null
    if (-not $v) { return 0 }
    if ($v.StartsWith('v')) { $v = $v.Substring(1) }
    return [int]($v.Split('.')[0])
  } catch { return 0 }
}

if (-not $needInstall) {
  $major = Get-NodeMajor
  if ($major -lt 18) { $needInstall = $true }
}

if ($needInstall) {
  Write-Host "Node.js not found or too old. Installing Node 18 LTS..." -ForegroundColor Yellow
  & "$PSScriptRoot/install-node.ps1" -RequiredMajor 18
  if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to install Node.js automatically."
    Read-Host "Press Enter to exit"
    exit 1
  }
}

Write-Host "[1/2] Installing production dependencies..." -ForegroundColor Yellow
npm ci --omit=dev
if ($LASTEXITCODE -ne 0) {
  Write-Warning "npm ci failed (likely peer dependency conflict). Retrying with --legacy-peer-deps..."
  $env:npm_config_legacy_peer_deps = "true"
  npm ci --omit=dev --legacy-peer-deps
  if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to install dependencies even with --legacy-peer-deps. See npm debug log in %LOCALAPPDATA%\npm-cache\_logs"
    Read-Host "Press Enter to exit"
    exit 1
  }
}

$env:PORT = $Port

# Background job to wait for server then open browser
$openJob = Start-Job -ScriptBlock {
  param($p)
  $url = "http://localhost:$p"
  for ($i = 0; $i -lt 90; $i++) {
    Start-Sleep -Seconds 1
    try {
      $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -Method Head -TimeoutSec 2
      if ($resp.StatusCode -ge 200) {
        Start-Process $url | Out-Null
        break
      }
    } catch { }
  }
} -ArgumentList $Port

Write-Host "[2/2] Starting server on port $Port ..." -ForegroundColor Green
npm start
$code = $LASTEXITCODE
if ($code -ne 0) { Write-Host "Server exited with code $code" -ForegroundColor Yellow }
Read-Host "Press Enter to close"
exit $code