// src/routes/api/ads/adRoutes.js
import { Router } from 'express';
import { createGoogleAdsCampaign, launchGoogleCampaign, getGoogleCampaignMetrics } from '../../../services/ads/googleAdsMock.js';
import { createFacebookAdSet, publishFacebookAd, getFacebookAdMetrics } from '../../../services/ads/facebookAdsMock.js';
import fs from 'fs';
import path from 'path';

const router = Router();

router.post('/google', (req, res) => {
    const campaign = createGoogleAdsCampaign(req.body);
    launchGoogleCampaign(campaign).then(c => res.json(c)).catch(e => res.status(500).json({ error: e.message }));
});

router.get('/google/:id/metrics', async (req, res) => {
    const m = await getGoogleCampaignMetrics(req.params.id);
    res.json(m);
});

router.post('/facebook', (req, res) => {
    const adSet = createFacebookAdSet(req.body);
    publishFacebookAd(adSet).then(a => res.json(a)).catch(e => res.status(500).json({ error: e.message }));
});

router.get('/facebook/:id/metrics', async (req, res) => {
    const m = await getFacebookAdMetrics(req.params.id);
    res.json(m);
});

router.get('/revenue/log', (req, res) => {
    const logPath = path.resolve('data/revenue/revenue_log.json');
    if (!fs.existsSync(logPath)) return res.json([]);
    res.json(JSON.parse(fs.readFileSync(logPath, 'utf-8')));
});

export default router;
