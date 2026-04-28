// app/client/content/blog/new/page.tsx
'use client';
import { useState } from 'react';
import { useClientAuth } from '@/components/client/ClientAuthProvider';
import { generateBlogPost } from '@/lib/client/api';
import { useRouter } from 'next/navigation';

export default function NewBlogPage() {
    const { apiKey } = useClientAuth();
    const router = useRouter();
    const [topic, setTopic] = useState('');
    const [keywords, setKeywords] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await generateBlogPost(topic, keywords, apiKey || undefined);
            router.push('/client/dashboard');
        } catch (err) {
            setError('Erro ao gerar artigo. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6">Gerar novo artigo de blog</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tópico</label>
                    <input type="text" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={topic} onChange={(e) => setTopic(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Palavras‑chave (separadas por vírgula)</label>
                    <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
                </div>
                {error && <div className="text-red-600">{error}</div>}
                <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">{loading ? 'A gerar...' : 'Gerar artigo'}</button>
            </form>
        </div>
    );
}
