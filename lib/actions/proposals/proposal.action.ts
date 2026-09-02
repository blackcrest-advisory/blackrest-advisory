"use server";

//===== imports =====//
import { prisma } from "@/lib/db/client";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import {
  proposalSchema,
  clientProposalResponseSchema,
} from "@/lib/validations/proposal";
import { revalidatePath } from "next/cache";
import {
  sendProposalToClient,
  sendProposalAccepted,
  sendProposalDeclined,
  createNotification,
} from "@/lib/services/email/email.service";
import { createProjectFromProposal } from "@/lib/actions/projects/project.action";

//===== types =====//
type ActionResult<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string };

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

//===== create or update proposal (admin) =====//
export async function upsertProposal(input: {
  briefId: string;
  scope: string;
  deliverables: string;
  timeline: string;
  amount?: number;
  currency?: string;
  terms?: string;
}): Promise<ActionResult> {
  try {
    const admin = await getCurrentUser();
    if (!admin || (admin.role !== "ADMIN" && admin.role !== "SUPER_ADMIN")) {
      return { success: false, error: "Unauthorized" };
    }

    const parsed = proposalSchema.safeParse({
      ...input,
      briefId: input.briefId,
    });
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const { briefId, scope, deliverables, timeline, amount, currency, terms } =
      parsed.data;

    // Check if proposal already exists
    const existing = await prisma.proposal.findUnique({
      where: { briefId },
    });

    let proposal;
    if (existing) {
      // Update existing
      proposal = await prisma.proposal.update({
        where: { briefId },
        data: {
          scope,
          deliverables,
          timeline,
          amount,
          currency: currency || "EUR",
          terms,
          updatedAt: new Date(),
        },
      });
    } else {
      // Create new
      proposal = await prisma.proposal.create({
        data: {
          briefId,
          adminId: admin.id,
          scope,
          deliverables,
          timeline,
          amount,
          currency: currency || "EUR",
          terms,
          status: "DRAFT",
        },
      });
    }

    revalidatePath(`/admin/dashboard/project-requests/${briefId}`);
    return { success: true, data: proposal };
  } catch (error) {
    console.error("Upsert proposal error:", error);
    return {
      success: false,
      error: getErrorMessage(error, "Failed to save proposal"),
    };
  }
}

//===== send proposal to client (admin) =====//
export async function sendProposal(proposalId: string): Promise<ActionResult> {
  try {
    const admin = await getCurrentUser();
    if (!admin || (admin.role !== "ADMIN" && admin.role !== "SUPER_ADMIN")) {
      return { success: false, error: "Unauthorized" };
    }

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

    if (proposal.status !== "DRAFT" && proposal.status !== "VIEWED") {
      return { success: false, error: "Proposal has already been sent" };
    }

    // Update proposal status and sentAt
    await prisma.proposal.update({
      where: { id: proposalId },
      data: {
        status: "SENT",
        sentAt: new Date(),
      },
    });

    // Send email to client
    await sendProposalToClient({
      to: proposal.brief.user.email,
      name: proposal.brief.user.name || "Client",
      proposalId: proposal.briefId,
      briefTitle: proposal.brief.title,
      amount: proposal.amount,
      currency: proposal.currency,
    });

    // In-app notification for client
    await createNotification({
      userId: proposal.brief.userId,
      type: "PROPOSAL_SENT",
      title: "New Proposal",
      body: `A proposal for "${proposal.brief.title}" has been sent.`,
      link: `/client/dashboard/project-requests/${proposal.briefId}`,
    });

    revalidatePath(`/admin/dashboard/project-requests/${proposal.briefId}`);
    revalidatePath(`/client/dashboard/project-requests/${proposal.briefId}`);
    return { success: true, data: { message: "Proposal sent successfully" } };
  } catch (error) {
    console.error("Send proposal error:", error);
    return {
      success: false,
      error: getErrorMessage(error, "Failed to send proposal"),
    };
  }
}

//===== reopen a declined proposal for negotiation (admin) =====//
export async function reopenDeclinedProposal(
  proposalId: string,
): Promise<ActionResult> {
  try {
    const admin = await getCurrentUser();
    if (!admin || (admin.role !== "ADMIN" && admin.role !== "SUPER_ADMIN")) {
      return { success: false, error: "Unauthorized" };
    }

    const proposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
    });

    if (!proposal) {
      return { success: false, error: "Proposal not found" };
    }

    if (proposal.status !== "DECLINED") {
      return {
        success: false,
        error: "Only a declined proposal can be reopened for negotiation",
      };
    }

    await prisma.$transaction([
      prisma.proposal.update({
        where: { id: proposalId },
        data: {
          status: "DRAFT",
          sentAt: null,
          viewedAt: null,
        },
      }),
      prisma.brief.update({
        where: { id: proposal.briefId },
        data: {
          status: "UNDER_REVIEW",
          closedReason: null,
          closedAt: null,
        },
      }),
    ]);

    revalidatePath(`/admin/dashboard/project-requests/${proposal.briefId}`);
    revalidatePath(`/client/dashboard/project-requests/${proposal.briefId}`);
    revalidatePath("/admin/dashboard/project-requests");
    revalidatePath("/client/dashboard/project-requests");

    return {
      success: true,
      data: { message: "Proposal reopened as a draft for negotiation" },
    };
  } catch (error) {
    console.error("Reopen proposal error:", error);
    return {
      success: false,
      error: getErrorMessage(error, "Failed to reopen proposal"),
    };
  }
}

//===== client accepts proposal =====//
export async function clientAcceptProposal(input: {
  proposalId: string;
  feedback?: string;
}): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const parsed = clientProposalResponseSchema.safeParse({
      proposalId: input.proposalId,
      feedback: input.feedback,
    });
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const { proposalId, feedback } = parsed.data;

    // Fetch proposal with brief and admin
    const proposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
      include: {
        brief: {
          include: {
            user: true,
          },
        },
        admin: true,
      },
    });

    if (!proposal) {
      return { success: false, error: "Proposal not found" };
    }

    // Verify client owns the brief
    if (proposal.brief.userId !== user.id) {
      return { success: false, error: "Unauthorized" };
    }

    if (proposal.status !== "SENT" && proposal.status !== "VIEWED") {
      return {
        success: false,
        error: "Proposal is not in a valid state to accept",
      };
    }

    // Update proposal
    await prisma.proposal.update({
      where: { id: proposalId },
      data: {
        status: "ACCEPTED",
        acceptedAt: new Date(),
        clientFeedback: feedback || null,
      },
    });

    // Update brief status to ASSIGNED
    await prisma.brief.update({
      where: { id: proposal.briefId },
      data: {
        status: "ASSIGNED",
      },
    });

    // AUTO-CREATE PROJECT
    const projectResult = await createProjectFromProposal(proposalId);
    if (!projectResult.success) {
      console.error("Failed to create project:", projectResult.error);
    }

    // Notifications & emails
    await sendProposalAccepted({
      to: proposal.admin.email,
      adminName: proposal.admin.name || "Admin",
      clientName: proposal.brief.user.name || "Client",
      briefTitle: proposal.brief.title,
      feedback: feedback,
    });

    await createNotification({
      userId: proposal.adminId,
      type: "PROPOSAL_ACCEPTED",
      title: "Proposal Accepted",
      body: `${proposal.brief.user.name} accepted the proposal for "${proposal.brief.title}".`,
      link: `/admin/dashboard/project-requests/${proposal.briefId}`,
    });

    await createNotification({
      userId: proposal.brief.userId,
      type: "PROJECT_CREATED",
      title: "Project Created",
      body: `Your project "${proposal.brief.title}" has been created. We will start work soon.`,
      link: `/client/dashboard/project-requests/${proposal.briefId}`,
    });

    revalidatePath(`/client/dashboard/project-requests/${proposal.briefId}`);
    revalidatePath(`/admin/dashboard/project-requests/${proposal.briefId}`);
    return {
      success: true,
      data: { message: "Proposal accepted, project created" },
    };
  } catch (error) {
    console.error("Accept proposal error:", error);
    return {
      success: false,
      error: getErrorMessage(error, "Failed to accept proposal"),
    };
  }
}

//===== client declines proposal =====//
export async function clientDeclineProposal(input: {
  proposalId: string;
  feedback?: string;
  declinedReason?: string;
}): Promise<ActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return { success: false, error: "Unauthorized" };
    }

    const parsed = clientProposalResponseSchema.safeParse({
      proposalId: input.proposalId,
      feedback: input.feedback,
    });
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const { proposalId, feedback } = parsed.data;
    const declinedReason =
      input.declinedReason || "Client declined the proposal";

    const proposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
      include: {
        brief: {
          include: {
            user: true,
          },
        },
        admin: true,
      },
    });

    if (!proposal) {
      return { success: false, error: "Proposal not found" };
    }

    if (proposal.brief.userId !== user.id) {
      return { success: false, error: "Unauthorized" };
    }

    if (proposal.status !== "SENT" && proposal.status !== "VIEWED") {
      return {
        success: false,
        error: "Proposal is not in a valid state to decline",
      };
    }

    // Update proposal
    await prisma.proposal.update({
      where: { id: proposalId },
      data: {
        status: "DECLINED",
        declinedAt: new Date(),
        clientFeedback: feedback || null,
        declinedReason: declinedReason,
      },
    });

    // Close brief with reason
    await prisma.brief.update({
      where: { id: proposal.briefId },
      data: {
        status: "CLOSED",
        closedReason: declinedReason,
        closedAt: new Date(),
      },
    });

    // Notifications & emails
    await sendProposalDeclined({
      to: proposal.admin.email,
      adminName: proposal.admin.name || "Admin",
      clientName: proposal.brief.user.name || "Client",
      briefTitle: proposal.brief.title,
      declinedReason: declinedReason,
      feedback: feedback,
    });

    await createNotification({
      userId: proposal.adminId,
      type: "PROPOSAL_DECLINED",
      title: "Proposal Declined",
      body: `${proposal.brief.user.name} declined the proposal for "${proposal.brief.title}".`,
      link: `/admin/dashboard/project-requests/${proposal.briefId}`,
    });

    revalidatePath(`/client/dashboard/project-requests/${proposal.briefId}`);
    revalidatePath(`/admin/dashboard/project-requests/${proposal.briefId}`);
    return { success: true, data: { message: "Proposal declined" } };
  } catch (error) {
    console.error("Decline proposal error:", error);
    return {
      success: false,
      error: getErrorMessage(error, "Failed to decline proposal"),
    };
  }
}
