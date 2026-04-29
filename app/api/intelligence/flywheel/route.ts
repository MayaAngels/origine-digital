// app/api/intelligence/flywheel/route.ts
import { NextRequest, NextResponse } from 'next/server';
const IntelligenceFlywheel = class { async cycle() { return {} } };

const flywheel = new IntelligenceFlywheel();

export async function POST(req: NextRequest) {
    const { revenue, cost } = await req.json();
    const cycle = await flywheel.cycle(revenue, cost);
    return NextResponse.json({ success: true, cycle });
}

export async function GET() {
    return NextResponse.json(flywheel.getMetrics());
}
