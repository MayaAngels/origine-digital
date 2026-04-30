// lib/intelligence/cross-domain/knowledge-synthesis.ts
// Cross-Domain Knowledge Synthesis Engine
// Discovers structural patterns across markets and transfers insights automatically.

interface MarketPattern {
    id: string;
    sourceMarket: string;       // e.g., "irish-salons"
    targetMarket: string;       // e.g., "brazilian-bakeries"
    patternType: 'pricing' | 'content' | 'engagement' | 'conversion' | 'retention';
    structuralSignature: number[];  // numerical fingerprint of the pattern
    confidence: number;             // 0-1 similarity confidence
    insight: string;                // human-readable transfer insight
    expectedLift: number;           // predicted improvement in target market
    timestamp: string;
}

interface MarketData {
    marketId: string;
    metrics: {
        avgPrice: number;
        conversionRate: number;
        engagementRate: number;
        retentionRate: number;
        contentTone: number;        // -1 (formal) to 1 (casual)
        buyingCycle: number;        // average days between purchases
        priceElasticity: number;    // demand sensitivity to price
        socialProofWeight: number;  // importance of testimonials
        urgencyTolerance: number;   // how well scarcity works
    };
    topProducts: string[];
    topKeywords: string[];
}

export class CrossDomainSynthesisEngine {
    private patternLibrary: MarketPattern[] = [];
    private marketRegistry: Map<string, MarketData> = new Map();
    private transferHistory: Array<{
        from: string;
        to: string;
        pattern: string;
        result: 'success' | 'failure' | 'pending';
        actualLift: number;
    }> = [];

    // ============================================================
    // 1. REGISTER A MARKET WITH ITS METRICS
    // ============================================================
    registerMarket(data: MarketData): void {
        this.marketRegistry.set(data.marketId, data);
        console.log(`[CrossDomain] Registered market: ${data.marketId}`);
    }

    // ============================================================
    // 2. EXTRACT STRUCTURAL SIGNATURE FROM A MARKET
    // ============================================================
    private extractSignature(market: MarketData): number[] {
        const m = market.metrics;
        return [
            m.avgPrice / 100,              // normalize price
            m.conversionRate,
            m.engagementRate,
            m.retentionRate,
            (m.contentTone + 1) / 2,       // normalize to 0-1
            Math.min(1, m.buyingCycle / 30), // normalize to 0-1 (30-day cycle)
            m.priceElasticity,
            m.socialProofWeight,
            m.urgencyTolerance,
        ];
    }

    // ============================================================
    // 3. CALCULATE COSINE SIMILARITY BETWEEN TWO MARKET SIGNATURES
    // ============================================================
    private cosineSimilarity(a: number[], b: number[]): number {
        if (a.length !== b.length) return 0;
        let dotProduct = 0;
        let normA = 0;
        let normB = 0;
        for (let i = 0; i < a.length; i++) {
            dotProduct += a[i] * b[i];
            normA += a[i] * a[i];
            normB += b[i] * b[i];
        }
        if (normA === 0 || normB === 0) return 0;
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }

    // ============================================================
    // 4. FIND SIMILAR MARKETS (Transfer Learning Candidates)
    // ============================================================
    findSimilarMarkets(targetMarketId: string, threshold: number = 0.75): Array<{
        sourceMarket: string;
        similarity: number;
        transferableInsights: string[];
    }> {
        const target = this.marketRegistry.get(targetMarketId);
        if (!target) return [];

        const targetSignature = this.extractSignature(target);
        const results: Array<{
            sourceMarket: string;
            similarity: number;
            transferableInsights: string[];
        }> = [];

        for (const [marketId, marketData] of this.marketRegistry) {
            if (marketId === targetMarketId) continue;
            
            const sourceSignature = this.extractSignature(marketData);
            const similarity = this.cosineSimilarity(targetSignature, sourceSignature);

            if (similarity >= threshold) {
                const insights = this.generateTransferInsights(marketData, target, similarity);
                results.push({
                    sourceMarket: marketId,
                    similarity: Math.round(similarity * 1000) / 1000,
                    transferableInsights: insights,
                });
            }
        }

        return results.sort((a, b) => b.similarity - a.similarity);
    }

    // ============================================================
    // 5. GENERATE TRANSFER INSIGHTS (The AI Magic)
    // ============================================================
    private generateTransferInsights(source: MarketData, target: MarketData, similarity: number): string[] {
        const insights: string[] = [];
        const sm = source.metrics;
        const tm = target.metrics;

        // Pricing insight
        if (Math.abs(sm.priceElasticity - tm.priceElasticity) < 0.2) {
            const priceDiff = ((sm.avgPrice - tm.avgPrice) / tm.avgPrice * 100).toFixed(0);
            insights.push(
                `PRICING: ${source.marketId} pricing at €${sm.avgPrice} with ${(sm.conversionRate*100).toFixed(1)}% conversion. ` +
                `Consider adjusting ${target.marketId} by ${priceDiff}% (expected lift: ${((sm.conversionRate - tm.conversionRate)*100).toFixed(1)}%)`
            );
        }

        // Content tone insight
        if (Math.abs(sm.contentTone - tm.contentTone) > 0.3) {
            const direction = sm.contentTone > tm.contentTone ? 'more casual' : 'more formal';
            insights.push(
                `CONTENT: ${source.marketId} uses a ${direction} tone (score: ${sm.contentTone.toFixed(1)} vs ${tm.contentTone.toFixed(1)}). ` +
                `Test ${direction} content in ${target.marketId}`
            );
        }

        // Engagement insight
        if (sm.engagementRate > tm.engagementRate * 1.3) {
            insights.push(
                `ENGAGEMENT: ${source.marketId} has ${(sm.engagementRate*100).toFixed(1)}% engagement vs ${(tm.engagementRate*100).toFixed(1)}% in ${target.marketId}. ` +
                `Analyze ${source.marketId}'s engagement tactics for transfer`
            );
        }

        // Social proof insight
        if (sm.socialProofWeight > tm.socialProofWeight * 1.5) {
            insights.push(
                `SOCIAL PROOF: ${source.marketId} responds ${(sm.socialProofWeight*100).toFixed(0)}% better to testimonials. ` +
                `Increase social proof in ${target.marketId} by ${((sm.socialProofWeight - tm.socialProofWeight)*100).toFixed(0)}%`
            );
        }

        // Retention insight
        if (sm.retentionRate > tm.retentionRate * 1.2) {
            insights.push(
                `RETENTION: ${source.marketId} retains ${(sm.retentionRate*100).toFixed(1)}% vs ${(tm.retentionRate*100).toFixed(1)}%. ` +
                `Study ${source.marketId}'s retention strategy for ${target.marketId}`
            );
        }

        // If very similar, add meta-insight
        if (similarity > 0.9) {
            insights.push(
                `META: ${source.marketId} and ${target.marketId} are structurally near-identical (${(similarity*100).toFixed(0)}% match). ` +
                `Almost ALL strategies from ${source.marketId} should work in ${target.marketId}`
            );
        }

        return insights;
    }

    // ============================================================
    // 6. RECORD TRANSFER OUTCOME (Learning Loop)
    // ============================================================
    recordTransferOutcome(from: string, to: string, pattern: string, actualLift: number): void {
        const result = actualLift > 0 ? 'success' : 'failure';
        this.transferHistory.push({ from, to, pattern, result, actualLift });
        
        // Update confidence in pattern library
        const existing = this.patternLibrary.find(
            p => p.sourceMarket === from && p.targetMarket === to && p.patternType === pattern as any
        );
        if (existing) {
            existing.confidence = existing.confidence * 0.8 + (result === 'success' ? 1 : 0) * 0.2;
        }
    }

    // ============================================================
    // 7. GET TRANSFER SUCCESS RATE
    // ============================================================
    getTransferStats(): {
        totalTransfers: number;
        successRate: number;
        avgLift: number;
        topPatterns: string[];
    } {
        const total = this.transferHistory.length;
        const successes = this.transferHistory.filter(t => t.result === 'success').length;
        const avgLift = this.transferHistory.reduce((s, t) => s + t.actualLift, 0) / Math.max(1, total);
        const patternCounts: Record<string, number> = {};
        this.transferHistory.filter(t => t.result === 'success').forEach(t => {
            patternCounts[t.pattern] = (patternCounts[t.pattern] || 0) + 1;
        });
        const topPatterns = Object.entries(patternCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([k]) => k);

        return {
            totalTransfers: total,
            successRate: total > 0 ? Math.round((successes / total) * 100) : 0,
            avgLift: Math.round(avgLift * 1000) / 1000,
            topPatterns,
        };
    }

    // ============================================================
    // 8. EXPORT ALL KNOWLEDGE (For future markets)
    // ============================================================
    exportKnowledge(): {
        markets: number;
        patterns: number;
        transferHistory: number;
        topInsight: string;
    } {
        const allInsights: string[] = [];
        for (const [targetId] of this.marketRegistry) {
            const similar = this.findSimilarMarkets(targetId, 0.7);
            similar.forEach(s => allInsights.push(...s.transferableInsights));
        }
        const topInsight = allInsights[0] || 'No insights yet';

        return {
            markets: this.marketRegistry.size,
            patterns: this.patternLibrary.length,
            transferHistory: this.transferHistory.length,
            topInsight,
        };
    }
}

// Singleton instance
export const crossDomainEngine = new CrossDomainSynthesisEngine();
