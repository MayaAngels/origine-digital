// src/services/ads/googleAdsMock.js
export function createGoogleAdsCampaign({ name, budget, targeting, productId }) {
    return {
        id: google- + Date.now(),
        platform: 'google',
        name,
        budget,
        targeting,
        productId,
        status: 'PAUSED',
        createdAt: new Date().toISOString()
    };
}

export async function launchGoogleCampaign(campaign) {
    console.log([GOOGLE ADS MOCK] Lançando campanha: +campaign.name);
    campaign.status = 'ACTIVE';
    campaign.startDate = new Date().toISOString();
    return { success: true, campaign };
}

export async function getGoogleCampaignMetrics(campaignId) {
    // Simula métricas com ligeira melhoria ao longo do tempo
    const impressions = Math.floor(Math.random() * 1000) + 500;
    const clicks = Math.floor(impressions * (0.02 + Math.random() * 0.03));
    const conversions = Math.floor(clicks * (0.05 + Math.random() * 0.1));
    const cost = clicks * 0.5;
    const revenue = conversions * 29.99; // Preço médio do produto
    const roas = revenue / Math.max(cost, 1);
    return {
        campaignId,
        impressions,
        clicks,
        conversions,
        cost: parseFloat(cost.toFixed(2)),
        revenue: parseFloat(revenue.toFixed(2)),
        roas: parseFloat(roas.toFixed(2)),
        timestamp: new Date().toISOString()
    };
}

export async function optimizeGoogleBid(campaignId, targetRoas = 3.0) {
    const metrics = await getGoogleCampaignMetrics(campaignId);
    const adjustment = metrics.roas < targetRoas ? -0.1 : 0.05;
    console.log([GOOGLE ADS MOCK] Ajuste de lance:  + (adjustment > 0 ? '+' : '') + (adjustment * 100).toFixed(0) + '%');
    return { success: true, newBidModifier: parseFloat((1 + adjustment).toFixed(2)) };
}
