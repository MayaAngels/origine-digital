// app/api/client-config/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { getClientByApiKey } from '@/lib/multi-tenant/client-manager';

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const client = await getClientByApiKey(apiKey);
    if (!client) return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
    const configPath = path.join(process.cwd(), 'data', 'clients_data', client.id, 'config.json');
    let config = {};
    try { config = JSON.parse(await fs.readFile(configPath, 'utf-8')); } catch {}
    return NextResponse.json({ config });
}

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const client = await getClientByApiKey(apiKey);
    if (!client) return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
    const newConfig = await req.json();
    const configPath = path.join(process.cwd(), 'data', 'clients_data', client.id, 'config.json');
    await fs.writeFile(configPath, JSON.stringify(newConfig, null, 2));
    return NextResponse.json({ success: true, config: newConfig });
}
