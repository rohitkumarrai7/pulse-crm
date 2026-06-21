"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Building2, CheckCircle2, AlertTriangle, Plus, Filter, Search, Loader2 } from "lucide-react";

type Contract = { status: string; endDate: string; renewalStatus: string };
type Hospital = {
  id: string;
  name: string;
  city: string | null;
  state: string | null;
  hospitalType: string;
  bedCount: number | null;
  nabhAccredited: boolean;
  nablAccredited: boolean;
  imagingVolume: number | null;
  currentVendor: string | null;
  slaTier: string | null;
  status: string;
  annualValue: number | null;
  churnRisk: number | null;
  contracts: Contract[];
};

const statusColors: Record<string, { text: string; bg: string }> = {
  ACTIVE:   { text: "#22c55e", bg: "rgba(34,197,94,0.1)" },
  PROSPECT: { text: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  AT_RISK:  { text: "#fb7185", bg: "rgba(251,113,133,0.1)" },
  CHURNED:  { text: "#64748b", bg: "rgba(100,116,139,0.1)" },
  INACTIVE: { text: "#64748b", bg: "rgba(100,116,139,0.1)" },
};

const tierColors: Record<string, string> = {
  GOLD: "#f59e0b", SILVER: "#94a3b8", BRONZE: "#b45309",
};

function daysUntilDate(dateStr: string): number {
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
}

function formatContractStatus(contracts: Contract[]): string | null {
  if (!contracts.length) return null;
  const c = contracts[0];
  const days = daysUntilDate(c.endDate);
  if (days < 0) return "EXPIRED";
  if (days <= 60) return "EXPIRING";
  return c.renewalStatus || c.status;
}

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/hospitals")
      .then((r) => r.json())
      .then((d) => { setHospitals(d.hospitals ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = hospitals.filter((h) =>
    !search || h.name.toLowerCase().includes(search.toLowerCase()) ||
    (h.city ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header title="Hospitals" subtitle="Manage your hospital accounts and prospects" />

      <div className="p-3 sm:p-6">
        {/* Actions bar */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <div className="relative flex-1 min-w-0 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search hospitals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg
                text-slate-300 placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300
            border border-slate-700 bg-slate-800 hover:bg-slate-700 transition-all">
            <Filter size={14} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white font-medium ml-auto transition-all"
            style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
            <Plus size={14} /> <span className="hidden sm:inline">Add Hospital</span>
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
                    {["Hospital", "Type", "Beds", "Accreditation", "Volume/mo", "Current Vendor", "SLA Tier", "Status", "Intent / Churn"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                  {filtered.map((h) => {
                    const sc = statusColors[h.status] ?? statusColors.PROSPECT;
                    const contractStatus = formatContractStatus(h.contracts);
                    const daysLeft = h.contracts[0] ? daysUntilDate(h.contracts[0].endDate) : null;
                    const score = h.status === "ACTIVE"
                      ? (h.churnRisk !== null ? 100 - h.churnRisk : null)
                      : h.churnRisk;
                    return (
                      <tr key={h.id} className="hover:bg-slate-800/40 cursor-pointer transition-all">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-white whitespace-nowrap">{h.name}</p>
                            <p className="text-xs text-slate-400">{[h.city, h.state].filter(Boolean).join(", ") || "—"}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-300 text-xs whitespace-nowrap">{h.hospitalType.replace(/_/g, " ")}</td>
                        <td className="px-4 py-3 text-slate-300">{h.bedCount ?? "—"}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1">
                            {h.nabhAccredited && (
                              <span className="flex items-center gap-0.5 text-xs text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded">
                                <CheckCircle2 size={9} /> NABH
                              </span>
                            )}
                            {h.nablAccredited && (
                              <span className="flex items-center gap-0.5 text-xs text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded">
                                <CheckCircle2 size={9} /> NABL
                              </span>
                            )}
                            {!h.nabhAccredited && !h.nablAccredited && (
                              <span className="text-xs text-slate-600">—</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-300 font-mono text-xs">
                          {h.imagingVolume?.toLocaleString() ?? "—"}
                        </td>
                        <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{h.currentVendor || "—"}</td>
                        <td className="px-4 py-3">
                          {h.slaTier ? (
                            <span className="text-xs font-semibold" style={{ color: tierColors[h.slaTier] }}>
                              {h.slaTier}
                            </span>
                          ) : (
                            <span className="text-slate-600 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                            style={{ color: sc.text, background: sc.bg }}>
                            {contractStatus || h.status}
                            {daysLeft !== null && daysLeft > 0 && ` · ${daysLeft}d`}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {score !== null ? (
                            <div className="flex items-center gap-2">
                              <div className="w-14 h-1 bg-slate-700 rounded-full overflow-hidden">
                                <div className="h-full rounded-full"
                                  style={{
                                    width: `${score}%`,
                                    background: score >= 80 ? "#fb7185" : score >= 50 ? "#f59e0b" : "#3b82f6",
                                  }} />
                              </div>
                              <span className="text-xs font-mono text-slate-300">{score}</span>
                            </div>
                          ) : (
                            <span className="text-slate-600 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-4 py-10 text-center text-slate-500 text-sm">
                        {search ? "No hospitals match your search." : "No hospitals found."}
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
