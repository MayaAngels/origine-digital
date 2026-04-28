-- =============================================================================
-- MFY PLATFORM - TABELAS PARA SUPABASE
-- =============================================================================
-- Execute este script no SQL Editor do Supabase
-- =============================================================================

-- Tabela de sessões
CREATE TABLE IF NOT EXISTS mfy_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'started',
    intent JSONB,
    confirmed_spec JSONB,
    context JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Tabela de artefatos
CREATE TABLE IF NOT EXISTS mfy_artifacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES mfy_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    type VARCHAR(30) NOT NULL,
    name VARCHAR(255),
    description TEXT,
    spec JSONB NOT NULL,
    status VARCHAR(20) DEFAULT 'building',
    deployed_at TIMESTAMP WITH TIME ZONE,
    last_healthy_at TIMESTAMP WITH TIME ZONE,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de templates
CREATE TABLE IF NOT EXISTS mfy_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    artifact_type VARCHAR(30) NOT NULL,
    spec JSONB NOT NULL,
    category VARCHAR(50),
    tags TEXT[],
    usage_count INTEGER DEFAULT 0,
    success_rate FLOAT DEFAULT 0,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de eventos de cobrança
CREATE TABLE IF NOT EXISTS mfy_billing_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    artifact_id UUID REFERENCES mfy_artifacts(id) ON DELETE CASCADE,
    event_type VARCHAR(30) NOT NULL,
    amount_cents INTEGER NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    paid_at TIMESTAMP WITH TIME ZONE
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_mfy_sessions_user_id ON mfy_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_mfy_artifacts_user_id ON mfy_artifacts(user_id);
CREATE INDEX IF NOT EXISTS idx_mfy_templates_category ON mfy_templates(category);

-- Templates iniciais
INSERT INTO mfy_templates (name, description, artifact_type, spec, category, is_public)
SELECT 'Monitor de Preços', 'Monitora automaticamente preços de concorrentes', 'workflow', '{"type": "price_monitor"}', 'Competitive Intelligence', TRUE
WHERE NOT EXISTS (SELECT 1 FROM mfy_templates WHERE name = 'Monitor de Preços');

INSERT INTO mfy_templates (name, description, artifact_type, spec, category, is_public)
SELECT 'Agente de Onboarding', 'Automatiza onboarding de clientes', 'agent', '{"capabilities": ["email", "documents"]}', 'Customer Success', TRUE
WHERE NOT EXISTS (SELECT 1 FROM mfy_templates WHERE name = 'Agente de Onboarding');

SELECT 'MFY Platform tables created successfully!' as status;
