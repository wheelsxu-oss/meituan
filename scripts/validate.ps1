$requiredFiles = @(
  "index.html",
  "dist\App.js",
  "dist\bundle.js",
  "dist\main.js",
  "dist\styles.css",
  "dist\data\prototypeData.js",
  "dist\vendor\react.js",
  "dist\vendor\react-jsx-runtime.js",
  "vendor\framer-motion.js",
  "vendor\react.production.min.js",
  "vendor\react-dom.production.min.js",
  "scripts/dev-server.ps1",
  "tsconfig.runtime.json"
)

$root = Split-Path -Parent $PSScriptRoot
$missing = @()

foreach ($relativePath in $requiredFiles) {
  $fullPath = Join-Path $root $relativePath

  if (-not (Test-Path -LiteralPath $fullPath -PathType Leaf)) {
    $missing += $relativePath
  }
}

if ($missing.Count -gt 0) {
  Write-Host "Missing required prototype files:" -ForegroundColor Red

  foreach ($item in $missing) {
    Write-Host "- $item" -ForegroundColor Red
  }

  exit 1
}

Write-Host "Prototype validation passed."
