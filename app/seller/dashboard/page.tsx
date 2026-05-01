// app/seller/dashboard/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
    id: string;
    title: string;
    price: number;
    sales: number;
    revenue: number;
}

export default function SellerDashboard() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [totalEarnings, setTotalEarnings] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            router.push('/login');
            return;
        }
        
        // Fetch seller data
        Promise.all([
            fetch('/api/seller/products', { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
            fetch('/api/seller/earnings', { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json())
        ]).then(([productsData, earningsData]) => {
            setProducts(productsData.products || []);
            setTotalEarnings(earningsData.total || 0);
            setTotalSales(earningsData.sales || 0);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [router]);

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: '#0B0D10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '40px', height: '40px', border: '2px solid #6EE7B7', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
                    <p style={{ color: '#8A93A6', marginTop: '1rem' }}>Loading seller dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#0B0D10' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#E6EAF0' }}>Seller Dashboard</h1>
                    <a href="/seller/products/new" style={{ background: '#6EE7B7', color: '#0B0D10', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold' }}>+ Add New Product</a>
                </div>
                
                {/* Stats Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ background: '#11151A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.75rem', padding: '1rem' }}>
                        <p style={{ color: '#8A93A6', fontSize: '0.75rem' }}>Total Earnings</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6EE7B7' }}>€{totalEarnings.toFixed(2)}</p>
                    </div>
                    <div style={{ background: '#11151A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.75rem', padding: '1rem' }}>
                        <p style={{ color: '#8A93A6', fontSize: '0.75rem' }}>Total Sales</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#E6EAF0' }}>{totalSales}</p>
                    </div>
                    <div style={{ background: '#11151A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.75rem', padding: '1rem' }}>
                        <p style={{ color: '#8A93A6', fontSize: '0.75rem' }}>Active Products</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#E6EAF0' }}>{products.length}</p>
                    </div>
                </div>
                
                {/* Products List */}
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#E6EAF0', marginBottom: '1rem' }}>Your Products</h2>
                {products.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', background: '#11151A', borderRadius: '1rem' }}>
                        <p style={{ color: '#8A93A6' }}>You haven't listed any products yet.</p>
                        <a href="/seller/products/new" style={{ display: 'inline-block', marginTop: '1rem', background: '#6EE7B7', color: '#0B0D10', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none' }}>Create Your First Product →</a>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {products.map(product => (
                            <div key={product.id} style={{ background: '#11151A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.75rem', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                                <div>
                                    <h3 style={{ fontWeight: 'bold', color: '#E6EAF0' }}>{product.title}</h3>
                                    <p style={{ color: '#5A6378', fontSize: '0.75rem' }}>{product.sales || 0} sales · €{((product.sales || 0) * product.price).toFixed(2)} earned</p>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <span style={{ color: '#6EE7B7', fontWeight: 'bold' }}>€{product.price.toFixed(2)}</span>
                                    <a href={`/product/${product.id}`} style={{ background: 'rgba(110,231,183,0.1)', color: '#6EE7B7', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none', fontSize: '0.875rem' }}>View</a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}