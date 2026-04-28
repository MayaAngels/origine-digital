'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
    { href: '/account', label: 'Account' },
    { href: '/orders', label: 'Orders' },
    { href: '/downloads', label: 'Downloads' },
    { href: '/requests', label: 'Requests' },
    { href: '/subscription', label: 'Subscription' },
    { href: '/wallet', label: 'Wallet' },
    { href: '/support', label: 'Support' },
    { href: '/settings', label: 'Settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0B0D10', color: '#E6EAF0' }}>
            <nav style={{ width: '240px', background: '#11151A', padding: '1.5rem', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', color: '#6EE7B7' }}>Dashboard</h2>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {navItems.map((item) => (
                        <li key={item.href} style={{ marginBottom: '0.25rem' }}>
                            <Link
                                href={item.href}
                                style={{
                                    display: 'block',
                                    padding: '0.5rem 0.75rem',
                                    borderRadius: '8px',
                                    color: pathname === item.href ? '#6EE7B7' : '#8A93A6',
                                    background: pathname === item.href ? 'rgba(110,231,183,0.08)' : 'transparent',
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                }}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <main style={{ flex: 1, padding: '2rem' }}>{children}</main>
        </div>
    );
}