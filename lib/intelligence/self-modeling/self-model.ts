// lib/intelligence/self-modeling/self-model.ts
// Self-Modeling Engine — System self-awareness for ORIGINE.DIGITAL
// Integrates with: Coherence Auditor, AI CEO, Reality Gate

export interface SystemComponent {
    id: string;
    name: string;
    type: 'ai-agent' | 'api-endpoint' | 'data-source' | 'intelligence-module' | 'revenue';
    status: 'active' | 'degraded' | 'down';
    criticality: number;        // 0-100 (PageRank-based)
    stability: number;          // 0-100
    dependencies: string[];     // IDs of components this depends on
    dependents: string[];       // IDs of components that depend on this
    lastSeen: number;
}

export interface ImpactPrediction {
    sourceComponent: string;
    affectedComponents: Array<{ id: string; probability: number; severity: number }>;
    cascadeDepth: number;
    systemWideRisk: number;     // 0-100
    recommendation: 'BLOCK' | 'WARN' | 'ALLOW' | 'ISOLATE';
}

export class SelfModel {
    private components: Map<string, SystemComponent> = new Map();
    private dependencyGraph: Map<string, string[]> = new Map();
    private reverseGraph: Map<string, string[]> = new Map();

    constructor() {
        // Register all existing ORIGINE.DIGITAL components
        this.registerInitialComponents();
    }

    private registerInitialComponents(): void {
        const components: Omit<SystemComponent, 'criticality' | 'stability' | 'lastSeen'>[] = [
            { id: 'consciousness-field', name: 'Consciousness Field', type: 'intelligence-module', status: 'active', dependencies: ['free-sources'], dependents: ['ai-ceo', 'reality-gate'] },
            { id: 'free-sources', name: '14 Free Data Sources', type: 'data-source', status: 'active', dependencies: [], dependents: ['consciousness-field'] },
            { id: 'reality-gate', name: 'Reality Gate', type: 'intelligence-module', status: 'active', dependencies: ['coherence-calculator'], dependents: ['ai-ceo'] },
            { id: 'coherence-calculator', name: 'Coherence Calculator', type: 'intelligence-module', status: 'active', dependencies: [], dependents: ['reality-gate'] },
            { id: 'ai-ceo', name: 'AI CEO / Digital Twin', type: 'ai-agent', status: 'active', dependencies: ['consciousness-field', 'reality-gate', 'coherence-auditor'], dependents: [] },
            { id: 'coherence-auditor', name: 'Coherence Auditor', type: 'intelligence-module', status: 'active', dependencies: [], dependents: ['ai-ceo'] },
            { id: 'cross-domain', name: 'Cross-Domain Synthesis', type: 'intelligence-module', status: 'active', dependencies: ['consciousness-field'], dependents: ['revenue-pipeline'] },
            { id: 'revenue-pipeline', name: 'Revenue Pipeline', type: 'revenue', status: 'active', dependencies: ['stripe-checkout', 'product-catalog'], dependents: [] },
            { id: 'stripe-checkout', name: 'Stripe Checkout', type: 'api-endpoint', status: 'active', dependencies: [], dependents: ['revenue-pipeline'] },
            { id: 'product-catalog', name: 'Product Catalog', type: 'api-endpoint', status: 'active', dependencies: ['ai-ceo'], dependents: ['revenue-pipeline'] },
            { id: 'qa-agents', name: 'QA Agents', type: 'ai-agent', status: 'active', dependencies: ['product-catalog'], dependents: [] },
            { id: 'partner-kb', name: 'Partner Knowledge Base', type: 'intelligence-module', status: 'active', dependencies: [], dependents: ['ai-ceo'] },
            { id: 'admin-notifications', name: 'Admin Notifications', type: 'api-endpoint', status: 'active', dependencies: ['ai-ceo'], dependents: [] },
        ];

        for (const comp of components) {
            this.components.set(comp.id, {
                ...comp,
                criticality: 50,
                stability: 50,
                lastSeen: Date.now(),
            });
        }

        // Build dependency graphs
        for (const [id, comp] of this.components) {
            this.dependencyGraph.set(id, comp.dependencies);
            for (const dep of comp.dependencies) {
                if (!this.reverseGraph.has(dep)) this.reverseGraph.set(dep, []);
                this.reverseGraph.get(dep)!.push(id);
            }
        }

        // Calculate initial criticality scores
        this.calculateCriticality();
    }

    private calculateCriticality(): void {
        // PageRank-style algorithm for component criticality
        const scores = new Map<string, number>();
        const damping = 0.85;
        const iterations = 30;

        for (const [id] of this.components) { scores.set(id, 1.0); }

        for (let iter = 0; iter < iterations; iter++) {
            const newScores = new Map<string, number>();
            for (const [id] of this.components) {
                let incoming = 0;
                const dependents = this.reverseGraph.get(id) || [];
                for (const depId of dependents) {
                    const depScore = scores.get(depId) || 0;
                    const outCount = (this.dependencyGraph.get(depId) || []).length || 1;
                    incoming += depScore / outCount;
                }
                newScores.set(id, (1 - damping) + damping * incoming);
            }
            for (const [id, score] of newScores) { scores.set(id, score); }
        }

        const maxScore = Math.max(...scores.values());
        for (const [id, score] of scores) {
            const comp = this.components.get(id);
            if (comp) comp.criticality = Math.round((score / maxScore) * 100);
        }
    }

    predictImpact(componentId: string, changeType: 'modify' | 'remove'): ImpactPrediction {
        const affected = new Set<string>();
        const queue = [componentId];
        const depth = new Map<string, number>();
        depth.set(componentId, 0);

        while (queue.length > 0) {
            const current = queue.shift()!;
            const dependents = this.reverseGraph.get(current) || [];
            for (const dep of dependents) {
                if (!affected.has(dep)) {
                    affected.add(dep);
                    depth.set(dep, (depth.get(current) || 0) + 1);
                    queue.push(dep);
                }
            }
        }

        const affectedComponents: ImpactPrediction['affectedComponents'] = [];
        let maxDepth = 0;
        for (const id of affected) {
            const comp = this.components.get(id);
            const d = depth.get(id) || 0;
            maxDepth = Math.max(maxDepth, d);
            affectedComponents.push({
                id,
                probability: Math.min(1, 0.3 + d * 0.15),
                severity: comp?.criticality || 50,
            });
        }

        const totalRisk = affectedComponents.reduce((s, a) => s + a.probability * a.severity, 0);
        const maxRisk = affectedComponents.length * 100;
        const systemWideRisk = maxRisk > 0 ? Math.round((totalRisk / maxRisk) * 100) : 0;

        let recommendation: ImpactPrediction['recommendation'] = 'ALLOW';
        if (systemWideRisk > 80 && changeType === 'remove') recommendation = 'BLOCK';
        else if (systemWideRisk > 60) recommendation = 'WARN';
        else if (systemWideRisk > 40) recommendation = 'ISOLATE';

        return { sourceComponent: componentId, affectedComponents, cascadeDepth: maxDepth, systemWideRisk, recommendation };
    }

    getHealth(): { fragilityIndex: number; cohesionScore: number; totalComponents: number } {
        let criticalDeps = 0, totalDeps = 0;
        for (const [_, deps] of this.dependencyGraph) {
            for (const dep of deps) {
                totalDeps++;
                const comp = this.components.get(dep);
                if (comp && comp.criticality > 70) criticalDeps++;
            }
        }
        const fragility = totalDeps > 0 ? Math.round((criticalDeps / totalDeps) * 100) : 0;
        return {
            fragilityIndex: fragility,
            cohesionScore: Math.round(100 - fragility),
            totalComponents: this.components.size,
        };
    }

    getAllComponents(): SystemComponent[] {
        return Array.from(this.components.values());
    }
}

export const selfModel = new SelfModel();
