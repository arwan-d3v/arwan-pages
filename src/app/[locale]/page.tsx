import { useTranslations } from 'next-intl';
import { TypewriterEffect } from '@/components/ui/TypewriterEffect';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { getGitHubStats } from '@/lib/github';

export default async function HomePage() {
  const stats = await getGitHubStats("octocat"); // Placeholder username

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 font-mono relative overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(var(--color-neon-cyan) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <header className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 bg-background/80 backdrop-blur-sm border-b border-neon-cyan/20">
        <div className="text-xl font-bold text-neon-cyan crt-glow">
          JARVIS_OS v1.0.4
        </div>
        <div className="flex gap-4">
          <ThemeToggle />
        </div>
      </header>

      <section className="z-10 text-center max-w-4xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-foreground tracking-tighter">
          <TypewriterEffect text="> INITIALIZING_SYSTEM_PROTOCOLS..." speed={40} />
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard label="UPTIME" value={stats.uptime} color="text-neon-emerald" />
          <StatCard label="STARS" value={stats.stars.toString()} color="text-neon-cyan" />
          <StatCard label="LOC" value={stats.linesOfCode.toLocaleString()} color="text-neon-cyan" />
          <StatCard label="REPOS" value={stats.reposCount.toString()} color="text-neon-emerald" />
        </div>

        <div className="border border-neon-cyan/30 bg-black/40 p-8 rounded-lg crt-border backdrop-blur-md">
          <p className="text-xl text-neon-cyan/80 leading-relaxed">
            Welcome to the command center. System status is operational. All modules are green.
          </p>
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="border border-neon-cyan/20 p-4 rounded-md bg-black/20 backdrop-blur-sm hover:border-neon-cyan/50 transition-all group">
      <div className="text-xs text-muted-foreground mb-1 group-hover:text-neon-cyan/70 transition-colors">[{label}]</div>
      <div className={`text-2xl font-bold ${color} crt-glow`}>{value}</div>
    </div>
  );
}
