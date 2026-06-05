"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && role !== "owner") {
      router.push("/");
    }
  }, [role, loading, router]);

  if (loading) return <div className="p-24 text-accent animate-pulse">AUTHENTICATING...</div>;
  if (role !== "owner") return null;

  return (
    <div className="p-24 font-mono">
      <h1 className="text-3xl font-bold text-accent crt-glow mb-8">{">"} ADMIN_DASHBOARD</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AdminCard title="Projects" count={0} />
        <AdminCard title="Experience" count={0} />
        <AdminCard title="Connectors" count={0} />
        <AdminCard title="Skills" count={0} />
      </div>
    </div>
  );
}

function AdminCard({ title, count }: { title: string, count: number }) {
  return (
    <div className="border border-accent/30 p-6 rounded-md bg-background/40 hover:border-accent transition-colors">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-4">Manage your {title.toLowerCase()} data.</p>
      <button className="text-accent hover:underline font-bold">
        [ACCESS_MODULE]
      </button>
    </div>
  );
}
