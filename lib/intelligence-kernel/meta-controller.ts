// lib/intelligence-kernel/meta-controller.ts (upgrade)
import { Homeostat } from './homeostat';
import { SelfModel } from './self-model';
import { OversightAmplifier } from './oversight-amplifier';
import { GoldenBenchmark } from './golden-benchmark';
import { computeEthicalVector } from './asmi/ethical-vector';
import { estimateATE } from './asmi/causal-oracle';

export class MetaController {
    public name: string;
    private wrappedFunc: (input: any) => Promise<any>;
    private homeostat: Homeostat;
    private selfModel: SelfModel;
    private oversight: OversightAmplifier;
    private golden: GoldenBenchmark;
    public performanceLog: number[] = [];

    constructor(
        name: string,
        func: (input: any) => Promise<any>,
        homeostat: Homeostat,
        selfModel: SelfModel,
        oversight: OversightAmplifier,
        golden: GoldenBenchmark
    ) {
        this.name = name;
        this.wrappedFunc = func;
        this.homeostat = homeostat;
        this.selfModel = selfModel;
        this.oversight = oversight;
        this.golden = golden;
    }

    async run(input: any): Promise<any> {
        // OBSERVE
        console.log(`[MetaController:${this.name}] OBSERVE`);

        // ORIENT
        this.homeostat.updateHealth();

        // --- ASMI ADDITION: Ethical Gate ---
        const actionType = input?.type || this.name;
        const ethical = computeEthicalVector({ type: actionType, ...input }, input);
        if (!ethical.allowed) {
            console.warn(`[MetaController:${this.name}] Ethical gate blocked action. Score=${ethical.score.toFixed(2)}`);
            return { error: 'Action blocked by ethical gate', ethical };
        }

        // --- ASMI ADDITION: Causal Gate ---
        const causal = estimateATE(actionType);
        if (!causal.allowed) {
            console.warn(`[MetaController:${this.name}] Causal gate blocked: ATE <= 0`);
            return { error: 'Action blocked by causal gate (negative expected effect)', causal };
        }

        // Existing health & oversight
        if (!this.homeostat.isHealthy) {
            const approved = await this.oversight.debate(
                'System health is degraded but still operational.',
                'Health below threshold. Recommend halt.',
                `Health: ${JSON.stringify(this.homeostat.health)}`
            );
            if (!approved) {
                console.warn(`[MetaController:${this.name}] Oversight denied. Aborting.`);
                return { error: 'Operation denied by oversight' };
            }
        }

        // Throttle content generation
        if (input && this.name.includes('content')) {
            if (!this.homeostat.registerContentCreation()) {
                return { error: 'Rate limit exceeded' };
            }
        }

        // ACT
        let result;
        try {
            result = await this.wrappedFunc(input);
        } catch (err: any) {
            console.error(`[MetaController:${this.name}] Error:`, err.message);
            this.homeostat.updateHealth(true);
            throw err;
        }

        // Post-mortem
        const score = await this.golden.evaluateSystem(async (inp) => result);
        this.performanceLog.push(score);
        if (score < 0.75) {
            console.warn(`[MetaController:${this.name}] Low benchmark score: ${score}. Triggering recovery.`);
            await this.triggerRecovery();
        }

        return result;
    }

    private async triggerRecovery() {
        const { exec } = await import('child_process');
        const scriptPath = './scripts/FixAndTestPhaseB.ps1';
        exec(`powershell -ExecutionPolicy Bypass -File "${scriptPath}"`, (error, stdout, stderr) => {
            if (error) console.error('[Recovery] Failed:', error.message);
            else console.log('[Recovery] Output:', stdout);
        });
    }
}
