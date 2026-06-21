import { Header } from "@/components/layout/header";
import { FileText, Plus, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { formatCurrency, daysUntil } from "@/lib/utils";

const contracts = [
  {
    number: "RC-2026-001",
    hospital: "Narayana Health",
    type: "RETAINER",
    value: 280000,
    slaTier: "GOLD",
    startDate: "2025-07-01",
    endDate: "2026-07-01",
    status: "ACTIVE",
    autoRenew: true,
    modalities: ["MRI", "CT", "PET", "X-RAY"],
    monthlyMin: 2000,
  },
  {
    number: "RC-2026-002",
    hospital: "Manipal Hospitals",
    type: "HYBRID",
    value: 190000,
    slaTier: "SILVER",
    startDate: "2025-08-20",
    endDate: "2026-08-20",
    status: "EXPIRING",
    autoRenew: false,
    modalities: ["MRI", "CT", "X-RAY"],
    monthlyMin: 1500,
  },
  {
    number: "RC-2026-003",
    hospital: "Aster CMI Hospital",
    type: "PAY_PER_STUDY",
    value: 95000,
    slaTier: "BRONZE",
    startDate: "2025-09-25",
    endDate: "2026-09-25",
    status: "AT_RISK",
    autoRenew: false,
    modalities: ["CT", "X-RAY"],
    monthlyMin: null,
  },
];

const statusColors: Record<string, { text: string; bg: string }> = {
  ACTIVE:    { text: "#22c55e", bg: "rgba(34,197,94,0.1)" },
  EXPIRING:  { text: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  AT_RISK:   { text: "#fb7185", bg: "rgba(251,113,133,0.1)" },
  EXPIRED:   { text: "#64748b", bg: "rgba(100,116,139,0.1)" },
  TERMINATED:{ text: "#ef4444", bg: "rgba(239,68,68,0.1)" },
};

const tierColors: Record<string, string> = {
  GOLD: "#f59e0b", SILVER: "#94a3b8", BRONZE: "#b45309",
};

export default function ContractsPage() {
  return (
    <div>
      <Header title="Contracts" subtitle="Contract lifecycle & renewal management" />

      <div className="p-6">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Active Contracts",  count: 1, value: "₹28L/mo",  color: "#22c55e" },
            { label: "Expiring (60 days)", count: 1, value: "₹19L/mo", color: "#f59e0b" },
            { label: "At Risk",            count: 1, value: "₹9.5L/mo", color: "#fb7185" },
          ].map(s => (
            <div key={s.label} className="pulse-card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-400 mb-1">{s.label}</p>
                  <p className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</p>
                  <p className="text-xs text-slate-400 mt-1">{s.value}</p>
                </div>
                <FileText size={20} style={{ color: s.color }} className="opacity-30" />
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mb-4">
          <select className="px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:border-teal-500">
            <option>All Statuses</option>
            <option>Active</option>
            <option>Expiring</option>
            <option>At Risk</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white font-medium ml-auto"
            style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
            <Plus size={14} /> New Contract
          </button>
        </div>

        {/* Contract cards */}
        <div className="space-y-4">
          {contracts.map((c) => {
            const sc = statusColors[c.status];
            const days = daysUntil(c.endDate);
            return (
              <div key={c.number} className="pulse-card p-6 hover:border-slate-600 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-xs text-teal-400">{c.number}</span>
                      <span className="text-xs font-semibold" style={{ color: tierColors[c.slaTier] }}>
                        {c.slaTier} SLA
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ color: sc.text, background: sc.bg }}>
                        {c.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white">{c.hospital}</h3>
                    <p className="text-sm text-slate-400">{c.type.replace(/_/g, " ")} · {c.modalities.join(", ")}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{formatCurrency(c.value)}</p>
                    <p className="text-xs text-slate-400">per month</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 py-4 border-t border-b border-slate-700/50 mb-4">
                  {[
                    { label: "Start Date",     value: c.startDate },
                    { label: "End Date",       value: c.endDate },
                    { label: "Days Remaining", value: `${days} days`, color: days < 60 ? "#f59e0b" : "#22c55e" },
                    { label: "Monthly Min.",   value: c.monthlyMin ? `${c.monthlyMin} studies` : "Per study" },
                  ].map(f => (
                    <div key={f.label}>
                      <p className="text-xs text-slate-400 mb-1">{f.label}</p>
                      <p className="text-sm font-medium" style={{ color: f.color || "white" }}>{f.value}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {c.autoRenew ? (
                      <span className="flex items-center gap-1.5 text-xs text-green-400">
                        <CheckCircle2 size={12} /> Auto-renewal enabled
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs text-amber-400">
                        <AlertTriangle size={12} /> Manual renewal required
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {days < 90 && (
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-lg hover:bg-amber-400/20 transition-all">
                        <Clock size={12} /> Schedule Renewal
                      </button>
                    )}
                    <button className="px-3 py-1.5 text-xs text-teal-400 bg-teal-400/10 border border-teal-400/20 rounded-lg hover:bg-teal-400/20 transition-all">
                      View Contract
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
