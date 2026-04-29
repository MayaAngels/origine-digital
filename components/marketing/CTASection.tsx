"use client";

import Link from "next/link";
const ROUTES = { HOME: '/', SHOP: '/shop', PRICING: '/pricing', ABOUT: '/about', CONTACT: '/contact', LOGIN: '/client/login', DASHBOARD: '/client/dashboard' };

export function CTASection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="rounded-2xl p-8 md:p-12" style={{ backgroundColor: "#4f46e5" }}>
          <h2 className="text-3xl font-bold mb-4 text-white">Need Something Custom?</h2>
          <p className="text-indigo-100 max-w-2xl mx-auto mb-6">
            Not seeing exactly what you need? Let us build a tailored solution for your business.
          </p>
          <Link href={ROUTES.doneForYou} className="inline-block bg-white px-8 py-3 rounded-lg font-medium transition shadow-lg" style={{ color: "#4f46e5" }}>
            Request a Custom Build
          </Link>
        </div>
      </div>
    </section>
  );
}
