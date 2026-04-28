// app/api/stripe-connect/create-subscription/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createOrGetCustomer, createSubscription } from '@/lib/services/stripe-connect';
import { getClientByApiKey } from '@/lib/multi-tenant/client-manager';

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
        if (!apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        const client = await getClientByApiKey(apiKey);
        if (!client) return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });

        const { priceId } = await req.json();
        if (!priceId) return NextResponse.json({ error: 'Missing priceId' }, { status: 400 });

        const customerId = await createOrGetCustomer(client.id, client.email, client.name);
        const subscription = await createSubscription(customerId, priceId);
        return NextResponse.json({
            subscriptionId: subscription.id,
            clientSecret: subscription.latest_invoice?.payment_intent?.client_secret,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
