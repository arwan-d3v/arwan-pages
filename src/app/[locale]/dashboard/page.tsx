"use client";

import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/layout/Header";
import { AlertTriangle, Lock, Eye } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CommandCenter() {
  const { user, role, loading } = useAuth();
  const { locale } = useParams();

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center font-mono">
      <div className="text-neon-cyan animate-pulse text-2xl">AUTHENTICATING_USER_IDENTITY...</div>
    </div>
  );

  const hasAccess = role === 'owner' || role === 'family';

  if (!hasAccess) {
    return (
      <main className="min-h-screen bg-background font-mono flex flex-col items-center justify-center p-6 text-center">
        <Header />
        <div className="max-w-2xl border border-red-500/50 bg-red-500/5 p-12 rounded-lg crt-border-red">
          <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-6 animate-bounce" />
          <h1 className="text-4xl font-bold text-red-500 mb-4 tracking-widest">ACCESS_DENIED</h1>
          <p className="text-xl text-red-400/80 mb-8 leading-relaxed">
            CRITICAL_ERROR: You do not have sufficient clearance to access the Command Center.
            Your current authorization level [PUBLIC] is restricted to peripheral data modules only.
          </p>
          <Link href={`/${locale}`} className="px-8 py-3 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold">
            RETURN_TO_SAFE_ZONE
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background font-mono p-24">
      <Header />
      <div className="flex justify-between items-end mb-12 border-b border-neon-emerald/30 pb-4">
        <div>
          <h1 className="text-4xl font-bold text-neon-emerald crt-glow flex items-center gap-4">
            <Lock className="w-8 h-8" /> COMMAND_CENTER_V1
          </h1>
          <p className="text-neon-emerald/60 mt-2">ACCESS_LEVEL: [{role?.toUpperCase()}] - {role === 'owner' ? 'FULL_WRITE_ACCESS' : 'VIEW_ONLY_ACCESS'}</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground mb-1">SESSION_STABILITY</div>
          <div className="text-xl font-bold text-neon-emerald">STABLE_99.9%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ModuleCard
          title="Internal Feed"
          status="READY"
          description="Daily technical notes and activity vlog."
          role={role}
        />
        <ModuleCard
          title="Analytics"
          status="LIVE"
          description="Real-time traffic and infrastructure monitoring."
          role={role}
        />
        <ModuleCard
          title="Family Vault"
          status="ENCRYPTED"
          description="Private documents and media for verified family tags."
          role={role}
        />
      </div>
    </main>
  );
}

function ModuleCard({ title, status, description, role }: { title: string, status: string, description: string, role: string | null }) {
  return (
    <div className="border border-neon-emerald/20 bg-black/40 p-6 rounded-md hover:border-neon-emerald/50 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-neon-emerald/80">{title}</h3>
        <span className="text-[10px] px-2 py-1 bg-neon-emerald/10 text-neon-emerald border border-neon-emerald/20">{status}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-6 h-12">{description}</p>

      <div className="flex justify-between items-center">
        {role === 'owner' ? (
          <button className="text-xs font-bold text-neon-emerald border border-neon-emerald/30 px-4 py-2 hover:bg-neon-emerald/10 transition-all">
            [ACCESS_AND_MODIFY]
          </button>
        ) : (
          <button className="text-xs font-bold text-neon-emerald/50 border border-neon-emerald/10 px-4 py-2 flex items-center gap-2 cursor-not-allowed">
            <Eye className="w-4 h-4" /> [VIEW_ONLY_MODE]
          </button>
        )}
      </div>
    </div>
  );
}
