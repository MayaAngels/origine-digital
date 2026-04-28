import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '../../lib/services/stripe-mock';
import { sendEmail } from '../../lib/services/brevo-mock';

export async function POST(req: NextRequest) {
    try {
        const { email, amount = 2000 } = await req.json();
        const session = await createCheckoutSession(email, amount);
        await sendEmail(email, 'Complete o pagamento', `Link: ${session.url}`);
        return NextResponse.json({ checkoutUrl: session.url, sessionId: session.id });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
