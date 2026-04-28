// lib/multi-tenant/client-manager.ts
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const CLIENTS_DIR = path.join(process.cwd(), 'data', 'clients');

export interface Client {
    id: string;
    name: string;
    email: string;
    apiKey: string;
    createdAt: string;
    config: {
        domain?: string;
        logo?: string;
        emailSender?: string;
    };
}

export async function ensureClientsDir() {
    await fs.mkdir(CLIENTS_DIR, { recursive: true });
}

export async function registerClient(name: string, email: string): Promise<Client> {
    await ensureClientsDir();
    const id = Date.now() + '-' + crypto.randomBytes(8).toString('hex');
    const apiKey = 'od_' + crypto.randomBytes(32).toString('hex');
    const client: Client = {
        id,
        name,
        email,
        apiKey,
        createdAt: new Date().toISOString(),
        config: {},
    };
    await fs.writeFile(path.join(CLIENTS_DIR, `${id}.json`), JSON.stringify(client, null, 2));
    // Criar pastas isoladas para memória, decisões, conteúdo
    const clientDataDir = path.join(process.cwd(), 'data', 'clients_data', id);
    await fs.mkdir(clientDataDir, { recursive: true });
    await fs.mkdir(path.join(clientDataDir, 'memory'), { recursive: true });
    await fs.mkdir(path.join(clientDataDir, 'decisions'), { recursive: true });
    await fs.mkdir(path.join(clientDataDir, 'content', 'blog'), { recursive: true });
    await fs.mkdir(path.join(clientDataDir, 'content', 'social'), { recursive: true });
    return client;
}

export async function getClientByApiKey(apiKey: string): Promise<Client | null> {
    await ensureClientsDir();
    const files = await fs.readdir(CLIENTS_DIR);
    for (const file of files) {
        if (file.endsWith('.json')) {
            const client = JSON.parse(await fs.readFile(path.join(CLIENTS_DIR, file), 'utf-8'));
            if (client.apiKey === apiKey) return client;
        }
    }
    return null;
}

export async function getClientDataPath(clientId: string, subPath: string = ''): Promise<string> {
    const base = path.join(process.cwd(), 'data', 'clients_data', clientId);
    if (subPath) return path.join(base, subPath);
    return base;
}
