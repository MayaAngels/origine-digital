// lib/intelligence/reality-coherence/coherence-calculator.ts
// Measures reality‑coherence of a strategy or market state.

export interface CoherenceInput {
    symmetryScore: number;      // Noether conservation alignment
    entanglementScore: number;  // Bell non‑local correlation
    paradoxLevel: number;       // Contradiction density
    consciousnessAlignment: number; // Collective awareness match
}

export function calculateRealityCoherence(input: CoherenceInput): number {
    const { symmetryScore, entanglementScore, paradoxLevel, consciousnessAlignment } = input;
    // Coherence formula: product of alignments, penalised by paradox
    const raw = (symmetryScore * entanglementScore * consciousnessAlignment) /
                (1 + paradoxLevel * 2);
    return Math.min(1, Math.max(0, raw));
}

export function coherenceGrade(score: number): string {
    if (score >= 0.85) return 'A (Highly Coherent)';
    if (score >= 0.70) return 'B (Coherent)';
    if (score >= 0.50) return 'C (Moderate)';
    if (score >= 0.30) return 'D (Unstable)';
    return 'F (Paradoxical)';
}
