"use client";

import { CreditCard, Zap, Crown, TrendingUp, Check } from "lucide-react";

const tiers = [
  { name: "Seed", price: 0, features: ["Basic access", "Community support", "1 product download/month"], current: false },
  { name: "Growth", price: 79, features: ["Full access", "Priority support", "Strategy sessions", "10% cashback"], current: true },
  { name: "Scale", price: 149, features: ["Everything in Growth", "Dedicated account manager", "20% cashback", "Custom development"], current: false },
  { name: "Enterprise", price: 299, features: ["Everything in Scale", "24/7 support", "Custom SLA", "API access"], current: false },
];

export default function SubscriptionPage() {
  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Subscription</h1>
          <p className="text-gray-500">Manage your plan and billing</p>
        </div>

        {/* Current Plan */}
        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <Zap size={20} className="text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-600">Current Plan</span>
              </div>
              <h2 className="text-2xl font-bold mt-1">Growth Tier</h2>
              <p className="text-gray-600 mt-1">€79/month + 5% success fee on excess revenue</p>
            </div>
            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
              Change Plan →
            </button>
          </div>
          <div className="mt-4 pt-4 border-t border-indigo-200">
            <div className="flex justify-between text-sm">
              <span>Next billing date</span>
              <span className="font-medium">May 10, 2025</span>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>Payment method</span>
              <span className="font-medium">VISA ending in 4242</span>
            </div>
          </div>
        </div>

        {/* Plan Tiers */}
        <div>
          <h3 className="font-semibold mb-4">Available Plans</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`border rounded-lg p-4 ${
                  tier.current ? "border-indigo-500 ring-2 ring-indigo-200" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{tier.name}</h4>
                    <div className="mt-1">
                      <span className="text-2xl font-bold">€{tier.price}</span>
                      <span className="text-gray-500">/month</span>
                    </div>
                  </div>
                  {tier.current && (
                    <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full">
                      Current
                    </span>
                  )}
                </div>
                <ul className="mt-4 space-y-2">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                      <Check size={14} className="text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {!tier.current && (
                  <button className="w-full mt-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition">
                    Upgrade
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="font-semibold flex items-center gap-2">
              <CreditCard size={18} />
              Payment Methods
            </h3>
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-7 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
                <div>
                  <div className="font-medium">•••• 4242</div>
                  <div className="text-sm text-gray-500">Expires 12/2026</div>
                </div>
              </div>
              <button className="text-indigo-600 text-sm">Edit</button>
            </div>
            <button className="mt-4 text-indigo-600 text-sm flex items-center gap-1">
              <Plus size={14} />
              Add payment method
            </button>
          </div>
        </div>

        {/* Billing History */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="font-semibold">Billing History</h3>
          </div>
          <div className="divide-y">
            <div className="p-4 flex justify-between items-center">
              <div>
                <div className="font-medium">Growth Tier - April 2025</div>
                <div className="text-sm text-gray-500">Apr 10, 2025</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">€79.00</div>
                <a href="#" className="text-indigo-600 text-sm">Download invoice</a>
              </div>
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <div className="font-medium">Initial Deposit</div>
                <div className="text-sm text-gray-500">Apr 1, 2025</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">€50.00</div>
                <a href="#" className="text-indigo-600 text-sm">Download receipt</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
}