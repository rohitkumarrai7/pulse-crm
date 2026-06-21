"use client";

import { useEffect, useState } from "react";
import { Building2, Activity, TrendingUp, AlertTriangle, Loader2 } from "lucide-react";

type Stats = {
  activeHospitals: number;
  monthlyStudies: number;
  slaCompliance: string;
  slaBreaches: number;
};

export function StatsWidget() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/dashboard/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const items = [
    {
      label: "Active Hospitals",
      value: stats ? String(stats.activeHospitals) : "—",
      sub: "Healthcare accounts",
      icon: Building2,
      color: "#0d9488",
      bg: "rgba(13,148,136,0.1)",
    },
    {
      label: "Studies This Month",
      value: stats ? String(stats.monthlyStudies) : "—",
      sub: "Radiology cases",
      icon: Activity,
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.1)",
    },
    {
      label: "SLA Compliance",
      value: stats ? stats.slaCompliance : "—",
      sub: "This month",
      icon: TrendingUp,
      color: "#22c55e",
      bg: "rgba(34,197,94,0.1)",
    },
    {
      label: "SLA Breaches",
      value: stats ? String(stats.slaBreaches) : "—",
      sub: "This month",
      icon: AlertTriangle,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.1)",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {items.map((s) => (
        <div key={s.label} className="pulse-card p-4 sm:p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{s.label}</p>
              <p className="text-2xl font-bold text-white mt-1">
                {stats === null ? <Loader2 size={18} className="animate-spin text-slate-500 inline" /> : s.value}
              </p>
            </div>
            <div className="p-2 rounded-lg" style={{ background: s.bg }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
          </div>
          <p className="text-xs" style={{ color: s.color }}>{s.sub}</p>
        </div>
      ))}
    </div>
  );
}
