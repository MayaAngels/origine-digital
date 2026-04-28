// src/workers/adWorker.js
import { createAdCampaign, runABTest } from '../services/mockAdsService.js';
import fs from 'fs';
import path from 'path';

const ADS_DIR = path.join(process.cwd(), 'data', 'campaigns', 'ads');
if (!fs.existsSync(ADS_DIR)) fs.mkdirSync(ADS_DIR, { recursive: true });

export async function runAdWorker() {
  console.log('[Ad Worker] A criar campanhas para produtos com score elevado...');
  const products = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'products.json'), 'utf-8'));
  const highPerforming = products.filter(p => p.score > 7);
  for (const product of highPerforming) {
    const campaign = await createAdCampaign(product, 150);
    const file = path.join(ADS_DIR, `campaign-${product.id}.json`);
    fs.writeFileSync(file, JSON.stringify(campaign, null, 2));
    console.log(`[Ad Worker] Campanha simulada iniciada para ${product.name}`);
  }
  // A/B testing simulado
  const campaigns = fs.readdirSync(ADS_DIR).filter(f => f.endsWith('.json'));
  for (const file of campaigns) {
    const campaign = JSON.parse(fs.readFileSync(path.join(ADS_DIR, file), 'utf-8'));
    const testResult = await runABTest(campaign.campaignId);
    campaign.abTest = testResult;
    fs.writeFileSync(path.join(ADS_DIR, file), JSON.stringify(campaign, null, 2));
    console.log(`[Ad Worker] A/B test concluído para ${campaign.campaignId}`);
  }
  console.log('[Ad Worker] Ciclo concluído.');
}
