// lib/intelligence/reality-coherence/paradox-resolver.ts
// Detects and attempts to resolve logical contradictions in strategy.

export interface Paradox {
    description: string;
    severity: number; // 0-1
}

export function detectParadoxes(
    strategies: Array<{ action: string; expectedOutcome: string; actualOutcome: string }>
): Paradox[] {
    const paradoxes: Paradox[] = [];
    for (const s of strategies) {
        if (s.expectedOutcome !== s.actualOutcome) {
            paradoxes.push({
                description: `Strategy '${s.action}' expected '${s.expectedOutcome}' but got '${s.actualOutcome}'`,
                severity: 0.7
            });
        }
    }
    return paradoxes;
}

export function resolveParadox(paradox: Paradox): string {
    if (paradox.severity > 0.8) {
        return 'Escalate to human oversight';
    }
    return 'Flagged for reality‑coherence review';
}
