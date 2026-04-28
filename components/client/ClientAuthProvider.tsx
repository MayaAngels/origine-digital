// components/client/ClientAuthProvider.tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';

interface ClientAuthContextType {
    apiKey: string | null;
    clientId: string | null;
    login: (apiKey: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const ClientAuthContext = createContext<ClientAuthContextType | undefined>(undefined);

export function ClientAuthProvider({ children }: { children: React.ReactNode }) {
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [clientId, setClientId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedKey = localStorage.getItem('client_api_key');
        if (storedKey) {
            setApiKey(storedKey);
            verifyAndSetClient(storedKey);
        } else {
            setIsLoading(false);
        }
    }, []);

    const verifyAndSetClient = async (key: string) => {
        try {
            const res = await fetch('/api/client/verify', {
                headers: { Authorization: `Bearer ${key}` },
            });
            if (res.ok) {
                const data = await res.json();
                setClientId(data.clientId);
                setApiKey(key);
                localStorage.setItem('client_api_key', key);
            } else {
                localStorage.removeItem('client_api_key');
                setApiKey(null);
                setClientId(null);
            }
        } catch {
            localStorage.removeItem('client_api_key');
            setApiKey(null);
            setClientId(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (key: string): Promise<boolean> => {
        try {
            const res = await fetch('/api/client/verify', {
                headers: { Authorization: `Bearer ${key}` },
            });
            if (res.ok) {
                const data = await res.json();
                setClientId(data.clientId);
                setApiKey(key);
                localStorage.setItem('client_api_key', key);
                return true;
            }
            return false;
        } catch {
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('client_api_key');
        setApiKey(null);
        setClientId(null);
    };

    return (
        <ClientAuthContext.Provider value={{ apiKey, clientId, login, logout, isLoading }}>
            {children}
        </ClientAuthContext.Provider>
    );
}

export function useClientAuth() {
    const context = useContext(ClientAuthContext);
    if (!context) throw new Error('useClientAuth must be used within ClientAuthProvider');
    return context;
}
