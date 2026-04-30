export interface CoherenceInput { symmetryScore: number; entanglementScore: number; paradoxLevel: number; consciousnessAlignment: number; }

export function calculateRealityCoherence(i: CoherenceInput): number { const s = i.symmetryScore || 0; const e = i.entanglementScore || 0; const p = i.paradoxLevel || 0; const c = i.consciousnessAlignment || 0; const raw = s * e * c * (1 - p * 0.5); return Math.min(1, Math.max(0, raw)); }

export function coherenceGrade(score: number): string { if (score >= 0.85) return 'A'; if (score >= 0.7) return 'B'; if (score >= 0.5) return 'C'; return 'D'; }