// app/api/client/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getClientByApiKey } from '../../../lib/multi-tenant/client-manager';

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const client = await getClientByApiKey(apiKey);
    if (!client) return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
    return NextResponse.json({ clientId: client.id, name: client.name, email: client.email });
}
