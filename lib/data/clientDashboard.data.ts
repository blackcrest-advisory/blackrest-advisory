import "server-only";

import { prisma } from "@/lib/db/client";

export async function getClientDashboardData(userId: string) {
  const [
    projectRecords,
    consultationRecords,
    activeProjectCount,
    recentBriefs,
    recentProposals,
    recentConsultations,
    recentProjects,
    clientRecord,
    paidInvoiceCount,
  ] = await Promise.all([
    prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        status: true,
        progress: true,
        deadline: true,
        serviceType: true,
      },
    }),
    prisma.consultation.findMany({
      where: {
        userId,
        status: { in: ["PENDING", "CONFIRMED"] },
      },
      orderBy: { scheduledAt: "asc" },
      select: {
        id: true,
        scheduledAt: true,
        type: true,
        notes: true,
      },
    }),
    prisma.project.count({
      where: { userId, status: "ACTIVE" },
    }),
    prisma.brief.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 2,
      select: {
        title: true,
        createdAt: true,
      },
    }),
    prisma.proposal.findMany({
      where: { brief: { userId } },
      orderBy: { createdAt: "desc" },
      take: 2,
      select: {
        status: true,
        createdAt: true,
      },
    }),
    prisma.consultation.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 2,
      select: {
        type: true,
        createdAt: true,
      },
    }),
    prisma.project.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 2,
      select: {
        title: true,
        updatedAt: true,
      },
    }),
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        createdAt: true,
      },
    }),
    prisma.invoice.count({
      where: {
        userId,
        status: "PAID",
      },
    }),
  ]);

  return {
    projectRecords,
    consultationRecords,
    activeProjectCount,
    recentBriefs,
    recentProposals,
    recentConsultations,
    recentProjects,
    clientRecord,
    paidInvoiceCount,
  };
}
