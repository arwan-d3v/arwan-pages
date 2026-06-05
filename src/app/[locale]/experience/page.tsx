"use client";

import React, { useEffect, useState } from "react";
import { getExperiences } from "@/services/experienceService";
import { Experience } from "@/types/experience";
import { ExperienceItem } from "@/components/ui/ExperienceItem";
import { useTranslations } from "next-intl";
import { Terminal, Briefcase, Rocket } from "lucide-react";

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("Experience");

  useEffect(() => {
    async function fetchExperiences() {
      setLoading(true);
      try {
        const data = await getExperiences();
        setExperiences(data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
  }, []);

  const fullTimeExp = experiences.filter(exp => exp.type === 'full-time');
  const freelanceExp = experiences.filter(exp => exp.type === 'freelance');

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="mb-16 space-y-4">
        <div className="flex items-center gap-2 text-accent">
          <Terminal size={20} />
          <span className="font-mono text-xs uppercase tracking-[0.3em]">
            System.Modules.Experience
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
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Full-Time Section */}
          <section>
            <div className="flex items-center gap-3 mb-12">
              <div className="p-2 bg-accent/10 border border-accent/20">
                <Briefcase size={24} className="text-accent" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight uppercase font-mono italic">
                {t("fullTime")}
              </h2>
            </div>
            <div className="space-y-2">
              {fullTimeExp.map((exp) => (
                <ExperienceItem key={exp.id} experience={exp} />
              ))}
              {fullTimeExp.length === 0 && (
                <p className="text-muted-foreground font-mono text-sm italic">
                  [No records found in this sector]
                </p>
              )}
            </div>
          </section>

          {/* Freelance Section */}
          <section>
            <div className="flex items-center gap-3 mb-12">
              <div className="p-2 bg-accent/10 border border-accent/20">
                <Rocket size={24} className="text-accent" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight uppercase font-mono italic">
                {t("freelance")}
              </h2>
            </div>
            <div className="space-y-2">
              {freelanceExp.map((exp) => (
                <ExperienceItem key={exp.id} experience={exp} />
              ))}
              {freelanceExp.length === 0 && (
                <p className="text-muted-foreground font-mono text-sm italic">
                  [No records found in this sector]
                </p>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
