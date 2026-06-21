"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Plus, Search, Phone, Mail, Loader2 } from "lucide-react";

type Account = { name: string } | null;
type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  specialty: string | null;
  account: Account;
  hospitalAffiliation: string | null;
  phone: string | null;
  email: string | null;
  referralVolume: number | null;
  preferredModality: string[];
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/contacts")
      .then((r) => r.json())
      .then((d) => { setContacts(d.contacts ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = contacts.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
      (c.specialty ?? "").toLowerCase().includes(q) ||
      (c.account?.name ?? c.hospitalAffiliation ?? "").toLowerCase().includes(q)
    );
  });

  const totalReferrals = contacts.reduce((s, c) => s + (c.referralVolume ?? 0), 0);
  const hospitalCount  = new Set(contacts.map((c) => c.account?.name ?? c.hospitalAffiliation).filter(Boolean)).size;

  return (
    <div>
      <Header title="Referring Doctors" subtitle="Manage your network of referring physicians" />

      <div className="p-3 sm:p-6">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {[
            { label: "Total Contacts",     value: contacts.length, color: "#3b82f6" },
            { label: "Total Referrals/mo", value: totalReferrals,  color: "#0d9488" },
            { label: "Hospitals Covered",  value: hospitalCount,   color: "#f59e0b" },
          ].map((s) => (
            <div key={s.label} className="pulse-card p-5 text-center">
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="relative flex-1 min-w-0 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg text-slate-300 placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white font-medium ml-auto"
            style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
            <Plus size={14} /> <span className="hidden sm:inline">Add Contact</span>
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
                    {["Doctor", "Specialty", "Hospital", "Referrals/mo", "Modalities", "Contact"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                  {filtered.map((c) => {
                    const hospital = c.account?.name ?? c.hospitalAffiliation ?? "—";
                    return (
                      <tr key={c.id} className="hover:bg-slate-800/40 cursor-pointer transition-all">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                              style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
                              {c.firstName[0]}{c.lastName[0]}
                            </div>
                            <p className="font-medium text-white whitespace-nowrap">
                              {c.firstName} {c.lastName}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">{c.specialty ?? "—"}</td>
                        <td className="px-4 py-3 text-slate-300 text-sm whitespace-nowrap">{hospital}</td>
                        <td className="px-4 py-3">
                          <span className="text-sm font-semibold text-white">{c.referralVolume ?? 0}</span>
                          <span className="text-xs text-slate-500 ml-1">/mo</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {c.preferredModality.map((m) => (
                              <span key={m} className="text-xs px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">{m}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {c.phone && (
                              <a href={`tel:${c.phone}`}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-teal-500/10 text-slate-400 hover:text-teal-400 transition-all">
                                <Phone size={13} />
                              </a>
                            )}
                            {c.email && (
                              <a href={`mailto:${c.email}`}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 transition-all">
                                <Mail size={13} />
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-center text-slate-500 text-sm">
                        {search ? "No doctors match your search." : "No contacts found."}
                      </td>
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
