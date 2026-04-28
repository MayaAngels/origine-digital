// src/app/api/seo/keywords/route.js
import { generateKeywords } from '@/services/mockSeoService';

export async function POST(request) {
  const { topic } = await request.json();
  const result = await generateKeywords(topic);
  return Response.json({ success: true, data: result });
}
