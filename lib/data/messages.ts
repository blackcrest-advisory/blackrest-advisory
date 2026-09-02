import "server-only";

import { prisma } from "@/lib/db/client";
import type {
  DashboardMessage,
  MessageProject,
} from "@/types/dashboard/messagesType";

const messageInclude = {
  sender: {
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      companyName: true,
      role: true,
    },
  },
  receiver: {
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      companyName: true,
      role: true,
    },
  },
} as const;

function serializeMessage(message: {
  id: string;
  senderId: string;
  receiverId: string;
  subject: string | null;
  body: string;
  projectId: string | null;
  status: "UNREAD" | "READ";
  createdAt: Date;
  sender: DashboardMessage["sender"];
  receiver: DashboardMessage["receiver"];
}): DashboardMessage {
  return {
    ...message,
    createdAt: message.createdAt.toISOString(),
  };
}

export async function getClientMessagesData(userId: string): Promise<{
  messages: DashboardMessage[];
  projects: MessageProject[];
}> {
  const [messages, projects] = await Promise.all([
    prisma.message.findMany({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
      include: messageInclude,
      orderBy: { createdAt: "asc" },
    }),
    prisma.project.findMany({
      where: { userId },
      select: { id: true, title: true },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  return {
    messages: messages.map(serializeMessage),
    projects,
  };
}

export async function getAdminMessagesData(): Promise<DashboardMessage[]> {
  const messages = await prisma.message.findMany({
    where: {
      OR: [{ sender: { role: "CLIENT" } }, { receiver: { role: "CLIENT" } }],
    },
    include: messageInclude,
    orderBy: { createdAt: "asc" },
  });

  return messages.map(serializeMessage);
}
