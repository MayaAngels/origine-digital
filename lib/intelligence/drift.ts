// lib/intelligence/drift.ts
import { redis } from '../lib/infrastructure/self-hosted-redis';

export class DriftGuard {
    private windowSize = 100;
    private sensitivity = 2;

    async recordMetric(metric: string, value: number): Promise<void> {
        const key = `drift:${metric}`;
        await redis.lpush(key, value.toString());
        await redis.ltrim(key, 0, this.windowSize - 1);
    }

    async isDrifting(metric: string, sensitivityOverride?: number): Promise<boolean> {
        const sensitivity = sensitivityOverride || this.sensitivity;
        const vals = await redis.lrange(`drift:${metric}`, 0, this.windowSize - 1);
        
        if (vals.length < 10) return false;
        
        const numbers = vals.map(Number);
        const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
        const variance = numbers.reduce((a, b) => a + (b - mean) ** 2, 0) / numbers.length;
        const std = Math.sqrt(variance);
        const last = numbers[0];
        
        const drifted = last < mean - sensitivity * std;
        
        if (drifted) {
            console.warn(`[DriftGuard] ${metric} is drifting. Last: ${last.toFixed(3)}, Mean: ${mean.toFixed(3)}, Std: ${std.toFixed(3)}`);
        }
        
        return drifted;
    }

    async shouldRollback(): Promise<boolean> {
        const metrics = ['conversion_rate', 'revenue_per_session', 'engagement_score', 'ethical_score'];
        let driftCount = 0;
        
        for (const metric of metrics) {
            if (await this.isDrifting(metric)) {
                driftCount++;
            }
        }
        
        // Rollback if 2+ metrics are drifting
        const needsRollback = driftCount >= 2;
        
        if (needsRollback) {
            console.error('[DriftGuard] Multiple metrics drifting. Rollback recommended!');
            await redis.set('drift:rollback_alert', JSON.stringify({
                timestamp: new Date().toISOString(),
                driftingMetrics: driftCount,
                action: 'ROLLBACK_RECOMMENDED',
            }));
        }
        
        return needsRollback;
    }

    async getHealthReport(): Promise<any> {
        const metrics = ['conversion_rate', 'revenue_per_session', 'engagement_score', 'ethical_score'];
        const report: any = {};
        
        for (const metric of metrics) {
            const vals = await redis.lrange(`drift:${metric}`, 0, this.windowSize - 1);
            const numbers = vals.map(Number);
            if (numbers.length > 0) {
                report[metric] = {
                    current: numbers[0],
                    mean: numbers.reduce((a, b) => a + b, 0) / numbers.length,
                    samples: numbers.length,
                    drifting: await this.isDrifting(metric),
                };
            }
        }
        
        return report;
    }
}
