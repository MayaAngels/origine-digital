"use client";

import { useState } from "react";
import { services, serviceCategories } from "../lib/services/data";
import { ServiceCard } from "../components/services/ServiceCard";
import { ServiceFilters } from "../components/services/ServiceFilters";

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredServices = selectedCategory === "All"
    ? services
    : services.filter(s => s.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Services</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Done-with-you and done-for-you execution to get results faster
        </p>
      </div>

      <ServiceFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {filteredServices.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No services found in this category.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
}
