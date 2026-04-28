// src/app/api/revenue/overview/route.js
import { getCurrentMetrics, generateForecast } from '@/services/mockRevenueService';

export async function GET() {
  const metrics = await getCurrentMetrics();
  const forecast = await generateForecast();
  return Response.json({ success: true, metrics, forecast });
}
