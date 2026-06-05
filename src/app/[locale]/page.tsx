import { TypewriterEffect } from '@/components/ui/TypewriterEffect';
import { Header } from '@/components/layout/Header';
import { getGitHubStats } from '@/lib/github';

export default async function HomePage() {
  const stats = await getGitHubStats("octocat"); // Placeholder username

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 font-mono relative overflow-hidden bg-gradient-to-tr from-gray-50 via-gray-100 to-gray-200 dark:from-primary dark:via-primary dark:to-primary transition-colors duration-500">
      {/* Grid background */}
      <div className="absolute inset-0 z-0 grid-bg opacity-40 dark:opacity-20 pointer-events-none" />

      <Header />

      <section className="z-10 text-center max-w-4xl w-full">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary dark:bg-none dark:text-foreground tracking-tighter static-red-shadow">
          <TypewriterEffect text="> INITIALIZING_SYSTEM_PROTOCOLS..." speed={40} />
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard label="UPTIME" value={stats.uptime} color="text-accent" darkColor="text-accent" />
          <StatCard label="STARS" value={stats.stars.toString()} color="text-gray-800" darkColor="text-gray-100" />
          <StatCard label="LOC" value={stats.linesOfCode.toLocaleString()} color="text-gray-800" darkColor="text-gray-100" />
          <StatCard label="REPOS" value={stats.reposCount.toString()} color="text-accent" darkColor="text-accent" />
        </div>

        <div className="glass-card p-8 rounded-2xl relative overflow-hidden max-w-3xl mx-auto shadow-md dark:bg-neutral-900/40 dark:border dark:border-accent/20 dark:rounded-lg dark:max-w-none dark:shadow-none dark:backdrop-blur-md">
          {/* Micro‑HUD details – Light mode only */}
          <div className="flex items-center gap-2 mb-4 text-[10px] font-bold text-accent/80 border-b border-gray-200/40 pb-3 uppercase tracking-wider dark:hidden">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse inline-block" />
            <span>[SYSTEM_STATUS: ACTIVE]</span>
            <span className="ml-auto text-gray-400">SECURE_CHANNEL // Friday_OS_V21.03</span>
          </div>

          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-mono">
            Welcome to the command center. System status is operational. All modules are active.
          </p>
        </div>
      </section>

      {/* Footer placeholder */}
      <footer className="footer mt-12">
        <p>© 2026 Your Company – All rights reserved.</p>
      </footer>
    </main>
  );
}

function StatCard({ label, value, color, darkColor }: { label: string, value: string, color: string, darkColor: string }) {
  return (
    <div className="glass-card p-6 rounded-xl relative overflow-hidden hover:-translate-y-1 hover:scale-[1.02] hover:border-accent/50 shadow-sm transition-all duration-300 group dark:bg-neutral-900/20 dark:backdrop-blur-sm dark:border dark:border-accent/10 dark:hover:border-accent/40 dark:p-4 dark:rounded-md dark:shadow-none dark:transform-none dark:hover:translate-y-0 dark:hover:scale-100">
      {/* Left accent line – Light mode only */}
      <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-accent/80 group-hover:w-[6px] transition-all duration-300 dark:hidden" />
      
      <div className="text-[10px] tracking-widest text-gray-400 mb-2 font-bold uppercase group-hover:text-accent transition-colors dark:text-xs dark:text-neutral-400 dark:mb-1 dark:normal-case dark:tracking-normal dark:group-hover:text-accent/80">
        [{label}]
      </div>
      <div className={`text-3xl font-extrabold tracking-tight ${color} dark:text-2xl dark:font-bold dark:tracking-normal ${darkColor} dark:crt-glow`}>
        {value}
      </div>
    </div>
  );
}
