// app/api/learning/feedback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { recordFeedback, getPastFeedback } from '../../../lib/learning/learning-mock';
import { getClientByApiKey } from '../../../lib/multi-tenant/client-manager';

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const client = await getClientByApiKey(apiKey);
    if (!client) return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
    const { action, context, outcome } = await req.json();
    if (!action || outcome === undefined) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    await recordFeedback(action, context, outcome);
    return NextResponse.json({ success: true });
}

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const client = await getClientByApiKey(apiKey);
    if (!client) return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
    const feedback = await getPastFeedback(100);
    return NextResponse.json({ feedback });
}
