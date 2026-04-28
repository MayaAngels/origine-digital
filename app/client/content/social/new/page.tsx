// app/client/content/social/new/page.tsx
'use client';
import { useState } from 'react';
import { useClientAuth } from '../../../../../components/client/ClientAuthProvider';
import { generateSocialPost } from '../../../../../lib/client/api';
import { useRouter } from 'next/navigation';

export default function NewSocialPage() {
    const { apiKey } = useClientAuth();
    const router = useRouter();
    const [topic, setTopic] = useState('');
    const [platform, setPlatform] = useState('twitter');
    const [tone, setTone] = useState('professional');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await generateSocialPost(topic, platform, tone, apiKey || undefined);
            router.push('/client/dashboard');
        } catch (err) {
            setError('Erro ao gerar post. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6">Gerar novo post social</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tópico</label>
                    <input type="text" required className="mt-1 block w-full border rounded-md p-2" value={topic} onChange={(e) => setTopic(e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Plataforma</label>
                    <select className="mt-1 block w-full border rounded-md p-2" value={platform} onChange={(e) => setPlatform(e.target.value)}>
                        <option value="twitter">Twitter</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="facebook">Facebook</option>
                        <option value="instagram">Instagram</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tom</label>
                    <select className="mt-1 block w-full border rounded-md p-2" value={tone} onChange={(e) => setTone(e.target.value)}>
                        <option value="professional">Profissional</option>
                        <option value="casual">Descontraído</option>
                        <option value="urgent">Urgente</option>
                        <option value="enthusiastic">Entusiasta</option>
                    </select>
                </div>
                {error && <div className="text-red-600">{error}</div>}
                <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">{loading ? 'A gerar...' : 'Gerar post'}</button>
            </form>
        </div>
    );
}
