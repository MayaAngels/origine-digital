// app/api/cron/campaigns/route.ts
import { NextResponse } from 'next/server'
import { customerService } from '../../../lib/customers/CustomerService'

export async function GET(request: Request) {
  // Verificar chave secreta para segurança
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  try {
    await customerService.runScheduledCampaigns()
    return NextResponse.json({ success: true, message: 'Campaigns processed' })
  } catch (error) {
    console.error('Cron error:', error)
    return NextResponse.json({ error: 'Failed to process campaigns' }, { status: 500 })
  }
}