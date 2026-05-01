// app/checkout/success/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [downloadUrl, setDownloadUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const sessionId = searchParams.get('session_id');
        if (sessionId) {
            fetch(`/api/stripe/verify-payment?session_id=${sessionId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.valid && data.downloadUrl) {
                        setDownloadUrl(data.downloadUrl);
                    }
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [searchParams]);

    if (loading) {
        return (
            <div style={{ maxWidth: '500px', margin: '0 auto', padding: '4rem', textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', border: '2px solid #6EE7B7', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
                <p style={{ color: '#8A93A6', marginTop: '1rem' }}>Verifying your purchase...</p>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '4rem', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', background: 'rgba(110,231,183,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <span style={{ fontSize: '3rem' }}>🎉</span>
            </div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#E6EAF0', marginBottom: '0.5rem' }}>Payment Successful!</h1>
            <p style={{ color: '#8A93A6', marginBottom: '2rem' }}>Thank you for your purchase.</p>
            
            {downloadUrl ? (
                <a href={downloadUrl} download style={{ display: 'block', background: '#6EE7B7', color: '#0B0D10', padding: '0.75rem', borderRadius: '0.75rem', fontWeight: 'bold', textDecoration: 'none', marginBottom: '1rem' }}>
                    Download Your Product →
                </a>
            ) : (
                <p style={{ color: '#FBBF24', marginBottom: '1rem' }}>Download link will be sent to your email.</p>
            )}
            
            <button onClick={() => router.push('/dashboard')} style={{ color: '#6EE7B7', background: 'none', border: 'none', cursor: 'pointer' }}>
                Go to My Dashboard →
            </button>
        </div>
    );
}