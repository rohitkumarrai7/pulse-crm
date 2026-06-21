import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tasks = await prisma.task.findMany({
      include: {
        assignee: { select: { name: true } },
      },
      where: { status: { notIn: ["DONE", "CANCELLED"] } },
      orderBy: [{ priority: "asc" }, { dueDate: "asc" }],
      take: 10,
    });

    return NextResponse.json({ tasks });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
