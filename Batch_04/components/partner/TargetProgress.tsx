// components/partner/TargetProgress.tsx
"use client";

interface TargetProgressProps {
  current: number
  target: number
  nextMilestone: {
    salesNeeded: number
    newTier: string
    newRate: number
  }
}

export function TargetProgress({ current, target, nextMilestone }: TargetProgressProps) {
  return (
    <div className="bg-white rounded-lg border p-6 shadow-sm">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Próximo Milestone</h3>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Faltam</span>
          <span className="font-semibold">{nextMilestone.salesNeeded} vendas</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Novo plano</span>
          <span className="font-semibold text-indigo-600">{nextMilestone.newTier}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Nova taxa</span>
          <span className="font-semibold">{nextMilestone.newRate}%</span>
        </div>
      </div>
    </div>
  )
}