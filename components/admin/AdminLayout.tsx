"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
const NAV_ITEMS = [];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="text-xl font-bold">
              Origine<span className="text-primary">.Digital</span> Admin
            </Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition">
              View Store →
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-64 space-y-1">
            {ADMIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 rounded-lg transition ${
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </aside>
          
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}