"use client";

import { useEffect, useState } from "react";
import { FileText, Clock, AlertTriangle, Loader2 } from "lucide-react";
import Link from "next/link";

type Contract = {
  id: string;
  contractNumber: string;
  account: { name: string };
  endDate: string;
  value: number;
  slaPolicy: { tier: string } | null;
  status: string;
  renewalStatus: string;
};

const tierColor: Record<string, string> = {
  GOLD: "#f59e0b", SILVER: "#94a3b8", BRONZE: "#b45309", STANDARD: "#3b82f6",
};

function daysUntilDate(d: string): number {
  return Math.ceil((new Date(d).getTime() - Date.now()) / 86400000);
}

export function ContractRenewalWidget() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contracts")
      .then((r) => r.json())
      .then((d) => {
        const upcoming = (d.contracts ?? [])
          .filter((c: Contract) => {
            const days = daysUntilDate(c.endDate);
            return days > 0 && days <= 120;
          })
          .slice(0, 4);
        setContracts(upcoming);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="pulse-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-amber-400" />
          <h3 className="text-sm font-semibold text-white">Contract Renewals</h3>
        </div>
        <Link href="/contracts" className="text-xs text-teal-400 hover:text-teal-300">View all</Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-6 text-slate-500">
          <Loader2 size={16} className="animate-spin" />
        </div>
      ) : (
        <div className="space-y-2">
          {contracts.map((c) => {
            const days = daysUntilDate(c.endDate);
            const urgent = days <= 30;
            const tier = c.slaPolicy?.tier ?? "STANDARD";
            return (
              <div key={c.id}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-all cursor-pointer">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold shrink-0" style={{ color: tierColor[tier] ?? "#94a3b8" }}>
                      {tier}
                    </span>
                    <span className="text-sm text-white font-medium truncate">{c.account.name}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    ₹{(c.value / 1000).toFixed(0)}K/month
                  </p>
                </div>
                <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ml-2
                  ${urgent ? "bg-rose-400/10 text-rose-400" : "bg-amber-400/10 text-amber-400"}`}>
                  {urgent && <AlertTriangle size={10} />}
                  <Clock size={10} />
                  {days}d
                </div>
              </div>
            );
          })}
          {contracts.length === 0 && (
            <p className="text-xs text-slate-500 text-center py-4">No upcoming renewals.</p>
          )}
        </div>
      )}
    </div>
  );
}
