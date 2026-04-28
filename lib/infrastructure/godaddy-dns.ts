// lib/infrastructure/godaddy-dns.ts
// Autonomous DNS management via GoDaddy API
// Uses GODADDY_API_KEY and GODADDY_API_SECRET from environment

export class GoDaddyDNS {
    private domain: string;
    private baseUrl: string;
    private headers: Record<string, string>;

    constructor(domain = 'originedigital.ie') {
        this.domain = domain;
        this.baseUrl = `https://api.godaddy.com/v1/domains/${domain}/records`;
        
        const apiKey = process.env.GODADDY_API_KEY!;
        const apiSecret = process.env.GODADDY_API_SECRET!;
        const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
        
        this.headers = {
            'Authorization': `sso-key ${auth}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
    }

    async listRecords(): Promise<any[]> {
        const res = await fetch(this.baseUrl, { headers: this.headers });
        if (!res.ok) throw new Error(`GoDaddy API error: ${res.status}`);
        return res.json();
    }

    async addRecord(type: string, name: string, data: string, ttl = 3600): Promise<void> {
        const records = await this.listRecords();
        records.push({ type, name, data, ttl });
        await fetch(this.baseUrl, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(records),
        });
    }

    async deleteRecord(type: string, name: string): Promise<void> {
        await fetch(`${this.baseUrl}/${type}/${name}`, {
            method: 'DELETE',
            headers: this.headers,
        });
    }

    async pointToVercel(): Promise<void> {
        const records = await this.listRecords();
        const mxRecords = records.filter((r: any) => r.type === 'MX');
        const txtRecords = records.filter((r: any) => r.type === 'TXT');
        
        const newRecords: any[] = [
            { type: 'CNAME', name: '@', data: 'cname.vercel-dns.com', ttl: 3600 },
            { type: 'CNAME', name: 'www', data: 'cname.vercel-dns.com', ttl: 3600 },
            ...mxRecords,
            ...txtRecords,
        ];
        
        await fetch(this.baseUrl, {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(newRecords),
        });
    }

    async verify(): Promise<{ domain: string; cnameCorrect: boolean; records: any[] }> {
        const records = await this.listRecords();
        const rootCNAME = records.find((r: any) => r.type === 'CNAME' && r.name === '@');
        return {
            domain: this.domain,
            cnameCorrect: rootCNAME?.data === 'cname.vercel-dns.com',
            records,
        };
    }
}
