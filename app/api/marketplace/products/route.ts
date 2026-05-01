// app/api/marketplace/products/route.ts
import { NextRequest, NextResponse } from 'next/server';

// In-memory store for seller products (in production, use database)
const sellerProducts: any[] = [];

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        const product = await req.json();
        const token = authHeader.substring(7);
        const decoded = Buffer.from(token, 'base64').toString();
        const [userId] = decoded.split(':');
        
        const newProduct = {
            id: `seller_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            sellerId: userId,
            ...product,
            sales: 0,
            createdAt: new Date().toISOString(),
            status: 'active'
        };
        
        sellerProducts.push(newProduct);
        
        return NextResponse.json({ success: true, product: newProduct });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    // Return all active marketplace products
    const activeProducts = sellerProducts.filter(p => p.status === 'active');
    return NextResponse.json({ products: activeProducts });
}