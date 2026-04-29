const Stripe = class { checkout: any; webhooks: any; constructor() { this.checkout = { sessions: { create: async () => ({ url: '/checkout' }) } }; this.webhooks = { constructEvent: () => ({ type: 'checkout.session.completed', data: { object: {} } }) }; } }; const stripe = new Stripe('fake');
// app/api/webhooks/stripe-connect/route.ts
import { NextRequest, NextResponse } from 'next/server';
// stripe stubbed above


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-02-24.acacia' });

export async function POST(req: NextRequest) {
    const payload = await req.text();
    const sig = req.headers.get('stripe-signature')!;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    try {
        const event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
        await handleWebhook(event);
        return NextResponse.json({ received: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
