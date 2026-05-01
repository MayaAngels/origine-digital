'use client';
import React from 'react';
import { useAuditData, useConsciousnessField } from '@/lib/homepage/use-live-data';
import Container from '@/components/layout/Container';

export default function TrustStrip() {
    const { data: audit } = useAuditData();
    const { data: consciousness } = useConsciousnessField();
    const stats = [
        { label: 'Data Sources', value: consciousness?.activeSources?.toString() || '14', icon: '📡' },
        { label: 'Trust Score', value: (audit?.trust?.score ?? 1.0).toFixed(2), icon: '🛡️' },
        { label: 'Awareness', value: (consciousness?.globalAwareness ?? 0.64).toFixed(2), icon: '🧠' },
        { label: 'Reality Gate', value: 'Active', icon: '✅' },
    ];
    return (
        <section className="py-8 border-t border-b border-[rgba(255,255,255,0.06)]">
            <Container>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-xl mb-1">{stat.icon}</div>
                            <div className="text-lg sm:text-xl font-bold text-[#6EE7B7]">{stat.value}</div>
                            <div className="text-[0.6rem] text-[#5A6378] uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
