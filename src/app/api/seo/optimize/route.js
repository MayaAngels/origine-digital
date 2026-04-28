// src/app/api/seo/optimize/route.js
import { optimizeContent } from '@/services/mockSeoService';

export async function POST(request) {
  const { content, keywords } = await request.json();
  const result = await optimizeContent(content, keywords);
  return Response.json({ success: true, data: result });
}
