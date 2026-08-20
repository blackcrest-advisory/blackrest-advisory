"use client";

//===== imports =====//
import { format } from "date-fns";
import Link from "next/link";
import {
  ArrowUpRight,
  FileText,
  FolderKanban,
  ReceiptText,
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
  invoices: {
    status: string;
    amount: number;
    currency: string;
  }[];
}

interface ClientProjectsTableProps {
  projects: Project[];
}

export function ClientProjectsTable({ projects }: ClientProjectsTableProps) {
  if (projects.length === 0) {
    return (
      <div
        className="relative overflow-hidden border border-border bg-card px-6 py-16 text-center shadow-[var(--shadow-card)]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-secondary/[0.08] blur-[90px]"
        />

        <div
          className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center border border-secondary/15 bg-secondary/[0.05] text-secondary"
        >
          <FolderKanban className="h-5 w-5" />
        </div>

        <h2
          className="relative z-10 mt-5 text-lg font-semibold tracking-[-0.02em] text-heading"
        >
          No projects yet
        </h2>

        <p
          className="relative z-10 mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground"
        >
          You don&apos;t have any active projects. When you accept a proposal,
          your project will appear here.
        </p>

        <Button
          href="/client/dashboard/project-requests"
          variant="primary"
          size="md"
          className="relative z-10 mt-6"
        >
          View Your Requests
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <section
      className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
    >
      {/* top line */}
      <div
        className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/40 to-transparent"
      />

      {/*===== TABLE HEADER =====*/}

      <div
        className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
      >
        <div>
          <div className="flex items-center gap-2">
            <FolderKanban className="h-3.5 w-3.5 text-secondary" />

            <span
              className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary"
            >
              Engagement directory
            </span>

            <span className="h-px w-8 bg-secondary/30" />
          </div>

          <h2
            className="mt-2 text-lg font-semibold tracking-[-0.025em] text-heading sm:text-xl"
          >
            Project Portfolio
          </h2>

          <p
            className="mt-1 text-xs leading-5 text-muted-foreground"
          >
            Review progress, service details, invoices, and current project
            status.
          </p>
        </div>

        <div
          className="flex items-center gap-2 border border-border bg-background/60 px-3 py-2"
        >
          <span
            className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40"
          >
            Projects
          </span>

          <span className="h-3 w-px bg-border" />

          <span className="text-xs font-semibold text-heading">
            {projects.length}
          </span>
        </div>
      </div>

      {/*===== DESKTOP TABLE =====*/}

      <div className="hidden overflow-x-auto lg:block">
        <Table>
          <TableHeader>
            <TableRow
              className="border-border bg-muted/20 hover:bg-muted/20"
            >
              <TableHead
                className="h-11 pl-6 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45"
              >
                Project
              </TableHead>

              <TableHead
                className="h-11 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45"
              >
                Service
              </TableHead>

              <TableHead
                className="h-11 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45"
              >
                Budget
              </TableHead>

              <TableHead
                className="h-11 min-w-[170px] font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45"
              >
                Progress
              </TableHead>

              <TableHead
                className="h-11 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45"
              >
                Status
              </TableHead>

              <TableHead
                className="h-11 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45"
              >
                Invoices
              </TableHead>

              <TableHead
                className="h-11 pr-6 text-right font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45"
              >
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.map((project, index) => {
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
                <TableRow
                  key={project.id}
                  className="group/row border-border transition-colors duration-200 hover:bg-secondary/[0.025]"
                >
                  {/* project */}
                  <TableCell className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-background font-mono text-[8px] font-semibold text-muted-foreground/40 transition-all duration-200 group-hover/row:border-secondary/25 group-hover/row:text-secondary"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="min-w-0 max-w-[220px]">
                        <Link
                          href={`/client/dashboard/projects/${project.id}`}
                          className="block truncate text-sm font-semibold text-heading transition-colors hover:text-secondary"
                        >
                          {project.title}
                        </Link>

                        <p
                          className="mt-1 truncate font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground/35"
                        >
                          #{project.id.slice(-8)}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* service */}
                  <TableCell>
                    <span
                      className="max-w-[150px] truncate text-sm text-muted-foreground"
                    >
                      {project.serviceType ||
                        project.proposal?.brief?.pillar ||
                        "—"}
                    </span>
                  </TableCell>

                  {/* budget */}
                  <TableCell>
                    {project.budget ? (
                      <span
                        className="whitespace-nowrap text-sm font-medium text-foreground"
                      >
                        €{project.budget.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>

                  {/* progress */}
                  <TableCell>
                    <div className="flex min-w-[150px] items-center gap-3">
                      <div
                        className="relative h-1.5 flex-1 overflow-hidden bg-muted"
                      >
                        <div
                          className="absolute inset-y-0 left-0 bg-secondary transition-all duration-500"
                          style={{
                            width: `${Math.min(progress, 100)}%`,
                          }}
                        />
                      </div>

                      <span
                        className="w-9 text-right font-mono text-[9px] font-medium text-foreground/70"
                      >
                        {progress}%
                      </span>
                    </div>
                  </TableCell>

                  {/* status */}
                  <TableCell>
                    <StatusBadge status={project.status.toLowerCase()} />
                  </TableCell>

                  {/* invoices */}
                  <TableCell>
                    {totalInvoices > 0 ? (
                      <div>
                        <div className="flex items-center gap-2">
                          <ReceiptText
                            className="h-3.5 w-3.5 text-secondary"
                          />

                          <span
                            className="text-sm font-medium text-foreground"
                          >
                            {totalInvoices}
                          </span>

                          <span
                            className="text-xs text-muted-foreground"
                          >
                            total
                          </span>
                        </div>

                        {unpaidInvoices > 0 && (
                          <p
                            className="mt-1 text-[10px] font-medium text-destructive"
                          >
                            {unpaidInvoices} unpaid
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>

                  {/* action */}
                  <TableCell className="pr-6 text-right">
                    <Link
                      href={`/client/dashboard/projects/${project.id}`}
                      className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-secondary"
                    >
                      View
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                      />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/*===== MOBILE + TABLET PORTFOLIO =====*/}

      <div className="divide-y divide-border lg:hidden">
        {projects.map((project, index) => {
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
            <article
              key={project.id}
              className="group relative px-5 py-5 transition-colors duration-200 hover:bg-secondary/[0.02] sm:px-6"
            >
              {/* heading */}
              <div className="flex items-start gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-background font-mono text-[8px] font-semibold text-muted-foreground/40"
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link
                        href={`/client/dashboard/projects/${project.id}`}
                        className="truncate text-sm font-semibold text-heading transition-colors hover:text-secondary"
                      >
                        {project.title}
                      </Link>

                      <p
                        className="mt-1 font-mono text-[8px] uppercase tracking-[0.1em] text-muted-foreground/35"
                      >
                        #{project.id.slice(-8)}
                      </p>
                    </div>

                    <StatusBadge status={project.status.toLowerCase()} />
                  </div>
                </div>
              </div>

              {/* service / budget */}
              <div
                className="mt-5 grid grid-cols-2 gap-3"
              >
                <div
                  className="border border-border bg-background/50 p-3"
                >
                  <p
                    className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40"
                  >
                    Service
                  </p>

                  <p
                    className="mt-1 truncate text-xs font-medium text-foreground"
                  >
                    {project.serviceType ||
                      project.proposal?.brief?.pillar ||
                      "—"}
                  </p>
                </div>

                <div
                  className="border border-border bg-background/50 p-3"
                >
                  <p
                    className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40"
                  >
                    Budget
                  </p>

                  <p
                    className="mt-1 text-xs font-medium text-foreground"
                  >
                    {project.budget ? `€${project.budget.toFixed(2)}` : "—"}
                  </p>
                </div>
              </div>

              {/* progress */}
              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40"
                  >
                    Delivery progress
                  </span>

                  <span
                    className="font-mono text-[9px] font-semibold text-heading"
                  >
                    {progress}%
                  </span>
                </div>

                <div
                  className="relative h-1.5 overflow-hidden bg-muted"
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-secondary transition-all duration-500"
                    style={{
                      width: `${Math.min(progress, 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* invoice + action */}
              <div
                className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-secondary" />

                  {totalInvoices > 0 ? (
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {totalInvoices}
                      </span>{" "}
                      invoices
                      {unpaidInvoices > 0 && (
                        <span className="ml-1 text-destructive">
                          · {unpaidInvoices} unpaid
                        </span>
                      )}
                    </p>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      No invoices
                    </span>
                  )}
                </div>

                <Link
                  href={`/client/dashboard/projects/${project.id}`}
                  className="group/link flex shrink-0 items-center gap-1.5 text-xs font-semibold text-secondary"
                >
                  View project
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/*===== FOOTER =====*/}

      <div
        className="flex flex-col gap-2 border-t border-border bg-muted/15 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />

          <span
            className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground/40"
          >
            Portfolio tracking active
          </span>
        </div>

        <span className="text-xs text-muted-foreground">
          {projects.length} project{projects.length === 1 ? "" : "s"} in your
          workspace
        </span>
      </div>
    </section>
  );
}
