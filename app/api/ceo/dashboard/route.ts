// app/api/ceo/dashboard/route.ts
import { NextResponse } from 'next/server';
import { aiCEO } from '@/lib/intelligence/ai-ceo/executive-orchestrator';
import { coherenceAuditor } from '@/lib/intelligence/coherence-auditor/coherence-auditor';

export async function GET() {
    const pending = aiCEO.getPendingDecisions();
    const autoApproved = aiCEO.getAutoApprovedDecisions();
    const summary = aiCEO.generateExecutiveSummary();
    const trust = coherenceAuditor.getTrustScore();
    const profile = aiCEO.getProfile();

    return NextResponse.json({
        pendingDecisions: pending,
        autoApprovedToday: autoApproved,
        executiveSummary: summary,
        trustScore: trust,
        digitalTwinProfile: profile,
        timestamp: new Date().toISOString(),
    });
}
