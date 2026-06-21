import { Header } from "@/components/layout/header";
import { Briefcase, Plus } from "lucide-react";

const stages = [
  { id: "NEW_LEAD",       label: "New Lead",        color: "#64748b" },
  { id: "QUALIFIED",      label: "Qualified",       color: "#3b82f6" },
  { id: "DEMO_SCHEDULED", label: "Demo Scheduled",  color: "#8b5cf6" },
  { id: "PROPOSAL_SENT",  label: "Proposal Sent",   color: "#f59e0b" },
  { id: "NEGOTIATION",    label: "Negotiation",     color: "#fb923c" },
  { id: "CONTRACT_SIGNED",label: "Contract Signed", color: "#22c55e" },
];

const deals = [
  { title: "Apollo Hospitals — Gold SLA",  stage: "NEGOTIATION",    value: 4800000, hospital: "Apollo Hospitals",  probability: 85 },
  { title: "Max Delhi — Standard SLA",     stage: "DEMO_SCHEDULED", value: 2800000, hospital: "Max Speciality",    probability: 60 },
  { title: "Fortis Mumbai — Silver SLA",   stage: "PROPOSAL_SENT",  value: 2200000, hospital: "Fortis Healthcare", probability: 45 },
  { title: "HCG — Oncology Bundle",        stage: "QUALIFIED",      value: 1500000, hospital: "HCG Cancer Centre", probability: 35 },
  { title: "Columbia Asia — Bronze SLA",   stage: "NEW_LEAD",       value: 900000,  hospital: "Columbia Asia",     probability: 20 },
];

export default function DealsPage() {
  return (
    <div>
      <Header title="Deals" subtitle="Sales pipeline — drag & drop to update stages" />
      <div className="p-6">
        <div className="flex items-center justify-end mb-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white font-medium"
            style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
            <Plus size={14} /> New Deal
          </button>
        </div>

        {/* Kanban board */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map(stage => {
            const stageDeals = deals.filter(d => d.stage === stage.id);
            return (
              <div key={stage.id} className="flex-shrink-0 w-64">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: stage.color }} />
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wide">
                    {stage.label}
                  </span>
                  <span className="ml-auto text-xs text-slate-500">{stageDeals.length}</span>
                </div>

                <div className="space-y-3 min-h-32">
                  {stageDeals.map(deal => (
                    <div key={deal.title}
                      className="pulse-card p-4 cursor-grab active:cursor-grabbing hover:border-slate-600 transition-all">
                      <p className="text-sm font-medium text-white mb-1">{deal.title}</p>
                      <p className="text-xs text-slate-400 mb-3">{deal.hospital}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">
                          ₹{(deal.value / 100000).toFixed(0)}L/yr
                        </span>
                        <span className="text-xs font-semibold" style={{ color: stage.color }}>
                          {deal.probability}%
                        </span>
                      </div>
                      <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${deal.probability}%`, background: stage.color }} />
                      </div>
                    </div>
                  ))}
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
      </div>
    </div>
  );
}
