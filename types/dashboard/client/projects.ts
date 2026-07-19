export type ProjectStatus =
  | "active"
  | "completed"
  | "on-hold"
  | "planning"
  | "in-review";
export type ProjectPriority = "low" | "medium" | "high" | "critical";
export type Industry =
  | "Fashion Tech"
  | "IT & Software"
  | "Medical Industry"
  | "Beauty Industry"
  | "Manufacturing / Industrial"
  | "Fintech"
  | "E-commerce"
  | "Education";
export type ServiceType =
  | "Website Development"
  | "Web Application"
  | "Mobile Application"
  | "Digital Marketing"
  | "SEO"
  | "Branding"
  | "UI/UX Design"
  | "Sales & Marketing"
  | "Business Consultation"
  | "Custom Enterprise Solutions";

export interface TeamMember {
  id: string;
  name: string;
  avatar: string; // URL or initials
}

export interface Project {
  id: string;
  name: string;
  clientCompany: string;
  industry: Industry;
  serviceType: ServiceType;
  status: ProjectStatus;
  priority: ProjectPriority;
  budget: number; // in USD
  timeline: {
    start: Date;
    end: Date;
  };
  progress: number; // 0-100
  assignedTeam: TeamMember[];
  dueDate: Date;
  lastUpdated: Date;
}
