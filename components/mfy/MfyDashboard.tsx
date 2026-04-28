'use client';

import { useState, useEffect } from 'react';

interface DashboardStats {
    sessions: number;
    artifacts: number;
    templates: number;
}

export function MfyDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        sessions: 0,
        artifacts: 0,
        templates: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch dashboard stats
        const fetchStats = async () => {
            try {
                // This will be replaced with actual API calls
                setStats({
                    sessions: 0,
                    artifacts: 0,
                    templates: 0
                });
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-zinc-200 rounded w-48 mb-4"></div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="h-24 bg-zinc-100 rounded"></div>
                        <div className="h-24 bg-zinc-100 rounded"></div>
                        <div className="h-24 bg-zinc-100 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">MFY Dashboard</h1>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                <div className="p-6 border rounded-lg bg-white shadow-sm">
                    <h2 className="text-sm font-medium text-zinc-500 mb-2">Total Sessions</h2>
                    <p className="text-3xl font-bold text-zinc-900">{stats.sessions}</p>
                </div>
                <div className="p-6 border rounded-lg bg-white shadow-sm">
                    <h2 className="text-sm font-medium text-zinc-500 mb-2">Artifacts Generated</h2>
                    <p className="text-3xl font-bold text-zinc-900">{stats.artifacts}</p>
                </div>
                <div className="p-6 border rounded-lg bg-white shadow-sm">
                    <h2 className="text-sm font-medium text-zinc-500 mb-2">Templates</h2>
                    <p className="text-3xl font-bold text-zinc-900">{stats.templates}</p>
                </div>
            </div>

            <div className="border rounded-lg bg-white shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <p className="text-zinc-500 text-center py-8">No recent activity</p>
            </div>
        </div>
    );
}

export default MfyDashboard;
