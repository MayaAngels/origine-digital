// app/admin/page.tsx
'use client';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
    const [summary, setSummary] = useState<any>(null);
    const [errors, setErrors] = useState<any[]>([]);
    const [critical, setCritical] = useState<any>(null);

    useEffect(() => {
        // Fetch analytics summary
        fetch('/api/admin/analytics?metric=summary&days=30')
            .then(r => r.json())
            .then(d => setSummary(d.data));

        // Fetch errors
        fetch('/api/admin/errors')
            .then(r => r.json())
            .then(d => {
                setErrors(d.recentErrors || []);
                setCritical(d.criticalAlert);
            });

        // Refresh every 30 seconds
        const interval = setInterval(() => {
            fetch('/api/admin/analytics?metric=summary&days=30')
                .then(r => r.json())
                .then(d => setSummary(d.data));
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ padding: '2rem', background: '#0B0D10', color: '#E6EAF0', minHeight: '100vh' }}>
            <h1>📊 Admin Dashboard</h1>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ background: '#11151A', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.8rem', color: '#8A93A6', textTransform: 'uppercase' }}>Total Visitors (30d)</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#6EE7B7' }}>{summary?.total_visitors || 0}</div>
                </div>
                <div style={{ background: '#11151A', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.8rem', color: '#8A93A6', textTransform: 'uppercase' }}>Buyers</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#6EE7B7' }}>{summary?.buyers || 0}</div>
                </div>
                <div style={{ background: '#11151A', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.8rem', color: '#8A93A6', textTransform: 'uppercase' }}>Total Revenue</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#6EE7B7' }}>€{summary?.total_revenue || 0}</div>
                </div>
                <div style={{ background: '#11151A', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.8rem', color: '#8A93A6', textTransform: 'uppercase' }}>Active Days</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#6EE7B7' }}>{summary?.active_days || 0}</div>
                </div>
            </div>

            {/* Critical Alert */}
            {critical && (
                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '12px' }}>
                    <div style={{ fontWeight: 700, color: '#F87171' }}>🚨 Critical Alert</div>
                    <div style={{ marginTop: '0.5rem', color: '#E6EAF0' }}>{critical.message}</div>
                    <div style={{ marginTop: '0.25rem', fontSize: '0.8rem', color: '#8A93A6' }}>{critical.timestamp}</div>
                </div>
            )}

            {/* Recent Errors */}
            <div style={{ marginTop: '2rem' }}>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Recent Errors</h2>
                {errors.length === 0 && <p style={{ color: '#8A93A6' }}>No errors in the last period.</p>}
                {errors.map((err: any) => (
                    <div key={err.id} style={{
                        background: '#11151A',
                        marginBottom: '0.5rem',
                        padding: '1rem',
                        borderRadius: '8px',
                        borderLeft: `3px solid ${err.severity === 'critical' ? '#F87171' : err.severity === 'high' ? '#FBBF24' : '#8A93A6'}`
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 600 }}>{err.message}</span>
                            <span style={{ fontSize: '0.75rem', color: '#8A93A6' }}>{new Date(err.timestamp).toLocaleString()}</span>
                        </div>
                        <div style={{ marginTop: '0.25rem', fontSize: '0.8rem', color: '#8A93A6' }}>
                            Route: {err.route} | Severity: {err.severity}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
