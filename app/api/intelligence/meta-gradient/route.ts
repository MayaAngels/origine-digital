// app/api/intelligence/meta-gradient/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MetaGradientController } from '@/lib/intelligence/q2-meta-gradient/meta-gradient';

const controller = new MetaGradientController();

export async function POST(req: NextRequest) {
    const { agentName, performanceDelta } = await req.json();
    const newLR = controller.adapt(agentName, performanceDelta);
    const confidence = controller.getConfidence(agentName);
    return NextResponse.json({ agentName, learningRate: newLR, confidence });
}

export async function GET() {
    const controllers = ['bandit', 'pricing', 'feed-ranker', 'broker'].map(name => ({
        name,
        learningRate: controller.getLearningRate(name),
        confidence: controller.getConfidence(name)
    }));
    return NextResponse.json({ controllers });
}
