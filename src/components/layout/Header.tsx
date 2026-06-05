"use client";

import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import {
  LogIn,
  LogOut,
  Shield,
  Users,
  LayoutDashboard,
  Globe,
  FolderLock,
  Briefcase,
  Radio,
  FileText
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export function Header() {
  const { user, role, loginWithGoogle, logout } = useAuth();
  const params = useParams();
  const locale = params?.locale as string || 'en';

  const navLinks = [
    { href: `/${locale}/projects`, label: "PROJECTS", icon: <FolderLock size={14} /> },
    { href: `/${locale}/experience`, label: "EXPERIENCE", icon: <Briefcase size={14} /> },
    { href: `/${locale}/connectors`, label: "CONNECTORS", icon: <Radio size={14} /> },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 p-4 md:px-8 md:py-4 flex justify-between items-center z-50 bg-background/80 backdrop-blur-md border-b border-accent/20">
      <div className="flex items-center gap-8">
        <Link href={`/${locale}`} className="text-lg font-bold text-accent crt-glow flex items-center gap-2">
          <Shield className="w-5 h-5" />
          <span className="hidden lg:inline tracking-tighter">JARVIS_OS v1.0.4</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-accent transition-colors flex items-center gap-2 text-[10px] font-mono tracking-widest text-muted-foreground hover:text-foreground"
            >
              {link.icon} [{link.label}]
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="hidden sm:flex items-center gap-4 border-r border-accent/10 pr-6 mr-2">
           {user && (
             <Link
               href={`/${locale}/resume`}
               className="hover:text-accent transition-colors flex items-center gap-2 text-[10px] font-mono tracking-widest text-accent"
             >
               <FileText size={14} /> [RESUME_GEN]
             </Link>
           )}
           {role === 'owner' && (
             <Link
               href={`/${locale}/admin`}
               className="hover:text-accent transition-colors flex items-center gap-2 text-[10px] font-mono tracking-widest text-accent/80"
             >
               <LayoutDashboard size={14} /> [ROOT]
             </Link>
           )}
        </div>

        <ThemeToggle />

        {user ? (
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col items-end">
               <span className="text-[9px] font-mono text-accent">[{role?.toUpperCase()}]</span>
               <span className="text-[9px] text-muted-foreground truncate max-w-[80px]">{user.displayName || user.email}</span>
            </div>
            <button
              onClick={() => logout()}
              className="flex items-center gap-2 px-3 py-1 border border-red-500/30 rounded text-[10px] font-mono text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" /> <span className="hidden sm:inline">TERMINATE</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => loginWithGoogle()}
            className="flex items-center gap-2 px-4 py-1.5 border border-accent/30 rounded text-[10px] font-mono text-accent hover:bg-accent/10 transition-all bg-accent/5"
          >
            <LogIn className="w-3.5 h-3.5" /> <span>ESTABLISH_CONNECTION</span>
          </button>
        )}
      </div>
    </header>
  );
}
