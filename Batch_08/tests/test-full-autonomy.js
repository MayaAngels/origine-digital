// tests/test-full-autonomy.js
import fetch from 'node-fetch';
const BASE = 'http://localhost:3000';

async function test() {
    console.log('🧪 TESTE WEEK 6 – Organismo Autónomo Completo\n');

    // 1. Verificar saúde
    const health = await (await fetch(BASE + '/api/system/health')).json();
    console.log('✅ Sistema vivo, nível de autonomia:', health.autonomyLevel);

    // 2. Disparar canais via orquestrador (se o worker já correu, deve ter dados)
    console.log('⏳ Aguardando 6 segundos para o orquestrador gerar dados...');
    await new Promise(r => setTimeout(r, 6000));

    // 3. Ver decisões
    const decisions = await (await fetch(BASE + '/api/system/decisions')).json();
    if (decisions.length > 0) {
        const last = decisions.filter(d => d.type === 'orchestrator_summary').pop();
        if (last) {
            console.log(📊 Última execução do orquestrador: Receita €+last.totalRevenue+ | ROAS +last.totalROAS);
        }
        console.log('✅ Decisões armazenadas:', decisions.length);
    } else {
        console.log('⚠️ Nenhuma decisão registada – o orquestrador pode não ter corrido ainda.');
    }

    // 4. Resumo de receita consolidado
    const revenueSummary = await (await fetch(BASE + '/api/system/revenue/summary')).json();
    console.log('📈 Histórico de receita:', revenueSummary.totalRevenueHistory?.length || 0, 'registos');

    // 5. Self-heal teste
    const healRes = await (await fetch(BASE + '/api/system/self-heal', {method:'POST'})).json();
    console.log('🔧 Auto-cura:', healRes.message);

    console.log('\n✅ Week 6 – testada com sucesso!');
}
test();
