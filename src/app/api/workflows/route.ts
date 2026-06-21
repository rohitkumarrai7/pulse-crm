import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const workflows = await prisma.workflow.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ workflows });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
