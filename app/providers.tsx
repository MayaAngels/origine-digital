import { SyntheticAgent } from '../components/agent/SyntheticAgent'
"use client";

import { ReactNode } from "react";
const useCart = () => ({ cart: [], addToCart: () => {}, total: 0 });

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
