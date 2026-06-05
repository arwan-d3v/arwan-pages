"use client";

import React from "react";
import { Connector } from "@/types/connector";
import { Clock, Hash, PlaySquare as Youtube, Video } from "lucide-react";

interface ConnectorCardProps {
  connector: Connector;
}

export const ConnectorCard: React.FC<ConnectorCardProps> = ({ connector }) => {
  const formatDate = (date: any) => {
    if (!date) return "";
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isYouTube = connector.videoUrl?.includes("youtube.com") || connector.videoUrl?.includes("youtu.be");

  return (
    <div className="border border-accent/20 bg-background/40 p-6 backdrop-blur-sm transition-all hover:border-accent/40">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground font-mono italic">
          &gt; {connector.title}
        </h3>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono uppercase">
          <Clock size={12} />
          {formatDate(connector.createdAt)}
        </div>
      </div>

      <div className="mb-6 space-y-4">
        <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
          {connector.content}
        </p>

        {connector.videoUrl && (
          <div className="relative aspect-video w-full overflow-hidden border border-accent/10 bg-black">
             {isYouTube ? (
               <iframe
                 src={connector.videoUrl.replace("watch?v=", "embed/").split("&")[0]}
                 className="absolute inset-0 h-full w-full"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 allowFullScreen
               />
             ) : (
               <div className="flex h-full items-center justify-center text-muted-foreground">
                 <a
                   href={connector.videoUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex flex-col items-center gap-2 hover:text-accent transition-colors"
                 >
                   <Video size={32} />
                   <span className="text-xs uppercase font-mono">External Media Link</span>
                 </a>
               </div>
             )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {connector.tags.map((tag) => (
            <div key={tag} className="flex items-center gap-1 text-[10px] font-mono text-accent/60 uppercase">
              <Hash size={10} />
              {tag}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
           <span className={`h-1 w-8 ${
             connector.visibility === 'public' ? 'bg-emerald-500/50' :
             connector.visibility === 'family' ? 'bg-amber-500/50' : 'bg-accent/50'
           }`} />
           <span className="text-[10px] uppercase tracking-tighter text-muted-foreground/40 font-mono">
             LVL_{connector.visibility.toUpperCase()}
           </span>
        </div>
      </div>
    </div>
  );
};
