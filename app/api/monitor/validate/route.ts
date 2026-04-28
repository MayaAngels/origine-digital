import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
    const body = await req.json();
    if (body.action?.type === 'charge' && body.context?.result?.confirmed === false) {
        return NextResponse.json({ allowed: false, reasons: ['Cobrança sem resultado confirmado'] }, { status: 403 });
    }
    return NextResponse.json({ allowed: true, reasons: [] });
}
