$root = Split-Path -Parent $PSScriptRoot
$bundledNode = "C:\Users\Wheel\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$nodeExe = if (Test-Path -LiteralPath $bundledNode) { $bundledNode } else { "node" }
$tscCli = Join-Path $root "node_modules\typescript\bin\tsc"

Push-Location $root

try {
  & $nodeExe $tscCli -b
  exit $LASTEXITCODE
}
finally {
  Pop-Location
}
