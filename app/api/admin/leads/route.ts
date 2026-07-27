import { Pillar } from "@prisma/client";
import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-utils";
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
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null) {
      return NextResponse.json(
        { error: "Name, email, and problem are required" },
        { status: 400 },
      );
    }

    const {
      name,
      email,
      phone,
      companyName,
      industry,
      companySize,
      location,
      website,
      pillar,
      services,
      problem,
      source,
      lastContacted,
      nextFollowUp,
      notes,
    } = body as Record<string, unknown>;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof problem !== "string" ||
      !problem.trim()
    ) {
      return NextResponse.json(
        { error: "Name, email, and problem are required" },
        { status: 400 },
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: typeof phone === "string" ? phone : null,
        companyName: typeof companyName === "string" ? companyName : null,
        industry: typeof industry === "string" ? industry : null,
        companySize: typeof companySize === "string" ? companySize : null,
        location: typeof location === "string" ? location : null,
        website: typeof website === "string" ? website : null,
        pillar:
          typeof pillar === "string" &&
          Object.values(Pillar).includes(pillar as Pillar)
            ? (pillar as Pillar)
            : null,
        services: Array.isArray(services)
          ? services.filter(
              (service): service is string => typeof service === "string",
            )
          : [],
        problem: problem.trim(),
        source: typeof source === "string" ? source : null,
        status: "NEW",
        lastContacted:
          typeof lastContacted === "string" ? new Date(lastContacted) : null,
        nextFollowUp:
          typeof nextFollowUp === "string" ? new Date(nextFollowUp) : null,
        notes: typeof notes === "string" ? notes : null,
      },
    });

    return NextResponse.json(lead, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
