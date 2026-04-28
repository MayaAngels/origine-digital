// lib/intelligence-kernel/oversight-amplifier.ts
export type HumanCallback = (question: string) => Promise<boolean> | boolean;

export class OversightAmplifier {
    private human: HumanCallback;

    constructor(humanCallback?: HumanCallback) {
        this.human = humanCallback || (async (q) => {
            // Default: auto-approve unless in strict mode
            console.log('[Oversight] Auto-approving:', q.substring(0, 80));
            return true;
        });
    }

    async debate(proArgs: string, conArgs: string, issue: string): Promise<boolean> {
        console.log(`[Oversight] Debate on: ${issue}`);
        console.log(`  PRO: ${proArgs.substring(0, 100)}`);
        console.log(`  CON: ${conArgs.substring(0, 100)}`);
        return await this.human(`PRO: ${proArgs}\n\nCON: ${conArgs}`);
    }
}
