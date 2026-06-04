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
    <header className="fixed top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-center z-50 bg-background/80 backdrop-blur-md border-b border-neon-cyan/20">
      <Link href={`/${locale}`} className="text-xl font-bold text-neon-cyan crt-glow flex items-center gap-2">
        <Shield className="w-6 h-6" />
        <span className="hidden sm:inline">JARVIS_OS v1.0.4</span>
      </Link>

      <nav className="flex items-center gap-2 md:gap-6">
        <Link href={`/${locale}`} className="hover:text-neon-cyan transition-colors flex items-center gap-1 text-sm font-mono">
          <Globe className="w-4 h-4" /> [PUBLIC]
        </Link>

        {(role === 'owner' || role === 'family') && (
          <Link href={`/${locale}/dashboard`} className="hover:text-neon-emerald transition-colors flex items-center gap-1 text-sm font-mono text-neon-emerald/80">
            <LayoutDashboard className="w-4 h-4" /> [COMMAND_CENTER]
          </Link>
        )}

        {role === 'owner' && (
          <Link href={`/${locale}/admin/users`} className="hover:text-neon-cyan transition-colors flex items-center gap-1 text-sm font-mono text-neon-cyan/80">
            <Users className="w-4 h-4" /> [USERS]
          </Link>
        )}

        <div className="h-6 w-[1px] bg-white/10 mx-2" />

        <ThemeToggle />

        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1 border border-red-500/30 rounded text-xs font-mono text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">TERMINATE_SESSION</span>
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="flex items-center gap-2 px-3 py-1 border border-neon-cyan/30 rounded text-xs font-mono text-neon-cyan hover:bg-neon-cyan/10 transition-all"
          >
            <LogIn className="w-4 h-4" /> <span className="hidden sm:inline">ESTABLISH_CONNECTION</span>
          </button>
        )}
      </nav>
    </header>
  );
}
