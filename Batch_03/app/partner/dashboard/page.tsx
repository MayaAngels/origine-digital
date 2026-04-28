// app/partner/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardMetrics } from "@/components/partner/DashboardMetrics";
import { WalletBalance } from "@/components/partner/WalletBalance";
import { TargetProgress } from "@/components/partner/TargetProgress";
import { PaymentSelector } from "@/components/partner/PaymentSelector";

interface PartnerData {
  id: string
  businessName: string
  tier: string
  currentMonthlySales: number
  targetSales: number
  daysUntilTarget: number
  walletBalance: number
  pendingCredits: number
  nextMilestone: {
    salesNeeded: number
    newTier: string
    newRate: number
  }
}

export default function PartnerDashboard() {
  const [partner, setPartner] = useState<PartnerData | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadPartner = async () => {
      try {
        const response = await fetch('/api/partner/metrics')
        const data = await response.json()
        if (data.success) {
          setPartner(data.partner)
        } else if (data.requiresOnboarding) {
          router.push('/partner/onboarding')
        }
      } catch (error) {
        console.error('Failed to load partner data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPartner()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="animate-pulse">
          <div className="text-6xl mb-4">⏳</div>
          <p className="text-muted-foreground">Carregando seu dashboard...</p>
        </div>
      </div>
    )
  }

  if (!partner) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Bem-vindo ao Origine.Grow!</h1>
        <p className="text-muted-foreground mb-8">Complete seu cadastro para começar.</p>
        <a href="/grow/apply" className="btn-primary">Começar agora</a>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Olá, {partner.businessName}</h1>
        <p className="text-muted-foreground">
          Você está no plano <span className="font-semibold text-indigo-600">{partner.tier}</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardMetrics
          currentSales={partner.currentMonthlySales}
          targetSales={partner.targetSales}
          daysUntilTarget={partner.daysUntilTarget}
        />
        <WalletBalance
          balance={partner.walletBalance}
          pendingCredits={partner.pendingCredits}
        />
        <TargetProgress
          current={partner.currentMonthlySales}
          target={partner.targetSales}
          nextMilestone={partner.nextMilestone}
        />
      </div>

      <PaymentSelector
        minimumFee={29}
        suggestedFee={79}
        onConfirm={async (amount) => {
          const response = await fetch('/api/partner/payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount })
          })
          if (response.ok) {
            alert('Pagamento configurado com sucesso!')
          }
        }}
      />
    </div>
  )
}