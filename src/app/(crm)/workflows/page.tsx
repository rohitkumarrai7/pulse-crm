"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Plus, Play, Pause, Zap, Bell, Clock, ArrowRight, Loader2 } from "lucide-react";

type Workflow = {
  id: string;
  name: string;
  description: string | null;
  trigger: string;
  conditions: unknown;
  actions: unknown;
  isActive: boolean;
  runCount: number;
  lastRunAt: string | null;
  createdAt: string;
};

const triggerColors: Record<string, string> = {
  STUDY_RECEIVED:     "#3b82f6",
  SLA_BREACH_WARNING: "#fb7185",
  CONTRACT_EXPIRY:    "#f59e0b",
  LEAD_SCORE_CHANGE:  "#0d9488",
  CHURN_RISK_HIGH:    "#a855f7",
};

const triggerLabels: Record<string, string> = {
  STUDY_RECEIVED:     "Study Received",
  SLA_BREACH_WARNING: "SLA Warning (80%)",
  CONTRACT_EXPIRY:    "Contract Expiry",
  LEAD_SCORE_CHANGE:  "Intent Score Change",
  CHURN_RISK_HIGH:    "Churn Risk High",
};

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return "Never";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function parseJsonArray(val: unknown): string[] {
  if (Array.isArray(val)) return val as string[];
  if (typeof val === "string") {
    try { return JSON.parse(val); } catch { return []; }
  }
  return [];
}

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/workflows")
      .then((r) => r.json())
      .then((d) => { setWorkflows(d.workflows ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function toggleWorkflow(id: string, current: boolean) {
    setToggling(id);
    try {
      const res = await fetch(`/api/workflows/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !current }),
      });
      if (res.ok) {
        setWorkflows((prev) =>
          prev.map((w) => (w.id === id ? { ...w, isActive: !current } : w))
        );
      }
    } finally {
      setToggling(null);
    }
  }

  const active   = workflows.filter((w) => w.isActive).length;
  const totalRuns = workflows.reduce((s, w) => s + w.runCount, 0);

  return (
    <div>
      <Header title="Workflows" subtitle="Automation rules for zero-touch operations" />

      <div className="p-3 sm:p-6">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {[
            { label: "Active Workflows",   count: active,    color: "#22c55e" },
            { label: "Total Runs (30d)",   count: totalRuns, color: "#3b82f6" },
            { label: "Hours Saved (est.)", count: `${Math.floor(totalRuns * 0.2)}h`, color: "#0d9488" },
          ].map((s) => (
            <div key={s.label} className="pulse-card p-5 text-center">
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</p>
              <p className="text-xs text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end mb-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white font-medium"
            style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
            <Plus size={14} /> New Workflow
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <Loader2 size={20} className="animate-spin mr-2" /> Loading…
          </div>
        ) : (
          <div className="space-y-4">
            {workflows.map((w) => {
              const conditions = parseJsonArray(w.conditions);
              const actions    = parseJsonArray(w.actions);
              const tColor = triggerColors[w.trigger] ?? "#94a3b8";
              return (
                <div key={w.id}
                  className={`pulse-card p-4 sm:p-6 transition-all ${!w.isActive ? "opacity-60" : "hover:border-slate-600"}`}>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-slate-500">{w.id.slice(0, 8)}</span>
                        <div className={`w-2 h-2 rounded-full shrink-0 ${w.isActive ? "bg-green-400 animate-pulse" : "bg-slate-600"}`} />
                        <span className="text-xs font-medium" style={{ color: tColor }}>
                          <Zap size={10} className="inline mr-1" />
                          {triggerLabels[w.trigger] ?? w.trigger}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-white">{w.name}</h3>
                      {w.description && (
                        <p className="text-sm text-slate-400 mt-0.5">{w.description}</p>
                      )}
                    </div>
                    <button
                      disabled={toggling === w.id}
                      onClick={() => toggleWorkflow(w.id, w.isActive)}
                      className={`p-2 rounded-lg transition-all shrink-0 ${
                        w.isActive
                          ? "text-amber-400 bg-amber-400/10 hover:bg-amber-400/20"
                          : "text-green-400 bg-green-400/10 hover:bg-green-400/20"
                      } disabled:opacity-50`}
                    >
                      {toggling === w.id
                        ? <Loader2 size={14} className="animate-spin" />
                        : w.isActive ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                  </div>

                  {/* Conditions → Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {conditions.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                          IF (Conditions)
                        </p>
                        <div className="space-y-1.5">
                          {conditions.map((c, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs">
                              <span className="w-4 h-4 rounded bg-slate-700 flex items-center justify-center text-slate-400 font-mono text-[10px] shrink-0">
                                {i + 1}
                              </span>
                              <code className="text-slate-300 bg-slate-800 px-2 py-0.5 rounded font-mono truncate">{c}</code>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {actions.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                          THEN (Actions)
                        </p>
                        <div className="space-y-1.5">
                          {actions.map((a, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                              <ArrowRight size={10} className="text-teal-400 shrink-0" />
                              <span>{a}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-700/50">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Bell size={10} /> {w.runCount} runs
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} /> Last run {timeAgo(w.lastRunAt)}
                      </span>
                    </div>
                    <button className="text-xs text-teal-400 hover:text-teal-300 transition-all">
                      Edit Workflow →
                    </button>
                  </div>
                </div>
              );
            })}
            {workflows.length === 0 && (
              <div className="text-center py-16 text-slate-500">No workflows found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
