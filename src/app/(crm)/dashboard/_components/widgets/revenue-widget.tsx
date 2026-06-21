"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { month: "Jan", revenue: 2.1, target: 2.5 },
  { month: "Feb", revenue: 2.4, target: 2.5 },
  { month: "Mar", revenue: 2.8, target: 2.8 },
  { month: "Apr", revenue: 3.1, target: 3.0 },
  { month: "May", revenue: 3.4, target: 3.2 },
  { month: "Jun", revenue: 3.8, target: 3.5 },
];

export function RevenueWidget() {
  return (
    <div className="pulse-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-teal-400" />
          <h3 className="text-sm font-semibold text-white">Revenue Tracker</h3>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">This Month</p>
          <p className="text-lg font-bold text-white">₹38L</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={data} barGap={2}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
          <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} unit="L" />
          <Tooltip
            contentStyle={{ background: "#1e293b", border: "1px solid rgba(148,163,184,0.15)", borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: "#94a3b8" }}
            formatter={(v) => [`₹${Number(v)}L`, ""]}
          />
          <Bar dataKey="target" fill="rgba(59,130,246,0.2)" radius={[3, 3, 0, 0]} name="Target" />
          <Bar dataKey="revenue" fill="#0d9488" radius={[3, 3, 0, 0]} name="Revenue" />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-teal-600" />
          <span className="text-xs text-slate-400">Revenue</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-blue-500/30" />
          <span className="text-xs text-slate-400">Target</span>
        </div>
      </div>
    </div>
  );
}
