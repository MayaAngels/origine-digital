// lib/growth/referral-engine.ts
import { ThompsonSampler } from '@/lib/intelligence/bandit';

interface ReferralReward {
    type: 'percentage' | 'fixed';
    value: number;
}

export class ReferralEngine {
    private sampler: ThompsonSampler;

    constructor() {
        // Three possible reward structures
        this.sampler = new ThompsonSampler(3);
    }

    recommend(clientId: string): ReferralReward {
        const choice = this.sampler.select();
        const rewards: ReferralReward[] = [
            { type: 'percentage', value: 10 },  // 10% of referred sales
            { type: 'fixed', value: 5 },        // €5 per signup
            { type: 'percentage', value: 20 },  // 20% (aggressive)
        ];
        return rewards[choice];
    }

    update(clientId: string, rewardIndex: number, success: boolean) {
        this.sampler.update(rewardIndex, success ? 1 : 0);
    }
}
