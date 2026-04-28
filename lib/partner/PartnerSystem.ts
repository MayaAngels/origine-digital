// lib/partner/PartnerSystem.ts

import { PartnerProfile, PartnerTier, TIER_CONFIG, PartnerTarget, PartnerTransaction, WalletBalance, PaymentSettings } from './types'

export class PartnerSystem {
  private apiUrl: string

  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  }

  // 1. Registro com micro-commitment de €50
  async register(profile: Omit<PartnerProfile, 'id' | 'joinedAt' | 'lastActiveAt' | 'status' | 'tier' | 'stripeConnected'>): Promise<{ success: boolean; partnerId?: string; error?: string }> {
    // Validação de negócio mínimo
    if (!profile.businessName || !profile.email) {
      return { success: false, error: 'Dados incompletos' }
    }
    
    // Gera ID único
    const partnerId = `prt_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`
    
    // Cria perfil
    const partner: PartnerProfile = {
      ...profile,
      id: partnerId,
      tier: 'seed',
      joinedAt: new Date(),
      lastActiveAt: new Date(),
      status: 'active',
      stripeConnected: false
    }
    
    // Salva no Supabase
    const { error } = await this.savePartner(partner)
    if (error) return { success: false, error: error.message }
    
    // Cria wallet com depósito inicial (micro-commitment)
    await this.createInitialWallet(partnerId)
    
    // Cria primeiro target
    await this.createTarget(partnerId, profile.currentMonthlySales)
    
    return { success: true, partnerId }
  }

  // 2. Conexão Stripe Connect OAuth
  async connectStripe(partnerId: string, code: string): Promise<{ success: boolean; error?: string }> {
    const response = await fetch(`${this.apiUrl}/api/partner/stripe/connect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ partnerId, code })
    })
    const data = await response.json()
    return data
  }

  // 3. Cálculo de target personalizado
  async calculateTarget(partnerId: string): Promise<number> {
    const partner = await this.getPartner(partnerId)
    if (!partner) return 0
    
    let target = partner.currentMonthlySales * 1.5  // +50%
    
    // Ajustes por setor
    const industryMultipliers: Record<string, number> = {
      salon: 1.2,
      ecommerce: 1.3,
      consulting: 1.15,
      education: 1.1,
      other: 1.0
    }
    target *= industryMultipliers[partner.industry] || 1.0
    
    // Ajustes por maturidade
    if (partner.hasWebsite) target *= 1.1
    if (partner.hasBooking) target *= 1.1
    if (partner.employees > 5) target *= 1.05
    
    return Math.ceil(target)
  }

  // 4. Cálculo de pagamento sugerido
  async calculateSuggestedPayment(partnerId: string): Promise<PaymentSettings> {
    const partner = await this.getPartner(partnerId)
    if (!partner) throw new Error('Partner not found')
    
    const config = TIER_CONFIG[partner.tier]
    const revenue = await this.getMonthlyRevenue(partnerId)
    
    let excess = 0
    let excessFee = 0
    
    if (revenue > config.excessThreshold && config.excessRate > 0) {
      excess = revenue - config.excessThreshold
      excessFee = excess * config.excessRate
    }
    
    const totalFee = config.suggestedFee + excessFee
    const cashback = totalFee * config.cashbackRate
    
    return {
      partnerId,
      minimumFee: config.minFee,
      suggestedFee: config.suggestedFee,
      excessThreshold: config.excessThreshold,
      excessRate: config.excessRate,
      cashbackRate: config.cashbackRate
    }
  }

  // 5. Verificação de target
  async checkTarget(partnerId: string): Promise<boolean> {
    const target = await this.getCurrentTarget(partnerId)
    if (!target || target.achieved) return false
    
    const revenue = await this.getMonthlyRevenue(partnerId)
    const achieved = revenue >= target.targetSales
    
    if (achieved) {
      await this.markTargetAchieved(target.id)
      await this.upgradeTier(partnerId)
      await this.addBonusCredits(partnerId, 5000) // Bônus de €50 por atingimento
    }
    
    return achieved
  }

  // 6. Upgrade de tier
  async upgradeTier(partnerId: string): Promise<PartnerTier> {
    const partner = await this.getPartner(partnerId)
    if (!partner) throw new Error('Partner not found')
    
    const revenue = await this.getMonthlyRevenue(partnerId)
    const targets = await this.getTargets(partnerId)
    const achievedTargets = targets.filter(t => t.achieved).length
    
    let newTier: PartnerTier = 'seed'
    
    if (revenue >= 50000 || achievedTargets >= 4) {
      newTier = 'enterprise'
    } else if (revenue >= 10000 || achievedTargets >= 2) {
      newTier = 'scale'
    } else if (revenue >= 5000 || achievedTargets >= 1) {
      newTier = 'growth'
    }
    
    if (newTier !== partner.tier) {
      await this.updatePartnerTier(partnerId, newTier)
      await this.sendNotification(partnerId, 'tier_upgrade', { newTier })
    }
    
    return newTier
  }

  // 7. Processamento mensal de settlement
  async monthlySettlement(partnerId: string): Promise<void> {
    const partner = await this.getPartner(partnerId)
    if (!partner || partner.tier === 'seed') return
    
    const payment = await this.calculateSuggestedPayment(partnerId)
    const wallet = await this.getWallet(partnerId)
    
    let amountToCharge = payment.suggestedFee
    let useWallet = false
    
    // Primeiro usa wallet
    if (wallet.balance >= amountToCharge) {
      await this.deductFromWallet(partnerId, amountToCharge)
      useWallet = true
    } else if (wallet.balance > 0) {
      amountToCharge -= wallet.balance
      await this.deductFromWallet(partnerId, wallet.balance)
    }
    
    // Cobra o restante via Stripe
    if (amountToCharge > 0) {
      await this.chargePartner(partnerId, amountToCharge)
    }
    
    // Aplica cashback
    const cashbackAmount = amountToCharge * payment.cashbackRate
    if (cashbackAmount > 0) {
      await this.addCashback(partnerId, cashbackAmount)
    }
    
    // Atualiza wallet com cashback
    await this.updateWalletBalance(partnerId)
  }

  // 8. Verificação de desligamento automático
  async checkAutoTermination(partnerId: string): Promise<boolean> {
    const partner = await this.getPartner(partnerId)
    if (!partner || partner.tier !== 'seed') return false
    
    const monthsSinceJoin = this.monthsBetween(partner.joinedAt, new Date())
    if (monthsSinceJoin >= 12) {
      const targets = await this.getTargets(partnerId)
      const hasAchieved = targets.some(t => t.achieved)
      
      if (!hasAchieved) {
        await this.terminatePartner(partnerId, 'No target achieved in 12 months')
        return true
      }
    }
    return false
  }

  // Métodos auxiliares (implementação com Supabase)
  private async savePartner(partner: PartnerProfile): Promise<{ error: any }> {
    // TODO: Implementar com Supabase
    console.log('Saving partner:', partner)
    return { error: null }
  }
  
  private async getPartner(partnerId: string): Promise<PartnerProfile | null> {
    // TODO: Implementar com Supabase
    return null
  }
  
  private async createInitialWallet(partnerId: string): Promise<void> {
    // TODO: Implementar
  }
  
  private async createTarget(partnerId: string, currentSales: number): Promise<void> {
    // TODO: Implementar
  }
  
  private async getCurrentTarget(partnerId: string): Promise<PartnerTarget | null> {
    // TODO: Implementar
    return null
  }
  
  private async getMonthlyRevenue(partnerId: string): Promise<number> {
    // TODO: Implementar via Stripe Connect
    return 0
  }
  
  private async getTargets(partnerId: string): Promise<PartnerTarget[]> {
    // TODO: Implementar
    return []
  }
  
  private async markTargetAchieved(targetId: string): Promise<void> {
    // TODO: Implementar
  }
  
  private async addBonusCredits(partnerId: string, amount: number): Promise<void> {
    // TODO: Implementar
  }
  
  private async updatePartnerTier(partnerId: string, tier: PartnerTier): Promise<void> {
    // TODO: Implementar
  }
  
  private async sendNotification(partnerId: string, type: string, data: any): Promise<void> {
    // TODO: Implementar
  }
  
  private async getWallet(partnerId: string): Promise<{ balance: number }> {
    // TODO: Implementar
    return { balance: 0 }
  }
  
  private async deductFromWallet(partnerId: string, amount: number): Promise<void> {
    // TODO: Implementar
  }
  
  private async chargePartner(partnerId: string, amount: number): Promise<void> {
    // TODO: Implementar
  }
  
  private async addCashback(partnerId: string, amount: number): Promise<void> {
    // TODO: Implementar
  }
  
  private async updateWalletBalance(partnerId: string): Promise<void> {
    // TODO: Implementar
  }
  
  private async terminatePartner(partnerId: string, reason: string): Promise<void> {
    // TODO: Implementar
  }
  
  private monthsSince(date1: Date, date2: Date): number {
    return (date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth())
  }
}

export const partnerSystem = new PartnerSystem()