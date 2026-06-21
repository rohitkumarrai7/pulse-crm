import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const radiologists = await prisma.radiologistProfile.findMany({
      include: {
        user: { select: { name: true, email: true } },
      },
      orderBy: { currentLoad: "desc" },
    });

    return NextResponse.json({ radiologists });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
