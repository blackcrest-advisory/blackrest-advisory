import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Calendar,
  DollarSign,
  Tag,
  User,
  Paperclip,
  FileText,
} from "lucide-react";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { getAdminUser } from "@/lib/utils/admin-utils";
import { prisma } from "@/lib/db/client";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { format } from "date-fns";
import { AdminBriefActions } from "@/components/admin-dashboard/project-requests/AdminBriefActions";
import { Card } from "@/components/ui/Card";
import { ProposalSection } from "@/components/admin-dashboard/project-requests/ProposalSection";

// Helper to extract filename from URL
function getFileName(url: string): string {
  try {
    const decoded = decodeURIComponent(url.split("/").pop() || "");
    return decoded.split("?")[0] || "file";
  } catch {
    return "file";
  }
}

interface AdminProjectRequestPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminProjectRequestDetailPage({
  params,
}: AdminProjectRequestPageProps) {
  const admin = await getAdminUser();
  if (!admin) {
    notFound();
  }

  const brief = await prisma.brief.findUnique({
    where: { id: (await params).id },
    select: {
      id: true,
      title: true,
      problem: true,
      pillar: true,
      budget: true,
      currency: true,
      deadline: true,
      attachments: true,
      status: true,
      createdAt: true,
      assignedTo: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          companyName: true,
        },
      },
      proposal: true,
    },
  });

  if (!brief) {
    notFound();
  }

  const hasProposal = !!brief.proposal;

  return (
    <PageWrapper>
      <Section>
        <Container>
          <div className="space-y-6">
            {/* Back navigation */}
            <Link
              href="/admin/dashboard/project-requests"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
              Project requests
            </Link>

            {/* Header card */}
            <Card padding="lg">
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0 space-y-3">
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground">
                    Project request details
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-semibold text-foreground">
                      {brief.title}
                    </h1>
                    <StatusBadge status={brief.status.toLowerCase()} />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {brief.user.name}
                    </span>
                    {brief.user.companyName && (
                      <span>{brief.user.companyName}</span>
                    )}
                    <span>{brief.user.email}</span>
                  </div>
                </div>

                <div className="flex flex-shrink-0 flex-col items-start gap-3 md:items-end">
                  <AdminBriefActions
                    briefId={brief.id}
                    currentStatus={brief.status}
                    assignedTo={brief.assignedTo}
                  />
                  <div className="text-xs text-muted-foreground">
                    Created {format(new Date(brief.createdAt), "MMM d, yyyy")}
                  </div>
                </div>
              </div>
            </Card>

            {/* Proposal Section */}
            <ProposalSection
              briefId={brief.id}
              hasProposal={hasProposal}
              proposalData={
                hasProposal
                  ? {
                      id: brief.proposal!.id,
                      briefId: brief.proposal!.briefId,
                      status: brief.proposal!.status,
                      scope: brief.proposal!.scope,
                      deliverables: brief.proposal!.deliverables,
                      timeline: brief.proposal!.timeline,
                      amount: brief.proposal!.amount,
                      currency: brief.proposal!.currency,
                      terms: brief.proposal!.terms,
                      sentAt: brief.proposal!.sentAt?.toISOString() || null,
                      viewedAt: brief.proposal!.viewedAt?.toISOString() || null,
                      acceptedAt:
                        brief.proposal!.acceptedAt?.toISOString() || null,
                      declinedAt:
                        brief.proposal!.declinedAt?.toISOString() || null,
                    }
                  : null
              }
              briefStatus={brief.status}
            />

            {/* Content grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main column */}
              <div className="space-y-6 lg:col-span-2">
                <Card>
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Project summary
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-body">
                    {brief.problem}
                  </p>
                </Card>

                {/* Attachments - Updated */}
                <Card>
                  <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                    Attachments
                  </h2>
                  {brief.attachments.length > 0 ? (
                    <ul className="mt-4 space-y-2">
                      {brief.attachments.map((attachment) => (
                        <li
                          key={attachment}
                          className="flex items-center gap-2 rounded-[10px] border border-border bg-background px-3 py-2.5 text-sm text-body"
                        >
                          <Paperclip className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                          <a
                            href={attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary hover:underline truncate"
                          >
                            {getFileName(attachment)}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-sm text-muted-foreground">
                      No attachments provided.
                    </p>
                  )}
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <h2 className="text-lg font-semibold text-foreground">
                    Details
                  </h2>
                  <dl className="mt-4 divide-y divide-border">
                    <div className="flex items-center justify-between gap-4 py-2.5 first:pt-0">
                      <dt className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Tag className="h-3.5 w-3.5" />
                        Pillar
                      </dt>
                      <dd className="text-sm font-medium text-foreground">
                        {brief.pillar}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 py-2.5">
                      <dt className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <DollarSign className="h-3.5 w-3.5" />
                        Budget
                      </dt>
                      <dd className="text-sm font-medium text-foreground">
                        {brief.budget ? (
                          <span>
                            {brief.budget} {brief.currency || "EUR"}
                          </span>
                        ) : (
                          "—"
                        )}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 py-2.5">
                      <dt className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        Deadline
                      </dt>
                      <dd className="text-sm font-medium text-foreground">
                        {brief.deadline ?? "—"}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 py-2.5 last:pb-0">
                      <dt className="text-sm text-muted-foreground">
                        Submitted
                      </dt>
                      <dd className="text-sm font-medium text-foreground">
                        {format(new Date(brief.createdAt), "MMM d, h:mm a")}
                      </dd>
                    </div>
                  </dl>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
