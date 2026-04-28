// src/routes/api/system/systemRoutes.js
import { Router } from 'express';

import { optimizeAllocation, gradeOrganism } from '../../../services/evolution/strategyOptimizer.js';
import fs from 'fs';

import { optimizeAllocation, gradeOrganism } from '../../../services/evolution/strategyOptimizer.js';
import path from 'path';

import { optimizeAllocation, gradeOrganism } from '../../../services/evolution/strategyOptimizer.js';

const router = Router();

router.get('/health', (req, res) => {
    res.json({
        status: 'alive',
        autonomyLevel: process.env.AUTONOMY_LEVEL || '6',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        timestamp: new Date().toISOString()
    });
});

router.get('/decisions', (req, res) => {
    const logPath = path.resolve('data/logs/decisions/decisions.json');
    if (!fs.existsSync(logPath)) return res.json([]);
    res.json(JSON.parse(fs.readFileSync(logPath, 'utf-8')));
});

router.get('/revenue/summary', (req, res) => {
    const revenueLog = path.resolve('data/revenue/revenue_log.json');
    const decisionsLog = path.resolve('data/logs/decisions/decisions.json');
    let rev = [], dec = [];
    if (fs.existsSync(revenueLog)) rev = JSON.parse(fs.readFileSync(revenueLog, 'utf-8'));
    if (fs.existsSync(decisionsLog)) dec = JSON.parse(fs.readFileSync(decisionsLog, 'utf-8'));
    const lastOrch = dec.filter(d => d.type === 'orchestrator_summary').pop() || {};
    res.json({
        totalRevenueHistory: rev,
        lastOrchestratorRun: lastOrch,
        organismState: 'optimal'
    });
});

router.post('/self-heal', (req, res) => {
    console.log('[SELF-HEAL] Verificação iniciada...');
    // Simula correção de erro
    res.json({ healed: true, message: 'Sistema recalibrado.' });
});

export default router;

router.get('/evolve/allocation', (req, res) => {
    const newAlloc = optimizeAllocation();
    res.json(newAlloc);
});

router.get('/evolve/grade', (req, res) => {
    const grade = gradeOrganism();
    res.json(grade);
});
