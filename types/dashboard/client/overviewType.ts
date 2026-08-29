export interface Project {
  id: string | number;
  name: string;
  service: string;
  progress: number;
  daysLeft: number;
  status: "on-track" | "review" | "in-progress" | "complete";
}

export interface Milestone {
  date: string;
  title: string;
  time: string;
}

export interface Activity {
  iconName: "file" | "message" | "check" | "dollar" | "trending";
  text: string;
  time: string;
}

export interface Stats {
  activeProjects: number;
  totalProjects: number;
  completedProjects: number;
  paidInvoices: number;
}

export interface ProjectActivityChartData {
  labels: string[];
  projectsStarted: number[];
  milestonesCompleted: number[];
}

export interface ClientRelationshipStats {
  partnerSince: string;
  totalProjects: number;
  completedProjects: number;
  paidInvoices: number;
}
