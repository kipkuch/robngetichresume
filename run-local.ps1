[CmdletBinding()]
param(
    [ValidateRange(1, 65535)]
    [int]$Port = 8000
)

$python = Get-Command py -ErrorAction SilentlyContinue
$pythonArguments = @('-3', '-m', 'http.server', $Port, '--bind', '127.0.0.1')

if ($null -eq $python) {
    $python = Get-Command python -ErrorAction SilentlyContinue
    $pythonArguments = @('-m', 'http.server', $Port, '--bind', '127.0.0.1')
}

if ($null -eq $python) {
    throw 'Python was not found. Install Python 3 and ensure py or python is on PATH.'
}

Set-Location -LiteralPath $PSScriptRoot
Write-Host "Serving $PSScriptRoot at http://127.0.0.1:$Port"
Write-Host 'Press Ctrl+C to stop.'

& $python.Source @pythonArguments
exit $LASTEXITCODE
