const OPENROUTER_URL = process.env.LLM_API_URL ?? "https://openrouter.ai/api/v1/chat/completions";
const MODEL = process.env.LLM_MODEL ?? "openai/gpt-4o-mini";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function callAI(messages: Message[], options?: { model?: string; maxTokens?: number }) {
  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3002",
      "X-Title": "PulseCRM",
    },
    body: JSON.stringify({
      model: options?.model ?? MODEL,
      messages,
      max_tokens: options?.maxTokens ?? 1024,
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`AI API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content as string;
}

// ─── Domain-specific helpers ──────────────────────────────────────────────────

export interface InsightInput {
  hospitals: Array<{ name: string; churnRisk?: number; intentScore?: number; slaTier?: string }>;
  slaBreaches: number;
  pendingRenewals: number;
  hotLeads: number;
}

export async function generateInsights(input: InsightInput): Promise<string[]> {
  const systemPrompt = `You are Pulse, an AI intelligence engine for a teleradiology CRM.
Analyze the provided metrics and return exactly 4 concise, actionable insights as a JSON array of strings.
Each insight must be under 100 characters. Focus on: churn risk, revenue opportunity, SLA performance, lead conversion.
Return ONLY a valid JSON array, no markdown.`;

  const userPrompt = `Metrics:
- SLA breaches this month: ${input.slaBreaches}
- Pending contract renewals: ${input.pendingRenewals}
- Hot leads (score ≥80): ${input.hotLeads}
- Hospitals: ${JSON.stringify(input.hospitals.slice(0, 5))}`;

  try {
    const raw = await callAI([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ], { maxTokens: 512 });

    const parsed = JSON.parse(raw.trim());
    if (Array.isArray(parsed)) return parsed.slice(0, 4);
    return fallbackInsights(input);
  } catch {
    return fallbackInsights(input);
  }
}

function fallbackInsights(input: InsightInput): string[] {
  return [
    input.hotLeads > 0
      ? `${input.hotLeads} hot lead${input.hotLeads > 1 ? "s" : ""} ready for immediate follow-up`
      : "No hot leads — review your outreach strategy",
    input.slaBreaches > 0
      ? `${input.slaBreaches} SLA breach${input.slaBreaches > 1 ? "es" : ""} this month — review radiologist workload`
      : "SLA compliance on track — keep monitoring",
    input.pendingRenewals > 0
      ? `${input.pendingRenewals} contract${input.pendingRenewals > 1 ? "s" : ""} up for renewal — initiate negotiation`
      : "All contracts stable — focus on upsell",
    "Run churn risk analysis on Bronze SLA accounts",
  ];
}

export async function scoreLeadIntent(leadData: {
  company: string;
  visitCount?: number;
  lastActivity?: string;
  currentVendor?: string;
  contractExpiry?: string;
}): Promise<number> {
  const systemPrompt = `You are a B2B lead scoring expert for a teleradiology CRM.
Score the lead from 0-100 based on buying intent signals. Return ONLY a number between 0 and 100.`;

  const userPrompt = `Lead: ${JSON.stringify(leadData)}`;

  try {
    const raw = await callAI([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ], { model: process.env.TAILOR_LLM_MODEL ?? MODEL, maxTokens: 10 });

    const score = parseInt(raw.trim(), 10);
    if (score >= 0 && score <= 100) return score;
    return 50;
  } catch {
    return 50;
  }
}
