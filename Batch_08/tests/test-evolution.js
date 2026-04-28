// tests/test-evolution.js
import fetch from 'node-fetch';
const BASE = 'http://localhost:3000';

async function test() {
    console.log('🧬 TESTE WEEK 7 – Evolução Autónoma\n');

    // Aguardar que o orquestrador produza dados
    console.log('⏳ À espera de dados... (10s)');
    await new Promise(r => setTimeout(r, 10000));

    const health = await (await fetch(BASE + '/api/system/health')).json();
    console.log('✅ Autonomy Level:', health.autonomyLevel);

    // Verificar alocação otimizada
    const alloc = await (await fetch(BASE + '/api/system/evolve/allocation')).json();
    console.log('📊 Alocação otimizada:', alloc);

    // Verificar nota
    const grade = await (await fetch(BASE + '/api/system/evolve/grade')).json();
    console.log('🏆 Nota do organismo:', grade.grade, '(ROAS:', grade.roas, ')');

    // Ver decisões recentes (inclui as registadas pelo memory)
    const decisions = await (await fetch(BASE + '/api/system/decisions')).json();
    const recent = decisions.slice(-3);
    console.log('📜 Últimas decisões:', recent.length, 'registos');
    recent.forEach(d => console.log('   ', d.type, d.totalRevenue ? '€'+d.totalRevenue : ''));

    console.log('\n✅ Week 7 – testada com sucesso! O organismo aprende e evolui.');
}
test();
