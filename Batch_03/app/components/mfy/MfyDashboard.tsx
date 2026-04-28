// app/components/mfy/MfyDashboard.tsx
"use client";

import { useEffect, useState } from "react";
import { ArtifactCard } from "./ArtifactCard";
import { TemplateLibrary } from "./TemplateLibrary";

export function MfyDashboard() {
  const [artifacts, setArtifacts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"my" | "templates">("my");
  const [isLoading, setIsLoading] = useState(true);

  const fetchArtifacts = async () => {
    try {
      const response = await fetch("/api/mfy/artifacts");
      const data = await response.json();
      setArtifacts(data.artifacts || []);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchArtifacts(); }, []);

  const handleUse = async (id: string) => {
    await fetch(`/api/mfy/artifacts/${id}/use`, { method: "POST" });
    alert("✅ Uso registrado! Você será cobrado apenas pelo primeiro uso (€5).");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza?")) return;
    await fetch(`/api/mfy/artifacts?id=${id}`, { method: "DELETE" });
    fetchArtifacts();
  };

  return (
    <div className="space-y-6">
      <div className="border-b flex gap-4">
        <button onClick={() => setActiveTab("my")} className={`px-4 py-2 font-medium ${activeTab === "my" ? "border-b-2 border-purple-600 text-purple-600" : "text-gray-500"}`}>Minhas Soluções</button>
        <button onClick={() => setActiveTab("templates")} className={`px-4 py-2 font-medium ${activeTab === "templates" ? "border-b-2 border-purple-600 text-purple-600" : "text-gray-500"}`}>Biblioteca</button>
      </div>

      {activeTab === "my" && (
        isLoading ? <div className="text-center py-8">Carregando...</div> :
        artifacts.length === 0 ? (
          <div className="text-center py-12"><div className="text-6xl mb-4">✨</div><h3 className="text-lg font-semibold">Você ainda não tem soluções</h3><p className="text-gray-500">Clique em "Feito para Você" em qualquer produto para criar sua primeira solução.</p></div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">{artifacts.map(a => <ArtifactCard key={a.id} artifact={a} onUse={handleUse} onDelete={handleDelete} />)}</div>
        )
      )}

      {activeTab === "templates" && <TemplateLibrary />}
    </div>
  );
}
