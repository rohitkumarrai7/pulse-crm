import { Header } from "@/components/layout/header";
import { Calendar, Clock, MapPin, Video, Phone, Plus } from "lucide-react";

const events = [
  { time: "09:00", title: "Demo — Apollo Hospitals",     type: "DEMO",    duration: "60 min", with: "Vivek Mehta, GM Operations",  location: "Google Meet",   color: "#3b82f6" },
  { time: "11:30", title: "Call — Fortis Mumbai",        type: "CALL",    duration: "30 min", with: "Sonia Kapoor, Purchase Head", location: "Phone",         color: "#0d9488" },
  { time: "14:00", title: "Renewal Talk — Manipal",      type: "MEETING", duration: "45 min", with: "Procurement Team",            location: "Zoom",          color: "#f59e0b" },
  { time: "16:30", title: "Follow-up — HCG Cancer",      type: "CALL",    duration: "20 min", with: "Dr. Ananya Reddy",            location: "Phone",         color: "#0d9488" },
];

const upcoming = [
  { date: "Jun 23", title: "Proposal Presentation — Max Delhi",   type: "DEMO",    with: "CEO + CTO" },
  { date: "Jun 25", title: "Quarterly Review — Narayana Health",  type: "MEETING", with: "Account Team" },
  { date: "Jun 27", title: "Cold Call Blitz — North India",       type: "CALL",    with: "Sales Team" },
  { date: "Jul 01", title: "Contract Sign — Apollo (pending)",    type: "MEETING", with: "Legal + Sales" },
];

const typeIcon: Record<string, React.ReactNode> = {
  DEMO:    <Video size={12} />,
  CALL:    <Phone size={12} />,
  MEETING: <MapPin size={12} />,
};

const typeColor: Record<string, { text: string; bg: string }> = {
  DEMO:    { text: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
  CALL:    { text: "#0d9488", bg: "rgba(13,148,136,0.1)" },
  MEETING: { text: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
};

export default function CalendarPage() {
  return (
    <div>
      <Header title="Calendar" subtitle="Today's schedule — June 21, 2026" />

      <div className="p-3 sm:p-6">
        <div className="flex items-center justify-end mb-6">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white font-medium"
            style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
            <Plus size={14} /> New Event
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's timeline */}
          <div className="lg:col-span-2 pulse-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <Calendar size={16} className="text-teal-400" />
              <h3 className="font-semibold text-white">Today — June 21</h3>
            </div>

            <div className="space-y-3">
              {events.map((e, i) => {
                const tc = typeColor[e.type];
                return (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border hover:border-slate-600 transition-all cursor-pointer"
                    style={{ background: `${e.color}08`, borderColor: `${e.color}20` }}>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-white font-mono">{e.time}</p>
                      <p className="text-xs text-slate-500">{e.duration}</p>
                    </div>
                    <div className="w-0.5 bg-slate-700 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ color: tc.text, background: tc.bg }}>
                          {typeIcon[e.type]} {e.type}
                        </span>
                      </div>
                      <p className="font-semibold text-white">{e.title}</p>
                      <p className="text-xs text-slate-400 mt-0.5">with {e.with}</p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                        {e.location === "Phone" ? <Phone size={10} /> : <Video size={10} />}
                        {e.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button className="px-3 py-1.5 text-xs rounded-lg font-medium text-teal-400 bg-teal-400/10 hover:bg-teal-400/20 transition-all">
                        Join
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming */}
          <div className="pulse-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-blue-400" />
              <h3 className="font-semibold text-white">Upcoming</h3>
            </div>

            <div className="space-y-3">
              {upcoming.map((u, i) => {
                const tc = typeColor[u.type];
                return (
                  <div key={i} className="p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-500 font-mono">{u.date}</span>
                      <span className="flex items-center gap-1 text-xs font-semibold px-1.5 py-0.5 rounded"
                        style={{ color: tc.text, background: tc.bg }}>
                        {u.type}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-white">{u.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">with {u.with}</p>
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
