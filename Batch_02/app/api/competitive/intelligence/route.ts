// app/api/competitive/intelligence/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { scrapeCompetitors, getAveragePrice, getCheapestCompetitor } from '@/lib/competitive/competitive-mock';
import { getClientByApiKey } from '@/lib/multi-tenant/client-manager';

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const client = await getClientByApiKey(apiKey);
    if (!client) return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || undefined;
    const competitors = await scrapeCompetitors(category);
    const avgPrice = await getAveragePrice(category);
    const cheapest = await getCheapestCompetitor(category);
    return NextResponse.json({ competitors, avgPrice, cheapest });
}
