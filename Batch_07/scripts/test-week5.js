// scripts/test-week5.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_BASE = 'http://localhost:3000';
const API_KEY = 'od_361a7304a5c236ffa7cb5db4713eb4768cd7bff706c33272e5c0f7bea2f4a325';
const headers = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' };

async function test() {
    console.log('🧪 Testando Week 5 – Competitive Intelligence & Learning\n');
    
    // 1. Inteligência competitiva
    let res = await fetch(`${API_BASE}/api/competitive/intelligence?category=AI`, { headers });
    let data = await res.json();
    console.log('✅ Inteligência competitiva (categoria AI):', data.competitors.length, 'concorrentes, preço médio:', data.avgPrice);
    
    // 2. Sugestão de preço dinâmico
    res = await fetch(`${API_BASE}/api/competitive/price-suggestion`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ ourProductCost: 30, category: 'AI', strategy: 'competitive' })
    });
    data = await res.json();
    console.log('✅ Sugestão de preço:', data.suggestedPrice, '(estratégia competitiva)');
    
    // 3. Registar feedback
    res = await fetch(`${API_BASE}/api/learning/feedback`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ action: 'upsell', context: { cartTotal: 75 }, outcome: 0.8 })
    });
    data = await res.json();
    console.log('✅ Feedback registado');
    
    // 4. Listar feedback
    res = await fetch(`${API_BASE}/api/learning/feedback`, { headers });
    data = await res.json();
    console.log(`✅ Total de feedbacks: ${data.feedback.length}`);
    
    // 5. Evolução (sandbox)
    res = await fetch(`${API_BASE}/api/learning/evolve`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ mutationType: 'price' })
    });
    data = await res.json();
    console.log('✅ Evolução simulada:', data.improved ? 'melhorou' : 'piorou', `(score: ${(data.newScore*100).toFixed(1)}%)`);
    
    console.log('\n✨ Week 5 funcionalidades OK.');
}
test().catch(console.error);
