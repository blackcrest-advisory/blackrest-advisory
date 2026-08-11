"use server";

import { prisma } from "@/lib/db/client";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { briefRequestSchema } from "@/lib/validations/briefRequest";
import { Brief, BriefResponse } from "@/types/projectBrief";

type CreateBriefResult =
  | {
      success: true;
      brief: BriefResponse;
    }
  | {
      success: false;
      error: string;
    };

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
