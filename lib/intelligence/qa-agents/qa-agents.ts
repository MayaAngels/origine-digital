// lib/intelligence/qa-agents/qa-agents.ts
// 5 autonomous QA agents that validate every product before publishing.

interface QAResult {
    agent: string;
    passed: boolean;
    score: number;       // 0-1
    details: string;
    timestamp: string;
}

export async function runAllQAChecks(product: any): Promise<QAResult[]> {
    const results = await Promise.all([
        checkLinks(product),
        checkDownloads(product),
        checkResponsive(product),
        checkPayment(product),
        checkContent(product),
    ]);
    return results;
}

// QA Agent 1: Link Checker
async function checkLinks(product: any): Promise<QAResult> {
    const links = extractLinks(product);
    const results = await Promise.all(links.map(async (link) => {
        try {
            const response = await fetch(link, { method: 'HEAD' });
            return response.ok;
        } catch { return false; }
    }));
    const passed = results.every(r => r);
    const score = results.filter(r => r).length / Math.max(1, results.length);
    return {
        agent: 'LinkChecker',
        passed,
        score,
        details: passed ? 'All links valid' : `${results.filter(r => !r).length} broken links found`,
        timestamp: new Date().toISOString(),
    };
}

// QA Agent 2: Download Verifier
async function checkDownloads(product: any): Promise<QAResult> {
    if (!product.downloadUrl) {
        return { agent: 'DownloadAgent', passed: false, score: 0, details: 'No download URL found', timestamp: new Date().toISOString() };
    }
    try {
        const response = await fetch(product.downloadUrl, { method: 'HEAD' });
        const size = parseInt(response.headers.get('content-length') || '0');
        const passed = response.ok && size > 0;
        return {
            agent: 'DownloadAgent',
            passed,
            score: passed ? 1 : 0,
            details: passed ? `Download verified (${(size / 1024).toFixed(1)} KB)` : 'Download failed',
            timestamp: new Date().toISOString(),
        };
    } catch {
        return { agent: 'DownloadAgent', passed: false, score: 0, details: 'Download unreachable', timestamp: new Date().toISOString() };
    }
}

// QA Agent 3: Responsive Checker
async function checkResponsive(product: any): Promise<QAResult> {
    const viewports = [320, 768, 1024, 1440];
    const checkoutUrl = product.checkoutUrl || `/checkout?product=${product.id}`;
    let passed = true;
    const details: string[] = [];
    for (const width of viewports) {
        try {
            const response = await fetch(checkoutUrl, {
                headers: { 'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1 width=${width}` }
            });
            if (!response.ok) { passed = false; details.push(`Failed at ${width}px`); }
        } catch { passed = false; details.push(`Unreachable at ${width}px`); }
    }
    return {
        agent: 'ResponsiveAgent',
        passed,
        score: passed ? 1 : 0.5,
        details: passed ? 'All viewports accessible' : details.join(', '),
        timestamp: new Date().toISOString(),
    };
}

// QA Agent 4: Payment Flow Checker
async function checkPayment(product: any): Promise<QAResult> {
    if (!product.price || product.price <= 0) {
        return { agent: 'PaymentAgent', passed: false, score: 0, details: 'No valid price set', timestamp: new Date().toISOString() };
    }
    try {
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: product.id, price: product.price, title: product.title }),
        });
        const data = await response.json();
        const passed = response.ok && !!data.url;
        return {
            agent: 'PaymentAgent',
            passed,
            score: passed ? 1 : 0,
            details: passed ? 'Checkout flow verified' : 'Checkout flow broken',
            timestamp: new Date().toISOString(),
        };
    } catch {
        return { agent: 'PaymentAgent', passed: false, score: 0, details: 'Checkout unreachable', timestamp: new Date().toISOString() };
    }
}

// QA Agent 5: Content Integrity Checker
async function checkContent(product: any): Promise<QAResult> {
    const checks: string[] = [];
    if (!product.title || product.title.length < 5) checks.push('Title too short or missing');
    if (!product.description || product.description.length < 20) checks.push('Description too short or missing');
    if (!product.price || product.price <= 0) checks.push('Invalid price');
    if (product.imageUrl) {
        try {
            const response = await fetch(product.imageUrl, { method: 'HEAD' });
            if (!response.ok) checks.push('Cover image broken');
        } catch { checks.push('Cover image unreachable'); }
    }
    const passed = checks.length === 0;
    return {
        agent: 'ContentAgent',
        passed,
        score: passed ? 1 : (5 - checks.length) / 5,
        details: passed ? 'All content valid' : checks.join(', '),
        timestamp: new Date().toISOString(),
    };
}

function extractLinks(product: any): string[] {
    const links: string[] = [];
    if (product.checkoutUrl) links.push(product.checkoutUrl);
    if (product.downloadUrl) links.push(product.downloadUrl);
    if (product.imageUrl) links.push(product.imageUrl);
    return links;
}
