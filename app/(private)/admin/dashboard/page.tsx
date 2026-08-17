import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/utils/admin-utils";
import { getAdminDashboardData } from "@/lib/data/adminDashboardData";
import {
  formatDate,
  mapPriority,
  mapStatus,
  timeAgo,
} from "@/lib/utils/adminDashboard";
import type {
  AdminActivity,
  AdminProject,
  AdminStats,
  DeadlineItem,
  RevenuePoint,
} from "@/types/dashboard/admin/overviewType";
import { AdminDashboardWrapper } from "@/components/admin-dashboard/overview/AdminDashboardWrapper";

export default async function AdminDashboardPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/login");

  const data = await getAdminDashboardData();
  const monthlyRevenue = data.monthlyRevenueResult._sum.amount ?? 0;

  const stats: AdminStats = {
    totalClients: data.totalClients,
    totalClientsChange: 0,
    activeProjects: data.activeProjects,
    activeProjectsChange: 0,
    newLeads: data.newLeads,
    newLeadsChange: 0,
    monthlyRevenue,
    monthlyRevenueChange: 0,
    overdueInvoices: data.overdueInvoices,
  };

  const projects: AdminProject[] = data.recentProjects.map((project) => ({
    id: project.id,
    name: project.title,
    clientName: project.user.companyName ?? project.user.name,
    status: mapStatus(project.status),
    priority: mapPriority(project.priority),
    progress: project.progress ?? 0,
    deadline: project.deadline ? formatDate(project.deadline) : "No deadline",
  }));

  const deadlines: DeadlineItem[] = [
    ...data.upcomingProjectDeadlines.map((project) => ({
      id: project.id,
      title: project.title,
      clientName: project.user.companyName ?? project.user.name,
      dueDate: formatDate(project.deadline ?? project.createdAt),
      type: "project" as const,
      date: project.deadline ?? project.createdAt,
    })),
    ...data.overdueInvoiceDeadlines.map((invoice) => ({
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
    ...data.recentLeads.map((lead) => ({
      id: lead.id,
      type: "lead" as const,
      title: "New lead received",
      description: `${lead.name} submitted a request`,
      timestamp: timeAgo(lead.createdAt),
      date: lead.createdAt,
    })),
    ...data.recentPaidInvoices.map((invoice) => ({
      id: invoice.id,
      type: "invoice" as const,
      title: "Invoice paid",
      description: `${invoice.user.name} paid invoice ${invoice.invoiceNumber}`,
      timestamp: timeAgo(invoice.paidAt ?? invoice.updatedAt),
      date: invoice.paidAt ?? invoice.updatedAt,
    })),
    ...data.recentProjects.map((project) => ({
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

  const revenue: RevenuePoint[] = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 5 + index,
      1,
    );
    const value = data.revenueInvoices
      .filter(
        (invoice) =>
          invoice.paidAt?.getFullYear() === date.getFullYear() &&
          invoice.paidAt?.getMonth() === date.getMonth(),
      )
      .reduce((total, invoice) => total + invoice.amount, 0);

    return {
      label: new Intl.DateTimeFormat("en", { month: "short" }).format(date),
      value,
    };
  });

  return (
    <AdminDashboardWrapper
      adminName={admin.name}
      stats={stats}
      revenue={revenue}
      projects={projects}
      deadlines={deadlines}
      activities={activities}
    />
  );
}
