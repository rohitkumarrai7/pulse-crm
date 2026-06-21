import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const opportunities = await prisma.opportunity.findMany({
      include: {
        account: { select: { name: true } },
      },
      where: { isLost: false },
      orderBy: { value: "desc" },
    });

    return NextResponse.json({ opportunities });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
