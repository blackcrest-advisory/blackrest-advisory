import type { Project } from "@/types/dashboard/client/overviewType";

export function mapProjectStatus(status: string): Project["status"] {
  const statuses: Record<string, Project["status"]> = {
    ACTIVE: "in-progress",
    ON_HOLD: "review",
    COMPLETED: "complete",
    PLANNING: "on-track",
    IN_REVIEW: "review",
  };

  return statuses[status] ?? "in-progress";
}

export function formatMilestoneDate(date: Date) {
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

export function formatActivityTime(date: Date) {
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

export function calculateDaysLeft(deadline: Date | null) {
  if (!deadline) {
    return 0;
  }

  return Math.max(
    0,
    Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000),
  );
}
