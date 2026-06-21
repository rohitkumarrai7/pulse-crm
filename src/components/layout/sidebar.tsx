"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard, Building2, Users, Flame, Briefcase,
  ClipboardList, UserCheck, Calendar, Mail, Phone,
  FileText, Receipt, BarChart3, GitBranch, Settings,
} from "lucide-react";
import { PulseLogo } from "@/components/logo";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard",         href: "/dashboard",    icon: LayoutDashboard },
  { label: "Hospitals",         href: "/hospitals",    icon: Building2 },
  { label: "Referring Doctors", href: "/contacts",     icon: Users },
  { label: "Hot Leads",         href: "/leads",        icon: Flame },
  { label: "Deals",             href: "/deals",        icon: Briefcase },
  { label: "Studies",           href: "/studies",      icon: ClipboardList },
  { label: "Radiologists",      href: "/radiologists", icon: UserCheck },
  { label: "Calendar",          href: "/calendar",     icon: Calendar },
  { label: "Campaigns",         href: "/campaigns",    icon: Mail },
  { label: "Dialer",            href: "/dialer",       icon: Phone },
  { label: "Contracts",         href: "/contracts",    icon: FileText },
  { label: "Invoices",          href: "/invoices",     icon: Receipt },
  { label: "Reports",           href: "/reports",      icon: BarChart3 },
  { label: "Workflows",         href: "/workflows",    icon: GitBranch },
  { label: "Settings",          href: "/settings",     icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col z-30"
      style={{
        width: "var(--sidebar-width, 260px)",
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border)",
      }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b shrink-0" style={{ borderColor: "var(--border)" }}>
        <PulseLogo size="sm" showText />
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                active
                  ? "text-teal-300"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              )}
              style={
                active
                  ? { background: "linear-gradient(135deg, rgba(13,148,136,0.2), rgba(59,130,246,0.15))" }
                  : {}
              }
            >
              <Icon size={16} strokeWidth={active ? 2.5 : 2} />
              <span>{label}</span>
              {href === "/leads" && (
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 font-semibold">
                  3
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer — Clerk UserButton */}
      <div className="p-4 border-t flex items-center gap-3 shrink-0" style={{ borderColor: "var(--border)" }}>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-8 h-8",
              userButtonPopoverCard: "bg-slate-800 border border-slate-700",
              userButtonPopoverActionButton: "text-slate-200 hover:bg-slate-700",
              userButtonPopoverActionButtonText: "text-slate-200",
              userButtonPopoverFooter: "hidden",
            },
          }}
          afterSignOutUrl="/sign-in"
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-slate-300 truncate">My Account</p>
          <p className="text-xs text-slate-500">Click to manage</p>
        </div>
      </div>
    </aside>
  );
}
