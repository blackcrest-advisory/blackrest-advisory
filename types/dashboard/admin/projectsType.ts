import type {
  ProjectPriority,
  ProjectStatus,
} from "@/types/dashboard/client/projectsType";

export type AdminProject = {
  id: string;
  name: string;
  clientName: string;
  service: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  manager: string;
  progress: number;
  budget: number;
  budgetSpent: number;
  deadline: string;
  health: "on-track" | "at-risk" | "overdue";
  lastActivity: string;
};

export type ProjectHealth = AdminProject["health"];
