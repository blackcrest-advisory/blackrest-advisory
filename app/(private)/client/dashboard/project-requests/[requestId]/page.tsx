//===== imports =====//
import { format } from "date-fns";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  CircleDot,
  FileText,
  FolderKanban,
  Link2,
  Paperclip,
  Sparkles,
  Target,
  Users,
  WalletCards,
} from "lucide-react";

import { prisma } from "@/lib/db/client";
import { getCurrentUser } from "@/lib/utils/auth-utils";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";

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

  //===== helper to extract filename from URL =====//
  const getFileName = (url: string) => {
    try {
      const decoded = decodeURIComponent(url.split("/").pop() || "");
      return decoded.split("?")[0] || "file";
    } catch {
      return "file";
    }
  };

  return (
    <div className="relative space-y-6">
      {/* ====================================================== */}
      {/* BACK NAVIGATION                                        */}
      {/* ====================================================== */}

      <div>
        <Link
          href="/client/dashboard/project-requests"
          className="
            group
            inline-flex
            items-center
            gap-2
            text-xs
            font-medium
            text-muted-foreground
            transition-colors
            hover:text-secondary
          "
        >
          <ChevronLeft
            className="
              h-4 w-4
              transition-transform
              duration-200
              group-hover:-translate-x-0.5
            "
          />
          Back to Project Requests
        </Link>
      </div>

      {/* ====================================================== */}
      {/* REQUEST HERO                                           */}
      {/* ====================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border border-border
          bg-card
          shadow-[var(--shadow-card)]
        "
      >
        {/* ambient glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -right-28 -top-32
            h-72 w-72
            rounded-full
            bg-secondary/[0.09]
            blur-[100px]
          "
        />

        {/* soft glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -bottom-36 left-[20%]
            h-64 w-64
            rounded-full
            bg-primary/[0.05]
            blur-[100px]
          "
        />

        {/* architectural grid */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0
            hidden opacity-[0.05]
            lg:block
          "
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                var(--color-border) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "12.5% 100%",
          }}
        />

        {/* top accent */}
        <div
          className="
            absolute left-0 top-0
            h-[2px] w-full
            bg-gradient-to-r
            from-secondary
            via-secondary/40
            to-transparent
          "
        />

        <div
          className="
            relative z-10
            grid
            gap-8
            px-5 py-7
            sm:px-6
            lg:grid-cols-[minmax(0,1fr)_300px]
            lg:items-end
            lg:px-8
            lg:py-8
          "
        >
          {/* left */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <CircleDot className="h-3.5 w-3.5 text-secondary" />

                <span
                  className="
                    font-mono
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-secondary
                  "
                >
                  Project request
                </span>
              </div>

              <span className="h-px w-8 bg-secondary/30" />

              <span
                className="
                  max-w-[170px]
                  truncate
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.13em]
                  text-muted-foreground/40
                "
              >
                #{brief.id}
              </span>
            </div>

            <div
              className="
                mt-5
                flex flex-col
                gap-3
                sm:flex-row
                sm:items-center
              "
            >
              <h1
                className="
                  min-w-0
                  text-3xl
                  font-semibold
                  leading-[1.08]
                  tracking-[-0.045em]
                  text-heading
                  sm:text-4xl
                "
              >
                {brief.title}
              </h1>

              <StatusBadge status={brief.status} />
            </div>

            <p
              className="
                mt-4
                max-w-2xl
                text-sm
                leading-7
                text-muted-foreground
                sm:text-base
              "
            >
              Review your submitted brief, proposal details, supporting files,
              and the current progress of your request.
            </p>

            <div
              className="
                mt-6
                grid
                gap-3
                sm:grid-cols-2
                xl:grid-cols-3
              "
            >
              <div className="border-t border-border pt-3">
                <p
                  className="
                    font-mono
                    text-[7px]
                    uppercase
                    tracking-[0.15em]
                    text-muted-foreground/40
                  "
                >
                  Service
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    font-medium
                    capitalize
                    text-foreground
                  "
                >
                  {brief.pillar.replace(/_/g, " ")}
                </p>
              </div>

              <div className="border-t border-border pt-3">
                <p
                  className="
                    font-mono
                    text-[7px]
                    uppercase
                    tracking-[0.15em]
                    text-muted-foreground/40
                  "
                >
                  Submitted
                </p>

                <p className="mt-1 text-xs font-medium text-foreground">
                  {format(brief.createdAt, "MMMM d, yyyy")}
                </p>
              </div>

              <div className="border-t border-border pt-3">
                <p
                  className="
                    font-mono
                    text-[7px]
                    uppercase
                    tracking-[0.15em]
                    text-muted-foreground/40
                  "
                >
                  Last updated
                </p>

                <p className="mt-1 text-xs font-medium text-foreground">
                  {format(brief.updatedAt, "MMMM d, yyyy")}
                </p>
              </div>
            </div>
          </div>

          {/* right status block */}
          <div
            className="
              border-t border-border
              pt-5
              lg:border-l
              lg:border-t-0
              lg:pl-7
              lg:pt-0
            "
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-secondary" />

              <span
                className="
                  font-mono
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.17em]
                  text-secondary
                "
              >
                Request status
              </span>
            </div>

            <div className="mt-4">
              <StatusBadge status={brief.status} />
            </div>

            <p
              className="
                mt-4
                text-xs
                leading-5
                text-muted-foreground
              "
            >
              Blackcrest will update this request as it moves through review,
              proposal, and approval.
            </p>

            <div
              className="
                mt-4
                flex items-center
                gap-2
                border-t border-border
                pt-4
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-success" />

              <span
                className="
                  font-mono
                  text-[7px]
                  uppercase
                  tracking-[0.15em]
                  text-muted-foreground/40
                "
              >
                Request tracking active
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* PROPOSAL                                               */}
      {/* ====================================================== */}

      {hasProposal ? (
        <section
          className="
            relative
            overflow-hidden
            border border-secondary/20
            bg-card
            shadow-[var(--shadow-card)]
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -right-24 -top-28
              h-60 w-60
              rounded-full
              bg-secondary/[0.09]
              blur-[100px]
            "
          />

          <div
            className="
              absolute left-0 top-0
              h-[2px] w-full
              bg-gradient-to-r
              from-secondary
              via-secondary/50
              to-transparent
            "
          />

          {/* header */}
          <div
            className="
              relative z-10
              flex flex-col
              gap-4
              border-b border-border
              px-5 py-5
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:px-6
            "
          >
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-secondary" />

                <span
                  className="
                    font-mono
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-secondary
                  "
                >
                  Blackcrest proposal
                </span>
              </div>

              <h2
                className="
                  mt-2
                  text-xl
                  font-semibold
                  tracking-[-0.025em]
                  text-heading
                "
              >
                Proposal
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Review the proposed scope, deliverables, timeline, and terms.
              </p>
            </div>

            <StatusBadge status={brief.proposal!.status} />
          </div>

          {/* proposal summary */}
          <div
            className="
              relative z-10
              grid
              grid-cols-1
              border-b border-border
              bg-muted/10
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            <div className="px-5 py-4 sm:px-6">
              <p
                className="
                  font-mono
                  text-[7px]
                  uppercase
                  tracking-[0.15em]
                  text-muted-foreground/40
                "
              >
                Timeline
              </p>

              <p
                className="
                  mt-2
                  whitespace-pre-wrap
                  text-sm
                  font-medium
                  text-heading
                "
              >
                {brief.proposal!.timeline}
              </p>
            </div>

            <div
              className="
                border-t border-border
                px-5 py-4
                sm:border-l
                sm:border-t-0
                sm:px-6
              "
            >
              <p
                className="
                  font-mono
                  text-[7px]
                  uppercase
                  tracking-[0.15em]
                  text-muted-foreground/40
                "
              >
                Amount
              </p>

              <p
                className="
                  mt-2
                  text-sm
                  font-semibold
                  text-heading
                "
              >
                {brief.proposal!.amount
                  ? `${brief.proposal!.amount} ${
                      brief.proposal!.currency || "EUR"
                    }`
                  : "Not specified"}
              </p>
            </div>

            <div
              className="
                border-t border-border
                px-5 py-4
                sm:col-span-2
                lg:col-span-1
                lg:border-l
                lg:border-t-0
                lg:px-6
              "
            >
              <p
                className="
                  font-mono
                  text-[7px]
                  uppercase
                  tracking-[0.15em]
                  text-muted-foreground/40
                "
              >
                Proposal status
              </p>

              <div className="mt-2">
                <StatusBadge status={brief.proposal!.status} />
              </div>
            </div>
          </div>

          {/* proposal content */}
          <div
            className="
              relative z-10
              grid
              gap-0
              lg:grid-cols-2
            "
          >
            <div
              className="
                border-b border-border
                px-5 py-6
                sm:px-6
                lg:border-b-0
                lg:border-r
              "
            >
              <p
                className="
                  font-mono
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.17em]
                  text-secondary
                "
              >
                Scope
              </p>

              <p
                className="
                  mt-3
                  whitespace-pre-wrap
                  text-sm
                  leading-7
                  text-muted-foreground
                "
              >
                {brief.proposal!.scope}
              </p>
            </div>

            <div className="px-5 py-6 sm:px-6">
              <p
                className="
                  font-mono
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.17em]
                  text-secondary
                "
              >
                Deliverables
              </p>

              <p
                className="
                  mt-3
                  whitespace-pre-wrap
                  text-sm
                  leading-7
                  text-muted-foreground
                "
              >
                {brief.proposal!.deliverables}
              </p>
            </div>
          </div>

          {brief.proposal!.terms && (
            <div
              className="
                relative z-10
                border-t border-border
                px-5 py-6
                sm:px-6
              "
            >
              <p
                className="
                  font-mono
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.17em]
                  text-secondary
                "
              >
                Terms
              </p>

              <p
                className="
                  mt-3
                  whitespace-pre-wrap
                  text-sm
                  leading-7
                  text-muted-foreground
                "
              >
                {brief.proposal!.terms}
              </p>
            </div>
          )}

          {/* actions */}
          <div
            className="
              relative z-10
              border-t border-border
              bg-muted/15
              px-5 py-5
              sm:px-6
            "
          >
            <ClientProposalActions
              proposalId={brief.proposal!.id}
              briefId={brief.id}
              currentStatus={brief.proposal!.status}
            />
          </div>
        </section>
      ) : (
        /* ==================================================== */
        /* PROPOSAL PENDING                                     */
        /* ==================================================== */

        <section
          className="
            relative
            overflow-hidden
            border border-dashed border-secondary/25
            bg-secondary/[0.025]
            px-6 py-12
            text-center
            shadow-[var(--shadow-card)]
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute left-1/2 top-1/2
              h-52 w-52
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-secondary/[0.08]
              blur-[90px]
            "
          />

          <div
            className="
              relative z-10
              mx-auto
              flex h-12 w-12
              items-center justify-center
              border border-secondary/15
              bg-secondary/[0.05]
              text-secondary
            "
          >
            <FileText className="h-5 w-5" />
          </div>

          <p
            className="
              relative z-10
              mt-5
              font-mono
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-secondary
            "
          >
            Proposal preparation
          </p>

          <h2
            className="
              relative z-10
              mt-2
              text-xl
              font-semibold
              tracking-[-0.025em]
              text-heading
            "
          >
            Proposal Being Prepared
          </h2>

          <p
            className="
              relative z-10
              mx-auto
              mt-3
              max-w-lg
              text-sm
              leading-6
              text-muted-foreground
            "
          >
            Our team is reviewing your request and will prepare a custom
            proposal for you. You will receive a notification as soon as it is
            ready.
          </p>

          <div
            className="
              relative z-10
              mx-auto
              mt-6
              flex
              w-fit
              items-center
              gap-2
            "
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />

            <span
              className="
                font-mono
                text-[7px]
                uppercase
                tracking-[0.15em]
                text-muted-foreground/40
              "
            >
              Blackcrest review in progress
            </span>
          </div>
        </section>
      )}

      {/* ====================================================== */}
      {/* CONTENT GRID                                           */}
      {/* ====================================================== */}

      <div
        className="
          grid
          grid-cols-1
          gap-6
          xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.45fr)]
        "
      >
        {/* ==================================================== */}
        {/* MAIN CONTENT                                         */}
        {/* ==================================================== */}

        <div className="space-y-6">
          {/* Project Description */}
          <section
            className="
              relative
              overflow-hidden
              border border-border
              bg-card
              shadow-[var(--shadow-card)]
            "
          >
            <div
              className="
                absolute left-0 top-0
                h-[2px] w-full
                bg-gradient-to-r
                from-secondary
                via-secondary/35
                to-transparent
              "
            />

            <div
              className="
                border-b border-border
                px-5 py-5
                sm:px-6
              "
            >
              <div className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-secondary" />

                <span
                  className="
                    font-mono
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-secondary
                  "
                >
                  Project context
                </span>
              </div>

              <h2
                className="
                  mt-2
                  text-lg
                  font-semibold
                  tracking-[-0.025em]
                  text-heading
                  sm:text-xl
                "
              >
                Project Description
              </h2>
            </div>

            <div className="px-5 py-6 sm:px-6">
              <p
                className="
                  whitespace-pre-wrap
                  text-sm
                  leading-7
                  text-muted-foreground
                "
              >
                {brief.problem}
              </p>
            </div>
          </section>

          {/* Project Goals */}
          {brief.projectGoals && (
            <section
              className="
                relative
                overflow-hidden
                border border-border
                bg-card
                shadow-[var(--shadow-card)]
              "
            >
              <div
                className="
                  absolute left-0 top-0
                  h-[2px] w-full
                  bg-gradient-to-r
                  from-secondary
                  via-secondary/35
                  to-transparent
                "
              />

              <div
                className="
                  border-b border-border
                  px-5 py-5
                  sm:px-6
                "
              >
                <div className="flex items-center gap-2">
                  <Target className="h-3.5 w-3.5 text-secondary" />

                  <span
                    className="
                      font-mono
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-secondary
                    "
                  >
                    Desired outcome
                  </span>
                </div>

                <h2
                  className="
                    mt-2
                    text-lg
                    font-semibold
                    tracking-[-0.025em]
                    text-heading
                  "
                >
                  Project Goals
                </h2>
              </div>

              <div className="px-5 py-6 sm:px-6">
                <p
                  className="
                    whitespace-pre-wrap
                    text-sm
                    leading-7
                    text-muted-foreground
                  "
                >
                  {brief.projectGoals}
                </p>
              </div>
            </section>
          )}

          {/* Target Audience */}
          {brief.targetAudience && (
            <section
              className="
                relative
                overflow-hidden
                border border-border
                bg-card
                shadow-[var(--shadow-card)]
              "
            >
              <div
                className="
                  absolute left-0 top-0
                  h-[2px] w-full
                  bg-gradient-to-r
                  from-secondary
                  via-secondary/35
                  to-transparent
                "
              />

              <div
                className="
                  border-b border-border
                  px-5 py-5
                  sm:px-6
                "
              >
                <div className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-secondary" />

                  <span
                    className="
                      font-mono
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-secondary
                    "
                  >
                    Audience profile
                  </span>
                </div>

                <h2
                  className="
                    mt-2
                    text-lg
                    font-semibold
                    tracking-[-0.025em]
                    text-heading
                  "
                >
                  Target Audience
                </h2>
              </div>

              <div className="px-5 py-6 sm:px-6">
                <p
                  className="
                    whitespace-pre-wrap
                    text-sm
                    leading-7
                    text-muted-foreground
                  "
                >
                  {brief.targetAudience}
                </p>
              </div>
            </section>
          )}

          {/* Reference Links */}
          {brief.referenceLinks && (
            <section
              className="
                relative
                overflow-hidden
                border border-border
                bg-card
                shadow-[var(--shadow-card)]
              "
            >
              <div
                className="
                  absolute left-0 top-0
                  h-[2px] w-full
                  bg-gradient-to-r
                  from-secondary
                  via-secondary/35
                  to-transparent
                "
              />

              <div
                className="
                  border-b border-border
                  px-5 py-5
                  sm:px-6
                "
              >
                <div className="flex items-center gap-2">
                  <Link2 className="h-3.5 w-3.5 text-secondary" />

                  <span
                    className="
                      font-mono
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-secondary
                    "
                  >
                    Supporting material
                  </span>
                </div>

                <h2
                  className="
                    mt-2
                    text-lg
                    font-semibold
                    tracking-[-0.025em]
                    text-heading
                  "
                >
                  Reference Links
                </h2>
              </div>

              <div
                className="
                  break-words
                  whitespace-pre-wrap
                  px-5 py-6
                  text-sm
                  leading-7
                  text-muted-foreground
                  sm:px-6
                "
              >
                {brief.referenceLinks}
              </div>
            </section>
          )}

          {/* Attachments */}
          {brief.attachments.length > 0 && (
            <section
              className="
                relative
                overflow-hidden
                border border-border
                bg-card
                shadow-[var(--shadow-card)]
              "
            >
              <div
                className="
                  absolute left-0 top-0
                  h-[2px] w-full
                  bg-gradient-to-r
                  from-secondary
                  via-secondary/35
                  to-transparent
                "
              />

              <div
                className="
                  flex items-center
                  justify-between
                  gap-4
                  border-b border-border
                  px-5 py-5
                  sm:px-6
                "
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Paperclip className="h-3.5 w-3.5 text-secondary" />

                    <span
                      className="
                        font-mono
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-secondary
                      "
                    >
                      Supporting files
                    </span>
                  </div>

                  <h2
                    className="
                      mt-2
                      text-lg
                      font-semibold
                      tracking-[-0.025em]
                      text-heading
                    "
                  >
                    Attachments
                  </h2>
                </div>

                <div
                  className="
                    border border-border
                    bg-background/60
                    px-3 py-2
                    font-mono
                    text-[8px]
                    font-semibold
                    text-heading
                  "
                >
                  {brief.attachments.length}
                </div>
              </div>

              <div className="divide-y divide-border">
                {brief.attachments.map((attachment, index) => (
                  <div
                    key={attachment}
                    className="
                      group
                      flex
                      items-center
                      gap-3
                      px-5 py-4
                      transition-colors
                      duration-200
                      hover:bg-secondary/[0.025]
                      sm:px-6
                    "
                  >
                    <div
                      className="
                        flex h-9 w-9
                        shrink-0
                        items-center justify-center
                        border border-secondary/15
                        bg-secondary/[0.05]
                        text-secondary
                      "
                    >
                      <Paperclip className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className="
                          font-mono
                          text-[7px]
                          uppercase
                          tracking-[0.15em]
                          text-muted-foreground/35
                        "
                      >
                        Attachment {String(index + 1).padStart(2, "0")}
                      </p>

                      <a
                        href={attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          mt-1
                          block
                          truncate
                          text-sm
                          font-medium
                          text-heading
                          transition-colors
                          hover:text-secondary
                        "
                      >
                        {getFileName(attachment)}
                      </a>
                    </div>

                    <ArrowUpRight
                      className="
                        h-4 w-4
                        shrink-0
                        text-muted-foreground/35
                        transition-all
                        duration-200
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                        group-hover:text-secondary
                      "
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ==================================================== */}
        {/* SIDEBAR                                              */}
        {/* ==================================================== */}

        <aside className="space-y-6">
          {/* Request Information */}
          <section
            className="
              relative
              overflow-hidden
              border border-border
              bg-card
              shadow-[var(--shadow-card)]
            "
          >
            <div
              className="
                absolute left-0 top-0
                h-[2px] w-full
                bg-gradient-to-r
                from-secondary
                via-secondary/35
                to-transparent
              "
            />

            <div
              className="
                border-b border-border
                px-5 py-5
                sm:px-6
              "
            >
              <p
                className="
                  font-mono
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-secondary
                "
              >
                Request record
              </p>

              <h2
                className="
                  mt-2
                  text-lg
                  font-semibold
                  tracking-[-0.025em]
                  text-heading
                "
              >
                Request Information
              </h2>
            </div>

            <div className="divide-y divide-border">
              <div className="flex items-start gap-3 px-5 py-4 sm:px-6">
                <FolderKanban className="mt-0.5 h-4 w-4 text-secondary" />

                <div>
                  <p
                    className="
                      font-mono
                      text-[7px]
                      uppercase
                      tracking-[0.15em]
                      text-muted-foreground/40
                    "
                  >
                    Service
                  </p>

                  <p
                    className="
                      mt-1
                      text-sm
                      font-medium
                      capitalize
                      text-heading
                    "
                  >
                    {brief.pillar.replace(/_/g, " ")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 px-5 py-4 sm:px-6">
                <WalletCards className="mt-0.5 h-4 w-4 text-secondary" />

                <div>
                  <p
                    className="
                      font-mono
                      text-[7px]
                      uppercase
                      tracking-[0.15em]
                      text-muted-foreground/40
                    "
                  >
                    Budget
                  </p>

                  <p className="mt-1 text-sm font-medium text-heading">
                    {brief.budget
                      ? `${brief.budget} ${brief.currency || "EUR"}`
                      : "Not specified"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 px-5 py-4 sm:px-6">
                <CalendarDays className="mt-0.5 h-4 w-4 text-secondary" />

                <div>
                  <p
                    className="
                      font-mono
                      text-[7px]
                      uppercase
                      tracking-[0.15em]
                      text-muted-foreground/40
                    "
                  >
                    Deadline
                  </p>

                  <p className="mt-1 text-sm font-medium text-heading">
                    {brief.deadline
                      ? format(new Date(brief.deadline), "MMMM d, yyyy")
                      : "Not specified"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 px-5 py-4 sm:px-6">
                <CalendarDays className="mt-0.5 h-4 w-4 text-secondary" />

                <div>
                  <p
                    className="
                      font-mono
                      text-[7px]
                      uppercase
                      tracking-[0.15em]
                      text-muted-foreground/40
                    "
                  >
                    Submitted
                  </p>

                  <p className="mt-1 text-sm font-medium text-heading">
                    {format(brief.createdAt, "MMMM d, yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 px-5 py-4 sm:px-6">
                <CalendarDays className="mt-0.5 h-4 w-4 text-secondary" />

                <div>
                  <p
                    className="
                      font-mono
                      text-[7px]
                      uppercase
                      tracking-[0.15em]
                      text-muted-foreground/40
                    "
                  >
                    Last Updated
                  </p>

                  <p className="mt-1 text-sm font-medium text-heading">
                    {format(brief.updatedAt, "MMMM d, yyyy")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Current Status */}
          <section
            className="
              relative
              overflow-hidden
              border border-secondary/20
              bg-secondary/[0.025]
              shadow-[var(--shadow-card)]
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute -right-16 -top-20
                h-40 w-40
                rounded-full
                bg-secondary/[0.08]
                blur-3xl
              "
            />

            <div
              className="
                absolute left-0 top-0
                h-[2px] w-full
                bg-gradient-to-r
                from-secondary
                via-secondary/40
                to-transparent
              "
            />

            <div className="relative z-10 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-secondary" />

                <span
                  className="
                    font-mono
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.17em]
                    text-secondary
                  "
                >
                  Review progress
                </span>
              </div>

              <h2
                className="
                  mt-3
                  text-lg
                  font-semibold
                  tracking-[-0.025em]
                  text-heading
                "
              >
                Current Status
              </h2>

              <div className="mt-4">
                <StatusBadge status={brief.status} />
              </div>

              <p
                className="
                  mt-4
                  text-sm
                  leading-6
                  text-muted-foreground
                "
              >
                Our team will update the status as your project request moves
                through the review process.
              </p>

              <div
                className="
                  mt-5
                  flex items-center
                  gap-2
                  border-t border-border
                  pt-4
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-success" />

                <span
                  className="
                    font-mono
                    text-[7px]
                    uppercase
                    tracking-[0.15em]
                    text-muted-foreground/40
                  "
                >
                  Request monitored
                </span>
              </div>
            </div>
          </section>

          {/* Back */}
          <Button
            href="/client/dashboard/project-requests"
            variant="outline"
            size="md"
            className="
              group
              w-full
              justify-between
            "
          >
            <span className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Requests
            </span>

            <span
              className="
                font-mono
                text-[7px]
                uppercase
                tracking-[0.14em]
                text-muted-foreground/40
              "
            >
              Return
            </span>
          </Button>
        </aside>
      </div>
    </div>
  );
}
