"use client";

import { Shield, Clock, AlertCircle } from "lucide-react";

const slaMetrics = [
  { label: "Emergency", sla: "15 min", compliance: 98.5, color: "#fb7185" },
  { label: "Urgent",    sla: "2 hr",   compliance: 99.1, color: "#f59e0b" },
  { label: "Routine",   sla: "8 hr",   compliance: 99.6, color: "#22c55e" },
];

export function SlaWidget() {
  return (
    <div className="pulse-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Shield size={16} className="text-teal-400" />
        <h3 className="text-sm font-semibold text-white">SLA Compliance</h3>
        <span className="ml-auto text-xs text-green-400 font-semibold">Overall: 99.2%</span>
      </div>

      <div className="space-y-4">
        {slaMetrics.map((m) => (
          <div key={m.label}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <Clock size={12} style={{ color: m.color }} />
                <span className="text-xs text-slate-300 font-medium">{m.label}</span>
                <span className="text-xs text-slate-500">({m.sla})</span>
              </div>
              <span className="text-xs font-semibold" style={{ color: m.color }}>
                {m.compliance}%
              </span>
            </div>
            <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${m.compliance}%`, background: m.color }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center gap-2 text-xs text-slate-400">
        <AlertCircle size={12} className="text-amber-400" />
        <span>6 SLA breaches this month — <span className="text-amber-400">2 pending review</span></span>
      </div>
    </div>
  );
}
