
EXECUTION PROTOCOL
Build Order (MANDATORY)
Phase 1 - Foundation:
00-create-project-v2.ps1
01-create-structure-v2.ps1
02-create-base-files-v2.ps1

Phase 2 - Contracts:
10-create-shared-types.ps1
11-create-shared-constants.ps1

Phase 3 - Group Builds (one at a time):
20-build-group1-core-ux.ps1
21-build-group2-products.ps1
22-build-group3-services.ps1
23-build-group4-done-for-you.ps1
24-build-group5-checkout.ps1
25-build-group6-dashboard.ps1
26-build-group7-admin.ps1
27-build-group8-events-crm.ps1
28-build-group9-content-seo.ps1

Phase 4 - Verification:
90-verify-structure.ps1
91-verify-protected-files.ps1
92-verify-types.ps1
93-verify-routes.ps1

Phase 5 - Integration:
95-integrate-navigation.ps1
96-integrate-admin-shell.ps1
97-integrate-dashboard-shell.ps1
98-finalize-build.ps1

Rules
DO NOT proceed if a script fails

Each script must be re-runnable (idempotent)

No destructive overwrites without confirmation