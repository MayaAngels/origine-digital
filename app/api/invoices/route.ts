import { NextRequest, NextResponse } from 'next/server';

const getClientByApiKey = async (key: string) => {
    return { id: 'demo', name: 'Demo Client', email: 'demo@test.ie' };
};

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const client = await getClientByApiKey(apiKey);
    if (!client) return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
    const invoices = [{ id: 'inv_001', clientId: client.id, amount: 49.00, currency: 'EUR', status: 'paid', description: 'Starter Plan', issuedAt: new Date().toISOString() }];
    return NextResponse.json({ invoices });
}

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const client = await getClientByApiKey(apiKey);
    if (!client) return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
    const { amount, description } = await req.json();
    const invoice = { id: `inv_${Date.now()}`, clientId: client.id, amount, description, status: 'issued', issuedAt: new Date().toISOString() };
    return NextResponse.json({ success: true, invoice });
}