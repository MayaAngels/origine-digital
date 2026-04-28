// tests/week8-full-test.js
import { getCurrentMetrics } from '../src/services/mockRevenueService.js';
import { evolveAdPopulation } from '../src/services/mockGeneticAdService.js';

async function test() {
  const metrics = await getCurrentMetrics();
  console.log('📊 Revenue:', metrics.revenue, 'Profit:', metrics.profit);

  const ads = [
    { headline: 'Best AI Course', description: 'Learn AI now.' },
    { headline: 'AI Mastery', description: 'Become an expert.' }
  ];
  const evolved = await evolveAdPopulation(ads, 2);
  console.log('🧬 Evolved ads:', evolved[0].headline);
}
test().then(() => console.log('✅ Week 8 funcionam!'));
