// app/api/reality/blackswan/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { detectBlackSwans, calculateTippingPoint } from '@/lib/intelligence/quantum-engine/black-swan-detector';

export async function POST(req: NextRequest) {
    const { historicalData, adoptionData } = await req.json();
    const swans = detectBlackSwans(historicalData || []);
    const tipping = calculateTippingPoint(adoptionData || []);
    return NextResponse.json({ blackSwans: swans, tippingPoint: tipping });
}
