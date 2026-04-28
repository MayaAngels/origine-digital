// app/api/invoices/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getClientByApiKey } from '@/lib/multi-tenant/client-manager';

// GET /api/invoices — List all invoices for the authenticated client
export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const client = await getClientByApiKey(apiKey);
    if (!client) return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });

    // In production, fetch from database
    const invoices = [
        {
            id: `inv_${Date.now()}_001`,
            clientId: client.id,
            amount: 49.00,
            currency: 'EUR',
            status: 'paid',
            description: 'Starter Plan — Monthly Subscription',
            issuedAt: new Date().toISOString(),
            paidAt: new Date().toISOString(),
            downloadUrl: `/api/invoices/download?id=inv_${Date.now()}_001`,
        }
    ];

    return NextResponse.json({ invoices });
}

// POST /api/invoices — Generate a new invoice
export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const client = await getClientByApiKey(apiKey);
    if (!client) return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });

    const { amount, description, currency = 'EUR' } = await req.json();

    const invoice = {
        id: `inv_${Date.now()}`,
        clientId: client.id,
        clientName: client.name,
        clientEmail: client.email,
        amount,
        currency,
        description,
        status: 'issued',
        issuedAt: new Date().toISOString(),
        vatRate: 23, // Irish VAT
        vatAmount: amount * 0.23,
        totalAmount: amount * 1.23,
        downloadUrl: `/api/invoices/download?id=inv_${Date.now()}`,
    };

    return NextResponse.json({ success: true, invoice });
}

// GET /api/invoices/download — Download invoice PDF
export async function generateInvoicePDF(invoice: any): Promise<Buffer> {
    // In production, use a PDF library like pdf-lib or puppeteer
    // For now, return a simple text representation
    const text = `
INVOICE
=======
Invoice ID: ${invoice.id}
Date: ${invoice.issuedAt}
Client: ${invoice.clientName}
Email: ${invoice.clientEmail}

Description: ${invoice.description}
Amount: ${invoice.currency} ${invoice.amount.toFixed(2)}
VAT (23%): ${invoice.currency} ${(invoice.amount * 0.23).toFixed(2)}
Total: ${invoice.currency} ${(invoice.amount * 1.23).toFixed(2)}

ORIGINE.DIGITAL LTD
Registered in Ireland
VAT: IE1234567
    `;
    return Buffer.from(text);
}
