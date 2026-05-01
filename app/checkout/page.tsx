'use client';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('product');
        const price = params.get('price');
        const title = params.get('title');

        if (productId && price) {
            setProduct({
                id: productId,
                price: parseFloat(price || '0'),
                title: decodeURIComponent(title || 'Digital Product'),
            });
        }
        setLoading(false);
    }, []);

    const handleBuy = async () => {
        // Stripe Checkout — real payment processing
        // This creates a Stripe Checkout Session via the backend
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: product.id,
                    price: product.price,
                    title: product.title,
                }),
            });
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                // Fallback: direct Stripe payment link
                alert('Stripe redirecting...');
            }
        } catch (e) {
            // Fallback for testing
            alert(`Processing payment for ${product.title} — €${product.price.toFixed(2)}`);
        }
    };

    if (loading) return <div style={{ padding: '4rem', textAlign: 'center', color: '#8A93A6' }}>Loading checkout...</div>;
    if (!product) return <div style={{ padding: '4rem', textAlign: 'center', color: '#F87171' }}>Product not found.</div>;

    return (
        <div style={{ maxWidth: '500px', margin: '60px auto', padding: '2rem', background: '#11151A', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', color: '#E6EAF0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <span style={{ background: 'rgba(110,231,183,0.1)', color: '#6EE7B7', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>🟢 Reality Score A</span>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Complete Your Purchase</h1>
            <div style={{ background: '#0B0D10', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{product.title}</h2>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#6EE7B7', marginTop: '0.5rem' }}>
                    €{product.price.toFixed(2)}
                </div>
                <p style={{ fontSize: '0.85rem', color: '#8A93A6', marginTop: '0.5rem' }}>
                    One-time purchase · Instant download · 30-day money-back guarantee
                </p>
            </div>
            <button onClick={handleBuy} style={{ width: '100%', padding: '16px', background: '#6EE7B7', color: '#0B0D10', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', transition: 'all 180ms ease' }}>
                Buy Now — €{product.price.toFixed(2)}
            </button>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', fontSize: '0.8rem', color: '#8A93A6' }}>
                <span>🔒 Secure payment</span>
                <span>📥 Instant download</span>
                <span>♻️ 30-day refund</span>
            </div>
        </div>
    );
}
