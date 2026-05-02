// components/ChatInterface.tsx
'use client';
import { useState, useRef, useEffect } from 'react';

export default function ChatInterface() {
    const [messages, setMessages] = useState([{ role: 'assistant', content: '✨ Hi! Tell me what product to create.' }]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const endRef = useRef(null);

    useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

    const send = async () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { role: 'user', content: input }]);
        setInput('');
        setLoading(true);
        const res = await fetch('/api/chat/create-product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: input })
        });
        const data = await res.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.message, product: data.product }]);
        setLoading(false);
    };

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#0B0D10' }}>
            <div style={{ flex: 1, overflow: 'auto', padding: '1rem' }}>
                {messages.map((m, i) => (
                    <div key={i} style={{ textAlign: m.role === 'user' ? 'right' : 'left', margin: '0.5rem 0' }}>
                        <span style={{ background: m.role === 'user' ? '#6EE7B7' : '#11151A', color: m.role === 'user' ? '#000' : '#FFF', padding: '0.5rem 1rem', borderRadius: '1rem', display: 'inline-block' }}>
                            {m.content}
                        </span>
                        {m.product && (
                            <div style={{ marginTop: '0.5rem', background: '#11151A', padding: '0.5rem', borderRadius: '0.5rem' }}>
                                <b>{m.product.title}</b> - €{m.product.price}
                                <button onClick={() => window.location.href = `/checkout?product=${m.product.id}&price=${m.product.price}&title=${m.product.title}`}>Buy</button>
                            </div>
                        )}
                    </div>
                ))}
                {loading && <div>Thinking...</div>}
                <div ref={endRef} />
            </div>
            <div style={{ padding: '1rem', borderTop: '1px solid #333', display: 'flex' }}>
                <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && send()} style={{ flex: 1, padding: '0.5rem', borderRadius: '1rem', border: 'none' }} />
                <button onClick={send} style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem', borderRadius: '1rem', background: '#6EE7B7', border: 'none' }}>Send</button>
            </div>
        </div>
    );
}