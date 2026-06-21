import { Header } from "@/components/layout/header";
import { Users, Plus, Search, Phone, Mail } from "lucide-react";

const contacts = [
  { firstName: "Dr. Arjun",    lastName: "Mehta",    specialty: "Radiology",    hospital: "Apollo Hospitals",  phone: "+91-98765-11001", email: "arjun.mehta@apollo.com",     referrals: 42, modalities: ["MRI", "CT"] },
  { firstName: "Dr. Sunita",   lastName: "Rao",      specialty: "Oncology",     hospital: "Narayana Health",   phone: "+91-98765-11002", email: "sunita.rao@narayana.com",     referrals: 68, modalities: ["PET", "CT"] },
  { firstName: "Dr. Kiran",    lastName: "Patel",    specialty: "Cardiology",   hospital: "Manipal Hospitals", phone: "+91-98765-11003", email: "kiran.patel@manipal.com",     referrals: 35, modalities: ["CARDIAC", "CT"] },
  { firstName: "Dr. Preethi",  lastName: "Nair",     specialty: "Neurology",    hospital: "Aster CMI",         phone: "+91-98765-11004", email: "preethi.nair@aster.com",      referrals: 29, modalities: ["MRI"] },
  { firstName: "Dr. Rahul",    lastName: "Sharma",   specialty: "Orthopedics",  hospital: "Sparsh Hospital",   phone: "+91-98765-11005", email: "rahul.sharma@sparsh.com",     referrals: 18, modalities: ["X-RAY", "MRI"] },
  { firstName: "Dr. Vandana",  lastName: "Singh",    specialty: "Gynecology",   hospital: "Cloudnine",         phone: "+91-98765-11006", email: "vandana.singh@cloudnine.com", referrals: 12, modalities: ["ULTRASOUND"] },
  { firstName: "Dr. Suresh",   lastName: "Kumar",    specialty: "Radiology",    hospital: "Fortis Healthcare", phone: "+91-98765-11007", email: "suresh.kumar@fortis.com",     referrals: 55, modalities: ["CT", "X-RAY", "MRI"] },
  { firstName: "Dr. Ananya",   lastName: "Reddy",    specialty: "Oncology",     hospital: "HCG Cancer Centre", phone: "+91-98765-11008", email: "ananya.reddy@hcg.com",        referrals: 31, modalities: ["PET", "CT"] },
];

export default function ContactsPage() {
  return (
    <div>
      <Header title="Referring Doctors" subtitle="Manage your network of referring physicians" />

      <div className="p-6">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Contacts",     value: contacts.length,                        color: "#3b82f6" },
            { label: "Total Referrals/mo", value: contacts.reduce((s, c) => s + c.referrals, 0), color: "#0d9488" },
            { label: "Hospitals Covered",  value: new Set(contacts.map(c => c.hospital)).size,   color: "#f59e0b" },
          ].map(s => (
            <div key={s.label} className="pulse-card p-5 text-center">
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Search doctors..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-300 placeholder-slate-500 focus:outline-none focus:border-teal-500" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white font-medium ml-auto"
            style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
            <Plus size={14} /> Add Contact
          </button>
        </div>

        {/* Table */}
        <div className="pulse-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "var(--border)" }}>
                  {["Doctor", "Specialty", "Hospital", "Referrals/mo", "Preferred Modalities", "Contact"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                {contacts.map(c => (
                  <tr key={c.email} className="hover:bg-slate-800/40 cursor-pointer transition-all">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                          style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
                          {c.firstName[0]}{c.lastName[0]}
                        </div>
                        <div>
                          <p className="font-medium text-white">{c.firstName} {c.lastName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{c.specialty}</td>
                    <td className="px-4 py-3 text-slate-300 text-sm">{c.hospital}</td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-white">{c.referrals}</span>
                      <span className="text-xs text-slate-500 ml-1">/mo</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {c.modalities.map(m => (
                          <span key={m} className="text-xs px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">{m}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <a href={`tel:${c.phone}`} className="p-1.5 rounded-lg bg-slate-800 hover:bg-teal-500/10 text-slate-400 hover:text-teal-400 transition-all">
                          <Phone size={13} />
                        </a>
                        <a href={`mailto:${c.email}`} className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 transition-all">
                          <Mail size={13} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
