import { Header } from "@/components/layout/header";
import { Mail, Plus, Send, Eye, MousePointer, TrendingUp } from "lucide-react";

const campaigns = [
  {
    name: "Contract Expiry Sequence — Q3",
    status: "ACTIVE",
    type: "DRIP",
    audience: "Contracts expiring in 90 days",
    sent: 48,
    opened: 31,
    clicked: 14,
    replied: 6,
    startedAt: "Jun 10, 2026",
  },
  {
    name: "Hot Lead Welcome — June 2026",
    status: "ACTIVE",
    type: "SINGLE",
    audience: "Intent score ≥ 80",
    sent: 8,
    opened: 7,
    clicked: 5,
    replied: 3,
    startedAt: "Jun 15, 2026",
  },
  {
    name: "Teleradiology ROI Newsletter",
    status: "DRAFT",
    type: "NEWSLETTER",
    audience: "All contacts",
    sent: 0,
    opened: 0,
    clicked: 0,
    replied: 0,
    startedAt: "—",
  },
  {
    name: "Churn Risk Re-engagement",
    status: "PAUSED",
    type: "DRIP",
    audience: "Churn risk > 60%",
    sent: 12,
    opened: 8,
    clicked: 3,
    replied: 1,
    startedAt: "Jun 1, 2026",
  },
];

const statusColors: Record<string, { text: string; bg: string }> = {
  ACTIVE: { text: "#22c55e", bg: "rgba(34,197,94,0.1)" },
  DRAFT:  { text: "#64748b", bg: "rgba(100,116,139,0.1)" },
  PAUSED: { text: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  SENT:   { text: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
};

export default function CampaignsPage() {
  return (
    <div>
      <Header title="Campaigns" subtitle="Email sequences and outreach automation" />

      <div className="p-6">
        {/* Summary */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Emails Sent",    value: 68,    icon: Send,         color: "#3b82f6" },
            { label: "Open Rate",      value: "68%", icon: Eye,          color: "#0d9488" },
            { label: "Click Rate",     value: "32%", icon: MousePointer, color: "#f59e0b" },
            { label: "Reply Rate",     value: "15%", icon: TrendingUp,   color: "#22c55e" },
          ].map(s => (
            <div key={s.label} className="pulse-card p-5 text-center">
              <s.icon size={20} className="mx-auto mb-2" style={{ color: s.color }} />
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-end mb-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white font-medium"
            style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
            <Plus size={14} /> New Campaign
          </button>
        </div>

        {/* Campaign cards */}
        <div className="space-y-4">
          {campaigns.map(c => {
            const sc = statusColors[c.status];
            const openRate = c.sent > 0 ? Math.round((c.opened / c.sent) * 100) : 0;
            const clickRate = c.sent > 0 ? Math.round((c.clicked / c.sent) * 100) : 0;
            return (
              <div key={c.name} className="pulse-card p-5 hover:border-slate-600 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ color: sc.text, background: sc.bg }}>{c.status}</span>
                      <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">{c.type}</span>
                    </div>
                    <h3 className="font-semibold text-white">{c.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Audience: {c.audience}</p>
                  </div>
                  <p className="text-xs text-slate-500">Started {c.startedAt}</p>
                </div>

                <div className="grid grid-cols-4 gap-4 pt-4 border-t border-slate-700/50">
                  {[
                    { label: "Sent",    value: c.sent,    color: "#94a3b8" },
                    { label: "Opened",  value: `${c.opened} (${openRate}%)`, color: "#0d9488" },
                    { label: "Clicked", value: `${c.clicked} (${clickRate}%)`, color: "#3b82f6" },
                    { label: "Replied", value: c.replied, color: "#22c55e" },
                  ].map(m => (
                    <div key={m.label} className="text-center">
                      <p className="text-lg font-bold" style={{ color: m.color }}>{m.value}</p>
                      <p className="text-xs text-slate-500">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
