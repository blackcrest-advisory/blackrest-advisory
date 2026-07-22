export function toDbStatus(status: string): string {
  const statuses: Record<string, string> = {
    active: "ACTIVE",
    completed: "COMPLETED",
    "on-hold": "ON_HOLD",
    planning: "PLANNING",
    "in-review": "IN_REVIEW",
  };

  return statuses[status] ?? "ACTIVE";
}

export function toUiStatus(status: string): string {
  const statuses: Record<string, string> = {
    ACTIVE: "active",
    COMPLETED: "completed",
    ON_HOLD: "on-hold",
    PLANNING: "planning",
    IN_REVIEW: "in-review",
  };

  return statuses[status] ?? "active";
}
