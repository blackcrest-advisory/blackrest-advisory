export type ReportPeriod = "30" | "90" | "year";

export type AdminReportsData = {
  revenue: string;
  revenueChange: number | null;
  deals: number;
  dealsChange: number | null;
  conversion: string;
  conversionChange: number | null;
  activeProjects: number;
  revenueTrend: Array<{ label: string; value: number; display: string }>;
  pipeline: Array<{ label: string; count: number; percentage: number }>;
  services: Array<{
    service: string;
    leads: number;
    won: number;
    revenue: string;
    rate: string;
  }>;
  insights: Array<{
    title: string;
    description: string;
    tone: "positive" | "warning" | "neutral";
  }>;
};
