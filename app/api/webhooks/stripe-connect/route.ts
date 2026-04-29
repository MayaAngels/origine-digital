import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_fake', {
    apiVersion: '2025-02-24.acacia' as any,
});

export async function POST(req: NextRequest) {
    const payload = await req.text();
    const sig = req.headers.get('stripe-signature') || '';
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_fake';

    try {
        const event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
        console.log('Stripe event:', event.type);
        return NextResponse.json({ received: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}