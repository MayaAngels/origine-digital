// lib/intelligence/quantum-engine/superposition-engine.ts
// Simulates quantum superposition for parallel scenario exploration.

export interface Scenario {
    id: string;
    probability: number;
    outcome: Record<string, number>;
}

export function createSuperposition(scenarios: Scenario[]): Scenario[] {
    // Normalize probabilities
    const total = scenarios.reduce((s, sc) => s + sc.probability, 0);
    return scenarios.map(sc => ({ ...sc, probability: sc.probability / total }));
}

export function collapseSuperposition(
    superposition: Scenario[],
    observerBias: Record<string, number> = {}
): Scenario {
    // Weighted random selection, biased by observer
    const weights = superposition.map(sc => {
        let bias = 1;
        for (const [key, value] of Object.entries(observerBias)) {
            if (sc.outcome[key] !== undefined) {
                bias *= 1 + (sc.outcome[key] - value) * 0.1;
            }
        }
        return sc.probability * Math.max(0, bias);
    });
    const totalWeight = weights.reduce((a,b)=>a+b, 0);
    let r = Math.random() * totalWeight;
    for (let i = 0; i < superposition.length; i++) {
        r -= weights[i];
        if (r <= 0) return superposition[i];
    }
    return superposition[superposition.length - 1];
}

// Quantum-inspired portfolio optimization (simplified)
export function quantumOptimize(
    options: Array<{ id: string; expectedReturn: number; risk: number; entanglement: number }>,
    budget: number
): Array<{ id: string; allocation: number }> {
    // Treat each option as a quantum state, allocate based on risk-adjusted return weighted by entanglement
    const scores = options.map(o => ({
        id: o.id,
        score: (o.expectedReturn / (o.risk + 0.01)) * (1 + o.entanglement)
    }));
    const totalScore = scores.reduce((s, o) => s + o.score, 0);
    return scores.map(o => ({
        id: o.id,
        allocation: budget * (o.score / totalScore)
    }));
}
