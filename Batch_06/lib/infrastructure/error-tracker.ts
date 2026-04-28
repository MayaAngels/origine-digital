// lib/infrastructure/error-tracker.ts
// Self-hosted error tracking – replaces Sentry
// Logs errors to Postgres + Redis for real-time monitoring

import { redis } from '@/lib/infrastructure/self-hosted-redis';

interface ErrorEvent {
    id: string;
    timestamp: string;
    message: string;
    stack?: string;
    route?: string;
    userId?: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    context?: any;
}

export class ErrorTracker {
    static async capture(error: Error | string, options?: {
        route?: string;
        userId?: string;
        severity?: ErrorEvent['severity'];
        context?: any;
    }) {
        const message = typeof error === 'string' ? error : error.message;
        const stack = typeof error === 'string' ? undefined : error.stack;

        const event: ErrorEvent = {
            id: `err_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            timestamp: new Date().toISOString(),
            message,
            stack,
            route: options?.route || 'unknown',
            userId: options?.userId,
            severity: options?.severity || this.classify(message),
            context: options?.context,
        };

        // Store in Redis for real-time monitoring (last 1000 errors)
        await redis.lpush('errors:recent', JSON.stringify(event));
        await redis.ltrim('errors:recent', 0, 999);

        // Log to console (PM2 captures this)
        console.error(`[ErrorTracker] ${event.severity.toUpperCase()}: ${message}`);

        // If critical, trigger coherence check
        if (event.severity === 'critical') {
            await redis.set('errors:critical_alert', JSON.stringify({
                ...event,
                alertTriggered: true,
            }));
        }

        return event.id;
    }

    static classify(message: string): ErrorEvent['severity'] {
        if (message.includes('Stripe') || message.includes('payment')) return 'critical';
        if (message.includes('database') || message.includes('Postgres')) return 'high';
        if (message.includes('timeout') || message.includes('rate limit')) return 'medium';
        return 'low';
    }

    static async getRecentErrors(limit = 50): Promise<ErrorEvent[]> {
        const raw = await redis.lrange('errors:recent', 0, limit - 1);
        return raw.map(r => JSON.parse(r));
    }

    static async getCriticalAlert(): Promise<ErrorEvent | null> {
        const raw = await redis.get('errors:critical_alert');
        return raw ? JSON.parse(raw) : null;
    }

    static async clearCriticalAlert(): Promise<void> {
        await redis.del('errors:critical_alert');
    }
}
