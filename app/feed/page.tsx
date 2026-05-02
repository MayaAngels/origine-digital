// app/feed/page.tsx
'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    realityScore: number;
    imageUrl?: string;
    author: string;
    likes: number;
    isLiked?: boolean;
}

export default function FeedPage() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const lastProductRef = useRef<HTMLDivElement | null>(null);

    // Fetch products (infinite scroll)
    const fetchProducts = useCallback(async () => {
        try {
            const res = await fetch(`/api/marketplace/products?page=${page}&limit=5`);
            const data = await res.json();
            if (data.products?.length) {
                setProducts(prev => [...prev, ...data.products]);
                setHasMore(data.hasMore);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Failed to load feed', error);
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Infinite scroll observer
    useEffect(() => {
        if (loading) return;
        if (observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(p => p + 1);
            }
        });
        if (lastProductRef.current) observerRef.current.observe(lastProductRef.current);
        return () => observerRef.current?.disconnect();
    }, [loading, hasMore]);

    const handleLike = async (productId: string, index: number) => {
        // Optimistic update
        setProducts(prev => prev.map((p, i) => 
            i === index ? { ...p, likes: p.likes + (p.isLiked ? -1 : 1), isLiked: !p.isLiked } : p
        ));
        // API call would go here
        await fetch('/api/marketplace/like', { method: 'POST', body: JSON.stringify({ productId }) });
    };

    const handleSave = (productId: string) => {
        // Save to user's library (localStorage for demo)
        const saved = JSON.parse(localStorage.getItem('saved_products') || '[]');
        if (!saved.includes(productId)) {
            saved.push(productId);
            localStorage.setItem('saved_products', JSON.stringify(saved));
            alert('Product saved to your library!');
        }
    };

    if (loading && products.length === 0) {
        return (
            <div style={{ minHeight: '100vh', background: '#0B0D10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '40px', height: '40px', border: '2px solid #6EE7B7', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
                    <p style={{ color: '#8A93A6', marginTop: '1rem' }}>Loading your feed...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#0B0D10', paddingBottom: '4rem' }}>
            {/* Fixed header */}
            <div style={{ position: 'sticky', top: 0, background: '#0B0D10', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '1rem', zIndex: 10 }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6EE7B7' }}>ORIGINE</h1>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={() => router.push('/create')} style={{ background: 'none', border: 'none', color: '#E6EAF0', fontSize: '1.25rem', cursor: 'pointer' }}>✨</button>
                        <button onClick={() => router.push('/library')} style={{ background: 'none', border: 'none', color: '#E6EAF0', fontSize: '1.25rem', cursor: 'pointer' }}>📚</button>
                    </div>
                </div>
            </div>

            {/* Feed – Instagram‑style cards */}
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                {products.map((product, idx) => (
                    <div key={product.id} ref={idx === products.length - 1 ? lastProductRef : null} style={{ marginBottom: '1.5rem', background: '#11151A', borderRadius: '1rem', overflow: 'hidden' }}>
                        {/* Product image area */}
                        <div style={{ aspectRatio: '1/1', background: '#181C22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {product.imageUrl ? (
                                <img src={product.imageUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <span style={{ fontSize: '4rem' }}>📦</span>
                            )}
                        </div>
                        {/* Action buttons */}
                        <div style={{ padding: '0.75rem', display: 'flex', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <button onClick={() => handleLike(product.id, idx)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: product.isLiked ? '#F87171' : '#8A93A6' }}>
                                {product.isLiked ? '❤️' : '🤍'}
                            </button>
                            <button onClick={() => router.push(`/product/${product.id}`)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#8A93A6' }}>💬</button>
                            <button onClick={() => handleSave(product.id)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#8A93A6' }}>📌</button>
                        </div>
                        {/* Caption */}
                        <div style={{ padding: '0.75rem' }}>
                            <p style={{ fontWeight: 'bold', color: '#E6EAF0', marginBottom: '0.25rem' }}>{product.author}</p>
                            <p style={{ color: '#E6EAF0', marginBottom: '0.25rem' }}>{product.title}</p>
                            <p style={{ color: '#8A93A6', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{product.description}</p>
                            <p style={{ color: '#6EE7B7', fontWeight: 'bold' }}>€{product.price.toFixed(2)}</p>
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                <span style={{ background: `rgba(110,231,183,0.1)`, color: '#6EE7B7', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.7rem' }}>
                                    Reality Score {Math.round(product.realityScore * 100)}%
                                </span>
                                <button onClick={() => router.push(`/checkout?product=${product.id}&price=${product.price}&title=${encodeURIComponent(product.title)}`)} style={{ background: '#6EE7B7', color: '#0B0D10', border: 'none', padding: '0.25rem 0.75rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>
                                    Buy
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {hasMore && <div style={{ textAlign: 'center', padding: '1rem', color: '#8A93A6' }}>Loading more...</div>}
            </div>
        </div>
    );
}