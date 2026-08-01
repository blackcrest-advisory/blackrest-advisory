import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/utils/admin-utils";
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
    const milestones = await prisma.milestone.findMany({
      where: {
        projectId: id,
      },
      orderBy: {
        sortOrder: "asc",
      },
    });

    return NextResponse.json(
      { success: true, data: milestones },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function POST(
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
      return NextResponse.json(
        { success: false, error: "Title is required" },
        { status: 400 },
      );
    }

    const { title, description, dueDate, sortOrder } = body as Record<
      string,
      unknown
    >;

    if (typeof title !== "string" || !title) {
      return NextResponse.json(
        { success: false, error: "Title is required" },
        { status: 400 },
      );
    }

    const { id } = await params;
    const milestone = await prisma.milestone.create({
      data: {
        projectId: id,
        title,
        description:
          typeof description === "string" || description === null
            ? description
            : undefined,
        dueDate:
          typeof dueDate === "string"
            ? new Date(dueDate)
            : dueDate === null
              ? null
              : undefined,
        sortOrder: typeof sortOrder === "number" ? sortOrder : undefined,
      },
    });

    return NextResponse.json(
      { success: true, data: milestone },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
}
