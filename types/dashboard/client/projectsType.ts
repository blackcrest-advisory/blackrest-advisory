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
  role?: string;
  avatar: string; // URL or initials
}

//===== New: single milestone/task inside a project =====//
export type MilestoneStatus = "pending" | "in-progress" | "completed";

export interface Milestone {
  id: string;
  title: string;
  status: MilestoneStatus;
  dueDate: Date;
}

//===== New: file/deliverable attached to a project =====//
export interface ProjectFile {
  id: string;
  name: string;
  type: "pdf" | "image" | "doc" | "zip" | "figma" | "other";
  size: string; // e.g. "2.4 MB"
  uploadedBy: string;
  uploadedAt: Date;
  url: string;
}

//===== New: activity/timeline log entry =====//
export interface ActivityLog {
  id: string;
  action: string; // e.g. "Milestone completed", "File uploaded"
  performedBy: string;
  timestamp: Date;
}

//===== New: primary contact for the client side of the project =====//
export interface ClientContact {
  name: string;
  email: string;
  phone?: string;
  avatar: string;
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
  budgetSpent: number; // New: amount spent so far, in USD
  timeline: {
    start: Date;
    end: Date;
  };
  progress: number; // 0-100
  assignedTeam: TeamMember[];
  dueDate: Date;
  lastUpdated: Date;

  //===== New fields for details page =====//
  description: string;
  clientContact: ClientContact;
  milestones: Milestone[];
  files: ProjectFile[];
  activity: ActivityLog[];
}
