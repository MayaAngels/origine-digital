// Safe API route that returns mock data during build
import { NextResponse } from 'next/server';

export async function GET() {
  // Return mock data for build time
  return NextResponse.json({ 
    orders: [],
    message: "API is working. Configure Supabase for production."
  });
}

export async function POST(request: Request) {
  return NextResponse.json({ 
    success: false, 
    message: "Supabase not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local"
  }, { status: 503 });
}