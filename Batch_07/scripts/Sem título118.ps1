# deep_snapshot.ps1 – thorough inspection of origine-digital
$project = "C:\Users\Maya\NewDigitalShop\origine-digital"

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "   DEEP PROJECT SNAPSHOT – $(Get-Date) " -ForegroundColor Cyan
Write-Host "   $project " -ForegroundColor Yellow
Write-Host "============================================="

# 1. package.json
$pkgPath = Join-Path $project "package.json"
if (Test-Path $pkgPath) {
    Write-Host "`n[package.json] found" -ForegroundColor Green
    $pkg = Get-Content $pkgPath -Raw | ConvertFrom-Json
    Write-Host "  Name: $($pkg.name)"
    Write-Host "  Version: $($pkg.version)"
    Write-Host "  Scripts:"
    $pkg.scripts | Get-Member -MemberType NoteProperty | ForEach-Object {
        $key = $_.Name
        Write-Host "    $key : $($pkg.scripts.$key)"
    }
    Write-Host "  Dependencies ($(($pkg.dependencies | Get-Member -MemberType NoteProperty).Count) items):"
    $pkg.dependencies | Get-Member -MemberType NoteProperty | ForEach-Object {
        Write-Host "    $($_.Name) : $($pkg.dependencies.$($_.Name))"
    }
    Write-Host "  DevDependencies ($(($pkg.devDependencies | Get-Member -MemberType NoteProperty).Count) items):"
    $pkg.devDependencies | Get-Member -MemberType NoteProperty | ForEach-Object {
        Write-Host "    $($_.Name) : $($pkg.devDependencies.$($_.Name))"
    }
} else {
    Write-Host "`n[package.json] NOT FOUND – project may not be initialized" -ForegroundColor Red
}

# 2. Configuration files
Write-Host "`n[Configuration files]"
$configs = @("next.config.js", "next.config.mjs", "tsconfig.json", "jsconfig.json",  
             "tailwind.config.js", "postcss.config.js", ".eslintrc.json", ".prettierrc",
             "prisma/schema.prisma", "Dockerfile", "docker-compose.yml", ".env.local")
foreach ($c in $configs) {
    $path = Join-Path $project $c
    if (Test-Path $path) {
        Write-Host "  ✔ $c" -ForegroundColor Green
    }
}
# Special check: .env (warn if present)
if (Test-Path (Join-Path $project ".env")) {
    Write-Host "  ⚠ .env file present (should be .env.local in development, not committed)" -ForegroundColor Yellow
}

# 3. Core directories and routing
Write-Host "`n[Directory structure & code presence]"
$appDir = Join-Path $project "app"
$pagesDir = Join-Path $project "pages"
$componentsDir = Join-Path $project "components"
$libDir = Join-Path $project "lib"
$utilsDir = Join-Path $project "utils"
$hooksDir = Join-Path $project "hooks"
$stylesDir = Join-Path $project "styles"
$publicDir = Join-Path $project "public"

if (Test-Path $appDir) {
    Write-Host "  App Router (app/) FOUND" -ForegroundColor Green
    $appFiles = Get-ChildItem $appDir -Recurse -File | Where-Object { $_.Name -match "\.(tsx|jsx|ts|js)$" }
    $routeCount = ($appFiles | Where-Object { $_.Name -eq "page.tsx" -or $_.Name -eq "page.js" }).Count
    Write-Host "    Route pages (page.tsx/js): $routeCount"
    Write-Host "    Layout files (layout.tsx/js): $((Get-ChildItem $appDir -Recurse -File -Filter "layout.tsx" -ErrorAction SilentlyContinue).Count)"
    Write-Host "    Total component files: $($appFiles.Count)"
    # Check for product pages specifically
    $productPages = Get-ChildItem $appDir -Recurse -Directory | Where-Object { $_.Name -like "*product*" }
    if ($productPages) {
        Write-Host "    Product-related route segments found:" -ForegroundColor Green
        $productPages | ForEach-Object { Write-Host "      $($_.FullName.Replace($project, ''))" }
    }
}
if (Test-Path $pagesDir) {
    Write-Host "  Pages Router (pages/) FOUND" -ForegroundColor Green
    $pageFiles = Get-ChildItem $pagesDir -Recurse -File -Filter "*.tsx" -ErrorAction SilentlyContinue
    Write-Host "    Page files (.tsx): $($pageFiles.Count)"
}

if (Test-Path $componentsDir) {
    $compCount = (Get-ChildItem $componentsDir -Recurse -File -Include "*.tsx","*.jsx" -ErrorAction SilentlyContinue).Count
    Write-Host "  components/ directory present with $compCount component files" -ForegroundColor Green
} else {
    Write-Host "  No components/ directory" -ForegroundColor Yellow
}
if (Test-Path $libDir) { Write-Host "  lib/ directory present (utilities)" -ForegroundColor Green }
if (Test-Path $utilsDir) { Write-Host "  utils/ directory present" -ForegroundColor Green }
if (Test-Path $hooksDir) { Write-Host "  hooks/ directory present" -ForegroundColor Green }
if (Test-Path $stylesDir) { Write-Host "  styles/ directory present" -ForegroundColor Green }
if (Test-Path $publicDir) { Write-Host "  public/ static assets directory present" -ForegroundColor Green }

# 4. Authentication (NextAuth / Auth.js)
Write-Host "`n[Authentication]"
$authRoutes = Get-ChildItem $project -Recurse -Directory -Filter "auth" -ErrorAction SilentlyContinue
if ($authRoutes) {
    Write-Host "  Authentication routes found (likely NextAuth):" -ForegroundColor Green
    $authRoutes | ForEach-Object { Write-Host "    $($_.FullName.Replace($project, ''))" }
    # Check for auth config/options file
    $authConfig = Get-ChildItem $project -Recurse -File -Include "auth.ts","auth.js","next-auth.config.*" -ErrorAction SilentlyContinue
    if ($authConfig) { Write-Host "  Auth configuration file: $($authConfig.FullName.Replace($project, ''))" }
} else {
    Write-Host "  No dedicated auth directory found" -ForegroundColor Yellow
}

# 5. Payment (Stripe)
Write-Host "`n[Payment]"
$stripeFiles = Get-ChildItem $project -Recurse -File -Include "*stripe*","*checkout*" -ErrorAction SilentlyContinue
if ($stripeFiles) {
    Write-Host "  Stripe-related files found:" -ForegroundColor Green
    $stripeFiles | ForEach-Object { Write-Host "    $($_.FullName.Replace($project, ''))" }
} else {
    Write-Host "  No Stripe files detected" -ForegroundColor Yellow
}

# 6. Database
Write-Host "`n[Database]"
$prismaSchema = Join-Path $project "prisma/schema.prisma"
if (Test-Path $prismaSchema) {
    Write-Host "  Prisma schema detected (prisma/schema.prisma)" -ForegroundColor Green
} else {
    Write-Host "  No Prisma schema found"
}
$drizzleFiles = Get-ChildItem $project -Recurse -File -Filter "drizzle.config.*" -ErrorAction SilentlyContinue
if ($drizzleFiles) { Write-Host "  Drizzle ORM detected" -ForegroundColor Green }

# 7. CI/CD & deployment
Write-Host "`n[CI/CD & Deployment]"
$workflows = Get-ChildItem (Join-Path $project ".github/workflows") -File -ErrorAction SilentlyContinue
if ($workflows) {
    Write-Host "  GitHub Actions workflows found:" -ForegroundColor Green
    $workflows | ForEach-Object { Write-Host "    $($_.Name)" }
} else { Write-Host "  No GitHub Actions workflows" }

if (Test-Path (Join-Path $project "Dockerfile")) { Write-Host "  Dockerfile present" -ForegroundColor Green }
if (Test-Path (Join-Path $project "docker-compose.yml")) { Write-Host "  docker-compose.yml present" -ForegroundColor Green }

# 8. Quick statistics
Write-Host "`n[Project statistics]"
$allTsxJsx = Get-ChildItem $project -Recurse -File -Include "*.tsx","*.jsx","*.ts","*.js" -ErrorAction SilentlyContinue | Where-Object { $_.FullName -notmatch "node_modules|\.next" }
Write-Host "  Total .ts/.tsx/.js/.jsx files (excluding node_modules): $($allTsxJsx.Count)"
$totalFiles = Get-ChildItem $project -Recurse -File -ErrorAction SilentlyContinue | Where-Object { $_.FullName -notmatch "node_modules|\.next" }
Write-Host "  Total files (excluding node_modules/.next): $($totalFiles.Count)"

Write-Host "`n=============================================" -ForegroundColor Cyan
Write-Host "   Snapshot complete." -ForegroundColor Cyan
Write-Host "============================================="