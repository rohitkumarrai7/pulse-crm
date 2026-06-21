"use client";

import { Brain, TrendingDown, TrendingUp, ArrowRight, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

const staticInsights = [
  { type: "churn",    hospital: "Aster CMI Hospital",   message: "72% churn risk — competitor offering 15% lower rates", action: "Schedule retention call", color: "#fb7185", icon: TrendingDown },
  { type: "upsell",  hospital: "Narayana Health",       message: "68% probability of upselling to PET-CT modality",     action: "Send PET-CT brochure",   color: "#22c55e", icon: TrendingUp },
  { type: "churn",   hospital: "Manipal Hospitals",      message: "Contract renewal in 60 days — negotiation window open", action: "Initiate renewal talks", color: "#f59e0b", icon: TrendingDown },
  { type: "behavior",hospital: "Sparsh Hospital",         message: "Visited website 3 times this week — intent rising",   action: "Assign sales rep",       color: "#3b82f6", icon: TrendingUp },
];

export function PulseInsightsWidget() {
  const [aiInsights, setAiInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  async function loadAiInsights() {
    setLoading(true);
    try {
      const res = await fetch("/api/insights");
      if (res.ok) {
        const data = await res.json();
        setAiInsights(data.insights ?? []);
        setLoaded(true);
      }
    } catch {
      // fall through to static
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadAiInsights(); }, []);

  return (
    <div className="pulse-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Brain size={16} className="text-purple-400" />
        <h3 className="text-sm font-semibold text-white">Pulse Insights</h3>
        <span className="ml-1 text-xs text-slate-500">AI-powered</span>
        <button
          onClick={loadAiInsights}
          disabled={loading}
          className="ml-auto p-1.5 rounded-lg text-slate-400 hover:text-purple-400 hover:bg-purple-400/10 transition-all disabled:opacity-40"
          title="Refresh AI insights"
        >
          <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* AI-generated insights row */}
      {loaded && aiInsights.length > 0 && (
        <div className="mb-4 p-3 rounded-xl border border-purple-500/20 bg-purple-500/5">
          <p className="text-xs font-semibold text-purple-400 mb-2 uppercase tracking-wide">AI Generated</p>
          <div className="grid grid-cols-2 gap-2">
            {aiInsights.map((ins, i) => (
              <p key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                <span className="text-purple-400 mt-0.5 shrink-0">→</span>
                {ins}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Static intelligence signals */}
      <div className="space-y-3">
        {staticInsights.map((ins, i) => (
          <div key={i} className="p-3 rounded-lg border transition-all hover:border-slate-600 cursor-pointer"
            style={{ background: `${ins.color}08`, borderColor: `${ins.color}20` }}>
            <div className="flex items-start gap-2">
              <div className="p-1 rounded" style={{ background: `${ins.color}15` }}>
                <ins.icon size={12} style={{ color: ins.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white">{ins.hospital}</p>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{ins.message}</p>
                <button className="flex items-center gap-1 mt-1.5 text-xs font-medium" style={{ color: ins.color }}>
                  {ins.action} <ArrowRight size={10} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
