// app/api/partner/metrics/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { partnerSystem } from '@/lib/partner/PartnerSystem'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession() // TODO: Implementar autenticação
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, requiresOnboarding: true }, { status: 401 })
    }
    
    const partner = await partnerSystem.getPartner(session.user.id)
    if (!partner) {
      return NextResponse.json({ success: false, requiresOnboarding: true }, { status: 404 })
    }
    
    const target = await partnerSystem.getCurrentTarget(partner.id)
    const wallet = await partnerSystem.getWallet(partner.id)
    const nextMilestone = await partnerSystem.getNextMilestone(partner.id)
    
    return NextResponse.json({
      success: true,
      partner: {
        id: partner.id,
        businessName: partner.businessName,
        tier: partner.tier,
        currentMonthlySales: target?.currentSales || 0,
        targetSales: target?.targetSales || 0,
        daysUntilTarget: 30, // TODO: Calcular corretamente
        walletBalance: wallet?.balance || 0,
        pendingCredits: wallet?.pendingCredits || 0,
        nextMilestone
      }
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}