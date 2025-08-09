#!/usr/bin/env sh

set -e

# Move to project root (parent of scripts)
SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
cd "$SCRIPT_DIR/.."

echo "=== Vipercam Website - Local Runner (macOS/Linux) ==="

if [ ! -f package.json ]; then
  echo "[Error] package.json not found. Run this script from the extracted vipercam-local folder."
  exit 1
fi

need_install=0
if ! command -v node >/dev/null 2>&1; then
  need_install=1
else
  MAJOR=$(node -v | sed 's/^v//' | cut -d. -f1)
  if [ "$MAJOR" -lt 18 ]; then
    need_install=1
  fi
fi

if [ "$need_install" -eq 1 ]; then
  echo "Node.js not found or too old. Attempting automatic install..."
  if [ "$(uname)" = "Darwin" ]; then
    # macOS: try brew
    if command -v brew >/dev/null 2>&1; then
      echo "Installing Node.js LTS via Homebrew..."
      brew install node@18 || brew install node
      brew link --overwrite node@18 || true
    else
      echo "Homebrew not found. Please install Node 18+ from https://nodejs.org/ and re-run."
      exit 1
    fi
  else
    # Linux: try apt/yum/dnf, else NodeSource
    if command -v apt >/dev/null 2>&1; then
      echo "Installing Node.js 18 via apt (NodeSource)..."
      curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
      sudo apt-get install -y nodejs
    elif command -v dnf >/dev/null 2>&1; then
      echo "Installing Node.js 18 via dnf..."
      sudo dnf module enable -y nodejs:18 || true
      sudo dnf install -y nodejs
    elif command -v yum >/dev/null 2>&1; then
      echo "Installing Node.js 18 via yum (NodeSource)..."
      curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
      sudo yum install -y nodejs
    else
      echo "Automatic install not supported on this distro. Please install Node 18+ and re-run."
      exit 1
    fi
  fi
fi

PORT="${PORT:-3000}"

echo "[1/2] Installing production dependencies..."
npm ci --omit=dev

# Background curl loop to open browser when ready
(
  URL="http://localhost:${PORT}"
  for i in $(seq 1 90); do
    sleep 1
    if command -v curl >/dev/null 2>&1; then
      if curl -s -o /dev/null "$URL"; then
        if command -v xdg-open >/dev/null 2>&1; then xdg-open "$URL"; fi
        if command -v open >/dev/null 2>&1; then open "$URL"; fi
        break
      fi
    fi
  done
) &

echo "[2/2] Starting server on port ${PORT} ..."
PORT="$PORT" npm start