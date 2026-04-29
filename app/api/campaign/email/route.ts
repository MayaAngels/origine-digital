import { NextRequest, NextResponse } from 'next/server';
const getAiDecision = async () => ({ title: 'T', content: '<p>T</p>' });
const sendEmail = async () => true;
const storeMemory = async () => {};
import fs from 'fs/promises';
import path from 'path';

const CAMPAIGN_DIR = path.join(process.cwd(), 'data', 'campaigns');

export async function POST(req: NextRequest) {
    try {
        const { to, type = 'abandoned_cart', context = {} } = await req.json();
        const prompt = `
You are an email marketing specialist.
Write a ${type} email for a customer.
Context: ${JSON.stringify(context)}.
Subject line (max 60 chars).
Body (HTML) with a clear CTA.
Return JSON: { subject, bodyHtml }.
`;
        const { subject, bodyHtml } = await getAiDecision({ prompt });
        await sendEmail(to, subject, bodyHtml);
        await fs.mkdir(CAMPAIGN_DIR, { recursive: true });
        const id = Date.now() + '-' + Math.random().toString(36).substring(2, 8);
        const campaignData = { id, to, type, subject, sentAt: new Date().toISOString() };
        await fs.writeFile(path.join(CAMPAIGN_DIR, `${id}.json`), JSON.stringify(campaignData, null, 2));
        await storeMemory(`Campanha de email ${type} enviada para ${to}`, { type: 'campaign', id });
        return NextResponse.json({ success: true, campaignId: id });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    const files = await fs.readdir(CAMPAIGN_DIR);
    const campaigns = [];
    for (const f of files) {
        if (f.endsWith('.json')) {
            const data = JSON.parse(await fs.readFile(path.join(CAMPAIGN_DIR, f), 'utf-8'));
            campaigns.push(data);
        }
    }
    return NextResponse.json({ campaigns });
}
