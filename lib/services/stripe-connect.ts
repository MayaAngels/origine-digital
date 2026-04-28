// lib/services/stripe-connect.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-02-24.acacia' });

export async function createOrGetCustomer(clientId: string, email: string, name: string): Promise<string> {
    // Check if customer already exists (you may store stripeCustomerId in client record)
    // For simplicity, we create a new customer each time. In production, store customerId in client manager.
    const customer = await stripe.customers.create({
        email,
        name,
        metadata: { clientId },
    });
    return customer.id;
}

export async function createSubscription(customerId: string, priceId: string): Promise<Stripe.Subscription> {
    return await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
    });
}

export async function createCustomerPortalSession(customerId: string, returnUrl: string): Promise<string> {
    const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    });
    return session.url;
}

export async function handleWebhook(event: Stripe.Event): Promise<void> {
    switch (event.type) {
        case 'invoice.payment_succeeded':
            // Update client subscription status in your DB
            console.log('Payment succeeded', event.data.object);
            break;
        case 'customer.subscription.deleted':
            console.log('Subscription cancelled', event.data.object);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
}
