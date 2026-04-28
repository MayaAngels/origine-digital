// scripts/test-autonomy.js
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_BASE = 'http://localhost:3000';
const API_KEY = 'od_361a7304a5c236ffa7cb5db4713eb4768cd7bff706c33272e5c0f7bea2f4a325';
const headers = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' };

async function test() {
    console.log('🧪 Testando novas capacidades autónomas...\n');
    // 1. Tendências de mercado
    let res = await fetch(`${API_BASE}/api/market/trends`, { headers });
    let data = await res.json();
    console.log('✅ Tendências:', data.trends.slice(0,3).map(t => t.topic).join(', '));
    // 2. Gerar produto
    res = await fetch(`${API_BASE}/api/products/generate`, { method: 'POST', headers, body: JSON.stringify({ topic: 'Automação' }) });
    data = await res.json();
    console.log('✅ Produto gerado:', data.product.title);
    // 3. Listar produtos
    res = await fetch(`${API_BASE}/api/products/list`, { headers });
    data = await res.json();
    console.log(`✅ Total de produtos: ${data.products.length}`);
    // 4. Adicionar nota CRM
    res = await fetch(`${API_BASE}/api/crm/notes`, { method: 'POST', headers, body: JSON.stringify({ text: 'Cliente interessado em IA' }) });
    data = await res.json();
    console.log('✅ Nota CRM adicionada');
    // 5. Configuração
    res = await fetch(`${API_BASE}/api/client-config`, { method: 'POST', headers, body: JSON.stringify({ theme: 'dark', notifications: true }) });
    data = await res.json();
    console.log('✅ Configuração guardada');
}
test().catch(console.error);
