// src/app/api/ads/create/route.js
import { createAdCampaign } from '@/services/mockAdsService';

export async function POST(request) {
  const { product, budget } = await request.json();
  const campaign = await createAdCampaign(product, budget);
  return Response.json({ success: true, data: campaign });
}
