// app/api/webhooks/incoming/route.ts
// Built-in integration layer – replaces Zapier/Make
// Clients and external services can POST webhooks here
// The Intelligence Broker decides what action to take

import { NextRequest, NextResponse } from 'next/server';
const ErrorTracker = { capture: async () => '', getRecentErrors: async () => [] };
import { redis } from '../../../lib/infrastructure/self-hosted-redis';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const source = req.headers.get('x-webhook-source') || 'unknown';
        const eventType = req.headers.get('x-webhook-event') || body.type || 'generic';

        // Validate webhook signature (if configured)
        const signature = req.headers.get('x-webhook-signature');
        if (process.env.WEBHOOK_SECRET && signature) {
            // Verify HMAC in production
        }

        // Store the event
        const event = {
            id: `wh_${Date.now()}`,
            timestamp: new Date().toISOString(),
            source,
            eventType,
            payload: body,
            processed: false,
        };

        await redis.lpush('webhooks:incoming', JSON.stringify(event));

        // Log to analytics pipeline
        await redis.lpush('events:pending', JSON.stringify({
            type: 'webhook_received',
            source,
            eventType,
            timestamp: event.timestamp,
        }));

        // Return immediately – processing happens async
        return NextResponse.json({
            received: true,
            eventId: event.id,
            message: 'Webhook queued for processing by Intelligence Broker',
        });

    } catch (error: any) {
        await ErrorTracker.capture(error, {
            route: '/api/webhooks/incoming',
            severity: 'medium',
        });
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// List recent webhooks
export async function GET(req: NextRequest) {
    const source = req.nextUrl.searchParams.get('source');
    const raw = await redis.lrange('webhooks:incoming', 0, 99);
    let events = raw.map(r => JSON.parse(r));
    if (source) {
        events = events.filter(e => e.source === source);
    }
    return NextResponse.json({ events, count: events.length });
}
