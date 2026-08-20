"use client";

import {
  BriefcaseBusiness,
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

export interface AdminProject {
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
  proposal: ProjectProposal;
}

interface AdminProjectsTableProps {
  projects: AdminProject[];
  emptyMessage?: string;
}

export function AdminProjectsTable({
  projects,
  emptyMessage,
}: AdminProjectsTableProps) {
  //===== empty state =====//
  if (projects.length === 0) {
    return (
      <div
        className="relative flex min-h-[300px] flex-col items-center justify-center overflow-hidden border border-border bg-card px-6 py-12 text-center shadow-[var(--shadow-card)]"
      >
        {/* top signal */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/40 via-secondary/15 to-transparent"
        />

        {/* ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 right-1/2 h-40 w-40 translate-x-1/2 rounded-full bg-secondary/[0.05] blur-[80px]"
        />

        <div
          className="relative z-10 flex h-11 w-11 items-center justify-center rounded-md border border-border bg-muted/20 text-muted-foreground"
        >
          <FolderKanban className="h-4 w-4" />
        </div>

        <span
          className="relative z-10 mt-4 font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary"
        >
          Project portfolio
        </span>

        <h2
          className="relative z-10 mt-2 text-lg font-semibold tracking-[-0.02em] text-heading"
        >
          No projects yet
        </h2>

        <p
          className="relative z-10 mt-2 max-w-md text-sm leading-6 text-muted-foreground"
        >
          {emptyMessage ??
            "Projects are automatically created when a client accepts a proposal."}
        </p>
      </div>
    );
  }

  return (
    <div
      className="relative border border-border bg-card shadow-[var(--shadow-card)]"
    >
      {/* ====================================================== */}
      {/* TOP SIGNAL                                             */}
      {/* ====================================================== */}

      <div
        aria-hidden="true"
        className="absolute left-0 top-0 z-10 h-[2px] w-full bg-gradient-to-r from-secondary/45 via-secondary/15 to-transparent"
      />

      {/* ====================================================== */}
      {/* DESKTOP TABLE                                          */}
      {/* ====================================================== */}

      <div className="hidden overflow-x-auto lg:block">
        <Table>
          <TableHeader>
            <TableRow
              className="border-border bg-muted/15 hover:bg-muted/15"
            >
              <TableHead className="h-11 pl-5">Project</TableHead>

              <TableHead>Client</TableHead>

              <TableHead>Service</TableHead>

              <TableHead>Budget</TableHead>

              <TableHead>Progress</TableHead>

              <TableHead>Status</TableHead>

              <TableHead>Assigned To</TableHead>

              <TableHead className="pr-5 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.map((project) => (
              <TableRow
                key={project.id}
                className="border-border transition-colors duration-200 hover:bg-secondary/[0.025]"
              >
                {/* ================================================== */}
                {/* PROJECT                                            */}
                {/* ================================================== */}

                <TableCell className="py-4 pl-5">
                  <div className="max-w-[220px]">
                    <p
                      className="truncate text-sm font-semibold text-heading"
                    >
                      {project.title}
                    </p>

                    <p
                      className="mt-1 truncate font-mono text-[9px] tracking-[0.05em] text-muted-foreground/45"
                    >
                      #{project.id.slice(-8)}
                    </p>
                  </div>
                </TableCell>

                {/* ================================================== */}
                {/* CLIENT                                             */}
                {/* ================================================== */}

                <TableCell>
                  <div className="max-w-[160px]">
                    <p
                      className="truncate text-sm font-medium text-heading"
                    >
                      {project.user.name || project.user.email}
                    </p>

                    {project.user.name && (
                      <p
                        className="mt-1 truncate text-[10px] text-muted-foreground"
                      >
                        {project.user.email}
                      </p>
                    )}
                  </div>
                </TableCell>

                {/* ================================================== */}
                {/* SERVICE                                            */}
                {/* ================================================== */}

                <TableCell>
                  <span
                    className="inline-flex max-w-[180px] truncate rounded-md border border-border bg-muted/20 px-2.5 py-1 text-[10px] font-medium capitalize text-muted-foreground"
                  >
                    {project.serviceType ||
                      project.proposal?.brief?.pillar ||
                      "—"}
                  </span>
                </TableCell>

                {/* ================================================== */}
                {/* BUDGET                                             */}
                {/* ================================================== */}

                <TableCell>
                  {project.budget ? (
                    <span
                      className="whitespace-nowrap text-sm font-medium text-heading"
                    >
                      €{project.budget.toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </TableCell>

                {/* ================================================== */}
                {/* PROGRESS                                           */}
                {/* ================================================== */}

                <TableCell>
                  <ProjectProgress progress={project.progress} />
                </TableCell>

                {/* ================================================== */}
                {/* STATUS                                             */}
                {/* ================================================== */}

                <TableCell>
                  <StatusBadge status={project.status.toLowerCase()} />
                </TableCell>

                {/* ================================================== */}
                {/* ASSIGNED                                           */}
                {/* ================================================== */}

                <TableCell>
                  <div className="max-w-[150px]">
                    <span
                      className="block truncate text-sm text-muted-foreground"
                      title={project.assignedTo || "Unassigned"}
                    >
                      {project.assignedTo || "Unassigned"}
                    </span>
                  </div>
                </TableCell>

                {/* ================================================== */}
                {/* ACTION                                             */}
                {/* ================================================== */}

                <TableCell className="pr-5 text-right">
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

      {/* ====================================================== */}
      {/* MOBILE + TABLET RECORDS                                */}
      {/* ====================================================== */}

      <div className="divide-y divide-border lg:hidden">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className="relative px-5 py-5 transition-colors duration-200 hover:bg-secondary/[0.02] sm:px-6"
          >
            {/* ================================================== */}
            {/* HEADER                                             */}
            {/* ================================================== */}

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
                      {project.title}
                    </h3>

                    <p
                      className="mt-1 font-mono text-[8px] tracking-[0.05em] text-muted-foreground/40"
                    >
                      #{project.id.slice(-8)}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <AdminProjectActions
                      projectId={project.id}
                      currentStatus={project.status}
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <StatusBadge status={project.status.toLowerCase()} />
                </div>
              </div>
            </div>

            {/* ================================================== */}
            {/* PROGRESS                                           */}
            {/* ================================================== */}

            <div
              className="mt-4 border border-border bg-background/40 p-3"
            >
              <div
                className="flex items-center justify-between gap-3"
              >
                <span
                  className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40"
                >
                  Delivery progress
                </span>

                <span
                  className="text-xs font-semibold text-heading"
                >
                  {project.progress}%
                </span>
              </div>

              <div
                className="mt-2 h-1.5 overflow-hidden bg-muted"
              >
                <div
                  className="h-full bg-secondary transition-all duration-500"
                  style={{
                    width: `${Math.min(project.progress, 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* ================================================== */}
            {/* RECORD DATA                                        */}
            {/* ================================================== */}

            <div
              className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              <RecordItem icon={UserRound} label="Client">
                {project.user.name || project.user.email}
              </RecordItem>

              <RecordItem icon={BriefcaseBusiness} label="Service">
                <span className="capitalize">
                  {project.serviceType ||
                    project.proposal?.brief?.pillar ||
                    "—"}
                </span>
              </RecordItem>

              <RecordItem icon={WalletCards} label="Budget">
                {project.budget ? `€${project.budget.toFixed(2)}` : "—"}
              </RecordItem>

              <RecordItem icon={UserRound} label="Assigned To">
                {project.assignedTo || "Unassigned"}
              </RecordItem>
            </div>

            {/* ================================================== */}
            {/* FOOTER                                             */}
            {/* ================================================== */}

            <div
              className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-secondary"
                />

                <span
                  className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40"
                >
                  Delivery record
                </span>
              </div>

              <span
                className="font-mono text-[7px] uppercase tracking-[0.14em] text-secondary"
              >
                Project
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* ====================================================== */}
      {/* FOOTER                                                 */}
      {/* ====================================================== */}

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
            Portfolio records available
          </span>
        </div>

        <span className="text-xs text-muted-foreground">
          <span className="font-semibold text-heading">{projects.length}</span>{" "}
          {projects.length === 1 ? "project" : "projects"}
        </span>
      </div>
    </div>
  );
}

//==============================================================//
// PROJECT PROGRESS
//==============================================================//

function ProjectProgress({ progress }: { progress: number }) {
  return (
    <div
      className="flex min-w-[125px] items-center gap-2.5"
    >
      <div
        className="h-1.5 w-20 overflow-hidden bg-muted"
      >
        <div
          className="h-full bg-secondary transition-all duration-500"
          style={{
            width: `${Math.min(progress, 100)}%`,
          }}
        />
      </div>

      <span
        className="min-w-[32px] text-right text-[11px] font-semibold text-heading"
      >
        {progress}%
      </span>
    </div>
  );
}

//==============================================================//
// MOBILE RECORD ITEM
//==============================================================//

function RecordItem({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof UserRound;
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
        className="mt-2 min-w-0 break-words text-xs font-medium text-heading"
      >
        {children}
      </div>
    </div>
  );
}
