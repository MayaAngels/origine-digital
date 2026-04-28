// lib/intelligence/acim/loop.ts
import { observeCompetitors } from './observer';
import { analyzeCompetitorChanges } from './analyzer';
import { synthesizeImprovement } from './synthesizer';
import { validateAndDeploy } from './validator';

export async function runACIMCycle() {
    console.log('[ACIM] Cycle started.');
    const changes = await observeCompetitors();
    const analyzed = await analyzeCompetitorChanges(changes);
    const absorbable = analyzed.filter(a => a.recommendation === 'absorb');
    for (const item of absorbable) {
        const proposal = await synthesizeImprovement(item.capability, item.competitor);
        await validateAndDeploy(proposal);
    }
    console.log(`[ACIM] Cycle complete. Processed ${absorbable.length} improvements.`);
}
