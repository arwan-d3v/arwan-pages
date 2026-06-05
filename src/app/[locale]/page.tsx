import { useTranslations } from 'next-intl';
import { TypewriterEffect } from '@/components/ui/TypewriterEffect';
import { getGitHubStats, getRecentActivity } from '@/lib/github';
import { getConnectors } from '@/services/connectorService';
import { Terminal, GitBranch, MessageSquare, Star, Activity } from 'lucide-react';

export default async function HomePage() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "octocat";
  const stats = await getGitHubStats(username);
  const gitActivities = await getRecentActivity(username);
  const connectors = await getConnectors('user'); // Public only

  // Interleave activities
  const combinedFeed = [
    ...gitActivities.map((a: any) => ({
      id: a.id,
      type: 'github',
      title: a.type.replace("Event", "").replace(/([A-Z])/g, ' $1').trim(),
      subtitle: a.repo.name,
      date: new Date(a.created_at)
    })),
    ...connectors.map((c: any) => ({
      id: c.id,
      type: 'connector',
      title: c.title,
      subtitle: c.content.substring(0, 50) + '...',
      date: c.createdAt?.toDate ? c.createdAt.toDate() : new Date()
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 10);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 font-mono relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <section className="z-10 text-center max-w-5xl w-full py-12">
        <div className="mb-4 flex items-center justify-center gap-2 text-accent/60">
          <Terminal size={16} />
          <span className="text-[10px] uppercase tracking-[0.4em]">Establishing secure connection...</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-bold mb-12 text-foreground tracking-tighter">
          <TypewriterEffect text="> INITIALIZING_SYSTEM_PROTOCOLS..." speed={40} />
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <StatCard label="UPTIME" value={stats.uptime} color="text-accent" />
          <StatCard label="STARS" value={stats.stars.toLocaleString()} color="text-accent" />
          <StatCard label="LOC" value={stats.linesOfCode.toLocaleString()} color="text-accent" />
          <StatCard label="REPOS" value={stats.reposCount.toString()} color="text-accent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
           <div className="lg:col-span-2 space-y-6">
              <div className="border border-accent/20 bg-background/40 p-8 backdrop-blur-md relative group">
                <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                <p className="text-lg md:text-xl text-foreground leading-relaxed">
                  Welcome to the command center. System status is operational.
                  Synchronizing multi-tier visibility protocols for authorized personnel.
                </p>
                <div className="mt-6 flex items-center gap-4 text-xs text-accent/60 uppercase tracking-widest">
                   <span className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> NETWORK_READY</span>
                   <span className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> DATABASE_SYNCED</span>
                </div>
              </div>
           </div>

           <div className="lg:col-span-1">
              <div className="border border-accent/10 bg-accent/5 p-6 backdrop-blur-sm h-full">
                 <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                    <Activity size={14} className="text-accent" />
                    System_Pulse_Feed
                 </h3>
                 <div className="space-y-4">
                    {combinedFeed.map((item) => (
                       <div key={item.id} className="text-[10px] border-l border-accent/20 pl-3 py-1 hover:border-accent transition-colors">
                          <div className="flex items-center gap-2 text-accent/80 font-bold uppercase mb-0.5">
                             {item.type === 'github' ? <GitBranch size={10} /> : <MessageSquare size={10} />}
                             {item.title}
                          </div>
                          <div className="text-muted-foreground truncate">
                             {item.subtitle}
                          </div>
                       </div>
                    ))}
                    {combinedFeed.length === 0 && (
                      <p className="text-[10px] text-muted-foreground italic uppercase">[No recent signals detected]</p>
                    )}
                 </div>
              </div>
           </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="border border-accent/10 p-6 bg-background/20 backdrop-blur-sm hover:border-accent/30 transition-all group relative overflow-hidden">
      <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
         <Star size={80} />
      </div>
      <div className="text-[10px] text-muted-foreground mb-2 group-hover:text-accent/70 transition-colors uppercase tracking-widest">
        [{label}]
      </div>
      <div className={`text-2xl md:text-3xl font-bold ${color} font-mono tracking-tighter transition-transform group-hover:scale-105`}>
        {value}
      </div>
    </div>
  );
}
