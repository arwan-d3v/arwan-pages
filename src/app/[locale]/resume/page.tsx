"use client";

import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";
import { ShieldAlert } from "lucide-react";

// PDF components often need dynamic import to avoid SSR issues
const ResumePreview = dynamic(() => import("@/components/resume/ResumePreview"), {
  ssr: false,
  loading: () => <div className="p-24 font-mono animate-pulse">BOOTING_VISUALIZER...</div>
});

export default function ResumePage() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="border border-accent/20 p-8 text-center max-w-md space-y-4">
           <ShieldAlert size={48} className="mx-auto text-accent" />
           <h1 className="text-xl font-bold font-mono uppercase">Unauthorized_Protocol</h1>
           <p className="text-sm text-muted-foreground font-mono">
              Identity verification required to access replication services. Please establish a secure connection.
           </p>
        </div>
      </div>
    );
  }

  return <ResumePreview />;
}
