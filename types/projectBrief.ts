export type PILLAR =
  | "DIGITAL_MARKETING"
  | "WEBSITE_DEVELOPMENT"
  | "MOBILE_APP"
  | "SALES_SUPPORT"
  | "MIXED";

export interface Brief {
  title: string;
  problem: string;
  pillar: PILLAR;

  budget?: string | null;
  deadline?: string | null;

  attachments?: string[];

  projectGoals?: string | null;
  targetAudience?: string | null;
  referenceLinks?: string | null;
}

export interface BriefResponse extends Brief {
  id: string;
  userId: string;
  status: string;
  assignedTo: string | null;
  createdAt: Date;
  updatedAt: Date;
}
