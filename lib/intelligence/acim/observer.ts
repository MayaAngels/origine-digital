// lib/intelligence/acim/observer.ts
interface Competitor {
    id: string;
    name: string;
    urls: { pricing?: string; blog?: string; social?: string };
}

const COMPETITORS: Competitor[] = [
    { id: 'duvo', name: 'Duvo.ai', urls: { blog: 'https://duvo.ai/blog' } },
    { id: 'mwx', name: 'MWX', urls: { pricing: 'https://mwx.com/pricing' } },
    // add more as needed
];

export async function observeCompetitors(): Promise<any[]> {
    const events: any[] = [];
    for (const comp of COMPETITORS) {
        try {
            // In production, use server-side fetch with caching; here we stub with a template
            const change = {
                competitor: comp.id,
                changeType: 'feature',
                description: `New feature detected from ${comp.name}`,
                evidence: comp.urls.blog || comp.urls.pricing || 'https://example.com',
                timestamp: new Date().toISOString()
            };
            events.push(change);
        } catch (e) { /* ignore unreachable */ }
    }
    return events;
}
