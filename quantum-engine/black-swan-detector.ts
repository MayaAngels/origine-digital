// lib/intelligence/quantum-engine/black-swan-detector.ts

export function detectBlackSwans(
    historicalData: number[],
    windowSize = 20
): { probability: number; description: string }[] {
    if (historicalData.length < windowSize) return [];
    const recent = historicalData.slice(-windowSize);
    const mean = recent.reduce((a,b)=>a+b,0) / recent.length;
    const std = Math.sqrt(recent.reduce((a,b)=>a+(b-mean)**2,0) / recent.length);
    const last = recent[recent.length - 1];
    const zScore = (last - mean) / (std + 1e-9);

    if (Math.abs(zScore) > 3) {
        return [{ probability: 0.25, description: `Extreme deviation detected (z=${zScore.toFixed(2)}). Possible black swan event.` }];
    }
    return [];
}

export function calculateTippingPoint(
    adoptionSeries: number[]
): { tipped: boolean; estimatedDate: string; confidence: number } {
    if (adoptionSeries.length < 10) {
        return { tipped: false, estimatedDate: 'N/A', confidence: 0 };
    }
    // Simple logistic growth model
    const recentGrowth = adoptionSeries[adoptionSeries.length-1] / Math.max(0.01, adoptionSeries[0]);
    const accelerating = adoptionSeries[adoptionSeries.length-1] > adoptionSeries[adoptionSeries.length-2];
    if (recentGrowth > 2 && accelerating) {
        const daysToTip = Math.round(30 / recentGrowth);
        const tipDate = new Date(Date.now() + daysToTip * 86400000).toISOString().split('T')[0];
        return { tipped: false, estimatedDate: tipDate, confidence: 0.6 };
    }
    return { tipped: recentGrowth > 5, estimatedDate: 'N/A', confidence: 0.8 };
}
