// src/app/api/ads/evolve/route.js
import { evolveAdPopulation } from '@/services/mockGeneticAdService';

export async function POST(request) {
  const { ads } = await request.json();
  const evolved = await evolveAdPopulation(ads, 3);
  return Response.json({ success: true, evolved });
}
