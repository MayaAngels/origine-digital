// lib/intelligence-kernel/asmi/ethical-vector.ts
export type Dimension = 'dignity' | 'culture' | 'society' | 'environment' | 'fairness' | 'privacy';

// Learned weights (simplified; in production, they'd be updated by Constitutional Assembly)
const defaultWeights: Record<Dimension, number> = {
    dignity: 0.25,
    culture: 0.1,
    society: 0.15,
    environment: 0.2,
    fairness: 0.2,
    privacy: 0.1,
};

// Simple evaluators (mock neural – real ones would be small models)
function evaluateDimension(dim: Dimension, action: any, context?: any): number {
    // Placeholder scoring – can be replaced with real NLP/heuristic
    const scores: Record<string, number> = {
        'create-product': 0.9,
        'send-email': 0.8,
        'publish-post': 0.85,
        'marketplace-buy': 0.95,
        'adjust-pricing': 0.7,
        'default': 0.75,
    };
    // Use action.type if present, else default
    const aType = action?.type || action?.action || 'default';
    const base = scores[aType] ?? scores['default'];
    // Slight dim variation
    const dimOffsets: Partial<Record<Dimension, number>> = {
        privacy: action?.personalDataUsed ? 0.6 : 0.95,
        environment: action?.carbonFootprint ? 0.5 : 0.9,
    };
    const offset = dimOffsets[dim] ?? 1.0;
    return Math.min(1, base * offset);
}

export function computeEthicalVector(action: any, context?: any): {
    score: number;
    confidence: number;
    dimensions: Record<Dimension, number>;
    allowed: boolean;
} {
    const dimensions: Record<Dimension, number> = {} as any;
    let weightedSum = 0;
    for (const dim of Object.keys(defaultWeights) as Dimension[]) {
        const psi = evaluateDimension(dim, action, context);
        dimensions[dim] = psi;
        weightedSum += defaultWeights[dim] * psi;
    }
    const score = weightedSum; // already in [0,1] because weights sum to 1
    // Confidence: inverse of variance of dimension scores (normalized)
    const dimScores = Object.values(dimensions);
    const mean = dimScores.reduce((a,b)=>a+b,0)/dimScores.length;
    const variance = dimScores.reduce((a,b)=>a+(b-mean)**2,0)/dimScores.length;
    const confidence = Math.max(0, 1 - Math.sqrt(variance)); // high variance -> low confidence

    const threshold = 0.65; // gate
    return {
        score,
        confidence,
        dimensions,
        allowed: score >= threshold && confidence >= 0.6,
    };
}
