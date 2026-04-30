export interface CoherenceInput {
    symmetryScore: number;
    entanglementScore: number;
    paradoxLevel: number;
    consciousnessAlignment: number;
}

export function calculateRealityCoherence(input: CoherenceInput): number {
    const s = input.symmetryScore;
    const e = input.entanglementScore;
    const p = input.paradoxLevel;
    const c = input.consciousnessAlignment;
    const product = s * e * c;
    const penalty = 1 - p * 0.5;
    const score = product * penalty;
    if (score > 1) return 1;
    if (score < 0) return 0;
    return score;
}

export function coherenceGrade(score: number): string {
    if (score >= 0.85) return 'A (Highly Coherent)';
    if (score >= 0.70) return 'B (Coherent)';
    if (score >= 0.50) return 'C (Moderate)';
    if (score >= 0.30) return 'D (Unstable)';
    return 'F (Paradoxical)';
}