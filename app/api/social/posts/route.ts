// app/api/social/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
const getClientByApiKey = async () => ({ id: '1', name: 'D', email: 'd@t.ie' });

async function getPublishedDir(clientId: string): Promise<string> {
    const dir = path.join(process.cwd(), 'data', 'clients_data', clientId, 'social', 'published');
    await fs.mkdir(dir, { recursive: true });
    return dir;
}

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const client = await getClientByApiKey(apiKey);
    if (!client) return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
    const dir = await getPublishedDir(client.id);
    const files = await fs.readdir(dir);
    const posts = [];
    for (const file of files) {
        if (file.endsWith('.json')) {
            const post = JSON.parse(await fs.readFile(path.join(dir, file), 'utf-8'));
            posts.push(post);
        }
    }
    posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    return NextResponse.json({ posts });
}
