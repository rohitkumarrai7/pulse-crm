import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { sendEmail, slaBreachEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { to, hospitalName, studyId, urgency } = await req.json();

  if (!to || !hospitalName || !studyId || !urgency) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { subject, html } = slaBreachEmail(hospitalName, studyId, urgency);
  await sendEmail({ to, subject, html });

  return NextResponse.json({ success: true });
}
