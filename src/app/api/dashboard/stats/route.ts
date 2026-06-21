import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [activeHospitals, monthlyStudies, slaBreaches, pendingStudies, hotLeads] =
      await Promise.all([
        prisma.account.count({ where: { status: "ACTIVE" } }),
        prisma.study.count({ where: { receivedAt: { gte: startOfMonth } } }),
        prisma.study.count({ where: { slaBreach: true, receivedAt: { gte: startOfMonth } } }),
        prisma.study.count({ where: { status: { notIn: ["COMPLETED", "REPORTED"] } } }),
        prisma.lead.count({ where: { temperature: { in: ["HOT", "WARM"] } } }),
      ]);

    const slaCompliance =
      monthlyStudies > 0
        ? (((monthlyStudies - slaBreaches) / monthlyStudies) * 100).toFixed(1)
        : "100.0";

    return NextResponse.json({
      activeHospitals,
      monthlyStudies,
      slaCompliance: `${slaCompliance}%`,
      slaBreaches,
      pendingStudies,
      hotLeads,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
