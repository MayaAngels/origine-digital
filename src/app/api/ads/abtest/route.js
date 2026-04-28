// src/app/api/ads/abtest/route.js
import { runABTest } from '@/services/mockAdsService';

export async function POST(request) {
  const { campaignId } = await request.json();
  const result = await runABTest(campaignId);
  return Response.json({ success: true, data: result });
}
