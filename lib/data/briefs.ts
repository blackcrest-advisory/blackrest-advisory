import "server-only";

import { prisma } from "@/lib/db/client";

export async function getAdminProjectRequests() {
  return prisma.brief.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      pillar: true,
      budget: true,
      status: true,
      currency: true,
      createdAt: true,
      deadline: true,
      assignedTo: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function getAdminProjectRequestById(briefId: string) {
  return prisma.brief.findUnique({
    where: {
      id: briefId,
    },
    select: {
      id: true,
      title: true,
      problem: true,
      pillar: true,
      budget: true,
      currency: true,
      deadline: true,
      attachments: true,
      status: true,
      createdAt: true,
      assignedTo: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          companyName: true,
        },
      },
      proposal: true,
    },
  });
}

export async function getClientProjectRequests(userId: string) {
  return prisma.brief.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      pillar: true,
      budget: true,
      currency: true,
      status: true,
      createdAt: true,
    },
  });
}

export async function getClientProjectRequestById(briefId: string) {
  return prisma.brief.findUnique({
    where: { id: briefId },
    select: {
      id: true,
      title: true,
      problem: true,
      pillar: true,
      budget: true,
      currency: true,
      deadline: true,
      attachments: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      projectGoals: true,
      targetAudience: true,
      referenceLinks: true,
      userId: true,
      proposal: {
        select: {
          id: true,
          status: true,
          scope: true,
          deliverables: true,
          timeline: true,
          amount: true,
          currency: true,
          terms: true,
          sentAt: true,
          viewedAt: true,
          acceptedAt: true,
          declinedAt: true,
        },
      },
    },
  });
}
