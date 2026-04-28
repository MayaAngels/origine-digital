"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { ROUTES } from "@/lib/constants/routes";

export default function CartPage(props: any) {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <Link href={ROUTES.shop} className="btn-primary inline-block">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-primary font-medium">€{item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <select value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))} className="px-2 py-1 border rounded">
                  {[1,2,3,4,5].map(q => <option key={q} value={q}>{q}</option>)}
                </select>
                <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 px-2">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-4"><span>Subtotal ({totalItems} items)</span><span>€{totalPrice}</span></div>
            <Link href={ROUTES.checkout} className="block w-full btn-primary text-center">Proceed to Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

