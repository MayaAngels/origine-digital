"use client";

import { Download, Clock, AlertCircle } from "lucide-react";

export const dynamic = 'force-dynamic'

const downloads = [
  { id: 1, name: "Business Operations Starter Kit", date: "2025-04-10", size: "2.5 MB", expires: "2025-05-10", downloadsLeft: 5 },
  { id: 2, name: "Client Onboarding Pack", date: "2025-04-05", size: "1.8 MB", expires: "2025-05-05", downloadsLeft: 5 },
  { id: 3, name: "Salon Business Toolkit", date: "2025-03-28", size: "3.2 MB", expires: "2025-04-28", downloadsLeft: 3 },
  { id: 4, name: "AI Prompt System for Business", date: "2025-03-15", size: "1.2 MB", expires: "2025-04-15", downloadsLeft: 2 },
];

export default function DownloadsPage() {
  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Downloads</h1>
          <p className="text-gray-500">Access your purchased digital products</p>
        </div>

        <div className="grid gap-4">
          {downloads.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 flex justify-between items-center hover:shadow-md transition">
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <div className="flex gap-4 mt-1 text-sm text-gray-500">
                  <span>Purchased: {item.date}</span>
                  <span>Size: {item.size}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    Expires: {item.expires}
                  </span>
                  <span>Downloads left: {item.downloadsLeft}</span>
                </div>
              </div>
              <button className="btn-primary flex items-center gap-2">
                <Download size={16} />
                Download
              </button>
            </div>
          ))}
        </div>

        {downloads.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-lg font-semibold mb-2">No downloads yet</h3>
            <p className="text-gray-500">Products you purchase will appear here</p>
            <a href="/shop" className="btn-primary inline-block mt-4">Browse Products →</a>
          </div>
        )}
      </div>
    
  );
}