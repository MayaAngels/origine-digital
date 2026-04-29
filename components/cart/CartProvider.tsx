"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type CartContextType = {
  items: any[];
  addItem: (item: any) => void;
  removeItem: (id: string) => void;
  totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<any[]>([]);

  const addItem = (item: any) => {
    setItems([...items, item]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalItems = items.length;

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}