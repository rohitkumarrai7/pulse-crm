"use client";

import { useEffect, useState } from "react";
import { CheckSquare, Clock, AlertTriangle, Loader2 } from "lucide-react";

type Task = {
  id: string;
  title: string;
  priority: string;
  status: string;
  dueDate: string | null;
  assignee: { name: string | null } | null;
};

const priorityColor: Record<string, string> = {
  CRITICAL: "#fb7185", HIGH: "#f59e0b", MEDIUM: "#3b82f6", LOW: "#64748b",
};

function fmtDue(d: string | null): string {
  if (!d) return "No due date";
  const diff = Math.ceil((new Date(d).getTime() - Date.now()) / 86400000);
  if (diff < 0) return "Overdue";
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

export function TasksWidget() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tasks")
      .then((r) => r.json())
      .then((d) => { setTasks(d.tasks ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const pending = tasks.filter((t) => t.status !== "DONE").length;

  return (
    <div className="pulse-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <CheckSquare size={16} className="text-blue-400" />
        <h3 className="text-sm font-semibold text-white">Task List</h3>
        {pending > 0 && (
          <span className="ml-auto text-xs bg-rose-400/10 text-rose-400 px-2 py-0.5 rounded-full font-semibold">
            {pending} pending
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-6 text-slate-500">
          <Loader2 size={16} className="animate-spin" />
        </div>
      ) : (
        <div className="space-y-2">
          {tasks.map((t) => {
            const done = t.status === "DONE";
            return (
              <div key={t.id} className={`flex items-start gap-3 p-2.5 rounded-lg transition-all
                ${done ? "opacity-50" : "hover:bg-slate-800/50"}`}>
                <div className={`mt-0.5 w-4 h-4 rounded shrink-0 border-2 flex items-center justify-center
                  ${done ? "bg-teal-600 border-teal-600" : "border-slate-600"}`}>
                  {done && <span className="text-white text-[9px]">✓</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium ${done ? "line-through text-slate-500" : "text-slate-200"}`}>
                    {t.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock size={10} className="text-slate-500" />
                    <span className="text-xs text-slate-500">{fmtDue(t.dueDate)}</span>
                    {!done && (
                      <span className="text-xs font-semibold" style={{ color: priorityColor[t.priority] ?? "#64748b" }}>
                        {t.priority === "CRITICAL" && <AlertTriangle size={9} className="inline mr-0.5" />}
                        {t.priority}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {tasks.length === 0 && (
            <p className="text-xs text-slate-500 text-center py-4">No pending tasks.</p>
          )}
        </div>
      )}
    </div>
  );
}
