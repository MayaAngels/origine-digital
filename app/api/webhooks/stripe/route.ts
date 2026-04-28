import { NextRequest, NextResponse } from 'next/server';
import { handleWebhook } from '@/lib/services/stripe-mock';
import { sendEmail } from '@/lib/services/brevo-mock';

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();
        const signature = req.headers.get('stripe-signature') || 'mock';
        const event = await handleWebhook(payload, signature);
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            await sendEmail(session.customer_email, 'Pagamento confirmado', `Obrigado! Valor: ${session.amount_total/100} EUR`);
        }
        return NextResponse.json({ received: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
