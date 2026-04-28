import { NextRequest, NextResponse } from 'next/server';
import { registerClient } from '../../../lib/multi-tenant/client-manager';

export async function POST(req: NextRequest) {
    try {
        const { name, email } = await req.json();
        if (!name || !email) {
            return NextResponse.json({ error: 'Missing name or email' }, { status: 400 });
        }
        const client = await registerClient(name, email);
        return NextResponse.json({ success: true, client });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
