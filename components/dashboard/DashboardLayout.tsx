"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Download, 
  Wallet, 
  CreditCard, 
  MessageCircle, 
  Settings,
  LogOut,
  User
} from "lucide-react";

const navItems = [
  { href: "/account", label: "Overview", icon: LayoutDashboard },
  { href: "/orders", label: "Orders", icon: ShoppingBag },
  { href: "/downloads", label: "Downloads", icon: Download },
  { href: "/wallet", label: "Wallet", icon: Wallet },
  { href: "/subscription", label: "Subscription", icon: CreditCard },
  { href: "/support", label: "Support", icon: MessageCircle },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-80">
            <div className="bg-white rounded-xl shadow-sm border sticky top-8">
              {/* User Info */}
              <div className="p-6 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                    </div>
                  <div>
                    <h3 className="font-semibold">Welcome back!</h3>
                    <p className="text-sm text-gray-500">Manage your account</p>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <nav className="p-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                        isActive
                          ? "bg-indigo-50 text-indigo-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                <div className="border-t my-4"></div>
                <Link
                  href="/logout"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition"
                >
                  <LogOut size={20} />
                  <span>Sign Out</span>
                </Link>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}