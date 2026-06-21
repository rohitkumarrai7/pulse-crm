import { FileText, Clock, AlertTriangle } from "lucide-react";
import { daysUntil } from "@/lib/utils";
import Link from "next/link";

const renewals = [
  { hospital: "Apollo Hospitals", tier: "PROSPECT", endDate: "2026-08-05", value: 485000 },
  { hospital: "Manipal Hospitals", tier: "SILVER", endDate: "2026-08-20", value: 720000 },
  { hospital: "Columbia Asia",     tier: "BRONZE",  endDate: "2026-09-10", value: 320000 },
  { hospital: "Aster CMI Hospital", tier: "BRONZE",  endDate: "2026-09-25", value: 295000 },
];

const tierColor: Record<string, string> = {
  GOLD: "#f59e0b", SILVER: "#94a3b8", BRONZE: "#b45309", PROSPECT: "#3b82f6",
};

export function ContractRenewalWidget() {
  return (
    <div className="pulse-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-amber-400" />
          <h3 className="text-sm font-semibold text-white">Contract Renewals</h3>
        </div>
        <Link href="/contracts" className="text-xs text-teal-400 hover:text-teal-300">View all</Link>
      </div>

      <div className="space-y-2">
        {renewals.map((r) => {
          const days = daysUntil(r.endDate);
          const urgent = days <= 30;
          return (
            <div key={r.hospital}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-all cursor-pointer">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold" style={{ color: tierColor[r.tier] }}>
                    {r.tier}
                  </span>
                  <span className="text-sm text-white font-medium">{r.hospital}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  ₹{(r.value / 1000).toFixed(0)}K/month
                </p>
              </div>
              <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full
                ${urgent ? "bg-rose-400/10 text-rose-400" : "bg-amber-400/10 text-amber-400"}`}>
                {urgent && <AlertTriangle size={10} />}
                <Clock size={10} />
                {days}d
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
