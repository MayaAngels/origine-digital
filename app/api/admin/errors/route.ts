// app/api/admin/errors/route.ts
import { NextResponse } from 'next/server';
const ErrorTracker = { capture: async () => 'err_001', getRecentErrors: async () => [], getCriticalAlert: async () => null, clearCriticalAlert: async () => {} };

export async function GET() {
    const errors = await ErrorTracker.getRecentErrors(50);
    const critical = await ErrorTracker.getCriticalAlert();
    return NextResponse.json({
        recentErrors: errors,
        criticalAlert: critical,
        totalErrors: errors.length,
    });
}

export async function DELETE() {
    await ErrorTracker.clearCriticalAlert();
    return NextResponse.json({ success: true });
}
