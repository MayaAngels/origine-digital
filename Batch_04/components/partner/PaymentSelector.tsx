// components/partner/PaymentSelector.tsx
"use client";

import { useState } from "react";

interface PaymentSelectorProps {
  minimumFee: number
  suggestedFee: number
  onConfirm: (amount: number) => Promise<void>
}

export function PaymentSelector({ minimumFee, suggestedFee, onConfirm }: PaymentSelectorProps) {
  const [amount, setAmount] = useState(suggestedFee)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleConfirm = async () => {
    setIsProcessing(true)
    await onConfirm(amount)
    setIsProcessing(false)
  }

  return (
    <div className="bg-white rounded-lg border p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Você escolhe quanto paga</h3>
      <p className="text-muted-foreground mb-2">
        Sugestão: <span className="font-semibold">€{suggestedFee}/mês</span> (baseado no seu faturamento)
      </p>
      <p className="text-sm text-muted-foreground mb-4">
        Mínimo: <span className="font-semibold">€{minimumFee}/mês</span>
      </p>
      
      <div className="mb-4">
        <input
          type="range"
          min={minimumFee}
          max={suggestedFee * 2}
          step={5}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-center mt-2">
          <span className="text-2xl font-bold text-indigo-600">€{amount}</span>
          <span className="text-muted-foreground">/mês</span>
        </div>
      </div>
      
      <button
        onClick={handleConfirm}
        disabled={isProcessing}
        className="w-full btn-primary disabled:opacity-50"
      >
        {isProcessing ? "Processando..." : "Confirmar pagamento"}
      </button>
      
      <p className="text-xs text-muted-foreground text-center mt-4">
        Você pode mudar este valor a qualquer momento.
      </p>
    </div>
  )
}