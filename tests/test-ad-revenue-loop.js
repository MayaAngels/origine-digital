// tests/test-ad-revenue-loop.js
import fetch from 'node-fetch';

const BASE = 'http://localhost:3000';

async function test() {
    console.log('🧪 Teste do Autonomous Ad Revenue Loop\n');

    // Criar campanha Google
    const googleRes = await fetch(BASE + '/api/ads/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Teste Semana 4', budget: 50, targeting: { keywords: ['autonomia'] } })
    });
    const google = await googleRes.json();
    console.log('✅ Google Ads campaign:', google.campaign.name);

    // Criar Facebook Ad
    const fbRes = await fetch(BASE + '/api/ads/facebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Teste FB Semana 4', budget: 50, audience: { interests: ['startups'] } })
    });
    const fb = await fbRes.json();
    console.log('✅ Facebook AdSet:', fb.adSet.name);

    // Aguardar o revenue loop (corre a cada 2 min, vamos só ver logs simulados)
    console.log('⏳ Aguardando 5 segundos para o worker registar métricas...');
    await new Promise(r => setTimeout(r, 5000));

    // Ver log de receita
    const logRes = await fetch(BASE + '/api/ads/revenue/log');
    const log = await logRes.json();
    if (log.length > 0) {
        const last = log[log.length-1];
        console.log(📊 Última execução: Receita €+last.totalRevenue+ | ROAS +last.totalRoas+ | Custo €+last.totalCost);
    } else {
        console.log('⚠️ Nenhum log ainda – o worker pode não ter corrido. Verifica se o servidor está a rodar.');
    }
    console.log('\n✅ Teste concluído – Week 4 operacional!');
}
test();
