import { DashboardWrapper } from "@/components/client-dashboard/overview/DashboardWrapper";
import { getCurrentUser } from "@/lib/auth-utils";
import { prisma } from "@/lib/db/client";
import type {
  Activity,
  Project,
} from "@/types/dashboard/client/overviewType";
import { redirect } from "next/navigation";

function mapProjectStatus(status: string): Project["status"] {
  const statuses: Record<string, Project["status"]> = {
    ACTIVE: "in-progress",
    ON_HOLD: "review",
    COMPLETED: "complete",
    PLANNING: "on-track",
    IN_REVIEW: "review",
  };

  return statuses[status] ?? "in-progress";
}

function formatMilestoneDate(date: Date) {
  const milestoneDate = new Date(date);
  milestoneDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (milestoneDate.getTime() === today.getTime()) {
    return "Today";
  }

  if (milestoneDate.getTime() === tomorrow.getTime()) {
    return "Tomorrow";
  }

  return milestoneDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
}

function formatActivityTime(date: Date) {
  const elapsed = Math.max(0, Date.now() - new Date(date).getTime());
  const hours = Math.floor(elapsed / 3600000);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days}d ago`;
  }

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
}

function calculateDaysLeft(deadline: Date | null) {
  if (!deadline) {
    return 0;
  }

  return Math.max(
    0,
    Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000),
  );
}

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

  const [
    projectRecords,
    consultationRecords,
    activeProjectCount,
    recentBriefs,
    recentProposals,
    recentConsultations,
    recentProjects,
  ] = await Promise.all([
    prisma.project.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
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
        userId: user.id,
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
      },
      orderBy: {
        scheduledAt: "asc",
      },
      select: {
        id: true,
        scheduledAt: true,
        type: true,
        notes: true,
      },
    }),
    prisma.project.count({
      where: {
        userId: user.id,
        status: "ACTIVE",
      },
    }),
    prisma.brief.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 2,
      select: {
        title: true,
        createdAt: true,
      },
    }),
    prisma.proposal.findMany({
      where: {
        brief: {
          userId: user.id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 2,
      select: {
        status: true,
        createdAt: true,
      },
    }),
    prisma.consultation.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 2,
      select: {
        type: true,
        createdAt: true,
      },
    }),
    prisma.project.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 2,
      select: {
        title: true,
        updatedAt: true,
      },
    }),
  ]);

  const stats = {
    activeProjects: activeProjectCount,
    leadsGenerated: 0,
    conversionRate: 0,
    revenueImpact: 0,
    change: {
      leads: "—",
      conversion: "—",
      revenue: "—",
    },
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

  return (
    <DashboardWrapper
      stats={stats}
      projects={projects}
      milestones={milestones}
      activities={activities}
    />
  );
}
