//===== imports =====//
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { format } from "date-fns";

import {
  ArrowUpRight,
  Banknote,
  BriefcaseBusiness,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  CircleDollarSign,
  Clock3,
  FileText,
  FolderKanban,
  Gauge,
  Layers3,
  Paperclip,
  Tag,
  UserRound,
} from "lucide-react";

import { getAdminUser } from "@/lib/utils/admin-utils";
import { prisma } from "@/lib/db/client";

import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";

import { ProjectProgressUpdate } from "@/components/admin-dashboard/projects/ProjectProgressUpdate";
import { MilestoneList } from "@/components/admin-dashboard/projects/MilestoneList";
import { InvoiceList } from "@/components/admin-dashboard/projects/InvoiceList";
import { FileList } from "@/components/admin-dashboard/projects/FileList";
import { FileUploader } from "@/components/shared/FileUploader";
import { CreateInvoiceModal } from "@/components/admin-dashboard/projects/CreateInvoiceModal";

//===== types =====//
interface AdminProjectDetailPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function AdminProjectDetailPage({
  params,
}: AdminProjectDetailPageProps) {
  //===== auth =====//
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/login");
  }

  const { projectId: id } = await params;

  //===== fetch project with all relations =====//
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          companyName: true,
        },
      },
      proposal: {
        include: {
          brief: true,
        },
      },
      milestones: {
        orderBy: {
          sortOrder: "asc",
        },
      },
      invoices: {
        orderBy: {
          createdAt: "desc",
        },
      },
      files: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  //===== progress =====//
  const totalMilestones = project.milestones.length;

  const completedMilestones = project.milestones.filter(
    (milestone) => milestone.isCompleted,
  ).length;

  //===== compute progress from milestones =====//
  const computedProgress =
    totalMilestones > 0
      ? Math.round((completedMilestones / totalMilestones) * 100)
      : project.progress;

  //===== render =====//
  return (
    <div className="relative space-y-6">
      {/*===== BACK NAVIGATION =====*/}

      <div>
        <Link
          href="/admin/dashboard/projects"
          className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-heading"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card transition-colors hover:border-secondary/25 hover:text-secondary">
            <ChevronLeft className="h-3.5 w-3.5" />
          </span>
          All Projects
        </Link>
      </div>

      {/*===== PROJECT DELIVERY HEADER =====*/}

      <header className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
        {/* top delivery signal */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/30 to-transparent"
        />

        {/* ambient field */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-secondary/[0.055] blur-[110px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-primary/[0.035] blur-[90px]"
        />

        {/* architectural grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden opacity-[0.035] xl:block"
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
            backgroundSize: "88px 88px",
            maskImage:
              "linear-gradient(to right, transparent 15%, black 65%, black)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 15%, black 65%, black)",
          }}
        />

        <div className="relative z-10 grid gap-7 px-5 py-6 sm:px-6 lg:px-8 lg:py-7 xl:grid-cols-[minmax(0,1fr)_300px]">
          {/*===== PROJECT IDENTITY =====*/}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <FolderKanban className="h-3.5 w-3.5 text-secondary" />

                <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                  Delivery project
                </span>
              </div>

              <span className="h-px w-8 bg-secondary/30" />

              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground/40">
                #{project.id.slice(-8)}
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <h1 className="min-w-0 text-2xl font-semibold tracking-[-0.04em] text-heading sm:text-3xl lg:text-[34px]">
                {project.title}
              </h1>

              <StatusBadge status={project.status.toLowerCase()} />
            </div>

            {/* client */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <UserRound className="h-3.5 w-3.5 text-secondary" />

                <span className="font-medium text-heading">
                  {project.user.name || project.user.email}
                </span>
              </span>

              {project.user.companyName && (
                <>
                  <span className="hidden h-3 w-px bg-border sm:block" />

                  <span>{project.user.companyName}</span>
                </>
              )}

              <span className="hidden h-3 w-px bg-border sm:block" />

              <span>{project.user.email}</span>
            </div>

            {/* project metadata */}
            <div className="mt-7 grid gap-4 border-t border-border pt-4 sm:grid-cols-3">
              <HeaderMeta
                icon={Calendar}
                label="Created"
                value={format(new Date(project.createdAt), "MMM d, yyyy")}
              />

              <HeaderMeta
                icon={BriefcaseBusiness}
                label="Service"
                value={
                  project.serviceType || project.proposal?.brief?.pillar || "—"
                }
              />

              <HeaderMeta
                icon={UserRound}
                label="Assigned"
                value={project.assignedTo || "Unassigned"}
              />
            </div>
          </div>

          {/*===== PROGRESS COMMAND =====*/}

          <div className="border-t border-border pt-5 xl:border-l xl:border-t-0 xl:pl-7 xl:pt-0">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-muted-foreground/40">
                  Delivery progress
                </span>

                <div className="mt-2 flex items-end gap-2">
                  <span className="text-4xl font-semibold tracking-[-0.06em] text-heading">
                    {computedProgress}
                  </span>

                  <span className="pb-1 text-sm font-medium text-muted-foreground">
                    %
                  </span>
                </div>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-secondary/15 bg-secondary/[0.05] text-secondary">
                <Gauge className="h-4 w-4" />
              </div>
            </div>

            {/* progress bar */}
            <div className="mt-5 h-1.5 overflow-hidden bg-muted">
              <div
                className="h-full bg-secondary transition-all duration-500"
                style={{
                  width: `${Math.min(computedProgress, 100)}%`,
                }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-[10px] text-muted-foreground">
                {completedMilestones} of {totalMilestones} milestones complete
              </span>

              <span className="h-1.5 w-1.5 rounded-full bg-success"/>
            </div>

            <div className="mt-5 border-t border-border pt-4">
              <ProjectProgressUpdate
                projectId={project.id}
                currentProgress={computedProgress}
              />
            </div>
          </div>
        </div>
      </header>

      {/*===== DELIVERY SNAPSHOT =====*/}

      <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="grid sm:grid-cols-2 xl:grid-cols-4">
          <SnapshotItem
            icon={Banknote}
            eyebrow="Financial"
            label="Project Budget"
            value={project.budget ? `€${project.budget.toFixed(2)}` : "—"}
          />

          <SnapshotItem
            icon={CircleDollarSign}
            eyebrow="Utilization"
            label="Budget Spent"
            value={`€${project.budgetSpent.toFixed(2)}`}
          />

          <SnapshotItem
            icon={Calendar}
            eyebrow="Schedule"
            label="Deadline"
            value={
              project.deadline
                ? format(new Date(project.deadline), "MMM d, yyyy")
                : "—"
            }
          />

          <SnapshotItem
            icon={Tag}
            eyebrow="Delivery"
            label="Priority"
            value={project.priority}
            capitalize
          />
        </div>
      </section>

      {/*===== PROJECT CONTENT =====*/}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.45fr)]">
        {/*===== MAIN COLUMN =====*/}

        <div className="space-y-6">
          {/*===== PROJECT INFORMATION =====*/}

          <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 h-[2px] w-24 bg-secondary/50"
            />

            <PanelHeader
              icon={FileText}
              eyebrow="Engagement record"
              title="Project Information"
              description="Core operational details for this delivery engagement."
            />

            <dl className="grid sm:grid-cols-2">
              <DetailItem
                icon={BriefcaseBusiness}
                label="Service"
                value={
                  project.serviceType || project.proposal?.brief?.pillar || "—"
                }
              />

              <DetailItem
                icon={Banknote}
                label="Budget"
                value={project.budget ? `€${project.budget.toFixed(2)}` : "—"}
              />

              <DetailItem
                icon={Tag}
                label="Priority"
                value={project.priority}
                capitalize
              />

              <DetailItem
                icon={UserRound}
                label="Assigned To"
                value={project.assignedTo || "Unassigned"}
              />

              <DetailItem
                icon={Calendar}
                label="Deadline"
                value={
                  project.deadline
                    ? format(new Date(project.deadline), "MMM d, yyyy")
                    : "—"
                }
              />

              <DetailItem
                icon={CircleDollarSign}
                label="Budget Spent"
                value={`€${project.budgetSpent.toFixed(2)}`}
              />
            </dl>

            <div className="flex items-center gap-2 border-t border-border bg-muted/10 px-5 py-3 sm:px-6">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />

              <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                Project operating record
              </span>
            </div>
          </section>

          {/*===== MILESTONES =====*/}

          <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-secondary">
                  <CheckCircle2 className="h-4 w-4" />
                </div>

                <div>
                  <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40">
                    Delivery sequence
                  </span>

                  <h2 className="mt-0.5 text-sm font-semibold text-heading">
                    Milestones
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-semibold text-heading">
                  {completedMilestones}
                </span>

                <span>/</span>

                <span>{totalMilestones}</span>

                <span>completed</span>
              </div>
            </div>

            <div className="px-5 py-5 sm:px-6">
              <MilestoneList
                projectId={project.id}
                milestones={project.milestones}
              />
            </div>
          </section>

          {/*===== INVOICES =====*/}

          <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-secondary">
                  <CircleDollarSign className="h-4 w-4" />
                </div>

                <div>
                  <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40">
                    Commercial records
                  </span>

                  <h2 className="mt-0.5 text-sm font-semibold text-heading">
                    Invoices
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden text-xs text-muted-foreground sm:block">
                  {project.invoices.length}{" "}
                  {project.invoices.length === 1 ? "invoice" : "invoices"}
                </span>

                <CreateInvoiceModal projectId={project.id} />
              </div>
            </div>

            <div className="px-5 py-5 sm:px-6">
              <InvoiceList invoices={project.invoices} projectId={project.id} />
            </div>
          </section>
        </div>

        {/*===== SIDEBAR =====*/}

        <aside className="space-y-6">
          {/*===== CLIENT RECORD =====*/}

          <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="border-b border-border px-5 py-4">
              <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-secondary">
                Client record
              </span>

              <h2 className="mt-1 text-sm font-semibold text-heading">
                Engagement Owner
              </h2>
            </div>

            <div className="px-5 py-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-secondary/15 bg-secondary/[0.05] text-secondary">
                  <UserRound className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-heading">
                    {project.user.name || project.user.email}
                  </p>

                  {project.user.companyName && (
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {project.user.companyName}
                    </p>
                  )}

                  <p className="mt-2 break-all text-xs text-muted-foreground">
                    {project.user.email}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4">
                <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40">
                  Client ID
                </span>

                <span className="font-mono text-[9px] text-muted-foreground">
                  #{project.user.id.slice(-8)}
                </span>
              </div>
            </div>
          </section>

          {/*===== FILES =====*/}

          <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-secondary">
                  <Paperclip className="h-3.5 w-3.5" />
                </div>

                <div>
                  <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
                    Documents
                  </span>

                  <h2 className="mt-0.5 text-sm font-semibold text-heading">
                    Files
                  </h2>
                </div>
              </div>

              <span className="text-xs font-semibold text-heading">
                {project.files.length}
              </span>
            </div>

            <div className="px-5 py-5">
              <FileList projectId={project.id} files={project.files} />
            </div>
          </section>

          {/*===== FILE UPLOAD =====*/}

          <section className="border border-border bg-card p-4 shadow-[var(--shadow-card)]">
            <div className="mb-3">
              <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
                Add document
              </span>

              <p className="mt-1 text-xs text-muted-foreground">
                Upload a file to this project workspace.
              </p>
            </div>

            <FileUploader projectId={project.id} />
          </section>

          {/*===== ORIGINAL BRIEF =====*/}

          {project.proposal && (
            <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary/50 via-secondary/15 to-transparent"
              />

              <div className="border-b border-border px-5 py-4">
                <div className="flex items-center gap-2">
                  <Layers3 className="h-3.5 w-3.5 text-secondary" />

                  <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
                    Source request
                  </span>
                </div>

                <h2 className="mt-2 text-sm font-semibold text-heading">
                  Original Brief
                </h2>
              </div>

              <div className="px-5 py-5">
                <p className="text-sm font-medium leading-6 text-heading">
                  {project.proposal.brief.title}
                </p>

                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock3 className="h-3.5 w-3.5" />

                  <span>
                    Submitted{" "}
                    {format(
                      new Date(project.proposal.brief.createdAt),
                      "MMM d, yyyy",
                    )}
                  </span>
                </div>

                <Button
                  href={`/admin/dashboard/project-requests/${project.proposal.briefId}`}
                  variant="outline"
                  size="sm"
                  className="mt-5 w-full !rounded-md"
                >
                  View Original Request
                  <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              </div>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}

//==============================================================//
// HEADER META
//==============================================================//

function HeaderMeta({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-secondary" />

        <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
          {label}
        </span>
      </div>

      <p
        className="mt-1.5 truncate text-xs font-medium text-heading"
        title={value}
      >
        {value}
      </p>
    </div>
  );
}

//==============================================================//
// SNAPSHOT ITEM
//==============================================================//

function SnapshotItem({
  icon: Icon,
  eyebrow,
  label,
  value,
  capitalize = false,
}: {
  icon: typeof Banknote;
  eyebrow: string;
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="relative border-b border-border px-5 py-4 sm:border-r xl:border-b-0 xl:last:border-r-0">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
            {eyebrow}
          </span>

          <p className="mt-1 text-xs text-muted-foreground">
            {label}
          </p>

          <p
            className={`
              mt-2
              truncate
              text-sm
              font-semibold
              text-heading

              ${capitalize ? "capitalize" : ""}
            `}
            title={value}
          >
            {value}
          </p>
        </div>

        <Icon className="mt-1 h-4 w-4 shrink-0 text-secondary"/>
      </div>
    </div>
  );
}

//==============================================================//
// PANEL HEADER
//==============================================================//

function PanelHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
}: {
  icon: typeof FileText;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-border px-5 py-4 sm:px-6">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-secondary">
        <Icon className="h-4 w-4" />
      </div>

      <div>
        <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40">
          {eyebrow}
        </span>

        <h2 className="mt-0.5 text-sm font-semibold text-heading">
          {title}
        </h2>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

//==============================================================//
// DETAIL ITEM
//==============================================================//

function DetailItem({
  icon: Icon,
  label,
  value,
  capitalize = false,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="min-w-0 border-b border-border px-5 py-4 sm:border-r sm:px-6 sm:nth-[2n]:border-r-0">
      <dt className="flex items-center gap-2 font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
        <Icon className="h-3.5 w-3.5 text-secondary" />

        {label}
      </dt>

      <dd
        className={`
          mt-2
          break-words
          text-sm
          font-medium
          text-heading

          ${capitalize ? "capitalize" : ""}
        `}
      >
        {value}
      </dd>
    </div>
  );
}
