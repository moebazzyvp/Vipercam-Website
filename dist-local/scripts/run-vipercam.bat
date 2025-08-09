@echo off
setlocal ENABLEEXTENSIONS ENABLEDELAYEDEXPANSION

REM Ensure we run from project root (parent of scripts)
pushd "%~dp0.."

echo === Vipercam Website - Local Runner (Windows) ===

if not exist package.json (
  echo [Error] package.json not found. Please run this file from the extracted vipercam-local folder.
  pause
  popd
  exit /b 1
)

REM Check Node presence and version
where node >NUL 2>&1
if errorlevel 1 goto install_node
for /f "usebackq tokens=1 delims=.v" %%A in (`node -v`) do set NODE_MAJOR=%%A
if not defined NODE_MAJOR set NODE_MAJOR=0
if %NODE_MAJOR% LSS 18 goto install_node
goto deps_install

:install_node
  echo Node.js not found or too old. Attempting automatic install...
  where winget >NUL 2>&1
  if not errorlevel 1 (
    echo Installing Node.js LTS via winget...
    winget install -e --id OpenJS.NodeJS.LTS --silent --accept-package-agreements --accept-source-agreements
  ) else (
    where choco >NUL 2>&1
    if not errorlevel 1 (
      echo Installing Node.js LTS via Chocolatey...
      choco install nodejs-lts -y
    ) else (
      echo winget/choco not available. Falling back to PowerShell installer...
      powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0install-node.ps1" -RequiredMajor 18
      if errorlevel 1 (
        echo [Error] Automatic Node.js install failed. Please install Node 18+ from https://nodejs.org/ and re-run.
        pause
        popd
        exit /b 1
      )
    )
  )
  REM Refresh PATH for current session
  for /f "tokens=*" %%a in ('powershell -NoProfile -Command "[System.Environment]::GetEnvironmentVariable(''Path'',''Machine'');[System.Environment]::GetEnvironmentVariable(''Path'',''User'')"') do set "PATH=%%a;%PATH%"

  REM Re-check version
  for /f "usebackq tokens=1 delims=.v" %%A in (`node -v`) do set NODE_MAJOR=%%A
  if not defined NODE_MAJOR set NODE_MAJOR=0
  if %NODE_MAJOR% LSS 18 (
    echo [Error] Node.js install did not complete correctly. Found major version %NODE_MAJOR%.
    pause
    popd
    exit /b 1
  )

:deps_install
  echo.
  echo [1/2] Installing production dependencies...
  call npm ci --omit=dev
  if errorlevel 1 (
    echo [Warn] npm ci failed. Retrying with --legacy-peer-deps...
    set npm_config_legacy_peer_deps=true
    call npm ci --omit=dev --legacy-peer-deps
    if errorlevel 1 (
      echo [Error] Failed to install dependencies even with --legacy-peer-deps. See npm debug log in %%LOCALAPPDATA%%\npm-cache\_logs
      pause
      popd
      exit /b 1
    )
  )

  if "%PORT%"=="" set PORT=3000

  echo.
  echo [2/2] Starting server on port %PORT% ...
  set "PORT=%PORT%"

  REM Start a background PowerShell task to open the browser when ready
  powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Job -ScriptBlock { param($p) $u=\"http://localhost:$p\"; for($i=0;$i -lt 90;$i++){ Start-Sleep -Seconds 1; try{ $r=Invoke-WebRequest -Uri $u -UseBasicParsing -Method Head -TimeoutSec 2; if($r.StatusCode -ge 200){ Start-Process $u | Out-Null; break } }catch{} } } -ArgumentList %PORT% | Out-Null"

  call npm start
  set EXITCODE=%ERRORLEVEL%
  popd
  exit /b %EXITCODE%

endlocal