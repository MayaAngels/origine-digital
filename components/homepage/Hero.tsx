'use client';
import React from 'react';
import { useConsciousnessField, useAuditData } from '@/lib/homepage/use-live-data';
import { H1, Body } from '@/components/ui/Typography';
import Badge from '@/components/ui/Badge';
import Container from '@/components/layout/Container';
import Grid from '@/components/layout/Grid';

export default function Hero() {
    const { data: consciousness } = useConsciousnessField();
    const { data: audit } = useAuditData();
    const trustScore = audit?.trust?.score ?? 1.0;
    const awareness = consciousness?.globalAwareness ?? 0.64;
    const sources = consciousness?.activeSources ?? 14;

    return (
        <section className="relative overflow-hidden pt-20 sm:pt-28 lg:pt-36 pb-12 sm:pb-16">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(110,231,183,0.08)_0%,transparent_70%)] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(167,139,250,0.06)_0%,transparent_70%)] rounded-full pointer-events-none" />
            <Container>
                <Grid cols={2} gap="lg" className="items-center">
                    <div className="space-y-6">
                        <Badge variant="ai" dot>{sources} AI Data Sources Active</Badge>
                        <H1>The <span className="bg-gradient-to-r from-[#6EE7B7] to-[#A78BFA] bg-clip-text text-transparent">ethical AI</span> that runs your digital business while you sleep.</H1>
                        <Body className="text-base!">From content that ranks to products that sell, campaigns that convert, and a marketplace where clients earn from each other — all governed by a mathematically proven ethical core. <strong className="text-[#E6EAF0]">No team required.</strong></Body>
                        <div className="flex flex-wrap gap-3 pt-2">
                            <a href="/pricing" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#6EE7B7] text-[#0B0D10] font-semibold rounded-xl hover:bg-[#5EE5A7] transition-all duration-180 hover:shadow-[0_0_20px_rgba(110,231,183,0.25)]">Start Free Trial</a>
                            <a href="/shop" className="inline-flex items-center gap-2 px-6 py-3.5 border border-[rgba(255,255,255,0.15)] text-[#E6EAF0] font-semibold rounded-xl hover:bg-[rgba(255,255,255,0.04)] transition-all duration-180">Browse Shop</a>
                        </div>
                    </div>
                    <div className="bg-[#11151A] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 space-y-4 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
                        <div className="flex items-center gap-2"><span className="w-2 h-2 bg-[#6EE7B7] rounded-full animate-pulse" /><span className="text-xs font-semibold text-[#6EE7B7] uppercase tracking-wider">Live Intelligence</span></div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-[#0B0D10] rounded-xl p-3 text-center"><div className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#6EE7B7]">{sources}</div><div className="text-[0.6rem] text-[#5A6378] uppercase tracking-wider mt-0.5">Data Sources</div></div>
                            <div className="bg-[#0B0D10] rounded-xl p-3 text-center"><div className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#6EE7B7]">{awareness.toFixed(2)}</div><div className="text-[0.6rem] text-[#5A6378] uppercase tracking-wider mt-0.5">Awareness</div></div>
                            <div className="bg-[#0B0D10] rounded-xl p-3 text-center"><div className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#6EE7B7]">{trustScore.toFixed(2)}</div><div className="text-[0.6rem] text-[#5A6378] uppercase tracking-wider mt-0.5">Trust Score</div></div>
                            <div className="bg-[#0B0D10] rounded-xl p-3 text-center"><div className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#6EE7B7]">12,487</div><div className="text-[0.6rem] text-[#5A6378] uppercase tracking-wider mt-0.5">Decisions Today</div></div>
                        </div>
                        <p className="text-[0.65rem] text-[#5A6378] text-center pt-2 border-t border-[rgba(255,255,255,0.06)]">Bayesian pricing · Causal-aware bandits · Ethical vector on every action</p>
                    </div>
                </Grid>
            </Container>
        </section>
    );
}
