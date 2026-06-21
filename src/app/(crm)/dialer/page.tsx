import { Header } from "@/components/layout/header";
import { Phone, PhoneCall, PhoneMissed, Clock, Plus } from "lucide-react";

const callLog = [
  { contact: "Vivek Mehta",    company: "Apollo Hospitals",    time: "10:32 AM", duration: "8m 14s", type: "OUTBOUND",  outcome: "INTERESTED",   notes: "Requested proposal by Thursday" },
  { contact: "Sonia Kapoor",   company: "Fortis Healthcare",   time: "11:15 AM", duration: "4m 02s", type: "OUTBOUND",  outcome: "CALLBACK",     notes: "Call back on Monday 2pm" },
  { contact: "Unknown",        company: "Columbia Asia",       time: "2:45 PM",  duration: "—",      type: "INBOUND",   outcome: "MISSED",       notes: "" },
  { contact: "Rajiv Anand",    company: "Max Speciality",      time: "Yesterday", duration: "12m 30s", type: "OUTBOUND", outcome: "DEMO_BOOKED",  notes: "Demo on Jun 23 at 9AM" },
  { contact: "Purchase Dept",  company: "Manipal Hospitals",   time: "Yesterday", duration: "6m 55s", type: "INBOUND",   outcome: "RENEWAL_DISC", notes: "Wants 10% discount on renewal" },
];

const outcomeColors: Record<string, { text: string; bg: string }> = {
  INTERESTED:   { text: "#22c55e", bg: "rgba(34,197,94,0.1)" },
  DEMO_BOOKED:  { text: "#0d9488", bg: "rgba(13,148,136,0.1)" },
  CALLBACK:     { text: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  MISSED:       { text: "#fb7185", bg: "rgba(251,113,133,0.1)" },
  RENEWAL_DISC: { text: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
};

const quickDial = [
  { name: "Vivek Mehta",   phone: "+91-98765-43210", company: "Apollo" },
  { name: "Rajiv Anand",   phone: "+91-98234-56789", company: "Max Delhi" },
  { name: "Sonia Kapoor",  phone: "+91-97654-32100", company: "Fortis" },
  { name: "Purchase Dept", phone: "+91-80-2502-4444", company: "Manipal" },
];

export default function DialerPage() {
  return (
    <div>
      <Header title="Dialer" subtitle="Click-to-call with automatic logging" />

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick dial pad */}
          <div className="pulse-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Phone size={16} className="text-teal-400" />
              <h3 className="font-semibold text-white">Quick Dial</h3>
            </div>

            {/* Number input */}
            <div className="mb-4">
              <input type="tel" placeholder="+91 XXXXX XXXXX"
                className="w-full px-4 py-3 text-lg bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-teal-500 text-center font-mono tracking-widest" />
            </div>

            {/* Dial pad */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {["1","2","3","4","5","6","7","8","9","*","0","#"].map(d => (
                <button key={d} className="h-12 rounded-lg text-lg font-semibold text-white bg-slate-800 hover:bg-slate-700 active:bg-teal-600 transition-all">
                  {d}
                </button>
              ))}
            </div>

            <button className="w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
              <PhoneCall size={18} /> Call
            </button>

            {/* Quick contacts */}
            <div className="mt-5 pt-5 border-t border-slate-700/50">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Quick Contacts</p>
              <div className="space-y-2">
                {quickDial.map(q => (
                  <div key={q.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 transition-all cursor-pointer">
                    <div>
                      <p className="text-sm font-medium text-white">{q.name}</p>
                      <p className="text-xs text-slate-500">{q.company}</p>
                    </div>
                    <a href={`tel:${q.phone}`} className="p-2 rounded-lg text-teal-400 hover:bg-teal-400/10 transition-all">
                      <Phone size={14} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call log */}
          <div className="lg:col-span-2 pulse-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-blue-400" />
                <h3 className="font-semibold text-white">Call Log</h3>
              </div>
              <button className="flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 transition-all">
                <Plus size={12} /> Log Call
              </button>
            </div>

            <div className="space-y-2">
              {callLog.map((call, i) => {
                const oc = outcomeColors[call.outcome];
                return (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-all cursor-pointer">
                    <div className={`mt-0.5 p-2 rounded-lg shrink-0 ${
                      call.type === "INBOUND" && call.outcome === "MISSED"
                        ? "bg-rose-400/10 text-rose-400"
                        : call.type === "INBOUND"
                        ? "bg-blue-400/10 text-blue-400"
                        : "bg-teal-400/10 text-teal-400"
                    }`}>
                      {call.outcome === "MISSED" ? <PhoneMissed size={14} /> : <PhoneCall size={14} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-white">{call.contact}</p>
                        <span className="text-xs text-slate-500">·</span>
                        <p className="text-xs text-slate-400">{call.company}</p>
                      </div>
                      {call.notes && (
                        <p className="text-xs text-slate-400 mt-0.5">{call.notes}</p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-slate-500">{call.time}</p>
                      <p className="text-xs text-slate-600">{call.duration}</p>
                      <span className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ color: oc.text, background: oc.bg }}>
                        {call.outcome.replace("_", " ")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
