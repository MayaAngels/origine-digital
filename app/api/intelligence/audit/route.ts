// app/api/intelligence/audit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { coherenceAuditor } from '@/lib/intelligence/coherence-auditor/coherence-auditor';

// GET — Full audit report
export async function GET() {
    const report = coherenceAuditor.generateReport();
    const trust = coherenceAuditor.getTrustScore();
    return NextResponse.json({ audit: report, trust });
}

// POST — Record a decision or outcome
export async function POST(req: NextRequest) {
    const body = await req.json();

    if (body.action === 'record_decision') {
        coherenceAuditor.recordDecision(body.decision);
        return NextResponse.json({
            success: true,
            message: 'Decision recorded',
            totalDecisions: coherenceAuditor.generateReport().totalDecisions,
        });
    }

    if (body.action === 'record_outcome') {
        coherenceAuditor.recordOutcome(body.decisionId, body.outcome);
        return NextResponse.json({ success: true, message: 'Outcome recorded' });
    }

    if (body.action === 'resolve') {
        coherenceAuditor.resolveContradiction(body.contradictionId, body.resolution);
        return NextResponse.json({ success: true, message: 'Contradiction resolved' });
    }

    if (body.action === 'detect_drift') {
        const alert = coherenceAuditor.detectDrift(body.metric, body.values, body.threshold || 0.1);
        return NextResponse.json({ driftAlert: alert });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
