// app/dashboard/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('purchases');

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            router.push('/login');
            return;
        }
        
        fetch('/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setUser(data.user);
                    setOrders(data.orders || []);
                } else {
                    localStorage.removeItem('auth_token');
                    router.push('/login');
                }
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                router.push('/login');
            });
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        router.push('/');
    };

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: '#0B0D10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '40px', height: '40px', border: '2px solid #6EE7B7', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
                    <p style={{ color: '#8A93A6', marginTop: '1rem' }}>Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#0B0D10' }}>
            {/* Header */}
            <div style={{ background: '#11151A', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '1rem 2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#E6EAF0' }}>My Dashboard</h1>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span style={{ color: '#8A93A6' }}>Welcome, {user?.name || user?.email}</span>
                        <button onClick={handleLogout} style={{ background: 'rgba(248,113,113,0.1)', color: '#F87171', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>Logout</button>
                    </div>
                </div>
            </div>
            
            {/* Tabs */}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '2rem' }}>
                    <button onClick={() => setActiveTab('purchases')} style={{ padding: '1rem 0', background: 'none', border: 'none', color: activeTab === 'purchases' ? '#6EE7B7' : '#8A93A6', cursor: 'pointer', borderBottom: activeTab === 'purchases' ? '2px solid #6EE7B7' : 'none' }}>My Purchases</button>
                    <button onClick={() => setActiveTab('settings')} style={{ padding: '1rem 0', background: 'none', border: 'none', color: activeTab === 'settings' ? '#6EE7B7' : '#8A93A6', cursor: 'pointer', borderBottom: activeTab === 'settings' ? '2px solid #6EE7B7' : 'none' }}>Settings</button>
                </div>
            </div>
            
            {/* Content */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                {activeTab === 'purchases' && (
                    <>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#E6EAF0', marginBottom: '1rem' }}>Your Purchases</h2>
                        {orders.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '3rem', background: '#11151A', borderRadius: '1rem' }}>
                                <p style={{ color: '#8A93A6' }}>You haven't purchased any products yet.</p>
                                <a href="/shop" style={{ display: 'inline-block', marginTop: '1rem', background: '#6EE7B7', color: '#0B0D10', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none' }}>Browse Shop →</a>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {orders.map((order) => (
                                    <div key={order.id} style={{ background: '#11151A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.75rem', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <div>
                                            <h3 style={{ fontWeight: 'bold', color: '#E6EAF0' }}>{order.productTitle}</h3>
                                            <p style={{ color: '#5A6378', fontSize: '0.75rem' }}>Purchased: {new Date(order.purchaseDate).toLocaleDateString()}</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                            <span style={{ color: '#6EE7B7', fontWeight: 'bold' }}>€{order.price.toFixed(2)}</span>
                                            <a href={order.downloadUrl} download style={{ background: '#6EE7B7', color: '#0B0D10', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none', fontSize: '0.875rem' }}>Download →</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
                
                {activeTab === 'settings' && (
                    <div style={{ maxWidth: '600px' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#E6EAF0', marginBottom: '1rem' }}>Account Settings</h2>
                        <div style={{ background: '#11151A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', padding: '1.5rem' }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ color: '#8A93A6', fontSize: '0.75rem' }}>Name</label>
                                <p style={{ color: '#E6EAF0' }}>{user?.name || 'Not set'}</p>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ color: '#8A93A6', fontSize: '0.75rem' }}>Email</label>
                                <p style={{ color: '#E6EAF0' }}>{user?.email}</p>
                            </div>
                            <div>
                                <label style={{ color: '#8A93A6', fontSize: '0.75rem' }}>Member Since</label>
                                <p style={{ color: '#E6EAF0' }}>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
