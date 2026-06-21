"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { ClipboardList, Clock, AlertCircle, CheckCircle2, Loader2, Plus, Filter } from "lucide-react";

type Study = {
  id: string;
  studyId: string;
  patientRef: string;
  hospital: { name: string };
  modality: string;
  bodyPart: string;
  urgency: string;
  status: string;
  radiologist: { name: string | null } | null;
  receivedAt: string;
  slaBreach: boolean;
};

const urgencyColors: Record<string, { text: string; bg: string }> = {
  EMERGENCY: { text: "#fb7185", bg: "rgba(251,113,133,0.1)" },
  URGENT:    { text: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  ROUTINE:   { text: "#22c55e", bg: "rgba(34,197,94,0.1)" },
};

const modalityColors: Record<string, string> = {
  MRI: "#3b82f6", CT: "#f59e0b", "X-RAY": "#22c55e",
  PET: "#a855f7", CARDIAC: "#fb7185", ULTRASOUND: "#14b8a6",
};

const slaMins: Record<string, number> = { EMERGENCY: 30, URGENT: 120, ROUTINE: 480 };

function StatusIcon({ status }: { status: string }) {
  if (status === "COMPLETED" || status === "REPORTED") return <CheckCircle2 size={14} className="text-green-400" />;
  if (status === "IN_PROGRESS" || status === "ASSIGNED") return <Loader2 size={14} className="text-blue-400 animate-spin" />;
  if (status === "PENDING") return <Clock size={14} className="text-slate-400" />;
  return <AlertCircle size={14} className="text-amber-400" />;
}

export default function StudiesPage() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(true);
  const [urgencyFilter, setUrgencyFilter] = useState("All");
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    fetch("/api/studies")
      .then((r) => r.json())
      .then((d) => { setStudies(d.studies ?? []); setLoading(false); })
      .catch(() => setLoading(false));

    const tick = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(tick);
  }, []);

  const filtered = urgencyFilter === "All"
    ? studies
    : studies.filter((s) => s.urgency === urgencyFilter);

  const pending    = studies.filter((s) => s.status === "PENDING").length;
  const inProgress = studies.filter((s) => ["IN_PROGRESS", "ASSIGNED"].includes(s.status)).length;
  const completed  = studies.filter((s) => ["COMPLETED", "REPORTED"].includes(s.status)).length;
  const breaches   = studies.filter((s) => s.slaBreach).length;

  return (
    <div>
      <Header title="Studies" subtitle="Real-time radiology study tracking & SLA monitoring" />

      <div className="p-3 sm:p-6">
        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[
            { label: "Pending",     count: pending,    color: "#64748b" },
            { label: "In Progress", count: inProgress, color: "#3b82f6" },
            { label: "Completed",   count: completed,  color: "#22c55e" },
            { label: "SLA Breach",  count: breaches,   color: "#fb7185" },
          ].map((s) => (
            <div key={s.label} className="pulse-card p-4 text-center">
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</p>
              <p className="text-xs text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
            className="px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:border-teal-500"
          >
            <option value="All">All Urgency</option>
            <option value="EMERGENCY">Emergency</option>
            <option value="URGENT">Urgent</option>
            <option value="ROUTINE">Routine</option>
          </select>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 border border-slate-700 bg-slate-800 hover:bg-slate-700 transition-all ml-auto">
            <Filter size={14} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white font-medium"
            style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
            <Plus size={14} /> <span className="hidden sm:inline">New Study</span>
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
                    {["Study ID", "Hospital", "Modality", "Body Part", "Urgency", "Status", "Radiologist", "SLA"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                  {filtered.map((s) => {
                    const uc = urgencyColors[s.urgency] ?? urgencyColors.ROUTINE;
                    const sla = slaMins[s.urgency] ?? 480;
                    const elapsed = Math.floor((now - new Date(s.receivedAt).getTime()) / 60000);
                    const remaining = sla - elapsed;
                    const pct = Math.min((elapsed / sla) * 100, 100);
                    const slaColor = s.slaBreach || remaining < 0 ? "#fb7185" : pct > 80 ? "#f59e0b" : "#22c55e";
                    const done = ["COMPLETED", "REPORTED"].includes(s.status);
                    return (
                      <tr key={s.id} className="hover:bg-slate-800/40 cursor-pointer transition-all">
                        <td className="px-4 py-3 font-mono text-xs text-teal-400 whitespace-nowrap">{s.studyId.slice(0, 12)}</td>
                        <td className="px-4 py-3 text-slate-200 text-sm font-medium whitespace-nowrap">{s.hospital.name}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-bold px-2 py-0.5 rounded whitespace-nowrap"
                            style={{
                              color: modalityColors[s.modality] ?? "#94a3b8",
                              background: `${modalityColors[s.modality] ?? "#94a3b8"}22`,
                            }}>
                            {s.modality}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{s.bodyPart}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                            style={{ color: uc.text, background: uc.bg }}>
                            {s.urgency}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 whitespace-nowrap">
                            <StatusIcon status={s.status} />
                            <span className="text-xs text-slate-300">{s.status.replace(/_/g, " ")}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">
                          {s.radiologist?.name ?? <span className="text-slate-600">Unassigned</span>}
                        </td>
                        <td className="px-4 py-3">
                          {done ? (
                            <span className="text-xs text-green-400 whitespace-nowrap">Done in {elapsed}m</span>
                          ) : (
                            <div>
                              <span className="text-xs font-semibold font-mono whitespace-nowrap" style={{ color: slaColor }}>
                                {remaining < 0 ? `BREACH +${Math.abs(remaining)}m` : `${remaining}m left`}
                              </span>
                              <div className="w-20 h-1 bg-slate-700 rounded-full overflow-hidden mt-1">
                                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: slaColor }} />
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-10 text-center text-slate-500 text-sm">
                        No studies found.
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
