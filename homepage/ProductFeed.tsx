// components/homepage/ProductFeed.tsx
'use client';
import React from 'react';
import { useProducts } from '@/lib/homepage/use-live-data';
import { H2, Body } from '@/components/ui/Typography';
import Badge from '@/components/ui/Badge';
import Container from '@/components/layout/Container';
import Grid from '@/components/layout/Grid';

function getRealityBadge(score: number): { variant: 'reality-a' | 'reality-b' | 'reality-c'; label: string } {
    if (score >= 0.7) return { variant: 'reality-a', label: 'A' };
    if (score >= 0.4) return { variant: 'reality-b', label: 'B' };
    return { variant: 'reality-c', label: 'C' };
}

export default function ProductFeed() {
    const { data: products, loading } = useProducts();

    return (
        <section className="py-12 sm:py-16">
            <Container>
                <div className="text-center mb-8 sm:mb-10">
                    <Badge variant="purple" className="mb-3">Autonomous Product Feed</Badge>
                    <H2>Products created, priced, and sold by AI.</H2>
                    <Body className="mt-2">Every product below is generated autonomously, scored for Reality Coherence, and optimized in real-time.</Body>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="w-8 h-8 border-2 border-[#6EE7B7] border-t-transparent rounded-full animate-spin mx-auto" />
                        <Body className="mt-3">Loading products...</Body>
                    </div>
                ) : (
                    <Grid cols={3} gap="md">
                        {products.map((product) => {
                            const badge = getRealityBadge(product.realityScore);
                            return (
                                <a
                                    key={product.id}
                                    href={`/checkout?product=${product.id}&price=${product.price}&title=${encodeURIComponent(product.title)}`}
                                    className="bg-[#11151A] border border-[rgba(255,255,255,0.06)] rounded-2xl overflow-hidden hover:border-[rgba(255,255,255,0.12)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-all duration-180 group block"
                                >
                                    {/* Cover */}
                                    <div className="aspect-[4/3] bg-[#181C22] flex items-center justify-center text-5xl relative overflow-hidden">
                                        <span>{getProductEmoji(product.tags)}</span>
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#11151A] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-180" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge variant={badge.variant} dot>
                                                Reality Score {badge.label}
                                            </Badge>
                                            <span className="text-[0.6rem] text-[#5A6378]">{product.author}</span>
                                        </div>
                                        <h3 className="font-semibold text-[#E6EAF0] text-sm mb-1.5 leading-snug">{product.title}</h3>
                                        <p className="text-[#8A93A6] text-xs leading-relaxed mb-3 line-clamp-2">{product.description}</p>
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {product.tags.slice(0, 3).map((tag) => (
                                                <span key={tag} className="text-[0.6rem] px-2 py-0.5 rounded-full bg-[rgba(167,139,250,0.08)] text-[#A78BFA] font-medium">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.06)]">
                                            <span className="text-lg font-bold text-[#6EE7B7]">€{product.price.toFixed(2)}</span>
                                            <span className="text-[0.7rem] text-[#8A93A6]">Instant download</span>
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </Grid>
                )}
            </Container>
        </section>
    );
}

function getProductEmoji(tags: string[]): string {
    const emojiMap: Record<string, string> = {
        'AI': '🤖', 'Business': '📘', 'Ireland': '🇮🇪', 'Automation': '⚡',
        'Entrepreneur': '🧰', 'Templates': '📋', 'Social Media': '📱',
        'Content': '✍️', 'Marketing': '📊', 'Freelance': '💼', 'Tax': '🧾',
        'Finance': '💰', 'Student': '🎓', 'Income': '💡', 'Budget': '📊',
    };
    for (const tag of tags) {
        if (emojiMap[tag]) return emojiMap[tag];
    }
    return '📦';
}
