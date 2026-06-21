import { UserCheck, AlertTriangle } from "lucide-react";
import Link from "next/link";

const radiologists = [
  { name: "Dr. Rajesh Kumar",  specialty: "Neuro",     load: 45, max: 50, availability: "BUSY",      burnout: "LOW" },
  { name: "Dr. Priya Sharma",  specialty: "Cardiac",   load: 32, max: 50, availability: "AVAILABLE", burnout: "LOW" },
  { name: "Dr. Amit Patel",    specialty: "MSK",       load: 50, max: 50, availability: "BUSY",      burnout: "HIGH" },
  { name: "Dr. Sneha Gupta",   specialty: "Emergency", load: 28, max: 50, availability: "AVAILABLE", burnout: "LOW" },
  { name: "Dr. Vikram Rao",    specialty: "Onco",      load: 40, max: 50, availability: "AVAILABLE", burnout: "LOW" },
];

const availColor: Record<string, string> = {
  AVAILABLE: "#22c55e",
  BUSY: "#f59e0b",
  OFFLINE: "#64748b",
  ON_LEAVE: "#fb7185",
};

export function RadiologistLoadWidget() {
  return (
    <div className="pulse-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <UserCheck size={16} className="text-blue-400" />
          <h3 className="text-sm font-semibold text-white">Radiologist Workload</h3>
        </div>
        <Link href="/radiologists" className="text-xs text-teal-400 hover:text-teal-300">View all</Link>
      </div>

      <div className="space-y-3">
        {radiologists.map((r) => {
          const pct = Math.round((r.load / r.max) * 100);
          const barColor = pct >= 100 ? "#fb7185" : pct >= 80 ? "#f59e0b" : "#0d9488";
          return (
            <div key={r.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: availColor[r.availability] }} />
                  <span className="text-xs font-medium text-white">{r.name}</span>
                  <span className="text-xs text-slate-500">{r.specialty}</span>
                  {r.burnout === "HIGH" && (
                    <span className="flex items-center gap-0.5 text-xs text-rose-400">
                      <AlertTriangle size={10} /> Burnout
                    </span>
                  )}
                </div>
                <span className="text-xs font-mono" style={{ color: barColor }}>
                  {r.load}/{r.max}
                </span>
              </div>
              <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: barColor }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
