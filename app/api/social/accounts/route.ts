// app/api/social/accounts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
const getClientByApiKey = async () => ({ id: '1', name: 'D', email: 'd@t.ie' });


async function getAccountsDir(clientId: string): Promise<string> {
    const dir = path.join(process.cwd(), 'data', 'clients_data', clientId, 'social');
    await fs.mkdir(dir, { recursive: true });
    return dir;
}

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const client = await getClientByApiKey(apiKey);
    if (!client) return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
    const dir = await getAccountsDir(client.id);
    const accountsFile = path.join(dir, 'accounts.json');
    let accounts: SocialAccount[] = [];
    try {
        accounts = JSON.parse(await fs.readFile(accountsFile, 'utf-8'));
    } catch {}
    return NextResponse.json({ accounts });
}

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const client = await getClientByApiKey(apiKey);
    if (!client) return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
    const { platform, name, username } = await req.json();
    if (!platform || !name || !username) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    const dir = await getAccountsDir(client.id);
    const accountsFile = path.join(dir, 'accounts.json');
    let accounts: SocialAccount[] = [];
    try { accounts = JSON.parse(await fs.readFile(accountsFile, 'utf-8')); } catch {}
    const newAccount: SocialAccount = {
        id: Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        platform,
        name,
        username,
        connected: true,
        createdAt: new Date().toISOString(),
    };
    accounts.push(newAccount);
    await fs.writeFile(accountsFile, JSON.stringify(accounts, null, 2));
    return NextResponse.json({ success: true, account: newAccount });
}
