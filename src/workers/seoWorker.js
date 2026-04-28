// src/workers/seoWorker.js
import { generateKeywords, optimizeContent } from '../services/mockSeoService.js';
import fs from 'fs';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'data', 'content', 'seo');
if (!fs.existsSync(CONTENT_DIR)) fs.mkdirSync(CONTENT_DIR, { recursive: true });

export async function runSeoWorker() {
  console.log('[SEO Worker] Gerando keywords para produtos...');
  const products = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'products.json'), 'utf-8'));
  for (const product of products) {
    const kw = await generateKeywords(product.name);
    const file = path.join(CONTENT_DIR, `${product.id}-keywords.json`);
    fs.writeFileSync(file, JSON.stringify(kw, null, 2));
    console.log(`[SEO Worker] Keywords geradas para ${product.name}`);
  }
  console.log('[SEO Worker] Ciclo concluído.');
}
