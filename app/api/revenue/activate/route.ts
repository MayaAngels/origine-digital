// app/api/revenue/activate/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Product catalog — ready to sell
const PRODUCTS = [
    {
        id: 'ai-blueprint-ireland',
        title: 'AI Business Automation Blueprint — Ireland Edition',
        description: 'Complete guide to automating Irish SMEs with AI. Includes step-by-step workflows, ready-to-use templates, and WhatsApp automation scripts.',
        price: 49.00,
        currency: 'EUR',
        category: 'Digital Product',
        tags: ['AI', 'Business', 'Ireland', 'Automation'],
        coverImage: '/images/products/ai-blueprint.svg',
        deliverables: ['PDF Guide (147 pages)', '3 Funnel Templates', 'WhatsApp Scripts', 'Implementation Checklist'],
        realityScore: 0.87,
        author: 'ORIGINE.DIGITAL',
    },
    {
        id: 'entrepreneur-toolkit',
        title: 'The Irish Entrepreneur\'s AI Toolkit',
        description: '50 AI prompts, 10 templates, and a workflow guide tailored for Irish business owners.',
        price: 29.00,
        currency: 'EUR',
        category: 'Digital Product',
        tags: ['Entrepreneur', 'Templates', 'Ireland'],
        coverImage: '/images/products/toolkit.svg',
        deliverables: ['50 AI Prompts', '10 Templates', 'Workflow Guide'],
        realityScore: 0.64,
        author: 'ORIGINE.DIGITAL',
    },
    {
        id: 'social-calendar-2026',
        title: 'Social Media Content Calendar 2026',
        description: '365-day social media calendar with AI-generated posts, hashtag guides, and platform-specific templates.',
        price: 27.00,
        currency: 'EUR',
        category: 'Digital Product',
        tags: ['Social Media', 'Content', 'Marketing'],
        coverImage: '/images/products/calendar.svg',
        deliverables: ['365-Day Calendar', 'Post Templates', 'Hashtag Guide', 'Platform Guides'],
        realityScore: 0.91,
        author: 'ORIGINE.DIGITAL',
    },
    {
        id: 'freelancer-tax-kit',
        title: 'Freelancer Tax & Revenue Survival Kit',
        description: 'Tax optimization for Irish freelancers. Expense tracker, invoice templates, and Revenue calculator.',
        price: 39.00,
        currency: 'EUR',
        category: 'Digital Product',
        tags: ['Freelance', 'Tax', 'Finance', 'Ireland'],
        coverImage: '/images/products/tax-kit.svg',
        deliverables: ['Tax Guide', 'Expense Tracker', 'Invoice Templates', 'Revenue Calculator'],
        realityScore: 0.83,
        author: 'ORIGINE.DIGITAL',
    },
    {
        id: 'student-income-kit',
        title: 'Student Survival & Income Kit',
        description: 'Income generation guide for Irish students. Budget templates, freelance starter pack, and side-hustle ideas.',
        price: 19.00,
        currency: 'EUR',
        category: 'Digital Product',
        tags: ['Student', 'Income', 'Budget', 'Ireland'],
        coverImage: '/images/products/student-kit.svg',
        deliverables: ['Income Ideas Guide', 'Budget Template', 'Freelance Starter Pack'],
        realityScore: 0.38,
        author: 'ORIGINE.DIGITAL',
    },
];

// GET — List all available products
export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const category = url.searchParams.get('category');
    const sort = url.searchParams.get('sort') || 'reality';

    let products = [...PRODUCTS];

    if (category) {
        products = products.filter(p => p.category === category);
    }

    if (sort === 'reality') {
        products.sort((a, b) => b.realityScore - a.realityScore);
    } else if (sort === 'price_asc') {
        products.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
        products.sort((a, b) => b.price - a.price);
    }

    return NextResponse.json({
        products,
        total: products.length,
        timestamp: new Date().toISOString(),
    });
}

// POST — Activate revenue loop (generate + price + publish)
export async function POST(req: NextRequest) {
    const body = await req.json();
    const productId = body.productId || PRODUCTS[0].id;

    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // In production, this would:
    // 1. Generate the actual product files
    // 2. Price it using Bayesian pricing engine
    // 3. Post it to the social feed
    // 4. Trigger email campaigns
    // 5. Record the decision in the Coherence Auditor

    // For now, return the product ready for Stripe checkout
    const checkoutUrl = `/checkout?product=${product.id}&price=${product.price}&title=${encodeURIComponent(product.title)}`;

    return NextResponse.json({
        success: true,
        product,
        checkoutUrl,
        message: `${product.title} is ready to sell!`,
        nextSteps: [
            '1. Visit the checkout URL to test the purchase flow',
            '2. Connect Stripe account to receive payments',
            '3. Share the product on social media',
            '4. The system will autonomously optimize pricing and promotion',
        ],
    });
}