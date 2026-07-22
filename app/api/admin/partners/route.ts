import { Pillar } from "@prisma/client";
import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-utils";
import { prisma } from "@/lib/db/client";

export async function GET() {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const partners = await prisma.partner.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(partners, { status: 200 });
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
        { error: "Name, specialty, and contact email are required" },
        { status: 400 },
      );
    }

    const { name, specialty, contactEmail, phone, website, notes } =
      body as Record<string, unknown>;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof specialty !== "string" ||
      !Object.values(Pillar).includes(specialty as Pillar) ||
      typeof contactEmail !== "string" ||
      !contactEmail.trim()
    ) {
      return NextResponse.json(
        { error: "Name, specialty, and contact email are required" },
        { status: 400 },
      );
    }

    const partner = await prisma.partner.create({
      data: {
        name: name.trim(),
        specialty: specialty as Pillar,
        contactEmail: contactEmail.trim().toLowerCase(),
        phone: typeof phone === "string" ? phone : null,
        website: typeof website === "string" ? website : null,
        notes: typeof notes === "string" ? notes : null,
      },
    });

    return NextResponse.json(partner, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
