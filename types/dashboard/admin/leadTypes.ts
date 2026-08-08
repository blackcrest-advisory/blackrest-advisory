//===== Lead types for admin dashboard =====//

export interface LeadInquiryPayload {
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  industry?: string;
  projectType?: string;
  projectTitle: string;
  budget?: string;
  timeline?: string;
  currency?: string;
  description: string;
  services?: string[];
  source?: string;
}

export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal-sent"
  | "negotiation"
  | "won"
  | "lost";

export type LeadPriority = "high" | "medium" | "low";

export type LeadService =
  | "web-development"
  | "mobile-app"
  | "digital-marketing"
  | "branding"
  | "seo";

export interface Lead {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  industry: string;
  companySize?: string;
  location: string;
  website?: string;
  services: LeadService[];
  status: LeadStatus;
  priority: LeadPriority;
  budget?: string; // e.g. "$5k–10k"
  assignedTo: string; // sales person name
  lastContacted?: Date;
  nextFollowUp?: Date;
  notes?: string;
  createdAt: Date;
}

//===== Utility maps for labels and colours (used by badges) =====//
export const leadStatusLabels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  "proposal-sent": "Proposal Sent",
  negotiation: "Negotiation",
  won: "Won",
  lost: "Lost",
};

export const leadStatusStyles: Record<LeadStatus, string> = {
  new: "bg-blue-500/15 text-blue-600 border-blue-500/30",
  contacted: "bg-cyan-500/15 text-cyan-600 border-cyan-500/30",
  qualified: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
  "proposal-sent": "bg-purple-500/15 text-purple-600 border-purple-500/30",
  negotiation: "bg-amber-500/15 text-amber-600 border-amber-500/30",
  won: "bg-green-500/15 text-green-600 border-green-500/30",
  lost: "bg-red-500/15 text-red-600 border-red-500/30",
};

export const leadPriorityLabels: Record<LeadPriority, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

export const leadPriorityStyles: Record<LeadPriority, string> = {
  high: "bg-red-500/15 text-red-600 border-red-500/30",
  medium: "bg-orange-500/15 text-orange-600 border-orange-500/30",
  low: "bg-blue-500/15 text-blue-600 border-blue-500/30",
};

export const serviceLabels: Record<LeadService, string> = {
  "web-development": "Web Development",
  "mobile-app": "Mobile App",
  "digital-marketing": "Digital Marketing",
  branding: "Branding",
  seo: "SEO",
};
