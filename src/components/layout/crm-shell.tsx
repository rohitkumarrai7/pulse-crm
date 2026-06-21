"use client";
import { useSidebar } from "@/lib/sidebar-context";
import { Sidebar } from "./sidebar";

export function CrmShell({ children }: { children: React.ReactNode }) {
  const { open, close } = useSidebar();
  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Sidebar />
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={close}
        />
      )}
      <main className="flex-1 overflow-auto min-w-0 lg:ml-[260px]">
        {children}
      </main>
    </div>
  );
}
