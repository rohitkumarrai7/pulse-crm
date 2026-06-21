# PulseCRM by CEO.Agency

**Intelligence-Driven Healthcare CRM for Radivue Solutions**

A complete, production-grade CRM system purpose-built for teleradiology businesses. Zero traces of BasaltCRM — fresh brand, fresh stack, healthcare-first design.

---

## Brand Identity

| Element | Value |
|---------|-------|
| Product | **PulseCRM** by CEO.Agency |
| Tagline | Intelligence-Driven Healthcare CRM |
| Primary | Deep Teal `#0D9488` + Electric Blue `#3B82F6` |
| Alert CTA | Warm Amber `#F59E0B` |
| Dark BG | Deep Navy `#0F172A` |
| Urgent | Soft Coral `#FB7185` |
| Contact | sp@ceo.agency |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL via **Neon DB** |
| ORM | Prisma 6 |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| Icons | Lucide React |
| Auth | JWT (jose) via httpOnly cookies |
| Email | Resend (optional) |
| Hosting | Vercel (recommended) |

---

## Project Structure

```
pulse-crm/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/           # Login page
│   │   ├── (crm)/               # Protected CRM layout
│   │   │   ├── layout.tsx       # Sidebar layout
│   │   │   ├── dashboard/       # Command center with all widgets
│   │   │   ├── hospitals/       # Hospital accounts (10 sample)
│   │   │   ├── leads/           # Hot leads + intent scoring
│   │   │   ├── deals/           # Kanban deal pipeline
│   │   │   ├── studies/         # Real-time radiology study tracking
│   │   │   ├── radiologists/    # Workload + burnout monitoring
│   │   │   ├── contracts/       # Contract lifecycle management
│   │   │   ├── invoices/        # GST invoicing + Tally sync
│   │   │   ├── reports/         # Revenue, churn & SLA analytics
│   │   │   └── workflows/       # Automation rules
│   │   └── api/
│   │       └── auth/            # Login, logout, me endpoints
│   ├── components/
│   │   ├── logo.tsx             # PulseCRM SVG logo
│   │   └── layout/
│   │       ├── sidebar.tsx      # Navigation sidebar
│   │       └── header.tsx       # Top bar with search & SLA indicator
│   └── lib/
│       ├── prisma.ts            # Prisma client singleton
│       └── utils.ts             # Currency, date, SLA, intent helpers
├── prisma/
│   ├── schema.prisma            # 12+ PostgreSQL models
│   └── seeds/seed.ts            # Full demo data (hospitals, studies, etc.)
└── public/
    └── favicon.svg              # Pulse logo favicon
```

---

## Quick Start

### 1. Install dependencies

```bash
cd pulse-crm
npm install
```

### 2. Configure environment

```bash
cp .env.local.example .env.local
# Fill in your Neon DB credentials
```

The Neon DB connection string is already pre-configured for this project.

### 3. Push database schema

```bash
npm run db:push
```

### 4. Seed demo data

```bash
npm run db:seed
```

### 5. Start development server

```bash
npm run dev
# → http://localhost:3002
```

---

## Demo Credentials

| Role | Email | Password |
|------|-------|---------|
| Admin (Mohit) | mohit@radivuesolutions.com | demo1234 |
| Sales Rep | sales@radivuesolutions.com | demo1234 |

---

## Database Models

| Model | Description |
|-------|-------------|
| `User` | Staff, radiologists, sales team |
| `Account` | Hospitals & diagnostic centers |
| `Contact` | Referring doctors |
| `Lead` | Prospects with intent scoring |
| `Opportunity` | Deals in pipeline |
| `Study` | Radiology cases with SLA tracking |
| `RadiologistProfile` | Workload, accuracy, burnout |
| `SlaPolicy` | Gold/Silver/Bronze SLA definitions |
| `Contract` | RETAINER/PAY_PER_STUDY/HYBRID |
| `Invoice` | GST invoicing (CGST+SGST / IGST) |
| `Task` | Follow-ups, calls, renewals |
| `Activity` | Audit trail for leads |
| `Workflow` | Automation rules |

---

## CRM Modules

### Dashboard
- Hospital stats, study volume, SLA compliance
- Revenue vs target chart (Recharts)
- Hot leads pipeline with intent scores
- Radiologist workload distribution
- Contract renewal countdown
- Pulse Insights AI predictions
- Task list with priority

### Hospitals (Accounts)
- 10 sample hospitals (Bangalore, Mumbai, Delhi)
- NABH/NABL accreditation badges
- Intent score bars for prospects
- Contract status & days remaining
- SLA tier color coding

### Hot Leads
- Pulse Intent Engine scoring (0–100)
- HOT/WARM/COLD/DEAD classification
- Source tracking (Web, Referral, Cold, Conference)
- Last activity timeline

### Deals (Pipeline)
- Kanban board with 6 stages
- Deal value in Lakhs per year
- Stage-specific probability %

### Studies
- Real-time study tracking
- SLA countdown timers (Emergency 30m / Urgent 2h / Routine 8h)
- Color-coded breach detection
- Modality tags (MRI, CT, PET, X-Ray, Cardiac)
- Radiologist assignment status

### Radiologists
- Availability status (Available/Busy/Offline/On Leave)
- Daily load progress bars
- Avg turnaround time & accuracy rate
- Burnout risk flag (High = red alert)

### Contracts
- RETAINER / PAY_PER_STUDY / HYBRID types
- Auto-renewal vs manual renewal tracking
- Days until expiry countdown
- SLA tier association
- Modalities covered

### Invoices
- Indian GST: CGST+SGST (intra-state) or IGST (inter-state)
- Tally sync status
- Line items with study modality breakdown
- Payment tracking (NEFT/UPI/Cheque)

### Reports
- YTD revenue, deal size, churn rate, NPS
- Revenue area chart vs target
- Studies by modality bar chart
- Churn risk heat map

### Workflows
- Trigger-based automation rules
- 4 active workflows pre-configured:
  1. Emergency study → Dr. Sneha (auto-assign)
  2. SLA 80% → Ops alert
  3. Contract 90d → Renewal sequence
  4. Intent ≥80 → Senior sales assignment

---

## Themes

| Theme | Description |
|-------|-------------|
| Healthcare Pro | Deep navy + teal (default) |
| Clinical Light | White + teal (daytime) |
| Focus Dark | Pure black + blue (night) |

Switch via `data-theme` attribute on `<html>`.

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set environment variables in Vercel dashboard:
# DATABASE_URL, DIRECT_URL, NEXTAUTH_SECRET, NEXTAUTH_URL
```

---

## Development Notes

- `npm run db:push` — sync schema without migrations (development)
- `npm run db:migrate` — create migration files (production)
- `npm run db:studio` — Prisma Studio GUI at localhost:5555
- `npm run db:seed` — populate demo data

---

## Contact

**CEO.Agency**  
Website: https://ceo.agency  
Email: sp@ceo.agency  
Product: PulseCRM — Intelligence-Driven Healthcare CRM

---

*Built for Radivue Solutions (Mohit Suchdeva) — Teleradiology Revenue Intelligence*
