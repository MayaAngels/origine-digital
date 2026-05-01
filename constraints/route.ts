// app/api/intelligence/constraints/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { constraintHierarchy } from '@/lib/intelligence/constraint-hierarchy/constraint-hierarchy';

export async function POST(req: NextRequest) {
    const { action, context } = await req.json();
    const verdict = constraintHierarchy.validate(action, context);
    return NextResponse.json(verdict);
}
