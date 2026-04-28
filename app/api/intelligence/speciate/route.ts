// app/api/intelligence/speciate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { StrategySpeciationEngine } from '../../../lib/intelligence/q4-speciation/strategy-speciation';

const engine = new StrategySpeciationEngine();

export async function POST(req: NextRequest) {
    const { parentId } = await req.json();
    const newStrategy = await engine.evolveStrategy(parentId || 'default');
    return NextResponse.json({ success: true, strategy: newStrategy, archive: engine.getArchive().length });
}

export async function GET() {
    return NextResponse.json({
        archive: engine.getArchive(),
        mostNovel: engine.getMostNovel(),
        totalStrategies: engine.getArchive().length
    });
}
