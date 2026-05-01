// app/api/ceo/partners/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PartnerKnowledgeBase } from '@/lib/intelligence/partner-knowledge/partner-knowledge';

const knowledgeBase = new PartnerKnowledgeBase();

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const domain = url.searchParams.get('domain');
    const insights = domain ? knowledgeBase.getRelevantInsights(domain) : [];
    const topPartners = knowledgeBase.getTopPartners();
    return NextResponse.json({ insights, topPartners });
}

export async function POST(req: NextRequest) {
    const { partnerName, domain, insight } = await req.json();
    knowledgeBase.addInsight(partnerName, domain, insight);
    return NextResponse.json({ success: true, message: 'Partner insight recorded' });
}
