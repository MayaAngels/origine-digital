"use client";

import { useState, useEffect, useRef } from "react";

export function SyntheticAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{role: string, content: string, suggestions?: string[]}>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Mensagem de boas-vindas
    setMessages([
      { 
        role: "agent", 
        content: "Olá! Sou o Agente Sintético da Origine.Digital. Como posso ajudar seu negócio hoje?",
        suggestions: ["Quero aumentar vendas", "Preciso de site", "Sistema de agendamento", "Organizar meu negócio"]
      }
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        role: "agent", 
        content: data.reply,
        suggestions: data.suggestions
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "agent", 
        content: "Desculpe, tive um problema. Pode tentar novamente?" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '30px',
          backgroundColor: '#4f46e5',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.backgroundColor = '#4338ca';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = '#4f46e5';
        }}
      >
        💬
        {messages.length > 1 && (
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            width: '16px',
            height: '16px',
            borderRadius: '8px',
            backgroundColor: '#ef4444',
            color: 'white',
            fontSize: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {messages.length - 1}
          </span>
        )}
      </button>

      {/* Janela do chat */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '20px',
            width: '380px',
            height: '550px',
            backgroundColor: 'white',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            zIndex: 9998,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid #e2e8f0'
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: '#4f46e5',
              color: 'white',
              padding: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>🤖</span>
              <span style={{ fontWeight: 'bold' }}>Agente Sintético</span>
              <span style={{ fontSize: '10px', backgroundColor: 'rgba(255,255,255,0.2)', padding: '2px 6px', borderRadius: '12px' }}>Online</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              backgroundColor: '#f8fafc',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {messages.map((msg, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div
                    style={{
                      backgroundColor: msg.role === 'user' ? '#4f46e5' : 'white',
                      color: msg.role === 'user' ? 'white' : '#1e293b',
                      padding: '12px',
                      borderRadius: '16px',
                      borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                      borderBottomLeftRadius: msg.role === 'user' ? '16px' : '4px',
                      maxWidth: '80%',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                    }}
                  >
                    <p style={{ margin: 0, fontSize: '14px', whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                  </div>
                </div>
                
                {/* Sugestões */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px', marginLeft: '8px' }}>
                    {msg.suggestions.map((sugg, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestion(sugg)}
                        style={{
                          backgroundColor: '#f1f5f9',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          color: '#4f46e5'
                        }}
                      >
                        {sugg}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '16px', borderBottomLeftRadius: '4px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#cbd5e1', borderRadius: '4px', animation: 'bounce 1.4s infinite ease-in-out both' }}></div>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#cbd5e1', borderRadius: '4px', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.2s' }}></div>
                    <div style={{ width: '8px', height: '8px', backgroundColor: '#cbd5e1', borderRadius: '4px', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: '16px',
              borderTop: '1px solid #e2e8f0',
              backgroundColor: 'white'
            }}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
                placeholder="Digite sua mensagem..."
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '24px',
                  outline: 'none',
                  fontSize: '14px'
                }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={isLoading || !input.trim()}
                style={{
                  backgroundColor: '#4f46e5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '8px 20px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  opacity: isLoading || !input.trim() ? 0.5 : 1
                }}
              >
                Enviar
              </button>
            </div>
            <p style={{ fontSize: '10px', textAlign: 'center', color: '#94a3b8', marginTop: '8px' }}>
              🤖 Agente Sintético • IA consultiva • Respostas em tempo real
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </>
  );
}