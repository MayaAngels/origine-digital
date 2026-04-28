// lib/collaboration/partnerships.ts
import { redis } from '@/lib/infrastructure/self-hosted-redis';

export interface Team {
    id: string;
    members: string[];
    name: string;
    revenueSplit: Record<string, number>;
    createdBy: string;
    createdAt: string;
}

export class CollaborationEngine {
    async createTeam(members: string[], name: string, createdBy: string): Promise<Team> {
        const id = `team_${Date.now()}`;
        const split: Record<string, number> = {};
        const allMembers = [...new Set([...members, createdBy])];
        allMembers.forEach(m => split[m] = 1.0 / allMembers.length);

        const team: Team = {
            id,
            members: allMembers,
            name,
            revenueSplit: split,
            createdBy,
            createdAt: new Date().toISOString(),
        };

        await redis.hset(`team:${id}`, team as any);
        await redis.lpush(`client:${createdBy}:teams`, id);
        for (const m of allMembers) {
            await redis.lpush(`client:${m}:teams`, id);
        }

        return team;
    }

    async suggestPartners(clientId: string): Promise<string[]> {
        const allClients = await redis.hkeys('clients');
        const clientTags = await redis.get(`client:${clientId}:tags`) || [];
        const suggestions: string[] = [];

        for (const otherId of allClients) {
            if (otherId === clientId) continue;
            const otherTags = await redis.get(`client:${otherId}:tags`) || [];
            const overlap = (clientTags as string[]).filter(t => (otherTags as string[]).includes(t));
            if (overlap.length > 0) {
                suggestions.push(otherId);
            }
        }

        return suggestions.slice(0, 5);
    }

    async getClientTeams(clientId: string): Promise<Team[]> {
        const teamIds = await redis.lrange(`client:${clientId}:teams`, 0, 99);
        const teams: Team[] = [];
        for (const id of teamIds) {
            const data = await redis.hgetall(`team:${id}`);
            if (data) teams.push(data as any);
        }
        return teams;
    }

    async updateRevenueSplit(teamId: string, newSplit: Record<string, number>): Promise<void> {
        const total = Object.values(newSplit).reduce((a, b) => a + Number(b), 0);
        if (Math.abs(total - 1.0) > 0.01) {
            throw new Error('Revenue split must sum to 1.0');
        }
        await redis.hset(`team:${teamId}`, { revenueSplit: newSplit } as any);
    }
}
