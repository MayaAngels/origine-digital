// app/api/admin/analytics/route.ts
// Self-hosted analytics – replaces Google Analytics 4
// Queries your own Postgres event log

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../../lib/postgres-stub'; // or your own Postgres client

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get('days') || '30');
    const metric = searchParams.get('metric') || 'revenue';

    try {
        switch (metric) {
            case 'revenue':
                const revenue = await sql`
                    SELECT DATE(created_at) as date, 
                           COUNT(*) as transactions, 
                           SUM(revenue) as total_revenue,
                           AVG(revenue) as avg_order_value
                    FROM events 
                    WHERE type = 'purchase' 
                      AND created_at > NOW() - INTERVAL '${days} days'
                    GROUP BY DATE(created_at)
                    ORDER BY date DESC
                `;
                return NextResponse.json({ metric: 'revenue', data: revenue.rows });

            case 'traffic':
                const traffic = await sql`
                    SELECT DATE(created_at) as date, 
                           COUNT(DISTINCT session_id) as unique_visitors,
                           COUNT(*) as page_views
                    FROM events 
                    WHERE type = 'page_view' 
                      AND created_at > NOW() - INTERVAL '${days} days'
                    GROUP BY DATE(created_at)
                    ORDER BY date DESC
                `;
                return NextResponse.json({ metric: 'traffic', data: traffic.rows });

            case 'conversion':
                const conversion = await sql`
                    SELECT DATE(created_at) as date,
                           COUNT(DISTINCT CASE WHEN type = 'purchase' THEN session_id END) * 100.0 / 
                           NULLIF(COUNT(DISTINCT session_id), 0) as conversion_rate
                    FROM events 
                    WHERE type IN ('page_view', 'purchase')
                      AND created_at > NOW() - INTERVAL '${days} days'
                    GROUP BY DATE(created_at)
                    ORDER BY date DESC
                `;
                return NextResponse.json({ metric: 'conversion', data: conversion.rows });

            case 'bandits':
                const bandits = await sql`
                    SELECT variant_id, 
                           COUNT(*) as impressions,
                           SUM(CASE WHEN reward = 1 THEN 1 ELSE 0 END) as successes,
                           SUM(CASE WHEN reward = 1 THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(*), 0) as success_rate
                    FROM bandit_events 
                    WHERE created_at > NOW() - INTERVAL '${days} days'
                    GROUP BY variant_id
                    ORDER BY success_rate DESC
                `;
                return NextResponse.json({ metric: 'bandits', data: bandits.rows });

            case 'summary':
                const summary = await sql`
                    SELECT 
                        COUNT(DISTINCT session_id) as total_visitors,
                        COUNT(DISTINCT CASE WHEN type = 'purchase' THEN session_id END) as buyers,
                        SUM(CASE WHEN type = 'purchase' THEN revenue ELSE 0 END) as total_revenue,
                        COUNT(DISTINCT DATE(created_at)) as active_days
                    FROM events 
                    WHERE created_at > NOW() - INTERVAL '${days} days'
                `;
                return NextResponse.json({ metric: 'summary', data: summary.rows[0] });

            default:
                return NextResponse.json({ error: 'Unknown metric' }, { status: 400 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
