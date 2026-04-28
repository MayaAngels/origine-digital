// lib/services/stripe-mock.ts – Mock completo
export async function createCheckoutSession(email: string, amountCents: number) {
    console.log(`[STRIPE MOCK] Criando sessão para ${email}, valor ${amountCents/100} EUR`);
    return {
        id: 'cs_mock_' + Date.now(),
        url: 'http://localhost:3000/mock-checkout?id=mock_' + Date.now(),
        amount_cents: amountCents,
        customer_email: email,
    };
}

export async function handleWebhook(payload: any, signature: string) {
    console.log('[STRIPE MOCK] Webhook recebido (simulação)');
    return {
        type: 'checkout.session.completed',
        data: { object: { customer_email: payload?.data?.object?.customer_email || 'mock@example.com', amount_total: 2000 } }
    };
}

// Para subscrições
export async function createSubscription(customerId: string, priceId: string) {
    console.log(`[STRIPE MOCK] Criando subscrição para ${customerId} com price ${priceId}`);
    return {
        id: 'sub_mock_' + Date.now(),
        latest_invoice: { payment_intent: { client_secret: 'mock_secret_' + Date.now() } }
    };
}
