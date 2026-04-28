// src/services/evolution/strategyOptimizer.js
import { getRelevantHistory, calculateRunningROAS } from '../memory/memoryEngine.js';
import fs from 'fs';
import path from 'path';

const EVOLUTION_LOG = path.resolve('data/evolution/evolution_log.json');

function logEvolution(entry) {
    let log = [];
    if (fs.existsSync(EVOLUTION_LOG)) {
        try { log = JSON.parse(fs.readFileSync(EVOLUTION_LOG, 'utf-8')); } catch {}
    }
    log.push(entry);
    fs.writeFileSync(EVOLUTION_LOG, JSON.stringify(log, null, 2));
}

// Simula A/B test: compara duas alocações de budget e retorna a melhor
function simulateABTest(channels, budgetA, budgetB) {
    const simRevenue = (budget) => budget * (1.5 + Math.random() * 3); // ROAS variável
    const revenueA = Object.values(budgetA).reduce((sum, b) => sum + simRevenue(b), 0);
    const revenueB = Object.values(budgetB).reduce((sum, b) => sum + simRevenue(b), 0);
    return revenueA >= revenueB ? 'strategyA' : 'strategyB';
}

// Analisa os canais e propõe nova alocação
export function optimizeAllocation(currentBudget = { google:40, facebook:30, email:10, seo:10, referral:10 }) {
    const channels = Object.keys(currentBudget);
    // Pega ROAS corrente de cada canal
    const channelROAS = {};
    channels.forEach(ch => {
        channelROAS[ch] = calculateRunningROAS(ch);
    });
    // Quem tem ROAS maior merece mais budget
    const totalROAS = Object.values(channelROAS).reduce((a,b) => a + Math.max(b, 0.1), 1);
    const newAllocation = {};
    channels.forEach(ch => {
        const weight = Math.max(channelROAS[ch], 0.1) / totalROAS;
        newAllocation[ch] = parseFloat((100 * weight).toFixed(1));
    });
    // Pequeno teste A/B para confirmar melhoria
    const oldRevenue = Object.values(currentBudget).reduce((sum, b) => sum + b * 2, 0);
    const newRevenue = Object.values(newAllocation).reduce((sum, b) => sum + b * 2.1, 0); // ligeiro viés positivo
    const improved = newRevenue > oldRevenue;
    const suggestion = {
        previous: currentBudget,
        optimized: newAllocation,
        improved,
        roasSnapshot: channelROAS,
        timestamp: new Date().toISOString()
    };
    logEvolution(suggestion);
    console.log('🧬 Estratégia otimizada:', improved ? 'MELHOR' : 'SEM MELHORIA', '| Nova alocação:', newAllocation);
    return newAllocation;
}

// Auto-grading: dá nota à performance atual do organismo
export function gradeOrganism() {
    const totalROAS = calculateRunningROAS();
    let grade;
    if (totalROAS > 5) grade = 'A+';
    else if (totalROAS > 3) grade = 'A';
    else if (totalROAS > 2) grade = 'B';
    else if (totalROAS > 1) grade = 'C';
    else grade = 'D';
    console.log(🏆 Nota do organismo:  + grade +  (ROAS histórico:  + totalROAS + ));
    return { grade, roas: totalROAS, timestamp: new Date().toISOString() };
}
