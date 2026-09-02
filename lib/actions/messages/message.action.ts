"use server";

import { NotificationType, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { prisma } from "@/lib/db/client";
import { getCurrentUser } from "@/lib/utils/auth-utils";

type ActionResult = { success: true } | { success: false; error: string };

const messageSchema = z.object({
  body: z.string().trim().min(1, "Write a message before sending.").max(4000),
  subject: z.string().trim().max(160).optional(),
  projectId: z.string().cuid().optional(),
});

function revalidateMessagePages() {
  revalidatePath("/client/dashboard/messages");
  revalidatePath("/admin/dashboard/messages");
}

export async function sendClientMessage(input: {
  body: string;
  subject?: string;
  projectId?: string;
}): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user || user.role !== Role.CLIENT) {
    return {
      success: false,
      error: "Only client accounts can send this message.",
    };
  }

  const parsed = messageSchema.safeParse(input);
  if (!parsed.success)
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid message.",
    };

  const { body, subject, projectId } = parsed.data;

  if (projectId) {
    const project = await prisma.project.findFirst({
      where: { id: projectId, userId: user.id },
      select: { id: true },
    });
    if (!project)
      return {
        success: false,
        error: "That project is not available for this account.",
      };
  }

  const admin = await prisma.user.findFirst({
    where: { role: { in: [Role.ADMIN, Role.SUPER_ADMIN] } },
    orderBy: { createdAt: "asc" },
    select: { id: true },
  });

  if (!admin)
    return {
      success: false,
      error: "Support is not available yet. Please try again later.",
    };

  await prisma.$transaction([
    prisma.message.create({
      data: {
        senderId: user.id,
        receiverId: admin.id,
        body,
        subject: subject || null,
        projectId: projectId || null,
      },
    }),
    prisma.notification.create({
      data: {
        userId: admin.id,
        type: NotificationType.NEW_MESSAGE,
        title: "New client message",
        body: `${user.name} sent a new message.`,
        link: `/admin/dashboard/messages?client=${user.id}`,
      },
    }),
  ]);

  revalidateMessagePages();
  return { success: true };
}

export async function sendAdminMessage(input: {
  receiverId: string;
  body: string;
  subject?: string;
  projectId?: string;
}): Promise<ActionResult> {
  const admin = await getCurrentUser();
  if (
    !admin ||
    (admin.role !== Role.ADMIN && admin.role !== Role.SUPER_ADMIN)
  ) {
    return {
      success: false,
      error: "Only admin accounts can reply to clients.",
    };
  }

  const parsed = messageSchema.safeParse(input);
  if (!parsed.success)
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid message.",
    };

  const client = await prisma.user.findFirst({
    where: { id: input.receiverId, role: Role.CLIENT },
    select: { id: true, name: true },
  });
  if (!client) return { success: false, error: "Client not found." };

  const { body, subject, projectId } = parsed.data;
  if (projectId) {
    const project = await prisma.project.findFirst({
      where: { id: projectId, userId: client.id },
      select: { id: true },
    });
    if (!project)
      return {
        success: false,
        error: "That project does not belong to this client.",
      };
  }

  await prisma.$transaction([
    prisma.message.create({
      data: {
        senderId: admin.id,
        receiverId: client.id,
        body,
        subject: subject || null,
        projectId: projectId || null,
      },
    }),
    prisma.notification.create({
      data: {
        userId: client.id,
        type: NotificationType.NEW_MESSAGE,
        title: "New message from Blackcrest",
        body: "The Blackcrest team has replied to your message.",
        link: "/client/dashboard/messages",
      },
    }),
  ]);

  revalidateMessagePages();
  return { success: true };
}

export async function markThreadAsRead(
  counterpartyId: string,
): Promise<ActionResult> {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: "Unauthorized" };

  await prisma.message.updateMany({
    where: {
      receiverId: user.id,
      status: "UNREAD",
      ...(user.role === Role.CLIENT ? {} : { senderId: counterpartyId }),
    },
    data: { status: "READ" },
  });

  revalidateMessagePages();
  return { success: true };
}

export async function getUnreadMessageCount(): Promise<{
  success: boolean;
  data?: number;
}> {
  const user = await getCurrentUser();
  if (!user) return { success: false };

  const count = await prisma.message.count({
    where: { receiverId: user.id, status: "UNREAD" },
  });
  return { success: true, data: count };
}
