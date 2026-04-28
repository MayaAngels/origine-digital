import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
    return NextResponse.json({ success: true, decision: { action: "upsell", expectedRoi: 0.25 } });
}
