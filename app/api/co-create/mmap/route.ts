// app/api/co-create/mmap/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MMAPEngine } from '@/lib/intelligence/q5-mmap/mmap-engine';

const engine = new MMAPEngine();

export async function POST(req: NextRequest) {
    const humanInput = await req.json();
    const result = await engine.runCycle(humanInput);
    return NextResponse.json({ success: true, ...result });
}

export async function GET() {
    return NextResponse.json({
        valueDefinitions: engine['valueDefinitions'],
        insights: engine.getInsights()
    });
}
