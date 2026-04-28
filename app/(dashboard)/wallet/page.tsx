"use client";

import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { Wallet, Plus, History, ArrowUpRight, ArrowDownRight } from "lucide-react";

const transactions = [
  { id: 1, type: "deposit", amount: 50, description: "Initial deposit", date: "2025-04-01", status: "completed" },
  { id: 2, type: "cashback", amount: 7.90, description: "10% cashback on April payment", date: "2025-04-10", status: "completed" },
  { id: 3, type: "payment", amount: -79, description: "Growth tier monthly fee", date: "2025-04-10", status: "completed" },
  { id: 4, type: "bonus", amount: 25, description: "Referral bonus", date: "2025-03-28", status: "completed" },
];

export default function WalletPage() {
  const balance = 245;
  const pendingCredits = 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Wallet</h1>
          <p className="text-gray-500">Manage your credits and transaction history</p>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-indigo-100 text-sm">Available Balance</p>
              <p className="text-4xl font-bold mt-1">€{balance}</p>
              {pendingCredits > 0 && (
                <p className="text-indigo-100 text-sm mt-1">+ €{pendingCredits} pending credits</p>
              )}
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <Wallet size={32} />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition flex items-center gap-2">
              <Plus size={16} />
              Add Credits
            </button>
            <button className="border border-white text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/10 transition">
              Withdraw
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-600 mb-1">
              <ArrowUpRight size={16} />
              <span className="text-sm">Total Earned</span>
            </div>
            <div className="text-2xl font-bold">€{balance + 79}</div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-600 mb-1">
              <ArrowDownRight size={16} />
              <span className="text-sm">Total Spent</span>
            </div>
            <div className="text-2xl font-bold">€79</div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="font-semibold flex items-center gap-2">
              <History size={18} />
              Transaction History
            </h3>
          </div>
          <div className="divide-y">
            {transactions.map((tx) => (
              <div key={tx.id} className="p-4 flex justify-between items-center">
                <div>
                  <div className="font-medium">{tx.description}</div>
                  <div className="text-sm text-gray-500">{tx.date}</div>
                </div>
                <div className={`font-semibold ${tx.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                  {tx.amount > 0 ? "+" : ""}€{Math.abs(tx.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}