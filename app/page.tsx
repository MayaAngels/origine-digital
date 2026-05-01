// app/page.tsx - Simplified dark theme homepage
'use client';

export default function HomePage() {
    return (
        <div style={{ minHeight: '100vh', background: '#0B0D10' }}>
            {/* Hero Section */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
                <div style={{ display: 'inline-block', background: 'rgba(110,231,183,0.1)', color: '#6EE7B7', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', marginBottom: '1rem' }}>
                    🌐 14 AI Data Sources Active
                </div>
                <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#E6EAF0', marginBottom: '1rem' }}>
                    The <span style={{ color: '#6EE7B7' }}>ethical AI</span> that runs your digital business while you sleep.
                </h1>
                <p style={{ fontSize: '1.125rem', color: '#8A93A6', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    From content that ranks to products that sell — all governed by a mathematically proven ethical core.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <a href="/shop" style={{ background: '#6EE7B7', color: '#0B0D10', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontWeight: 'bold', textDecoration: 'none' }}>Browse Shop →</a>
                </div>
            </div>

            {/* Products Section */}
            <div style={{ background: '#11151A', padding: '4rem 2rem', marginTop: '2rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#E6EAF0', marginBottom: '0.5rem' }}>Products created, priced, and sold by AI</h2>
                    <p style={{ color: '#8A93A6', marginBottom: '2rem' }}>Every product is scored for Reality Coherence and optimized in real-time.</p>
                    
                    <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                        {/* Products will load dynamically */}
                        <div style={{ background: '#0B0D10', borderRadius: '1rem', padding: '2rem', textAlign: 'center' }}>
                            <p style={{ color: '#6EE7B7' }}>Loading products...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
