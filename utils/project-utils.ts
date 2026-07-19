import type { Project } from "@/types/project";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoDate));
}

export function formatRelativeTime(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const diffMinutes = Math.round(diffMs / 60000);

  if (diffMinutes < 60) return `${Math.max(diffMinutes, 1)}m ago`;

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;

  const diffMonths = Math.round(diffDays / 30);
  return `${diffMonths}mo ago`;
}

export function getDaysUntilDue(isoDate: string): number {
  const diffMs = new Date(isoDate).getTime() - Date.now();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function getDueDateLabel(isoDate: string): {
  label: string;
  isOverdue: boolean;
} {
  const days = getDaysUntilDue(isoDate);
  if (days < 0) return { label: `${Math.abs(days)}d overdue`, isOverdue: true };
  if (days === 0) return { label: "Due today", isOverdue: false };
  return { label: `${days}d left`, isOverdue: false };
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export interface ProjectStatsSummary {
  activeCount: number;
  completedCount: number;
  totalBudget: number;
  atRiskCount: number;
}

export function computeProjectStats(projects: Project[]): ProjectStatsSummary {
  const activeCount = projects.filter(
    (p) => p.status === "in-progress" || p.status === "in-review",
  ).length;

  const completedCount = projects.filter(
    (p) => p.status === "completed",
  ).length;

  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);

  const atRiskCount = projects.filter((p) => {
    if (p.status === "completed") return false;
    const daysLeft = getDaysUntilDue(p.dueDate);
    return (
      daysLeft < 14 || p.priority === "urgent" || p.status === "on-hold"
    );
  }).length;

  return { activeCount, completedCount, totalBudget, atRiskCount };
}

export function filterAndSortProjects(
  projects: Project[],
  filters: {
    search: string;
    status: string;
    industry: string;
    serviceType: string;
    sortBy: string;
  },
): Project[] {
  const query = filters.search.trim().toLowerCase();

  const filtered = projects.filter((project) => {
    const matchesSearch =
      query.length === 0 ||
      project.name.toLowerCase().includes(query) ||
      project.clientCompany.toLowerCase().includes(query);

    const matchesStatus =
      filters.status === "all" || project.status === filters.status;

    const matchesIndustry =
      filters.industry === "all" || project.industry === filters.industry;

    const matchesServiceType =
      filters.serviceType === "all" ||
      project.serviceType === filters.serviceType;

    return (
      matchesSearch && matchesStatus && matchesIndustry && matchesServiceType
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (filters.sortBy) {
      case "dueDate":
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case "budget":
        return b.budget - a.budget;
      case "progress":
        return b.progress - a.progress;
      case "recent":
      default:
        return (
          new Date(b.lastUpdated).getTime() -
          new Date(a.lastUpdated).getTime()
        );
    }
  });

  return sorted;
}
