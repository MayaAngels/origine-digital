// src/app/api/campaigns/status/route.js
import fs from 'fs';
import path from 'path';

export async function GET() {
  const dir = path.join(process.cwd(), 'data', 'campaigns', 'ads');
  if (!fs.existsSync(dir)) return Response.json({ success: true, campaigns: [] });
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const campaigns = files.map(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf-8')));
  return Response.json({ success: true, campaigns });
}
