import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
const VIOLATIONS_DIR = path.join(process.cwd(), 'data', 'violations');
export async function GET() {
    try { await fs.mkdir(VIOLATIONS_DIR, { recursive: true }); const files = await fs.readdir(VIOLATIONS_DIR); const violations = []; for (const f of files) if (f.endsWith('.json')) violations.push(JSON.parse(await fs.readFile(path.join(VIOLATIONS_DIR, f), 'utf-8'))); return NextResponse.json({ violations }); } catch { return NextResponse.json({ violations: [] }); }
}
