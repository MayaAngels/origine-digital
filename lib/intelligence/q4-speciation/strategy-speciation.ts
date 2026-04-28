// lib/intelligence/q4-speciation/strategy-speciation.ts
interface Strategy {
    id: string;
    name: string;
    type: string;
    parameters: Record<string, any>;
    revenueHistory: number[];
}

interface BehavioralDescriptor {
    strategyId: string;
    vector: number[];
    noveltyScore: number;
}

export class StrategySpeciationEngine {
    private strategyArchive: Map<string, Strategy> = new Map();
    private behavioralDescriptors: Map<string, BehavioralDescriptor> = new Map();
    private generation: number = 0;

    async evolveStrategy(parentId: string): Promise<Strategy> {
        this.generation++;
        const parent = this.strategyArchive.get(parentId);
        if (!parent) throw new Error('Parent strategy not found');

        // Generate mutations
        const mutations = await this.generateMutations(parent);
        
        // Score each mutation for novelty + performance
        const scored = await Promise.all(mutations.map(async (m) => {
            const behavior = await this.extractBehavior(m);
            const novelty = this.computeNovelty(behavior);
            const performance = this.estimatePerformance(m);
            const score = 0.7 * performance + 0.3 * novelty;
            
            return { strategy: m, behavior, novelty, performance, score };
        }));

        // Select best novel strategy
        const best = scored.sort((a, b) => b.score - a.score)[0];
        
        // Archive
        this.strategyArchive.set(best.strategy.id, best.strategy);
        this.behavioralDescriptors.set(best.strategy.id, {
            strategyId: best.strategy.id,
            vector: best.behavior,
            noveltyScore: best.novelty
        });

        return best.strategy;
    }

    private async generateMutations(parent: Strategy): Promise<Strategy[]> {
        const mutations: Strategy[] = [];
        const dimensions = Object.keys(parent.parameters);
        
        for (let i = 0; i < 10; i++) {
            const mutatedParams = { ...parent.parameters };
            // Mutate random dimension
            const dim = dimensions[Math.floor(Math.random() * dimensions.length)];
            mutatedParams[dim] = this.mutateValue(parent.parameters[dim]);
            
            mutations.push({
                id: `speciation_${this.generation}_${i}_${Date.now()}`,
                name: `${parent.name}_variant_${i}`,
                type: parent.type,
                parameters: mutatedParams,
                revenueHistory: []
            });
        }
        return mutations;
    }

    private mutateValue(value: any): any {
        if (typeof value === 'number') {
            return value * (0.5 + Math.random());
        }
        return value;
    }

    private async extractBehavior(strategy: Strategy): Promise<number[]> {
        // Encode strategy behavior as a fixed-dimension vector
        return Object.values(strategy.parameters)
            .filter(v => typeof v === 'number')
            .slice(0, 16) as number[];
    }

    private computeNovelty(behavior: number[]): number {
        const allBehaviors = [...this.behavioralDescriptors.values()].map(b => b.vector);
        if (allBehaviors.length === 0) return 1.0;
        
        const distances = allBehaviors
            .map(b => this.euclideanDistance(behavior, b))
            .sort((a, b) => a - b);
        
        const k = Math.min(5, distances.length);
        return distances.slice(0, k).reduce((a, b) => a + b, 0) / k;
    }

    private euclideanDistance(a: number[], b: number[]): number {
        return Math.sqrt(a.reduce((sum, val, i) => sum + (val - b[i]) ** 2, 0));
    }

    private estimatePerformance(strategy: Strategy): number {
        return 0.5 + Math.random() * 0.5; // Placeholder — uses simulation in production
    }

    getArchive(): Strategy[] {
        return [...this.strategyArchive.values()];
    }

    getMostNovel(): Strategy | null {
        const descriptors = [...this.behavioralDescriptors.values()]
            .sort((a, b) => b.noveltyScore - a.noveltyScore);
        if (descriptors.length === 0) return null;
        return this.strategyArchive.get(descriptors[0].strategyId) || null;
    }
}
