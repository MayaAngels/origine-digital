// scripts/social-worker.js
const fs = require('fs').promises;
const path = require('path');
const { publishToPlatform } = require('../lib/social/social-mock');

const PROJECT_PATH = path.join(__dirname, '..');
const INTERVAL = 60000; // verificar a cada minuto

async function getClients() {
    const clientsDir = path.join(PROJECT_PATH, 'data', 'clients');
    try {
        const files = await fs.readdir(clientsDir);
        const clients = [];
        for (const file of files) {
            if (file.endsWith('.json')) {
                const client = JSON.parse(await fs.readFile(path.join(clientsDir, file), 'utf-8'));
                clients.push(client);
            }
        }
        return clients;
    } catch { return []; }
}

async function getAccounts(clientId) {
    const accountsFile = path.join(PROJECT_PATH, 'data', 'clients_data', clientId, 'social', 'accounts.json');
    try { return JSON.parse(await fs.readFile(accountsFile, 'utf-8')); } catch { return []; }
}

async function processScheduled(clientId) {
    const scheduledDir = path.join(PROJECT_PATH, 'data', 'clients_data', clientId, 'social', 'scheduled');
    try { await fs.access(scheduledDir); } catch { return; }
    const files = await fs.readdir(scheduledDir);
    const now = new Date();
    const accounts = await getAccounts(clientId);
    const accountsMap = new Map(accounts.map(a => [a.id, a]));
    for (const file of files) {
        if (!file.endsWith('.json')) continue;
        const post = JSON.parse(await fs.readFile(path.join(scheduledDir, file), 'utf-8'));
        if (post.status !== 'pending') continue;
        const scheduledTime = new Date(post.scheduledAt);
        if (scheduledTime <= now) {
            const account = accountsMap.get(post.accountId);
            if (account) {
                const success = await publishToPlatform(account, post.content);
                post.status = success ? 'published' : 'failed';
                post.publishedAt = new Date().toISOString();
                if (!success) post.error = 'Simulated failure';
                // Move to published folder
                const publishedDir = path.join(PROJECT_PATH, 'data', 'clients_data', clientId, 'social', 'published');
                await fs.mkdir(publishedDir, { recursive: true });
                await fs.writeFile(path.join(publishedDir, `${post.id}.json`), JSON.stringify(post, null, 2));
                // Remove from scheduled
                await fs.unlink(path.join(scheduledDir, file));
            } else {
                console.log(`[WORKER] Conta ${post.accountId} não encontrada para cliente ${clientId}`);
            }
        }
    }
}

async function run() {
    console.log('[SOCIAL WORKER] Iniciado...');
    while (true) {
        try {
            const clients = await getClients();
            for (const client of clients) {
                await processScheduled(client.id);
            }
        } catch (err) {
            console.error('[SOCIAL WORKER] Erro:', err);
        }
        await new Promise(resolve => setTimeout(resolve, INTERVAL));
    }
}

run().catch(console.error);
