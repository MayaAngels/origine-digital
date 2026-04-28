// app/client/social/accounts/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useClientAuth } from '../../../../../../../../components/client/ClientAuthProvider';
import { useRouter } from 'next/navigation';

export default function SocialAccountsPage() {
    const { apiKey, isLoading, clientId } = useClientAuth();
    const router = useRouter();
    const [accounts, setAccounts] = useState([]);
    const [platform, setPlatform] = useState('twitter');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoading && !apiKey) router.push('/client/login');
        if (apiKey) {
            fetch('/api/social/accounts', { headers: { Authorization: `Bearer ${apiKey}` } })
                .then(res => res.json())
                .then(data => { setAccounts(data.accounts || []); setLoading(false); })
                .catch(() => setLoading(false));
        }
    }, [apiKey, isLoading, router]);

    const addAccount = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/social/accounts', {
            method: 'POST',
            headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ platform, name, username }),
        });
        if (res.ok) {
            const { account } = await res.json();
            setAccounts([...accounts, account]);
            setName('');
            setUsername('');
        } else alert('Erro ao adicionar conta');
    };

    if (loading) return <div className="p-8">A carregar...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Contas de Redes Sociais</h1>
            <form onSubmit={addAccount} className="bg-white p-4 rounded shadow mb-6">
                <h2 className="text-xl mb-4">Adicionar conta</h2>
                <div className="grid gap-4 md:grid-cols-4">
                    <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="border p-2 rounded">
                        <option value="twitter">Twitter (X)</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="facebook">Facebook</option>
                        <option value="instagram">Instagram</option>
                        <option value="tiktok">TikTok</option>
                    </select>
                    <input type="text" placeholder="Nome da conta" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded" required />
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 rounded" required />
                    <button type="submit" className="bg-blue-600 text-white p-2 rounded">Adicionar</button>
                </div>
            </form>
            <div className="bg-white rounded shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr><th className="p-3 text-left">Plataforma</th><th className="p-3 text-left">Nome</th><th className="p-3 text-left">Username</th></tr>
                    </thead>
                    <tbody>
                        {accounts.map(acc => (
                            <tr key={acc.id} className="border-t"><td className="p-3">{acc.platform}</td><td className="p-3">{acc.name}</td><td className="p-3">{acc.username}</td></tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-6">
                <a href="/client/social/schedule" className="text-blue-600">Ir para agendamento →</a>
            </div>
        </div>
    );
}
