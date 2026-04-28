'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body>
                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="text-center max-w-md">
                        <h1 className="text-4xl font-bold text-red-600 mb-4">Application Error</h1>
                        <h2 className="text-xl font-semibold text-zinc-900 mb-2">Something went wrong!</h2>
                        <p className="text-zinc-600 mb-6">
                            {error.message || 'An unexpected error occurred.'}
                        </p>
                        <button
                            onClick={reset}
                            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}
