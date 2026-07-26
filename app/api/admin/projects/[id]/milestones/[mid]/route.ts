import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin-utils";
import { prisma } from "@/lib/db/client";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string; mid: string }> },
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

    const { isCompleted, title, description, dueDate } = body as Record<
      string,
      unknown
    >;
    const { id, mid } = await params;
    const milestone = await prisma.milestone.findFirst({
      where: {
        id: mid,
        projectId: id,
      },
    });

    if (!milestone) {
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );
    }

    const updatedMilestone = await prisma.$transaction(
      async (transaction) => {
        const updated = await transaction.milestone.update({
          where: {
            id: milestone.id,
          },
          data: {
            isCompleted:
              typeof isCompleted === "boolean" ? isCompleted : undefined,
            title: typeof title === "string" ? title : undefined,
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
            completedAt:
              isCompleted === true
                ? new Date()
                : isCompleted === false
                  ? null
                  : undefined,
          },
        });

        if (isCompleted === true) {
          const project = await transaction.project.findUnique({
            where: {
              id,
            },
            select: {
              userId: true,
            },
          });

          if (project) {
            await transaction.notification.create({
              data: {
                userId: project.userId,
                type: "MILESTONE_COMPLETED",
                title: "Milestone completed",
                body: updated.title,
                link: `/client/dashboard/projects/${id}`,
              },
            });
          }
        }

        return updated;
      },
    );

    return NextResponse.json(
      { success: true, data: updatedMilestone },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
}
