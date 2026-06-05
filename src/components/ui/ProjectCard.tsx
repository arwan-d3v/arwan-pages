"use client";

import React from "react";
import { ProjectWithStats } from "@/types/project";
import { Code as Github, ExternalLink, Star, GitFork, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProjectCardProps {
  project: ProjectWithStats;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const t = useTranslations("Projects");

  return (
    <div className="group relative overflow-hidden border border-accent/20 bg-background/50 p-6 transition-all hover:border-accent/50 hover:shadow-[0_0_20px_rgba(203,41,87,0.15)]">
      {/* Glow effect on hover */}
      <div className="absolute -inset-px bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-4 flex items-start justify-between">
          <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-3 text-muted-foreground">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                title="GitHub Repository"
              >
                <Github size={20} />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                title="Live Demo"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>

        <p className="mb-6 flex-grow text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {project.techStack && (
          <div className="mb-6 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="border border-accent/10 bg-accent/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent/80"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {project.githubStats && (
          <div className="flex items-center gap-4 border-t border-accent/10 pt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5" title="Stars">
              <Star size={14} className="text-accent/60" />
              <span>{project.githubStats.stars}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Forks">
              <GitFork size={14} className="text-accent/60" />
              <span>{project.githubStats.forks}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Open Issues">
              <AlertCircle size={14} className="text-accent/60" />
              <span>{project.githubStats.issues}</span>
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center gap-2">
           <span className={`h-1.5 w-1.5 rounded-full ${
             project.visibility === 'public' ? 'bg-emerald-500' :
             project.visibility === 'family' ? 'bg-amber-500' : 'bg-accent'
           }`} />
           <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 font-mono">
             [{project.visibility}]
           </span>
        </div>
      </div>
    </div>
  );
};
