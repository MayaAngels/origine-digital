// src/workers/revenueWorker.js
import { getCurrentMetrics, generateForecast, autoScaleBudget } from '../services/mockRevenueService.js';
import fs from 'fs';
import path from 'path';

const REPORT_DIR = path.join(process.cwd(), 'data', 'reports', 'revenue');
if (!fs.existsSync(REPORT_DIR)) fs.mkdirSync(REPORT_DIR, { recursive: true });

export async function runRevenueWorker() {
  console.log('[Revenue Worker] A gerar relatório financeiro...');
  const metrics = await getCurrentMetrics();
  const forecast = await generateForecast();
  const report = {
    timestamp: new Date().toISOString(),
    metrics,
    forecast
  };
  const file = path.join(REPORT_DIR, `report-${Date.now()}.json`);
  fs.writeFileSync(file, JSON.stringify(report, null, 2));
  console.log(`[Revenue Worker] Relatório guardado: ${file}`);
  console.log(`[Revenue Worker] Lucro atual: $${metrics.profit} (margem ${metrics.margin}%)`);
}
