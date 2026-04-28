-- Ativar extensão pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- Criar tabela Memory (caso o Prisma não a crie automaticamente)
CREATE TABLE IF NOT EXISTS "Memory" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    content TEXT NOT NULL,
    embedding vector(1536),
    metadata JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Índice para busca por similaridade (cosine)
CREATE INDEX IF NOT EXISTS memory_embedding_idx ON "Memory" USING ivfflat (embedding vector_cosine_ops);
