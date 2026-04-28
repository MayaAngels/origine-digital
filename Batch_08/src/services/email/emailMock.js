// src/services/email/emailMock.js
export function createEmailSequence({ productId, name, template }) {
    return {
        id: email- + Date.now(),
        productId,
        name,
        status: 'DRAFT',
        stats: { sent: 0, opened: 0, clicked: 0, converted: 0 },
        createdAt: new Date().toISOString()
    };
}
export async function sendEmailCampaign(sequence) {
    console.log([EMAIL MOCK] A enviar sequência: +sequence.name);
    sequence.status = 'SENDING';
    sequence.stats.sent += Math.floor(Math.random() * 500) + 50;
    sequence.stats.opened += Math.floor(sequence.stats.sent * 0.25);
    sequence.stats.clicked += Math.floor(sequence.stats.opened * 0.4);
    sequence.stats.converted += Math.floor(sequence.stats.clicked * 0.15);
    return { success: true, stats: sequence.stats };
}
