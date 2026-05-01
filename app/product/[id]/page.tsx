// app/product/[id]/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ProductPage() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/revenue/activate')
            .then(res => res.json())
            .then(data => {
                const found = data.products.find((p) => p.id === params.id);
                setProduct(found || null);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [params.id]);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: '#0B0D10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '40px', height: '40px', border: '2px solid #6EE7B7', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
                    <p style={{ color: '#8A93A6', marginTop: '1rem' }}>Loading product...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div style={{ minHeight: '100vh', background: '#0B0D10', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <h1 style={{ fontSize: '2rem', color: '#E6EAF0' }}>Product not found</h1>
                <button onClick={() => router.push('/shop')} style={{ color: '#6EE7B7', marginTop: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}>← Back to Shop</button>
            </div>
        );
    }

    const realityLevel = product.realityScore >= 0.7 ? 'A' : product.realityScore >= 0.4 ? 'B' : 'C';

    return (
        <div style={{ minHeight: '100vh', background: '#0B0D10' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
                <button onClick={() => router.back()} style={{ color: '#6EE7B7', marginBottom: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}>← Back to Shop</button>
                
                <div style={{ background: '#11151A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', overflow: 'hidden' }}>
                    <div style={{ aspectRatio: '2/1', background: 'linear-gradient(135deg, rgba(110,231,183,0.1), rgba(167,139,250,0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem' }}>
                        📦
                    </div>
                    <div style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <span style={{ background: 'rgba(110,231,183,0.1)', color: '#6EE7B7', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem' }}>
                                Reality Score {realityLevel} — {Math.round(product.realityScore * 100)}% Coherence
                            </span>
                            <span style={{ fontSize: '0.75rem', color: '#5A6378' }}>Created by {product.author}</span>
                        </div>
                        
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#E6EAF0', marginBottom: '1rem' }}>{product.title}</h1>
                        <p style={{ color: '#8A93A6', lineHeight: '1.6', marginBottom: '1.5rem' }}>{product.description}</p>
                        
                        {product.tags && product.tags.length > 0 && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                {product.tags.map((tag) => (
                                    <span key={tag} style={{ display: 'inline-block', background: 'rgba(167,139,250,0.08)', color: '#A78BFA', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', marginRight: '0.5rem', marginBottom: '0.5rem' }}>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6EE7B7' }}>€{product.price.toFixed(2)}</span>
                            <button 
                                onClick={() => router.push(`/checkout?product=${product.id}&price=${product.price}&title=${encodeURIComponent(product.title)}`)}
                                style={{ background: '#6EE7B7', color: '#0B0D10', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                Buy Now → 
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
