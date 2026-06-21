import { Sidebar } from "@/components/layout/sidebar";

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Sidebar />
      <main
        className="flex-1 overflow-auto"
        style={{ marginLeft: "var(--sidebar-width, 260px)" }}
      >
        {children}
      </main>
    </div>
  );
}
