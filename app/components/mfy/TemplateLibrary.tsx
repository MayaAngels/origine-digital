// app/components/mfy/TemplateLibrary.tsx
"use client";

import { useEffect, useState } from "react";

interface Template {
  id: string;
  name: string;
  description: string;
  artifact_type: string;
  category: string;
  usage_count: number;
}

export function TemplateLibrary() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/mfy/templates").then(res => res.json()).then(data => { setTemplates(data.templates || []); setIsLoading(false); }).catch(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div className="text-center py-8">Carregando templates...</div>;
  if (templates.length === 0) return <div className="text-center py-8 text-gray-500">Nenhum template disponível ainda.</div>;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {templates.map(template => (
        <div key={template.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border">
          <h3 className="font-semibold">{template.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{template.description}</p>
          <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
            <span>📊 {template.usage_count} usos</span>
            <span>📁 {template.category}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
