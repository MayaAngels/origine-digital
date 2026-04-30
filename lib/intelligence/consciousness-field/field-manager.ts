// lib/intelligence/consciousness-field/field-manager.ts
// Tracks collective market awareness and detects gaps.

interface ConsciousnessState {
    globalAwareness: number;      // 0-1
    marketSentiment: number;      // -1 to 1
    enlightenmentEvents: number;  // count of paradigm shifts
}

export class ConsciousnessField {
    private state: ConsciousnessState = {
        globalAwareness: 0.5,
        marketSentiment: 0,
        enlightenmentEvents: 0
    };

    update(metrics: { socialVolume: number; sentimentScore: number; noveltyIndex: number }) {
        // Heuristic: awareness drifts toward sentiment, boosted by novelty
        this.state.globalAwareness = Math.min(1,
            this.state.globalAwareness * 0.95 + Math.abs(metrics.sentimentScore) * 0.05 + metrics.noveltyIndex * 0.02
        );
        this.state.marketSentiment = metrics.sentimentScore;
        if (metrics.noveltyIndex > 0.8) {
            this.state.enlightenmentEvents++;
        }
    }

    getGap(actualRealityCoherence: number): number {
        // Gap between collective perception and actual coherence
        return Math.abs(this.state.globalAwareness - actualRealityCoherence);
    }

    getState(): ConsciousnessState {
        return { ...this.state };
    }
}
