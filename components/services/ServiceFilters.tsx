"use client";

import { useState } from "react";
import { serviceCategories } from "../lib/services/data";

interface ServiceFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function ServiceFilters({ selectedCategory, onCategoryChange }: ServiceFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {serviceCategories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-lg transition ${
            selectedCategory === category
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}