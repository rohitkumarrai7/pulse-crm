import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const invoices = await prisma.invoice.findMany({
      include: {
        account: { select: { name: true } },
      },
      orderBy: { invoiceDate: "desc" },
    });

    return NextResponse.json({ invoices });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
