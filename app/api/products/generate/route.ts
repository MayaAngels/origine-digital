import { NextRequest, NextResponse } from 'next/server';
import { generateProductIdea, createProduct } from '../../../lib/product-generator';
const getClientByApiKey = async () => ({ id: '1', name: 'D', email: 'd@t.ie' });

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const client = await getClientByApiKey(apiKey);
    if (!client) return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
    const { topic } = await req.json();
    const idea = await generateProductIdea(client.id, topic);
    const product = await createProduct(client.id, idea);
    return NextResponse.json({ success: true, product });
}
