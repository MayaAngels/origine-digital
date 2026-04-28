// app/products/[slug]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    cover: string;
    tags: string[];
    author: string;
    deliverables: string[];
}

export default function ProductDetailPage() {
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        fetch(`/api/products/${params.slug}`)
            .then(r => r.json())
            .then(data => {
                setProduct(data.product || data);
                setLoading(false);
            })
            .catch(() => {
                setProduct({
                    id: params.slug as string,
                    title: "AI Business Automation Blueprint (Ireland Edition)",
                    description: "Complete guide to automating Irish SMEs with AI. Includes step-by-step workflows, ready-to-use templates, and WhatsApp automation scripts.",
                    price: 49,
                    cover: "/covers/default.png",
                    tags: ["AI", "Business", "Ireland"],
                    author: "ORIGINE.DIGITAL",
                    deliverables: ["PDF Guide", "3 Funnel Templates", "WhatsApp Scripts", "Checklist", "Lifetime Updates"]
                });
                setLoading(false);
            });
    }, [params.slug]);

    const handleAddToCart = () => {
        setAddedToCart(true);
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cart.push({ id: product?.id, title: product?.title, price: product?.price });
        localStorage.setItem('cart', JSON.stringify(cart));
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleBuyNow = () => {
        window.location.href = `/checkout?product=${product?.id}&price=${product?.price}`;
    };

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0B0D10', color: '#8A93A6' }}><div style={{ textAlign: 'center' }}><div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div><p>Loading product...</p></div></div>;

    if (!product) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0B0D10', color: '#F87171' }}><div style={{ textAlign: 'center' }}><div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div><h1>Product Not Found</h1><a href="/shop" style={{ color: '#6EE7B7' }}>← Back to Shop</a></div></div>;

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem', background: '#0B0D10', minHeight: '100vh', color: '#E6EAF0' }}>
            <div style={{ marginBottom: '1.5rem', fontSize: '0.85rem', color: '#8A93A6' }}>
                <a href="/shop" style={{ color: '#8A93A6' }}>Shop</a> › <span style={{ color: '#E6EAF0' }}>{product.title}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
                <div style={{ background: 'linear-gradient(135deg, #11151A 0%, #181C22 100%)', borderRadius: '16px', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '350px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '5rem', opacity: 0.6 }}>📘</div>
                </div>
                <div>
                    <div style={{ marginBottom: '1rem' }}>
                        {product.tags?.map((tag: string, i: number) => (
                            <span key={i} style={{ background: 'rgba(167,139,250,0.1)', color: '#A78BFA', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', marginRight: '0.5rem' }}>{tag}</span>
                        ))}
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.5rem' }}>{product.title}</h1>
                    <p style={{ color: '#8A93A6', fontSize: '0.9rem', marginBottom: '1.5rem' }}>by <span style={{ color: '#6EE7B7' }}>{product.author}</span></p>
                    <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'rgba(110,231,183,0.05)', borderRadius: '12px', border: '1px solid rgba(110,231,183,0.15)' }}>
                        <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#6EE7B7' }}>€{product.price?.toFixed(2)}</span>
                        <p style={{ color: '#8A93A6', fontSize: '0.8rem', marginTop: '0.25rem' }}>One-time purchase • Instant download • Lifetime access</p>
                    </div>
                    <p style={{ color: '#8A93A6', lineHeight: 1.7, marginBottom: '1.5rem' }}>{product.description}</p>
                    {product.deliverables && product.deliverables.length > 0 && (
                        <div style={{ marginBottom: '2rem', padding: '1rem', background: '#11151A', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', color: '#8A93A6' }}>📦 What's Included</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {product.deliverables.map((d: string, i: number) => (
                                    <li key={i} style={{ padding: '0.5rem 0', borderBottom: i < product.deliverables.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', color: '#E6EAF0', fontSize: '0.9rem' }}>
                                        <span style={{ color: '#6EE7B7', marginRight: '0.5rem' }}>✓</span> {d}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={handleBuyNow} style={{ background: '#6EE7B7', color: '#0B0D10', border: 'none', padding: '14px 32px', borderRadius: '12px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', flex: 1 }}>Buy Now — €{product.price?.toFixed(2)}</button>
                        <button onClick={handleAddToCart} style={{ background: addedToCart ? 'rgba(110,231,183,0.15)' : 'transparent', color: addedToCart ? '#6EE7B7' : '#E6EAF0', border: '1px solid rgba(255,255,255,0.15)', padding: '14px 24px', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', minWidth: '140px' }}>{addedToCart ? '✓ Added!' : 'Add to Cart'}</button>
                    </div>
                    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', fontSize: '0.8rem', color: '#8A93A6' }}>
                        <span>🔒 Secure payment</span>
                        <span>📥 Instant download</span>
                        <span>♻️ Lifetime updates</span>
                    </div>
                </div>
            </div>
        </div>
    );
}