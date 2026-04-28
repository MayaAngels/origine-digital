// src/workers/revenue/revenueLoopWorker.js
import { createGoogleAdsCampaign, launchGoogleCampaign, getGoogleCampaignMetrics, optimizeGoogleBid } from '../../services/ads/googleAdsMock.js';
import { createFacebookAdSet, publishFacebookAd, getFacebookAdMetrics, autoOptimizeFacebookAudience } from '../../services/ads/facebookAdsMock.js';
import fs from 'fs';
import path from 'path';

const BUDGET = parseFloat(process.env.SIMULATED_BUDGET) || 100;
const TARGET_ROAS = 3.0;
const REVENUE_FILE = path.resolve('data/revenue/revenue_log.json');

function logRevenue(entry) {
    let log = [];
    if (fs.existsSync(REVENUE_FILE)) {
        try { log = JSON.parse(fs.readFileSync(REVENUE_FILE, 'utf-8')); } catch {}
    }
    log.push(entry);
    fs.writeFileSync(REVENUE_FILE, JSON.stringify(log, null, 2));
}

async function runLoop() {
    console.log('♻️  Revenue Loop execução iniciada...');

    // Criação de campanhas se necessário
    const googleCampaign = createGoogleAdsCampaign({
        name: 'Product Launch - Search',
        budget: BUDGET / 2,
        targeting: { keywords: ['digital product', 'AI tools'] },
        productId: 'mock-product-001'
    });
    await launchGoogleCampaign(googleCampaign);

    const fbAdSet = createFacebookAdSet({
        name: 'Retargeting - Lookalike',
        budget: BUDGET / 2,
        audience: { interests: ['AI', 'business automation'] },
        productId: 'mock-product-001'
    });
    await publishFacebookAd(fbAdSet);

    // Aguardar "período" simulado
    await new Promise(r => setTimeout(r, 1500));

    // Obter métricas
    const googleMetrics = await getGoogleCampaignMetrics(googleCampaign.id);
    const fbMetrics = await getFacebookAdMetrics(fbAdSet.id);

    console.log(📊 Google ROAS: +googleMetrics.roas);
    console.log(📊 Facebook ROAS: +fbMetrics.roas);

    // Otimizações automáticas
    await optimizeGoogleBid(googleCampaign.id, TARGET_ROAS);
    await autoOptimizeFacebookAudience(fbAdSet.id);

    const totalRevenue = googleMetrics.revenue + fbMetrics.revenue;
    const totalCost = googleMetrics.cost + fbMetrics.cost;
    const totalRoas = totalRevenue / Math.max(totalCost, 1);

    const logEntry = {
        timestamp: new Date().toISOString(),
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        totalCost: parseFloat(totalCost.toFixed(2)),
        totalRoas: parseFloat(totalRoas.toFixed(2)),
        google: googleMetrics,
        facebook: fbMetrics
    };
    logRevenue(logEntry);
    console.log(💰 Receita total simulada: €+totalRevenue.toFixed(2));
    console.log(📈 ROAS combinado: +totalRoas.toFixed(2));
    return logEntry;
}

// Execução imediata e agendamento
(async function start() {
    await runLoop();
    setInterval(runLoop, 120000); // repete a cada 2 minutos (em produção seria mais longo)
    console.log('🔄 Revenue loop running every 2 minutes...');
})();
