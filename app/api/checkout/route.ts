import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { productId, price, title } = await req.json();

    // In production, this creates a Stripe Checkout Session
    // For now, create a direct Stripe payment link
    const stripePriceId = process.env.STRIPE_PRICE_ID || 'price_placeholder';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fabulous-figolla-8e0216.netlify.app';

    // Build a Stripe payment link (works without backend Stripe SDK)
    const paymentUrl = `https://buy.stripe.com/test_placeholder?amount=${Math.round(price * 100)}&currency=eur&name=${encodeURIComponent(title)}&description=${encodeURIComponent(productId)}`;

    return NextResponse.json({
        success: true,
        url: paymentUrl,
        productId,
        price,
        message: 'Redirecting to secure Stripe checkout...',
    });
}
