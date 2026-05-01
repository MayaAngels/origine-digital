// components/Navbar.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        setIsLoggedIn(!!token);
    }, []);
    
    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        setIsLoggedIn(false);
        router.push('/');
    };
    
    return (
        <nav style={{ background: '#11151A', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '1rem 2rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#6EE7B7', textDecoration: 'none' }}>ORIGINE.DIGITAL</Link>
                
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <Link href="/shop" style={{ color: '#E6EAF0', textDecoration: 'none' }}>Shop</Link>
                    
                    {isLoggedIn ? (
                        <>
                            <Link href="/dashboard" style={{ color: '#E6EAF0', textDecoration: 'none' }}>Dashboard</Link>
                            <button onClick={handleLogout} style={{ background: 'rgba(248,113,113,0.1)', color: '#F87171', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" style={{ color: '#E6EAF0', textDecoration: 'none' }}>Login</Link>
                            <Link href="/register" style={{ background: '#6EE7B7', color: '#0B0D10', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none' }}>Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
