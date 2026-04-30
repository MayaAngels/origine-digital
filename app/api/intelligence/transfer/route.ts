// app/api/intelligence/transfer/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { crossDomainEngine } from '@/lib/intelligence/cross-domain/knowledge-synthesis';

// GET — Find similar markets and get transfer insights
export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const marketId = url.searchParams.get('market') || 'irish-salons';
    const threshold = parseFloat(url.searchParams.get('threshold') || '0.7');

    const similar = crossDomainEngine.findSimilarMarkets(marketId, threshold);
    const stats = crossDomainEngine.getTransferStats();
    const knowledge = crossDomainEngine.exportKnowledge();

    return NextResponse.json({
        targetMarket: marketId,
        similarMarkets: similar,
        transferStats: stats,
        knowledgeSummary: knowledge,
        timestamp: new Date().toISOString(),
    });
}

// POST — Register a new market or record a transfer outcome
export async function POST(req: NextRequest) {
    const body = await req.json();

    // Register a new market
    if (body.action === 'register') {
        crossDomainEngine.registerMarket(body.market);
        return NextResponse.json({
            success: true,
            message: `Market '${body.market.marketId}' registered`,
            totalMarkets: crossDomainEngine.exportKnowledge().markets,
        });
    }

    // Record a transfer outcome
    if (body.action === 'feedback') {
        crossDomainEngine.recordTransferOutcome(
            body.from,
            body.to,
            body.pattern,
            body.actualLift
        );
        return NextResponse.json({
            success: true,
            message: 'Transfer outcome recorded',
            stats: crossDomainEngine.getTransferStats(),
        });
    }

    return NextResponse.json({ error: 'Invalid action. Use "register" or "feedback".' }, { status: 400 });
}
