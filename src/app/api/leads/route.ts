import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const leads = await prisma.lead.findMany({
      include: {
        owner: { select: { name: true } },
        account: { select: { name: true } },
      },
      orderBy: { intentScore: "desc" },
    });

    return NextResponse.json({ leads });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
