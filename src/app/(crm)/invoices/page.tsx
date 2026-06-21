import { Header } from "@/components/layout/header";
import { Receipt, Plus, CheckCircle2, AlertTriangle, Clock } from "lucide-react";

const invoices = [
  {
    number: "INV-2026-0001",
    hospital: "Narayana Health",
    date: "2026-06-01",
    dueDate: "2026-06-30",
    subtotal: 2800000,
    gstType: "CGST_SGST",
    cgst: 126000,
    sgst: 126000,
    igst: 0,
    total: 3052000,
    amountPaid: 3052000,
    status: "PAID",
    tallySynced: true,
    paymentMethod: "NEFT",
    paymentDate: "2026-06-28",
  },
  {
    number: "INV-2026-0002",
    hospital: "Manipal Hospitals",
    date: "2026-06-01",
    dueDate: "2026-06-30",
    subtotal: 1900000,
    gstType: "CGST_SGST",
    cgst: 85500,
    sgst: 85500,
    igst: 0,
    total: 2071000,
    amountPaid: 0,
    status: "OVERDUE",
    tallySynced: true,
    paymentMethod: null,
    paymentDate: null,
  },
  {
    number: "INV-2026-0003",
    hospital: "Aster CMI Hospital",
    date: "2026-06-01",
    dueDate: "2026-07-01",
    subtotal: 950000,
    gstType: "CGST_SGST",
    cgst: 42750,
    sgst: 42750,
    igst: 0,
    total: 1035500,
    amountPaid: 0,
    status: "SENT",
    tallySynced: false,
    paymentMethod: null,
    paymentDate: null,
  },
  {
    number: "INV-2026-0004",
    hospital: "Fortis Healthcare",
    date: "2026-06-10",
    dueDate: "2026-07-10",
    subtotal: 485000,
    gstType: "IGST",
    cgst: 0,
    sgst: 0,
    igst: 87300,
    total: 572300,
    amountPaid: 0,
    status: "DRAFT",
    tallySynced: false,
    paymentMethod: null,
    paymentDate: null,
  },
  {
    number: "INV-2026-0005",
    hospital: "Max Super Speciality",
    date: "2026-06-15",
    dueDate: "2026-07-15",
    subtotal: 1250000,
    gstType: "IGST",
    cgst: 0,
    sgst: 0,
    igst: 225000,
    total: 1475000,
    amountPaid: 0,
    status: "SENT",
    tallySynced: true,
    paymentMethod: null,
    paymentDate: null,
  },
];

const statusConfig: Record<string, { text: string; bg: string; icon: React.ComponentType<{ size?: number; className?: string }> }> = {
  PAID:     { text: "#22c55e", bg: "rgba(34,197,94,0.1)",    icon: CheckCircle2 },
  SENT:     { text: "#3b82f6", bg: "rgba(59,130,246,0.1)",   icon: Clock },
  OVERDUE:  { text: "#fb7185", bg: "rgba(251,113,133,0.1)",  icon: AlertTriangle },
  DRAFT:    { text: "#64748b", bg: "rgba(100,116,139,0.1)",  icon: Clock },
};

function formatINR(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  return `₹${(amount / 1000).toFixed(0)}K`;
}

export default function InvoicesPage() {
  const totalRevenue = invoices.filter(i => i.status === "PAID").reduce((s, i) => s + i.total, 0);
  const outstanding = invoices.filter(i => i.status !== "PAID" && i.status !== "DRAFT").reduce((s, i) => s + i.total, 0);

  return (
    <div>
      <Header title="Invoices" subtitle="GST invoicing with Tally sync" />

      <div className="p-6">
        {/* Summary */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Collected This Month", value: formatINR(totalRevenue),  color: "#22c55e" },
            { label: "Outstanding",          value: formatINR(outstanding),   color: "#f59e0b" },
            { label: "Overdue",              value: "₹20.7L",                  color: "#fb7185" },
            { label: "Tally Synced",         value: "3/5 invoices",            color: "#3b82f6" },
          ].map(s => (
            <div key={s.label} className="pulse-card p-5">
              <p className="text-xs text-slate-400 mb-1">{s.label}</p>
              <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mb-4">
          <select className="px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:border-teal-500">
            <option>All Statuses</option>
            <option>Paid</option>
            <option>Sent</option>
            <option>Overdue</option>
            <option>Draft</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white font-medium ml-auto"
            style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
            <Plus size={14} /> New Invoice
          </button>
        </div>

        {/* Table */}
        <div className="pulse-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                  {["Invoice #", "Hospital", "Date", "Due Date", "Subtotal", "GST", "Total", "Status", "Tally"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                {invoices.map((inv) => {
                  const sc = statusConfig[inv.status];
                  const gstAmount = inv.gstType === "IGST" ? inv.igst : inv.cgst + inv.sgst;
                  return (
                    <tr key={inv.number} className="hover:bg-slate-800/40 cursor-pointer transition-all">
                      <td className="px-4 py-3 font-mono text-xs text-teal-400">{inv.number}</td>
                      <td className="px-4 py-3 text-white font-medium">{inv.hospital}</td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{inv.date}</td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{inv.dueDate}</td>
                      <td className="px-4 py-3 font-mono text-slate-300">{formatINR(inv.subtotal)}</td>
                      <td className="px-4 py-3">
                        <div className="text-xs">
                          <p className="font-mono text-slate-300">{formatINR(gstAmount)}</p>
                          <p className="text-slate-500">{inv.gstType === "IGST" ? "IGST 18%" : "CGST+SGST 9%+9%"}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono font-semibold text-white">{formatINR(inv.total)}</td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full w-fit"
                          style={{ color: sc.text, background: sc.bg }}>
                          <sc.icon size={10} /> {inv.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {inv.tallySynced ? (
                          <span className="flex items-center gap-1 text-xs text-green-400">
                            <CheckCircle2 size={12} /> Synced
                          </span>
                        ) : (
                          <button className="text-xs text-amber-400 hover:text-amber-300 transition-all">
                            Sync now
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
