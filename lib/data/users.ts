import "server-only";

import { prisma } from "@/lib/db/client";

export async function getDashboardUser(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      avatarUrl: true,
    },
  });
}

export async function getClientSettingsUser(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      phone: true,
      companyName: true,
      jobTitle: true,
      avatarUrl: true,
      notificationPreferences: true,
    },
  });
}
