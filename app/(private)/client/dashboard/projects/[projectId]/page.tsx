//===== imports =====//
import { notFound, redirect } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  CircleDot,
  FileText,
  FolderKanban,
  Landmark,
  ReceiptText,
  Sparkles,
  Target,
  UserRound,
  WalletCards,
} from "lucide-react";

import { getCurrentUser } from "@/lib/utils/auth-utils";
import { getClientProjectById } from "@/lib/actions/projects/project.action";
import { formatCurrency } from "@/lib/utils/currencies";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";

import { MilestoneList } from "@/components/admin-dashboard/projects/MilestoneList";
import { InvoiceList } from "@/components/admin-dashboard/projects/InvoiceList";
import { FileList } from "@/components/admin-dashboard/projects/FileList";

interface ClientProjectDetailPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function ClientProjectDetailPage({
  params,
}: ClientProjectDetailPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const { projectId: id } = await params;

  //===== fetch project with authorization =====//
  const project = await getClientProjectById(id);

  if (!project) {
    notFound();
  }

  //===== progress calculation =====//
  const totalMilestones = project.milestones.length;

  const completedMilestones = project.milestones.filter(
    (m) => m.isCompleted,
  ).length;

  const progress =
    totalMilestones > 0
      ? Math.round((completedMilestones / totalMilestones) * 100)
      : project.progress;

  const projectCurrency = project.proposal?.currency ?? "EUR";

  return (
    <div className="relative space-y-6">
      {/*===== BACK NAVIGATION =====*/}

      <div>
        <Link
          href="/client/dashboard/projects"
          className="group inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-secondary"
        >
          <ChevronLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5"/>
          My Projects
        </Link>
      </div>

      {/*===== PROJECT HERO =====*/}

      <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
        {/* ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-36 h-[360px] w-[360px] rounded-full bg-secondary/[0.10] blur-[110px]"
        />

        {/* soft secondary glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 left-[20%] h-[280px] w-[280px] rounded-full bg-primary/[0.05] blur-[100px]"
        />

        {/* architectural grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden opacity-[0.055] lg:block"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                var(--color-border) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                var(--color-border) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "110px 110px",
            maskImage:
              "linear-gradient(to right, transparent, black 35%, black)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 35%, black)",
          }}
        />

        {/* top signal */}
        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/45 to-transparent"/>

        <div className="relative z-10 grid gap-8 px-5 py-7 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-stretch lg:px-8 lg:py-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          {/*===== LEFT =====*/}

          <div className="flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <CircleDot className="h-3.5 w-3.5 text-secondary" />

                  <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                    Project workspace
                  </span>
                </div>

                <span className="h-px w-8 bg-secondary/30" />

                <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted-foreground/40">
                  #{project.id.slice(-8)}
                </span>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <h1 className="min-w-0 text-3xl font-semibold leading-[1.06] tracking-[-0.045em] text-heading sm:text-4xl">
                  {project.title}
                </h1>

                <StatusBadge status={project.status.toLowerCase()} />
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                Track delivery progress, milestones, invoices, project files,
                and the commercial details of your engagement.
              </p>

              {/* project meta */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <div className="flex items-center gap-3 border-t border-border pt-3">
                  <UserRound className="h-3.5 w-3.5 text-secondary" />

                  <div className="min-w-0">
                    <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                      Client
                    </p>

                    <p className="mt-1 truncate text-xs font-medium text-foreground">
                      {project.user.name || project.user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-t border-border pt-3">
                  <FolderKanban className="h-3.5 w-3.5 text-secondary" />

                  <div className="min-w-0">
                    <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                      Service
                    </p>

                    <p className="mt-1 truncate text-xs font-medium text-foreground">
                      {project.serviceType ||
                        project.proposal?.brief?.pillar ||
                        "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-t border-border pt-3">
                  <CalendarDays className="h-3.5 w-3.5 text-secondary" />

                  <div>
                    <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                      Started
                    </p>

                    <p className="mt-1 text-xs font-medium text-foreground">
                      {format(new Date(project.createdAt), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {project.user.companyName && (
              <div className="mt-6 flex items-center gap-2">
                <Landmark className="h-3.5 w-3.5 text-muted-foreground/50" />

                <span className="text-xs text-muted-foreground">
                  {project.user.companyName}
                </span>
              </div>
            )}
          </div>

          {/*===== RIGHT — DELIVERY PROGRESS =====*/}

          <div className="relative overflow-hidden border border-secondary/15 bg-secondary/[0.035] p-5 sm:p-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full bg-secondary/[0.12] blur-3xl"
            />

            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Target className="h-3.5 w-3.5 text-secondary" />

                    <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-secondary">
                      Delivery progress
                    </span>
                  </div>

                  <p className="mt-2 text-sm font-medium text-muted-foreground">
                    Current project completion
                  </p>
                </div>

                <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted-foreground/35">
                  LIVE
                </span>
              </div>

              <div className="mt-7">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-5xl font-semibold leading-none tracking-[-0.06em] text-heading">
                      {progress}
                      <span className="ml-1 text-2xl text-secondary">%</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                      Milestones
                    </p>

                    <p className="mt-1 text-sm font-semibold text-heading">
                      {completedMilestones}/{totalMilestones}
                    </p>
                  </div>
                </div>

                <div className="relative mt-5 h-2 overflow-hidden bg-muted">
                  <div
                    className="absolute inset-y-0 left-0 bg-secondary transition-all duration-500"
                    style={{
                      width: `${Math.min(progress, 100)}%`,
                    }}
                  />
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4">
                  <div>
                    <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                      Deadline
                    </p>

                    <p className="mt-1 text-xs font-medium text-foreground">
                      {project.deadline
                        ? format(new Date(project.deadline), "MMM d, yyyy")
                        : "—"}
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                      Priority
                    </p>

                    <p className="mt-1 text-xs font-medium capitalize text-foreground">
                      {project.priority}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*===== PROJECT INFORMATION STRIP =====*/}

      <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/30 to-transparent"/>

        <div className="border-b border-border px-5 py-5 sm:px-6">
          <div className="flex items-center gap-2">
            <FileText className="h-3.5 w-3.5 text-secondary" />

            <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
              Project record
            </span>
          </div>

          <h2 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-heading sm:text-xl">
            Project Information
          </h2>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {[
            {
              label: "Service",
              value:
                project.serviceType || project.proposal?.brief?.pillar || "—",
              icon: FolderKanban,
            },
            {
              label: "Budget",
              value: project.budget
                ? formatCurrency(project.budget, projectCurrency)
                : "—",
              icon: WalletCards,
            },
            {
              label: "Priority",
              value: project.priority,
              icon: Target,
            },
            {
              label: "Assigned To",
              value: project.assignedTo || "Unassigned",
              icon: UserRound,
            },
            {
              label: "Deadline",
              value: project.deadline
                ? format(new Date(project.deadline), "MMM d, yyyy")
                : "—",
              icon: CalendarDays,
            },
            {
              label: "Budget Spent",
              value: formatCurrency(project.budgetSpent, projectCurrency),
              icon: ReceiptText,
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className={`
                  group
                  flex items-start
                  gap-4
                  px-5 py-5
                  transition-colors
                  duration-200
                  hover:bg-secondary/[0.02]
                  sm:px-6

                  ${index > 0 ? "border-t border-border sm:border-t-0" : ""}

                  ${index % 2 !== 0 ? "sm:border-l" : ""}

                  ${index > 1 ? "sm:border-t" : ""}

                  ${index % 3 !== 0 ? "xl:border-l" : ""}

                  ${index > 2 ? "xl:border-t" : ""}
                `}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-secondary/15 bg-secondary/[0.05] text-secondary transition-all duration-200 group-hover:border-secondary/30 group-hover:bg-secondary group-hover:text-secondary-foreground">
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <dt className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40">
                    {item.label}
                  </dt>

                  <dd className="mt-1.5 truncate text-sm font-semibold capitalize text-heading">
                    {item.value}
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>
      </section>

      {/*===== MAIN CONTENT GRID =====*/}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.45fr)]">
        {/*===== LEFT COLUMN =====*/}

        <div className="space-y-6">
          {/* Milestones */}
          <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/35 to-transparent"/>

            <div className="flex flex-col gap-3 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                  Delivery roadmap
                </p>

                <h2 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-heading sm:text-xl">
                  Milestones
                </h2>
              </div>

              <div className="flex items-center gap-2 border border-border bg-background/60 px-3 py-2">
                <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40">
                  Completed
                </span>

                <span className="h-3 w-px bg-border" />

                <span className="text-xs font-semibold text-heading">
                  {completedMilestones}/{totalMilestones}
                </span>
              </div>
            </div>

            <div className="px-5 py-5 sm:px-6">
              <MilestoneList
                projectId={project.id}
                milestones={project.milestones}
                readonly={true}
              />
            </div>

            <div className="flex items-center justify-between border-t border-border bg-muted/15 px-5 py-3.5 sm:px-6">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />

                <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                  Delivery tracking active
                </span>
              </div>

              <span className="text-xs text-muted-foreground">
                {progress}% complete
              </span>
            </div>
          </section>

          {/* Invoices */}
          <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/35 to-transparent"/>

            <div className="flex flex-col gap-3 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                  Commercial record
                </p>

                <h2 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-heading sm:text-xl">
                  Invoices
                </h2>
              </div>

              <div className="flex items-center gap-2 border border-border bg-background/60 px-3 py-2">
                <ReceiptText className="h-3.5 w-3.5 text-secondary" />

                <span className="text-xs font-semibold text-heading">
                  {project.invoices.length}
                </span>
              </div>
            </div>

            <div className="px-5 py-5 sm:px-6">
              <InvoiceList
                invoices={project.invoices}
                readonly={true}
              />
            </div>
          </section>
        </div>

        {/*===== RIGHT SIDEBAR =====*/}

        <aside className="space-y-6">
          {/* Files */}
          <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/35 to-transparent"/>

            <div className="border-b border-border px-5 py-5 sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                    Shared resources
                  </p>

                  <h2 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-heading">
                    Files
                  </h2>
                </div>

                <div className="flex h-9 w-9 items-center justify-center border border-secondary/15 bg-secondary/[0.05] text-secondary">
                  <FileText className="h-4 w-4" />
                </div>
              </div>
            </div>

            <div className="px-5 py-5 sm:px-6">
              <FileList
                projectId={project.id}
                files={project.files}
                readonly={true}
              />
            </div>

            <div className="flex items-center justify-between border-t border-border bg-muted/15 px-5 py-3.5 sm:px-6">
              <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                Shared files
              </span>

              <span className="text-xs font-medium text-heading">
                {project.files.length}
              </span>
            </div>
          </section>

          {/* Original Brief */}
          {project.proposal && (
            <section className="relative overflow-hidden border border-secondary/20 bg-secondary/[0.025] shadow-[var(--shadow-card)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full bg-secondary/[0.08] blur-3xl"
              />

              <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/40 to-transparent"/>

              <div className="relative z-10 px-5 py-5 sm:px-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-secondary" />

                  <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-secondary">
                    Original engagement
                  </span>
                </div>

                <h2 className="mt-3 text-lg font-semibold tracking-[-0.025em] text-heading">
                  Original Brief
                </h2>

                <p className="mt-3 text-sm font-medium leading-6 text-foreground">
                  {project.proposal.brief.title}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                    Submitted
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {format(
                      new Date(project.proposal.brief.createdAt),
                      "MMM d, yyyy",
                    )}
                  </span>
                </div>

                <Button
                  href={`/client/dashboard/project-requests/${project.proposal.briefId}`}
                  variant="outline"
                  size="sm"
                  className="group mt-5 w-full justify-between"
                >
                  View Original Request
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/>
                </Button>
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
