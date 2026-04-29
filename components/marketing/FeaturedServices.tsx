"use client";

import Link from "next/link";
const ROUTES = { HOME: '/', SHOP: '/shop', PRICING: '/pricing', ABOUT: '/about', CONTACT: '/contact', LOGIN: '/client/login', DASHBOARD: '/client/dashboard' };

const featuredServices = [
  {
    id: "1",
    title: "Website Setup",
    description: "Get your professional website live in days, not weeks.",
    startingPrice: 250,
    slug: "website-setup",
  },
  {
    id: "2",
    title: "Booking System Setup",
    description: "Automate your appointments and client scheduling.",
    startingPrice: 180,
    slug: "booking-system-setup",
  },
  {
    id: "3",
    title: "Business Audit",
    description: "Structured analysis of your business systems and opportunities.",
    startingPrice: 120,
    slug: "business-audit",
  },
];

export function FeaturedServices() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Services</h2>
          <p className="text-muted-foreground">
            Done-with-you and done-for-you execution
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <div key={service.id} className="bg-background border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
              <p className="text-primary font-medium mb-4">From €{service.startingPrice}</p>
              <Link
                href={`${ROUTES.services}/${service.slug}`}
                className="inline-block w-full text-center border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link href={ROUTES.services} className="text-primary hover:underline">
            View all services →
          </Link>
        </div>
      </div>
    </section>
  );
}