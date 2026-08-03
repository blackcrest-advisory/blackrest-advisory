import { prisma } from "@/lib/db/client";

export async function getAdminDashboardData() {
  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const yearStart = new Date(now.getFullYear(), 0, 1);

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
    adminUsers,
    totalYTDRevenueResult,
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
      take: 5,
      include: { user: { select: { name: true, companyName: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.project.findMany({
      where: { deadline: { gt: now } },
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
    prisma.user.findMany({
      where: { role: "ADMIN" },
      select: { id: true, name: true, role: true, avatarUrl: true },
    }),
    prisma.invoice.aggregate({
      where: {
        status: "PAID",
        paidAt: { gte: yearStart, lt: nextMonthStart },
      },
      _sum: { amount: true },
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
    adminUsers,
    totalYTDRevenueResult,
  };
}
