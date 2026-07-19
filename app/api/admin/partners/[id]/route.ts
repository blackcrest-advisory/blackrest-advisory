import { Pillar } from "@prisma/client";
import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-utils";
import { prisma } from "@/lib/db/client";

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

    const { name, specialty, contactEmail, phone, website, notes, isActive } =
      body as Record<string, unknown>;
    const { id } = await params;
    const partner = await prisma.partner.update({
      where: {
        id,
      },
      data: {
        name: typeof name === "string" ? name : undefined,
        specialty:
          typeof specialty === "string" &&
          Object.values(Pillar).includes(specialty as Pillar)
            ? (specialty as Pillar)
            : undefined,
        contactEmail:
          typeof contactEmail === "string" ? contactEmail : undefined,
        phone:
          typeof phone === "string" || phone === null ? phone : undefined,
        website:
          typeof website === "string" || website === null
            ? website
            : undefined,
        notes:
          typeof notes === "string" || notes === null ? notes : undefined,
        isActive: typeof isActive === "boolean" ? isActive : undefined,
      },
    });

    return NextResponse.json(partner, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
