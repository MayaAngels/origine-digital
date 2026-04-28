// lib/partner/types.ts

export type PartnerTier = 'seed' | 'growth' | 'scale' | 'enterprise'

export interface PartnerProfile {
  id: string
  email: string
  businessName: string
  industry: string
  currentMonthlySales: number
  employees: number
  hasWebsite: boolean
  hasBooking: boolean
  stripeConnected: boolean
  stripeAccountId?: string
  tier: PartnerTier
  joinedAt: Date
  lastActiveAt: Date
  status: 'active' | 'inactive' | 'terminated'
}

export interface PartnerTarget {
  id: string
  partnerId: string
  targetSales: number
  currentSales: number
  startDate: Date
  endDate: Date
  achieved: boolean
  achievedAt?: Date
}

export interface PartnerTransaction {
  id: string
  partnerId: string
  type: 'deposit' | 'fee' | 'cashback' | 'bonus' | 'refund'
  amount: number
  description: string
  createdAt: Date
}

export interface WalletBalance {
  partnerId: string
  balance: number
  pendingCredits: number
  totalEarned: number
  totalSpent: number
  expiresAt: Date
}

export interface PaymentSettings {
  partnerId: string
  minimumFee: number
  suggestedFee: number
  excessThreshold: number
  excessRate: number
  cashbackRate: number
}

export const TIER_CONFIG: Record<PartnerTier, {
  name: string
  minFee: number
  suggestedFee: number
  excessThreshold: number
  excessRate: number
  cashbackRate: number
  maxDurationMonths: number
}> = {
  seed: {
    name: 'Seed',
    minFee: 0,
    suggestedFee: 0,
    excessThreshold: 0,
    excessRate: 0,
    cashbackRate: 0,
    maxDurationMonths: 12
  },
  growth: {
    name: 'Growth',
    minFee: 29,
    suggestedFee: 79,
    excessThreshold: 5000,
    excessRate: 0.05,
    cashbackRate: 0.10,
    maxDurationMonths: 6
  },
  scale: {
    name: 'Scale',
    minFee: 99,
    suggestedFee: 149,
    excessThreshold: 10000,
    excessRate: 0.03,
    cashbackRate: 0.20,
    maxDurationMonths: 0
  },
  enterprise: {
    name: 'Enterprise',
    minFee: 199,
    suggestedFee: 299,
    excessThreshold: 50000,
    excessRate: 0.02,
    cashbackRate: 0.25,
    maxDurationMonths: 0
  }
}