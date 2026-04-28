// app/api/learning/evolve/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { getClientByApiKey } from '../../../lib/multi-tenant/client-manager';
import { getExpectedOutcome } from '../../../lib/learning/learning-mock';

const SANDBOX_DIR = path.join(process.cwd(), 'data', 'sandbox');

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const client = await getClientByApiKey(apiKey);
    if (!client) return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
    const { mutationType = 'price' } = await req.json();
    // Simulação de evolução: testa uma nova estratégia em sandbox
    const sandboxId = Date.now() + '-' + Math.random().toString(36).substring(2, 8);
    const sandboxPath = path.join(SANDBOX_DIR, sandboxId);
    await fs.mkdir(sandboxPath, { recursive: true });
    // Estratégia actual vs nova
    const currentOutcome = await getExpectedOutcome(mutationType);
    // Simular uma melhoria (randómica, mas realista)
    const improvement = Math.random() * 0.2 - 0.05; // -5% a +15%
    const newOutcome = Math.min(1, Math.max(0, currentOutcome + improvement));
    const improved = newOutcome > currentOutcome;
    const result = {
        sandboxId,
        mutationType,
        currentScore: currentOutcome,
        newScore: newOutcome,
        improved,
        recommended: improved,
        simulationLog: `Simulada estratégia ${mutationType}: performance ${improved ? 'melhorou' : 'piorou'} de ${(currentOutcome*100).toFixed(1)}% para ${(newOutcome*100).toFixed(1)}%`,
    };
    await fs.writeFile(path.join(sandboxPath, 'result.json'), JSON.stringify(result, null, 2));
    return NextResponse.json(result);
}

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const client = await getClientByApiKey(apiKey);
    if (!client) return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
    const sandboxes = await fs.readdir(SANDBOX_DIR).catch(() => []);
    const evolutions = [];
    for (const s of sandboxes) {
        try {
            const result = JSON.parse(await fs.readFile(path.join(SANDBOX_DIR, s, 'result.json'), 'utf-8'));
            evolutions.push(result);
        } catch {}
    }
    return NextResponse.json({ evolutions });
}
