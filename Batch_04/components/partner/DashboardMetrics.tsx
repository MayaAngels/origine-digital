// components/partner/DashboardMetrics.tsx
"use client";

interface DashboardMetricsProps {
  currentSales: number
  targetSales: number
  daysUntilTarget: number
}

export function DashboardMetrics({ currentSales, targetSales, daysUntilTarget }: DashboardMetricsProps) {
  const progress = Math.min(100, (currentSales / targetSales) * 100)
  
  return (
    <div className="bg-white rounded-lg border p-6 shadow-sm">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">Métricas do Mês</h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Vendas</span>
            <span className="font-semibold">{currentSales} / {targetSales}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm">
            <span>Dias para target</span>
            <span className="font-semibold">{daysUntilTarget} dias</span>
          </div>
        </div>
      </div>
    </div>
  )
}