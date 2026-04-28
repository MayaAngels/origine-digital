// app/api/partner/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { partnerSystem } from '@/lib/partner/PartnerSystem'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = await partnerSystem.register(body)
    
    if (result.success) {
      return NextResponse.json({ success: true, partnerId: result.partnerId })
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}