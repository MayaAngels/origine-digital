// app/library/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LibraryPage() {
    const router = useRouter();
    const [savedProducts, setSavedProducts] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('saved_products') || '[]');
        // Fetch full product details for saved IDs
        fetch('/api/marketplace/products')
            .then(res => res.json())
            .then(data => {
                const savedItems = data.products.filter(p => saved.includes(p.id));
                setSavedProducts(savedItems);
            });
    }, []);

    if (savedProducts.length === 0) {
        return (
            <div style={{ minHeight: '100vh', background: '#0B0D10', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <span style={{ fontSize: '4rem', marginBottom: '1rem' }}>📚</span>
                <h1 style={{ color: '#E6EAF0', marginBottom: '0.5rem' }}>Your library is empty</h1>
                <p style={{ color: '#8A93A6', marginBottom: '1rem' }}>Save products you like by tapping the 📌 button</p>
                <button onClick={() => router.push('/feed')} style={{ background: '#6EE7B7', color: '#0B0D10', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>Browse Feed →</button>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#0B0D10', padding: '2rem' }}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#E6EAF0', marginBottom: '1rem' }}>Saved Products</h1>
                {savedProducts.map(product => (
                    <div key={product.id} style={{ background: '#11151A', borderRadius: '1rem', marginBottom: '1rem', padding: '1rem' }}>
                        <h3 style={{ color: '#E6EAF0' }}>{product.title}</h3>
                        <p style={{ color: '#8A93A6', fontSize: '0.875rem' }}>{product.description}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                            <span style={{ color: '#6EE7B7', fontWeight: 'bold' }}>€{product.price}</span>
                            <button onClick={() => router.push(`/checkout?product=${product.id}&price=${product.price}&title=${product.title}`)} style={{ background: '#6EE7B7', color: '#0B0D10', padding: '0.25rem 0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>Buy</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}