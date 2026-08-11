export type ProjectRequestStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "ASSIGNED"
  | "CLOSED"
  | "PENDING"
  | "DISCUSSION"
  | "APPROVED"
  | "CONVERTED";

export interface AdminProjectRequest {
  id: string;
  clientName: string;
  companyName?: string;
  title: string;
  pillar: string;
  status: ProjectRequestStatus;
  submittedAt: string;
}
