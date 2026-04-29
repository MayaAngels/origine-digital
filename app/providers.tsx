"use client";

import { CartProvider as CartProviderComponent } from "@/components/cart/CartProvider";
import { SessionProvider } from "@/components/auth/SessionProvider";
import { useEffect, useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return without auth during SSR
  if (!mounted) {
    return (
      <CartProviderComponent>
        {children}
      </CartProviderComponent>
    );
  }

  return (
    <SessionProvider>
      <CartProviderComponent>
        {children}
      </CartProviderComponent>
    </SessionProvider>
  );
}