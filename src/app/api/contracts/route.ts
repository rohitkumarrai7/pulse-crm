import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const contracts = await prisma.contract.findMany({
      include: {
        account: { select: { name: true } },
        slaPolicy: { select: { tier: true, name: true } },
      },
      where: { status: { not: "TERMINATED" } },
      orderBy: { endDate: "asc" },
    });

    return NextResponse.json({ contracts });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
