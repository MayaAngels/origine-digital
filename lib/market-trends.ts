// lib/market-trends.ts
export interface Trend {
    topic: string;
    score: number;       // 0-100
    category: string;
}

// Simulação de tendências (pode ser substituído por scraping real)
const mockTrends: Trend[] = [
    { topic: "Inteligência Artificial para Pequenos Negócios", score: 92, category: "AI" },
    { topic: "Marketing Digital com Automação", score: 88, category: "Marketing" },
    { topic: "Produtos Digitais para Educação Online", score: 85, category: "Education" },
    { topic: "Sustentabilidade e Produtos Verdes", score: 79, category: "Sustainability" },
    { topic: "Trabalho Remoto & Ferramentas Colaborativas", score: 76, category: "Productivity" },
];

export async function getMarketTrends(): Promise<Trend[]> {
    // Em produção: chamar API externa ou fazer web scraping
    return mockTrends;
}

export async function analyzeMarket(segment?: string): Promise<Trend[]> {
    let trends = await getMarketTrends();
    if (segment) {
        trends = trends.filter(t => t.category.toLowerCase() === segment.toLowerCase());
    }
    return trends;
}
