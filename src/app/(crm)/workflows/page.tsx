import { Header } from "@/components/layout/header";
import { GitBranch, Play, Pause, Plus, Zap, Bell, Clock, ArrowRight } from "lucide-react";

const workflows = [
  {
    id: "WF-001",
    name: "Emergency Study Auto-Assignment",
    description: "Automatically assign emergency studies to Dr. Sneha Gupta (Emergency Specialist)",
    trigger: "STUDY_RECEIVED",
    triggerLabel: "Study Received",
    conditions: ["urgency == EMERGENCY", "status == PENDING"],
    actions: ["Assign to Dr. Sneha Gupta", "Send SMS alert to radiologist", "Start SLA countdown timer"],
    isActive: true,
    runCount: 142,
    lastRunAt: "2 minutes ago",
  },
  {
    id: "WF-002",
    name: "SLA Breach Alert",
    description: "Send alerts to operations team when SLA countdown hits 80% mark",
    trigger: "SLA_BREACH_WARNING",
    triggerLabel: "SLA Warning (80%)",
    conditions: ["sla_pct > 80", "status != COMPLETED"],
    actions: ["Email operations@radivue.com", "Create urgent task for supervisor", "Log breach event"],
    isActive: true,
    runCount: 28,
    lastRunAt: "45 minutes ago",
  },
  {
    id: "WF-003",
    name: "Contract Renewal Sequence",
    description: "Automated 90/60/30 day renewal reminder sequence for contract managers",
    trigger: "CONTRACT_EXPIRY",
    triggerLabel: "Contract Expiry",
    conditions: ["days_until_expiry <= 90"],
    actions: ["Send 90-day notice email", "Create follow-up task at 60 days", "Schedule negotiation meeting at 30 days"],
    isActive: true,
    runCount: 6,
    lastRunAt: "3 days ago",
  },
  {
    id: "WF-004",
    name: "Hot Lead Auto-Assignment",
    description: "Assign leads with intent score > 80 to senior sales rep within 1 hour",
    trigger: "LEAD_SCORE_CHANGE",
    triggerLabel: "Intent Score Change",
    conditions: ["intent_score >= 80", "assignedTo == null"],
    actions: ["Assign to Rahul (Senior Sales)", "Send WhatsApp alert", "Create 'Call within 2 hours' task"],
    isActive: true,
    runCount: 15,
    lastRunAt: "1 day ago",
  },
  {
    id: "WF-005",
    name: "Churn Risk Escalation",
    description: "Escalate accounts with churn risk > 65% to account manager",
    trigger: "CHURN_RISK_HIGH",
    triggerLabel: "Churn Risk High",
    conditions: ["churn_score > 65"],
    actions: ["Notify account manager", "Schedule retention call", "Generate discount proposal"],
    isActive: false,
    runCount: 3,
    lastRunAt: "2 weeks ago",
  },
];

const triggerColors: Record<string, string> = {
  STUDY_RECEIVED:    "#3b82f6",
  SLA_BREACH_WARNING:"#fb7185",
  CONTRACT_EXPIRY:   "#f59e0b",
  LEAD_SCORE_CHANGE: "#0d9488",
  CHURN_RISK_HIGH:   "#a855f7",
};

export default function WorkflowsPage() {
  return (
    <div>
      <Header title="Workflows" subtitle="Automation rules for zero-touch operations" />

      <div className="p-6">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Active Workflows", count: 4, color: "#22c55e" },
            { label: "Total Runs (30d)", count: 194, color: "#3b82f6" },
            { label: "Hours Saved (est.)", count: "38h", color: "#0d9488" },
          ].map(s => (
            <div key={s.label} className="pulse-card p-5 text-center">
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</p>
              <p className="text-xs text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end mb-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white font-medium"
            style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
            <Plus size={14} /> New Workflow
          </button>
        </div>

        {/* Workflow cards */}
        <div className="space-y-4">
          {workflows.map((w) => (
            <div key={w.id} className={`pulse-card p-6 transition-all ${!w.isActive ? "opacity-60" : "hover:border-slate-600"}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-xs text-slate-500">{w.id}</span>
                    <div className={`w-2 h-2 rounded-full ${w.isActive ? "bg-green-400 animate-pulse" : "bg-slate-600"}`} />
                    <span className="text-xs font-medium" style={{ color: triggerColors[w.trigger] }}>
                      <Zap size={10} className="inline mr-1" />
                      {w.triggerLabel}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white">{w.name}</h3>
                  <p className="text-sm text-slate-400 mt-0.5">{w.description}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button className={`p-2 rounded-lg transition-all ${w.isActive
                    ? "text-amber-400 bg-amber-400/10 hover:bg-amber-400/20"
                    : "text-green-400 bg-green-400/10 hover:bg-green-400/20"
                  }`}>
                    {w.isActive ? <Pause size={14} /> : <Play size={14} />}
                  </button>
                </div>
              </div>

              {/* Conditions → Actions */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                    IF (Conditions)
                  </p>
                  <div className="space-y-1.5">
                    {w.conditions.map((c, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="w-4 h-4 rounded bg-slate-700 flex items-center justify-center text-slate-400 font-mono text-[10px]">
                          {i + 1}
                        </span>
                        <code className="text-slate-300 bg-slate-800 px-2 py-0.5 rounded font-mono">{c}</code>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                    THEN (Actions)
                  </p>
                  <div className="space-y-1.5">
                    {w.actions.map((a, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <ArrowRight size={10} className="text-teal-400 flex-shrink-0" />
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Bell size={10} /> {w.runCount} runs
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} /> Last run {w.lastRunAt}
                  </span>
                </div>
                <button className="text-xs text-teal-400 hover:text-teal-300 transition-all">
                  Edit Workflow →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
