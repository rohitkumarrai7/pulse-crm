import { Header } from "@/components/layout/header";
import { UserCheck, AlertTriangle, Activity, Clock, Award } from "lucide-react";

const radiologists = [
  {
    name: "Dr. Rajesh Kumar",
    specialty: "Neuroradiology",
    qualifications: ["MD Radiology", "DNR", "FRCR"],
    availability: "BUSY",
    load: 45,
    max: 50,
    avgTurnaround: 18,
    accuracyRate: 99.7,
    burnoutRisk: "LOW",
    totalToday: 45,
  },
  {
    name: "Dr. Priya Sharma",
    specialty: "Cardiac Imaging",
    qualifications: ["MD Radiology", "FRCR"],
    availability: "AVAILABLE",
    load: 32,
    max: 50,
    avgTurnaround: 22,
    accuracyRate: 99.5,
    burnoutRisk: "LOW",
    totalToday: 32,
  },
  {
    name: "Dr. Amit Patel",
    specialty: "Musculoskeletal (MSK)",
    qualifications: ["MD Radiology", "PDCC MSK"],
    availability: "BUSY",
    load: 50,
    max: 50,
    avgTurnaround: 25,
    accuracyRate: 99.3,
    burnoutRisk: "HIGH",
    totalToday: 50,
  },
  {
    name: "Dr. Sneha Gupta",
    specialty: "Emergency Radiology",
    qualifications: ["MD Radiology", "DMRD"],
    availability: "AVAILABLE",
    load: 28,
    max: 50,
    avgTurnaround: 12,
    accuracyRate: 99.6,
    burnoutRisk: "LOW",
    totalToday: 28,
  },
  {
    name: "Dr. Vikram Rao",
    specialty: "Onco-Imaging",
    qualifications: ["MD Radiology", "FNVIR", "FRCR"],
    availability: "AVAILABLE",
    load: 40,
    max: 50,
    avgTurnaround: 20,
    accuracyRate: 99.8,
    burnoutRisk: "LOW",
    totalToday: 40,
  },
];

const availColors: Record<string, { text: string; bg: string; dot: string }> = {
  AVAILABLE: { text: "#22c55e", bg: "rgba(34,197,94,0.1)",    dot: "#22c55e" },
  BUSY:      { text: "#f59e0b", bg: "rgba(245,158,11,0.1)",   dot: "#f59e0b" },
  OFFLINE:   { text: "#64748b", bg: "rgba(100,116,139,0.1)",  dot: "#64748b" },
  ON_LEAVE:  { text: "#fb7185", bg: "rgba(251,113,133,0.1)",  dot: "#fb7185" },
};

const burnoutColors: Record<string, string> = {
  LOW: "#22c55e", MEDIUM: "#f59e0b", HIGH: "#fb7185",
};

export default function RadiologistsPage() {
  return (
    <div>
      <Header title="Radiologists" subtitle="Workload management & availability tracking" />

      <div className="p-6">
        {/* Summary */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Available",    count: 3, color: "#22c55e" },
            { label: "Busy",         count: 2, color: "#f59e0b" },
            { label: "High Burnout", count: 1, color: "#fb7185" },
            { label: "Total Today",  count: 195, color: "#3b82f6" },
          ].map(s => (
            <div key={s.label} className="pulse-card p-4 text-center">
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</p>
              <p className="text-xs text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Radiologist Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {radiologists.map((r) => {
            const ac = availColors[r.availability];
            const loadPct = (r.load / r.max) * 100;
            const loadColor = loadPct >= 100 ? "#fb7185" : loadPct >= 80 ? "#f59e0b" : "#0d9488";

            return (
              <div key={r.name} className="pulse-card p-5 hover:border-slate-600 transition-all cursor-pointer">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-white">{r.name}</h3>
                      {r.burnoutRisk === "HIGH" && (
                        <span className="flex items-center gap-1 text-xs text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded-full font-semibold">
                          <AlertTriangle size={10} /> Burnout Risk
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{r.specialty}</p>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ color: ac.text, background: ac.bg }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: ac.dot }} />
                    {r.availability}
                  </span>
                </div>

                {/* Load bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-slate-400">Today's Load</span>
                    <span className="text-xs font-semibold font-mono" style={{ color: loadColor }}>
                      {r.load}/{r.max}
                    </span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${loadPct}%`, background: loadColor }} />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-800/60 rounded-lg p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Clock size={11} className="text-slate-400" />
                      <span className="text-xs text-slate-400">Avg Turnaround</span>
                    </div>
                    <p className="text-base font-bold text-white">{r.avgTurnaround} min</p>
                  </div>
                  <div className="bg-slate-800/60 rounded-lg p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Award size={11} className="text-teal-400" />
                      <span className="text-xs text-slate-400">Accuracy</span>
                    </div>
                    <p className="text-base font-bold text-white">{r.accuracyRate}%</p>
                  </div>
                </div>

                {/* Qualifications */}
                <div className="flex flex-wrap gap-1.5">
                  {r.qualifications.map(q => (
                    <span key={q} className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                      {q}
                    </span>
                  ))}
                </div>

                {/* Burnout */}
                <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Activity size={11} style={{ color: burnoutColors[r.burnoutRisk] }} />
                    <span className="text-xs text-slate-400">Burnout Risk:</span>
                    <span className="text-xs font-semibold" style={{ color: burnoutColors[r.burnoutRisk] }}>
                      {r.burnoutRisk}
                    </span>
                  </div>
                  <button className="text-xs text-teal-400 hover:text-teal-300 transition-all">
                    View Studies →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
