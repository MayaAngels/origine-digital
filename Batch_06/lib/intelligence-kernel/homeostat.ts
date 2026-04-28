// lib/intelligence-kernel/homeostat.ts
export interface HealthStatus {
    stability: number;   // 0..1, higher is more stable
    diversity: number;   // entropy of actions, 1 = varied
    alignment: number;   // 0..1, alignment with goals
}

export class Homeostat {
    private static instance: Homeostat;
    private maxDailySpend: number = 50.0;      // EUR
    private maxContentPerHour: number = 20;    // articles/posts generated
    private spendToday: number = 0;
    private contentGenerated: number = 0;
    private lastReset: Date = new Date();

    public health: HealthStatus = {
        stability: 1.0,
        diversity: 0.5,
        alignment: 1.0
    };

    private constructor() {}

    public static getInstance(): Homeostat {
        if (!Homeostat.instance) {
            Homeostat.instance = new Homeostat();
        }
        return Homeostat.instance;
    }

    public allocateSpend(amount: number): boolean {
        this.resetIfNewDay();
        if (this.spendToday + amount > this.maxDailySpend) {
            return false;
        }
        this.spendToday += amount;
        return true;
    }

    public registerContentCreation(): boolean {
        this.resetIfNewDay();
        this.contentGenerated++;
        if (this.contentGenerated > this.maxContentPerHour) {
            this.health.stability = Math.max(0, this.health.stability - 0.1);
            return false; // throttle
        }
        return true;
    }

    public updateHealth(rollback: boolean = false, portfolioEntropy: number = 0.5, alignmentDrift: number = 0.0) {
        if (rollback) {
            this.health.stability = Math.max(0, this.health.stability - 0.2);
        }
        this.health.diversity = Math.min(1.0, Math.max(0.0, portfolioEntropy));
        this.health.alignment = Math.max(0.0, 1.0 - alignmentDrift);
        console.log('[Homeostat] Health:', this.health);
    }

    private resetIfNewDay() {
        const now = new Date();
        if (now.getDate() !== this.lastReset.getDate()) {
            this.spendToday = 0;
            this.contentGenerated = 0;
            this.lastReset = now;
        }
    }

    public get isHealthy(): boolean {
        return this.health.stability > 0.4 && this.health.alignment > 0.5;
    }

    public get dailyReport() {
        return {
            health: this.health,
            spendToday: this.spendToday,
            contentGenerated: this.contentGenerated,
            maxDailySpend: this.maxDailySpend,
        };
    }
}
