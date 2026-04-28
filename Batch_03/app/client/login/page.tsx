// app/client/login/page.tsx
'use client';
import { useState } from 'react';
import { useClientAuth } from '@/components/client/ClientAuthProvider';
import { useRouter } from 'next/navigation';

export default function ClientLoginPage() {
    const [apiKey, setApiKey] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useClientAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const success = await login(apiKey.trim());
        if (success) {
            router.push('/client/dashboard');
        } else {
            setError('API Key inválida. Verifique e tente novamente.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Acesso ao Dashboard
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Insira a sua API Key fornecida no registo.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="api-key" className="sr-only">API Key</label>
                            <input
                                id="api-key"
                                name="api-key"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="API Key (ex: od_...)"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                            />
                        </div>
                    </div>
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? 'A verificar...' : 'Entrar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
