// src/scheduler/autonomousScheduler.js
import { startMarketingScheduler } from './marketingScheduler.js';
import { runRevenueWorker } from '@/workers/revenueWorker';
import { runAdEvolutionWorker } from '@/workers/adEvolutionWorker';

export function startAutonomousScheduler() {
  startMarketingScheduler(); // já inclui SEO + Ads workers
  console.log('[Autonomous Scheduler] Revenue e Ad Evolution adicionados.');

  // Revenue a cada 20 minutos
  setInterval(runRevenueWorker, 20 * 60 * 1000);
  // Evolução de anúncios a cada 40 minutos
  setInterval(runAdEvolutionWorker, 40 * 60 * 1000);

  // Primeira execução
  runRevenueWorker();
  runAdEvolutionWorker();
}
