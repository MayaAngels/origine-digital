// lib/intelligence-kernel/golden-benchmark.ts
import { createHash } from 'crypto';

export interface BenchmarkTest {
    input: any;
    expectedMinScore: number;
    expectedMaxScore: number;
    evaluator: (output: any) => number; // returns 0..1
}

export class GoldenBenchmark {
    public readonly tests: BenchmarkTest[] = [];
    private checksum: string = '';

    constructor() {
        // Define canonical tests for content quality
        this.tests.push({
            input: { topic: 'yoga mat', keywords: 'eco' },
            expectedMinScore: 0.5,
            expectedMaxScore: 1.0,
            evaluator: (output: any) => {
                if (!output || !output.title) return 0;
                const title = output.title.toLowerCase();
                const score = (title.includes('yoga') ? 0.3 : 0) + (title.length > 10 ? 0.3 : 0) + (output.content ? 0.4 : 0);
                return Math.min(1, score);
            }
        });
        this.tests.push({
            input: { topic: 'broken widget', keywords: 'fix' },
            expectedMinScore: 0.2,
            expectedMaxScore: 0.8,
            evaluator: (output: any) => (output && output.title ? 0.6 : 0)
        });
        this.checksum = this.computeChecksum();
    }

    private computeChecksum(): string {
        const data = JSON.stringify(this.tests);
        return createHash('sha256').update(data).digest('hex');
    }

    verifyIntegrity(): boolean {
        return this.computeChecksum() === this.checksum;
    }

    async evaluateSystem(agentFunc: (input: any) => Promise<any>): Promise<number> {
        if (!this.verifyIntegrity()) {
            console.error('[GoldenBenchmark] Integrity violation!');
            return 0;
        }
        let total = 0;
        for (const test of this.tests) {
            try {
                const output = await agentFunc(test.input);
                const score = test.evaluator(output);
                total += (score >= test.expectedMinScore && score <= test.expectedMaxScore) ? 1 : 0;
            } catch {
                // test failed
            }
        }
        return total / this.tests.length;
    }
}
