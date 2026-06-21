"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Flame, Plus, Filter, TrendingUp, TrendingDown, Loader2 } from "lucide-react";

type Owner = { name: string | null };
type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  company: string | null;
  city: string | null;
  source: string;
  intentScore: number;
  temperature: string;
  status: string;
  lastActivityAt: string | null;
  owner: Owner | null;
};

const tempColors: Record<string, { text: string; bg: string }> = {
  HOT:  { text: "#fb7185", bg: "rgba(251,113,133,0.1)" },
  WARM: { text: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  COLD: { text: "#60a5fa", bg: "rgba(96,165,250,0.1)" },
  DEAD: { text: "#64748b", bg: "rgba(100,116,139,0.1)" },
};

const sourceLabels: Record<string, string> = {
  REFERRAL: "Referral", WEB: "Web", COLD_OUTREACH: "Cold Outreach",
  CONFERENCE: "Conference", SOCIAL: "Social", MANUAL: "Manual",
};

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return "—";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [tempFilter, setTempFilter] = useState("All");

  useEffect(() => {
    fetch("/api/leads")
      .then((r) => r.json())
      .then((d) => { setLeads(d.leads ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const hot  = leads.filter((l) => l.temperature === "HOT").length;
  const warm = leads.filter((l) => l.temperature === "WARM").length;
  const cold = leads.filter((l) => l.temperature === "COLD").length;

  const filtered = tempFilter === "All" ? leads : leads.filter((l) => l.temperature === tempFilter);

  return (
    <div>
      <Header title="Hot Leads" subtitle="Pulse Intent Engine — AI-scored prospect tracking" />

      <div className="p-3 sm:p-6">
        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[
            { label: "HOT (80+)",   count: hot,        color: "#fb7185" },
            { label: "WARM (50+)",  count: warm,       color: "#f59e0b" },
            { label: "COLD (20+)",  count: cold,       color: "#60a5fa" },
            { label: "Total Leads", count: leads.length, color: "#0d9488" },
          ].map((s) => (
            <div key={s.label} className="pulse-card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-400 mb-1">{s.label}</p>
                  <p className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</p>
                </div>
                <TrendingUp size={14} className="text-green-400 mt-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <select
            value={tempFilter}
            onChange={(e) => setTempFilter(e.target.value)}
            className="px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:border-teal-500"
          >
            <option value="All">All Temperatures</option>
            <option value="HOT">HOT</option>
            <option value="WARM">WARM</option>
            <option value="COLD">COLD</option>
          </select>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 border border-slate-700 bg-slate-800 hover:bg-slate-700 transition-all ml-auto">
            <Filter size={14} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white font-medium"
            style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
            <Plus size={14} /> <span className="hidden sm:inline">Add Lead</span>
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <Loader2 size={20} className="animate-spin mr-2" /> Loading…
          </div>
        ) : (
          <div className="pulse-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                    {["Lead", "Company", "Source", "Intent Score", "Temperature", "Status", "Assigned To", "Last Activity"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                  {filtered.map((l) => {
                    const tc = tempColors[l.temperature] ?? tempColors.COLD;
                    return (
                      <tr key={l.id} className="hover:bg-slate-800/40 cursor-pointer transition-all">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-white whitespace-nowrap">
                              {l.firstName} {l.lastName}
                            </p>
                            <p className="text-xs text-slate-400">{l.city || "—"}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-300 text-sm whitespace-nowrap">{l.company || "—"}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 whitespace-nowrap">
                            {sourceLabels[l.source] ?? l.source}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-14 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full rounded-full"
                                style={{
                                  width: `${l.intentScore}%`,
                                  background: l.intentScore >= 80 ? "#fb7185" : l.intentScore >= 50 ? "#f59e0b" : "#3b82f6",
                                }} />
                            </div>
                            <span className="text-sm font-bold font-mono" style={{ color: tc.text }}>
                              {l.intentScore}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                            style={{ color: tc.text, background: tc.bg }}>
                            {l.temperature === "HOT" && <Flame size={10} />}
                            {l.temperature}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs text-slate-300 bg-slate-800 px-2 py-0.5 rounded whitespace-nowrap">
                            {l.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">
                          {l.owner?.name || "Unassigned"}
                        </td>
                        <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                          {timeAgo(l.lastActivityAt)}
                        </td>
                      </tr>
                    );
                  })}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-10 text-center text-slate-500 text-sm">
                        No leads found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
