// lib/intelligence/coherence-auditor/coherence-auditor.ts
// Self-Referential Coherence Auditor
// Watches every system decision and detects contradictions, drift, and hypocrisy.

interface Decision {
    id: string;
    timestamp: string;
    agent: string;           // which AI module made the decision
    action: string;          // what was decided
    context: string;         // why it was decided
    values: Record<string, number>;  // ethical/causal/reality scores at that moment
    outcome?: string;        // what actually happened
    outcomeTimestamp?: string;
}

interface Contradiction {
    id: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    decisionA: Decision;
    decisionB: Decision;
    description: string;     // human-readable explanation of the contradiction
    recommendation: string;  // suggested resolution
    detectedAt: string;
}

interface DriftAlert {
    metric: string;
    direction: 'increasing' | 'decreasing';
    rate: number;            // change per day
    threshold: number;       // when it becomes critical
    estimatedViolationDate: string;
}

interface AuditReport {
    timestamp: string;
    totalDecisions: number;
    contradictions: Contradiction[];
    driftAlerts: DriftAlert[];
    consistencyScore: number;  // 0-1
    recommendations: string[];
}

export class CoherenceAuditor {
    private decisions: Decision[] = [];
    private contradictions: Contradiction[] = [];
    private resolvedContradictions: string[] = []; // IDs of resolved

    // ============================================================
    // 1. RECORD A DECISION
    // ============================================================
    recordDecision(decision: Decision): void {
        this.decisions.push(decision);
        // Immediately check for contradictions with ALL past decisions
        this.detectContradictions(decision);
    }

    // ============================================================
    // 2. RECORD AN OUTCOME (Close the loop)
    // ============================================================
    recordOutcome(decisionId: string, outcome: string): void {
        const decision = this.decisions.find(d => d.id === decisionId);
        if (decision) {
            decision.outcome = outcome;
            decision.outcomeTimestamp = new Date().toISOString();
        }
    }

    // ============================================================
    // 3. DETECT CONTRADICTIONS (The AI Magic)
    // ============================================================
    private detectContradictions(newDecision: Decision): void {
        for (const pastDecision of this.decisions) {
            if (pastDecision.id === newDecision.id) continue;
            if (this.resolvedContradictions.includes(pastDecision.id + newDecision.id)) continue;

            // TYPE 1: Direct contradiction — same agent, opposite action
            if (pastDecision.agent === newDecision.agent &&
                this.areOppositeActions(pastDecision.action, newDecision.action)) {
                const daysApart = this.daysBetween(pastDecision.timestamp, newDecision.timestamp);
                if (daysApart < 90) { // within 3 months
                    this.contradictions.push({
                        id: `contra_${Date.now()}`,
                        severity: daysApart < 7 ? 'critical' : daysApart < 30 ? 'high' : 'medium',
                        decisionA: pastDecision,
                        decisionB: newDecision,
                        description: `${pastDecision.agent} decided "${pastDecision.action}" on ${pastDecision.timestamp.split('T')[0]} but then decided "${newDecision.action}" just ${daysApart} days later.`,
                        recommendation: `Re-evaluate ${newDecision.agent}'s decision criteria. Consider reverting to the earlier strategy if it had better outcomes.`,
                        detectedAt: new Date().toISOString(),
                    });
                }
            }

            // TYPE 2: Value drift — same type of decision, different ethical scoring
            if (pastDecision.agent === newDecision.agent &&
                pastDecision.action === newDecision.action &&
                pastDecision.values.ethicalScore !== undefined &&
                newDecision.values.ethicalScore !== undefined) {
                const drift = Math.abs(pastDecision.values.ethicalScore - newDecision.values.ethicalScore);
                if (drift > 0.3) {
                    this.contradictions.push({
                        id: `contra_${Date.now()}`,
                        severity: drift > 0.5 ? 'critical' : 'medium',
                        decisionA: pastDecision,
                        decisionB: newDecision,
                        description: `${pastDecision.agent}'s ethical score drifted from ${pastDecision.values.ethicalScore} to ${newDecision.values.ethicalScore} for the same type of decision.`,
                        recommendation: `Investigate why ${pastDecision.agent}'s ethical constraints are shifting. This may indicate value drift or external pressure.`,
                        detectedAt: new Date().toISOString(),
                    });
                }
            }

            // TYPE 3: Outcome contradiction — decision was made but outcome proved it wrong
            if (pastDecision.outcome && pastDecision.outcome === 'failure' &&
                newDecision.action === pastDecision.action &&
                newDecision.agent === pastDecision.agent) {
                this.contradictions.push({
                    id: `contra_${Date.now()}`,
                    severity: 'high',
                    decisionA: pastDecision,
                    decisionB: newDecision,
                    description: `${pastDecision.agent} is repeating "${pastDecision.action}" which previously FAILED on ${pastDecision.outcomeTimestamp?.split('T')[0]}.`,
                    recommendation: `BLOCK this decision. "${pastDecision.action}" already failed. Force ${pastDecision.agent} to explore alternatives.`,
                    detectedAt: new Date().toISOString(),
                });
            }

            // TYPE 4: Cross-agent conflict — two agents working against each other
            if (pastDecision.agent !== newDecision.agent &&
                this.areConflictingActions(pastDecision.action, newDecision.action)) {
                this.contradictions.push({
                    id: `contra_${Date.now()}`,
                    severity: 'medium',
                    decisionA: pastDecision,
                    decisionB: newDecision,
                    description: `${pastDecision.agent} is doing "${pastDecision.action}" while ${newDecision.agent} is doing "${newDecision.action}" — these may conflict.`,
                    recommendation: `Coordinate ${pastDecision.agent} and ${newDecision.agent}. Their actions should be complementary, not contradictory.`,
                    detectedAt: new Date().toISOString(),
                });
            }
        }
    }

    // ============================================================
    // 4. DETECT METRIC DRIFT (Silent degradation)
    // ============================================================
    detectDrift(metric: string, values: number[], threshold: number = 0.1): DriftAlert | null {
        if (values.length < 10) return null;

        const recent = values.slice(-10);
        const older = values.slice(-20, -10);
        if (older.length === 0) return null;

        const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
        const olderAvg = older.reduce((a, b) => a + b, 0) / older.length;
        const change = recentAvg - olderAvg;
        const rate = change / 10; // per data point

        if (Math.abs(change) > threshold) {
            const daysToViolation = rate !== 0 ?
                Math.abs((threshold * 2 - Math.abs(change)) / rate) * 10 : 999;
            const violationDate = new Date(Date.now() + daysToViolation * 86400000).toISOString().split('T')[0];

            return {
                metric,
                direction: change > 0 ? 'increasing' : 'decreasing',
                rate: Math.round(Math.abs(rate) * 1000) / 1000,
                threshold: threshold * 2,
                estimatedViolationDate: violationDate,
            };
        }

        return null;
    }

    // ============================================================
    // 5. GENERATE FULL AUDIT REPORT
    // ============================================================
    generateReport(): AuditReport {
        const openContradictions = this.contradictions.filter(
            c => !this.resolvedContradictions.includes(c.id)
        );

        // Calculate consistency score
        const criticalCount = openContradictions.filter(c => c.severity === 'critical').length;
        const highCount = openContradictions.filter(c => c.severity === 'high').length;
        const totalDecisions = this.decisions.length;
        const contradictionPenalty = (criticalCount * 0.3 + highCount * 0.15 + (openContradictions.length - criticalCount - highCount) * 0.05);
        const consistencyScore = Math.max(0, 1 - contradictionPenalty / Math.max(1, totalDecisions / 10));

        // Generate recommendations
        const recommendations: string[] = [];
        if (criticalCount > 0) {
            recommendations.push(`CRITICAL: ${criticalCount} critical contradictions detected. Immediate human review required.`);
        }
        if (highCount > 0) {
            recommendations.push(`HIGH: ${highCount} high-severity contradictions. Schedule review within 24 hours.`);
        }
        if (consistencyScore < 0.7) {
            recommendations.push('Consistency score below 0.7. Consider pausing autonomous decisions until contradictions are resolved.');
        }
        if (totalDecisions > 100 && openContradictions.length === 0) {
            recommendations.push('Excellent: 100+ decisions with zero contradictions. System is highly coherent.');
        }

        return {
            timestamp: new Date().toISOString(),
            totalDecisions,
            contradictions: openContradictions,
            driftAlerts: [],
            consistencyScore: Math.round(consistencyScore * 1000) / 1000,
            recommendations,
        };
    }

    // ============================================================
    // 6. RESOLVE A CONTRADICTION
    // ============================================================
    resolveContradiction(contradictionId: string, resolution: string): void {
        this.resolvedContradictions.push(contradictionId);
        const c = this.contradictions.find(x => x.id === contradictionId);
        if (c) {
            c.recommendation = `RESOLVED: ${resolution}`;
        }
    }

    // ============================================================
    // 7. GET TRUST SCORE (for external audit)
    // ============================================================
    getTrustScore(): { score: number; explanation: string } {
        const report = this.generateReport();
        const score = report.consistencyScore;
        let explanation = '';
        if (score >= 0.9) explanation = 'System is highly consistent. All decisions are self-coherent.';
        else if (score >= 0.7) explanation = 'System is mostly consistent. Minor contradictions detected.';
        else if (score >= 0.5) explanation = 'System has notable contradictions. Review recommended.';
        else explanation = 'System is incoherent. Autonomous decisions should be paused.';
        return { score, explanation };
    }

    // ============================================================
    // HELPER FUNCTIONS
    // ============================================================
    private areOppositeActions(a: string, b: string): boolean {
        const opposites: Record<string, string> = {
            'increase_price': 'decrease_price',
            'scale_up': 'scale_down',
            'aggressive': 'conservative',
            'launch': 'withdraw',
            'upsell': 'discount',
        };
        return opposites[a] === b || opposites[b] === a;
    }

    private areConflictingActions(a: string, b: string): boolean {
        const conflicts: Array<[string, string]> = [
            ['increase_price', 'discount'],
            ['scale_up', 'reduce_investment'],
            ['launch_product', 'decommission_product'],
        ];
        return conflicts.some(([x, y]) => (a === x && b === y) || (a === y && b === x));
    }

    private daysBetween(date1: string, date2: string): number {
        const d1 = new Date(date1).getTime();
        const d2 = new Date(date2).getTime();
        return Math.round(Math.abs(d2 - d1) / 86400000);
    }
}

// Singleton
export const coherenceAuditor = new CoherenceAuditor();
