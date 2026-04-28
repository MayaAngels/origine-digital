// scripts/init-db.js
const fs = require('fs').promises;
const path = require('path');

async function init() {
    const memoryDir = path.join(process.cwd(), 'data', 'memory');
    await fs.mkdir(memoryDir, { recursive: true });
    const exampleMemories = [
        'Cliente comprou após desconto de 10%',
        'Email de follow-up aumentou recompra em 15%',
        'Preço dinâmico entre 20-30€ teve melhor conversão',
    ];
    for (const mem of exampleMemories) {
        const id = Date.now() + '-' + Math.random().toString(36).substring(2, 8);
        const file = path.join(memoryDir, `${id}.json`);
        const embedding = Array.from({ length: 1536 }, () => Math.random() * 2 - 1);
        const data = { id, content: mem, embedding, metadata: { source: 'init' }, createdAt: new Date().toISOString() };
        await fs.writeFile(file, JSON.stringify(data, null, 2));
    }
    console.log('✅ Dados iniciais inseridos');
}
init().catch(console.error);
