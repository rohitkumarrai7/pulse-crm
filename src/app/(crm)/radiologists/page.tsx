"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { AlertTriangle, Activity, Clock, Award, Loader2 } from "lucide-react";

type RadiologistProfile = {
  id: string;
  user: { name: string | null; email: string };
  specialization: string[];
  qualifications: string[];
  availability: string;
  currentLoad: number;
  maxDailyCases: number;
  avgTurnaround: number | null;
  accuracyRate: number | null;
  burnoutRisk: string;
};

const availColors: Record<string, { text: string; bg: string; dot: string }> = {
  AVAILABLE: { text: "#22c55e", bg: "rgba(34,197,94,0.1)",   dot: "#22c55e" },
  BUSY:      { text: "#f59e0b", bg: "rgba(245,158,11,0.1)",  dot: "#f59e0b" },
  OFFLINE:   { text: "#64748b", bg: "rgba(100,116,139,0.1)", dot: "#64748b" },
  ON_LEAVE:  { text: "#fb7185", bg: "rgba(251,113,133,0.1)", dot: "#fb7185" },
};

const burnoutColors: Record<string, string> = {
  LOW: "#22c55e", MEDIUM: "#f59e0b", HIGH: "#fb7185",
};

export default function RadiologistsPage() {
  const [radiologists, setRadiologists] = useState<RadiologistProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/radiologists")
      .then((r) => r.json())
      .then((d) => { setRadiologists(d.radiologists ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const available   = radiologists.filter((r) => r.availability === "AVAILABLE").length;
  const busy        = radiologists.filter((r) => r.availability === "BUSY").length;
  const highBurnout = radiologists.filter((r) => r.burnoutRisk === "HIGH").length;
  const totalLoad   = radiologists.reduce((s, r) => s + r.currentLoad, 0);

  return (
    <div>
      <Header title="Radiologists" subtitle="Workload management & availability tracking" />

      <div className="p-3 sm:p-6">
        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[
            { label: "Available",    count: available,   color: "#22c55e" },
            { label: "Busy",         count: busy,        color: "#f59e0b" },
            { label: "High Burnout", count: highBurnout, color: "#fb7185" },
            { label: "Total Today",  count: totalLoad,   color: "#3b82f6" },
          ].map((s) => (
            <div key={s.label} className="pulse-card p-4 text-center">
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</p>
              <p className="text-xs text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <Loader2 size={20} className="animate-spin mr-2" /> Loading…
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {radiologists.map((r) => {
              const ac = availColors[r.availability] ?? availColors.OFFLINE;
              const loadPct = r.maxDailyCases > 0 ? (r.currentLoad / r.maxDailyCases) * 100 : 0;
              const loadColor = loadPct >= 100 ? "#fb7185" : loadPct >= 80 ? "#f59e0b" : "#0d9488";
              const displayName = r.user.name || r.user.email.split("@")[0];
              const specialty = r.specialization[0] ?? "General Radiology";

              return (
                <div key={r.id} className="pulse-card p-5 hover:border-slate-600 transition-all cursor-pointer">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-white">{displayName}</h3>
                        {r.burnoutRisk === "HIGH" && (
                          <span className="flex items-center gap-1 text-xs text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded-full font-semibold">
                            <AlertTriangle size={10} /> Burnout Risk
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{specialty}</p>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full shrink-0"
                      style={{ color: ac.text, background: ac.bg }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: ac.dot }} />
                      {r.availability}
                    </span>
                  </div>

                  {/* Load bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-slate-400">Today's Load</span>
                      <span className="text-xs font-semibold font-mono" style={{ color: loadColor }}>
                        {r.currentLoad}/{r.maxDailyCases}
                      </span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${Math.min(loadPct, 100)}%`, background: loadColor }} />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-slate-800/60 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Clock size={11} className="text-slate-400" />
                        <span className="text-xs text-slate-400">Avg Turnaround</span>
                      </div>
                      <p className="text-base font-bold text-white">
                        {r.avgTurnaround != null ? `${r.avgTurnaround} min` : "—"}
                      </p>
                    </div>
                    <div className="bg-slate-800/60 rounded-lg p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Award size={11} className="text-teal-400" />
                        <span className="text-xs text-slate-400">Accuracy</span>
                      </div>
                      <p className="text-base font-bold text-white">
                        {r.accuracyRate != null ? `${r.accuracyRate}%` : "—"}
                      </p>
                    </div>
                  </div>

                  {/* Qualifications */}
                  {r.qualifications.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {r.qualifications.map((q) => (
                        <span key={q} className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                          {q}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Burnout */}
                  <div className="pt-3 border-t border-slate-700/50 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Activity size={11} style={{ color: burnoutColors[r.burnoutRisk] ?? "#22c55e" }} />
                      <span className="text-xs text-slate-400">Burnout:</span>
                      <span className="text-xs font-semibold" style={{ color: burnoutColors[r.burnoutRisk] ?? "#22c55e" }}>
                        {r.burnoutRisk}
                      </span>
                    </div>
                    <button className="text-xs text-teal-400 hover:text-teal-300 transition-all">
                      View Studies →
                    </button>
                  </div>
                </div>
              );
            })}
            {radiologists.length === 0 && (
              <div className="col-span-full text-center py-16 text-slate-500">No radiologists found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
