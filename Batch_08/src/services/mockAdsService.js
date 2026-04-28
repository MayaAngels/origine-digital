// src/services/mockAdsService.js
export async function createAdCampaign(product, budget = 100) {
  return {
    campaignId: `mock-camp-${Date.now()}`,
    platform: 'google',
    status: 'active',
    budget,
    adGroups: [{
      id: 'adg-1',
      ads: [
        { headline: `Buy ${product.name} Now`, description: `Best deals on ${product.name}. Limited offer.` },
        { headline: `${product.name} - Top Quality`, description: `Save 20% today. Free shipping.` }
      ]
    }],
    estimatedReach: Math.floor(budget * 100),
    costPerClick: (budget / 200).toFixed(2)
  };
}

export async function runABTest(campaignId) {
  return {
    winnerAd: 'ad-2',
    improvement: '12% CTR increase',
    suggestion: 'Use urgency words in headline'
  };
}
