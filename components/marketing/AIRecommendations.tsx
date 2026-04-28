"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { deepseekRecommendations } from "@/lib/deepseek";
import type { Product } from "@/lib/products/data";

interface AIRecommendationsProps {
  currentProduct?: Product;
  productList: Product[];
  limit?: number;
}

export function AIRecommendations({ currentProduct, productList, limit = 4 }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reasoning, setReasoning] = useState("");

  useEffect(() => {
    async function loadRecommendations() {
      setIsLoading(true);
      
      const productsForAI = productList.map(p => ({
        id: p.id,
        title: p.title,
        category: p.category,
        price: p.price,
        description: p.shortDescription,
      }));
      
      deepseekRecommendations.setProducts(productsForAI);

      if (currentProduct) {
        const result = await deepseekRecommendations.getRecommendations(currentProduct.id, limit);
        const recommendedProducts = productList.filter(p => result.productIds.includes(p.id));
        setRecommendations(recommendedProducts);
        setReasoning(result.reasoning);
      } else {
        setRecommendations(productList.slice(0, limit));
        setReasoning("Featured products");
      }
      setIsLoading(false);
    }

    loadRecommendations();
  }, [currentProduct?.id, productList, limit]);

  if (isLoading) {
    return (
      <div className="mt-8 pt-8 border-t">
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading recommendations...</span>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 pt-8 border-t">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🤖</span>
        <h3 className="text-lg font-semibold">You may also like</h3>
        {reasoning && (
          <span className="text-xs text-muted-foreground ml-2">({reasoning})</span>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendations.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group border rounded-lg p-3 hover:shadow-lg transition hover:border-indigo-300"
          >
            <div className="text-3xl mb-2 text-center">📦</div>
            <h4 className="font-medium text-sm text-center group-hover:text-indigo-600 transition line-clamp-2">
              {product.title}
            </h4>
            <p className="text-indigo-600 font-bold mt-1 text-center">€{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}