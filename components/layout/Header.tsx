"use client";

import Link from "next/link";

import { PUBLIC_NAV, DASHBOARD_NAV } from '../../lib/constants/nav';
const ROUTES = { HOME: '/', SHOP: '/shop', PRICING: '/pricing', ABOUT: '/about', CONTACT: '/contact', LOGIN: '/client/login', DASHBOARD: '/client/dashboard' };
const NAV_ITEMS = [];
const useCart = () => ({ cart: [], addToCart: () => {}, total: 0 });

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={ROUTES.home} className="text-xl font-bold">
          Origine<span className="text-primary">.Digital</span>
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          {PUBLIC_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm hover:text-primary transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link href={ROUTES.cart} className="text-sm hover:text-primary transition relative">
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
