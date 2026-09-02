"use server";

import { LeadStatus, Pillar } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { sendWelcomeEmail } from "@/lib/services/email.service";
import { prisma } from "@/lib/db/client";
import { getAdminUser } from "@/lib/utils/admin-utils";
import type {
  Lead,
  LeadStatus as DashboardLeadStatus,
} from "@/types/dashboard/admin/leadTypes";

export type AdminLeadDetails = Lead & {
  problem: string;
  pillar: string | null;
};

const leadServiceValues = [
  "web-development",
  "mobile-app",
  "digital-marketing",
  "sales-support",
  "branding",
  "seo",
] as const;

const createAdminLeadSchema = z.object({
  name: z.string().trim().min(1, "Contact name is required."),
  email: z.string().trim().email("A valid email address is required."),
  phone: z.string().trim().optional(),
  companyName: z.string().trim().optional(),
  industry: z.string().trim().optional(),
  services: z.array(z.enum(leadServiceValues)).min(1, "Select a service."),
  priority: z.enum(["high", "medium", "low"]),
  budget: z.string().trim().optional(),
  currency: z.enum(["EUR", "USD", "GBP", "CHF", "BDT"]),
  assignedTo: z.string().trim().optional(),
  description: z.string().trim().min(1, "Lead notes are required."),
  nextFollowUp: z.string().optional(),
});

export type CreateAdminLeadInput = z.infer<typeof createAdminLeadSchema>;

type ActionResult<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string };

function mapLeadStatus(status: LeadStatus): DashboardLeadStatus {
  switch (status) {
    case "CONTACTED":
      return "contacted";
    case "QUALIFIED":
      return "qualified";
    case "PROPOSAL_SENT":
      return "proposal-sent";
    case "NEGOTIATION":
      return "negotiation";
    case "WON":
    case "CONVERTED":
      return "won";
    case "LOST":
      return "lost";
    default:
      return "new";
  }
}

function toDatabaseStatus(status: DashboardLeadStatus): LeadStatus {
  const statuses: Record<DashboardLeadStatus, LeadStatus> = {
    new: "NEW",
    contacted: "CONTACTED",
    qualified: "QUALIFIED",
    "proposal-sent": "PROPOSAL_SENT",
    negotiation: "NEGOTIATION",
    won: "WON",
    lost: "LOST",
  };
  return statuses[status];
}

function toDashboardLead(lead: {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  companyName: string | null;
  industry: string | null;
  companySize: string | null;
  location: string | null;
  website: string | null;
  services: string[];
  status: LeadStatus;
  priority: string;
  budget: string | null;
  assignedTo: string | null;
  lastContacted: Date | null;
  nextFollowUp: Date | null;
  notes: string | null;
  createdAt: Date;
}): Lead {
  return {
    id: lead.id,
    companyName: lead.companyName ?? "",
    contactPerson: lead.name,
    email: lead.email,
    phone: lead.phone ?? "",
    industry: lead.industry ?? "",
    companySize: lead.companySize ?? undefined,
    location: lead.location ?? "",
    website: lead.website ?? undefined,
    services: lead.services as Lead["services"],
    status: mapLeadStatus(lead.status),
    priority: lead.priority as Lead["priority"],
    budget: lead.budget ?? undefined,
    assignedTo: lead.assignedTo ?? "",
    lastContacted: lead.lastContacted ?? undefined,
    nextFollowUp: lead.nextFollowUp ?? undefined,
    notes: lead.notes ?? undefined,
    createdAt: lead.createdAt,
  };
}

async function requireAdmin() {
  const admin = await getAdminUser();
  if (!admin) throw new Error("Unauthorized");
  return admin;
}

function serviceToPillar(
  service: CreateAdminLeadInput["services"][number],
): Pillar {
  switch (service) {
    case "mobile-app":
      return "MOBILE_APP";
    case "digital-marketing":
    case "branding":
    case "seo":
      return "DIGITAL_MARKETING";
    case "sales-support":
      return "SALES_SUPPORT";
    default:
      return "WEBSITE_DEVELOPMENT";
  }
}

export async function createAdminLead(
  input: unknown,
): Promise<ActionResult<{ id: string }>> {
  try {
    await requireAdmin();

    const result = createAdminLeadSchema.safeParse(input);
    if (!result.success) {
      return { success: false, error: result.error.issues[0].message };
    }

    const data = result.data;
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email.toLowerCase(),
        phone: data.phone || null,
        companyName: data.companyName || null,
        industry: data.industry || null,
        companySize: null,
        location: null,
        website: null,
        pillar: serviceToPillar(data.services[0]),
        services: data.services,
        problem: data.description,
        source: "admin_manual",
        status: "NEW",
        priority: data.priority,
        budget: data.budget || null,
        assignedTo: data.assignedTo || null,
        notes: JSON.stringify({ currency: data.currency }),
        lastContacted: null,
        nextFollowUp: data.nextFollowUp
          ? new Date(`${data.nextFollowUp}T00:00:00`)
          : null,
      },
    });

    revalidatePath("/admin/dashboard/leads");
    return { success: true, data: { id: lead.id } };
  } catch (error: unknown) {
    console.error("createAdminLead error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create lead",
    };
  }
}

export async function getAdminLeads(): Promise<Lead[]> {
  await requireAdmin();
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  return leads.map(toDashboardLead);
}

export async function getAdminLead(
  id: string,
): Promise<AdminLeadDetails | null> {
  await requireAdmin();

  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) return null;

  return {
    ...toDashboardLead(lead),
    problem: lead.problem,
    pillar: lead.pillar,
  };
}

export async function updateAdminLead(id: string, lead: Lead): Promise<Lead> {
  await requireAdmin();
  const updatedLead = await prisma.lead.update({
    where: { id },
    data: {
      name: lead.contactPerson.trim(),
      email: lead.email.trim().toLowerCase(),
      phone: lead.phone || null,
      companyName: lead.companyName || null,
      industry: lead.industry || null,
      companySize: lead.companySize || null,
      location: lead.location || null,
      website: lead.website || null,
      services: lead.services,
      status: toDatabaseStatus(lead.status),
      priority: lead.priority,
      budget: lead.budget || null,
      assignedTo: lead.assignedTo || null,
      lastContacted: lead.lastContacted || null,
      nextFollowUp: lead.nextFollowUp || null,
      notes: lead.notes || null,
    },
  });
  revalidatePath("/admin/dashboard/leads");
  return toDashboardLead(updatedLead);
}

export async function deleteAdminLead(id: string): Promise<void> {
  await requireAdmin();
  await prisma.lead.delete({ where: { id } });
  revalidatePath("/admin/dashboard/leads");
}

export async function convertAdminLead(id: string): Promise<Lead> {
  const admin = await requireAdmin();
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) throw new Error("Lead not found");

  const email = lead.email.trim().toLowerCase();
  if (!email) throw new Error("Lead email is required to convert to a client");
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (lead.status === "CONVERTED") {
    throw new Error("Lead has already been converted to a client");
  }
  if (existingUser && existingUser.role !== "CLIENT")
    throw new Error("A user with this email already has elevated permissions");

  const user = existingUser
    ? await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          role: "CLIENT",
          name: lead.name || existingUser.name,
          companyName: lead.companyName || existingUser.companyName,
          phone: lead.phone || existingUser.phone,
          industry: lead.industry || existingUser.industry,
        },
      })
    : await prisma.user.create({
        data: {
          name: lead.name,
          email,
          role: "CLIENT",
          companyName: lead.companyName ?? undefined,
          phone: lead.phone ?? undefined,
          industry: lead.industry ?? undefined,
          password: null,
        },
      });

  let existingNotes: Record<string, unknown> = {};
  if (lead.notes) {
    try {
      const parsedNotes: unknown = JSON.parse(lead.notes);
      if (
        parsedNotes &&
        typeof parsedNotes === "object" &&
        !Array.isArray(parsedNotes)
      )
        existingNotes = parsedNotes as Record<string, unknown>;
    } catch {}
  }

  const updatedLead = await prisma.lead.update({
    where: { id },
    data: {
      status: "CONVERTED",
      notes: JSON.stringify({
        ...existingNotes,
        convertedToUserId: user.id,
        convertedAt: new Date().toISOString(),
        convertedBy: admin.id,
      }),
    },
  });
  void sendWelcomeEmail(user.email, user.name);
  revalidatePath("/admin/dashboard/leads");
  return toDashboardLead(updatedLead);
}
