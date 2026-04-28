-- Migration: Partner System Tables
-- Run this in Supabase SQL Editor

-- Partners table
CREATE TABLE IF NOT EXISTS partners (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  business_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  current_monthly_sales INTEGER NOT NULL,
  employees INTEGER NOT NULL,
  has_website BOOLEAN DEFAULT FALSE,
  has_booking BOOLEAN DEFAULT FALSE,
  stripe_connected BOOLEAN DEFAULT FALSE,
  stripe_account_id TEXT,
  tier TEXT DEFAULT 'seed',
  status TEXT DEFAULT 'active',
  joined_at TIMESTAMP DEFAULT NOW(),
  last_active_at TIMESTAMP DEFAULT NOW()
);

-- Targets table
CREATE TABLE IF NOT EXISTS partner_targets (
  id SERIAL PRIMARY KEY,
  partner_id TEXT REFERENCES partners(id),
  target_sales INTEGER NOT NULL,
  current_sales INTEGER DEFAULT 0,
  start_date TIMESTAMP DEFAULT NOW(),
  end_date TIMESTAMP,
  achieved BOOLEAN DEFAULT FALSE,
  achieved_at TIMESTAMP
);

-- Wallet transactions table
CREATE TABLE IF NOT EXISTS partner_wallet_transactions (
  id SERIAL PRIMARY KEY,
  partner_id TEXT REFERENCES partners(id),
  type TEXT NOT NULL,
  amount INTEGER NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Wallet balances table
CREATE TABLE IF NOT EXISTS partner_wallet_balances (
  partner_id TEXT PRIMARY KEY REFERENCES partners(id),
  balance INTEGER DEFAULT 0,
  pending_credits INTEGER DEFAULT 0,
  total_earned INTEGER DEFAULT 0,
  total_spent INTEGER DEFAULT 0,
  expires_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Payment settings table
CREATE TABLE IF NOT EXISTS partner_payment_settings (
  partner_id TEXT PRIMARY KEY REFERENCES partners(id),
  minimum_fee INTEGER DEFAULT 29,
  suggested_fee INTEGER DEFAULT 79,
  excess_threshold INTEGER DEFAULT 5000,
  excess_rate DECIMAL DEFAULT 0.05,
  cashback_rate DECIMAL DEFAULT 0.10,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_partners_email ON partners(email);
CREATE INDEX idx_partners_tier ON partners(tier);
CREATE INDEX idx_partners_status ON partners(status);
CREATE INDEX idx_targets_partner ON partner_targets(partner_id);
CREATE INDEX idx_wallet_partner ON partner_wallet_transactions(partner_id);

-- Enable RLS
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_wallet_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_payment_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own partner data" ON partners
  FOR SELECT USING (auth.uid()::text = id);
  
CREATE POLICY "Users can view own targets" ON partner_targets
  FOR SELECT USING (auth.uid()::text = partner_id);
  
CREATE POLICY "Users can view own wallet" ON partner_wallet_balances
  FOR SELECT USING (auth.uid()::text = partner_id);