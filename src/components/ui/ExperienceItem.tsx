"use client";

import React from "react";
import { Experience } from "@/types/experience";
import { Calendar, MapPin, Briefcase, ExternalLink } from "lucide-react";

interface ExperienceItemProps {
  experience: Experience;
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience }) => {
  const formatDate = (date: any) => {
    if (!date) return "Present";
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="relative border-l border-accent/20 pl-8 pb-12 last:pb-0">
      {/* Timeline Dot */}
      <div className="absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full bg-accent ring-4 ring-background" />

      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-foreground group">
            {experience.position}
            {experience.link && (
              <a
                href={experience.link}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-block text-muted-foreground hover:text-accent transition-colors"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </h3>
          <div className="flex items-center gap-2 text-accent/80 font-mono text-sm uppercase tracking-wider">
            <Briefcase size={14} />
            {experience.company}
          </div>
        </div>

        <div className="flex flex-col md:items-end gap-1 text-sm text-muted-foreground font-mono">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{formatDate(experience.startDate)} — {formatDate(experience.endDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>{experience.location}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {experience.description.map((item, index) => (
          <p key={index} className="text-muted-foreground text-sm leading-relaxed border-l-2 border-accent/5 pl-4">
            {item}
          </p>
        ))}
      </div>

      {experience.techStack && (
        <div className="flex flex-wrap gap-2">
          {experience.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-background border border-accent/10 text-accent/60 text-[10px] font-mono uppercase tracking-widest"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
