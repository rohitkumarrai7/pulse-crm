import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding PulseCRM database...\n");

  // ─── Users ────────────────────────────────────────────────────────────────
  // NOTE: Authentication is handled by Clerk. These user records store
  // CRM-specific profile data. Clerk user IDs are linked via clerkId field
  // after first sign-in. Seeds use placeholder clerkIds for demo data.
  console.log("Creating users...");

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@pulse-crm.demo" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@pulse-crm.demo",
      role: "ADMIN",
      isActive: true,
    },
  });

  const salesUser = await prisma.user.upsert({
    where: { email: "sales@pulse-crm.demo" },
    update: {},
    create: {
      name: "Sales Rep",
      email: "sales@pulse-crm.demo",
      role: "SALES_REP",
      isActive: true,
    },
  });

  const dr1 = await prisma.user.upsert({
    where: { email: "rajesh.kumar@pulse-crm.demo" },
    update: {},
    create: { name: "Dr. Rajesh Kumar", email: "rajesh.kumar@pulse-crm.demo", role: "RADIOLOGIST", isActive: true },
  });

  const dr2 = await prisma.user.upsert({
    where: { email: "priya.sharma@pulse-crm.demo" },
    update: {},
    create: { name: "Dr. Priya Sharma", email: "priya.sharma@pulse-crm.demo", role: "RADIOLOGIST", isActive: true },
  });

  const dr3 = await prisma.user.upsert({
    where: { email: "amit.patel@pulse-crm.demo" },
    update: {},
    create: { name: "Dr. Amit Patel", email: "amit.patel@pulse-crm.demo", role: "RADIOLOGIST", isActive: true },
  });

  const dr4 = await prisma.user.upsert({
    where: { email: "sneha.gupta@pulse-crm.demo" },
    update: {},
    create: { name: "Dr. Sneha Gupta", email: "sneha.gupta@pulse-crm.demo", role: "RADIOLOGIST", isActive: true },
  });

  const dr5 = await prisma.user.upsert({
    where: { email: "vikram.rao@pulse-crm.demo" },
    update: {},
    create: { name: "Dr. Vikram Rao", email: "vikram.rao@pulse-crm.demo", role: "RADIOLOGIST", isActive: true },
  });

  // ─── Radiologist Profiles ─────────────────────────────────────────────────
  console.log("Creating radiologist profiles...");
  const radProfiles = [
    { userId: dr1.id, specialization: ["Neuroradiology"], qualifications: ["MD Radiology", "DNR", "FRCR"],     availability: "BUSY",      maxDailyCases: 50, currentLoad: 45, avgTurnaround: 18, accuracyRate: 99.7, burnoutRisk: "LOW"  },
    { userId: dr2.id, specialization: ["Cardiac Imaging"], qualifications: ["MD Radiology", "FRCR"],             availability: "AVAILABLE", maxDailyCases: 50, currentLoad: 32, avgTurnaround: 22, accuracyRate: 99.5, burnoutRisk: "LOW"  },
    { userId: dr3.id, specialization: ["Musculoskeletal"], qualifications: ["MD Radiology", "PDCC MSK"],          availability: "BUSY",      maxDailyCases: 50, currentLoad: 50, avgTurnaround: 25, accuracyRate: 99.3, burnoutRisk: "HIGH" },
    { userId: dr4.id, specialization: ["Emergency Radiology"], qualifications: ["MD Radiology", "DMRD"],          availability: "AVAILABLE", maxDailyCases: 50, currentLoad: 28, avgTurnaround: 12, accuracyRate: 99.6, burnoutRisk: "LOW"  },
    { userId: dr5.id, specialization: ["Onco-Imaging"], qualifications: ["MD Radiology", "FNVIR", "FRCR"],       availability: "AVAILABLE", maxDailyCases: 50, currentLoad: 40, avgTurnaround: 20, accuracyRate: 99.8, burnoutRisk: "LOW"  },
  ];

  for (const p of radProfiles) {
    await prisma.radiologistProfile.upsert({
      where: { userId: p.userId },
      update: {},
      create: p,
    });
  }

  // ─── SLA Policies ─────────────────────────────────────────────────────────
  console.log("Creating SLA policies...");
  const goldSla = await prisma.slaPolicy.create({
    data: {
      name: "Gold SLA",
      description: "Premium SLA — fastest turnaround guarantees",
      tier: "GOLD",
      isActive: true,
      isDefault: false,
      emergencyResponse: 15, urgentResponse: 60, routineResponse: 240,
      emergencyReport: 30, urgentReport: 120, routineReport: 480,
      accuracyThreshold: 99.8, penaltyPerBreach: 5000, maxMonthlyPenalty: 50000,
    },
  });

  const silverSla = await prisma.slaPolicy.create({
    data: {
      name: "Silver SLA",
      description: "Standard SLA — reliable response times",
      tier: "SILVER",
      isActive: true,
      isDefault: true,
      emergencyResponse: 20, urgentResponse: 90, routineResponse: 360,
      emergencyReport: 45, urgentReport: 180, routineReport: 600,
      accuracyThreshold: 99.5, penaltyPerBreach: 2500, maxMonthlyPenalty: 25000,
    },
  });

  const bronzeSla = await prisma.slaPolicy.create({
    data: {
      name: "Bronze SLA",
      description: "Essential SLA for smaller volumes",
      tier: "BRONZE",
      isActive: true,
      isDefault: false,
      emergencyResponse: 30, urgentResponse: 120, routineResponse: 480,
      emergencyReport: 60, urgentReport: 240, routineReport: 720,
      accuracyThreshold: 99.0, penaltyPerBreach: 1000, maxMonthlyPenalty: 10000,
    },
  });

  // ─── Hospital Accounts ────────────────────────────────────────────────────
  console.log("Creating hospital accounts...");
  const narayana = await prisma.account.create({
    data: {
      name: "Narayana Health",
      hospitalType: "MULTISPECIALTY",
      bedCount: 1000,
      nabhAccredited: true, nablAccredited: true,
      specialties: ["Cardiology", "Radiology", "Oncology", "Neurology"],
      imagingVolume: 2500,
      currentVendor: "Radivue Solutions",
      slaTier: "GOLD",
      radiologistCount: 5,
      pacsSystem: "GE Centricity",
      risSystem: "Cerner",
      phone: "+91-80-2345-6789",
      email: "radiology@narayanahealth.org",
      city: "Bangalore", state: "Karnataka",
      status: "ACTIVE",
      annualValue: 33600000,
      ownerId: adminUser.id,
      location: { city: "Bangalore", state: "Karnataka", pincode: "560099" },
    },
  });

  const manipal = await prisma.account.create({
    data: {
      name: "Manipal Hospitals",
      hospitalType: "MULTISPECIALTY",
      bedCount: 600,
      nabhAccredited: true, nablAccredited: false,
      specialties: ["Orthopedics", "Neurology", "Radiology"],
      imagingVolume: 1800,
      currentVendor: "Radivue Solutions",
      slaTier: "SILVER",
      radiologistCount: 3,
      pacsSystem: "Philips IntelliSpace",
      phone: "+91-80-2502-4444",
      email: "radiology@manipalhospitals.com",
      city: "Bangalore", state: "Karnataka",
      status: "ACTIVE",
      annualValue: 22800000,
      ownerId: salesUser.id,
      location: { city: "Bangalore", state: "Karnataka", pincode: "560017" },
    },
  });

  const aster = await prisma.account.create({
    data: {
      name: "Aster CMI Hospital",
      hospitalType: "SUPERSPECIALTY",
      bedCount: 500,
      nabhAccredited: true, nablAccredited: false,
      specialties: ["Cardiology", "Oncology", "Radiology"],
      imagingVolume: 900,
      currentVendor: "Radivue Solutions",
      slaTier: "BRONZE",
      churnRisk: 72,
      phone: "+91-80-4342-0101",
      city: "Bangalore", state: "Karnataka",
      status: "ACTIVE",
      annualValue: 11400000,
      ownerId: salesUser.id,
      location: { city: "Bangalore", state: "Karnataka", pincode: "560092" },
    },
  });

  const apollo = await prisma.account.create({
    data: {
      name: "Apollo Hospitals Bannerghatta",
      hospitalType: "MULTISPECIALTY",
      bedCount: 250,
      nabhAccredited: true, nablAccredited: false,
      specialties: ["Cardiology", "Neurology", "Radiology", "Oncology"],
      imagingVolume: 800,
      currentVendor: "CompetitorX",
      contractExpiry: new Date("2026-08-05"),
      radiologistCount: 2,
      phone: "+91-80-2630-4050",
      city: "Bangalore", state: "Karnataka",
      status: "PROSPECT",
      ownerId: salesUser.id,
      location: { city: "Bangalore", state: "Karnataka", pincode: "560076" },
    },
  });

  const fortis = await prisma.account.create({
    data: {
      name: "Fortis Healthcare Mulund",
      hospitalType: "MULTISPECIALTY",
      bedCount: 300,
      nabhAccredited: true, nablAccredited: true,
      specialties: ["Cardiology", "Radiology", "Orthopedics"],
      imagingVolume: 1200,
      currentVendor: "In-house",
      radiologistCount: 4,
      phone: "+91-22-6767-8888",
      city: "Mumbai", state: "Maharashtra",
      status: "PROSPECT",
      ownerId: salesUser.id,
      location: { city: "Mumbai", state: "Maharashtra", pincode: "400080" },
    },
  });

  // ─── Contracts ────────────────────────────────────────────────────────────
  console.log("Creating contracts...");
  const narayanaContract = await prisma.contract.create({
    data: {
      title: "Narayana Health — Gold SLA Retainer 2025-26",
      contractNumber: "RC-2026-001",
      accountId: narayana.id,
      contractType: "RETAINER",
      value: 2800000, currency: "INR",
      startDate: new Date("2025-07-01"),
      endDate: new Date("2026-07-01"),
      autoRenew: true,
      renewalTerms: "60 days notice",
      monthlyMinGuarantee: 2000,
      modalitiesCovered: ["MRI", "CT", "PET", "X-RAY", "CARDIAC"],
      slaPolicyId: goldSla.id,
      renewalStatus: "ACTIVE",
      status: "ACTIVE",
    },
  });

  const manipalContract = await prisma.contract.create({
    data: {
      title: "Manipal Hospitals — Silver SLA Hybrid 2025-26",
      contractNumber: "RC-2026-002",
      accountId: manipal.id,
      contractType: "HYBRID",
      value: 1900000, currency: "INR",
      startDate: new Date("2025-08-20"),
      endDate: new Date("2026-08-20"),
      autoRenew: false,
      renewalTerms: "30 days notice",
      monthlyMinGuarantee: 1500,
      perStudyRate: 500,
      modalitiesCovered: ["MRI", "CT", "X-RAY"],
      slaPolicyId: silverSla.id,
      renewalStatus: "EXPIRING",
      renewalReminderDate: new Date("2026-05-20"),
      status: "ACTIVE",
    },
  });

  await prisma.contract.create({
    data: {
      title: "Aster CMI — Bronze SLA Pay-Per-Study 2025-26",
      contractNumber: "RC-2026-003",
      accountId: aster.id,
      contractType: "PAY_PER_STUDY",
      value: 950000, currency: "INR",
      startDate: new Date("2025-09-25"),
      endDate: new Date("2026-09-25"),
      autoRenew: false,
      perStudyRate: 1100,
      modalitiesCovered: ["CT", "X-RAY"],
      slaPolicyId: bronzeSla.id,
      renewalStatus: "ACTIVE",
      status: "ACTIVE",
    },
  });

  // ─── Invoices ─────────────────────────────────────────────────────────────
  console.log("Creating invoices...");
  await prisma.invoice.create({
    data: {
      invoiceNumber: "INV-2026-0001",
      contractId: narayanaContract.id,
      accountId: narayana.id,
      invoiceDate: new Date("2026-06-01"),
      dueDate: new Date("2026-06-30"),
      status: "PAID",
      lineItems: [{ description: "Monthly retainer — June 2026", quantity: 1, rate: 2800000, amount: 2800000 }],
      subtotal: 2800000,
      gstType: "CGST_SGST",
      cgstRate: 9, sgstRate: 9,
      cgstAmount: 252000, sgstAmount: 252000,
      gstTotal: 504000,
      totalAmount: 3304000,
      amountPaid: 3304000,
      amountDue: 0,
      tallySynced: true,
      paymentMethod: "NEFT",
      paymentDate: new Date("2026-06-28"),
    },
  });

  await prisma.invoice.create({
    data: {
      invoiceNumber: "INV-2026-0002",
      contractId: manipalContract.id,
      accountId: manipal.id,
      invoiceDate: new Date("2026-06-01"),
      dueDate: new Date("2026-06-30"),
      status: "OVERDUE",
      lineItems: [
        { description: "Monthly retainer — June 2026", quantity: 1, rate: 1500000, amount: 1500000 },
        { description: "Additional studies — 400 × ₹1000", quantity: 400, rate: 1000, amount: 400000 },
      ],
      subtotal: 1900000,
      gstType: "CGST_SGST",
      cgstRate: 9, sgstRate: 9,
      cgstAmount: 171000, sgstAmount: 171000,
      gstTotal: 342000,
      totalAmount: 2242000,
      amountPaid: 0,
      amountDue: 2242000,
      tallySynced: true,
    },
  });

  // ─── Leads ────────────────────────────────────────────────────────────────
  console.log("Creating leads...");
  await prisma.lead.create({
    data: {
      firstName: "Vivek", lastName: "Mehta",
      email: "vivek.mehta@apollohospitals.com",
      phone: "+91-98765-43210",
      company: "Apollo Hospitals",
      hospitalType: "MULTISPECIALTY",
      city: "Bangalore", state: "Karnataka",
      source: "REFERRAL",
      status: "CONTACTED",
      intentScore: 92, temperature: "HOT",
      notes: "Contract with CompetitorX expiring in 45 days. Referred by Narayana Health.",
      referredBy: "Dr. Kumar, Narayana Health",
      estimatedVolume: 800,
      currentVendor: "CompetitorX",
      contractExpiry: new Date("2026-08-05"),
      ownerId: salesUser.id,
      accountId: apollo.id,
      lastActivityAt: new Date(),
    },
  });

  await prisma.lead.create({
    data: {
      firstName: "Rajiv", lastName: "Anand",
      email: "rajiv.anand@maxhealthcare.in",
      phone: "+91-98234-56789",
      company: "Max Super Speciality Hospital",
      hospitalType: "SUPERSPECIALTY",
      city: "New Delhi", state: "Delhi",
      source: "COLD_OUTREACH",
      status: "QUALIFIED",
      intentScore: 88, temperature: "HOT",
      notes: "New hospital, no current teleradiology vendor. 1500 studies/month. Urgent need.",
      estimatedVolume: 1500,
      ownerId: salesUser.id,
      lastActivityAt: new Date(Date.now() - 86400000),
    },
  });

  await prisma.lead.create({
    data: {
      firstName: "Sonia", lastName: "Kapoor",
      email: "sonia.kapoor@fortishealthcare.com",
      phone: "+91-97654-32100",
      company: "Fortis Healthcare",
      hospitalType: "MULTISPECIALTY",
      city: "Mumbai", state: "Maharashtra",
      source: "WEB",
      status: "CONTACTED",
      intentScore: 68, temperature: "WARM",
      notes: "Currently in-house, exploring outsourcing. 1200 studies/month.",
      estimatedVolume: 1200,
      currentVendor: "In-house",
      ownerId: salesUser.id,
      accountId: fortis.id,
      lastActivityAt: new Date(Date.now() - 3 * 86400000),
    },
  });

  // ─── Studies ──────────────────────────────────────────────────────────────
  console.log("Creating studies...");
  const studyData = [
    { patientRef: "PT-A4721", hospitalId: apollo.id,   modality: "CT",     bodyPart: "Brain",     urgency: "EMERGENCY", status: "IN_PROGRESS", assignedTo: dr4.id, minAgo: 8   },
    { patientRef: "PT-B2193", hospitalId: narayana.id, modality: "MRI",    bodyPart: "Spine",     urgency: "URGENT",    status: "ASSIGNED",    assignedTo: dr1.id, minAgo: 45  },
    { patientRef: "PT-C8841", hospitalId: manipal.id,  modality: "X-RAY",  bodyPart: "Chest",     urgency: "ROUTINE",   status: "COMPLETED",   assignedTo: dr2.id, minAgo: 180 },
    { patientRef: "PT-D3372", hospitalId: aster.id,    modality: "PET",    bodyPart: "Abdomen",   urgency: "URGENT",    status: "IN_PROGRESS", assignedTo: dr5.id, minAgo: 95  },
    { patientRef: "PT-E1092", hospitalId: narayana.id, modality: "MRI",    bodyPart: "Knee",      urgency: "ROUTINE",   status: "PENDING",     assignedTo: null,   minAgo: 20  },
    { patientRef: "PT-F6621", hospitalId: apollo.id,   modality: "CT",     bodyPart: "Chest",     urgency: "URGENT",    status: "REPORTED",    assignedTo: dr3.id, minAgo: 100 },
    { patientRef: "PT-G9912", hospitalId: manipal.id,  modality: "CARDIAC",bodyPart: "Heart",     urgency: "EMERGENCY", status: "COMPLETED",   assignedTo: dr2.id, minAgo: 25  },
    { patientRef: "PT-H5543", hospitalId: aster.id,    modality: "PET",    bodyPart: "Whole Body",urgency: "ROUTINE",   status: "IN_PROGRESS", assignedTo: dr5.id, minAgo: 200 },
    { patientRef: "PT-I7714", hospitalId: fortis.id,   modality: "MRI",    bodyPart: "Brain",     urgency: "URGENT",    status: "ASSIGNED",    assignedTo: dr1.id, minAgo: 55  },
    { patientRef: "PT-J2281", hospitalId: narayana.id, modality: "X-RAY",  bodyPart: "Pelvis",    urgency: "ROUTINE",   status: "PENDING",     assignedTo: null,   minAgo: 10  },
  ];

  for (const s of studyData) {
    const receivedAt = new Date(Date.now() - s.minAgo * 60000);
    await prisma.study.create({
      data: {
        patientRef: s.patientRef,
        hospitalId: s.hospitalId,
        modality: s.modality,
        bodyPart: s.bodyPart,
        urgency: s.urgency,
        status: s.status,
        assignedTo: s.assignedTo,
        receivedAt,
        assignedAt: s.assignedTo ? new Date(receivedAt.getTime() + 5 * 60000) : null,
        completedAt: ["COMPLETED", "REPORTED"].includes(s.status) ? new Date(receivedAt.getTime() + (s.minAgo - 10) * 60000) : null,
      },
    });
  }

  // ─── Workflows ────────────────────────────────────────────────────────────
  console.log("Creating workflows...");
  await prisma.workflow.createMany({
    data: [
      {
        name: "Emergency Study Auto-Assignment",
        description: "Automatically assign emergency studies to the on-call radiologist",
        trigger: "STUDY_RECEIVED",
        conditions: { urgency: "EMERGENCY", status: "PENDING" },
        actions: [{ type: "ASSIGN", assignTo: "emergency-radiologist" }, { type: "SMS", to: "radiologist" }],
        isActive: true, runCount: 142,
      },
      {
        name: "SLA Breach Alert",
        description: "Alert operations team at 80% SLA utilization",
        trigger: "SLA_BREACH_WARNING",
        conditions: { sla_pct: 80 },
        actions: [{ type: "EMAIL", to: "operations" }, { type: "CREATE_TASK", priority: "URGENT" }],
        isActive: true, runCount: 28,
      },
      {
        name: "Contract Renewal Sequence",
        description: "90/60/30 day automated renewal reminders",
        trigger: "CONTRACT_EXPIRY",
        conditions: { days_until: 90 },
        actions: [{ type: "EMAIL", template: "renewal_90d" }, { type: "CREATE_TASK", daysOffset: 30 }],
        isActive: true, runCount: 6,
      },
      {
        name: "Hot Lead Auto-Assignment",
        description: "Assign high-intent leads (score ≥ 80) to senior sales rep",
        trigger: "LEAD_SCORE_CHANGE",
        conditions: { intent_score_gte: 80, assignedTo: null },
        actions: [{ type: "ASSIGN", assignTo: "senior-sales" }, { type: "CREATE_TASK", title: "Call within 2 hours", priority: "URGENT" }],
        isActive: true, runCount: 15,
      },
    ],
  });

  // ─── Tasks ────────────────────────────────────────────────────────────────
  console.log("Creating tasks...");
  await prisma.task.createMany({
    data: [
      { title: "Follow up — Apollo Hospitals contract renewal",  type: "CALL",     priority: "URGENT",  status: "PENDING", dueDate: new Date(), assigneeId: salesUser.id },
      { title: "Send proposal to Max Speciality Delhi",          type: "FOLLOW_UP", priority: "HIGH",   status: "PENDING", dueDate: new Date(), assigneeId: salesUser.id },
      { title: "Schedule demo with Fortis Mumbai",               type: "DEMO",      priority: "HIGH",   status: "PENDING", dueDate: new Date(Date.now() + 86400000), assigneeId: salesUser.id },
      { title: "Investigate Aster CMI churn risk",               type: "FOLLOW_UP", priority: "MEDIUM", status: "PENDING", dueDate: new Date(Date.now() + 86400000), assigneeId: adminUser.id },
    ],
  });

  console.log("\n✅ PulseCRM seed complete!");
  console.log("\n🌐 Start: npm run dev → http://localhost:3002");
  console.log("🔑 Sign in via Clerk at /sign-in");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
