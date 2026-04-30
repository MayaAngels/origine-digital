@'
// lib/intelligence/consciousness-field/field-manager.ts
// v4 — 14 free sources + Twitter + NewsAPI

import { fetchAllFreeSources, aggregateSources } from './free-sources';

interface ConsciousnessState {
    globalAwareness: number;
    marketSentiment: number;
    enlightenmentEvents: number;
    lastUpdated: string;
    activeSources: number;
    sources: Record<string, { volume: number; sentiment: number }>;
    topKeywords: string[];
}

export class ConsciousnessField {
    private state: ConsciousnessState = {
        globalAwareness: 0.5, marketSentiment: 0, enlightenmentEvents: 0,
        lastUpdated: new Date().toISOString(), activeSources: 0, sources: {}, topKeywords: []
    };

    async update(): Promise<ConsciousnessState> {
        try {
            const freeResults = await fetchAllFreeSources();
            const aggregated = aggregateSources(freeResults);
            this.state.globalAwareness = Math.round((this.state.globalAwareness * 0.8 + aggregated.totalVolume * 0.2) * 1000) / 1000;
            this.state.marketSentiment = Math.round((this.state.marketSentiment * 0.8 + aggregated.avgSentiment * 0.2) * 1000) / 1000;
            this.state.activeSources = aggregated.sourceCount;
            this.state.topKeywords = aggregated.topKeywords;
            this.state.lastUpdated = new Date().toISOString();
            const sourcesObj: Record<string, { volume: number; sentiment: number }> = {};
            freeResults.forEach(s => { sourcesObj[s.source] = { volume: s.volume, sentiment: s.sentiment }; });
            this.state.sources = sourcesObj;
            if (aggregated.totalVolume > 0.6 && Math.abs(aggregated.avgSentiment) > 0.4) { this.state.enlightenmentEvents++; }
        } catch (e) {
            console.warn('[Consciousness] Update failed, using cached state');
        }
        return this.getState();
    }

    getState(): ConsciousnessState {
        return { ...this.state, sources: { ...this.state.sources }, topKeywords: [...this.state.topKeywords] };
    }
}
'@ | Set-Clipboard
Write-Host "✅ New field manager copied to clipboard!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 NOW DO THIS:" -ForegroundColor Cyan
Write-Host "1. Go to: https://github.com/MayaAngels/origine-digital/edit/main/lib/intelligence/consciousness-field/field-manager.ts" -ForegroundColor White
Write-Host "2. Select ALL text (Ctrl+A)" -ForegroundColor White
Write-Host "3. Paste (Ctrl+V) — replaces everything" -ForegroundColor White
Write-Host "4. Commit message: 'UPDATE Field Manager with 14 free sources'" -ForegroundColor White
Write-Host "5. Click 'Commit changes'" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Then trigger deploy: https://app.netlify.com/sites/fabulous-figolla-8e0216/deploys" -ForegroundColor Cyan
