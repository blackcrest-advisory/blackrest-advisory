"use client";

//===== imports =====//
import { format } from "date-fns";
import Link from "next/link";
import { Eye } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";

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
  deadline: Date | null;
  assignedTo: string | null;
  createdAt: Date;
  user: ProjectUser;
  proposal: ProjectProposal | null;
  milestones: { isCompleted: boolean }[];
  invoices: { status: string; amount: number; currency: string }[];
}

interface ClientProjectsTableProps {
  projects: Project[];
}

export function ClientProjectsTable({ projects }: ClientProjectsTableProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card py-16 text-center">
        <h2 className="text-lg font-semibold text-foreground">
          No projects yet
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          You don&apos;t have any active projects. When you accept a proposal,
          your project will appear here.
        </p>
        <Button
          href="/client/dashboard/project-requests"
          variant="primary"
          size="md"
          className="mt-5"
        >
          View Your Requests
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Invoices</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => {
            const completedMilestones = project.milestones.filter(
              (m) => m.isCompleted,
            ).length;
            const totalMilestones = project.milestones.length;
            const progress =
              totalMilestones > 0
                ? Math.round((completedMilestones / totalMilestones) * 100)
                : project.progress;

            const totalInvoices = project.invoices.length;
            const unpaidInvoices = project.invoices.filter(
              (inv) => inv.status === "SENT" || inv.status === "OVERDUE",
            ).length;

            return (
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
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium">{progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={project.status.toLowerCase()} />
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {totalInvoices > 0 ? (
                      <>
                        {totalInvoices} total
                        {unpaidInvoices > 0 && (
                          <span className="ml-1 text-red-500">
                            ({unpaidInvoices} unpaid)
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/client/dashboard/projects/${project.id}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    <Eye className="h-4 w-4" />
                    <span>View</span>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
