// src/services/mockRevenueService.js
export async function getCurrentMetrics() {
  // Simula receitas, custos, lucro
  const revenue = 12500 + Math.floor(Math.random() * 2000);
  const costs = 7800 + Math.floor(Math.random() * 1000);
  return {
    revenue,
    costs,
    profit: revenue - costs,
    margin: (((revenue - costs) / revenue) * 100).toFixed(1),
    activeCampaigns: 5,
    conversionRate: (3.2 + Math.random() * 1.5).toFixed(1)
  };
}

export async function generateForecast(days = 7) {
  const trend = 1.05 + Math.random() * 0.1;
  const forecast = [];
  let base = 2000;
  for (let i = 0; i < days; i++) {
    base = Math.floor(base * trend);
    forecast.push({ day: i + 1, predictedRevenue: base });
  }
  return { trend: `${((trend - 1) * 100).toFixed(1)}% daily growth`, forecast };
}

export async function autoScaleBudget(currentBudget, performanceScore) {
  return {
    recommendedBudget: Math.floor(currentBudget * (0.8 + performanceScore / 100)),
    reason: `Performance score: ${performanceScore}%`
  };
}
