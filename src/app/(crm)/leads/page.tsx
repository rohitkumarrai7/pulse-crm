import { Header } from "@/components/layout/header";
import { Flame, Plus, Filter, TrendingUp, TrendingDown } from "lucide-react";

const leads = [
  { name: "Apollo Hospitals", company: "Apollo Hospitals Ltd",     source: "REFERRAL",    score: 92, temp: "HOT",  status: "CONTACTED",  assignedTo: "Rahul S.", lastActivity: "2 hours ago",  city: "Bangalore" },
  { name: "Max Hospital CEO", company: "Max Super Speciality",     source: "COLD_OUTREACH", score: 88, temp: "HOT",  status: "QUALIFIED",  assignedTo: "Priya M.", lastActivity: "1 day ago",    city: "Delhi" },
  { name: "Fortis Admin",     company: "Fortis Healthcare",        source: "WEB",         score: 68, temp: "WARM", status: "CONTACTED",  assignedTo: "Rahul S.", lastActivity: "3 days ago",   city: "Mumbai" },
  { name: "HCG Purchase",     company: "HCG Cancer Centre",        source: "REFERRAL",    score: 61, temp: "WARM", status: "NEW",        assignedTo: "Priya M.", lastActivity: "5 days ago",   city: "Bangalore" },
  { name: "Columbia IT Head", company: "Columbia Asia Hospital",   source: "WEB",         score: 55, temp: "WARM", status: "NEW",        assignedTo: "Unassigned", lastActivity: "1 week ago", city: "Bangalore" },
  { name: "Sparsh Admin",     company: "Sparsh Hospital",          source: "WEB",         score: 35, temp: "COLD", status: "NEW",        assignedTo: "Unassigned", lastActivity: "2 weeks ago",city: "Bangalore" },
  { name: "Cloudnine CEO",    company: "Cloudnine Hospitals",      source: "CONFERENCE",  score: 22, temp: "COLD", status: "NEW",        assignedTo: "Unassigned", lastActivity: "3 weeks ago",city: "Bangalore" },
];

const tempColors: Record<string, { text: string; bg: string }> = {
  HOT:  { text: "#fb7185", bg: "rgba(251,113,133,0.1)" },
  WARM: { text: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  COLD: { text: "#60a5fa", bg: "rgba(96,165,250,0.1)" },
  DEAD: { text: "#64748b", bg: "rgba(100,116,139,0.1)" },
};

const sourceLabels: Record<string, string> = {
  REFERRAL: "Referral", WEB: "Web", COLD_OUTREACH: "Cold Outreach",
  CONFERENCE: "Conference", SOCIAL: "Social", MANUAL: "Manual",
};

export default function LeadsPage() {
  return (
    <div>
      <Header title="Hot Leads" subtitle="Pulse Intent Engine — AI-scored prospect tracking" />

      <div className="p-6">
        {/* Kanban summary */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "HOT (80+)",  count: 2, trend: +15, color: "#fb7185" },
            { label: "WARM (50+)", count: 3, trend: +2,  color: "#f59e0b" },
            { label: "COLD (20+)", count: 2, trend: -1,  color: "#60a5fa" },
            { label: "Total Leads",count: 7, trend: +3,  color: "#0d9488" },
          ].map(s => (
            <div key={s.label} className="pulse-card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-400 mb-1">{s.label}</p>
                  <p className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</p>
                </div>
                <div className={`flex items-center gap-0.5 text-xs font-semibold ${s.trend > 0 ? "text-green-400" : "text-rose-400"}`}>
                  {s.trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {Math.abs(s.trend)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mb-4">
          <select className="px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:border-teal-500">
            <option>All Temperatures</option>
            <option>HOT</option>
            <option>WARM</option>
            <option>COLD</option>
          </select>
          <select className="px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:border-teal-500">
            <option>All Sources</option>
            <option>Web</option>
            <option>Referral</option>
            <option>Cold Outreach</option>
            <option>Conference</option>
          </select>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300 border border-slate-700 bg-slate-800 hover:bg-slate-700 transition-all ml-auto">
            <Filter size={14} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white font-medium"
            style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
            <Plus size={14} /> Add Lead
          </button>
        </div>

        {/* Table */}
        <div className="pulse-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                  {["Lead", "Company", "Source", "Intent Score", "Temperature", "Status", "Assigned To", "Last Activity"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                {leads.map((l) => {
                  const tc = tempColors[l.temp];
                  return (
                    <tr key={l.name} className="hover:bg-slate-800/40 cursor-pointer transition-all">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-white">{l.name}</p>
                          <p className="text-xs text-slate-400">{l.city}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-300 text-sm">{l.company}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                          {sourceLabels[l.source]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                            <div className="h-full rounded-full"
                              style={{
                                width: `${l.score}%`,
                                background: l.score >= 80 ? "#fb7185" : l.score >= 50 ? "#f59e0b" : "#3b82f6",
                              }} />
                          </div>
                          <span className="text-sm font-bold font-mono" style={{ color: tc.text }}>{l.score}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ color: tc.text, background: tc.bg }}>
                          {l.temp === "HOT" && <Flame size={10} />}
                          {l.temp}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                          {l.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{l.assignedTo}</td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{l.lastActivity}</td>
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
