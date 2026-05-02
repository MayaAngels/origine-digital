// app/api/chat/create-product/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { prompt } = await req.json();
    let title = "Custom Product", price = 29;
    if (prompt.includes("guide")) { title = "Complete Guide"; price = 39; }
    else if (prompt.includes("social")) { title = "Social Media Pack"; price = 27; }
    const id = `chat_${Date.now()}`;
    return NextResponse.json({
        message: `Created "${title}" for you!`,
        product: { id, title, description: "AI-generated", price, realityScore: 0.85 }
    });
}