'use client';
import React, { useEffect, useState } from 'react';

export default function ProductFeed() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/revenue/activate')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('ProductFeed error:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', border: '2px solid #6EE7B7', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
                <p style={{ color: '#8A93A6', marginTop: '1rem' }}>Loading products...</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <span style={{ background: 'rgba(167,139,250,0.08)', color: '#A78BFA', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold' }}>Autonomous Product Feed</span>
                <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginTop: '0.5rem', color: '#E6EAF0' }}>Products created, priced, and sold by AI.</h2>
            </div>
            <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                {products.map((product) => (
                    <div key={product.id} style={{ background: '#11151A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', overflow: 'hidden' }}>
                        <div style={{ aspectRatio: '4/3', background: '#181C22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                            📦
                        </div>
                        <div style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ background: 'rgba(110,231,183,0.1)', color: '#6EE7B7', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: 'bold' }}>
                                    Reality Score {product.realityScore >= 0.7 ? 'A' : product.realityScore >= 0.4 ? 'B' : 'C'}
                                </span>
                                <span style={{ fontSize: '0.6rem', color: '#5A6378' }}>{product.author}</span>
                            </div>
                            <h3 style={{ fontWeight: 'bold', color: '#E6EAF0', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{product.title}</h3>
                            <p style={{ color: '#8A93A6', fontSize: '0.75rem', marginBottom: '0.75rem' }}>{product.description}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#6EE7B7' }}>€{product.price.toFixed(2)}</span>
                                <span style={{ fontSize: '0.7rem', color: '#8A93A6' }}>Buy Now →</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
