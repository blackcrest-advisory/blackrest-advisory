"use server";

import { prisma } from "@/lib/db/client";
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
