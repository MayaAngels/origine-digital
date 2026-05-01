// lib/intelligence/constraint-hierarchy/constraint-hierarchy.ts
// 5-layer constraint system for ORIGINE.DIGITAL

export type ConstraintLayer = 'SURVIVAL' | 'SAFETY' | 'ETHICS' | 'STABILITY' | 'ECONOMIC';

export interface ActionVerdict {
    allowed: boolean;
    blockedBy?: ConstraintLayer;
    violations: string[];
    score: number;
}

export class ConstraintHierarchy {
    private rules: Map<string, { layer: ConstraintLayer; check: (action: any, ctx: any) => string[] }> = new Map();

    constructor() {
        // SURVIVAL — Non-negotiable
        this.rules.set('NO_SELF_DESTRUCT', {
            layer: 'SURVIVAL',
            check: (a, ctx) => a.type === 'DELETE_SYSTEM' ? ['Cannot delete system files'] : [],
        });
        this.rules.set('NO_DATA_LOSS', {
            layer: 'SURVIVAL',
            check: (a, ctx) => (a.type === 'DELETE_DATA' && !ctx.hasBackup) ? ['Data deletion without backup'] : [],
        });

        // SAFETY — Non-negotiable
        this.rules.set('NO_CUSTOMER_HARM', {
            layer: 'SAFETY',
            check: (a, ctx) => (a.type === 'SEND_MESSAGE' && ctx.content?.includes('threat')) ? ['Harmful content detected'] : [],
        });
        this.rules.set('NO_PRIVACY_VIOLATION', {
            layer: 'SAFETY',
            check: (a, ctx) => (a.type === 'EXPORT_DATA' && ctx.sensitive && !ctx.consent) ? ['Privacy violation'] : [],
        });

        // ETHICS — Nearly non-negotiable
        this.rules.set('NO_MANIPULATION', {
            layer: 'ETHICS',
            check: (a, ctx) => (a.type === 'CAMPAIGN' && ctx.content?.includes('fake urgency')) ? ['Manipulative pattern'] : [],
        });
        this.rules.set('NO_DARK_PATTERNS', {
            layer: 'ETHICS',
            check: (a, ctx) => (a.type === 'UI_CHANGE' && ctx.hasDarkPattern) ? ['Dark pattern detected'] : [],
        });

        // STABILITY — Negotiable
        this.rules.set('MAX_MUTATION_RATE', {
            layer: 'STABILITY',
            check: (a, ctx) => (ctx.mutationsLastHour > 5) ? [`Too many mutations: ${ctx.mutationsLastHour}/hour`] : [],
        });
        this.rules.set('MAX_BUDGET_VOLATILITY', {
            layer: 'STABILITY',
            check: (a, ctx) => {
                if (a.type === 'BUDGET_CHANGE') {
                    const change = Math.abs(ctx.oldBudget - ctx.newBudget) / Math.max(1, ctx.oldBudget) * 100;
                    return change > 20 ? [`Budget change too large: ${change.toFixed(0)}%`] : [];
                }
                return [];
            },
        });

        // ECONOMIC — Negotiable
        this.rules.set('MIN_MARGIN', {
            layer: 'ECONOMIC',
            check: (a, ctx) => (a.type === 'DISCOUNT' && ctx.projectedMargin < 10) ? [`Margin too low: ${ctx.projectedMargin}%`] : [],
        });
        this.rules.set('MAX_DISCOUNT', {
            layer: 'ECONOMIC',
            check: (a, ctx) => (a.type === 'DISCOUNT' && ctx.percentage > 30 && !ctx.specialApproval) ? [`Discount too high: ${ctx.percentage}%`] : [],
        });
    }

    validate(action: any, context: any = {}): ActionVerdict {
        const violations: string[] = [];
        const layers: ConstraintLayer[] = ['SURVIVAL', 'SAFETY', 'ETHICS', 'STABILITY', 'ECONOMIC'];

        for (const layer of layers) {
            const layerRules = Array.from(this.rules.values()).filter(r => r.layer === layer);
            for (const rule of layerRules) {
                const result = rule.check(action, context);
                violations.push(...result);
                if (result.length > 0 && (layer === 'SURVIVAL' || layer === 'SAFETY')) {
                    return { allowed: false, blockedBy: layer, violations, score: 0 };
                }
            }
        }

        const score = Math.max(0, 100 - violations.length * 10);
        return { allowed: violations.length === 0 || !violations.some(v => v.length > 0), violations, score };
    }
}

export const constraintHierarchy = new ConstraintHierarchy();
