// lib/intelligence/bandit.ts
import { Redis } from '@upstash/redis';

export class BetaBandit {
    alpha: number[];
    beta: number[];

    constructor(n: number) {
        this.alpha = Array(n).fill(1);
        this.beta = Array(n).fill(1);
    }

    select(): number {
        const samples = this.alpha.map((a, i) => {
            const g1 = -Math.log(Math.random()) / a;
            const g2 = -Math.log(Math.random()) / this.beta[i];
            return g1 / (g1 + g2);
        });
        return samples.indexOf(Math.max(...samples));
    }

    update(arm: number, reward: boolean) {
        if (reward) this.alpha[arm]++;
        else this.beta[arm]++;
    }

    getStats(arm: number) {
        const total = this.alpha[arm] + this.beta[arm];
        return { mean: this.alpha[arm] / total, observations: total - 2 };
    }
}
