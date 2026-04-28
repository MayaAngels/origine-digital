// app/client/content/blog/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useClientAuth } from '../../../../../../../components/client/ClientAuthProvider';
import { listBlogPosts } from '../../../../../../../../../lib/client/api';
import Link from 'next/link';

export default function BlogListPage() {
    const { apiKey } = useClientAuth();
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (apiKey) {
            listBlogPosts(apiKey).then(data => {
                setArticles(data.articles || []);
                setLoading(false);
            }).catch(() => setLoading(false));
        }
    }, [apiKey]);

    if (loading) return <div className="text-center py-10">A carregar...</div>;

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6">Artigos de Blog</h1>
            <Link href="/client/content/blog/new" className="bg-indigo-600 text-white px-4 py-2 rounded inline-block mb-4">+ Novo artigo</Link>
            {articles.length === 0 && <p>Nenhum artigo gerado ainda.</p>}
            <div className="space-y-4">
                {articles.map((art: any) => (
                    <div key={art.id} className="border p-4 rounded shadow">
                        <h2 className="text-xl font-semibold">{art.title}</h2>
                        <p className="text-gray-600 mt-2">{art.metaDescription}</p>
                        <small className="text-gray-400">Criado em: {new Date(art.createdAt).toLocaleDateString()}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}
