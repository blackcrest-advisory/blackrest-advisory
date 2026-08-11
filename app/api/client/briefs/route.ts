import { NotificationType } from "@prisma/client";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { prisma } from "@/lib/db/client";
import { briefRequestSchema } from "@/lib/validations/briefRequest";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const briefs = await prisma.brief.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(briefs, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: unknown = await request.json();
    const parsed = briefRequestSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json({ error: firstError.message }, { status: 400 });
    }

    const {
      title,
      problem,
      pillar,
      budget,
      deadline,
      attachments,
      projectGoals,
      targetAudience,
      referenceLinks,
    } = parsed.data;

    const brief = await prisma.brief.create({
      data: {
        userId: user.id,
        title: title.trim(),
        problem: problem.trim(),
        pillar,
        budget: budget || null,
        deadline: deadline || null,
        attachments: attachments ?? [],
        projectGoals: projectGoals?.trim() || null,
        targetAudience: targetAudience?.trim() || null,
        referenceLinks: referenceLinks?.trim() || null,
      },
    });

    // Notifications
    const adminUsers = await prisma.user.findMany({
      where: {
        role: {
          in: ["ADMIN", "SUPER_ADMIN"],
        },
      },
      select: {
        id: true,
      },
    });

    if (adminUsers.length > 0) {
      await prisma.notification.createMany({
        data: adminUsers.map((admin) => ({
          userId: admin.id,
          type: NotificationType.REQUEST_RECEIVED,
          title: "New project request submitted",
          body: `${user.name} submitted "${brief.title}"`,
          link: `/admin/dashboard/project-requests/${brief.id}`,
        })),
      });
    }

    return NextResponse.json({ success: true, brief }, { status: 201 });
  } catch (error) {
    console.error("Create brief error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
