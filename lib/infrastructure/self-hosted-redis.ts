// lib/infrastructure/self-hosted-redis.ts
// Replaces @upstash/redis – connects to your own Redis server
//
// Usage:
//   import { redis } from '@/lib/infrastructure/self-hosted-redis';
//   await redis.set('key', 'value');
//   const val = await redis.get('key');

import { createClient, RedisClientType } from 'redis';

let client: RedisClientType | null = null;

export async function getRedisClient(): Promise<RedisClientType> {
    if (client && client.isOpen) return client;

    const url = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
    const password = process.env.REDIS_PASSWORD || undefined;

    client = createClient({
        url,
        password,
        socket: {
            reconnectStrategy: (retries) => Math.min(retries * 100, 5000),
        },
    });

    client.on('error', (err) => console.error('[Redis] Client error:', err.message));
    client.on('connect', () => console.log('[Redis] Connected'));
    client.on('reconnecting', () => console.log('[Redis] Reconnecting...'));

    await client.connect();
    return client;
}

// Convenience wrapper with the same API as @upstash/redis
export const redis = {
    async get(key: string): Promise<any> {
        const c = await getRedisClient();
        const val = await c.get(key);
        try { return val ? JSON.parse(val) : null; } catch { return val; }
    },
    async set(key: string, value: any): Promise<void> {
        const c = await getRedisClient();
        const str = typeof value === 'string' ? value : JSON.stringify(value);
        await c.set(key, str);
    },
    async hgetall(key: string): Promise<Record<string, any> | null> {
        const c = await getRedisClient();
        const data = await c.hGetAll(key);
        if (!data || Object.keys(data).length === 0) return null;
        const parsed: Record<string, any> = {};
        for (const [k, v] of Object.entries(data)) {
            try { parsed[k] = JSON.parse(v); } catch { parsed[k] = v; }
        }
        return parsed;
    },
    async hset(key: string, data: Record<string, any>): Promise<void> {
        const c = await getRedisClient();
        const flat: Record<string, string> = {};
        for (const [k, v] of Object.entries(data)) {
            flat[k] = typeof v === 'string' ? v : JSON.stringify(v);
        }
        await c.hSet(key, flat);
    },
    async lrange(key: string, start: number, stop: number): Promise<string[]> {
        const c = await getRedisClient();
        return await c.lRange(key, start, stop);
    },
    async lpush(key: string, ...values: string[]): Promise<number> {
        const c = await getRedisClient();
        return await c.lPush(key, values.reverse());
    },
    async ltrim(key: string, start: number, stop: number): Promise<void> {
        const c = await getRedisClient();
        await c.lTrim(key, start, stop);
    },
    async xrange(key: string, start: string, end: string): Promise<any[]> {
        const c = await getRedisClient();
        const result = await c.xRange(key, start, end);
        return result.map(r => ({ id: r.id, fields: r.message }));
    },
    async hkeys(key: string): Promise<string[]> {
        const c = await getRedisClient();
        return await c.hKeys(key);
    },
    async del(key: string): Promise<void> {
        const c = await getRedisClient();
        await c.del(key);
    },
    async ping(): Promise<string> {
        const c = await getRedisClient();
        return await c.ping();
    },
};

// Graceful shutdown
process.on('SIGTERM', async () => {
    if (client?.isOpen) await client.quit();
});
