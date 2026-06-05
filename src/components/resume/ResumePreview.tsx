"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getExperiences } from "@/services/experienceService";
import { getSkills } from "@/services/skillService";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ATSFormat } from "./ATSFormat";
import { CreativeFormat } from "./CreativeFormat";
import QRCode from 'qrcode';
import { FileText, Download, Edit3, Eye, Settings2 } from "lucide-react";

export default function ResumePreview() {
  const { user } = useAuth();
  const [template, setTemplate] = useState<"ats" | "creative">("ats");
  const [resumeData, setResumeData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function loadData() {
      const exp = await getExperiences();
      const skills = await getSkills();

      let qrCodeDataUri = '';
      try {
        const url = `${window.location.origin}/en/projects`;
        qrCodeDataUri = await QRCode.toDataURL(url);
      } catch (err) {
        console.error(err);
      }

      setResumeData({
        qrCode: qrCodeDataUri,
        personal: {
          name: user?.displayName || "System User",
          email: user?.email || "user@example.com",
          phone: "+62 000 0000 000",
          location: "Jakarta, Indonesia",
          summary: "Highly technical full-stack developer with experience in Firebase, Next.js, and modern cloud architectures."
        },
        experience: exp.map(e => ({
          position: e.position,
          company: e.company,
          period: "Jan 2023 - Present", // Mock period logic
          description: e.description
        })),
        skills: skills.map(s => s.name)
      });
    }
    loadData();
  }, [user]);

  if (!resumeData) return <div className="p-20 font-mono animate-pulse">RECOVERING_IDENTITY_RECORDS...</div>;

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-12 flex flex-col md:flex-row items-start justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 text-accent mb-2">
             <FileText size={18} />
             <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Protocol.Resume.Generator</span>
           </div>
           <h1 className="text-3xl font-bold tracking-tight">IDENTITY_REPLICATION</h1>
        </div>

        <div className="flex flex-wrap gap-4">
           <div className="flex border border-accent/20 p-1">
              <button
                onClick={() => setTemplate("ats")}
                className={`px-4 py-1.5 text-[10px] font-mono transition-all ${template === 'ats' ? 'bg-accent text-white' : 'hover:bg-accent/10'}`}
              >
                STRICT_ATS
              </button>
              <button
                onClick={() => setTemplate("creative")}
                className={`px-4 py-1.5 text-[10px] font-mono transition-all ${template === 'creative' ? 'bg-accent text-white' : 'hover:bg-accent/10'}`}
              >
                CREATIVE_ID
              </button>
           </div>

           <PDFDownloadLink
             document={template === 'ats' ? <ATSFormat data={resumeData} /> : <CreativeFormat data={resumeData} />}
             fileName={`Resume_${user?.displayName?.replace(/\s/g, '_')}.pdf`}
             className="flex items-center gap-2 bg-foreground text-background px-4 py-2 text-[10px] font-mono font-bold hover:bg-accent hover:text-white transition-all"
           >
             {({ loading }) => loading ? 'GENERATING...' : <><Download size={14} /> EXPORT_PDF</>}
           </PDFDownloadLink>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Editor Section */}
         <div className="lg:col-span-4 space-y-6">
            <div className="border border-accent/20 bg-background/50 p-6">
               <h3 className="flex items-center gap-2 text-sm font-bold font-mono mb-6 border-b border-accent/10 pb-2 uppercase">
                  <Edit3 size={16} /> Data_Adjustment
               </h3>

               <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-muted-foreground">Full Name</label>
                    <input
                      className="w-full bg-background border border-accent/20 p-2 text-xs font-mono"
                      value={resumeData.personal.name}
                      onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, name: e.target.value}})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-muted-foreground">Summary</label>
                    <textarea
                      className="w-full bg-background border border-accent/20 p-2 text-xs font-mono h-32"
                      value={resumeData.personal.summary}
                      onChange={(e) => setResumeData({...resumeData, personal: {...resumeData.personal, summary: e.target.value}})}
                    />
                  </div>
               </div>
            </div>

            <div className="p-4 border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-4">
               <Settings2 size={24} className="text-emerald-500" />
               <p className="text-[10px] font-mono leading-relaxed text-emerald-500/80">
                  Core data synchronized with master database. Manual overrides only affect current generation session.
               </p>
            </div>
         </div>

         {/* Preview Section */}
         <div className="lg:col-span-8">
            <div className="border border-accent/20 bg-black/40 h-[800px] flex items-center justify-center relative group">
               <div className="absolute top-4 left-4 z-10 bg-accent px-2 py-1 text-[8px] font-mono text-white animate-pulse">
                  LIVE_VISUALIZATION_READY
               </div>
               {/*
                  PDFViewer only works on client and might have issues in some sandboxes,
                  but it's the standard way for @react-pdf/renderer
               */}
               <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
                  {template === 'ats' ? <ATSFormat data={resumeData} /> : <CreativeFormat data={resumeData} />}
               </PDFViewer>
            </div>
         </div>
      </div>
    </div>
  );
}
