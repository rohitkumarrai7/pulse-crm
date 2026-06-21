import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";

const hotLeads = [
  {
    name: "Apollo Hospitals, Bannerghatta",
    intentScore: 92,
    reason: "Contract expiring in 45 days · Referred by Narayana Health",
    assignedTo: "Rahul S.",
  },
  {
    name: "Max Super Speciality, Saket Delhi",
    intentScore: 88,
    reason: "New hospital · No current vendor · 1500 studies/month",
    assignedTo: "Priya M.",
  },
  {
    name: "Fortis Healthcare, Mulund",
    intentScore: 68,
    reason: "Looking to outsource · 1200 studies/month in-house",
    assignedTo: "Rahul S.",
  },
];

function IntentBadge({ score }: { score: number }) {
  const color = score >= 80 ? "#fb7185" : score >= 50 ? "#f59e0b" : "#60a5fa";
  const bg = score >= 80 ? "rgba(251,113,133,0.1)" : score >= 50 ? "rgba(245,158,11,0.1)" : "rgba(96,165,250,0.1)";
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

      <div className="space-y-3">
        {hotLeads.map((lead) => (
          <div key={lead.name}
            className="flex items-start justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-all cursor-pointer">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{lead.name}</p>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{lead.reason}</p>
              <p className="text-xs text-slate-500 mt-1">→ {lead.assignedTo}</p>
            </div>
            <div className="ml-3 flex-shrink-0">
              <IntentBadge score={lead.intentScore} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
