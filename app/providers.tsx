import { SyntheticAgent } from './components/agent/SyntheticAgent'
"use client";

import { ReactNode } from "react";
import { CartProvider } from "./contexts/CartContext";

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
