//===== imports =====//
import { format } from "date-fns";
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
import { ProjectActionsDropdown } from "@/components/admin-dashboard/project-requests/ProjectActionsDropdown";

//===== types =====//
interface BriefForList {
  id: string;
  title: string;
  pillar: string;
  budget: string | null;
  currency: string | null; // new
  status: string;
  createdAt: Date;
  user?: {
    name?: string | null;
    email?: string;
  };
  assignedTo?: string | null;
  deadline?: string | null;
}

interface ProjectRequestsTableProps {
  briefs: BriefForList[];
  basePath: string;
  isAdmin?: boolean;
}

export function ProjectRequestsTable({
  briefs,
  basePath,
  isAdmin = false,
}: ProjectRequestsTableProps) {
  if (briefs.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card py-16 text-center">
        <h2 className="text-lg font-semibold text-foreground">
          No project requests
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {isAdmin
            ? "No requests have been submitted yet."
            : "You haven't submitted any project requests yet."}
        </p>
        {!isAdmin && (
          <Button
            href="/client/dashboard/requests/new"
            variant="primary"
            size="md"
            className="mt-5"
          >
            Submit Your First Request
          </Button>
        )}
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
            <TableHead>Submitted</TableHead>
            {isAdmin && <TableHead>Client</TableHead>}
            {isAdmin && <TableHead>Deadline</TableHead>}
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {briefs.map((brief) => (
            <TableRow key={brief.id}>
              <TableCell>
                <div className="max-w-[200px]">
                  <p className="truncate font-medium text-foreground">
                    {brief.title}
                  </p>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    #{brief.id}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <span className="whitespace-nowrap">
                  {brief.pillar.replace(/_/g, " ")}
                </span>
              </TableCell>

              {/* Budget with currency */}
              <TableCell>
                {brief.budget || brief.currency ? (
                  <span className="whitespace-nowrap">
                    {brief.budget || "—"} {brief.currency || ""}
                  </span>
                ) : (
                  <span className="text-muted-foreground">Not specified</span>
                )}
              </TableCell>

              <TableCell className="whitespace-nowrap">
                {format(brief.createdAt, "MMM d, yyyy")}
              </TableCell>

              {isAdmin && (
                <TableCell>
                  <div className="max-w-[150px] truncate">
                    {brief.user?.name || brief.user?.email || "N/A"}
                  </div>
                </TableCell>
              )}

              {isAdmin && (
                <TableCell>
                  {brief.deadline ? (
                    format(new Date(brief.deadline), "MMM d, yyyy")
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>
              )}

              <TableCell>
                <StatusBadge status={brief.status} />
              </TableCell>

              <TableCell className="text-right">
                <ProjectActionsDropdown
                  briefId={brief.id}
                  currentStatus={brief.status}
                  basePath={basePath}
                  isAdmin={isAdmin}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
