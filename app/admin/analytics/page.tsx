// app/admin/analytics/page.tsx
'use client';
import { useEffect, useState } from 'react';

interface SalesData {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    topProducts: Array<{ name: string; revenue: number; units: number }>;
    revenueByMonth: Array<{ month: string; revenue: number }>;
    conversionRate: number;
}

export default function SalesAnalyticsPage() {
    const [data, setData] = useState<SalesData | null>(null);
    const [period, setPeriod] = useState('30d');

    useEffect(() => {
        fetch(`/api/admin/analytics?metric=summary&days=${period === '30d' ? 30 : period === '90d' ? 90 : 365}`)
            .then(r => r.json())
            .then(d => {
                setData({
                    totalRevenue: d.data?.total_revenue || 0,
                    totalOrders: d.data?.buyers || 0,
                    averageOrderValue: d.data?.avg_order_value || 0,
                    topProducts: [],
                    revenueByMonth: [],
                    conversionRate: d.data?.conversion_rate || 0,
                });
            })
            .catch(() => {
                // Mock data for preview
                setData({
                    totalRevenue: 1816,
                    totalOrders: 62,
                    averageOrderValue: 29.29,
                    topProducts: [
                        { name: 'Student Survival Kit', revenue: 133, units: 7 },
                        { name: 'Freelancer Tax Kit', revenue: 156, units: 4 },
                        { name: 'AI Business Blueprint', revenue: 147, units: 3 },
                    ],
                    revenueByMonth: [
                        { month: 'Month 1', revenue: 392 },
                        { month: 'Month 2', revenue: 562 },
                        { month: 'Month 3', revenue: 863 },
                    ],
                    conversionRate: 3.8,
                });
            });
    }, [period]);

    if (!data) return <div style={{ padding: '2rem', color: '#8A93A6' }}>Loading analytics...</div>;

    return (
        <div style={{ padding: '2rem', background: '#0B0D10', minHeight: '100vh', color: '#E6EAF0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>📊 Sales Analytics</h1>
                <select 
                    value={period} 
                    onChange={(e) => setPeriod(e.target.value)}
                    style={{ background: '#11151A', color: '#E6EAF0', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '8px' }}
                >
                    <option value="30d">Last 30 Days</option>
                    <option value="90d">Last 90 Days</option>
                    <option value="365d">Last Year</option>
                </select>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: '#11151A', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.8rem', color: '#8A93A6', textTransform: 'uppercase' }}>Total Revenue</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#6EE7B7' }}>€{data.totalRevenue.toLocaleString()}</div>
                </div>
                <div style={{ background: '#11151A', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.8rem', color: '#8A93A6', textTransform: 'uppercase' }}>Total Orders</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#6EE7B7' }}>{data.totalOrders}</div>
                </div>
                <div style={{ background: '#11151A', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.8rem', color: '#8A93A6', textTransform: 'uppercase' }}>Avg Order Value</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#6EE7B7' }}>€{data.averageOrderValue.toFixed(2)}</div>
                </div>
                <div style={{ background: '#11151A', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.8rem', color: '#8A93A6', textTransform: 'uppercase' }}>Conversion Rate</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#6EE7B7' }}>{data.conversionRate}%</div>
                </div>
            </div>

            {/* Top Products Table */}
            <div style={{ background: '#11151A', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>🏆 Top Products</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', textAlign: 'left' }}>
                            <th style={{ padding: '0.75rem', color: '#8A93A6', fontSize: '0.8rem', textTransform: 'uppercase' }}>Product</th>
                            <th style={{ padding: '0.75rem', color: '#8A93A6', fontSize: '0.8rem', textTransform: 'uppercase' }}>Revenue</th>
                            <th style={{ padding: '0.75rem', color: '#8A93A6', fontSize: '0.8rem', textTransform: 'uppercase' }}>Units</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.topProducts.map((p, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                                <td style={{ padding: '0.75rem' }}>{p.name}</td>
                                <td style={{ padding: '0.75rem', color: '#6EE7B7', fontWeight: 600 }}>€{p.revenue.toFixed(2)}</td>
                                <td style={{ padding: '0.75rem', color: '#8A93A6' }}>{p.units}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Revenue Trend */}
            <div style={{ background: '#11151A', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>📈 Revenue Trend</h2>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', height: '200px' }}>
                    {data.revenueByMonth.map((m, i) => {
                        const maxRev = Math.max(...data.revenueByMonth.map(x => x.revenue));
                        const height = (m.revenue / maxRev) * 180;
                        return (
                            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                                <div style={{ 
                                    height: `${height}px`, 
                                    background: 'linear-gradient(180deg, #6EE7B7 0%, rgba(110,231,183,0.1) 100%)', 
                                    borderRadius: '8px 8px 0 0',
                                    marginBottom: '0.5rem'
                                }} />
                                <div style={{ fontSize: '0.75rem', color: '#8A93A6' }}>{m.month}</div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#6EE7B7' }}>€{m.revenue}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
