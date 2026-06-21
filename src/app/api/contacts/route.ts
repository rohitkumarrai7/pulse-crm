import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const contacts = await prisma.contact.findMany({
      include: {
        account: { select: { name: true } },
      },
      where: { isActive: true },
      orderBy: { referralVolume: "desc" },
    });

    return NextResponse.json({ contacts });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
