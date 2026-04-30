// lib/intelligence/reality-coherence/reality-gate.ts
// A gate that checks reality coherence before allowing an action.

import { calculateRealityCoherence, CoherenceInput } from './coherence-calculator';

export function realityGate(action: string, input: CoherenceInput): { allowed: boolean; score: number; reason: string } {
    const score = calculateRealityCoherence(input);
    const threshold = 0.65;
    if (score >= threshold) {
        return { allowed: true, score, reason: `Coherent (${score.toFixed(2)})` };
    }
    return { allowed: false, score, reason: `Blocked: reality coherence too low (${score.toFixed(2)} < ${threshold})` };
}
