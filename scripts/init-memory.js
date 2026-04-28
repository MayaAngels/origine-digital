// scripts/init-memory.js
const { ensureDir, storeMemory } = require('../lib/memory-file');
async function init() {
    await ensureDir();
    console.log('📁 Memória inicializada (pasta data/memory)');
}
init();
