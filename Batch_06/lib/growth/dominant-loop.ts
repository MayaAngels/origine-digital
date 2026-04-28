// lib/growth/dominant-loop.ts
import { generateProduct } from '@/lib/products/generator';
import { publishToFeed } from '@/lib/social-feed/publisher';
import { PricingEngine } from '@/lib/intelligence/pricing';

export async function runDominantLoop(niche: string) {
    // 1. Generate the best product for the niche
    const product = await generateProduct({ niche, useMarketIntel: true });
    // 2. Price it optimally
    const pricing = new PricingEngine(global.redis);
    const price = await pricing.recommend(niche);
    product.price = price;
    // 3. Post to feed
    await publishToFeed(product);
    return product;
}
