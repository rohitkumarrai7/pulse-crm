"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Plus, CheckCircle2, AlertTriangle, Clock, Loader2 } from "lucide-react";

type Account = { name: string };
type Invoice = {
  id: string;
  invoiceNumber: string;
  account: Account;
  invoiceDate: string;
  dueDate: string;
  subtotal: number;
  gstType: string;
  cgstAmount: number;
  sgstAmount: number;
  igstAmount: number;
  gstTotal: number;
  totalAmount: number;
  amountPaid: number;
  status: string;
  tallySynced: boolean;
  paymentMethod: string | null;
  paymentDate: string | null;
};

const statusConfig: Record<string, { text: string; bg: string; Icon: typeof CheckCircle2 }> = {
  PAID:    { text: "#22c55e", bg: "rgba(34,197,94,0.1)",   Icon: CheckCircle2 },
  SENT:    { text: "#3b82f6", bg: "rgba(59,130,246,0.1)",  Icon: Clock },
  OVERDUE: { text: "#fb7185", bg: "rgba(251,113,133,0.1)", Icon: AlertTriangle },
  DRAFT:   { text: "#64748b", bg: "rgba(100,116,139,0.1)", Icon: Clock },
};

function formatINR(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  return `₹${(amount / 1000).toFixed(0)}K`;
}

function fmtDate(d: string): string {
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetch("/api/invoices")
      .then((r) => r.json())
      .then((d) => { setInvoices(d.invoices ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const totalRevenue = invoices.filter((i) => i.status === "PAID").reduce((s, i) => s + i.totalAmount, 0);
  const outstanding  = invoices.filter((i) => i.status === "SENT").reduce((s, i) => s + i.totalAmount, 0);
  const overdue      = invoices.filter((i) => i.status === "OVERDUE").reduce((s, i) => s + i.totalAmount, 0);
  const tallySynced  = invoices.filter((i) => i.tallySynced).length;

  const filtered = statusFilter === "All"
    ? invoices
    : invoices.filter((i) => i.status === statusFilter.toUpperCase());

  return (
    <div>
      <Header title="Invoices" subtitle="GST invoicing with Tally sync" />

      <div className="p-3 sm:p-6">
        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[
            { label: "Collected",   value: formatINR(totalRevenue), color: "#22c55e" },
            { label: "Outstanding", value: formatINR(outstanding),  color: "#f59e0b" },
            { label: "Overdue",     value: formatINR(overdue),      color: "#fb7185" },
            { label: "Tally Synced",value: `${tallySynced}/${invoices.length}`, color: "#3b82f6" },
          ].map((s) => (
            <div key={s.label} className="pulse-card p-4 sm:p-5">
              <p className="text-xs text-slate-400 mb-1">{s.label}</p>
              <p className="text-lg sm:text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:border-teal-500"
          >
            <option value="All">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Sent">Sent</option>
            <option value="Overdue">Overdue</option>
            <option value="Draft">Draft</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white font-medium ml-auto"
            style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
            <Plus size={14} /> <span className="hidden sm:inline">New Invoice</span>
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <Loader2 size={20} className="animate-spin mr-2" /> Loading…
          </div>
        ) : (
          <div className="pulse-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                    {["Invoice #", "Hospital", "Date", "Due", "Subtotal", "GST", "Total", "Status", "Tally"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                  {filtered.map((inv) => {
                    const sc = statusConfig[inv.status] ?? statusConfig.DRAFT;
                    const gstAmount = inv.gstType === "IGST" ? inv.igstAmount : inv.cgstAmount + inv.sgstAmount;
                    return (
                      <tr key={inv.id} className="hover:bg-slate-800/40 cursor-pointer transition-all">
                        <td className="px-4 py-3 font-mono text-xs text-teal-400 whitespace-nowrap">{inv.invoiceNumber}</td>
                        <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{inv.account.name}</td>
                        <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{fmtDate(inv.invoiceDate)}</td>
                        <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{fmtDate(inv.dueDate)}</td>
                        <td className="px-4 py-3 font-mono text-slate-300 whitespace-nowrap">{formatINR(inv.subtotal)}</td>
                        <td className="px-4 py-3">
                          <div className="text-xs whitespace-nowrap">
                            <p className="font-mono text-slate-300">{formatINR(gstAmount)}</p>
                            <p className="text-slate-500">{inv.gstType === "IGST" ? "IGST 18%" : "CGST+SGST"}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-mono font-semibold text-white whitespace-nowrap">{formatINR(inv.totalAmount)}</td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full w-fit whitespace-nowrap"
                            style={{ color: sc.text, background: sc.bg }}>
                            <sc.Icon size={10} /> {inv.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {inv.tallySynced ? (
                            <span className="flex items-center gap-1 text-xs text-green-400 whitespace-nowrap">
                              <CheckCircle2 size={12} /> Synced
                            </span>
                          ) : (
                            <button className="text-xs text-amber-400 hover:text-amber-300 transition-all whitespace-nowrap">
                              Sync now
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-4 py-10 text-center text-slate-500 text-sm">No invoices found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
