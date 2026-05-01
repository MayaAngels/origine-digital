// lib/intelligence/partner-knowledge/partner-knowledge.ts
// Captures and applies expertise from your business partners.

interface PartnerInsight {
    id: string;
    partnerName: string;
    domain: string;           // e.g., "pricing", "marketing", "product"
    insight: string;          // the knowledge they shared
    confidence: number;       // how reliable this insight has been
    timesApplied: number;
    timesSuccessful: number;
    lastApplied: string;
}

export class PartnerKnowledgeBase {
    private insights: PartnerInsight[] = [];

    addInsight(partnerName: string, domain: string, insight: string): void {
        this.insights.push({
            id: `partner_${Date.now()}`,
            partnerName,
            domain,
            insight,
            confidence: 0.5,       // start neutral
            timesApplied: 0,
            timesSuccessful: 0,
            lastApplied: new Date().toISOString(),
        });
    }

    getRelevantInsights(domain: string, minConfidence: number = 0.3): PartnerInsight[] {
        return this.insights
            .filter(i => i.domain === domain && i.confidence >= minConfidence)
            .sort((a, b) => b.confidence - a.confidence);
    }

    applyInsight(insightId: string, success: boolean): void {
        const insight = this.insights.find(i => i.id === insightId);
        if (insight) {
            insight.timesApplied++;
            if (success) insight.timesSuccessful++;
            insight.confidence = insight.timesSuccessful / Math.max(1, insight.timesApplied);
            insight.lastApplied = new Date().toISOString();
        }
    }

    getTopPartners(): Array<{ name: string; contribution: number }> {
        const partnerStats: Record<string, { total: number; successful: number }> = {};
        this.insights.forEach(i => {
            if (!partnerStats[i.partnerName]) partnerStats[i.partnerName] = { total: 0, successful: 0 };
            partnerStats[i.partnerName].total += i.timesApplied;
            partnerStats[i.partnerName].successful += i.timesSuccessful;
        });
        return Object.entries(partnerStats)
            .map(([name, stats]) => ({
                name,
                contribution: stats.total > 0 ? stats.successful / stats.total : 0,
            }))
            .sort((a, b) => b.contribution - a.contribution);
    }
}
