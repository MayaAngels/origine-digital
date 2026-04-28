// tests/week3-agents.test.js
import { generateKeywords } from '../src/services/mockSeoService.js';
import { createAdCampaign } from '../src/services/mockAdsService.js';

async function test() {
  console.log('🧪 Teste Week 3 - SEO Agent');
  const kw = await generateKeywords('digital marketing');
  console.log('Keywords:', kw.keywords.slice(0,3));

  console.log('🧪 Teste Week 3 - Ad Agent');
  const camp = await createAdCampaign({ name: 'Ebook Pro', score: 9 }, 200);
  console.log('Campanha:', camp.campaignId, 'Budget:', camp.budget);
}

test().then(() => console.log('✅ Week 3 agents funcionam!'));
