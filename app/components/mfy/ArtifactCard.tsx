// app/components/mfy/ArtifactCard.tsx
"use client";

interface ArtifactCardProps {
  artifact: {
    id: string;
    type: string;
    name: string;
    status: string;
    deployed_at: string;
  };
  onUse: (id: string) => void;
  onDelete: (id: string) => void;
}

const typeIcons: Record<string, string> = {
  workflow: "⚙️", agent: "🤖", integration: "🔗", code: "💻", dashboard: "📊", document: "📄"
};

const statusColors: Record<string, string> = {
  deployed: "bg-green-100 text-green-800", building: "bg-yellow-100 text-yellow-800", failed: "bg-red-100 text-red-800"
};

export function ArtifactCard({ artifact, onUse, onDelete }: ArtifactCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border dark:border-gray-700 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{typeIcons[artifact.type] || "📦"}</div>
          <div><h3 className="font-semibold">{artifact.name}</h3><p className="text-sm text-gray-500">Criado em {new Date(artifact.deployed_at).toLocaleDateString()}</p></div>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[artifact.status] || "bg-gray-100"}`}>{artifact.status}</span>
      </div>
      <div className="mt-3 flex gap-2">
        <button onClick={() => onUse(artifact.id)} className="flex-1 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700">Usar solução</button>
        <button onClick={() => onDelete(artifact.id)} className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg text-sm">Excluir</button>
      </div>
    </div>
  );
}
