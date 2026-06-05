"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getProjects } from "@/services/projectService";
import { ProjectWithStats } from "@/types/project";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { useTranslations } from "next-intl";
import { Terminal } from "lucide-react";

export default function ProjectsPage() {
  const { role } = useAuth();
  const [projects, setProjects] = useState<ProjectWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("Projects");

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const data = await getProjects(role);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [role]);

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="mb-12 space-y-4">
        <div className="flex items-center gap-2 text-accent">
          <Terminal size={20} />
          <span className="font-mono text-xs uppercase tracking-[0.3em]">
            System.Modules.Projects
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
        <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 rounded-lg border border-accent/10 bg-accent/5">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-accent border-t-transparent" />
          <p className="animate-pulse font-mono text-sm uppercase tracking-widest text-accent">
            {t("loading")}
          </p>
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-accent/20 bg-accent/5 p-12 text-center">
          <Terminal size={48} className="mb-6 text-accent/20" />
          <h2 className="mb-2 text-xl font-bold text-foreground">
            {t("noProjects")}
          </h2>
          <p className="text-muted-foreground">
            Check back later for system updates.
          </p>
        </div>
      )}
    </div>
  );
}
