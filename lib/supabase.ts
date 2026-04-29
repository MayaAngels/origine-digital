import { createClient } from '@supabase/supabase-js'

function getSupabaseClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('[Supabase] Missing environment variables. Using fallback.');
        return null;
    }

    return {
        supabase: createClient(supabaseUrl, supabaseAnonKey),
        supabaseAdmin: supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null,
    };
}

// Lazy initialization — only created when first accessed
let _client: ReturnType<typeof getSupabaseClient> = null;

function getClient() {
    if (!_client) {
        _client = getSupabaseClient();
    }
    return _client;
}

// Export proxies that safely handle missing env vars
export const supabase = new Proxy({} as any, {
    get(_, prop) {
        const client = getClient();
        if (!client) {
            console.error('[Supabase] Cannot access supabase before initialization');
            return undefined;
        }
        return (client.supabase as any)[prop];
    }
});

export const supabaseAdmin = new Proxy({} as any, {
    get(_, prop) {
        const client = getClient();
        if (!client?.supabaseAdmin) {
            console.error('[Supabase] Cannot access supabaseAdmin before initialization');
            return undefined;
        }
        return (client.supabaseAdmin as any)[prop];
    }
});