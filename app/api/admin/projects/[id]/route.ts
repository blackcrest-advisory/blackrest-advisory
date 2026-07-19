import { ProjectStatus } from "@prisma/client";
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
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        proposal: true,
        user: true,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(project, { status: 200 });
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

    const { status, assignedTo, deadline, description, update } = body as Record<
      string,
      unknown
    >;
    const { id } = await params;
    const project = await prisma.project.update({
      where: {
        id,
      },
      data: {
        status:
          typeof status === "string" &&
          Object.values(ProjectStatus).includes(status as ProjectStatus)
            ? (status as ProjectStatus)
            : undefined,
        assignedTo:
          typeof assignedTo === "string" || assignedTo === null
            ? assignedTo
            : undefined,
        deadline:
          typeof deadline === "string"
            ? new Date(deadline)
            : deadline === null
              ? null
              : undefined,
        description:
          typeof description === "string" || description === null
            ? description
            : undefined,
        updates:
          typeof update === "string" && update.trim()
            ? { push: update }
            : undefined,
      },
    });

    return NextResponse.json(project, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
