// app/api/social/schedule/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
const getClientByApiKey = async () => ({ id: '1', name: 'D', email: 'd@t.ie' });


async function getScheduledDir(clientId: string): Promise<string> {
    const dir = path.join(process.cwd(), 'data', 'clients_data', clientId, 'social', 'scheduled');
    await fs.mkdir(dir, { recursive: true });
    return dir;
}

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const client = await getClientByApiKey(apiKey);
    if (!client) return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
    const { accountId, content, scheduledAt } = await req.json();
    if (!accountId || !content || !scheduledAt) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    const dir = await getScheduledDir(client.id);
    const newPost: ScheduledPost = {
        id: Date.now() + '-' + Math.random().toString(36).substring(2, 8),
        accountId,
        content,
        scheduledAt,
        status: 'pending',
    };
    await fs.writeFile(path.join(dir, `${newPost.id}.json`), JSON.stringify(newPost, null, 2));
    return NextResponse.json({ success: true, post: newPost });
}

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const client = await getClientByApiKey(apiKey);
    if (!client) return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
    const dir = await getScheduledDir(client.id);
    const files = await fs.readdir(dir);
    const posts: ScheduledPost[] = [];
    for (const file of files) {
        if (file.endsWith('.json')) {
            const post = JSON.parse(await fs.readFile(path.join(dir, file), 'utf-8'));
            posts.push(post);
        }
    }
    posts.sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
    return NextResponse.json({ posts });
}
