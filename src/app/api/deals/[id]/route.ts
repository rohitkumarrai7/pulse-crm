import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

const stageProbability: Record<string, number> = {
  NEW_LEAD: 10,
  QUALIFIED: 25,
  DEMO_SCHEDULED: 40,
  PROPOSAL_SENT: 55,
  NEGOTIATION: 75,
  CONTRACT_SIGNED: 100,
};

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await req.json();

    const opportunity = await prisma.opportunity.update({
      where: { id },
      data: {
        stage: body.stage,
        probability: body.probability ?? stageProbability[body.stage] ?? 10,
        isWon: body.stage === "CONTRACT_SIGNED",
      },
      include: { account: { select: { name: true } } },
    });

    return NextResponse.json({ opportunity });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
