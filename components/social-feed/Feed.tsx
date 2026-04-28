// components/social-feed/Feed.tsx
'use client';
import { useEffect, useState } from 'react';

interface Post {
    id: string;
    title: string;
    description: string;
    price: number;
    cover: string;
    likes: number;
    author: string;
}

export default function Feed() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch('/api/feed/list')
            .then(r => r.json())
            .then(d => setPosts(d.posts || []))
            .catch(() => setPosts([]));
    }, []);

    if (posts.length === 0) {
        return <div style={{ padding: '2rem', color: '#8A93A6' }}>No products in feed yet.</div>;
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', padding: '1rem' }}>
            {posts.map(post => (
                <div key={post.id} style={{ background: '#11151A', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <h3 style={{ color: '#E6EAF0' }}>{post.title}</h3>
                    <p style={{ color: '#8A93A6', fontSize: '0.9rem' }}>{post.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                        <span style={{ color: '#6EE7B7', fontWeight: 700 }}>€{post.price?.toFixed(2)}</span>
                        <span style={{ color: '#8A93A6' }}>❤️ {post.likes}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#8A93A6', marginTop: '0.25rem' }}>by {post.author}</div>
                </div>
            ))}
        </div>
    );
}
