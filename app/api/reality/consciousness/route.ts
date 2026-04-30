// app/api/reality/consciousness/route.ts
import { NextResponse } from 'next/server';
import { ConsciousnessField } from '@/lib/intelligence/consciousness-field/field-manager';

const field = new ConsciousnessField();

export async function GET() {
    try {
        const state = await field.update();
        return NextResponse.json(state);
    } catch (error) {
        // Fallback: return cached state
        return NextResponse.json(field.getState());
    }
}