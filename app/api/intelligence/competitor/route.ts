// app/api/intelligence/competitor/route.ts
import { NextResponse } from 'next/server';
import { runACIMCycle } from '../../../lib/intelligence/acim/loop';

export async function POST() {
    // Kick off cycle asynchronously
    runACIMCycle().catch(console.error);
    return NextResponse.json({ status: 'ACIM cycle triggered' });
}
