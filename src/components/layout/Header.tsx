"use client";

import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LogIn, LogOut, Shield, Users, LayoutDashboard, Globe } from "lucide-react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { useParams } from "next/navigation";

export function Header() {
  const { user, role } = useAuth();
  const { locale } = useParams();

  const handleLogin = async () => {
    if (!auth) {
      alert("Firebase not configured.");
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    if (auth) signOut(auth);
  };

  return (
    <header className="fixed top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-50 bg-background/70 backdrop-blur-md border-b border-slate-200/80 dark:border-neon-cyan/20 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.03)] dark:shadow-none transition-all duration-300">
      {/* Ambient Light removed – using static red shadow on title */}
      <Link href={`/${locale}`} className="text-xl font-bold text-primary dark:text-accent static-red-shadow flex items-center gap-2 relative z-10">
        <Shield className="w-6 h-6" />
        <span className="hidden sm:inline">Friday_OS V21.03</span>
      </Link>

      <nav className="flex items-center gap-2 md:gap-6">
        <Link href={`/${locale}`} className="hover:text-accent dark:hover:text-accent transition-colors flex items-center gap-1 text-sm font-mono text-slate-700 dark:text-foreground">
          <Globe className="w-4 h-4" /> [PUBLIC]
        </Link>

        {(role === 'owner' || role === 'family') && (
          <Link href={`/${locale}/dashboard`} className="hover:text-emerald-600 dark:hover:text-neon-emerald transition-colors flex items-center gap-1 text-sm font-mono text-emerald-600 dark:text-neon-emerald/80">
            <LayoutDashboard className="w-4 h-4" /> [COMMAND_CENTER]
          </Link>
        )}

        {role === 'owner' && (
          <Link href={`/${locale}/admin/users`} className="hover:text-sky-600 dark:hover:text-neon-cyan transition-colors flex items-center gap-1 text-sm font-mono text-sky-600 dark:text-neon-cyan/80">
            <Users className="w-4 h-4" /> [USERS]
          </Link>
        )}

        <div className="h-6 w-[1px] bg-slate-200 dark:bg-white/10 mx-2" />

        <ThemeToggle />

        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1 border border-red-500/30 rounded text-xs font-mono text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">TERMINATE_SESSION</span>
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="flex items-center gap-2 px-3 py-1 border border-sky-600/30 dark:border-neon-cyan/30 rounded text-xs font-mono text-sky-600 dark:text-neon-cyan hover:bg-sky-600/10 dark:hover:bg-neon-cyan/10 transition-all"
          >
            <LogIn className="w-4 h-4" /> <span className="hidden sm:inline">ESTABLISH_CONNECTION</span>
          </button>
        )}
      </nav>
    </header>
  );
}
