import { BriefStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/utils/admin-utils";
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

    const { status, assignedTo } = body as Record<string, unknown>;
    const { id } = await params;
    const brief = await prisma.brief.update({
      where: {
        id,
      },
      data: {
        status:
          typeof status === "string" &&
          Object.values(BriefStatus).includes(status as BriefStatus)
            ? (status as BriefStatus)
            : undefined,
        assignedTo:
          typeof assignedTo === "string" || assignedTo === null
            ? assignedTo
            : undefined,
      },
    });

    return NextResponse.json(brief, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
