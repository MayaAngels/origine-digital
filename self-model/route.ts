// app/api/intelligence/self-model/route.ts
import { NextResponse } from 'next/server';
import { selfModel } from '@/lib/intelligence/self-modeling/self-model';

export async function GET() {
    return NextResponse.json({
        components: selfModel.getAllComponents(),
        health: selfModel.getHealth(),
        timestamp: new Date().toISOString(),
    });
}
