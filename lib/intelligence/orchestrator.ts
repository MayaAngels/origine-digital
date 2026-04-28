// lib/intelligence/orchestrator.ts
import { BetaBandit } from './bandit';
import { PricingEngine } from './pricing';
import { Redis } from '@upstash/redis';

export class Orchestrator {
    private bandit: BetaBandit;
    private pricing: PricingEngine;

    constructor(redis: Redis) {
        this.bandit = new BetaBandit(3);
        this.pricing = new PricingEngine(redis);
    }

    async decide(context: { userId: string; segment: string; features: number[] }) {
        const actionId = this.bandit.select();
        const price = await this.pricing.recommend(context.segment);

        return {
            actionId,
            price,
            uiVariant: actionId % 3,
            reason: 'BetaBandit+BayesianPricing',
        };
    }

    async update(actionId: number, reward: boolean, segment: string, price: number, purchased: boolean) {
        this.bandit.update(actionId, reward);
        await this.pricing.update(segment, price, purchased);
    }
}
