"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getConnectors } from "@/services/connectorService";
import { Connector } from "@/types/connector";
import { ConnectorCard } from "@/components/ui/ConnectorCard";
import { useTranslations } from "next-intl";
import { Activity, Radio } from "lucide-react";

export default function ConnectorsPage() {
  const { role } = useAuth();
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("Connectors");

  useEffect(() => {
    async function fetchConnectors() {
      setLoading(true);
      try {
        const data = await getConnectors(role);
        setConnectors(data);
      } catch (error) {
        console.error("Error fetching connectors:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchConnectors();
  }, [role]);

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="mb-16 space-y-4">
        <div className="flex items-center gap-2 text-accent">
          <Activity size={20} />
          <span className="font-mono text-xs uppercase tracking-[0.3em]">
            System.Modules.Connectors
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl text-foreground">
          {t("title")}
        </h1>
        <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
          {t("subtitle")}
        </p>
        <div className="h-1 w-24 bg-accent" />
      </div>

      {loading ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-accent border-t-transparent" />
          <p className="animate-pulse font-mono text-sm uppercase tracking-widest text-accent">
            {t("loading")}
          </p>
        </div>
      ) : connectors.length > 0 ? (
        <div className="mx-auto max-w-3xl space-y-8">
          {connectors.map((connector) => (
            <ConnectorCard key={connector.id} connector={connector} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-accent/20 bg-accent/5 p-12 text-center">
          <Radio size={48} className="mb-6 text-accent/20 animate-pulse" />
          <h2 className="mb-2 text-xl font-bold text-foreground">
            {t("noFeed")}
          </h2>
          <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
            Scanning for signals...
          </p>
        </div>
      )}
    </div>
  );
}
