"use client";

import Link from "next/link";
import { Service } from "@/lib/services/data";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
      <div className="p-6">
        <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#4f46e5" }}>
          {service.category}
        </div>
        <h3 className="font-semibold text-xl mb-2 text-gray-900 transition">
          {service.title}
        </h3>
        <p className="text-gray-500 text-sm mb-3">
          {service.shortDescription}
        </p>
        <div className="text-sm text-gray-500 mb-2">⏱ {service.turnaround}</div>
        <div className="text-2xl font-bold mb-4" style={{ color: "#4f46e5" }}>From €{service.startingPrice}</div>
        <Link href={`/services/${service.slug}`} className="btn-view block">
          Learn More
        </Link>
      </div>
    </div>
  );
}
