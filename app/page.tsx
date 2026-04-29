import Link from 'next/link';

export default function HomePage() {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: '#E6EAF0' }}>
                The ethical AI that runs your digital business while you sleep.
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#8A93A6', marginBottom: '2rem', lineHeight: 1.7 }}>
                From content that ranks to products that sell, campaigns that convert, 
                and a marketplace where clients earn from each other — all governed by 
                a mathematically proven ethical core. No team required.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Link href="/pricing" style={{ background: '#6EE7B7', color: '#0B0D10', padding: '14px 28px', borderRadius: '10px', fontWeight: 700, textDecoration: 'none' }}>
                    Start Free Trial
                </Link>
                <Link href="/shop" style={{ background: 'transparent', color: '#E6EAF0', padding: '14px 28px', borderRadius: '10px', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}>
                    Browse Shop
                </Link>
            </div>
            <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {['AI Content Engine', 'Email Autopilot', 'Product Factory', 'Omnichannel Hub', 'Marketplace'].map(service => (
                    <div key={service} style={{ background: '#11151A', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <h3 style={{ color: '#6EE7B7', marginBottom: '0.5rem' }}>{service}</h3>
                        <p style={{ color: '#8A93A6', fontSize: '0.9rem' }}>Autonomously optimized for your business.</p>
                    </div>
                ))}
            </div>
        </div>
    );
}