import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/db/client";

function mapStatus(status: string) {
  const statuses: Record<string, string> = {
    ACTIVE: "active",
    COMPLETED: "completed",
    ON_HOLD: "on-hold",
    PLANNING: "planning",
    IN_REVIEW: "in-review",
  };

  return statuses[status] ?? "active";
}

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projects = await prisma.project.findMany({
      where: {
        userId: user.id,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            companyName: true,
            phone: true,
            industry: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const mappedProjects = projects.map((project) => ({
      id: project.id,
      name: project.title,
      clientCompany: project.user.companyName ?? "My Company",
      industry: project.user.industry ?? "IT & Software",
      serviceType: project.serviceType ?? "Business Consultation",
      status: mapStatus(project.status),
      priority: project.priority ?? "medium",
      budget: project.budget ?? 0,
      budgetSpent: project.budgetSpent ?? 0,
      timeline: {
        start: project.createdAt,
        end: project.deadline ?? project.createdAt,
      },
      progress: project.progress ?? 0,
      assignedTeam: project.assignedTo
        ? [
            {
              id: "1",
              name: project.assignedTo,
              role: "Project Manager",
              avatar: project.assignedTo.slice(0, 2).toUpperCase(),
            },
          ]
        : [],
      dueDate: project.deadline ?? project.createdAt,
      lastUpdated: project.updatedAt,
      description: project.description ?? "",
      clientContact: {
        name: project.user.name,
        email: project.user.email,
        phone: project.user.phone ?? "",
        avatar: project.user.name.slice(0, 2).toUpperCase(),
      },
      milestones: [],
      files: [],
      activity: project.updates.map((update, index) => ({
        id: String(index),
        action: update,
        performedBy: "Blackcrest Team",
        timestamp: project.updatedAt,
      })),
    }));

    return NextResponse.json(mappedProjects, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
