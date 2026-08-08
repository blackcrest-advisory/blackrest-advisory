import { Pillar } from "@prisma/client";
import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/utils/admin-utils";
import { prisma } from "@/lib/db/client";
import {
  leadRequestSchema,
  projectTypeToPillar,
} from "@/lib/validations/leadRequest";

function mapLeadStatus(status: string): string {
  switch (status) {
    case "NEW":
      return "new";
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

export async function GET() {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    const mappedLeads = leads.map((lead) => ({
      id: lead.id,
      companyName: lead.companyName ?? "",
      contactPerson: lead.name,
      email: lead.email,
      phone: lead.phone ?? "",
      industry: lead.industry ?? "",
      companySize: lead.companySize ?? undefined,
      location: lead.location ?? "",
      website: lead.website ?? undefined,
      services: lead.services,
      status: mapLeadStatus(lead.status),
      priority: lead.priority ?? "medium",
      budget: lead.budget ?? undefined,
      assignedTo: lead.assignedTo ?? "",
      lastContacted: lead.lastContacted ?? undefined,
      nextFollowUp: lead.nextFollowUp ?? undefined,
      notes: lead.notes ?? undefined,
      createdAt: lead.createdAt,
    }));

    return NextResponse.json(mappedLeads, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate with Zod
    const result = leadRequestSchema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.issues[0];
      return NextResponse.json({ error: firstError.message }, { status: 400 });
    }

    const {
      name,
      email,
      phone,
      companyName,
      industry,
      projectType,
      projectTitle,
      budget,
      timeline,
      currency,
      description,
      services,
      source,
    } = result.data;

    // Map projectType to Pillar enum
    const pillar = projectType
      ? (projectTypeToPillar[projectType] as Pillar | undefined) || null
      : null;

    // Extra fields that we don't have dedicated columns for yet.
    // Store them as JSON in the `notes` field.
    const extraMetadata = {
      projectTitle,
      timeline,
      currency,
    };
    const notes = JSON.stringify(extraMetadata);

    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone || null,
        companyName: companyName || null,
        industry: industry || null,
        companySize: null,
        location: null,
        website: null,
        pillar: pillar,
        services: services || [],
        problem: description.trim(),
        source: source || "website_inquiry",
        status: "NEW",
        budget: budget || null,
        notes: notes,
        lastContacted: null,
        nextFollowUp: null,
      },
    });

    return NextResponse.json(
      {
        lead: lead,
        success: true,
        message:
          "Your inquiry has been submitted successfully! We will get back to you within one business day.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
