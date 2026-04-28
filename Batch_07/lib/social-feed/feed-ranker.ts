// lib/social-feed/feed-ranker.ts
import { BetaBandit } from '@/lib/intelligence/bandit';

export class FeedRanker {
    private bandit: BetaBandit;

    constructor() {
        this.bandit = new BetaBandit(5);
    }

    async rank(userId: string, candidates: Array<{ id: string; score: number }>) {
        return candidates.sort((a, b) => b.score - a.score);
    }

    async update(variantId: number, reward: boolean) {
        this.bandit.update(variantId, reward);
    }

    getBestVariant(): number {
        return this.bandit.select();
    }
}
