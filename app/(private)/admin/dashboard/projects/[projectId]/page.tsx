//===== imports =====//
import { notFound, redirect } from "next/navigation";
import { format } from "date-fns";
import { getAdminUser } from "@/lib/utils/admin-utils";
import { prisma } from "@/lib/db/client";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import {
  ChevronLeft,
  Calendar,
  DollarSign,
  Tag,
  User,
  Paperclip,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { ProjectProgressUpdate } from "@/components/admin-dashboard/projects/ProjectProgressUpdate";
import { MilestoneList } from "@/components/admin-dashboard/projects/MilestoneList";
import { InvoiceList } from "@/components/admin-dashboard/projects/InvoiceList";
import { FileList } from "@/components/admin-dashboard/projects/FileList";
import { FileUploader } from "@/components/shared/FileUploader";
import { CreateInvoiceModal } from "@/components/admin-dashboard/projects/CreateInvoiceModal";

interface AdminProjectDetailPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function AdminProjectDetailPage({
  params,
}: AdminProjectDetailPageProps) {
  const admin = await getAdminUser();
  if (!admin) {
    redirect("/login");
  }

  const { projectId: id } = await params;

  //===== fetch project with all relations =====//
  const project = await prisma.project.findUnique({
    where: { id },
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
        orderBy: { sortOrder: "asc" },
      },
      invoices: {
        orderBy: { createdAt: "desc" },
      },
      files: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!project) {
    notFound();
  }

  const totalMilestones = project.milestones.length;
  const completedMilestones = project.milestones.filter(
    (m) => m.isCompleted,
  ).length;

  //===== compute progress from milestones (redundant but safe) =====//
  const computedProgress =
    totalMilestones > 0
      ? Math.round((completedMilestones / totalMilestones) * 100)
      : project.progress;

  return (
    <PageWrapper>
      <Section>
        <Container>
          <div className="space-y-6">
            {/* Back navigation */}
            <Link
              href="/admin/dashboard/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              All Projects
            </Link>

            {/* Header card */}
            <Card padding="lg">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 space-y-3">
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
                    Project Details
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-semibold text-foreground">
                      {project.title}
                    </h1>
                    <StatusBadge status={project.status.toLowerCase()} />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {project.user.name || project.user.email}
                    </span>
                    {project.user.companyName && (
                      <span>{project.user.companyName}</span>
                    )}
                    <span>{project.user.email}</span>
                  </div>
                </div>
                <div className="flex flex-shrink-0 flex-col items-start gap-3 md:items-end">
                  <div className="text-xs text-muted-foreground">
                    Created {format(new Date(project.createdAt), "MMM d, yyyy")}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-foreground">
                      Progress
                    </span>
                    <div className="h-2 w-48 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-secondary rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(computedProgress, 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {computedProgress}%
                    </span>
                  </div>
                  <ProjectProgressUpdate
                    projectId={project.id}
                    currentProgress={computedProgress}
                  />
                </div>
              </div>
            </Card>

            {/* Content grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main column */}
              <div className="space-y-6 lg:col-span-2">
                {/* Project Info Card */}
                <Card>
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Project Information
                  </h2>
                  <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm text-muted-foreground">Service</dt>
                      <dd className="mt-1 text-sm font-medium text-foreground">
                        {project.serviceType ||
                          project.proposal?.brief?.pillar ||
                          "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Budget</dt>
                      <dd className="mt-1 text-sm font-medium text-foreground">
                        {project.budget ? `€${project.budget.toFixed(2)}` : "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">
                        Priority
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-foreground">
                        <span className="capitalize">{project.priority}</span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">
                        Assigned To
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-foreground">
                        {project.assignedTo || "Unassigned"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">
                        Deadline
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-foreground">
                        {project.deadline
                          ? format(new Date(project.deadline), "MMM d, yyyy")
                          : "—"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">
                        Budget Spent
                      </dt>
                      <dd className="mt-1 text-sm font-medium text-foreground">
                        €{project.budgetSpent.toFixed(2)}
                      </dd>
                    </div>
                  </dl>
                </Card>

                {/* Milestones */}
                <Card>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">
                      Milestones ({completedMilestones}/{totalMilestones})
                    </h2>
                  </div>
                  <div className="mt-4">
                    <MilestoneList
                      projectId={project.id}
                      milestones={project.milestones}
                    />
                  </div>
                </Card>

                {/* Invoices */}
                <Card>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">
                      Invoices ({project.invoices.length})
                    </h2>
                    <CreateInvoiceModal projectId={project.id} />
                  </div>
                  <div className="mt-4">
                    <InvoiceList
                      invoices={project.invoices}
                      projectId={project.id}
                    />
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Files */}
                <Card>
                  <h2 className="text-lg font-semibold text-foreground">
                    Files ({project.files.length})
                  </h2>
                  <div className="mt-4">
                    <FileList projectId={project.id} files={project.files} />
                  </div>
                </Card>

                <div className="mt-4">
                  <FileUploader projectId={project.id} />
                </div>

                {/* Brief info (linked) */}
                {project.proposal && (
                  <Card>
                    <h2 className="text-lg font-semibold text-foreground">
                      Original Brief
                    </h2>
                    <div className="mt-4 space-y-2 text-sm">
                      <p className="text-muted-foreground">
                        {project.proposal.brief.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Submitted{" "}
                        {format(
                          new Date(project.proposal.brief.createdAt),
                          "MMM d, yyyy",
                        )}
                      </p>
                      <Button
                        href={`/admin/dashboard/project-requests/${project.proposal.briefId}`}
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                      >
                        View Original Request
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
