// lib/social-feed/auto-poster.ts
import { MarketIntel } from '@/lib/intelligence/market';
import { PricingEngine } from '@/lib/intelligence/pricing';
import { redis } from '@/lib/infrastructure/self-hosted-redis';

export class AutoPoster {
    private market: MarketIntel;
    private pricing: PricingEngine;

    constructor() {
        this.market = new MarketIntel(redis as any);
        this.pricing = new PricingEngine(redis as any);
    }

    async generateAndPost(): Promise<any> {
        const priors = await this.market.getPriors();
        const niches = ['irish business', 'digital products', 'passive income', 'ai automation'];
        const niche = niches[Math.floor(Math.random() * niches.length)];

        const product = {
            id: `auto_${Date.now()}`,
            title: `The ${niche} Playbook – AI Edition`,
            description: `Autonomously generated guide for ${niche}.`,
            cover: '/covers/default.png',
            basePrice: 29.99,
        };

        const price = await this.pricing.recommend('global');
        Object.assign(product, { price });

        const post = {
            id: `post_${Date.now()}`,
            productId: product.id,
            type: 'product',
            title: product.title,
            description: product.description,
            cover: product.cover,
            price: product.price,
            author: 'origine.digital',
            createdAt: new Date().toISOString(),
            likes: 0,
            shares: 0,
        };

        await redis.lpush('feed:posts', JSON.stringify(post));
        await redis.hset(`product:${product.id}`, product as any);
        
        console.log(`[AutoPoster] Posted: ${product.title}`);
        return post;
    }

    async scheduledPost(): Promise<void> {
        const hour = new Date().getHours();
        // Post during business hours in Ireland (8am-8pm UTC+1)
        if (hour >= 7 && hour <= 19) {
            await this.generateAndPost();
        }
    }
}
