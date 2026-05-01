// app/login/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await res.json();
            if (data.success) {
                localStorage.setItem('auth_token', data.token);
                router.push('/dashboard');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('Connection error. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#0B0D10', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div style={{ maxWidth: '400px', width: '100%', background: '#11151A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', padding: '2rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#E6EAF0', textAlign: 'center', marginBottom: '2rem' }}>Welcome Back</h1>
                
                {error && <div style={{ background: 'rgba(248,113,113,0.1)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', color: '#F87171' }}>{error}</div>}
                
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', background: '#0B0D10', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.5rem', color: '#E6EAF0' }} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.75rem', marginBottom: '1.5rem', background: '#0B0D10', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.5rem', color: '#E6EAF0' }} />
                    <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem', background: '#6EE7B7', color: '#0B0D10', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}>{loading ? 'Signing in...' : 'Sign In'}</button>
                </form>
                
                <p style={{ textAlign: 'center', color: '#5A6378', marginTop: '1.5rem' }}>Don't have an account? <a href="/register" style={{ color: '#6EE7B7' }}>Sign up</a></p>
            </div>
        </div>
    );
}
