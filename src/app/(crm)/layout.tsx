import { SidebarProvider } from "@/lib/sidebar-context";
import { CrmShell } from "@/components/layout/crm-shell";

export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <CrmShell>{children}</CrmShell>
    </SidebarProvider>
  );
}
