// lib/services/brevo-adapter.ts
export async function sendEmail(params: { to: string; subject: string; html?: string; text?: string }): Promise<boolean> {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) { console.error('[Brevo] No API key'); return false; }

    try {
        const res = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'api-key': apiKey },
            body: JSON.stringify({
                sender: { name: 'ORIGINE.DIGITAL', email: 'hello@originedigital.ie' },
                to: [{ email: params.to }],
                subject: params.subject,
                htmlContent: params.html || params.text || '',
            }),
        });
        return res.ok;
    } catch (e) {
        console.error('[Brevo] Error:', e);
        return false;
    }
}
