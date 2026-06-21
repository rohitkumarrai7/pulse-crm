import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import {
  Activity, BarChart3, Brain, Building2, CheckCircle, ChevronRight,
  ClipboardList, FileText, Flame, GitBranch, Globe, Heart, Lock,
  Phone, Receipt, Shield, Star, TrendingUp, UserCheck, Users, Zap,
} from "lucide-react";

export default async function RootPage() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <div className="min-h-screen" style={{ background: "#060d1f", color: "#f8fafc" }}>

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background: "rgba(6,13,31,0.85)", backdropFilter: "blur(20px)", borderColor: "rgba(148,163,184,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
                <Activity size={16} className="text-white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-rose-400 border-2"
                style={{ borderColor: "#060d1f", animation: "pulse 2s ease-in-out infinite" }} />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">Pulse<span style={{
              background: "linear-gradient(135deg, #0d9488, #3b82f6)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>CRM</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2">
              Sign in
            </Link>
            <Link href="/sign-up" className="text-sm font-semibold text-white px-5 py-2.5 rounded-xl transition-all hover:opacity-90 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #0d9488, transparent)" }} />
        <div className="absolute top-40 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(13,148,136,0.3), transparent)" }} />

        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 border"
            style={{ background: "rgba(13,148,136,0.08)", borderColor: "rgba(13,148,136,0.25)", color: "#2dd4bf" }}>
            <Zap size={12} />
            Built for Teleradiology Networks
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6">
            Revenue Intelligence<br />
            <span style={{
              background: "linear-gradient(135deg, #0d9488 0%, #3b82f6 50%, #8b5cf6 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
            }}>for Healthcare</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            PulseCRM gives teleradiology companies a single command center — track hospitals, score leads,
            manage SLA compliance, and close deals faster with AI-powered insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/sign-up"
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl"
              style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)", boxShadow: "0 0 40px rgba(13,148,136,0.3)" }}>
              Start Free Trial
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/sign-in"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white transition-all">
              View Demo
            </Link>
          </div>

          {/* Dashboard Preview */}
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute -inset-4 rounded-3xl opacity-30 blur-xl"
              style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }} />
            <div className="relative rounded-2xl overflow-hidden border"
              style={{ background: "#0f172a", borderColor: "rgba(148,163,184,0.12)", boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}>
              {/* Fake browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "rgba(148,163,184,0.08)", background: "#1e293b" }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                  <div className="w-3 h-3 rounded-full bg-green-400/70" />
                </div>
                <div className="flex-1 mx-4 px-4 py-1 rounded-md text-xs text-slate-500 text-left"
                  style={{ background: "#0f172a" }}>pulse-crm.vercel.app/dashboard</div>
              </div>

              {/* Mock dashboard */}
              <div className="flex" style={{ height: "420px" }}>
                {/* Sidebar mock */}
                <div className="w-52 shrink-0 border-r p-4 space-y-1 hidden sm:block" style={{ borderColor: "rgba(148,163,184,0.08)" }}>
                  <div className="flex items-center gap-2 mb-6 px-2">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center">
                      <Activity size={12} className="text-white" />
                    </div>
                    <span className="text-sm font-bold text-white">PulseCRM</span>
                  </div>
                  {[
                    { icon: BarChart3, label: "Dashboard", active: true },
                    { icon: Building2, label: "Hospitals" },
                    { icon: Flame, label: "Hot Leads" },
                    { icon: ClipboardList, label: "Studies" },
                    { icon: FileText, label: "Contracts" },
                    { icon: Receipt, label: "Invoices" },
                  ].map(({ icon: Icon, label, active }) => (
                    <div key={label} className="flex items-center gap-2 px-2 py-2 rounded-lg text-xs transition-all"
                      style={active
                        ? { background: "linear-gradient(135deg,rgba(13,148,136,0.2),rgba(59,130,246,0.15))", color: "#2dd4bf" }
                        : { color: "#64748b" }}>
                      <Icon size={12} />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>

                {/* Main content mock */}
                <div className="flex-1 p-5 overflow-hidden">
                  {/* Stats row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                    {[
                      { label: "Hospitals", value: "48", color: "#0d9488", change: "+3" },
                      { label: "Hot Leads", value: "12", color: "#fb7185", change: "+5" },
                      { label: "Revenue",   value: "₹84L", color: "#3b82f6", change: "+18%" },
                      { label: "SLA",       value: "96.2%", color: "#22c55e", change: "↑" },
                    ].map(s => (
                      <div key={s.label} className="p-3 rounded-xl border" style={{ background: "#1e293b", borderColor: "rgba(148,163,184,0.08)" }}>
                        <p className="text-xs text-slate-500 mb-1">{s.label}</p>
                        <p className="text-xl font-bold text-white">{s.value}</p>
                        <p className="text-xs font-semibold mt-0.5" style={{ color: s.color }}>{s.change}</p>
                      </div>
                    ))}
                  </div>

                  {/* Chart mock */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2 p-4 rounded-xl border" style={{ background: "#1e293b", borderColor: "rgba(148,163,184,0.08)" }}>
                      <p className="text-xs font-semibold text-slate-300 mb-3">Revenue Pipeline</p>
                      <div className="flex items-end gap-1.5 h-20">
                        {[40, 65, 55, 80, 70, 90, 75, 95, 85, 100, 88, 110].map((h, i) => (
                          <div key={i} className="flex-1 rounded-t-sm" style={{
                            height: `${h}%`,
                            background: i === 11
                              ? "linear-gradient(to top, #0d9488, #3b82f6)"
                              : "rgba(13,148,136,0.25)"
                          }} />
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[
                        { label: "Apollo Delhi", score: 94, color: "#0d9488" },
                        { label: "Fortis Mumbai", score: 87, color: "#3b82f6" },
                        { label: "Max Hospitals", score: 76, color: "#8b5cf6" },
                      ].map(h => (
                        <div key={h.label} className="p-2.5 rounded-lg border" style={{ background: "#1e293b", borderColor: "rgba(148,163,184,0.08)" }}>
                          <p className="text-xs text-slate-300 font-medium truncate">{h.label}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 h-1 rounded-full bg-slate-700">
                              <div className="h-1 rounded-full" style={{ width: `${h.score}%`, background: h.color }} />
                            </div>
                            <span className="text-xs font-bold" style={{ color: h.color }}>{h.score}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ──────────────────────────────────────────────────────── */}
      <section className="py-14 border-y" style={{ borderColor: "rgba(148,163,184,0.06)", background: "rgba(13,148,136,0.03)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "200+", label: "Hospitals Managed", icon: Building2, color: "#0d9488" },
              { value: "₹50Cr+", label: "Pipeline Tracked", icon: TrendingUp, color: "#3b82f6" },
              { value: "99.2%", label: "SLA Compliance", icon: CheckCircle, color: "#22c55e" },
              { value: "40%", label: "Faster Deal Closure", icon: Zap, color: "#f59e0b" },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-1"
                  style={{ background: `${s.color}15` }}>
                  <s.icon size={18} style={{ color: s.color }} />
                </div>
                <p className="text-3xl font-black text-white">{s.value}</p>
                <p className="text-sm text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border"
              style={{ background: "rgba(59,130,246,0.08)", borderColor: "rgba(59,130,246,0.2)", color: "#60a5fa" }}>
              <Star size={11} /> Everything you need
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
              Built for the way<br />
              <span style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                healthcare sales works
              </span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg">
              Every module is crafted for teleradiology — from hospital onboarding to SLA breach alerts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain, color: "#8b5cf6", gradient: "rgba(139,92,246,0.12)",
                title: "AI Intent Scoring",
                desc: "Real-time lead temperature (HOT / WARM / COLD) powered by behavioral signals, call outcomes, and contract history.",
              },
              {
                icon: Activity, color: "#fb7185", gradient: "rgba(251,113,133,0.12)",
                title: "SLA Command Center",
                desc: "Live countdown timers per study. EMERGENCY → URGENT → ROUTINE prioritization with automatic breach alerts.",
              },
              {
                icon: TrendingUp, color: "#0d9488", gradient: "rgba(13,148,136,0.12)",
                title: "Revenue Pipeline",
                desc: "Kanban-style deal board with stage tracking, INR pipeline value, and projected monthly close rates.",
              },
              {
                icon: Building2, color: "#3b82f6", gradient: "rgba(59,130,246,0.12)",
                title: "Hospital Intelligence",
                desc: "Track churn risk, contract value, onboarding status, and 360° relationship health for every account.",
              },
              {
                icon: GitBranch, color: "#22c55e", gradient: "rgba(34,197,94,0.12)",
                title: "Smart Workflows",
                desc: "Automate SLA alerts, renewal emails, and onboarding sequences. Trigger on events, not schedules.",
              },
              {
                icon: BarChart3, color: "#f59e0b", gradient: "rgba(245,158,11,0.12)",
                title: "Revenue Reports",
                desc: "CGST/SGST/IGST invoicing, modality revenue breakdown, radiologist utilization, and churn forecasting.",
              },
            ].map(f => (
              <div key={f.title}
                className="group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1"
                style={{ background: f.gradient, borderColor: `${f.color}20` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${f.color}20` }}>
                  <f.icon size={20} style={{ color: f.color }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ───────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-6 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, transparent, rgba(13,148,136,0.04), transparent)" }} />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border"
              style={{ background: "rgba(13,148,136,0.08)", borderColor: "rgba(13,148,136,0.25)", color: "#2dd4bf" }}>
              <Zap size={11} /> Simple onboarding
            </div>
            <h2 className="text-4xl font-black tracking-tight text-white mb-4">Up and running in minutes</h2>
            <p className="text-slate-400 text-lg">No IT team required. Connect your data and start closing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px"
              style={{ background: "linear-gradient(90deg, #0d9488, #3b82f6, #8b5cf6)" }} />

            {[
              { step: "01", icon: Globe, color: "#0d9488", title: "Connect Your Stack", desc: "Link your Neon DB, configure Clerk auth, and set up SMTP in under 5 minutes with our guided setup wizard." },
              { step: "02", icon: Users, color: "#3b82f6", title: "Import & Score Leads", desc: "Import hospital contacts via CSV or API. Our AI engine immediately scores intent and segments your pipeline." },
              { step: "03", icon: TrendingUp, color: "#8b5cf6", title: "Close & Automate", desc: "Activate workflow automations, set SLA rules, and let PulseCRM run your renewals on autopilot." },
            ].map(s => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-5 border-2"
                  style={{ background: `${s.color}15`, borderColor: `${s.color}40` }}>
                  <s.icon size={24} style={{ color: s.color }} />
                  <span className="absolute -top-2.5 -right-2.5 text-xs font-black px-2 py-0.5 rounded-full"
                    style={{ background: s.color, color: "white" }}>{s.step}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">Trusted by radiology leaders</h2>
            <p className="text-slate-400 text-lg">Real results from real teleradiology teams.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "PulseCRM replaced three spreadsheets and two tools. Our renewal rate went from 74% to 91% in two quarters.",
                name: "Vivek Mehta", role: "GM Operations", company: "Apollo Hospitals Radiology",
                avatar: "VM", color: "#0d9488",
              },
              {
                quote: "The SLA countdown dashboard is a game changer. We haven't missed a single EMERGENCY study window since going live.",
                name: "Dr. Ananya Reddy", role: "Chief Radiologist", company: "HCG Cancer Centre",
                avatar: "AR", color: "#3b82f6",
              },
              {
                quote: "Finally a CRM that understands CGST/SGST invoicing. The finance team stopped complaining after day one.",
                name: "Sonia Kapoor", role: "Purchase Head", company: "Fortis Healthcare",
                avatar: "SK", color: "#8b5cf6",
              },
            ].map(t => (
              <div key={t.name} className="p-6 rounded-2xl border relative"
                style={{ background: "#0f172a", borderColor: "rgba(148,163,184,0.1)" }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#f59e0b" stroke="none" />)}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border"
              style={{ background: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.25)", color: "#fbbf24" }}>
              <Receipt size={11} /> Transparent pricing
            </div>
            <h2 className="text-4xl font-black text-white mb-4">Simple, predictable pricing</h2>
            <p className="text-slate-400 text-lg">No per-seat traps. One flat price, all features included.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Starter", price: "₹9,999", period: "/mo",
                desc: "For small radiology networks just getting started.",
                color: "#64748b", featured: false,
                features: ["Up to 25 hospitals", "Lead scoring", "SLA dashboard", "Basic reports", "Email support"],
              },
              {
                name: "Growth", price: "₹24,999", period: "/mo",
                desc: "For scaling teams with complex pipeline needs.",
                color: "#0d9488", featured: true,
                features: ["Up to 100 hospitals", "AI intent engine", "Workflow automation", "GST invoicing", "Priority support", "Dialer integration", "Custom SLA rules"],
              },
              {
                name: "Enterprise", price: "Custom", period: "",
                desc: "For large networks with multi-region operations.",
                color: "#8b5cf6", featured: false,
                features: ["Unlimited hospitals", "White-label option", "Multi-branch support", "API access", "Dedicated CSM", "SLA guarantee"],
              },
            ].map(p => (
              <div key={p.name} className={`p-6 rounded-2xl border relative flex flex-col ${p.featured ? "ring-2 scale-105" : ""}`}
                style={{
                  background: p.featured ? "linear-gradient(135deg, rgba(13,148,136,0.12), rgba(59,130,246,0.08))" : "#0f172a",
                  borderColor: p.featured ? "#0d9488" : "rgba(148,163,184,0.1)",
                  ...(p.featured ? { ringColor: "#0d9488", boxShadow: "0 0 40px rgba(13,148,136,0.2)" } : {}),
                }}>
                {p.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <p className="text-sm font-semibold mb-1" style={{ color: p.color }}>{p.name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white">{p.price}</span>
                    <span className="text-slate-400 text-sm">{p.period}</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-2">{p.desc}</p>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <CheckCircle size={14} style={{ color: p.color, flexShrink: 0 }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up"
                  className="block text-center py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={p.featured
                    ? { background: "linear-gradient(135deg, #0d9488, #3b82f6)", color: "white" }
                    : { background: "rgba(148,163,184,0.08)", color: "white", border: "1px solid rgba(148,163,184,0.15)" }}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Security strip ─────────────────────────────────────────────────── */}
      <section className="py-14 border-y" style={{ borderColor: "rgba(148,163,184,0.06)", background: "rgba(59,130,246,0.03)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm text-slate-500 mb-8 uppercase tracking-widest font-semibold">Enterprise-grade security</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { icon: Shield, color: "#0d9488", label: "SOC2 Ready" },
              { icon: Lock, color: "#3b82f6", label: "End-to-end Encryption" },
              { icon: Heart, color: "#fb7185", label: "HIPAA Compliant" },
              { icon: Globe, color: "#8b5cf6", label: "99.9% Uptime SLA" },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
                  <s.icon size={18} style={{ color: s.color }} />
                </div>
                <p className="text-sm font-medium text-slate-300">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 blur-3xl"
            style={{ background: "radial-gradient(circle, #0d9488, #3b82f6, transparent)" }} />
        </div>
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6"
            style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)", boxShadow: "0 0 40px rgba(13,148,136,0.4)" }}>
            <Activity size={28} className="text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Ready to close more<br />hospital contracts?
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Join 50+ teleradiology teams using PulseCRM to grow revenue, reduce churn, and deliver SLA excellence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sign-up"
              className="group flex items-center gap-2 px-10 py-4 rounded-2xl text-base font-bold text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)", boxShadow: "0 0 40px rgba(13,148,136,0.35)" }}>
              Start your free trial
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-sm text-slate-500">No credit card required · Setup in 5 min</p>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t py-12 px-6" style={{ borderColor: "rgba(148,163,184,0.08)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 mb-12">
            <div className="sm:col-span-1">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #0d9488, #3b82f6)" }}>
                  <Activity size={14} className="text-white" />
                </div>
                <span className="text-base font-bold text-white">PulseCRM</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Revenue intelligence platform for teleradiology. Built by CEO.Agency.
              </p>
            </div>

            {[
              { heading: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
              { heading: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { heading: "Legal", links: ["Privacy Policy", "Terms of Service", "HIPAA", "Security"] },
            ].map(col => (
              <div key={col.heading}>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{col.heading}</p>
                <ul className="space-y-2.5">
                  {col.links.map(l => (
                    <li key={l}>
                      <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t gap-4"
            style={{ borderColor: "rgba(148,163,184,0.06)" }}>
            <p className="text-xs text-slate-600">© 2026 PulseCRM by CEO.Agency. All rights reserved.</p>
            <div className="flex items-center gap-1 text-xs text-slate-600">
              <Heart size={11} fill="#fb7185" stroke="none" />
              <span>Built for Radivue Solutions & teleradiology networks worldwide</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
