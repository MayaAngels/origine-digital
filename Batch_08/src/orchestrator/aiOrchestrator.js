// src/orchestrator/aiOrchestrator.js
import fs from 'fs';

import { optimizeAllocation, gradeOrganism } from '../services/evolution/strategyOptimizer.js';
import { recordExperience } from '../services/memory/memoryEngine.js';
import path from 'path';

import { optimizeAllocation, gradeOrganism } from '../services/evolution/strategyOptimizer.js';
import { recordExperience } from '../services/memory/memoryEngine.js';
import { createGoogleAdsCampaign, launchGoogleCampaign, getGoogleCampaignMetrics } from '../services/ads/googleAdsMock.js';

import { optimizeAllocation, gradeOrganism } from '../services/evolution/strategyOptimizer.js';
import { recordExperience } from '../services/memory/memoryEngine.js';
import { createFacebookAdSet, publishFacebookAd, getFacebookAdMetrics } from '../services/ads/facebookAdsMock.js';

import { optimizeAllocation, gradeOrganism } from '../services/evolution/strategyOptimizer.js';
import { recordExperience } from '../services/memory/memoryEngine.js';
import { createEmailSequence, sendEmailCampaign } from '../services/email/emailMock.js';

import { optimizeAllocation, gradeOrganism } from '../services/evolution/strategyOptimizer.js';
import { recordExperience } from '../services/memory/memoryEngine.js';
import { generateSEOBlogPost, simulateOrganicTraffic } from '../services/seo/seoMock.js';

import { optimizeAllocation, gradeOrganism } from '../services/evolution/strategyOptimizer.js';
import { recordExperience } from '../services/memory/memoryEngine.js';
import { createSocialPost, publishSocialPost } from '../services/social/socialMock.js';

import { optimizeAllocation, gradeOrganism } from '../services/evolution/strategyOptimizer.js';
import { recordExperience } from '../services/memory/memoryEngine.js';
import { generateReferralLink, simulateReferralTraffic } from '../services/referral/referralMock.js';

import { optimizeAllocation, gradeOrganism } from '../services/evolution/strategyOptimizer.js';
import { recordExperience } from '../services/memory/memoryEngine.js';

const LOG_DIR = path.resolve('data/logs/orchestrator');
const DECISIONS_LOG = path.resolve('data/logs/decisions/decisions.json');

function logDecision(decision) {
    let log = [];
    if (fs.existsSync(DECISIONS_LOG)) {
        try { log = JSON.parse(fs.readFileSync(DECISIONS_LOG, 'utf-8')); } catch {}
    }
    log.push({ ...decision, timestamp: new Date().toISOString() });
    fs.writeFileSync(DECISIONS_LOG, JSON.stringify(log, null, 2));
}

async function runChannel(channelName, fn) {
    try {
        const start = Date.now();
        const result = await fn();
        const duration = Date.now() - start;
        logDecision({ channel: channelName, status: 'success', result, duration });
        return result;
    } catch (err) {
        logDecision({ channel: channelName, status: 'error', error: err.message });
        console.error(? Canal  + channelName +  falhou:  + err.message);
        return null;
    }
}

// Estratégia de alocação de orçamento baseada em ROAS histórico
function allocateBudget(total = 100) { return optimizeAllocation(); };
}

async function orchestrate() {
    console.log('\n?? AI ORCHESTRATOR EXECUTANDO...');
    const budget = allocateBudget(120);

    // Canal 1: Google Ads
    const googleCampaign = createGoogleAdsCampaign({ name: 'Orch Product Search', budget: budget.google, targeting: { keywords: ['autonomous ai'] }, productId: 'orch-001' });
    await launchGoogleCampaign(googleCampaign);
    const googleMetrics = await runChannel('google', () => getGoogleCampaignMetrics(googleCampaign.id));

    // Canal 2: Facebook Ads
    const fbAdSet = createFacebookAdSet({ name: 'Orch Lookalike', budget: budget.facebook, audience: { interests: ['AI business'] }, productId: 'orch-001' });
    await publishFacebookAd(fbAdSet);
    const fbMetrics = await runChannel('facebook', () => getFacebookAdMetrics(fbAdSet.id));

    // Canal 3: Email
    const emailSeq = createEmailSequence({ productId: 'orch-001', name: 'Welcome Series', template: 'onboarding' });
    const emailStats = await runChannel('email', () => sendEmailCampaign(emailSeq));

    // Canal 4: SEO Blog
    const blogPost = generateSEOBlogPost('autonomous revenue');
    const seoTraffic = await runChannel('seo', () => simulateOrganicTraffic(blogPost.id));

    // Canal 5: Social Media
    const socialPost = createSocialPost('twitter', 'Check out our latest AI-generated digital product!');
    const socialResult = await runChannel('social', () => publishSocialPost(socialPost));

    // Canal 6: Referral
    const refLink = generateReferralLink('user-001');
    const refTraffic = await runChannel('referral', () => simulateReferralTraffic(refLink.link));

    // Consolidação
    const totalRevenue = (googleMetrics?.revenue || 0) + (fbMetrics?.revenue || 0) +
                         (emailStats?.stats?.converted * 29.99 || 0) + (seoTraffic?.revenue || 0) +
                         (refTraffic?.revenue || 0);

    const totalCost = (googleMetrics?.cost || 0) + (fbMetrics?.cost || 0) + (budget.email + budget.seo + budget.referral);
    const totalROAS = totalRevenue / Math.max(totalCost, 1);

    const summary = {
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        totalCost: parseFloat(totalCost.toFixed(2)),
        totalROAS: parseFloat(totalROAS.toFixed(2)),
        channels: { google: googleMetrics, facebook: fbMetrics, email: emailStats, seo: seoTraffic, social: socialResult, referral: refTraffic }
    };

    logDecision({ type: 'orchestrator_summary', ...summary }
    recordExperience({ type: 'orbit_run', totalRevenue: summary.totalRevenue, totalCost: summary.totalCost, totalROAS: summary.totalROAS, channels: summary.channels }););
    console.log(?? Receita total: € + summary.totalRevenue +  | ROAS:  + summary.totalROAS);
    return summary;
}

// Iniciar loop autónomo
(async () => {
    await orchestrate();
    const intervalMin = parseInt(process.env.ORCHESTRATOR_INTERVAL_MINUTES) || 3;
    setInterval(orchestrate, intervalMin * 60 * 1000);
    console.log(? Orquestrador a correr a cada  + intervalMin +  minutos);
})();

