// lib/learning/learning-mock.ts
import fs from 'fs/promises';
import path from 'path';

export interface FeedbackEntry {
    id: string;
    action: string;
    context: any;
    outcome: number; // 0-1 (sucesso/ROI)
    timestamp: string;
}

const FEEDBACK_DIR = path.join(process.cwd(), 'data', 'learning', 'feedback');
const MODEL_PATH = path.join(process.cwd(), 'data', 'learning', 'models', 'weights.json');

export async function recordFeedback(action: string, context: any, outcome: number): Promise<void> {
    await fs.mkdir(FEEDBACK_DIR, { recursive: true });
    const id = Date.now() + '-' + Math.random().toString(36).substring(2, 8);
    const entry: FeedbackEntry = { id, action, context, outcome, timestamp: new Date().toISOString() };
    await fs.writeFile(path.join(FEEDBACK_DIR, `${id}.json`), JSON.stringify(entry, null, 2));
    console.log(`[LEARNING] Feedback registado: ${action} -> outcome ${outcome}`);
    // Actualizar modelo (simulado)
    await updateModel(action, outcome);
}

async function updateModel(action: string, outcome: number): Promise<void> {
    let weights: Record<string, number> = {};
    try {
        const data = await fs.readFile(MODEL_PATH, 'utf-8');
        weights = JSON.parse(data);
    } catch {}
    // Atualização simples: média móvel
    const current = weights[action] || 0.5;
    weights[action] = current * 0.9 + outcome * 0.1;
    await fs.mkdir(path.dirname(MODEL_PATH), { recursive: true });
    await fs.writeFile(MODEL_PATH, JSON.stringify(weights, null, 2));
}

export async function getExpectedOutcome(action: string): Promise<number> {
    try {
        const data = await fs.readFile(MODEL_PATH, 'utf-8');
        const weights = JSON.parse(data);
        return weights[action] || 0.5;
    } catch { return 0.5; }
}

export async function getPastFeedback(limit: number = 50): Promise<FeedbackEntry[]> {
    await fs.mkdir(FEEDBACK_DIR, { recursive: true });
    const files = await fs.readdir(FEEDBACK_DIR);
    const entries = [];
    for (const file of files) {
        if (file.endsWith('.json')) {
            const entry = JSON.parse(await fs.readFile(path.join(FEEDBACK_DIR, file), 'utf-8'));
            entries.push(entry);
        }
    }
    entries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return entries.slice(0, limit);
}
