import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { scoreLeadIntent } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const leadData = await req.json();
  const score = await scoreLeadIntent(leadData);
  return NextResponse.json({ score });
}
