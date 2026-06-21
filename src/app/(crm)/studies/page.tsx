import { Header } from "@/components/layout/header";
import { ClipboardList, Clock, AlertCircle, CheckCircle2, Loader2, Plus, Filter } from "lucide-react";

const studies = [
  { id: "ST-2026-001", patient: "PT-A4721", hospital: "Apollo Hospitals",    modality: "CT",    bodyPart: "Brain",    urgency: "EMERGENCY", status: "IN_PROGRESS", radiologist: "Dr. Sneha Gupta",  receivedAt: new Date(Date.now() - 8 * 60000),   sla: 30,  elapsed: 8  },
  { id: "ST-2026-002", patient: "PT-B2193", hospital: "Narayana Health",     modality: "MRI",   bodyPart: "Spine",    urgency: "URGENT",    status: "ASSIGNED",    radiologist: "Dr. Rajesh Kumar", receivedAt: new Date(Date.now() - 45 * 60000),  sla: 120, elapsed: 45 },
  { id: "ST-2026-003", patient: "PT-C8841", hospital: "Manipal Hospitals",   modality: "X-RAY", bodyPart: "Chest",    urgency: "ROUTINE",   status: "COMPLETED",   radiologist: "Dr. Priya Sharma", receivedAt: new Date(Date.now() - 180 * 60000), sla: 480, elapsed: 180 },
  { id: "ST-2026-004", patient: "PT-D3372", hospital: "Aster CMI",           modality: "PET",   bodyPart: "Abdomen",  urgency: "URGENT",    status: "IN_PROGRESS", radiologist: "Dr. Vikram Rao",   receivedAt: new Date(Date.now() - 95 * 60000),  sla: 120, elapsed: 95 },
  { id: "ST-2026-005", patient: "PT-E1092", hospital: "Narayana Health",     modality: "MRI",   bodyPart: "Knee",     urgency: "ROUTINE",   status: "PENDING",     radiologist: null,               receivedAt: new Date(Date.now() - 20 * 60000),  sla: 480, elapsed: 20 },
  { id: "ST-2026-006", patient: "PT-F6621", hospital: "Apollo Hospitals",    modality: "CT",    bodyPart: "Chest",    urgency: "URGENT",    status: "REPORTED",    radiologist: "Dr. Amit Patel",   receivedAt: new Date(Date.now() - 100 * 60000), sla: 120, elapsed: 100 },
  { id: "ST-2026-007", patient: "PT-G9912", hospital: "Manipal Hospitals",   modality: "CARDIAC", bodyPart: "Heart",  urgency: "EMERGENCY", status: "COMPLETED",   radiologist: "Dr. Priya Sharma", receivedAt: new Date(Date.now() - 25 * 60000),  sla: 30,  elapsed: 25 },
  { id: "ST-2026-008", patient: "PT-H5543", hospital: "HCG Cancer Centre",   modality: "PET",   bodyPart: "Whole Body", urgency: "ROUTINE", status: "IN_PROGRESS", radiologist: "Dr. Vikram Rao",  receivedAt: new Date(Date.now() - 200 * 60000), sla: 480, elapsed: 200 },
  { id: "ST-2026-009", patient: "PT-I7714", hospital: "Fortis Healthcare",   modality: "MRI",   bodyPart: "Brain",    urgency: "URGENT",    status: "ASSIGNED",    radiologist: "Dr. Rajesh Kumar", receivedAt: new Date(Date.now() - 55 * 60000),  sla: 120, elapsed: 55 },
  { id: "ST-2026-010", patient: "PT-J2281", hospital: "Narayana Health",     modality: "X-RAY", bodyPart: "Pelvis",   urgency: "ROUTINE",   status: "PENDING",     radiologist: null,               receivedAt: new Date(Date.now() - 10 * 60000),  sla: 480, elapsed: 10 },
];

const urgencyColors: Record<string, { text: string; bg: string }> = {
  EMERGENCY: { text: "#fb7185", bg: "rgba(251,113,133,0.1)" },
  URGENT:    { text: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  ROUTINE:   { text: "#22c55e", bg: "rgba(34,197,94,0.1)" },
};

const modalityColors: Record<string, string> = {
  MRI: "#3b82f6", CT: "#f59e0b", "X-RAY": "#22c55e",
  PET: "#a855f7", CARDIAC: "#fb7185", ULTRASOUND: "#14b8a6",
};

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "COMPLETED" || status === "REPORTED") return <CheckCircle2 size={14} className="text-green-400" />;
  if (status === "IN_PROGRESS") return <Loader2 size={14} className="text-blue-400 animate-spin" />;
  if (status === "PENDING") return <Clock size={14} className="text-slate-400" />;
  return <AlertCircle size={14} className="text-amber-400" />;
};

export default function StudiesPage() {
  return (
    <div>
      <Header title="Studies" subtitle="Real-time radiology study tracking & SLA monitoring" />

      <div className="p-6">
        {/* Summary bar */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Pending",     count: 2,  color: "#64748b" },
            { label: "In Progress", count: 4,  color: "#3b82f6" },
            { label: "Completed",   count: 3,  color: "#22c55e" },
            { label: "SLA Breach",  count: 1,  color: "#fb7185" },
          ].map(s => (
            <div key={s.label} className="pulse-card p-4 text-center">
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</p>
              <p className="text-xs text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mb-4">
          <select className="px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-300
            focus:outline-none focus:border-teal-500">
            <option>All Urgency</option>
            <option>Emergency</option>
            <option>Urgent</option>
            <option>Routine</option>
          </select>
          <select className="px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-300
            focus:outline-none focus:border-teal-500">
            <option>All Modalities</option>
            <option>MRI</option>
            <option>CT</option>
            <option>X-Ray</option>
            <option>PET</option>
          </select>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-300
            border border-slate-700 bg-slate-800 hover:bg-slate-700 transition-all ml-auto">
            <Filter size={14} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white font-medium"
            style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
            <Plus size={14} /> New Study
          </button>
        </div>

        {/* Table */}
        <div className="pulse-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                  {["Study ID", "Hospital", "Modality", "Body Part", "Urgency", "Status", "Radiologist", "SLA Countdown"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                {studies.map((s) => {
                  const uc = urgencyColors[s.urgency];
                  const remaining = s.sla - s.elapsed;
                  const pct = (s.elapsed / s.sla) * 100;
                  const slaColor = remaining < 0 ? "#fb7185" : pct > 80 ? "#f59e0b" : "#22c55e";
                  const completed = s.status === "COMPLETED" || s.status === "REPORTED";
                  return (
                    <tr key={s.id} className="hover:bg-slate-800/40 cursor-pointer transition-all">
                      <td className="px-4 py-3 font-mono text-xs text-teal-400">{s.id}</td>
                      <td className="px-4 py-3 text-slate-200 text-sm font-medium">{s.hospital}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-bold px-2 py-0.5 rounded"
                          style={{ color: modalityColors[s.modality] || "#94a3b8", background: `${modalityColors[s.modality] || "#94a3b8"}15` }}>
                          {s.modality}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{s.bodyPart}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ color: uc.text, background: uc.bg }}>
                          {s.urgency}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <StatusIcon status={s.status} />
                          <span className="text-xs text-slate-300">{s.status.replace("_", " ")}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{s.radiologist || <span className="text-slate-600">Unassigned</span>}</td>
                      <td className="px-4 py-3">
                        {completed ? (
                          <span className="text-xs text-green-400">Completed in {s.elapsed}m</span>
                        ) : (
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold font-mono" style={{ color: slaColor }}>
                                {remaining < 0 ? `BREACH ${Math.abs(remaining)}m` : `${remaining}m left`}
                              </span>
                            </div>
                            <div className="w-20 h-1 bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all"
                                style={{ width: `${Math.min(pct, 100)}%`, background: slaColor }} />
                            </div>
                          </div>
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
