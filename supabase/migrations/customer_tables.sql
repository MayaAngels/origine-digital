-- ============================================
-- CLIENTES E VISITANTES
-- ============================================

-- Tabela de clientes
CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  birth_date DATE,
  address TEXT,
  city TEXT,
  country TEXT DEFAULT 'Ireland',
  newsletter_subscribed BOOLEAN DEFAULT TRUE,
  marketing_consent BOOLEAN DEFAULT TRUE,
  total_spent INTEGER DEFAULT 0,
  total_orders INTEGER DEFAULT 0,
  last_purchase_at TIMESTAMP,
  first_seen_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de visitantes (anônimos)
CREATE TABLE IF NOT EXISTS visitors (
  id TEXT PRIMARY KEY,
  session_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  landing_page TEXT,
  first_seen TIMESTAMP DEFAULT NOW(),
  last_seen TIMESTAMP DEFAULT NOW(),
  page_views INTEGER DEFAULT 0,
  cart_adds INTEGER DEFAULT 0,
  abandoned_cart BOOLEAN DEFAULT FALSE
);

-- Tabela de eventos de marketing
CREATE TABLE IF NOT EXISTS marketing_events (
  id SERIAL PRIMARY KEY,
  event_type TEXT NOT NULL,
  customer_id TEXT REFERENCES customers(id),
  visitor_id TEXT,
  campaign TEXT,
  channel TEXT,
  sent_at TIMESTAMP DEFAULT NOW(),
  opened_at TIMESTAMP,
  clicked_at TIMESTAMP,
  converted_at TIMESTAMP
);

-- Tabela de campanhas programadas
CREATE TABLE IF NOT EXISTS scheduled_campaigns (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  trigger_type TEXT NOT NULL,
  trigger_config JSONB,
  email_template TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  last_run_at TIMESTAMP,
  next_run_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_birth_date ON customers(birth_date);
CREATE INDEX idx_customers_last_purchase ON customers(last_purchase_at);
CREATE INDEX idx_visitors_session ON visitors(session_id);
CREATE INDEX idx_marketing_events_customer ON marketing_events(customer_id);
CREATE INDEX idx_marketing_events_type ON marketing_events(event_type);
CREATE INDEX idx_scheduled_campaigns_next_run ON scheduled_campaigns(next_run_at);

-- Inserir campanhas padrão
INSERT INTO scheduled_campaigns (name, trigger_type, trigger_config, email_template, next_run_at) VALUES
('Happy Birthday', 'birthday', '{"days_before": 0}', 'birthday-email', NOW() + interval '1 day'),
('Black Friday', 'date', '{"month": 11, "day": 25}', 'black-friday-email', '2025-11-25 00:00:00'),
('Valentine\'s Day', 'date', '{"month": 2, "day": 14}', 'valentines-email', '2026-02-14 00:00:00'),
('Abandoned Cart', 'hours_after', '{"hours": 24}', 'abandoned-cart-email', NOW() + interval '1 hour'),
('Welcome Series', 'days_after_signup', '{"days": 1}', 'welcome-email', NOW() + interval '1 hour')
ON CONFLICT DO NOTHING;