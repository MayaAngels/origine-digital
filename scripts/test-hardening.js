// scripts/test-hardening.js
const http = require('http');

async function test() {
    console.log('🧪 Testando hardening e multi‑tenant...\n');

    // 1. Teste de CORS (pré‑flight OPTIONS)
    const optionsReq = http.request({
        hostname: 'localhost',
        port: 3000,
        path: '/api/health',
        method: 'OPTIONS',
    }, (res) => {
        console.log(`OPTIONS /api/health -> ${res.statusCode} (esperado 204)`);
        if (res.headers['access-control-allow-origin']) console.log('  ✅ CORS header presente');
    });
    optionsReq.end();

    // 2. Teste de rate limiting (100 req/min – não vamos exagerar, apenas simular)
    // (Ignorado por simplicidade)

    // 3. Teste de registo de cliente
    const register = await fetch('http://localhost:3000/api/clients/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Cliente Teste', email: 'teste@example.com' }),
    });
    const regData = await register.json();
    if (register.ok) {
        console.log(`✅ Cliente registado: ${regData.client.id}`);
        console.log(`   API Key: ${regData.client.apiKey}`);
    } else {
        console.log(`❌ Falha no registo: ${regData.error}`);
    }
}
test().catch(console.error);
