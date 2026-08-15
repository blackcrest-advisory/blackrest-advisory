//===== imports =====//
import { format } from "date-fns";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { getCurrentUser } from "@/lib/utils/auth-utils";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { ArrowBigLeft, FileText, Paperclip } from "lucide-react";
import { ClientProposalActions } from "@/components/client-dashboard/project-requests/ClientProposalActions";

interface ProjectRequestDetailsPageProps {
  params: Promise<{
    requestId: string;
  }>;
}

export default async function ProjectRequestDetailsPage({
  params,
}: ProjectRequestDetailsPageProps) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const { requestId } = await params;

  //===== fetch brief with explicit select =====//
  const brief = await prisma.brief.findUnique({
    where: { id: requestId },
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
      updatedAt: true,
      projectGoals: true,
      targetAudience: true,
      referenceLinks: true,
      userId: true,
      proposal: {
        select: {
          id: true,
          status: true,
          scope: true,
          deliverables: true,
          timeline: true,
          amount: true,
          currency: true,
          terms: true,
          sentAt: true,
          viewedAt: true,
          acceptedAt: true,
          declinedAt: true,
        },
      },
    },
  });

  console.log(brief);

  if (!brief || brief.userId !== user.id) {
    notFound();
  }

  const hasProposal = !!brief.proposal;

  // Helper to extract filename from URL
  const getFileName = (url: string) => {
    try {
      const decoded = decodeURIComponent(url.split("/").pop() || "");
      return decoded.split("?")[0] || "file";
    } catch {
      return "file";
    }
  };

  return (
    <Section>
      <Container>
        {/* Back */}
        <div className="mb-6">
          <Link
            href="/client/dashboard/project-requests"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground flex items-center gap-2"
          >
            <ArrowBigLeft /> <span>Back to Project Requests</span>
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Project Request</p>
            <h1 className="mt-1 text-2xl font-semibold text-foreground">
              {brief.title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Submitted on {format(brief.createdAt, "MMMM d, yyyy")}
            </p>
          </div>
          <StatusBadge status={brief.status} />
        </div>

        {/*===== Proposal Section =====*/}
        {hasProposal ? (
          <Card className="p-6 mb-8">
            <h2 className="text-lg font-semibold text-foreground">Proposal</h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-foreground">Scope</h3>
                <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">
                  {brief.proposal!.scope}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">
                  Deliverables
                </h3>
                <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">
                  {brief.proposal!.deliverables}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">
                  Timeline
                </h3>
                <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">
                  {brief.proposal!.timeline}
                </p>
              </div>
              {brief.proposal!.amount && (
                <div>
                  <h3 className="text-sm font-medium text-foreground">
                    Amount
                  </h3>
                  <p className="mt-1 text-sm text-foreground">
                    {brief.proposal!.amount} {brief.proposal!.currency || "EUR"}
                  </p>
                </div>
              )}
              {brief.proposal!.terms && (
                <div>
                  <h3 className="text-sm font-medium text-foreground">Terms</h3>
                  <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">
                    {brief.proposal!.terms}
                  </p>
                </div>
              )}
            </div>

            {/*===== Client Actions (Accept/Decline) =====*/}
            <div className="mt-6">
              <ClientProposalActions
                proposalId={brief.proposal!.id}
                briefId={brief.id}
                currentStatus={brief.proposal!.status}
              />
            </div>
          </Card>
        ) : (
          <Card className="p-6 mb-8 border-dashed border-2 border-muted/40 bg-muted/5">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-muted/20">
                <FileText className="h-7 w-7 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">
                Proposal Being Prepared
              </h2>
              <p className="mt-2 max-w-md mx-auto text-sm text-muted-foreground">
                Our team is reviewing your request and will prepare a custom
                proposal for you. You will receive a notification as soon as it
                is ready.
              </p>
            </div>
          </Card>
        )}

        {/*===== Content Grid =====*/}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Information */}
          <div className="space-y-6 lg:col-span-2">
            {/* Project Description */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground">
                Project Description
              </h2>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                {brief.problem}
              </p>
            </Card>

            {/* Project Goals */}
            {brief.projectGoals && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Project Goals
                </h2>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                  {brief.projectGoals}
                </p>
              </Card>
            )}

            {/* Target Audience */}
            {brief.targetAudience && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Target Audience
                </h2>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                  {brief.targetAudience}
                </p>
              </Card>
            )}

            {/* Reference Links */}
            {brief.referenceLinks && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Reference Links
                </h2>
                <div className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-muted-foreground">
                  {brief.referenceLinks}
                </div>
              </Card>
            )}

            {/* Attachments */}
            {brief.attachments.length > 0 && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-foreground">
                  Attachments
                </h2>
                <div className="mt-4 space-y-2">
                  {brief.attachments.map((attachment) => (
                    <div
                      key={attachment}
                      className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-foreground"
                    >
                      <Paperclip className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      <a
                        href={attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:underline truncate"
                      >
                        {getFileName(attachment)}
                      </a>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Request Information */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground">
                Request Information
              </h2>
              <div className="mt-5 space-y-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Service
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {brief.pillar.replace(/_/g, " ")}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Budget
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {brief.budget
                      ? `${brief.budget} ${brief.currency || "EUR"}`
                      : "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Deadline
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {brief.deadline
                      ? format(new Date(brief.deadline), "MMMM d, yyyy")
                      : "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Submitted
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {format(brief.createdAt, "MMMM d, yyyy")}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Last Updated
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {format(brief.updatedAt, "MMMM d, yyyy")}
                  </p>
                </div>
              </div>
            </Card>

            {/* Status */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground">
                Current Status
              </h2>
              <div className="mt-4">
                <StatusBadge status={brief.status} />
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Our team will update the status as your project request moves
                through the review process.
              </p>
            </Card>

            {/* Back Button */}
            <Button
              href="/client/dashboard/project-requests"
              variant="outline"
              size="md"
              className="w-full"
            >
              Back to Requests
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
