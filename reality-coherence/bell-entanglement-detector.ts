// lib/intelligence/reality-coherence/bell-entanglement-detector.ts
// Detects non‑local correlations between market actors or metrics.

export function detectEntanglement(
    seriesA: number[],
    seriesB: number[],
    threshold = 0.7
): { entangled: boolean; strength: number } {
    if (seriesA.length < 5 || seriesB.length < 5) {
        return { entangled: false, strength: 0 };
    }

    // Compute Pearson correlation
    const n = Math.min(seriesA.length, seriesB.length);
    const a = seriesA.slice(-n);
    const b = seriesB.slice(-n);
    const meanA = a.reduce((x,y)=>x+y,0)/n;
    const meanB = b.reduce((x,y)=>x+y,0)/n;
    let cov = 0, varA = 0, varB = 0;
    for (let i = 0; i < n; i++) {
        const da = a[i] - meanA;
        const db = b[i] - meanB;
        cov += da * db;
        varA += da * da;
        varB += db * db;
    }
    const r = cov / Math.sqrt(varA * varB + 1e-9);
    const strength = Math.abs(r);
    return { entangled: strength >= threshold, strength };
}
