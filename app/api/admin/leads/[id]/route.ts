import { LeadStatus, Pillar } from "@prisma/client";
import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/utils/admin-utils";
import { prisma } from "@/lib/db/client";

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

function toLeadStatus(status: string): LeadStatus | undefined {
  switch (status) {
    case "new":
      return "NEW";
    case "contacted":
      return "CONTACTED";
    case "qualified":
      return "QUALIFIED";
    case "proposal-sent":
      return "PROPOSAL_SENT";
    case "negotiation":
      return "NEGOTIATION";
    case "won":
      return "WON";
    case "lost":
      return "LOST";
    default:
      return undefined;
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const lead = await prisma.lead.findUnique({
      where: {
        id,
      },
    });

    if (!lead) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const mappedLead = {
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
    };

    return NextResponse.json(mappedLead, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null) {
      throw new Error("Invalid request body");
    }

    const {
      status,
      assignedTo,
      industry,
      companySize,
      location,
      website,
      services,
      lastContacted,
      nextFollowUp,
      notes,
      priority,
      name,
      email,
      phone,
      companyName,
      budget,
      pillar,
    } = body as Record<string, unknown>;
    const { id } = await params;
    const lead = await prisma.lead.update({
      where: {
        id,
      },
      data: {
        status: typeof status === "string" ? toLeadStatus(status) : undefined,
        assignedTo:
          typeof assignedTo === "string" || assignedTo === null
            ? assignedTo
            : undefined,
        industry:
          typeof industry === "string" || industry === null
            ? industry
            : undefined,
        companySize:
          typeof companySize === "string" || companySize === null
            ? companySize
            : undefined,
        location:
          typeof location === "string" || location === null
            ? location
            : undefined,
        website:
          typeof website === "string" || website === null ? website : undefined,
        services: Array.isArray(services)
          ? services.filter(
              (service): service is string => typeof service === "string",
            )
          : undefined,
        lastContacted:
          typeof lastContacted === "string"
            ? new Date(lastContacted)
            : lastContacted === null
              ? null
              : undefined,
        nextFollowUp:
          typeof nextFollowUp === "string"
            ? new Date(nextFollowUp)
            : nextFollowUp === null
              ? null
              : undefined,
        notes: typeof notes === "string" || notes === null ? notes : undefined,
        priority: typeof priority === "string" ? priority : undefined,
        name: typeof name === "string" ? name : undefined,
        email: typeof email === "string" ? email : undefined,
        phone: typeof phone === "string" || phone === null ? phone : undefined,
        companyName:
          typeof companyName === "string" || companyName === null
            ? companyName
            : undefined,
        budget:
          typeof budget === "string" || budget === null ? budget : undefined,
        pillar:
          pillar === null ||
          (typeof pillar === "string" &&
            Object.values(Pillar).includes(pillar as Pillar))
            ? (pillar as Pillar | null)
            : undefined,
      },
    });

    return NextResponse.json(lead, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.lead.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
