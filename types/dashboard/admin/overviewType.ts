import {
  ProjectStatus,
  ProjectPriority,
} from "@/types/dashboard/client/projectsType";

//===== Aggregate KPI numbers shown in the top stats grid =====//
export interface AdminStats {
  totalClients: number;
  totalClientsChange: number;
  activeProjects: number;
  activeProjectsChange: number;
  newLeads: number;
  newLeadsChange: number;
  monthlyRevenue: number;
  monthlyRevenueChange: number;
  pendingTasks: number;
  overdueInvoices: number;
}

export interface AdminProject {
  id: string;
  name: string;
  clientName: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  deadline: string;
}

export type DeadlineType = "project" | "task" | "invoice";

export interface DeadlineItem {
  id: string;
  title: string;
  clientName: string;
  dueDate: string;
  type: DeadlineType;
}

export type AdminActivityType =
  | "lead"
  | "project"
  | "invoice"
  | "message"
  | "task"
  | "client";

export interface AdminActivity {
  id: string;
  type: AdminActivityType;
  title: string;
  description: string;
  timestamp: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  activeTasks: number;
  capacity: number;
}

export interface FooterStat {
  label: string;
  value: string;
}
