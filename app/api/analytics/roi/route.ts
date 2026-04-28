// app/api/analytics/roi/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getClientByApiKey } from '../../../lib/multi-tenant/client-manager';
import { CausalOracle } from '../../../lib/intelligence/causal-oracle';
import { EthicalVector } from '../../../lib/intelligence/ethical-vector';

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const client = await getClientByApiKey(apiKey);
    if (!client) return NextResponse.json({ error: 'Invalid key' }, { status: 403 });
    // Compute causal impact of system actions on client revenue
    const oracle = new CausalOracle();
    const impact = await oracle.computeImpact(client.id);
    const ethics = EthicalVector.auditLastMonth(client.id);
    return NextResponse.json({
        clientId: client.id,
        revenueLift: impact.ate,
        confidence: impact.confidence,
        ethicalViolations: ethics.violations.length,
        proof: impact.proofToken,
    });
}
