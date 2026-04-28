// lib/services/brevo-mock.ts – Mock completo
export async function sendEmail(to: string, subject: string, htmlContent: string) {
    console.log(`[BREVO MOCK] Enviando email para ${to}: ${subject}`);
    return { success: true, messageId: 'mock_' + Date.now() };
}

export async function sendSms(to: string, message: string) {
    console.log(`[BREVO MOCK] Enviando SMS para ${to}: ${message}`);
    return { success: true };
}
