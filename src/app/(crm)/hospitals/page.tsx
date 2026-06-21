import { Header } from "@/components/layout/header";
import { Building2, CheckCircle2, AlertTriangle, Plus, Filter, Search } from "lucide-react";

const hospitals = [
  {
    name: "Apollo Hospitals",
    location: "Bannerghatta Rd, Bangalore",
    type: "MULTISPECIALTY",
    beds: 250,
    nabh: true,
    nabl: false,
    volume: 800,
    currentVendor: "CompetitorX",
    slaTier: null,
    contractStatus: "EXPIRING",
    daysLeft: 45,
    intentScore: 92,
    status: "PROSPECT",
    annualValue: null,
  },
  {
    name: "Narayana Health",
    location: "Bangalore",
    type: "MULTISPECIALTY",
    beds: 1000,
    nabh: true,
    nabl: true,
    volume: 2500,
    currentVendor: "Radivue",
    slaTier: "GOLD",
    contractStatus: "ACTIVE",
    daysLeft: 120,
    intentScore: null,
    status: "ACTIVE",
    annualValue: 2800000,
  },
  {
    name: "Manipal Hospitals",
    location: "Old Airport Rd, Bangalore",
    type: "MULTISPECIALTY",
    beds: 600,
    nabh: true,
    nabl: false,
    volume: 1800,
    currentVendor: "Radivue",
    slaTier: "SILVER",
    contractStatus: "EXPIRING",
    daysLeft: 60,
    intentScore: null,
    status: "ACTIVE",
    annualValue: 1900000,
  },
  {
    name: "Aster CMI Hospital",
    location: "Bangalore",
    type: "SUPERSPECIALTY",
    beds: 500,
    nabh: true,
    nabl: false,
    volume: 900,
    currentVendor: "Radivue",
    slaTier: "BRONZE",
    contractStatus: "AT_RISK",
    daysLeft: 180,
    intentScore: null,
    status: "AT_RISK",
    annualValue: 950000,
  },
  {
    name: "Fortis Healthcare",
    location: "Mulund, Mumbai",
    type: "MULTISPECIALTY",
    beds: 300,
    nabh: true,
    nabl: true,
    volume: 1200,
    currentVendor: "In-house",
    slaTier: null,
    contractStatus: null,
    daysLeft: null,
    intentScore: 68,
    status: "PROSPECT",
    annualValue: null,
  },
  {
    name: "Max Super Speciality",
    location: "Saket, Delhi",
    type: "SUPERSPECIALTY",
    beds: 500,
    nabh: false,
    nabl: false,
    volume: 1500,
    currentVendor: "None",
    slaTier: null,
    contractStatus: null,
    daysLeft: null,
    intentScore: 88,
    status: "PROSPECT",
    annualValue: null,
  },
  {
    name: "HCG Cancer Centre",
    location: "Bangalore",
    type: "ONCOLOGY",
    beds: 200,
    nabh: true,
    nabl: false,
    volume: 400,
    currentVendor: null,
    slaTier: null,
    contractStatus: null,
    daysLeft: null,
    intentScore: 61,
    status: "PROSPECT",
    annualValue: null,
  },
  {
    name: "Columbia Asia Hospital",
    location: "Hebbal, Bangalore",
    type: "MULTISPECIALTY",
    beds: 200,
    nabh: false,
    nabl: false,
    volume: 600,
    currentVendor: "CompetitorY",
    slaTier: null,
    contractStatus: null,
    daysLeft: null,
    intentScore: 55,
    status: "PROSPECT",
    annualValue: null,
  },
  {
    name: "Sparsh Hospital",
    location: "Bangalore",
    type: "ORTHOPEDIC",
    beds: 150,
    nabh: false,
    nabl: false,
    volume: 300,
    currentVendor: null,
    slaTier: null,
    contractStatus: null,
    daysLeft: null,
    intentScore: 35,
    status: "PROSPECT",
    annualValue: null,
  },
  {
    name: "Cloudnine Hospitals",
    location: "Bangalore",
    type: "MATERNITY",
    beds: 100,
    nabh: false,
    nabl: false,
    volume: 150,
    currentVendor: null,
    slaTier: null,
    contractStatus: null,
    daysLeft: null,
    intentScore: 22,
    status: "PROSPECT",
    annualValue: null,
  },
];

const statusColors: Record<string, { text: string; bg: string }> = {
  ACTIVE:   { text: "#22c55e", bg: "rgba(34,197,94,0.1)" },
  PROSPECT: { text: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  AT_RISK:  { text: "#fb7185", bg: "rgba(251,113,133,0.1)" },
  CHURNED:  { text: "#64748b", bg: "rgba(100,116,139,0.1)" },
};

const tierColors: Record<string, string> = {
  GOLD: "#f59e0b", SILVER: "#94a3b8", BRONZE: "#b45309",
};

export default function HospitalsPage() {
  return (
    <div>
      <Header title="Hospitals" subtitle="Manage your hospital accounts and prospects" />

      <div className="p-6">
        {/* Actions bar */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search hospitals..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg
                text-slate-300 placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300
            border border-slate-700 bg-slate-800 hover:bg-slate-700 transition-all">
            <Filter size={14} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white font-medium transition-all"
            style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
            <Plus size={14} /> Add Hospital
          </button>
        </div>

        {/* Table */}
        <div className="pulse-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                  {["Hospital", "Type", "Beds", "Accreditation", "Volume/mo", "Current Vendor", "SLA Tier", "Status", "Intent"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                {hospitals.map((h) => {
                  const sc = statusColors[h.status] || statusColors.PROSPECT;
                  return (
                    <tr key={h.name} className="hover:bg-slate-800/40 cursor-pointer transition-all">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-white">{h.name}</p>
                          <p className="text-xs text-slate-400">{h.location}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-300 text-xs">{h.type}</td>
                      <td className="px-4 py-3 text-slate-300">{h.beds}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {h.nabh && (
                            <span className="flex items-center gap-0.5 text-xs text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded">
                              <CheckCircle2 size={9} /> NABH
                            </span>
                          )}
                          {h.nabl && (
                            <span className="flex items-center gap-0.5 text-xs text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded">
                              <CheckCircle2 size={9} /> NABL
                            </span>
                          )}
                          {!h.nabh && !h.nabl && <span className="text-xs text-slate-600">—</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-300 font-mono text-xs">{h.volume.toLocaleString()}</td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{h.currentVendor || "—"}</td>
                      <td className="px-4 py-3">
                        {h.slaTier ? (
                          <span className="text-xs font-semibold" style={{ color: tierColors[h.slaTier] }}>
                            {h.slaTier}
                          </span>
                        ) : <span className="text-slate-600 text-xs">—</span>}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ color: sc.text, background: sc.bg }}>
                          {h.status}
                          {h.daysLeft && ` · ${h.daysLeft}d`}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {h.intentScore !== null ? (
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1 bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full rounded-full"
                                style={{
                                  width: `${h.intentScore}%`,
                                  background: h.intentScore >= 80 ? "#fb7185" : h.intentScore >= 50 ? "#f59e0b" : "#3b82f6",
                                }} />
                            </div>
                            <span className="text-xs font-mono text-slate-300">{h.intentScore}</span>
                          </div>
                        ) : (
                          <span className="text-slate-600 text-xs">Client</span>
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
