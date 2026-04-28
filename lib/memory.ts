import { PrismaClient } from '@prisma/client';
import { OpenAI } from 'openai';

const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Gera embedding usando OpenAI (dimensão 1536)
export async function embedText(text: string): Promise<number[]> {
    const response = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
    });
    return response.data[0].embedding;
}

// Armazena um texto na memória vetorial
export async function storeMemory(content: string, metadata?: any) {
    const embedding = await embedText(content);
    return prisma.memory.create({
        data: {
            content,
            embedding,
            metadata: metadata || {},
        },
    });
}

// Busca os 'limit' textos mais similares ao query
export async function recallSimilar(query: string, limit: number = 5) {
    const queryEmbedding = await embedText(query);
    // Usa operador <=> (cosine distance) do pgvector
    const result: any = await prisma.
        SELECT id, content, metadata, 1 - (embedding <=> ::vector) as similarity
        FROM "Memory"
        ORDER BY embedding <=> ::vector
        LIMIT 
    ;
    return result;
}
