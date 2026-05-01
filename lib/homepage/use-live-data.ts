'use client';
import { useEffect, useState } from 'react';

interface ConsciousnessData { globalAwareness: number; marketSentiment: number; activeSources: number; topKeywords: string[]; }
interface Product { id: string; title: string; description: string; price: number; realityScore: number; tags: string[]; author: string; }
interface AuditData { trust: { score: number; explanation: string }; audit: { consistencyScore: number; totalDecisions: number }; }

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://fabulous-figolla-8e0216.netlify.app';

export function useConsciousnessField(refreshInterval = 8000) {
    const [data, setData] = useState<ConsciousnessData | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => { try { const res = await fetch(`${BASE_URL}/api/reality/consciousness`); const json = await res.json(); setData(json); } catch (e) {} setLoading(false); };
        fetchData();
        const interval = setInterval(fetchData, refreshInterval);
        return () => clearInterval(interval);
    }, [refreshInterval]);
    return { data, loading };
}

export function useProducts(refreshInterval = 15000) {
    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => { try { const res = await fetch(`${BASE_URL}/api/revenue/activate`); const json = await res.json(); setData(json.products || []); } catch (e) {} setLoading(false); };
        fetchData();
        const interval = setInterval(fetchData, refreshInterval);
        return () => clearInterval(interval);
    }, [refreshInterval]);
    return { data, loading };
}

export function useAuditData(refreshInterval = 30000) {
    const [data, setData] = useState<AuditData | null>(null);
    useEffect(() => {
        const fetchData = async () => { try { const res = await fetch(`${BASE_URL}/api/intelligence/audit`); const json = await res.json(); setData(json); } catch (e) {} };
        fetchData();
        const interval = setInterval(fetchData, refreshInterval);
        return () => clearInterval(interval);
    }, [refreshInterval]);
    return { data };
}
