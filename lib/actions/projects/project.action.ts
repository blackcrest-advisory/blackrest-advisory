"use server";

//===== imports =====//
import { prisma } from "@/lib/db/client";
import { ProjectStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import {
  createNotification,
  sendBriefStatusUpdate,
} from "@/lib/services/email/email.service";

type ActionResult<T = any> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function createProjectFromProposal(
  proposalId: string,
): Promise<ActionResult> {
  try {
    // Fetch proposal with brief and user
    const proposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
      include: {
        brief: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!proposal) {
      return { success: false, error: "Proposal not found" };
    }

    if (proposal.status !== "ACCEPTED") {
      return { success: false, error: "Proposal is not accepted" };
    }

    // Check if project already exists
    const existingProject = await prisma.project.findUnique({
      where: { proposalId },
    });
    if (existingProject) {
      return {
        success: false,
        error: "Project already exists for this proposal",
      };
    }

    // Create project from proposal and brief data
    const project = await prisma.project.create({
      data: {
        proposalId: proposal.id,
        userId: proposal.brief.userId,
        title: proposal.brief.title,
        description: `
Scope: ${proposal.scope}
Deliverables: ${proposal.deliverables}
Timeline: ${proposal.timeline}
Terms: ${proposal.terms || "N/A"}
        `.trim(),
        status: "PLANNING",
        priority: "medium",
        budget: proposal.amount || undefined,
        serviceType: proposal.brief.pillar,
        deadline: proposal.brief.deadline
          ? new Date(proposal.brief.deadline)
          : undefined,
        assignedTo: proposal.brief.assignedTo || undefined,
        progress: 0,
        budgetSpent: 0,
        updates: [],
      },
    });

    revalidatePath(`/admin/dashboard/project-requests/${proposal.briefId}`);
    return { success: true, data: project };
  } catch (error: any) {
    console.error("Create project error:", error);
    return {
      success: false,
      error: error.message || "Failed to create project",
    };
  }
}

//===== fetch all projects with related data =====//
export async function getAdminProjects() {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      throw new Error("Unauthorized");
    }

    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        proposal: {
          select: {
            id: true,
            brief: {
              select: {
                title: true,
                pillar: true,
              },
            },
          },
        },
      },
    });

    return projects;
  } catch (error: any) {
    console.error("getAdminProjects error:", error);
    throw new Error(error.message || "Failed to fetch projects");
  }
}

//===== fetch single project with full details =====//
export async function getAdminProjectById(projectId: string) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      throw new Error("Unauthorized");
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            companyName: true,
          },
        },
        proposal: {
          include: {
            brief: true,
          },
        },
        milestones: {
          orderBy: { sortOrder: "asc" },
        },
        invoices: {
          orderBy: { createdAt: "desc" },
        },
        files: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return project;
  } catch (error: any) {
    console.error("getAdminProjectById error:", error);
    throw new Error(error.message || "Failed to fetch project");
  }
}

//===== update project status =====//
export async function updateProjectStatus(
  projectId: string,
  status: ProjectStatus,
): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      return { success: false, error: "Unauthorized" };
    }

    // Update the project status
    await prisma.project.update({
      where: { id: projectId },
      data: { status },
    });

    //===== Auto-close brief when project is COMPLETED =====//
    if (status === "COMPLETED") {
      // Get the project with user and proposal/brief
      const project = await prisma.project.findUnique({
        where: { id: projectId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          proposal: {
            include: {
              brief: true,
            },
          },
        },
      });

      if (project?.proposal?.brief && project.user) {
        // Close the brief
        await prisma.brief.update({
          where: { id: project.proposal.brief.id },
          data: {
            status: "CLOSED",
            closedReason: "Project completed",
            closedAt: new Date(),
          },
        });

        // Send notification to client
        await sendBriefStatusUpdate({
          to: project.user.email,
          name: project.user.name || "Client",
          briefTitle: project.proposal.brief.title,
          newStatus: "CLOSED",
        });

        await createNotification({
          userId: project.user.id,
          type: "REQUEST_UPDATED",
          title: "Project Completed",
          body: `Your project "${project.proposal.brief.title}" has been completed.`,
          link: `/client/dashboard/projects/${projectId}`,
        });
      }
    }

    revalidatePath(`/admin/dashboard/projects`);
    revalidatePath(`/admin/dashboard/projects/${projectId}`);
    return { success: true, data: { message: "Project status updated" } };
  } catch (error: any) {
    console.error("updateProjectStatus error:", error);
    return {
      success: false,
      error: error.message || "Failed to update status",
    };
  }
}

//===== delete project =====//
export async function deleteProject(projectId: string): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.project.delete({
      where: { id: projectId },
    });

    revalidatePath("/admin/dashboard/projects");
    return { success: true, data: { message: "Project deleted" } };
  } catch (error: any) {
    console.error("deleteProject error:", error);
    return {
      success: false,
      error: error.message || "Failed to delete project",
    };
  }
}

//===== update project progress =====//
export async function updateProjectProgress(
  projectId: string,
  progress: number,
): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      return { success: false, error: "Unauthorized" };
    }

    const clamped = Math.min(Math.max(progress, 0), 100);

    await prisma.project.update({
      where: { id: projectId },
      data: { progress: clamped },
    });

    revalidatePath(`/admin/dashboard/projects/${projectId}`);
    return { success: true, data: { message: "Progress updated" } };
  } catch (error: any) {
    console.error("updateProjectProgress error:", error);
    return {
      success: false,
      error: error.message || "Failed to update progress",
    };
  }
}

//===== add milestone =====//
export async function addMilestone(
  projectId: string,
  data: {
    title: string;
    description?: string;
    dueDate?: Date;
    sortOrder?: number;
  },
): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      return { success: false, error: "Unauthorized" };
    }

    const maxOrder = await prisma.milestone.aggregate({
      where: { projectId },
      _max: { sortOrder: true },
    });

    const newOrder = (maxOrder._max.sortOrder ?? -1) + 1;

    const milestone = await prisma.milestone.create({
      data: {
        projectId,
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        sortOrder: data.sortOrder ?? newOrder,
      },
    });

    revalidatePath(`/admin/dashboard/projects/${projectId}`);
    return { success: true, data: milestone };
  } catch (error: any) {
    console.error("addMilestone error:", error);
    return {
      success: false,
      error: error.message || "Failed to add milestone",
    };
  }
}

//===== toggle milestone completion =====//
export async function toggleMilestone(
  milestoneId: string,
): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      return { success: false, error: "Unauthorized" };
    }

    const milestone = await prisma.milestone.findUnique({
      where: { id: milestoneId },
    });

    if (!milestone) {
      return { success: false, error: "Milestone not found" };
    }

    const updated = await prisma.milestone.update({
      where: { id: milestoneId },
      data: {
        isCompleted: !milestone.isCompleted,
        completedAt: !milestone.isCompleted ? new Date() : null,
      },
    });

    // Recalculate project progress based on completed milestones
    const allMilestones = await prisma.milestone.findMany({
      where: { projectId: milestone.projectId },
    });

    const total = allMilestones.length;
    const completed = allMilestones.filter((m) => m.isCompleted).length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    await prisma.project.update({
      where: { id: milestone.projectId },
      data: { progress },
    });

    revalidatePath(`/admin/dashboard/projects/${milestone.projectId}`);
    return { success: true, data: updated };
  } catch (error: any) {
    console.error("toggleMilestone error:", error);
    return {
      success: false,
      error: error.message || "Failed to toggle milestone",
    };
  }
}

//===== delete milestone =====//
export async function deleteMilestone(
  milestoneId: string,
): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      return { success: false, error: "Unauthorized" };
    }

    const milestone = await prisma.milestone.findUnique({
      where: { id: milestoneId },
    });

    if (!milestone) {
      return { success: false, error: "Milestone not found" };
    }

    await prisma.milestone.delete({
      where: { id: milestoneId },
    });

    revalidatePath(`/admin/dashboard/projects/${milestone.projectId}`);
    return { success: true, data: { message: "Milestone deleted" } };
  } catch (error: any) {
    console.error("deleteMilestone error:", error);
    return {
      success: false,
      error: error.message || "Failed to delete milestone",
    };
  }
}

//===== fetch project for client (with authorization) =====//
export async function getClientProjectById(projectId: string) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId: user.id, // ensures client owns the project
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            companyName: true,
          },
        },
        proposal: {
          include: {
            brief: {
              select: {
                title: true,
                pillar: true,
                createdAt: true,
              },
            },
          },
        },
        milestones: {
          orderBy: { sortOrder: "asc" },
        },
        invoices: {
          orderBy: { createdAt: "desc" },
        },
        files: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!project) {
      return null;
    }

    return project;
  } catch (error: any) {
    console.error("getClientProjectById error:", error);
    throw new Error(error.message || "Failed to fetch project");
  }
}

//===== fetch client's projects =====//
export async function getClientProjects() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const projects = await prisma.project.findMany({
      where: {
        userId: user.id,
      },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        proposal: {
          select: {
            id: true,
            brief: {
              select: {
                title: true,
                pillar: true,
              },
            },
          },
        },
        milestones: {
          select: {
            isCompleted: true,
          },
        },
        invoices: {
          select: {
            status: true,
            amount: true,
            currency: true,
          },
        },
      },
    });

    return projects;
  } catch (error: any) {
    console.error("getClientProjects error:", error);
    throw new Error(error.message || "Failed to fetch projects");
  }
}
