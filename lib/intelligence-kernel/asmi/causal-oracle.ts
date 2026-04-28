// lib/intelligence-kernel/asmi/causal-oracle.ts
export interface CausalQuery {
    action: string;            // e.g., 'send-email', 'create-product'
    context: Record<string, any>;
}

interface CausalEdge {
    cause: string;
    effect: string;
    strength: number;          // -1..1
    confidence: number;        // 0..1
}

// Initial causal graph (will be updated from memory)
const causalGraph: CausalEdge[] = [
    { cause: 'send-email', effect: 'conversion', strength: 0.3, confidence: 0.8 },
    { cause: 'abandoned-cart-email', effect: 'conversion', strength: 0.7, confidence: 0.9 },
    { cause: 'social-post', effect: 'traffic', strength: 0.4, confidence: 0.7 },
    { cause: 'create-product', effect: 'revenue', strength: 0.5, confidence: 0.85 },
    { cause: 'marketplace-buy', effect: 'platform-revenue', strength: 0.9, confidence: 0.95 },
];

// ATE estimation using do‑calculus (simplified)
export function estimateATE(action: string, outcome: string = 'revenue'): {
    ate: number;
    confidence: number;
    allowed: boolean;
} {
    const edges = causalGraph.filter(e => e.cause === action && e.effect === outcome);
    if (edges.length === 0) {
        // No causal link known – allow but with low confidence
        return { ate: 0.1, confidence: 0.3, allowed: true };
    }
    let totalStrength = 0;
    let totalConf = 0;
    for (const e of edges) {
        totalStrength += e.strength;
        totalConf += e.confidence;
    }
    const avgStrength = totalStrength / edges.length;
    const avgConf = totalConf / edges.length;
    return {
        ate: avgStrength,
        confidence: avgConf,
        allowed: avgStrength > 0, // ATE must be positive
    };
}

// For updating the graph from outcomes (call after observing results)
export function updateCausalGraph(action: string, outcome: string, observedEffect: number) {
    const edge = causalGraph.find(e => e.cause === action && e.effect === outcome);
    if (edge) {
        // Simple exponential moving average update
        edge.strength = edge.strength * 0.9 + observedEffect * 0.1;
        edge.confidence = Math.min(1, edge.confidence + 0.05);
    } else {
        causalGraph.push({ cause: action, effect: outcome, strength: observedEffect, confidence: 0.5 });
    }
}
