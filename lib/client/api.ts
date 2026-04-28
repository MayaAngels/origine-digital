// lib/client/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000';

async function fetchClient<T>(endpoint: string, options?: RequestInit, apiKey?: string): Promise<T> {
    const key = apiKey || (typeof window !== 'undefined' ? localStorage.getItem('client_api_key') : null);
    if (!key) throw new Error('No API key');
    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`,
            ...options?.headers,
        },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

export async function getDashboardStats(apiKey?: string) {
    return fetchClient<{ stats: any }>('/api/dashboard/marketing', undefined, apiKey);
}

export async function generateBlogPost(topic: string, keywords: string, apiKey?: string) {
    return fetchClient('/api/content/blog', {
        method: 'POST',
        body: JSON.stringify({ topic, keywords }),
    }, apiKey);
}

export async function generateSocialPost(topic: string, platform: string, tone: string, apiKey?: string) {
    return fetchClient('/api/content/social', {
        method: 'POST',
        body: JSON.stringify({ topic, platform, tone }),
    }, apiKey);
}

export async function listBlogPosts(apiKey?: string) {
    return fetchClient('/api/content/blog', undefined, apiKey);
}

export async function listSocialPosts(apiKey?: string) {
    return fetchClient('/api/content/social', undefined, apiKey);
}
