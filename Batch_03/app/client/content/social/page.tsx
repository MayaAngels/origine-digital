// app/client/content/social/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useClientAuth } from '@/components/client/ClientAuthProvider';
import { listSocialPosts } from '@/lib/client/api';
import Link from 'next/link';

export default function SocialListPage() {
    const { apiKey } = useClientAuth();
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (apiKey) {
            listSocialPosts(apiKey).then(data => {
                setPosts(data.posts || []);
                setLoading(false);
            }).catch(() => setLoading(false));
        }
    }, [apiKey]);

    if (loading) return <div className="text-center py-10">A carregar...</div>;

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6">Posts para Redes Sociais</h1>
            <Link href="/client/content/social/new" className="bg-green-600 text-white px-4 py-2 rounded inline-block mb-4">+ Novo post</Link>
            {posts.length === 0 && <p>Nenhum post gerado ainda.</p>}
            <div className="space-y-4">
                {posts.map((post: any) => (
                    <div key={post.id} className="border p-4 rounded shadow">
                        <p className="text-gray-800">{post.content}</p>
                        <div className="mt-2 text-sm text-gray-500">Plataforma: {post.platform} | Tom: {post.tone}</div>
                        <small className="text-gray-400">Criado em: {new Date(post.createdAt).toLocaleDateString()}</small>
                    </div>
                ))}
            </div>
        </div>
    );
}
