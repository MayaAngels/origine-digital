// app/components/mfy/MfyButton.tsx
"use client";

import { useState } from "react";

interface MfyButtonProps {
  productContext?: {
    id: string;
    name: string;
    category: string;
  };
  variant?: "primary" | "secondary";
  className?: string;
}

export function MfyButton({ productContext, variant = "primary", className = "" }: MfyButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"started" | "collecting" | "ready" | "building" | "completed">("started");
  const [proposedSpec, setProposedSpec] = useState<string | null>(null);

  const startSession = async () => {
    setIsLoading(true);
    setMessages([{ role: "assistant", content: "Olá! Me conte qual problema você gostaria que eu resolvesse para você?" }]);
    
    try {
      const response = await fetch("/api/mfy/session/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initialPrompt: productContext?.name, context: productContext })
      });
      const data = await response.json();
      setSessionId(data.session_id);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading || !sessionId) return;
    
    const userMessage = inputValue.trim();
    setInputValue("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/mfy/session/${sessionId}/question`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: userMessage })
      });
      
      const data = await response.json();
      
      if (data.is_sufficient) {
        setStatus("ready");
        setProposedSpec(data.proposed_spec);
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: `Com base no que você me contou, posso construir esta solução:\n\n${data.proposed_spec}\n\nConfirma que é isso que você precisa?` 
        }]);
      } else if (data.next_question) {
        setMessages(prev => [...prev, { role: "assistant", content: data.next_question }]);
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmBuild = async () => {
    if (!sessionId) return;
    setIsLoading(true);
    setStatus("building");
    
    try {
      await fetch(`/api/mfy/session/${sessionId}/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmed: true, modifiedSpec: proposedSpec })
      });
      
      const buildResponse = await fetch(`/api/mfy/session/${sessionId}/build`, { method: "POST" });
      const buildData = await buildResponse.json();
      
      if (buildData.success) {
        setStatus("completed");
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: `✅ Solução criada com sucesso! ID: ${buildData.artifact_id}\n\nAcesse no Dashboard para usar.` 
        }]);
      }
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => {
    setIsOpen(true);
    if (messages.length === 0) startSession();
  };

  const variantStyles = {
    primary: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200"
  };

  return (
    <>
      <button
        onClick={openModal}
        className={`px-6 py-3 rounded-lg font-semibold transition shadow-sm hover:shadow-md flex items-center gap-2 ${variantStyles[variant]} ${className}`}
      >
        <span>✨</span>
        <span>Quero uma versão FEITA PARA MIM</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                  <span className="text-white text-xl">✨</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Feito para Você</h2>
                  <p className="text-sm text-gray-500">Solução personalizada com IA</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">✕</button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.role === "user" ? "bg-purple-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"}`}>
                    <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2">
                    <div className="flex gap-1"><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span><span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span></div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            {status !== "completed" && (
              <div className="p-4 border-t dark:border-gray-700">
                {status === "ready" && (
                  <div className="mb-3 flex gap-2">
                    <button onClick={confirmBuild} className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700">✅ Sim, construa para mim</button>
                    <button onClick={() => setStatus("started")} className="px-4 py-2 rounded-lg border hover:bg-gray-50">Não, ajustar</button>
                  </div>
                )}
                <div className="flex gap-2">
                  <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === "Enter" && sendMessage()} placeholder="Digite sua resposta..." disabled={isLoading || status === "ready" || status === "building"} className="flex-1 px-4 py-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  <button onClick={sendMessage} disabled={!inputValue.trim() || isLoading || status === "ready" || status === "building"} className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50">Enviar</button>
                </div>
              </div>
            )}

            {status === "completed" && (
              <div className="p-4 border-t">
                <button onClick={() => setIsOpen(false)} className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg font-semibold">Fechar e ver no Dashboard</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
