// lib/competitive/competitive-mock.ts
// Simulação de scraping de concorrentes

export interface CompetitorProduct {
    id: string;
    name: string;
    price: number;
    description: string;
    competitorName: string;
    category: string;
    scrapedAt: string;
}

// Mock de dados de concorrentes
const mockCompetitors: CompetitorProduct[] = [
    { id: 'comp1', name: 'Produto IA Básico', price: 49, description: 'Solução de IA para pequenas empresas', competitorName: 'AICorp', category: 'AI', scrapedAt: new Date().toISOString() },
    { id: 'comp2', name: 'Automação Pro', price: 89, description: 'Automação avançada com analytics', competitorName: 'AutoSoft', category: 'automation', scrapedAt: new Date().toISOString() },
    { id: 'comp3', name: 'Marketing AI Suite', price: 129, description: 'Pacote completo de marketing com IA', competitorName: 'MarketAI', category: 'marketing', scrapedAt: new Date().toISOString() },
    { id: 'comp4', name: 'E‑commerce Booster', price: 59, description: 'Otimização de vendas para lojas online', competitorName: 'ShopAI', category: 'ecommerce', scrapedAt: new Date().toISOString() },
];

export async function scrapeCompetitors(category?: string): Promise<CompetitorProduct[]> {
    console.log('[COMPETITIVE MOCK] Simulando scraping de concorrentes...');
    let results = [...mockCompetitors];
    if (category) {
        results = results.filter(p => p.category === category);
    }
    return results;
}

export async function getAveragePrice(category?: string): Promise<number> {
    const products = await scrapeCompetitors(category);
    if (products.length === 0) return 0;
    const sum = products.reduce((acc, p) => acc + p.price, 0);
    return sum / products.length;
}

export async function getCheapestCompetitor(category?: string): Promise<CompetitorProduct | null> {
    const products = await scrapeCompetitors(category);
    if (products.length === 0) return null;
    return products.reduce((min, p) => p.price < min.price ? p : min, products[0]);
}
