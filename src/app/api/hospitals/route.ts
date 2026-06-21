import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const hospitals = await prisma.account.findMany({
      include: {
        contracts: {
          where: { status: { notIn: ["TERMINATED"] } },
          orderBy: { endDate: "asc" },
          take: 1,
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ hospitals });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
