import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-utils";
import { prisma } from "@/lib/db/client";

export async function GET() {
  try {
    const admin = await getAdminUser();

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projects = await prisma.project.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            companyName: true,
          },
        },
        proposal: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(projects, { status: 200 });
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
        { error: "Proposal ID, user ID, and title are required" },
        { status: 400 },
      );
    }

    const {
      proposalId,
      userId,
      title,
      description,
      deadline,
      assignedTo,
      priority,
      budget,
      budgetSpent,
      progress,
      serviceType,
    } = body as Record<string, unknown>;

    if (
      typeof proposalId !== "string" ||
      !proposalId.trim() ||
      typeof userId !== "string" ||
      !userId.trim() ||
      typeof title !== "string" ||
      !title.trim()
    ) {
      return NextResponse.json(
        { error: "Proposal ID, user ID, and title are required" },
        { status: 400 },
      );
    }

    const project = await prisma.project.create({
      data: {
        proposalId,
        userId,
        title: title.trim(),
        description: typeof description === "string" ? description : null,
        deadline:
          typeof deadline === "string" ? new Date(deadline) : undefined,
        assignedTo: typeof assignedTo === "string" ? assignedTo : null,
        priority: typeof priority === "string" ? priority : undefined,
        budget:
          typeof budget === "number" || budget === null ? budget : undefined,
        budgetSpent:
          typeof budgetSpent === "number" ? budgetSpent : undefined,
        progress: typeof progress === "number" ? progress : undefined,
        serviceType:
          typeof serviceType === "string" || serviceType === null
            ? serviceType
            : undefined,
        status: "ACTIVE",
        updates: [],
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
