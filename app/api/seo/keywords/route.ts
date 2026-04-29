import { NextRequest, NextResponse } from 'next/server';
const getAiDecision = async () => ({ title: 'T', content: '<p>T</p>' });

export async function POST(req: NextRequest) {
    try {
        const { seedKeyword, competitors = [] } = await req.json();
        const prompt = `
You are an SEO expert.
Given the seed keyword "${seedKeyword}" and competitors: ${competitors.join(', ') || 'none'},
suggest 10 related long-tail keywords with high commercial intent.
Return as JSON array: ["keyword1", "keyword2", ...].
`;
        const response = await getAiDecision({ prompt });
        const keywords = Array.isArray(response) ? response : response.keywords || [];
        return NextResponse.json({ success: true, keywords });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
