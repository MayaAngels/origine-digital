// app/page.tsx - ORIGINE.DIGITAL Complete Homepage
'use client';

import Hero from '@/components/homepage/Hero';
import ProductFeed from '@/components/homepage/ProductFeed';
import TrustStrip from '@/components/homepage/TrustStrip';
import Container from '@/components/layout/Container';
import Grid from '@/components/layout/Grid';
import { H2, Body, Gradient } from '@/components/ui/Typography';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';

export default function HomePage() {
    return (
        <main className="min-h-screen">
            {/* HERO SECTION - Live stats, consciousness field */}
            <Hero />
            
            {/* TRUST STRIP - Live metrics bar */}
            <TrustStrip />
            
            {/* PRODUCT FEED - Live products with reality scores */}
            <ProductFeed />
            
            {/* HOW IT WORKS - 5 core services */}
            <section className="py-12 sm:py-16 bg-[#0B0D10]">
                <Container>
                    <div className="text-center mb-8 sm:mb-10">
                        <Badge variant="purple" className="mb-3">The Intelligence Stack</Badge>
                        <H2>How ORIGINE.DIGITAL works.</H2>
                        <Body className="mt-2 max-w-2xl mx-auto">
                            Five integrated layers create a self-aware, autonomous commerce intelligence.
                        </Body>
                    </div>
                    <Grid cols={3} gap="md">
                        {services.map((service, i) => (
                            <Card key={i} hover padding="lg">
                                <div className="text-3xl mb-3">{service.icon}</div>
                                <h3 className="font-semibold text-[#E6EAF0] text-base mb-2">{service.title}</h3>
                                <p className="text-[#8A93A6] text-xs leading-relaxed">{service.description}</p>
                                <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)]">
                                    <span className="text-[0.6rem] text-[#6EE7B7] font-mono">{service.status}</span>
                                </div>
                            </Card>
                        ))}
                    </Grid>
                </Container>
            </section>
            
            {/* CALL TO ACTION */}
            <section className="py-16 sm:py-20">
                <Container>
                    <div className="bg-gradient-to-r from-[#6EE7B7]/10 to-[#A78BFA]/10 rounded-3xl p-8 sm:p-12 text-center border border-[rgba(110,231,183,0.1)]">
                        <Badge variant="ai" dot className="mb-4">Ready to Begin?</Badge>
                        <H2 className="!text-2xl sm:!text-3xl">
                            Join the <Gradient>autonomous commerce</Gradient> revolution.
                        </H2>
                        <Body className="mt-3 max-w-md mx-auto">
                            14 data sources. Real-time coherence. Self-auditing AI. No team required.
                        </Body>
                        <div className="flex flex-wrap gap-3 justify-center mt-6">
                            <a href="/pricing" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#6EE7B7] text-[#0B0D10] font-semibold rounded-xl hover:bg-[#5EE5A7] transition-all duration-180 hover:shadow-[0_0_20px_rgba(110,231,183,0.25)]">
                                Start Free Trial
                            </a>
                            <a href="/shop" className="inline-flex items-center gap-2 px-6 py-3.5 border border-[rgba(255,255,255,0.15)] text-[#E6EAF0] font-semibold rounded-xl hover:bg-[rgba(255,255,255,0.04)] transition-all duration-180">
                                Browse Products
                            </a>
                        </div>
                    </div>
                </Container>
            </section>
        </main>
    );
}

const services = [
    { icon: '📡', title: '14 Live Data Sources', description: 'Reddit, HN, BBC, arXiv, GitHub, ProductHunt, YouTube, Medium, and 7 more — all feeding real-time market consciousness.', status: '🟢 Active' },
    { icon: '🧮', title: 'Reality Coherence', description: 'Every product scored 0-1 using Noether symmetry + Bell entanglement mathematics. No fluff, only truth.', status: '📊 Scoring' },
    { icon: '🛡️', title: 'Coherence Auditor', description: 'Self-referential AI that detects contradictions before they reach customers. 4 types of coherence checks.', status: '✅ Live' },
    { icon: '🔄', title: 'Cross-Domain Synthesis', description: 'Insights transfer between markets. What works in Ireland flows to global strategies automatically.', status: '🧠 Learning' },
    { icon: '🧬', title: 'Self-Model', description: 'The system knows itself — 13 components mapped, criticality scored, impact predicted.', status: '🔍 Introspecting' },
];
