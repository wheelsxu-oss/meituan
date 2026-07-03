param(
  [int]$Port = 4173
)

$root = Split-Path -Parent $PSScriptRoot
$bundledNode = "C:\Users\Wheel\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$nodeExe = if (Test-Path -LiteralPath $bundledNode) { $bundledNode } else { "node" }
$serverScript = Join-Path $root "scripts\dev-server.mjs"

Push-Location $root

try {
  $env:PORT = [string]$Port
  & $nodeExe $serverScript
  exit $LASTEXITCODE
}
finally {
  Pop-Location
}
