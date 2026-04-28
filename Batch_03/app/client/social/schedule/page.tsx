// app/client/social/schedule/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useClientAuth } from '@/components/client/ClientAuthProvider';
import { useRouter } from 'next/navigation';

export default function SocialSchedulePage() {
    const { apiKey, isLoading } = useClientAuth();
    const router = useRouter();
    const [accounts, setAccounts] = useState([]);
    const [posts, setPosts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState('');
    const [content, setContent] = useState('');
    const [scheduledAt, setScheduledAt] = useState('');
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        if (!apiKey) return;
        const accRes = await fetch('/api/social/accounts', { headers: { Authorization: `Bearer ${apiKey}` } });
        const accData = await accRes.json();
        setAccounts(accData.accounts || []);
        const postsRes = await fetch('/api/social/schedule', { headers: { Authorization: `Bearer ${apiKey}` } });
        const postsData = await postsRes.json();
        setPosts(postsData.posts || []);
        setLoading(false);
    };

    useEffect(() => {
        if (!isLoading && !apiKey) router.push('/client/login');
        if (apiKey) loadData();
    }, [apiKey, isLoading, router]);

    const schedulePost = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/social/schedule', {
            method: 'POST',
            headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ accountId: selectedAccount, content, scheduledAt }),
        });
        if (res.ok) {
            const { post } = await res.json();
            setPosts([...posts, post]);
            setContent('');
            setScheduledAt('');
        } else alert('Erro ao agendar');
    };

    if (loading) return <div className="p-8">A carregar...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Agendar Publicações</h1>
            <form onSubmit={schedulePost} className="bg-white p-4 rounded shadow mb-6">
                <div className="grid gap-4">
                    <select value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)} required className="border p-2 rounded">
                        <option value="">Selecionar conta</option>
                        {accounts.map(acc => <option key={acc.id} value={acc.id}>{acc.platform} – {acc.username}</option>)}
                    </select>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Conteúdo da publicação" rows={4} required className="border p-2 rounded" />
                    <input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} required className="border p-2 rounded" />
                    <button type="submit" className="bg-green-600 text-white p-2 rounded">Agendar</button>
                </div>
            </form>
            <h2 className="text-xl font-semibold mb-4">Publicações Agendadas</h2>
            <div className="bg-white rounded shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr><th className="p-3 text-left">Conteúdo</th><th className="p-3 text-left">Agendado para</th><th className="p-3 text-left">Status</th></tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post.id} className="border-t">
                                <td className="p-3">{post.content.substring(0, 80)}...</td>
                                <td className="p-3">{new Date(post.scheduledAt).toLocaleString()}</td>
                                <td className="p-3 capitalize">{post.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-6">
                <a href="/client/social/accounts" className="text-blue-600">← Gerir contas</a>
            </div>
        </div>
    );
}
