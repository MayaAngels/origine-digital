// app/create/page.tsx
'use client';
import dynamic from 'next/dynamic';

const ChatInterface = dynamic(() => import('@/components/ChatInterface'), { ssr: false });

export default function CreatePage() {
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#0B0D10' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#11151A' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#6EE7B7', textAlign: 'center' }}>✨ Create with AI</h1>
                <p style={{ fontSize: '0.75rem', color: '#8A93A6', textAlign: 'center' }}>Describe what you want, and I'll make it</p>
            </div>
            <ChatInterface />
        </div>
    );
}