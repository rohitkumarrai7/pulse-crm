import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { generateInsights } from "@/lib/ai";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const insights = await generateInsights({
    hospitals: [
      { name: "Aster CMI Hospital", churnRisk: 72, slaTier: "BRONZE" },
      { name: "Narayana Health", intentScore: undefined, slaTier: "GOLD" },
      { name: "Apollo Hospitals", intentScore: 92 },
    ],
    slaBreaches: 6,
    pendingRenewals: 2,
    hotLeads: 2,
  });

  return NextResponse.json({ insights });
}
