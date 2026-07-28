export type ServiceStatus = "active" | "draft" | "paused";

export type AdminService = {
  id: string;
  name: string;
  pillar: "Digital" | "Development" | "Sales" | "Strategy";
  description: string;
  status: ServiceStatus;
  startingPrice: string;
  deliveryWindow: string;
  activeProjects: number;
  newLeads: number;
  conversionRate: number;
  revenue: number;
  deliverables: string[];
};
