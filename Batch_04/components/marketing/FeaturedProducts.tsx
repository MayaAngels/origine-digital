"use client";

import Link from "next/link";
import { ROUTES } from "@/lib/constants/routes";

// Temporary static data - will be replaced with real products later
const featuredProducts = [
  {
    id: "1",
    title: "Business Operations Starter Kit",
    price: 49,
    slug: "business-operations-starter-kit",
  },
  {
    id: "2",
    title: "Client Onboarding Pack",
    price: 29,
    slug: "client-onboarding-pack",
  },
  {
    id: "3",
    title: "Salon Business Toolkit",
    price: 59,
    slug: "salon-business-toolkit",
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground">
            Ready-to-use systems and templates for your business
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
              <p className="text-2xl font-bold text-primary mb-4">€{product.price}</p>
              <Link
                href={`${ROUTES.shop}/${product.slug}`}
                className="inline-block w-full text-center border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href={ROUTES.shop} className="text-primary hover:underline">
            View all products →
          </Link>
        </div>
      </div>
    </section>
  );
}