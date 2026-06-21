"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flame, ArrowRight, Loader2 } from "lucide-react";

type Lead = {
  id: string;
  firstName: string;
  lastName: string;
  company: string | null;
  city: string | null;
  intentScore: number;
  temperature: string;
  owner: { name: string | null } | null;
};

function IntentBadge({ score }: { score: number }) {
  const color = score >= 80 ? "#fb7185" : score >= 50 ? "#f59e0b" : "#60a5fa";
  const bg    = score >= 80 ? "rgba(251,113,133,0.1)" : score >= 50 ? "rgba(245,158,11,0.1)" : "rgba(96,165,250,0.1)";
  const label = score >= 80 ? "HOT" : score >= 50 ? "WARM" : "COLD";
  return (
    <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
      style={{ color, background: bg }}>
      {score >= 80 && <Flame size={10} />}
      {label} · {score}
    </span>
  );
}

export function HotLeadsWidget() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leads")
      .then((r) => r.json())
      .then((d) => {
        const top = (d.leads ?? [])
          .filter((l: Lead) => l.temperature === "HOT" || l.temperature === "WARM")
          .slice(0, 4);
        setLeads(top);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="pulse-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame size={16} className="text-rose-400" />
          <h3 className="text-sm font-semibold text-white">Lead Pipeline</h3>
        </div>
        <Link href="/leads" className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1">
          View all <ArrowRight size={12} />
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-6 text-slate-500">
          <Loader2 size={16} className="animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <div key={lead.id}
              className="flex items-start justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-all cursor-pointer">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {lead.firstName} {lead.lastName}{lead.company ? ` · ${lead.company}` : ""}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{lead.city ?? "—"}</p>
                <p className="text-xs text-slate-500 mt-1">→ {lead.owner?.name ?? "Unassigned"}</p>
              </div>
              <div className="ml-3 shrink-0">
                <IntentBadge score={lead.intentScore} />
              </div>
            </div>
          ))}
          {leads.length === 0 && (
            <p className="text-xs text-slate-500 text-center py-4">No hot leads right now.</p>
          )}
        </div>
      )}
    </div>
  );
}
