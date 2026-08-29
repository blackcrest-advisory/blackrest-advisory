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
  leadsGenerated: number;
  conversionRate: number;
  revenueImpact: number;
  change: {
    leads: string;
    conversion: string;
    revenue: string;
  };
}

export interface ClientRelationshipStats {
  partnerSince: string;
  totalProjects: number;
  completedProjects: number;
  paidInvoices: number;
}
