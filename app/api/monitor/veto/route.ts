import { NextRequest, NextResponse } from 'next/server';
import { vetoViolation } from '../../../lib/constitutional-monitor';
export async function POST(req) {
    try {
        const { violationId } = await req.json();
        const success = await vetoViolation(violationId);
        return NextResponse.json({ success });
    } catch(error) { return NextResponse.json({ error: error.message }, { status: 500 }); }
}
