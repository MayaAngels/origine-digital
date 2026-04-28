// lib/intelligence-kernel/self-model.ts
export interface ComponentNode {
    name: string;
    dependencies: string[];
    status: 'healthy' | 'degraded' | 'down';
}

export class SelfModel {
    private graph: Map<string, ComponentNode> = new Map();

    constructor() {
        // Initialize with known components
        this.register('meta-controller', ['scoring', 'simulation', 'execution']);
        this.register('content-blog', ['ai-service']);
        this.register('content-social', ['ai-service']);
        this.register('content-email', ['ai-service']);
        this.register('marketplace', ['stripe', 'client-manager']);
    }

    register(name: string, deps: string[] = []) {
        this.graph.set(name, {
            name,
            dependencies: deps,
            status: 'healthy',
        });
    }

    simulateChange(component: string, newDeps?: string[]): { risk: number; breaks: string[] } {
        const node = this.graph.get(component);
        if (!node) return { risk: 0.1, breaks: [] };

        // Simple risk heuristic: changing a component that others depend on increases risk
        const dependents = [...this.graph.values()].filter(n => n.dependencies.includes(component));
        const risk = Math.min(0.9, dependents.length * 0.2);
        const breaks = dependents.map(d => d.name);
        return { risk, breaks };
    }

    get healthy(): boolean {
        return [...this.graph.values()].every(n => n.status === 'healthy');
    }
}
