import { CheckSquare, Clock, AlertTriangle } from "lucide-react";

const tasks = [
  { title: "Call Apollo Hospitals re: contract renewal", due: "Today", priority: "URGENT", done: false },
  { title: "Send proposal to Max Speciality Delhi",      due: "Today", priority: "HIGH",   done: false },
  { title: "Demo scheduled with Fortis Mumbai",          due: "Tomorrow", priority: "HIGH", done: false },
  { title: "Investigate Aster CMI churn risk",           due: "Tomorrow", priority: "MEDIUM", done: false },
  { title: "Q2 invoice — Narayana Health",               due: "Jun 25",   priority: "MEDIUM", done: true },
];

const priorityColor: Record<string, string> = {
  URGENT: "#fb7185", HIGH: "#f59e0b", MEDIUM: "#3b82f6", LOW: "#64748b",
};

export function TasksWidget() {
  return (
    <div className="pulse-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <CheckSquare size={16} className="text-blue-400" />
        <h3 className="text-sm font-semibold text-white">Task List</h3>
        <span className="ml-auto text-xs bg-rose-400/10 text-rose-400 px-2 py-0.5 rounded-full font-semibold">
          4 pending
        </span>
      </div>

      <div className="space-y-2">
        {tasks.map((t, i) => (
          <div key={i} className={`flex items-start gap-3 p-2.5 rounded-lg transition-all
            ${t.done ? "opacity-50" : "hover:bg-slate-800/50"}`}>
            <div className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center
              ${t.done ? "bg-teal-600 border-teal-600" : "border-slate-600"}`}>
              {t.done && <span className="text-white text-[9px]">✓</span>}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-medium ${t.done ? "line-through text-slate-500" : "text-slate-200"}`}>
                {t.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Clock size={10} className="text-slate-500" />
                <span className="text-xs text-slate-500">{t.due}</span>
                {!t.done && (
                  <span className="text-xs font-semibold" style={{ color: priorityColor[t.priority] }}>
                    {t.priority === "URGENT" && <AlertTriangle size={9} className="inline mr-0.5" />}
                    {t.priority}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
