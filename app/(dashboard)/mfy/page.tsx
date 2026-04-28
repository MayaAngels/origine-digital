// app/(dashboard)/mfy/page.tsx
"use client";

import { MfyDashboard } from "@/components/mfy/MfyDashboard";

export default function MfyDashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <MfyDashboard />
    </div>
  );
}
