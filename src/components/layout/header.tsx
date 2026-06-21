"use client";

import { Bell, Search, Activity, Menu } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useSidebar } from "@/lib/sidebar-context";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { user } = useUser();
  const { toggle } = useSidebar();
  const initials =
    user?.firstName?.[0] ??
    user?.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() ??
    "U";

  return (
    <header
      className="h-16 flex items-center justify-between px-3 sm:px-6 sticky top-0 z-20"
      style={{
        background: "rgba(15, 23, 42, 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Hamburger — mobile only */}
        <button
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all shrink-0"
          onClick={toggle}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-semibold text-white truncate">{title}</h1>
          {subtitle && (
            <p className="text-xs text-slate-400 hidden sm:block truncate">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Search — desktop only */}
        <div className="relative hidden md:flex items-center">
          <Search size={14} className="absolute left-3 text-slate-500" />
          <input
            type="text"
            placeholder="Search hospitals, studies..."
            className="pl-9 pr-4 py-2 text-sm bg-slate-800/60 border border-slate-700 rounded-lg
              text-slate-300 placeholder-slate-500 focus:outline-none focus:border-teal-500
              focus:ring-1 focus:ring-teal-500 transition-all w-64"
          />
        </div>

        {/* SLA indicator — hidden on xs */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-green-400/10 border border-green-400/20">
          <Activity size={12} className="text-green-400" />
          <span className="text-xs font-medium text-green-400">SLA 99.2%</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
        </button>

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}
          title={user?.fullName ?? ""}
        >
          {initials}
        </div>
      </div>
    </header>
  );
}
