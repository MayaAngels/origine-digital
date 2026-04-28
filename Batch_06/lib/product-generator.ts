// lib/product-generator.ts
import fs from 'fs/promises';
import path from 'path';
import { getMarketTrends } from './market-trends';
import { getAiDecision } from './services/ai-mock'; // pode usar IA real

export interface DigitalProduct {
    id: string;
    clientId: string;
    title: string;
    description: string;
    type: 'ebook' | 'template' | 'software' | 'course' | 'other';
    priceSuggestion: number;
    contentPath?: string;
    createdAt: string;
}

export async function generateProductIdea(clientId: string, trend?: string): Promise<any> {
    // Se não for fornecido um tópico, pega a tendência mais forte do mercado
    let topic = trend;
    if (!topic) {
        const trends = await getMarketTrends();
        if (trends.length > 0) topic = trends[0].topic;
        else topic = "Produto Digital Inovador";
    }
    // Usar IA para gerar ideia (mock ou real)
    const prompt = `Gere uma ideia de produto digital original sobre: "${topic}". 
    Retorne JSON: { title, description, type (ebook/template/software/course/other), suggestedPriceUSD }`;
    const aiResponse = await getAiDecision({ prompt });
    // Fallback se não obtiver estrutura correcta
    return {
        title: aiResponse.title || `Produto sobre ${topic}`,
        description: aiResponse.description || `Descrição gerada automaticamente para ${topic}`,
        type: aiResponse.type || 'ebook',
        suggestedPriceUSD: aiResponse.suggestedPriceUSD || 29,
    };
}

export async function createProduct(clientId: string, idea: any): Promise<DigitalProduct> {
    const productsDir = path.join(process.cwd(), 'data', 'clients_data', clientId, 'products');
    await fs.mkdir(productsDir, { recursive: true });
    const id = Date.now() + '-' + Math.random().toString(36).substring(2, 8);
    const product: DigitalProduct = {
        id,
        clientId,
        title: idea.title,
        description: idea.description,
        type: idea.type,
        priceSuggestion: idea.suggestedPriceUSD,
        createdAt: new Date().toISOString(),
    };
    // Criar um ficheiro de conteúdo (mock)
    const content = `# ${idea.title}\n\n${idea.description}\n\n---\nEste é um produto gerado automaticamente pelo ORIGINE.DIGITAL.\nPreço sugerido: ${idea.suggestedPriceUSD} USD.`;
    const contentPath = path.join(productsDir, `${id}.md`);
    await fs.writeFile(contentPath, content);
    product.contentPath = contentPath;
    // Guardar metadados
    await fs.writeFile(path.join(productsDir, `${id}.json`), JSON.stringify(product, null, 2));
    return product;
}

export async function listProducts(clientId: string): Promise<DigitalProduct[]> {
    const productsDir = path.join(process.cwd(), 'data', 'clients_data', clientId, 'products');
    try { await fs.mkdir(productsDir, { recursive: true }); } catch {}
    const files = await fs.readdir(productsDir);
    const products = [];
    for (const file of files) {
        if (file.endsWith('.json')) {
            const data = JSON.parse(await fs.readFile(path.join(productsDir, file), 'utf-8'));
            products.push(data);
        }
    }
    return products;
}
