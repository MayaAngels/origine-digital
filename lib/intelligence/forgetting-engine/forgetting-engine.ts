// lib/intelligence/forgetting-engine/forgetting-engine.ts
// Forgetting Engine — Principled memory management for ORIGINE.DIGITAL

interface MemoryItem {
    id: string;
    content: any;
    type: 'decision' | 'outcome' | 'pattern' | 'failure' | 'success';
    importance: number;
    timestamp: number;
    relevanceScore: number;
}

export class ForgettingEngine {
    private memories: MemoryItem[] = [];
    private config = { halfLifeDays: 30, minRelevance: 5, maxItems: 1000 };

    store(content: any, type: MemoryItem['type']): MemoryItem {
        const importance = type === 'failure' ? 90 : type === 'success' ? 80 : type === 'pattern' ? 70 : 50;
        const memory: MemoryItem = {
            id: `mem_${Date.now()}`,
            content, type, importance, timestamp: Date.now(),
            relevanceScore: importance,
        };
        this.memories.push(memory);
        if (this.memories.length > this.config.maxItems) this.forget();
        return memory;
    }

    retrieve(query: string, limit: number = 10): MemoryItem[] {
        const lower = query.toLowerCase();
        return this.memories
            .filter(m => JSON.stringify(m.content).toLowerCase().includes(lower))
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .slice(0, limit);
    }

    forget(): number {
        const now = Date.now();
        const halfLife = this.config.halfLifeDays * 86400000;
        for (const m of this.memories) {
            const age = now - m.timestamp;
            m.relevanceScore = m.importance * Math.pow(0.5, age / halfLife);
        }
        const before = this.memories.length;
        this.memories = this.memories.filter(m => m.relevanceScore >= this.config.minRelevance);
        return before - this.memories.length;
    }

    getStats() { return { total: this.memories.length, avgImportance: this.memories.reduce((s, m) => s + m.importance, 0) / Math.max(1, this.memories.length) }; }
}

export const forgettingEngine = new ForgettingEngine();
