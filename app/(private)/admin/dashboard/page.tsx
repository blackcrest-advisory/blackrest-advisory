import { redirect } from "next/navigation";
import { AdminDashboardWrapper } from "@/components/admin-dashboard/overview/AdminDashboardWrapper";
import { getAdminUser } from "@/lib/utils/admin-utils";
import { prisma } from "@/lib/db/client";
import type {
  AdminActivity,
  AdminProject,
  AdminStats,
  DeadlineItem,
  FooterStat,
  TeamMember,
} from "@/types/dashboard/admin/overviewType";
import type {
  ProjectPriority,
  ProjectStatus,
} from "@/types/dashboard/client/projectsType";

function mapStatus(status: string): ProjectStatus {
  switch (status) {
    case "ACTIVE":
      return "active";
    case "COMPLETED":
      return "completed";
    case "ON_HOLD":
      return "on-hold";
    case "PLANNING":
      return "planning";
    case "IN_REVIEW":
      return "in-review";
    default:
      return "active";
  }
}

function mapPriority(priority: string | null): ProjectPriority {
  switch (priority) {
    case "low":
    case "high":
    case "critical":
      return priority;
    default:
      return "medium";
  }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function timeAgo(date: Date): string {
  const difference = Math.max(0, Date.now() - date.getTime());
  const minutes = Math.floor(difference / 60000);

  if (minutes < 60) {
    return `${minutes} minutes ago`;
  }

  const hours = Math.floor(difference / 3600000);

  if (hours < 24) {
    return `${hours} hours ago`;
  }

  return `${Math.floor(difference / 86400000)} days ago`;
}

function formatRevenue(value: number): string {
  if (value > 1000) {
    return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  }

  return String(value);
}

export default async function AdminDashboardPage() {
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/login");
  }

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
      include: {
        user: { select: { name: true, companyName: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.project.findMany({
      where: { deadline: { gt: now } },
      take: 3,
      include: {
        user: { select: { name: true, companyName: true } },
      },
      orderBy: { deadline: "asc" },
    }),
    prisma.invoice.findMany({
      where: {
        dueDate: { lt: now },
        status: { notIn: ["PAID", "CANCELLED"] },
      },
      take: 3,
      include: {
        user: { select: { name: true } },
      },
      orderBy: { dueDate: "asc" },
    }),
    prisma.lead.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    prisma.invoice.findMany({
      where: { status: "PAID" },
      take: 5,
      include: {
        user: { select: { name: true } },
      },
      orderBy: { paidAt: "desc" },
    }),
    prisma.user.findMany({
      where: { role: "ADMIN" },
      select: {
        id: true,
        name: true,
        role: true,
        avatarUrl: true,
      },
    }),
    prisma.invoice.aggregate({
      where: {
        status: "PAID",
        paidAt: { gte: yearStart, lt: nextMonthStart },
      },
      _sum: { amount: true },
    }),
  ]);

  const monthlyRevenue = monthlyRevenueResult._sum.amount ?? 0;
  const totalYTDRevenue = totalYTDRevenueResult._sum.amount ?? 0;
  const stats: AdminStats = {
    totalClients,
    totalClientsChange: 0,
    activeProjects,
    activeProjectsChange: 0,
    newLeads,
    newLeadsChange: 0,
    monthlyRevenue,
    monthlyRevenueChange: 0,
    pendingTasks: 0,
    overdueInvoices,
  };
  const projects: AdminProject[] = recentProjects.map((project) => ({
    id: project.id,
    name: project.title,
    clientName: project.user.companyName ?? project.user.name,
    status: mapStatus(project.status),
    priority: mapPriority(project.priority),
    progress: project.progress ?? 0,
    deadline: project.deadline ? formatDate(project.deadline) : "No deadline",
  }));
  const deadlines: DeadlineItem[] = [
    ...upcomingProjectDeadlines.map((project) => ({
      id: project.id,
      title: project.title,
      clientName: project.user.companyName ?? project.user.name,
      dueDate: formatDate(project.deadline ?? project.createdAt),
      type: "project" as const,
      date: project.deadline ?? project.createdAt,
    })),
    ...overdueInvoiceDeadlines.map((invoice) => ({
      id: invoice.id,
      title: `Invoice ${invoice.invoiceNumber} due`,
      clientName: invoice.user.name,
      dueDate: formatDate(invoice.dueDate ?? invoice.createdAt),
      type: "invoice" as const,
      date: invoice.dueDate ?? invoice.createdAt,
    })),
  ]
    .sort((first, second) => first.date.getTime() - second.date.getTime())
    .slice(0, 5)
    .map((deadline) => ({
      id: deadline.id,
      title: deadline.title,
      clientName: deadline.clientName,
      dueDate: deadline.dueDate,
      type: deadline.type,
    }));
  const activities: AdminActivity[] = [
    ...recentLeads.map((lead) => ({
      id: lead.id,
      type: "lead" as const,
      title: "New lead received",
      description: `${lead.name} submitted a request`,
      timestamp: timeAgo(lead.createdAt),
      date: lead.createdAt,
    })),
    ...recentPaidInvoices.map((invoice) => ({
      id: invoice.id,
      type: "invoice" as const,
      title: "Invoice paid",
      description: `${invoice.user.name} paid invoice ${invoice.invoiceNumber}`,
      timestamp: timeAgo(invoice.paidAt ?? invoice.updatedAt),
      date: invoice.paidAt ?? invoice.updatedAt,
    })),
    ...recentProjects.map((project) => ({
      id: project.id,
      type: "project" as const,
      title: "Project updated",
      description: `${project.title} was updated`,
      timestamp: timeAgo(project.updatedAt),
      date: project.updatedAt,
    })),
  ]
    .sort((first, second) => second.date.getTime() - first.date.getTime())
    .slice(0, 5)
    .map((activity) => ({
      id: activity.id,
      type: activity.type,
      title: activity.title,
      description: activity.description,
      timestamp: activity.timestamp,
    }));
  const teamMembers: TeamMember[] = adminUsers.map((user) => ({
    id: user.id,
    name: user.name,
    role: user.role,
    avatarUrl: user.avatarUrl ?? undefined,
    activeTasks: 0,
    capacity: 0,
  }));
  const footerStats: FooterStat[] = [
    {
      label: "Total Revenue (YTD)",
      value: `€${formatRevenue(totalYTDRevenue)}`,
    },
    { label: "Active Clients", value: String(totalClients) },
    { label: "Active Projects", value: String(activeProjects) },
    { label: "Overdue Invoices", value: String(overdueInvoices) },
  ];

  return (
    <AdminDashboardWrapper
      adminName={admin.name}
      stats={stats}
      projects={projects}
      deadlines={deadlines}
      activities={activities}
      teamMembers={teamMembers}
      footerStats={footerStats}
    />
  );
}
