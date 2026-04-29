// app/client/dashboard/page.tsx
'use client';
import { useEffect, useState } from 'react';
const ClientAuthProvider = ({ children }: any) => children; const useClientAuth = () => ({ apiKey: 'test', isLoading: false });
import { getDashboardStats } from '../../../lib/client/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ClientDashboardPage() {
    const apiKey = null; const clientId = null; const isLoading = false; const logout = () => {};
    const router = useRouter();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoading && !apiKey) {
            router.push('/client/login');
            return;
        }
        if (apiKey) {
            getDashboardStats(apiKey)
                .then(data => {
                    setStats(data.stats);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [apiKey, isLoading, router]);

    if (isLoading || loading) {
        return <div className="text-center py-10">A carregar...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold">ORIGINE.DIGITAL – Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="/client/content/blog" className="text-gray-700 hover:text-gray-900">Blog</Link>
                            <Link href="/client/content/social" className="text-gray-700 hover:text-gray-900">Social</Link>
                            <button onClick={logout} className="text-red-600 hover:text-red-800">Sair</button>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">Artigos de Blog</dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats?.blogArticles || 0}</dd>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">Posts Sociais</dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats?.socialPosts || 0}</dd>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">Campanhas de Email</dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats?.campaigns || 0}</dd>
                            </div>
                        </div>
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <dt className="text-sm font-medium text-gray-500 truncate">Experimentos A/B</dt>
                                <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats?.experiments || 0}</dd>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex gap-4">
                        <Link href="/client/content/blog/new" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">+ Gerar Artigo</Link>
                        <Link href="/client/content/social/new" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">+ Gerar Post Social</Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
