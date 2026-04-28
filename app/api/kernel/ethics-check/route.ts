// app/api/kernel/ethics-check/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { computeEthicalVector } from '../../../lib/intelligence-kernel/asmi/ethical-vector';
import { estimateATE } from '../../../lib/intelligence-kernel/asmi/causal-oracle';

export async function POST(req: NextRequest) {
    const { action, context } = await req.json();
    const ethical = computeEthicalVector(action, context);
    const causal = estimateATE(action?.type || 'default');
    return NextResponse.json({
        ethical,
        causal,
        message: ethical.allowed && causal.allowed ? 'Action allowed' : 'Action blocked',
    });
}
