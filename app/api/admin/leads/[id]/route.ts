import { LeadStatus, Pillar } from "@prisma/client";
import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-utils";
import { prisma } from "@/lib/db/client";

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

    return NextResponse.json(lead, { status: 200 });
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

    const { status, assignedTo, phone, companyName, pillar } = body as Record<
      string,
      unknown
    >;
    const { id } = await params;
    const lead = await prisma.lead.update({
      where: {
        id,
      },
      data: {
        status:
          typeof status === "string" &&
          Object.values(LeadStatus).includes(status as LeadStatus)
            ? (status as LeadStatus)
            : undefined,
        assignedTo:
          typeof assignedTo === "string" || assignedTo === null
            ? assignedTo
            : undefined,
        phone:
          typeof phone === "string" || phone === null ? phone : undefined,
        companyName:
          typeof companyName === "string" || companyName === null
            ? companyName
            : undefined,
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
