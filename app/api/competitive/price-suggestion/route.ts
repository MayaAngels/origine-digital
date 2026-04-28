// app/api/competitive/price-suggestion/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAveragePrice, getCheapestCompetitor, scrapeCompetitors } from '@/lib/competitive/competitive-mock';
import { getMarketTrends } from '@/lib/market-trends';
import { getClientByApiKey } from '@/lib/multi-tenant/client-manager';

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const client = await getClientByApiKey(apiKey);
    if (!client) return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
    const { ourProductCost, category, strategy = 'competitive' } = await req.json();
    const avgPrice = await getAveragePrice(category);
    const cheapest = await getCheapestCompetitor(category);
    const trends = await getMarketTrends();
    const trendScore = trends.find(t => t.category === category)?.score || 50;
    let suggestedPrice = 0;
    switch (strategy) {
        case 'competitive':
            suggestedPrice = avgPrice * 0.95; // 5% abaixo da média
            break;
        case 'undercut':
            suggestedPrice = cheapest ? cheapest.price * 0.9 : avgPrice * 0.85;
            break;
        case 'premium':
            suggestedPrice = avgPrice * 1.2;
            break;
        default:
            suggestedPrice = avgPrice;
    }
    // Ajustar por tendência (maior procura = preço mais alto)
    if (trendScore > 70) suggestedPrice *= 1.1;
    if (trendScore < 30) suggestedPrice *= 0.9;
    suggestedPrice = Math.round(suggestedPrice);
    return NextResponse.json({
        suggestedPrice,
        avgCompetitorPrice: avgPrice,
        cheapestCompetitor: cheapest,
        trendScore,
        strategy,
    });
}
