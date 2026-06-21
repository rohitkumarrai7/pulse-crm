import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const { isActive } = await req.json();

    const workflow = await prisma.workflow.update({
      where: { id },
      data: { isActive },
    });

    return NextResponse.json({ workflow });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
