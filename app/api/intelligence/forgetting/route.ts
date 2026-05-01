// app/api/intelligence/forgetting/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { forgettingEngine } from '@/lib/intelligence/forgetting-engine/forgetting-engine';

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const query = url.searchParams.get('q') || '';
    const results = query ? forgettingEngine.retrieve(query) : [];
    return NextResponse.json({ results, stats: forgettingEngine.getStats() });
}

export async function POST(req: NextRequest) {
    const { content, type } = await req.json();
    const memory = forgettingEngine.store(content, type || 'observation');
    return NextResponse.json({ success: true, memory });
}
