// lib/intelligence/pricing.ts
import { Redis } from '@upstash/redis';

export class PricingEngine {
    private redis: Redis;
    private basePrice: number;

    constructor(redis: Redis, basePrice = 50) {
        this.redis = redis;
        this.basePrice = basePrice;
    }

    private async getParams(segment: string): Promise<{ a: number; b: number }> {
        const key = `pricing:${segment}`;
        const params = await this.redis.hgetall(key);
        if (!params || !params.a) {
            const prior = { a: 2, b: 0.05 };
            await this.redis.hset(key, prior);
            return prior;
        }
        return { a: Number(params.a), b: Number(params.b) };
    }

    sampleBeta(a: number, b: number): number {
        const u = Math.random();
        return -Math.log(u) * (a / b);
    }

    async recommend(segment: string): Promise<number> {
        const { a, b } = await this.getParams(segment);
        const beta = this.sampleBeta(a, b);
        const optimal = 1 / Math.max(beta, 1e-6);
        const scaled = this.basePrice * optimal * 0.02;
        return Math.max(this.basePrice * 0.7, Math.min(this.basePrice * 1.5, scaled));
    }

    async update(segment: string, price: number, purchased: boolean): Promise<void> {
        const { a, b } = await this.getParams(segment);
        const newA = a + (purchased ? 1 : 0.1);
        const newB = b + price;
        await this.redis.hset(`pricing:${segment}`, { a: newA, b: newB });
    }
}
