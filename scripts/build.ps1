$root = Split-Path -Parent $PSScriptRoot
$dist = Join-Path $root "dist"
$bundledNode = "C:\Users\Wheel\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$nodeExe = if (Test-Path -LiteralPath $bundledNode) { $bundledNode } else { "node" }
$tailwindCli = Join-Path $root "node_modules\tailwindcss\lib\cli.js"
$tscCli = Join-Path $root "node_modules\typescript\bin\tsc"

if (-not (Test-Path -LiteralPath $dist)) {
  New-Item -ItemType Directory -Path $dist | Out-Null
}

Push-Location $root

try {
  & $nodeExe $tailwindCli -i .\src\index.css -o .\dist\styles.css

  if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
  }

  & $nodeExe $tscCli -p .\tsconfig.runtime.json

  if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
  }

  & powershell -ExecutionPolicy Bypass -File .\scripts\validate.ps1
  exit $LASTEXITCODE
}
finally {
  Pop-Location
}
