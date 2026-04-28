import { NextResponse } from "next/server";

const products = [
  { id: "1", name: "Business Operations Kit", price: 49, slug: "business-operations-starter-kit" },
  { id: "2", name: "Client Experience Kit", price: 59, slug: "client-experience-growth-kit" }
];

export async function GET() {
  return NextResponse.json({ products });
}

export async function POST(request) {
  try {
    const body = await request.json();
    // TODO: Add product creation logic
    
    return NextResponse.json(
      { success: true, product: body },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
