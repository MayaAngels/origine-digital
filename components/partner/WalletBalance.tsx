// components/partner/WalletBalance.tsx
"use client";

interface WalletBalanceProps {
  balance: number
  pendingCredits: number
}

export function WalletBalance({ balance, pendingCredits }: WalletBalanceProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white shadow-sm">
      <h3 className="text-sm font-medium opacity-90 mb-2">Sua Wallet</h3>
      <div className="text-3xl font-bold mb-1">€{balance.toFixed(2)}</div>
      <p className="text-xs opacity-75">Créditos pendentes: {pendingCredits}</p>
      <button className="mt-4 text-sm bg-white/20 hover:bg-white/30 rounded-lg px-3 py-1 transition">
        Recarregar wallet
      </button>
    </div>
  )
}