import { Building2, Activity, TrendingUp, AlertTriangle } from "lucide-react";

const stats = [
  {
    label: "Active Hospitals",
    value: "10",
    change: "+2 this month",
    icon: Building2,
    color: "#0d9488",
    bg: "rgba(13,148,136,0.1)",
  },
  {
    label: "Studies This Month",
    value: "847",
    change: "+12% vs last month",
    icon: Activity,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
  },
  {
    label: "SLA Compliance",
    value: "99.2%",
    change: "↑ 0.3% vs last month",
    icon: TrendingUp,
    color: "#22c55e",
    bg: "rgba(34,197,94,0.1)",
  },
  {
    label: "SLA Breaches",
    value: "6",
    change: "This month",
    icon: AlertTriangle,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
  },
];

export function StatsWidget() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="pulse-card p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{s.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{s.value}</p>
            </div>
            <div className="p-2 rounded-lg" style={{ background: s.bg }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
          </div>
          <p className="text-xs" style={{ color: s.color }}>{s.change}</p>
        </div>
      ))}
    </div>
  );
}
