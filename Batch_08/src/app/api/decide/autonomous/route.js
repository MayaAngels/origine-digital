// src/app/api/decide/autonomous/route.js
import { getCurrentMetrics, autoScaleBudget } from '@/services/mockRevenueService';

export async function POST(request) {
  const { campaignId, currentBudget } = await request.json();
  const metrics = await getCurrentMetrics();
  const performanceScore = parseFloat(metrics.conversionRate) * 10;
  const budgetDecision = await autoScaleBudget(currentBudget, performanceScore);
  return Response.json({
    success: true,
    action: performanceScore > 35 ? 'scale_up' : 'optimize',
    newBudget: budgetDecision.recommendedBudget,
    reason: budgetDecision.reason
  });
}
