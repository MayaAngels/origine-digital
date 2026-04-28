// src/workers/adEvolutionWorker.js
import { evolveAdPopulation } from '../services/mockGeneticAdService.js';
import fs from 'fs';
import path from 'path';

const ADS_DIR = path.join(process.cwd(), 'data', 'campaigns', 'ads');
if (!fs.existsSync(ADS_DIR)) fs.mkdirSync(ADS_DIR, { recursive: true });

export async function runAdEvolutionWorker() {
  console.log('[Ad Evolution Worker] A evoluir campanhas...');
  const files = fs.readdirSync(ADS_DIR).filter(f => f.endsWith('.json'));
  for (const file of files) {
    const campaign = JSON.parse(fs.readFileSync(path.join(ADS_DIR, file), 'utf-8'));
    if (campaign.adGroups && campaign.adGroups[0].ads.length > 0) {
      const evolvedAds = await evolveAdPopulation(campaign.adGroups[0].ads, 3);
      campaign.adGroups[0].ads = evolvedAds;
      campaign.geneticGeneration = (campaign.geneticGeneration || 0) + 1;
      fs.writeFileSync(path.join(ADS_DIR, file), JSON.stringify(campaign, null, 2));
      console.log(`[Ad Evolution] Campanha ${campaign.campaignId} evoluída para geração ${campaign.geneticGeneration}`);
    }
  }
}
