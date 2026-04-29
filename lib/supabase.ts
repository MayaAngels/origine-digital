// lib/supabase.ts — Safe stub that never crashes
const createSafeClient = () => ({
    auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        getSession: async () => ({ data: { session: null }, error: null }),
        signOut: async () => ({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: (table: string) => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: null, error: null }),
        update: () => ({ data: null, error: null }),
        delete: () => ({ data: null, error: null }),
        eq: () => ({ data: [], error: null }),
        order: () => ({ data: [], error: null }),
        limit: () => ({ data: [], error: null }),
        single: () => ({ data: null, error: null }),
    }),
    rpc: () => ({ data: null, error: null }),
});

export const supabase = createSafeClient();
export const supabaseAdmin = createSafeClient();