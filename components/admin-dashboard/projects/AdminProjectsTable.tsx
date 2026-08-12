"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { AdminProjectActions } from "./AdminProjectActions";

//===== types =====//
interface ProjectUser {
  id: string;
  name: string | null;
  email: string;
}

interface ProjectProposal {
  id: string;
  brief: {
    title: string;
    pillar: string;
  };
}

interface Project {
  id: string;
  title: string;
  status: string;
  priority: string;
  budget: number | null;
  progress: number;
  serviceType: string | null;
  deadline: Date | null; // ← changed from string | null
  assignedTo: string | null;
  createdAt: Date;
  user: ProjectUser;
  proposal: ProjectProposal;
}

interface AdminProjectsTableProps {
  projects: Project[];
}

export function AdminProjectsTable({ projects }: AdminProjectsTableProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card py-16 text-center">
        <h2 className="text-lg font-semibold text-foreground">
          No projects yet
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Projects are automatically created when a client accepts a proposal.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>
                <div className="max-w-[200px]">
                  <p className="truncate font-medium text-foreground">
                    {project.title}
                  </p>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    #{project.id.slice(-8)}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[120px] truncate">
                  {project.user.name || project.user.email}
                </div>
              </TableCell>
              <TableCell>
                <span className="whitespace-nowrap">
                  {project.serviceType ||
                    project.proposal?.brief?.pillar ||
                    "—"}
                </span>
              </TableCell>
              <TableCell>
                {project.budget ? (
                  <span className="whitespace-nowrap">
                    €{project.budget.toFixed(2)}
                  </span>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-20 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-secondary rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(project.progress, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium">
                    {project.progress}%
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={project.status.toLowerCase()} />
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {project.assignedTo || "Unassigned"}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <AdminProjectActions
                  projectId={project.id}
                  currentStatus={project.status}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
