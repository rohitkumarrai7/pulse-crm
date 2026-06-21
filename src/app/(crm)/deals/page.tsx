"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Plus, Loader2, ChevronRight } from "lucide-react";

type Account = { name: string };
type Deal = {
  id: string;
  title: string;
  account: Account;
  stage: string;
  value: number;
  probability: number;
  expectedCloseDate: string | null;
};

const stages = [
  { id: "NEW_LEAD",        label: "New Lead",        color: "#64748b" },
  { id: "QUALIFIED",       label: "Qualified",       color: "#3b82f6" },
  { id: "DEMO_SCHEDULED",  label: "Demo Scheduled",  color: "#8b5cf6" },
  { id: "PROPOSAL_SENT",   label: "Proposal Sent",   color: "#f59e0b" },
  { id: "NEGOTIATION",     label: "Negotiation",     color: "#fb923c" },
  { id: "CONTRACT_SIGNED", label: "Contract Signed", color: "#22c55e" },
];

const stageProbability: Record<string, number> = {
  NEW_LEAD: 10, QUALIFIED: 25, DEMO_SCHEDULED: 40,
  PROPOSAL_SENT: 55, NEGOTIATION: 75, CONTRACT_SIGNED: 100,
};

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [movingId, setMovingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/deals")
      .then((r) => r.json())
      .then((d) => { setDeals(d.opportunities ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function moveStage(deal: Deal, newStage: string) {
    setMovingId(deal.id);
    try {
      const res = await fetch(`/api/deals/${deal.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: newStage, probability: stageProbability[newStage] }),
      });
      if (res.ok) {
        const { opportunity } = await res.json();
        setDeals((prev) => prev.map((d) => (d.id === deal.id ? { ...d, ...opportunity } : d)));
      }
    } finally {
      setMovingId(null);
    }
  }

  return (
    <div>
      <Header title="Deals" subtitle="Sales pipeline — click a card to move between stages" />
      <div className="p-3 sm:p-6">
        <div className="flex items-center justify-end mb-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white font-medium"
            style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
            <Plus size={14} /> New Deal
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <Loader2 size={20} className="animate-spin mr-2" /> Loading…
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto pb-4">
            {stages.map((stage) => {
              const stageDeals = deals.filter((d) => d.stage === stage.id);
              const stageValue = stageDeals.reduce((s, d) => s + d.value, 0);
              return (
                <div key={stage.id} className="shrink-0 w-60 sm:w-64">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: stage.color }} />
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide flex-1">
                      {stage.label}
                    </span>
                    <span className="text-xs text-slate-500">{stageDeals.length}</span>
                  </div>
                  {stageDeals.length > 0 && (
                    <p className="text-xs text-slate-500 mb-2 font-mono">
                      ₹{(stageValue / 100000).toFixed(0)}L pipeline
                    </p>
                  )}

                  <div className="space-y-3 min-h-24">
                    {stageDeals.map((deal) => {
                      const nextStageIdx = stages.findIndex((s) => s.id === deal.stage) + 1;
                      const nextStage = stages[nextStageIdx];
                      return (
                        <div key={deal.id} className="pulse-card p-4 hover:border-slate-600 transition-all">
                          <p className="text-sm font-medium text-white mb-0.5 leading-tight">{deal.title}</p>
                          <p className="text-xs text-slate-400 mb-3">{deal.account.name}</p>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-white">
                              ₹{(deal.value / 100000).toFixed(0)}L/yr
                            </span>
                            <span className="text-xs font-semibold" style={{ color: stage.color }}>
                              {deal.probability}%
                            </span>
                          </div>
                          <div className="h-1 bg-slate-700 rounded-full overflow-hidden mb-3">
                            <div className="h-full rounded-full"
                              style={{ width: `${deal.probability}%`, background: stage.color }} />
                          </div>
                          {nextStage && (
                            <button
                              disabled={movingId === deal.id}
                              onClick={() => moveStage(deal, nextStage.id)}
                              className="w-full flex items-center justify-center gap-1 text-xs py-1.5 rounded-lg transition-all text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 hover:bg-slate-800 disabled:opacity-50"
                            >
                              {movingId === deal.id
                                ? <Loader2 size={10} className="animate-spin" />
                                : <ChevronRight size={10} />}
                              Move to {nextStage.label}
                            </button>
                          )}
                        </div>
                      );
                    })}
                    {stageDeals.length === 0 && (
                      <div className="border-2 border-dashed border-slate-700 rounded-lg p-4 text-center text-xs text-slate-600">
                        No deals
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
