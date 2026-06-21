"use client";

import { Header } from "@/components/layout/header";
import { BarChart3, TrendingUp, TrendingDown, Download } from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 2100000, target: 2500000 },
  { month: "Feb", revenue: 2400000, target: 2500000 },
  { month: "Mar", revenue: 2800000, target: 2800000 },
  { month: "Apr", revenue: 3100000, target: 3000000 },
  { month: "May", revenue: 3400000, target: 3200000 },
  { month: "Jun", revenue: 3800000, target: 3500000 },
];

const modalityData = [
  { modality: "MRI",    studies: 312, revenue: 1248000 },
  { modality: "CT",     studies: 248, revenue: 744000  },
  { modality: "X-Ray",  studies: 189, revenue: 189000  },
  { modality: "PET",    studies: 56,  revenue: 896000  },
  { modality: "Cardiac",studies: 42,  revenue: 840000  },
];

const slaData = [
  { name: "Emergency", value: 98.5, color: "#fb7185" },
  { name: "Urgent",    value: 99.1, color: "#f59e0b" },
  { name: "Routine",   value: 99.6, color: "#22c55e" },
];

const churnData = [
  { hospital: "Aster CMI",     risk: 72 },
  { hospital: "Columbia Asia", risk: 45 },
  { hospital: "Sparsh",        risk: 32 },
  { hospital: "Manipal",       risk: 28 },
  { hospital: "Narayana",      risk: 8  },
];

export default function ReportsPage() {
  return (
    <div>
      <Header title="Reports" subtitle="Revenue forecasts, churn analytics & operational intelligence" />

      <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
        {/* KPI row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "YTD Revenue",      value: "₹1.76Cr", trend: +22, color: "#22c55e" },
            { label: "Avg Deal Size",     value: "₹19.4L",  trend: +8,  color: "#3b82f6" },
            { label: "Churn Rate (Q2)",   value: "0%",       trend: 0,   color: "#0d9488" },
            { label: "NPS Score",         value: "72",       trend: +5,  color: "#f59e0b" },
          ].map(k => (
            <div key={k.label} className="pulse-card p-5">
              <p className="text-xs text-slate-400 mb-1">{k.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-white">{k.value}</p>
                {k.trend !== 0 && (
                  <span className={`flex items-center gap-0.5 text-xs font-semibold ${k.trend > 0 ? "text-green-400" : "text-rose-400"}`}>
                    {k.trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {Math.abs(k.trend)}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Revenue chart */}
        <div className="pulse-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-teal-400" />
              <h3 className="font-semibold text-white">Revenue vs Target (2026)</h3>
            </div>
            <button className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition-all">
              <Download size={12} /> Export
            </button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false}
                tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip
                contentStyle={{ background: "#1e293b", border: "1px solid rgba(148,163,184,0.15)", borderRadius: 8, fontSize: 12 }}
                formatter={(v, name) => [`₹${(Number(v) / 100000).toFixed(1)}L`, name === "revenue" ? "Revenue" : "Target"]}
              />
              <Area type="monotone" dataKey="target" stroke="#3b82f6" strokeWidth={1.5}
                fill="none" strokeDasharray="4 4" name="target" />
              <Area type="monotone" dataKey="revenue" stroke="#0d9488" strokeWidth={2}
                fill="url(#revGrad)" name="revenue" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Modality breakdown */}
          <div className="pulse-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 size={16} className="text-blue-400" />
              <h3 className="font-semibold text-white">Studies by Modality</h3>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={modalityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
                <XAxis type="number" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="modality" type="category" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} width={55} />
                <Tooltip
                  contentStyle={{ background: "#1e293b", border: "1px solid rgba(148,163,184,0.15)", borderRadius: 8, fontSize: 12 }}
                />
                <Bar dataKey="studies" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Studies" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Churn risk */}
          <div className="pulse-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown size={16} className="text-rose-400" />
              <h3 className="font-semibold text-white">Churn Risk Analysis</h3>
            </div>
            <div className="space-y-3">
              {churnData.map(c => (
                <div key={c.hospital}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-300">{c.hospital}</span>
                    <span className="text-sm font-semibold"
                      style={{ color: c.risk >= 65 ? "#fb7185" : c.risk >= 40 ? "#f59e0b" : "#22c55e" }}>
                      {c.risk}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all"
                      style={{
                        width: `${c.risk}%`,
                        background: c.risk >= 65 ? "#fb7185" : c.risk >= 40 ? "#f59e0b" : "#22c55e",
                      }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
