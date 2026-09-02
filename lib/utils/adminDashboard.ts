export function mapStatus(status: string) {
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

export function mapPriority(priority: string | null) {
  switch (priority) {
    case "low":
    case "high":
    case "critical":
      return priority;
    default:
      return "medium";
  }
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function timeAgo(date: Date): string {
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

export function formatRevenue(value: number): string {
  if (value > 1000) {
    return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  }

  return String(value);
}
