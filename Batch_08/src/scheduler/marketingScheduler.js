// src/scheduler/marketingScheduler.js
import { runSeoWorker } from '@/workers/seoWorker';
import { runAdWorker } from '@/workers/adWorker';

export function startMarketingScheduler() {
  console.log('[Scheduler] Agentes de marketing autónomo iniciados.');
  // Correr a cada 30 minutos (simulação)
  setInterval(async () => {
    console.log('[Scheduler] Ciclo de marketing...');
    await runSeoWorker();
    await runAdWorker();
  }, 30 * 60 * 1000);
  // Executar imediatamente na primeira vez
  runSeoWorker();
  runAdWorker();
}
