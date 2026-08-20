//===== imports =====//
import { format } from "date-fns";
import {
  CalendarDays,
  FileText,
  FolderKanban,
  UserRound,
  WalletCards,
} from "lucide-react";

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
  currency: string | null;
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
  emptyMessage?: string;
}

export function ProjectRequestsTable({
  briefs,
  basePath,
  isAdmin = false,
  emptyMessage,
}: ProjectRequestsTableProps) {
  //===== empty state =====//
  if (briefs.length === 0) {
    return (
      <div
        className="relative flex min-h-[300px] flex-col items-center justify-center overflow-hidden border border-border bg-card px-6 py-12 text-center shadow-[var(--shadow-card)]"
      >
        {/* top signal */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/20 to-transparent"
        />

        {/* subtle glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 right-1/2 h-40 w-40 translate-x-1/2 rounded-full bg-secondary/[0.06] blur-[80px]"
        />

        <div
          className="relative z-10 flex h-11 w-11 items-center justify-center rounded-md border border-border bg-muted/20 text-muted-foreground"
        >
          <FolderKanban className="h-4 w-4" />
        </div>

        <span
          className="relative z-10 mt-4 font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary"
        >
          Request inventory
        </span>

        <h2
          className="relative z-10 mt-2 text-lg font-semibold tracking-[-0.02em] text-heading"
        >
          No project requests
        </h2>

        <p
          className="relative z-10 mt-2 max-w-md text-sm leading-6 text-muted-foreground"
        >
          {emptyMessage ??
            (isAdmin
              ? "No requests have been submitted yet."
              : "You haven't submitted any project requests yet.")}
        </p>

        {!isAdmin && (
          <Button
            href="/client/dashboard/requests/new"
            variant="primary"
            size="md"
            className="relative z-10 mt-5"
          >
            Submit Your First Request
          </Button>
        )}
      </div>
    );
  }

  return (
    <div
      className="relative border border-border bg-card shadow-[var(--shadow-card)]"
    >
      {/*===== TOP SIGNAL =====*/}

      <div
        aria-hidden="true"
        className="absolute left-0 top-0 z-10 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/15 to-transparent"
      />

      {/*===== DESKTOP TABLE =====*/}

      <div className="hidden overflow-x-auto lg:block">
        <Table>
          <TableHeader>
            <TableRow
              className="border-border bg-muted/15 hover:bg-muted/15"
            >
              <TableHead className="h-11 pl-5">Project</TableHead>

              <TableHead>Service</TableHead>

              <TableHead>Budget</TableHead>

              <TableHead>Submitted</TableHead>

              {isAdmin && <TableHead>Client</TableHead>}

              {isAdmin && <TableHead>Deadline</TableHead>}

              <TableHead>Status</TableHead>

              <TableHead className="pr-5 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {briefs.map((brief) => (
              <TableRow
                key={brief.id}
                className="border-border transition-colors duration-200 hover:bg-secondary/[0.025]"
              >
                {/*===== PROJECT =====*/}

                <TableCell className="py-4 pl-5">
                  <div className="max-w-[220px]">
                    <p
                      className="truncate text-sm font-semibold text-heading"
                    >
                      {brief.title}
                    </p>

                    <p
                      className="mt-1 truncate font-mono text-[9px] tracking-[0.05em] text-muted-foreground/45"
                    >
                      #{brief.id}
                    </p>
                  </div>
                </TableCell>

                {/*===== SERVICE =====*/}

                <TableCell>
                  <span
                    className="inline-flex whitespace-nowrap rounded-md border border-border bg-muted/20 px-2.5 py-1 text-[10px] font-medium capitalize text-muted-foreground"
                  >
                    {brief.pillar.replace(/_/g, " ")}
                  </span>
                </TableCell>

                {/*===== BUDGET =====*/}

                <TableCell>
                  {brief.budget || brief.currency ? (
                    <span
                      className="whitespace-nowrap text-sm font-medium text-heading"
                    >
                      {brief.budget || "—"}{" "}
                      <span className="text-muted-foreground">
                        {brief.currency || ""}
                      </span>
                    </span>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Not specified
                    </span>
                  )}
                </TableCell>

                {/*===== SUBMITTED =====*/}

                <TableCell>
                  <span
                    className="whitespace-nowrap text-sm text-muted-foreground"
                  >
                    {format(brief.createdAt, "MMM d, yyyy")}
                  </span>
                </TableCell>

                {/*===== CLIENT =====*/}

                {isAdmin && (
                  <TableCell>
                    <div className="max-w-[170px]">
                      <p
                        className="truncate text-sm font-medium text-heading"
                      >
                        {brief.user?.name || brief.user?.email || "N/A"}
                      </p>

                      {brief.user?.name && brief.user?.email && (
                        <p
                          className="mt-1 truncate text-[10px] text-muted-foreground"
                        >
                          {brief.user.email}
                        </p>
                      )}
                    </div>
                  </TableCell>
                )}

                {/*===== DEADLINE =====*/}

                {isAdmin && (
                  <TableCell>
                    {brief.deadline ? (
                      <span
                        className="whitespace-nowrap text-sm text-muted-foreground"
                      >
                        {format(new Date(brief.deadline), "MMM d, yyyy")}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                )}

                {/*===== STATUS =====*/}

                <TableCell>
                  <StatusBadge status={brief.status} />
                </TableCell>

                {/*===== ACTION =====*/}

                <TableCell className="pr-5 text-right">
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

      {/*===== MOBILE + TABLET RECORDS =====*/}

      <div className="divide-y divide-border lg:hidden">
        {briefs.map((brief, index) => (
          <article
            key={brief.id}
            className="relative px-5 py-5 transition-colors duration-200 hover:bg-secondary/[0.02] sm:px-6"
          >
            {/*===== RECORD HEADER =====*/}

            <div className="flex items-start gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background font-mono text-[8px] font-semibold text-muted-foreground/45"
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="min-w-0 flex-1">
                <div
                  className="flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <h3
                      className="truncate text-sm font-semibold text-heading"
                    >
                      {brief.title}
                    </h3>

                    <p
                      className="mt-1 truncate font-mono text-[8px] tracking-[0.04em] text-muted-foreground/40"
                    >
                      #{brief.id}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <ProjectActionsDropdown
                      briefId={brief.id}
                      currentStatus={brief.status}
                      basePath={basePath}
                      isAdmin={isAdmin}
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <StatusBadge status={brief.status} />
                </div>
              </div>
            </div>

            {/*===== SERVICE + BUDGET =====*/}

            <div
              className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              <RecordItem icon={FileText} label="Service">
                <span className="capitalize">
                  {brief.pillar.replace(/_/g, " ")}
                </span>
              </RecordItem>

              <RecordItem icon={WalletCards} label="Budget">
                {brief.budget || brief.currency ? (
                  <>
                    {brief.budget || "—"} {brief.currency || ""}
                  </>
                ) : (
                  "Not specified"
                )}
              </RecordItem>
            </div>

            {/*===== ADMIN DATA =====*/}

            {isAdmin && (
              <div
                className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                <RecordItem icon={UserRound} label="Client">
                  <span className="break-words">
                    {brief.user?.name || brief.user?.email || "N/A"}
                  </span>
                </RecordItem>

                <RecordItem icon={CalendarDays} label="Deadline">
                  {brief.deadline
                    ? format(new Date(brief.deadline), "MMM d, yyyy")
                    : "—"}
                </RecordItem>
              </div>
            )}

            {/*===== FOOTER =====*/}

            <div
              className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4"
            >
              <div
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <CalendarDays
                  className="h-3.5 w-3.5 text-secondary"
                />

                <span>Submitted {format(brief.createdAt, "MMM d, yyyy")}</span>
              </div>

              <span
                className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/35"
              >
                Request
              </span>
            </div>
          </article>
        ))}
      </div>

      {/*===== FOOTER =====*/}

      <div
        className="flex flex-col gap-2 border-t border-border bg-muted/10 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
      >
        <div className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full bg-success"
          />

          <span
            className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40"
          >
            Request records available
          </span>
        </div>

        <span className="text-xs text-muted-foreground">
          <span className="font-semibold text-heading">{briefs.length}</span>{" "}
          {briefs.length === 1 ? "request" : "requests"}
        </span>
      </div>
    </div>
  );
}

//==============================================================//
// RECORD ITEM
//==============================================================//

function RecordItem({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof FileText;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-md border border-border bg-background/40 p-3"
    >
      <div className="flex items-center gap-1.5">
        <Icon
          className="h-3.5 w-3.5 text-secondary"
        />

        <span
          className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40"
        >
          {label}
        </span>
      </div>

      <div
        className="mt-2 text-xs font-medium text-heading"
      >
        {children}
      </div>
    </div>
  );
}
