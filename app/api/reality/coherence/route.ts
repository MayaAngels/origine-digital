// app/api/reality/coherence/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { calculateRealityCoherence } from '@/lib/intelligence/reality-coherence/coherence-calculator';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const score = calculateRealityCoherence(body);
    return NextResponse.json({ realityCoherence: score, grade: score >= 0.7 ? 'Coherent' : 'Unstable' });
}
