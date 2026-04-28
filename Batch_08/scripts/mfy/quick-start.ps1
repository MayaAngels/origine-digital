# MFY Platform - Quick Start
Write-Host "🚀 Iniciando MFY Platform..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Para usar a MFY Platform:"
Write-Host "  1. Execute: npm run dev"
Write-Host "  2. Acesse: http://localhost:3000"
Write-Host "  3. Vá até: http://localhost:3000/products/1"
Write-Host "  4. Clique em 'Feito para Você'"
Write-Host ""
Write-Host "Para ver o dashboard: http://localhost:3000/mfy"
Write-Host ""

$start = Read-Host "Iniciar servidor agora? (S/N)"
if ($start -eq "S") {
    npm run dev
}
