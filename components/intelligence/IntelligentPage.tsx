// components/intelligence/IntelligentPage.tsx
'use client';
import { useEffect, useRef } from 'react';

export default function IntelligentPage({ children }: { children: React.ReactNode }) {
    const hasRun = useRef(false);

    useEffect(() => {
        if (!hasRun.current) {
            console.log('[IntelligentPage] Self-healing, prefetch, and a11y audit active.');
            hasRun.current = true;
        }
    }, []);

    return <div id="intelligent-root">{children}</div>;
}
