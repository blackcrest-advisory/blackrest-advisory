import { DashboardWrapper } from "@/components/client-dashboard/overview/DashboardWrapper";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { getClientDashboardData } from "@/lib/data/clientDashboard.data";
import {
  calculateDaysLeft,
  formatActivityTime,
  formatMilestoneDate,
  mapProjectStatus,
} from "@/lib/utils/clientDashboard";
import type {
  Activity,
  ClientRelationshipStats,
  Project,
} from "@/types/dashboard/client/overviewType";
import { redirect } from "next/navigation";

type ActivityRecord = {
  iconName: Activity["iconName"];
  text: string;
  date: Date;
};

export default async function Page() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const {
    projectRecords,
    consultationRecords,
    activeProjectCount,
    recentBriefs,
    recentProposals,
    recentConsultations,
    recentProjects,
    clientRecord,
    paidInvoiceCount,
  } = await getClientDashboardData(user.id);

  const stats = {
    activeProjects: activeProjectCount,
    totalProjects: projectRecords.length,
    completedProjects: projectRecords.filter(
      (project) => project.status === "COMPLETED",
    ).length,
    paidInvoices: paidInvoiceCount,
  };

  const projects: Project[] = projectRecords.map((project) => ({
    id: project.id,
    name: project.title,
    service: project.serviceType ?? "General",
    progress: project.progress ?? 0,
    daysLeft: calculateDaysLeft(project.deadline),
    status: mapProjectStatus(project.status),
  }));

  const milestones = consultationRecords.map((consultation) => ({
    date: formatMilestoneDate(consultation.scheduledAt),
    title: consultation.notes ?? `${consultation.type} Consultation`,
    time: new Date(consultation.scheduledAt).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  const activityRecords: ActivityRecord[] = [
    ...recentBriefs.map((brief) => ({
      iconName: "file" as const,
      text: `New brief submitted: ${brief.title}`,
      date: brief.createdAt,
    })),
    ...recentProposals.map((proposal) => ({
      iconName: "dollar" as const,
      text: `Proposal received: ${proposal.status}`,
      date: proposal.createdAt,
    })),
    ...recentConsultations.map((consultation) => ({
      iconName: "check" as const,
      text: `Consultation scheduled: ${consultation.type}`,
      date: consultation.createdAt,
    })),
    ...recentProjects.map((project) => ({
      iconName: "trending" as const,
      text: `Project update: ${project.title}`,
      date: project.updatedAt,
    })),
  ];

  const activities: Activity[] = activityRecords
    .sort((first, second) => second.date.getTime() - first.date.getTime())
    .slice(0, 5)
    .map(({ iconName, text, date }) => ({
      iconName,
      text,
      time: formatActivityTime(date),
    }));

  const completedProjectCount = projectRecords.filter(
    (project) => project.status === "COMPLETED",
  ).length;

  const relationshipStats: ClientRelationshipStats = {
    partnerSince: clientRecord
      ? new Intl.DateTimeFormat("en", {
          month: "short",
          year: "numeric",
        }).format(clientRecord.createdAt)
      : "—",
    totalProjects: projectRecords.length,
    completedProjects: completedProjectCount,
    paidInvoices: paidInvoiceCount,
  };

  return (
    <DashboardWrapper
      stats={stats}
      projects={projects}
      milestones={milestones}
      activities={activities}
      relationshipStats={relationshipStats}
    />
  );
}
