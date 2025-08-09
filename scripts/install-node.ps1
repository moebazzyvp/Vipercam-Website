Param(
  [int]$RequiredMajor = 18
)

function Get-NodeMajorVersion {
  try {
    $v = (& node -v) 2>$null
    if (-not $v) { return $null }
    if ($v.StartsWith('v')) { $v = $v.Substring(1) }
    $major = [int]($v.Split('.')[0])
    return $major
  } catch { return $null }
}

function Refresh-Path {
  $machine = [System.Environment]::GetEnvironmentVariable('Path','Machine')
  $user    = [System.Environment]::GetEnvironmentVariable('Path','User')
  $env:Path = "$machine;$user"
}

$major = Get-NodeMajorVersion
if ($major -ge $RequiredMajor) {
  Write-Host "Node.js v$major already installed (>= $RequiredMajor)" -ForegroundColor Green
  exit 0
}

Write-Host "Node.js not found or too old. Attempting automatic install..." -ForegroundColor Yellow

# 1) Try winget (Windows 10/11)
$winget = Get-Command winget -ErrorAction SilentlyContinue
if ($winget) {
  Write-Host "Installing Node.js LTS via winget..." -ForegroundColor Cyan
  winget install -e --id OpenJS.NodeJS.LTS --silent --accept-package-agreements --accept-source-agreements
  Refresh-Path
  $major = Get-NodeMajorVersion
  if ($major -ge $RequiredMajor) { Write-Host "Installed Node.js via winget (v$major)" -ForegroundColor Green; exit 0 }
}

# 2) Try Chocolatey
$choco = Get-Command choco -ErrorAction SilentlyContinue
if ($choco) {
  Write-Host "Installing Node.js LTS via Chocolatey..." -ForegroundColor Cyan
  choco install nodejs-lts -y
  Refresh-Path
  $major = Get-NodeMajorVersion
  if ($major -ge $RequiredMajor) { Write-Host "Installed Node.js via Chocolatey (v$major)" -ForegroundColor Green; exit 0 }
}

# 3) Fallback: download MSI for Node 18 x64
try {
  $temp = New-Item -ItemType Directory -Force (Join-Path $env:TEMP "vipercam-node-install")
  $msiUrl = "https://nodejs.org/dist/v18.19.1/node-v18.19.1-x64.msi"
  $msiPath = Join-Path $temp.FullName "node-v18.19.1-x64.msi"
  Write-Host "Downloading Node.js MSI..." -ForegroundColor Cyan
  Invoke-WebRequest -Uri $msiUrl -OutFile $msiPath -UseBasicParsing
  Write-Host "Installing Node.js (silent)..." -ForegroundColor Cyan
  Start-Process msiexec.exe -ArgumentList "/i `"$msiPath`" /qn /norestart" -Wait
  Refresh-Path
  $major = Get-NodeMajorVersion
  if ($major -ge $RequiredMajor) { Write-Host "Installed Node.js via MSI (v$major)" -ForegroundColor Green; exit 0 }
} catch {
  Write-Warning "Automatic MSI install failed: $($_.Exception.Message)"
}

Write-Error "Unable to install Node.js automatically. Please install Node 18+ from https://nodejs.org and re-run."
exit 1