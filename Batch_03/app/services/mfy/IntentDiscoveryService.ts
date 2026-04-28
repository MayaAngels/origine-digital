// app/services/mfy/IntentDiscoveryService.ts
export interface LatentNeed {
  confidence: number;
  needCategory: string;
  suggestedSessionType: string;
  urgency: "low" | "medium" | "high";
  triggerImmediately: boolean;
}

export class IntentDiscoveryService {
  async detectLatentNeed(behaviorSignals: any[]): Promise<LatentNeed | null> {
    const pricingPrompts = behaviorSignals.filter(s => s.text?.toLowerCase().includes("preço"));
    if (pricingPrompts.length >= 3) {
      return { confidence: 0.85, needCategory: "pricing_intel", suggestedSessionType: "MFY_workflow", urgency: "high", triggerImmediately: true };
    }
    return null;
  }

  generateProactiveOffer(need: LatentNeed): string {
    return "🔍 Percebi que você está pesquisando preços. Quer que eu crie um monitor automático?";
  }
}
