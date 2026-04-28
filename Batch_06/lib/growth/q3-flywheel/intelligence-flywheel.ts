// lib/growth/q3-flywheel/intelligence-flywheel.ts
export class IntelligenceFlywheel {
    private profitPool: number = 0;
    private reinvestmentRate: number = 0.3;
    private cycleHistory: FlywheelCycle[] = [];

    async cycle(revenue: number, cost: number): Promise<FlywheelCycle> {
        const profit = revenue - cost;
        const reinvestment = profit * this.reinvestmentRate;
        this.profitPool += profit * (1 - this.reinvestmentRate);

        // Reinvest in three channels
        const simulationBudget = reinvestment * 0.3;
        const dataAcquisitionBudget = reinvestment * 0.4;
        const brokerBudget = reinvestment * 0.3;

        const cycleResult: FlywheelCycle = {
            timestamp: new Date().toISOString(),
            revenue,
            cost,
            profit,
            reinvestment,
            allocation: {
                simulation: simulationBudget,
                dataAcquisition: dataAcquisitionBudget,
                broker: brokerBudget
            },
            intelligenceGrowth: this.estimateIntelligenceGrowth(),
            projectedNextRevenue: this.projectNextCycle(revenue, reinvestment),
            cumulativeProfitPool: this.profitPool
        };

        this.cycleHistory.push(cycleResult);
        return cycleResult;
    }

    private estimateIntelligenceGrowth(): number {
        if (this.cycleHistory.length < 2) return 0.05;
        const lastRevenue = this.cycleHistory[this.cycleHistory.length - 1].revenue;
        const prevRevenue = this.cycleHistory[this.cycleHistory.length - 2].revenue;
        return (lastRevenue - prevRevenue) / Math.max(prevRevenue, 1);
    }

    private projectNextCycle(currentRevenue: number, reinvestment: number): number {
        const intelligenceMultiplier = 1 + this.estimateIntelligenceGrowth();
        return currentRevenue * intelligenceMultiplier * (1 + reinvestment / currentRevenue * 0.5);
    }

    getCompoundAnnualGrowthRate(): number {
        if (this.cycleHistory.length < 2) return 0;
        const firstRevenue = this.cycleHistory[0].revenue;
        const lastRevenue = this.cycleHistory[this.cycleHistory.length - 1].revenue;
        const days = this.cycleHistory.length;
        return Math.pow(lastRevenue / Math.max(firstRevenue, 1), 365 / days) - 1;
    }

    getMetrics() {
        return {
            profitPool: this.profitPool,
            reinvestmentRate: this.reinvestmentRate,
            cycles: this.cycleHistory.length,
            cagr: this.getCompoundAnnualGrowthRate(),
            recentCycles: this.cycleHistory.slice(-5)
        };
    }
}

interface FlywheelCycle {
    timestamp: string;
    revenue: number;
    cost: number;
    profit: number;
    reinvestment: number;
    allocation: {
        simulation: number;
        dataAcquisition: number;
        broker: number;
    };
    intelligenceGrowth: number;
    projectedNextRevenue: number;
    cumulativeProfitPool: number;
}
