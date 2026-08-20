import "server-only";

import { prisma } from "@/lib/db/client";

export async function getAdminDashboardData() {
  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const [
    totalClients,
    activeProjects,
    newLeads,
    monthlyRevenueResult,
    overdueInvoices,
    recentProjects,
    upcomingProjectDeadlines,
    overdueInvoiceDeadlines,
    recentLeads,
    recentPaidInvoices,
    revenueInvoices,
  ] = await Promise.all([
    prisma.user.count({ where: { role: "CLIENT" } }),
    prisma.project.count({ where: { status: "ACTIVE" } }),
    prisma.lead.count({ where: { status: "NEW" } }),
    prisma.invoice.aggregate({
      where: {
        status: "PAID",
        paidAt: { gte: thisMonthStart, lt: nextMonthStart },
      },
      _sum: { amount: true },
    }),
    prisma.invoice.count({ where: { status: "OVERDUE" } }),
    prisma.project.findMany({
      where: { status: { in: ["ACTIVE", "PLANNING", "IN_REVIEW"] } },
      take: 5,
      include: { user: { select: { name: true, companyName: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.project.findMany({
      where: {
        deadline: { gt: now },
        status: { notIn: ["COMPLETED", "CANCELLED"] },
      },
      take: 3,
      include: { user: { select: { name: true, companyName: true } } },
      orderBy: { deadline: "asc" },
    }),
    prisma.invoice.findMany({
      where: {
        dueDate: { lt: now },
        status: { notIn: ["PAID", "CANCELLED"] },
      },
      take: 3,
      include: { user: { select: { name: true } } },
      orderBy: { dueDate: "asc" },
    }),
    prisma.lead.findMany({ take: 5, orderBy: { createdAt: "desc" } }),
    prisma.invoice.findMany({
      where: { status: "PAID" },
      take: 5,
      include: { user: { select: { name: true } } },
      orderBy: { paidAt: "desc" },
    }),
    prisma.invoice.findMany({
      where: {
        status: "PAID",
        paidAt: { gte: sixMonthsAgo, lt: nextMonthStart },
      },
      select: { amount: true, paidAt: true },
    }),
  ]);

  return {
    totalClients,
    activeProjects,
    newLeads,
    monthlyRevenueResult,
    overdueInvoices,
    recentProjects,
    upcomingProjectDeadlines,
    overdueInvoiceDeadlines,
    recentLeads,
    recentPaidInvoices,
    revenueInvoices,
  };
}
