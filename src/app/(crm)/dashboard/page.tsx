import { currentUser } from "@clerk/nextjs/server";
import { Header } from "@/components/layout/header";
import { StatsWidget } from "./_components/widgets/stats-widget";
import { HotLeadsWidget } from "./_components/widgets/hot-leads-widget";
import { SlaWidget } from "./_components/widgets/sla-widget";
import { RadiologistLoadWidget } from "./_components/widgets/radiologist-load-widget";
import { ContractRenewalWidget } from "./_components/widgets/contract-renewal-widget";
import { RevenueWidget } from "./_components/widgets/revenue-widget";
import { TasksWidget } from "./_components/widgets/tasks-widget";
import { PulseInsightsWidget } from "./_components/widgets/pulse-insights-widget";

export default async function DashboardPage() {
  const user = await currentUser();
  const firstName = user?.firstName ?? user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] ?? "there";

  return (
    <div>
      <Header
        title="Dashboard"
        subtitle={`Welcome back, ${firstName} — here's your intelligence brief for today`}
      />

      <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
        <StatsWidget />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <RevenueWidget />
            <HotLeadsWidget />
            <RadiologistLoadWidget />
          </div>
          <div className="space-y-6">
            <SlaWidget />
            <ContractRenewalWidget />
            <TasksWidget />
          </div>
        </div>

        <PulseInsightsWidget />
      </div>
    </div>
  );
}
