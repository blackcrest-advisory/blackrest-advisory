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

    const leads = await prisma.lead.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(leads, { status: 200 });
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

    const { name, email, phone, companyName, pillar, problem, source } =
      body as Record<string, unknown>;

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
        pillar:
          typeof pillar === "string" &&
          Object.values(Pillar).includes(pillar as Pillar)
            ? (pillar as Pillar)
            : null,
        problem: problem.trim(),
        source: typeof source === "string" ? source : null,
        status: "NEW",
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
