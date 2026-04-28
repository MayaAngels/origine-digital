// lib/intelligence/q2-meta-gradient/meta-gradient.ts
export class MetaGradientController {
    private learningRates: Map<string, number> = new Map();
    private performanceHistory: Map<string, number[]> = new Map();

    getLearningRate(agentName: string): number {
        return this.learningRates.get(agentName) || 0.01;
    }

    adapt(agentName: string, performanceDelta: number): number {
        const currentLR = this.learningRates.get(agentName) || 0.01;
        // Approximate meta-gradient: ∇_α J ≈ performance improvement / learning rate change
        const gradient = performanceDelta / Math.max(currentLR, 0.0001);
        const newLR = currentLR + 0.001 * Math.tanh(gradient);
        const clipped = Math.max(0.0001, Math.min(0.5, newLR));
        this.learningRates.set(agentName, clipped);
        return clipped;
    }

    recordPerformance(agentName: string, performance: number) {
        if (!this.performanceHistory.has(agentName)) {
            this.performanceHistory.set(agentName, []);
        }
        this.performanceHistory.get(agentName)!.push(performance);
    }

    getConfidence(agentName: string): number {
        const history = this.performanceHistory.get(agentName);
        if (!history || history.length < 5) return 0.3;
        const mean = history.reduce((a,b) => a+b, 0) / history.length;
        const variance = history.reduce((a,b) => a+(b-mean)**2, 0) / history.length;
        return Math.min(1, 1 / (1 + variance));
    }
}
