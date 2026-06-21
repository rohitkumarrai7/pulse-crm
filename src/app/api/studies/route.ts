import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const studies = await prisma.study.findMany({
      include: {
        hospital: { select: { name: true } },
        radiologist: { select: { name: true } },
      },
      orderBy: { receivedAt: "asc" },
    });

    const urgencyOrder: Record<string, number> = { EMERGENCY: 0, URGENT: 1, ROUTINE: 2 };
    studies.sort(
      (a, b) =>
        (urgencyOrder[a.urgency] ?? 3) - (urgencyOrder[b.urgency] ?? 3) ||
        new Date(a.receivedAt).getTime() - new Date(b.receivedAt).getTime()
    );

    return NextResponse.json({ studies });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
