// app/shop/page.tsx - Fixed with correct product IDs
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    realityScore: number;
    tags: string[];
    author: string;
}

export default function ShopPage() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetch('/api/revenue/activate')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(p => p.tags.includes(filter));

    const allTags = Array.from(new Set(products.flatMap(p => p.tags)));

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: '#0B0D10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '40px', height: '40px', border: '2px solid #6EE7B7', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
                    <p style={{ color: '#8A93A6', marginTop: '1rem' }}>Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#0B0D10' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#E6EAF0', marginBottom: '0.5rem' }}>Browse the Marketplace</h1>
                    <p style={{ color: '#8A93A6' }}>Products created, priced, and sold by autonomous AI</p>
                </div>

                {/* Filters */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem' }}>
                    <button onClick={() => setFilter('all')} style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', background: filter === 'all' ? '#6EE7B7' : 'rgba(255,255,255,0.06)', color: filter === 'all' ? '#0B0D10' : '#8A93A6', border: 'none', cursor: 'pointer' }}>
                        All
                    </button>
                    {allTags.slice(0, 8).map(tag => (
                        <button key={tag} onClick={() => setFilter(tag)} style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', background: filter === tag ? '#6EE7B7' : 'rgba(255,255,255,0.06)', color: filter === tag ? '#0B0D10' : '#8A93A6', border: 'none', cursor: 'pointer' }}>
                            #{tag}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                    {filteredProducts.map(product => {
                        const realityLevel = product.realityScore >= 0.7 ? 'A' : product.realityScore >= 0.4 ? 'B' : 'C';
                        return (
                            <div key={product.id} onClick={() => router.push(`/product/${product.id}`)} style={{ background: '#11151A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s' }}>
                                <div style={{ aspectRatio: '4/3', background: '#181C22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                                    {getProductEmoji(product.tags)}
                                </div>
                                <div style={{ padding: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ background: 'rgba(110,231,183,0.1)', color: '#6EE7B7', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: 'bold' }}>
                                            Reality {realityLevel}
                                        </span>
                                        <span style={{ fontSize: '0.6rem', color: '#5A6378' }}>{product.author}</span>
                                    </div>
                                    <h3 style={{ fontWeight: 'bold', color: '#E6EAF0', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{product.title}</h3>
                                    <p style={{ color: '#8A93A6', fontSize: '0.75rem', marginBottom: '0.75rem', lineHeight: '1.4' }}>{product.description}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                        <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#6EE7B7' }}>€{product.price.toFixed(2)}</span>
                                        <span style={{ fontSize: '0.7rem', color: '#6EE7B7' }}>View Details →</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function getProductEmoji(tags: string[]): string {
    const emojiMap: Record<string, string> = {
        'AI': '🤖', 'Business': '📘', 'Ireland': '🇮🇪', 'Automation': '⚡',
        'Entrepreneur': '🧰', 'Templates': '📋', 'Social Media': '📱',
        'Content': '✍️', 'Marketing': '📊', 'Freelance': '💼', 'Tax': '🧾',
        'Finance': '💰', 'Student': '🎓', 'Income': '💡', 'Budget': '📊'
    };
    for (const tag of tags) {
        if (emojiMap[tag]) return emojiMap[tag];
    }
    return '📦';
}
