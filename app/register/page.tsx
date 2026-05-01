// app/register/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            
            const data = await res.json();
            if (data.success) {
                localStorage.setItem('auth_token', data.token);
                router.push('/dashboard');
            } else {
                setError(data.error || 'Registration failed');
            }
        } catch (err) {
            setError('Connection error. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#0B0D10', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div style={{ maxWidth: '400px', width: '100%', background: '#11151A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', padding: '2rem' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#E6EAF0', textAlign: 'center', marginBottom: '2rem' }}>Create Account</h1>
                
                {error && <div style={{ background: 'rgba(248,113,113,0.1)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', color: '#F87171' }}>{error}</div>}
                
                <form onSubmit={handleRegister}>
                    <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', background: '#0B0D10', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.5rem', color: '#E6EAF0' }} />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', background: '#0B0D10', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.5rem', color: '#E6EAF0' }} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.75rem', marginBottom: '1.5rem', background: '#0B0D10', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '0.5rem', color: '#E6EAF0' }} />
                    <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem', background: '#6EE7B7', color: '#0B0D10', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}>{loading ? 'Creating account...' : 'Sign Up'}</button>
                </form>
                
                <p style={{ textAlign: 'center', color: '#5A6378', marginTop: '1.5rem' }}>Already have an account? <a href="/login" style={{ color: '#6EE7B7' }}>Sign in</a></p>
            </div>
        </div>
    );
}
