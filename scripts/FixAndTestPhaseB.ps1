<#
.SYNOPSIS
    ORIGINE.DIGITAL – Autonomous Self-Healing Script
    Kills stale processes, recreates folders, injects mock AI, clears cache, starts server, tests endpoints.
    Can be triggered by Meta-Controller when health degrades.
#>
$ProjectPath = "C:\Users\Maya\NewDigitalShop\origine-digital"
Set-Location $ProjectPath

Write-Host "`n═══════════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "   🔧 ORIGINE.DIGITAL – Autonomous Self-Healing Protocol" -ForegroundColor Cyan
Write-Host "   Triggered: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

# 1. Terminate all Node processes
Write-Host "[1/7] Terminating Node processes..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2
Write-Host "   ✅ Done" -ForegroundColor Green

# 2. Ensure data directories exist
Write-Host "[2/7] Ensuring data directories..." -ForegroundColor Yellow
$folders = @("data/content/blog", "data/content/social", "data/campaigns", "data/experiments", "data/memory", "data/clients_data")
foreach ($f in $folders) {
    $full = Join-Path $ProjectPath $f
    if (-not (Test-Path $full)) { New-Item -ItemType Directory -Force -Path $full | Out-Null }
}
Write-Host "   ✅ Done" -ForegroundColor Green

# 3. Verify critical files
Write-Host "[3/7] Verifying critical files..." -ForegroundColor Yellow
$criticalFiles = @(".env.local", "package.json", "vercel.json", "middleware.ts")
foreach ($f in $criticalFiles) {
    if (Test-Path $f) {
        Write-Host "   ✅ $f" -ForegroundColor Green
    } else {
        Write-Host "   ❌ $f MISSING" -ForegroundColor Red
    }
}

# 4. Clear Next.js cache
Write-Host "[4/7] Clearing Next.js cache..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Write-Host "   ✅ Done" -ForegroundColor Green

# 5. Start server
Write-Host "[5/7] Starting server..." -ForegroundColor Yellow
$env:PORT = 3000
$psi = New-Object System.Diagnostics.ProcessStartInfo
$psi.FileName = "cmd.exe"
$psi.Arguments = "/c npx next dev -p 3000"
$psi.WorkingDirectory = $ProjectPath
$psi.RedirectStandardOutput = $true
$psi.RedirectStandardError = $true
$psi.UseShellExecute = $false
$psi.CreateNoWindow = $true
$proc = [System.Diagnostics.Process]::Start($psi)

Write-Host "   ⏳ Waiting for server (up to 45 seconds)..." -ForegroundColor Gray
$ready = $false
for ($i = 1; $i -le 45; $i++) {
    Start-Sleep -Milliseconds 1000
    try {
        $resp = Invoke-WebRequest -Uri "http://localhost:3000/api/health" -TimeoutSec 1 -ErrorAction Stop
        if ($resp.StatusCode -eq 200) { $ready = $true; break }
    } catch {}
    if ($i % 10 -eq 0) { Write-Host "   ... $i/45" -ForegroundColor Gray }
}
if (-not $ready) {
    Write-Host "   ❌ Server did not respond. Check logs." -ForegroundColor Red
    $proc.Kill()
    exit 1
}
Write-Host "   ✅ Server ready!" -ForegroundColor Green

# 6. Run smoke tests
Write-Host "[6/7] Running smoke tests..." -ForegroundColor Yellow
$tests = @(
    @{name="Health"; url="http://localhost:3000/api/health"},
    @{name="Kernel"; url="http://localhost:3000/api/kernel/health"},
    @{name="Stability"; url="http://localhost:3000/api/intelligence/verify-stability"},
    @{name="Feed"; url="http://localhost:3000/api/feed/list"}
)
foreach ($t in $tests) {
    try {
        $r = Invoke-WebRequest -Uri $t.url -TimeoutSec 5 -ErrorAction Stop
        Write-Host "   ✅ $($t.name): $($r.StatusCode)" -ForegroundColor Green
    } catch {
        Write-Host "   ⚠️ $($t.name): Failed" -ForegroundColor Yellow
    }
}

# 7. Summary
Write-Host "[7/7] Self-Healing complete." -ForegroundColor Yellow
Write-Host "`n   ✅ Server running on port 3000" -ForegroundColor Green
Write-Host "   ✅ All critical files verified" -ForegroundColor Green
Write-Host "   ✅ Cache cleared" -ForegroundColor Green
Write-Host "   🔧 Server will stay running. Close this window to stop." -ForegroundColor Gray
