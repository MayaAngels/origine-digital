// app/api/pricing/plans/route.ts
import { NextResponse } from 'next/server';


export async function GET() {
    // Simula pequena latência (opcional, para loading state)
    await new Promise(resolve => setTimeout(resolve, 300));
    return NextResponse.json({ services });
}
