// app/api/ceo/approve/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { aiCEO } from '@/lib/intelligence/ai-ceo/executive-orchestrator';

export async function POST(req: NextRequest) {
    const { decisionId, approved, feedback } = await req.json();
    const result = aiCEO.processHumanFeedback(decisionId, approved, feedback);
    if (!result) {
        return NextResponse.json({ error: 'Decision not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, decision: result });
}
