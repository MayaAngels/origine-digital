// scripts/queue-worker.js (atualizado)
const fs = require('fs').promises;
const path = require('path');
const QUEUE_DIR = path.join(process.cwd(), 'data', 'queue');

async function processQueue() {
    try { await fs.access(QUEUE_DIR); } catch { return; }
    const files = await fs.readdir(QUEUE_DIR);
    for (const file of files) {
        if (!file.endsWith('.json')) continue;
        const task = JSON.parse(await fs.readFile(path.join(QUEUE_DIR, file), 'utf-8'));
        console.log(`Processing task: ${task.type}`, task.payload);
        if (task.type === 'send_email') {
            // Simular envio de email (pode chamar o endpoint real brevemente)
            console.log(`Enviando email para ${task.payload.to}...`);
        }
        // Após processar, remover
        await fs.unlink(path.join(QUEUE_DIR, file));
    }
}
setInterval(processQueue, 30000);
console.log('Queue worker started (Fase B ready)');
