import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  const from = process.env.EMAIL_FROM ?? "PulseCRM <noreply@pulse.ceo.agency>";
  const result = await transporter.sendMail({ from, to, subject, html, text: text ?? "" });
  return result;
}

// ─── Template helpers ────────────────────────────────────────────────────────

export function slaBreachEmail(hospitalName: string, studyId: string, urgency: string) {
  return {
    subject: `🚨 SLA Breach — ${urgency} Study ${studyId} at ${hospitalName}`,
    html: `
      <div style="font-family:Inter,sans-serif;background:#0f172a;color:#f8fafc;padding:32px;border-radius:12px;max-width:600px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px">
          <div style="width:40px;height:40px;background:linear-gradient(135deg,#0d9488,#3b82f6);border-radius:8px;display:flex;align-items:center;justify-content:center">
            <span style="color:white;font-weight:bold;font-size:16px">P</span>
          </div>
          <span style="font-size:20px;font-weight:700;background:linear-gradient(135deg,#0d9488,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent">PulseCRM</span>
        </div>
        <div style="background:#fb7185;color:white;padding:12px 16px;border-radius:8px;margin-bottom:24px;font-weight:600">
          ⚠️ SLA BREACH DETECTED
        </div>
        <h2 style="color:#f8fafc;margin:0 0 16px">Study SLA Breached</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#94a3b8;width:140px">Hospital</td><td style="color:#f8fafc;font-weight:600">${hospitalName}</td></tr>
          <tr><td style="padding:8px 0;color:#94a3b8">Study ID</td><td style="color:#f8fafc;font-family:monospace">${studyId}</td></tr>
          <tr><td style="padding:8px 0;color:#94a3b8">Urgency</td><td style="color:#fb7185;font-weight:700">${urgency}</td></tr>
        </table>
        <div style="margin-top:24px">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/studies" style="display:inline-block;background:linear-gradient(135deg,#0d9488,#3b82f6);color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
            View Study →
          </a>
        </div>
        <p style="margin-top:24px;color:#475569;font-size:12px">PulseCRM by CEO.Agency · sp@ceo.agency</p>
      </div>
    `,
  };
}

export function contractRenewalEmail(hospitalName: string, daysLeft: number, contractValue: number) {
  const urgentColor = daysLeft <= 30 ? "#fb7185" : "#f59e0b";
  return {
    subject: `📋 Contract Renewal — ${hospitalName} expires in ${daysLeft} days`,
    html: `
      <div style="font-family:Inter,sans-serif;background:#0f172a;color:#f8fafc;padding:32px;border-radius:12px;max-width:600px">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px">
          <span style="font-size:20px;font-weight:700;color:#0d9488">PulseCRM</span>
        </div>
        <div style="background:${urgentColor}22;border:1px solid ${urgentColor}44;padding:12px 16px;border-radius:8px;margin-bottom:24px;color:${urgentColor};font-weight:600">
          ⏰ Contract Renewal Required in ${daysLeft} days
        </div>
        <h2 style="color:#f8fafc;margin:0 0 16px">${hospitalName}</h2>
        <p style="color:#94a3b8">Monthly contract value: <strong style="color:#f8fafc">₹${(contractValue / 100000).toFixed(1)}L</strong></p>
        <div style="margin-top:24px">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/contracts" style="display:inline-block;background:linear-gradient(135deg,#0d9488,#3b82f6);color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
            Manage Contract →
          </a>
        </div>
        <p style="margin-top:24px;color:#475569;font-size:12px">PulseCRM by CEO.Agency · sp@ceo.agency</p>
      </div>
    `,
  };
}
