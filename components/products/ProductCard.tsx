"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/lib/products/data";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    });
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className="group border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
      <div className="p-6">
        <div className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "#4f46e5" }}>
          {product.category}
        </div>
        <h3 className="font-semibold text-xl mb-2 text-gray-900 transition">
          {product.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          {product.shortDescription}
        </p>
        <div className="text-2xl font-bold mb-4" style={{ color: "#4f46e5" }}>€{product.price}</div>
        <div className="flex gap-2">
          <Link href={`/products/${product.slug}`} className="btn-view flex-1">
            View Details
          </Link>
          <button onClick={handleAddToCart} className="btn-cart flex-1">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
