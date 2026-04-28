// lib/social/social-mock.ts
// Simulação de publicação em redes sociais (sem chamadas reais)

export interface SocialAccount {
    id: string;
    platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram' | 'tiktok';
    name: string;
    username: string;
    connected: boolean;
    createdAt: string;
}

export interface ScheduledPost {
    id: string;
    accountId: string;
    content: string;
    mediaUrls?: string[];
    scheduledAt: string; // ISO
    status: 'pending' | 'published' | 'failed';
    publishedAt?: string;
    error?: string;
}

// Mock de publicação (apenas log)
export async function publishToPlatform(account: SocialAccount, content: string): Promise<boolean> {
    console.log(`[SOCIAL MOCK] Publicando em ${account.platform} (${account.username}): "${content.substring(0, 100)}..."`);
    // Simular sucesso (90% das vezes)
    const success = Math.random() > 0.1;
    if (success) {
        console.log(`[SOCIAL MOCK] ✅ Publicado com sucesso em ${account.platform}`);
    } else {
        console.log(`[SOCIAL MOCK] ❌ Falha simulada em ${account.platform}`);
    }
    return success;
}
