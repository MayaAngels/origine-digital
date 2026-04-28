import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { getClientByApiKey } from '@/lib/multi-tenant/client-manager';

const SOCIAL_DIR = path.join(process.cwd(), 'data', 'content', 'social');

async function getClientIdFromRequest(req: NextRequest): Promise<string | null> {
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (apiKey) {
        const client = await getClientByApiKey(apiKey);
        if (client) return client.id;
    }
    return null;
}

function getSocialDir(clientId: string | null): string {
    if (clientId) {
        return path.join(process.cwd(), 'data', 'clients_data', clientId, 'content', 'social');
    }
    return SOCIAL_DIR;
}

export async function POST(req: NextRequest) {
    try {
        const clientId = await getClientIdFromRequest(req);
        const dir = getSocialDir(clientId);
        await fs.mkdir(dir, { recursive: true });

        const { topic, platform = 'twitter', tone = 'professional' } = await req.json();
        // Simulação – substituir por IA depois
        const postText = `[MOCK] Post sobre "${topic}" para ${platform} (tom: ${tone}) gerado em ${new Date().toISOString()}`;
        const id = Date.now() + '-' + Math.random().toString(36).substring(2, 8);
        const postData = { id, topic, platform, tone, content: postText, createdAt: new Date().toISOString() };
        await fs.writeFile(path.join(dir, `${id}.json`), JSON.stringify(postData, null, 2));
        return NextResponse.json({ success: true, post: postData });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const clientId = await getClientIdFromRequest(req);
        const dir = getSocialDir(clientId);
        await fs.mkdir(dir, { recursive: true });
        const files = await fs.readdir(dir);
        const posts = [];
        for (const file of files) {
            if (file.endsWith('.json')) {
                const data = JSON.parse(await fs.readFile(path.join(dir, file), 'utf-8'));
                posts.push(data);
            }
        }
        posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        return NextResponse.json({ posts });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
