import { Header } from "@/components/layout/header";
import { Settings, Bell, Shield, Palette, Database, Mail, Brain, Globe } from "lucide-react";

const settingSections = [
  {
    icon: Shield,
    title: "Authentication",
    description: "Manage team members, roles, and permissions",
    color: "#3b82f6",
    fields: [
      { label: "Authentication Provider", value: "Clerk", type: "info" },
      { label: "Session Duration",        value: "7 days",  type: "info" },
      { label: "Two-Factor Auth",         value: "Enabled via Clerk", type: "info" },
    ],
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Configure SLA alerts, renewal reminders, and lead notifications",
    color: "#f59e0b",
    fields: [
      { label: "SLA Breach Alerts",       value: "Email + In-app",   type: "toggle" },
      { label: "Contract Renewal (90d)",  value: "Email sequence",    type: "toggle" },
      { label: "Hot Lead Alerts",         value: "Email + WhatsApp",  type: "toggle" },
      { label: "Daily Digest",            value: "7:00 AM IST",       type: "select" },
    ],
  },
  {
    icon: Mail,
    title: "Email (SMTP)",
    description: "Configure outbound email settings for campaigns and alerts",
    color: "#0d9488",
    fields: [
      { label: "SMTP Host",    value: process.env.SMTP_HOST ?? "Configured via env", type: "info" },
      { label: "From Address", value: "Configured via env",         type: "info" },
      { label: "Status",       value: "✓ Connected",                type: "info" },
    ],
  },
  {
    icon: Brain,
    title: "AI (Pulse Intent Engine)",
    description: "Configure AI model for lead scoring and insights",
    color: "#8b5cf6",
    fields: [
      { label: "Provider",        value: "OpenRouter",          type: "info" },
      { label: "Insights Model",  value: "GPT-4o Mini",         type: "info" },
      { label: "Scoring Model",   value: "GPT-4o Nano",         type: "info" },
      { label: "Status",          value: "✓ Connected",          type: "info" },
    ],
  },
  {
    icon: Database,
    title: "Database",
    description: "PostgreSQL via Neon DB — connection pooling enabled",
    color: "#22c55e",
    fields: [
      { label: "Provider",  value: "Neon PostgreSQL",   type: "info" },
      { label: "Region",    value: "US East 1",          type: "info" },
      { label: "Status",    value: "✓ Connected",         type: "info" },
    ],
  },
  {
    icon: Globe,
    title: "Localization",
    description: "Currency, timezone, and regional settings",
    color: "#fb7185",
    fields: [
      { label: "Currency",  value: "INR (₹)",            type: "select" },
      { label: "Timezone",  value: "Asia/Kolkata (IST)", type: "select" },
      { label: "Date Format", value: "DD MMM YYYY",      type: "select" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div>
      <Header title="Settings" subtitle="Configure PulseCRM for your organization" />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {settingSections.map((section) => (
            <div key={section.title} className="pulse-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg" style={{ background: `${section.color}15` }}>
                  <section.icon size={18} style={{ color: section.color }} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{section.title}</h3>
                  <p className="text-xs text-slate-400">{section.description}</p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-700/50">
                {section.fields.map(f => (
                  <div key={f.label} className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">{f.label}</span>
                    {f.type === "toggle" ? (
                      <button className="relative w-11 h-6 rounded-full transition-all"
                        style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
                        <span className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                      </button>
                    ) : (
                      <span className="text-sm font-medium text-white">{f.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Branding section */}
        <div className="mt-6 pulse-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-teal-500/10">
              <Palette size={18} className="text-teal-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Branding & Theme</h3>
              <p className="text-xs text-slate-400">Customize colors, logo, and theme preferences</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: "Healthcare Pro", colors: ["#0d9488", "#3b82f6"], active: true },
              { name: "Clinical Light", colors: ["#0d9488", "#f1f5f9"], active: false },
              { name: "Focus Dark",     colors: ["#3b82f6", "#f59e0b"], active: false },
            ].map(t => (
              <button key={t.name} className={`p-4 rounded-xl border-2 transition-all text-left ${
                t.active ? "border-teal-500" : "border-slate-700 hover:border-slate-600"
              }`}>
                <div className="flex gap-2 mb-2">
                  {t.colors.map(c => (
                    <div key={c} className="w-6 h-6 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <p className="text-sm font-medium text-white">{t.name}</p>
                {t.active && <p className="text-xs text-teal-400 mt-0.5">Active</p>}
              </button>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div className="mt-6 pulse-card p-6 border border-rose-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Settings size={18} className="text-rose-400" />
            <h3 className="font-semibold text-rose-400">Danger Zone</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Reset Demo Data</p>
              <p className="text-xs text-slate-400">Re-seed the database with fresh sample data</p>
            </div>
            <button className="px-4 py-2 rounded-lg text-sm font-medium text-rose-400 border border-rose-500/30 hover:bg-rose-500/10 transition-all">
              Reset Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
