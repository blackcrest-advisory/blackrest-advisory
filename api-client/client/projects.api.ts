import client from "@/api-client/client";
import type {
  ActivityLog,
  Industry,
  Milestone,
  ProjectFile,
  ProjectPriority,
  ProjectStatus,
  ServiceType,
  TeamMember,
} from "@/types/dashboard/client/projectsType";

export interface SerializedProject {
  id: string;
  name: string;
  clientCompany: string;
  industry: Industry;
  serviceType: ServiceType;
  status: ProjectStatus;
  priority: ProjectPriority;
  budget: number;
  budgetSpent: number;
  timeline: {
    start: string;
    end: string;
  };
  progress: number;
  assignedTeam: TeamMember[];
  dueDate: string;
  lastUpdated: string;
  description: string;
  clientContact: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  milestones: Array<Omit<Milestone, "dueDate"> & { dueDate: string }>;
  files: Array<Omit<ProjectFile, "uploadedAt"> & { uploadedAt: string }>;
  activity: Array<Omit<ActivityLog, "timestamp"> & { timestamp: string }>;
}

export async function fetchClientProjects(): Promise<SerializedProject[]> {
  const response = await client.get<SerializedProject[]>(
    "/api/client/projects/list",
  );
  return response.data;
}

export async function fetchClientProjectById(
  projectId: string,
): Promise<SerializedProject> {
  const response = await client.get<SerializedProject>(
    `/api/client/projects/${projectId}`,
  );
  return response.data;
}
