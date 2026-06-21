"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { FileText, Plus, AlertTriangle, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

type SlaPolicy = { tier: string; name: string } | null;
type Account = { name: string };
type Contract = {
  id: string;
  contractNumber: string;
  title: string;
  account: Account;
  contractType: string;
  value: number;
  startDate: string;
  endDate: string;
  status: string;
  renewalStatus: string;
  autoRenew: boolean;
  modalitiesCovered: string[];
  monthlyMinGuarantee: number | null;
  slaPolicy: SlaPolicy;
};

const statusColors: Record<string, { text: string; bg: string }> = {
  ACTIVE:     { text: "#22c55e", bg: "rgba(34,197,94,0.1)" },
  EXPIRING:   { text: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  AT_RISK:    { text: "#fb7185", bg: "rgba(251,113,133,0.1)" },
  EXPIRED:    { text: "#64748b", bg: "rgba(100,116,139,0.1)" },
  TERMINATED: { text: "#ef4444", bg: "rgba(239,68,68,0.1)" },
  DRAFT:      { text: "#94a3b8", bg: "rgba(148,163,184,0.1)" },
};

const tierColors: Record<string, string> = {
  GOLD: "#f59e0b", SILVER: "#94a3b8", BRONZE: "#b45309",
};

function daysUntilDate(dateStr: string): number {
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
}

function fmtDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function displayStatus(c: Contract): string {
  const days = daysUntilDate(c.endDate);
  if (days < 0) return "EXPIRED";
  if (days <= 60) return "EXPIRING";
  return c.renewalStatus || c.status;
}

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetch("/api/contracts")
      .then((r) => r.json())
      .then((d) => { setContracts(d.contracts ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const active   = contracts.filter((c) => displayStatus(c) === "ACTIVE").length;
  const expiring = contracts.filter((c) => displayStatus(c) === "EXPIRING").length;
  const atRisk   = contracts.filter((c) => displayStatus(c) === "AT_RISK").length;

  const filtered = statusFilter === "All"
    ? contracts
    : contracts.filter((c) => displayStatus(c) === statusFilter.toUpperCase());

  return (
    <div>
      <Header title="Contracts" subtitle="Contract lifecycle & renewal management" />

      <div className="p-3 sm:p-6">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {[
            { label: "Active Contracts",   count: active,   color: "#22c55e" },
            { label: "Expiring (60 days)", count: expiring, color: "#f59e0b" },
            { label: "At Risk",            count: atRisk,   color: "#fb7185" },
          ].map((s) => (
            <div key={s.label} className="pulse-card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-400 mb-1">{s.label}</p>
                  <p className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</p>
                </div>
                <FileText size={20} style={{ color: s.color }} className="opacity-30" />
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:border-teal-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Expiring">Expiring</option>
            <option value="At_risk">At Risk</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white font-medium ml-auto"
            style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
            <Plus size={14} /> <span className="hidden sm:inline">New Contract</span>
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <Loader2 size={20} className="animate-spin mr-2" /> Loading…
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((c) => {
              const st = displayStatus(c);
              const sc = statusColors[st] ?? statusColors.ACTIVE;
              const days = daysUntilDate(c.endDate);
              const slaTier = c.slaPolicy?.tier;
              return (
                <div key={c.id} className="pulse-card p-4 sm:p-6 hover:border-slate-600 transition-all cursor-pointer">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-teal-400">{c.contractNumber}</span>
                        {slaTier && (
                          <span className="text-xs font-semibold" style={{ color: tierColors[slaTier] }}>
                            {slaTier} SLA
                          </span>
                        )}
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                          style={{ color: sc.text, background: sc.bg }}>
                          {st}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-white">{c.account.name}</h3>
                      <p className="text-sm text-slate-400">
                        {c.contractType.replace(/_/g, " ")} · {c.modalitiesCovered.join(", ")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl sm:text-2xl font-bold text-white">{formatCurrency(c.value)}</p>
                      <p className="text-xs text-slate-400">per month</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-t border-b border-slate-700/50 mb-4">
                    {[
                      { label: "Start Date",     value: fmtDate(c.startDate) },
                      { label: "End Date",       value: fmtDate(c.endDate) },
                      { label: "Days Remaining", value: days > 0 ? `${days} days` : "Expired", color: days < 60 ? "#f59e0b" : "#22c55e" },
                      { label: "Monthly Min.",   value: c.monthlyMinGuarantee ? `${c.monthlyMinGuarantee} studies` : "Per study" },
                    ].map((f) => (
                      <div key={f.label}>
                        <p className="text-xs text-slate-400 mb-1">{f.label}</p>
                        <p className="text-sm font-medium" style={{ color: f.color || "white" }}>{f.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
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
                      {days < 90 && days > 0 && (
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
            {filtered.length === 0 && (
              <div className="text-center py-16 text-slate-500">No contracts found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
