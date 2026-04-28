// app/api/stripe-connect/portal/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createCustomerPortalSession } from '../../../lib/services/stripe-connect';
import { getClientByApiKey } from '../../../lib/multi-tenant/client-manager';

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
        if (!apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        const client = await getClientByApiKey(apiKey);
        if (!client) return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });

        // You need to store stripeCustomerId in client record – this example uses a mock
        // In reality, fetch the customerId from your database.
        const customerId = 'cus_xxx'; // placeholder
        const portalUrl = await createCustomerPortalSession(customerId, `${process.env.BASE_URL}/client/dashboard`);
        return NextResponse.json({ portalUrl });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
