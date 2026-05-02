// app/api/marketplace/products/route.ts
import { NextRequest, NextResponse } from 'next/server';

const sampleProducts = [
    {
        id: "sample-1",
        title: "AI Business Automation Guide",
        description: "Complete guide to automating your business with AI tools. Includes prompts, workflows, and templates.",
        price: 49,
        realityScore: 0.92,
        author: "ORIGINE AI",
        likes: 234,
        imageUrl: null
    },
    {
        id: "sample-2",
        title: "Social Media Content Calendar 2026",
        description: "365 days of ready-to-post content. Includes hashtags, captions, and best times to post.",
        price: 27,
        realityScore: 0.88,
        author: "ORIGINE AI",
        likes: 189,
        imageUrl: null
    },
    {
        id: "sample-3",
        title: "Freelancer Tax Survival Kit",
        description: "Everything Irish freelancers need for taxes. Templates, calculators, and deadline trackers.",
        price: 39,
        realityScore: 0.95,
        author: "ORIGINE AI",
        likes: 312,
        imageUrl: null
    },
    {
        id: "sample-4",
        title: "The Irish Entrepreneur's Toolkit",
        description: "AI-powered tools specifically for Irish small business owners. Grants, compliance, growth.",
        price: 59,
        realityScore: 0.91,
        author: "ORIGINE AI",
        likes: 456,
        imageUrl: null
    }
];

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '0');
    const limit = 5;
    const start = page * limit;
    const paginated = sampleProducts.slice(start, start + limit);
    
    return NextResponse.json({
        products: paginated,
        hasMore: start + limit < sampleProducts.length
    });
}

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        const product = await req.json();
        const newProduct = {
            id: `seller_${Date.now()}`,
            ...product,
            sales: 0,
            likes: 0,
            createdAt: new Date().toISOString()
        };
        
        sampleProducts.unshift(newProduct);
        return NextResponse.json({ success: true, product: newProduct });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
