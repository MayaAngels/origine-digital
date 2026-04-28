// src/services/ads/facebookAdsMock.js
export function createFacebookAdSet({ name, budget, audience, productId }) {
    return {
        id: b- + Date.now(),
        platform: 'facebook',
        name,
        budget,
        audience,
        productId,
        status: 'DRAFT',
        createdAt: new Date().toISOString()
    };
}

export async function publishFacebookAd(adSet) {
    console.log([FACEBOOK ADS MOCK] A publicar conjunto de anúncios: +adSet.name);
    adSet.status = 'ACTIVE';
    adSet.startDate = new Date().toISOString();
    return { success: true, adSet };
}

export async function getFacebookAdMetrics(adSetId) {
    const reach = Math.floor(Math.random() * 2000) + 1000;
    const clicks = Math.floor(reach * (0.01 + Math.random() * 0.02));
    const conversions = Math.floor(clicks * (0.06 + Math.random() * 0.08));
    const cost = clicks * 0.35;
    const revenue = conversions * 29.99;
    const roas = revenue / Math.max(cost, 1);
    return {
        adSetId,
        reach,
        clicks,
        conversions,
        cost: parseFloat(cost.toFixed(2)),
        revenue: parseFloat(revenue.toFixed(2)),
        roas: parseFloat(roas.toFixed(2)),
        timestamp: new Date().toISOString()
    };
}

export async function autoOptimizeFacebookAudience(adSetId) {
    console.log([FACEBOOK ADS MOCK] A refinar audiência para  + adSetId);
    return { success: true, newAudienceSize: Math.floor(Math.random() * 50000) + 100000 };
}
