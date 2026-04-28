import { NextResponse } from 'next/server';
import client from 'prom-client';

// Registar métricas básicas
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
});

export async function GET() {
    const metrics = await client.register.metrics();
    return new NextResponse(metrics, {
        headers: { 'Content-Type': client.register.contentType },
    });
}
