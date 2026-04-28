import { NextRequest, NextResponse } from 'next/server';
import { getAiDecision } from '@/lib/services/ai-mock';
import { storeMemory } from '@/lib/memory-file';
import fs from 'fs/promises';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'data', 'content', 'blog');

export async function POST(req: NextRequest) {
    try {
        const { topic, keywords = '', length = 800 } = await req.json();
        const prompt = `
You are an expert SEO content writer.
Write a blog post about "${topic}".
Keywords to include: ${keywords}.
Length: approximately ${length} words.
Include a title, introduction, subheadings, and a conclusion.
Add a meta description (max 160 chars).
Return as JSON with fields: title, content (HTML), metaDescription.
`;
        const article = await getAiDecision({ prompt });
        await fs.mkdir(BLOG_DIR, { recursive: true });
        const id = Date.now() + '-' + Math.random().toString(36).substring(2, 8);
        const articleData = { id, topic, keywords, ...article, createdAt: new Date().toISOString() };
        await fs.writeFile(path.join(BLOG_DIR, `${id}.json`), JSON.stringify(articleData, null, 2));
        await storeMemory(`Artigo gerado sobre ${topic}`, { type: 'blog', id });
        return NextResponse.json({ success: true, article: articleData });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    const files = await fs.readdir(BLOG_DIR);
    const articles = [];
    for (const f of files) {
        if (f.endsWith('.json')) {
            const data = JSON.parse(await fs.readFile(path.join(BLOG_DIR, f), 'utf-8'));
            articles.push(data);
        }
    }
    return NextResponse.json({ articles });
}
