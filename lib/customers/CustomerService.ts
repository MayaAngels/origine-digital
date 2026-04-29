// lib/customers/CustomerService.ts
// Gerencia clientes, visitantes e marketing automation

import { supabase } from '../lib/supabase'

export interface Customer {
  id: string
  email: string
  firstName?: string
  lastName?: string
  birthDate?: string
  phone?: string
  newsletterSubscribed: boolean
  marketingConsent: boolean
  totalSpent: number
  totalOrders: number
  lastPurchaseAt?: string
}

export interface Visitor {
  id: string
  sessionId: string
  ipAddress?: string
  landingPage?: string
  pageViews: number
  cartAdds: number
  abandonedCart: boolean
}

class CustomerService {
  
  // ==========================================
  // CLIENTES
  // ==========================================
  
  async getOrCreateCustomer(email: string, data?: Partial<Customer>): Promise<Customer> {
    // Buscar cliente existente
    const { data: existing } = await supabase
      .from('customers')
      .select('*')
      .eq('email', email)
      .single()
    
    if (existing) {
      return existing
    }
    
    // Criar novo cliente
    const id = `cus_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`
    const newCustomer = {
      id,
      email,
      first_name: data?.firstName,
      last_name: data?.lastName,
      birth_date: data?.birthDate,
      newsletter_subscribed: true,
      marketing_consent: true,
      first_seen_at: new Date().toISOString()
    }
    
    await supabase.from('customers').insert(newCustomer)
    
    // Enviar email de boas-vindas
    await this.sendWelcomeEmail(email)
    
    return { ...newCustomer, id, email } as Customer
  }
  
  async updateCustomer(email: string, updates: Partial<Customer>): Promise<void> {
    await supabase
      .from('customers')
      .update({
        first_name: updates.firstName,
        last_name: updates.lastName,
        birth_date: updates.birthDate,
        phone: updates.phone,
        newsletter_subscribed: updates.newsletterSubscribed,
        marketing_consent: updates.marketingConsent,
        updated_at: new Date().toISOString()
      })
      .eq('email', email)
  }
  
  async recordPurchase(email: string, amount: number): Promise<void> {
    const { data: customer } = await supabase
      .from('customers')
      .select('total_spent, total_orders')
      .eq('email', email)
      .single()
    
    await supabase
      .from('customers')
      .update({
        total_spent: (customer?.total_spent || 0) + amount,
        total_orders: (customer?.total_orders || 0) + 1,
        last_purchase_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('email', email)
  }
  
  // ==========================================
  // VISITANTES (anônimos)
  // ==========================================
  
  async trackVisitor(sessionId: string, data: Partial<Visitor>): Promise<void> {
    const { data: existing } = await supabase
      .from('visitors')
      .select('*')
      .eq('session_id', sessionId)
      .single()
    
    if (existing) {
      await supabase
        .from('visitors')
        .update({
          last_seen: new Date().toISOString(),
          page_views: (existing.page_views || 0) + 1,
          cart_adds: (existing.cart_adds || 0) + (data.cartAdds || 0),
          abandoned_cart: data.abandonedCart || existing.abandoned_cart
        })
        .eq('session_id', sessionId)
    } else {
      await supabase
        .from('visitors')
        .insert({
          id: `vis_${Date.now()}_${Math.random().toString(36).substr(2, 8)}`,
          session_id: sessionId,
          landing_page: data.landingPage,
          page_views: 1,
          cart_adds: data.cartAdds || 0
        })
    }
  }
  
  // ==========================================
  // MARKETING AUTOMATION
  // ==========================================
  
  async sendWelcomeEmail(email: string): Promise<void> {
    // Envia email de boas-vindas via Brevo
    await fetch('/api/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        template: 'welcome',
        data: { name: email.split('@')[0] }
      })
    })
  }
  
  async getBirthdayCustomers(): Promise<Customer[]> {
    const today = new Date()
    const month = today.getMonth() + 1
    const day = today.getDate()
    
    const { data } = await supabase
      .from('customers')
      .select('*')
      .filter('birth_date', 'not.is', null)
    
    return (data || []).filter(c => {
      if (!c.birth_date) return false
      const birthDate = new Date(c.birth_date)
      return birthDate.getMonth() + 1 === month && birthDate.getDate() === day
    }) as Customer[]
  }
  
  async getAbandonedCarts(): Promise<{ email: string; items: any[] }[]> {
    // Buscar carrinhos abandonados (carrinhos com mais de 1 hora sem checkout)
    const { data } = await supabase
      .from('carts')
      .select('*')
      .eq('status', 'abandoned')
      .lt('updated_at', new Date(Date.now() - 60 * 60 * 1000).toISOString())
    
    return (data || []).map(cart => ({
      email: cart.email,
      items: cart.items
    }))
  }
  
  async runScheduledCampaigns(): Promise<void> {
    // Executa campanhas agendadas
    const { data: campaigns } = await supabase
      .from('scheduled_campaigns')
      .select('*')
      .eq('is_active', true)
      .lt('next_run_at', new Date().toISOString())
    
    for (const campaign of campaigns || []) {
      await this.executeCampaign(campaign)
      
      // Atualizar próxima execução
      await supabase
        .from('scheduled_campaigns')
        .update({
          last_run_at: new Date().toISOString(),
          next_run_at: this.calculateNextRun(campaign)
        })
        .eq('id', campaign.id)
    }
  }
  
  private async executeCampaign(campaign: any): Promise<void> {
    let customers: Customer[] = []
    
    switch (campaign.trigger_type) {
      case 'birthday':
        customers = await this.getBirthdayCustomers()
        for (const customer of customers) {
          await this.sendBirthdayEmail(customer)
        }
        break
      case 'date':
        // Campanhas específicas (Black Friday, etc.)
        customers = await this.getAllCustomers()
        for (const customer of customers) {
          await this.sendPromotionalEmail(customer, campaign.email_template)
        }
        break
      case 'hours_after':
        const abandoned = await this.getAbandonedCarts()
        for (const cart of abandoned) {
          await this.sendAbandonedCartEmail(cart.email, cart.items)
        }
        break
    }
  }
  
  private calculateNextRun(campaign: any): string {
    const nextRun = new Date()
    switch (campaign.trigger_type) {
      case 'birthday':
        nextRun.setDate(nextRun.getDate() + 1)
        break
      case 'date':
        // Próximo ano
        nextRun.setFullYear(nextRun.getFullYear() + 1)
        break
      case 'hours_after':
        nextRun.setHours(nextRun.getHours() + 1)
        break
    }
    return nextRun.toISOString()
  }
  
  private async sendBirthdayEmail(customer: Customer): Promise<void> {
    await fetch('/api/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: customer.email,
        template: 'birthday',
        data: { name: customer.firstName || customer.email.split('@')[0] }
      })
    })
  }
  
  private async sendPromotionalEmail(customer: Customer, template: string): Promise<void> {
    await fetch('/api/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: customer.email,
        template,
        data: { name: customer.firstName || customer.email.split('@')[0] }
      })
    })
  }
  
  private async sendAbandonedCartEmail(email: string, items: any[]): Promise<void> {
    await fetch('/api/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        template: 'abandoned-cart',
        data: { items, discountCode: 'SAVE10' }
      })
    })
  }
  
  private async getAllCustomers(): Promise<Customer[]> {
    const { data } = await supabase
      .from('customers')
      .select('*')
      .eq('newsletter_subscribed', true)
    return (data || []) as Customer[]
  }
}

export const customerService = new CustomerService()