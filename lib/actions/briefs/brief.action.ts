"use server";

import { prisma } from "@/lib/db/client";
import {
  createNotification,
  sendBriefStatusUpdate,
} from "@/lib/services/email/email.service";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { briefRequestSchema } from "@/lib/validations/briefRequest";
import { Brief, BriefResponse } from "@/types/projectBrief";
import { BriefStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

type CreateBriefResult =
  | {
      success: true;
      brief: BriefResponse;
    }
  | {
      success: false;
      error: string;
    };

export type ActionResult =
  | { success: true; message: string }
  | { success: false; error: string };

//create brief
export async function createBrief(payload: Brief): Promise<CreateBriefResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    const parsed = briefRequestSchema.safeParse(payload);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return {
        success: false,
        error: firstError.message,
      };
    }

    const {
      title,
      problem,
      pillar,
      budget,
      currency,
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
        currency: currency || "EUR",
        deadline: deadline || null,
        attachments: attachments ?? [],
        projectGoals: projectGoals?.trim() || null,
        targetAudience: targetAudience?.trim() || null,
        referenceLinks: referenceLinks?.trim() || null,
      },
    });

    return {
      success: true,
      brief,
    };
  } catch (error) {
    console.error("Create brief error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}

//===== update status =====//
export async function updateBriefStatus(
  briefId: string,
  newStatus: string,
): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      throw new Error("Unauthorized");
    }

    await prisma.brief.update({
      where: { id: briefId },
      data: { status: newStatus as BriefStatus },
    });
    revalidatePath("/admin/dashboard/project-requests");
    return {
      success: true,
      message: "Status updated successfully",
    };
  } catch (error) {
    console.error("updateBriefStatus failed:", error);
    return {
      success: false,
      error: "Something went  wrong, try again",
    };
  }
}

//===== delete brief =====//
export async function deleteBrief(briefId: string): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
      throw new Error("Unauthorized");
    }

    await prisma.brief.delete({
      where: { id: briefId },
    });
    revalidatePath("/admin/dashboard/project-requests");
    return {
      success: true,
      message: "Request deleted successfully",
    };
  } catch (error) {
    console.error("deleteBrief failed:", error);
    return {
      success: false,
      error: "Something went wrong, try again",
    };
  }
}

//===== close brief with reason =====//
export async function closeBriefWithReason(
  briefId: string,
  reason: string,
): Promise<ActionResult> {
  try {
    const admin = await getCurrentUser();
    if (!admin || (admin.role !== "ADMIN" && admin.role !== "SUPER_ADMIN")) {
      return { success: false, error: "Unauthorized" };
    }

    const brief = await prisma.brief.findUnique({
      where: { id: briefId },
      include: { user: true },
    });

    if (!brief) {
      return { success: false, error: "Brief not found" };
    }

    if (brief.status === "CLOSED") {
      return { success: false, error: "Brief is already closed" };
    }

    await prisma.brief.update({
      where: { id: briefId },
      data: {
        status: "CLOSED",
        closedReason: reason,
        closedAt: new Date(),
      },
    });

    // Notify client
    await sendBriefStatusUpdate({
      to: brief.user.email,
      name: brief.user.name || "Client",
      briefTitle: brief.title,
      newStatus: "CLOSED",
    });

    await createNotification({
      userId: brief.userId,
      type: "BRIEF_CLOSED",
      title: "Request Closed",
      body: `Your request "${brief.title}" has been closed. Reason: ${reason}`,
      link: `/client/dashboard/project-requests/${briefId}`,
    });

    revalidatePath(`/admin/dashboard/project-requests/${briefId}`);
    return { success: true, message: "Brief closed" };
  } catch (error: any) {
    console.error("Close brief error:", error);
    return { success: false, error: error.message || "Failed to close brief" };
  }
}
