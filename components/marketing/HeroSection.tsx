"use client";

import Link from "next/link";
const ROUTES = { HOME: '/', SHOP: '/shop', PRICING: '/pricing', ABOUT: '/about', CONTACT: '/contact', LOGIN: '/client/login', DASHBOARD: '/client/dashboard' };

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden" style={{ background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
          Launch. Organize. Grow.
          <br />
          <span style={{ color: "#4f46e5" }}>With Precision.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Digital products, business systems, and done-for-you services 
          designed to help you sell better and operate smarter.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={ROUTES.shop} className="btn-primary">
            Browse Products
          </Link>
          <Link href={ROUTES.doneForYou} className="btn-outline">
            Get Custom Help
          </Link>
        </div>
      </div>
    </section>
  );
}
