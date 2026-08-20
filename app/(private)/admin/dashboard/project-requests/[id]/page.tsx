//===== imports =====//
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  ChevronLeft,
  DollarSign,
  FileText,
  Mail,
  Paperclip,
  Tag,
  User,
  Building2,
  Hash,
} from "lucide-react";
import { format } from "date-fns";

import { getAdminUser } from "@/lib/utils/admin-utils";
import { getAdminProjectRequestById } from "@/lib/data/briefs";

import { StatusBadge } from "@/components/ui/StatusBadge";

import { AdminBriefActions } from "@/components/admin-dashboard/project-requests/AdminBriefActions";
import { ProposalSection } from "@/components/admin-dashboard/project-requests/ProposalSection";

//===== helper to extract filename from URL =====//
function getFileName(url: string): string {
  try {
    const decoded = decodeURIComponent(url.split("/").pop() || "");

    return decoded.split("?")[0] || "file";
  } catch {
    return "file";
  }
}

//===== types =====//
interface AdminProjectRequestPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminProjectRequestDetailPage({
  params,
}: AdminProjectRequestPageProps) {
  //===== auth =====//
  const admin = await getAdminUser();

  if (!admin) {
    notFound();
  }

  //===== params =====//
  const { id } = await params;

  //===== data =====//
  const brief = await getAdminProjectRequestById(id);

  if (!brief) {
    notFound();
  }

  //===== proposal state =====//
  const hasProposal = !!brief.proposal;

  //===== render =====//
  return (
    <div className="relative space-y-6">
      {/*===== BACK NAVIGATION =====*/}

      <div>
        <Link
          href="/admin/dashboard/project-requests"
          className="group inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-heading"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card transition-colors group-hover:border-secondary/30 group-hover:bg-secondary/[0.04] group-hover:text-secondary">
            <ChevronLeft className="h-3.5 w-3.5" />
          </span>
          Project requests
        </Link>
      </div>

      {/*===== REQUEST COMMAND HEADER =====*/}

      <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
        {/* ambient gold glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-36 h-80 w-80 rounded-full bg-secondary/[0.07] blur-[110px]"
        />

        {/* subtle left glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 bottom-0 h-52 w-52 rounded-full bg-primary/[0.04] blur-[90px] dark:bg-secondary/[0.025]"
        />

        {/* architectural grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden opacity-[0.035] lg:block"
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
              "linear-gradient(to right, transparent 8%, black 56%, black)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 8%, black 56%, black)",
          }}
        />

        {/* top signal */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/35 to-transparent"
        />

        <div className="relative z-10 grid gap-7 px-5 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:px-8 lg:py-7">
          {/*===== IDENTITY =====*/}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-secondary"/>

                <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                  Project request
                </span>
              </div>

              <span className="h-px w-7 bg-secondary/30" />

              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground/40">
                Admin review
              </span>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <h1 className="min-w-0 break-words text-2xl font-semibold tracking-[-0.04em] text-heading sm:text-3xl lg:text-[34px]">
                {brief.title}
              </h1>

              <div className="shrink-0">
                <StatusBadge status={brief.status.toLowerCase()} />
              </div>
            </div>

            {/* client identity */}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-3.5 w-3.5 text-secondary" />

                <span className="font-medium text-heading">
                  {brief.user.name}
                </span>
              </div>

              {brief.user.companyName && (
                <div className="flex items-center gap-2">
                  <Building2 className="h-3.5 w-3.5 text-secondary" />

                  <span>{brief.user.companyName}</span>
                </div>
              )}

              <div className="flex min-w-0 items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0 text-secondary" />

                <span className="truncate">{brief.user.email}</span>
              </div>
            </div>

            {/* request metadata */}
            <div className="mt-7 grid gap-3 border-t border-border pt-4 sm:grid-cols-3">
              <HeaderMeta
                icon={Hash}
                label="Request ID"
                value={`#${brief.id}`}
                mono
              />

              <HeaderMeta
                icon={Calendar}
                label="Submitted"
                value={format(new Date(brief.createdAt), "MMM d, yyyy")}
              />

              <HeaderMeta
                icon={User}
                label="Assigned"
                value={brief.assignedTo || "Unassigned"}
              />
            </div>
          </div>

          {/*===== ACTION AREA =====*/}

          <div className="flex shrink-0 flex-col gap-3 border-t border-border pt-5 lg:min-w-[220px] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <div>
              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40">
                Request actions
              </span>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Manage ownership and request status.
              </p>
            </div>

            <AdminBriefActions
              briefId={brief.id}
              currentStatus={brief.status}
              assignedTo={brief.assignedTo}
            />

            <div className="mt-1 flex items-center gap-2 border-t border-border pt-3">
              <span className="h-1.5 w-1.5 rounded-full bg-success"/>

              <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40">
                Created {format(new Date(brief.createdAt), "MMM d, yyyy")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/*===== PROPOSAL =====*/}

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
                acceptedAt: brief.proposal!.acceptedAt?.toISOString() || null,
                declinedAt: brief.proposal!.declinedAt?.toISOString() || null,
              }
            : null
        }
        briefStatus={brief.status}
      />

      {/*===== REQUEST CONTENT GRID =====*/}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.45fr)]">
        {/*===== MAIN COLUMN =====*/}

        <div className="space-y-6">
          {/*===== PROJECT SUMMARY =====*/}

          <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
            {/* top signal */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 h-[2px] w-24 bg-secondary"
            />

            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-secondary/15 bg-secondary/[0.05] text-secondary">
                  <FileText className="h-4 w-4" />
                </div>

                <div>
                  <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40">
                    Client brief
                  </span>

                  <h2 className="mt-0.5 text-base font-semibold text-heading">
                    Project Summary
                  </h2>
                </div>
              </div>

              <span className="hidden font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/30 sm:block">
                Request context
              </span>
            </div>

            <div className="px-5 py-5 sm:px-6 sm:py-6">
              <p className="whitespace-pre-wrap text-sm leading-7 text-body">
                {brief.problem}
              </p>
            </div>

            <div className="border-t border-border bg-muted/10 px-5 py-3 sm:px-6">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary"/>

                <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                  Submitted client requirement
                </span>
              </div>
            </div>
          </section>

          {/*===== ATTACHMENTS =====*/}

          <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-muted/20 text-muted-foreground">
                  <Paperclip className="h-4 w-4" />
                </div>

                <div>
                  <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40">
                    Supporting files
                  </span>

                  <h2 className="mt-0.5 text-base font-semibold text-heading">
                    Attachments
                  </h2>
                </div>
              </div>

              <span className="font-mono text-[8px] font-semibold text-secondary">
                {String(brief.attachments.length).padStart(2, "0")}
              </span>
            </div>

            {brief.attachments.length > 0 ? (
              <div className="divide-y divide-border">
                {brief.attachments.map((attachment, index) => (
                  <div
                    key={attachment}
                    className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-secondary/[0.025] sm:px-6"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors group-hover:border-secondary/20 group-hover:text-secondary">
                      <Paperclip className="h-3.5 w-3.5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <a
                        href={attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block truncate text-sm font-medium text-heading transition-colors hover:text-secondary"
                      >
                        {getFileName(attachment)}
                      </a>

                      <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/35">
                        Attachment {String(index + 1).padStart(2, "0")}
                      </p>
                    </div>

                    <span className="shrink-0 font-mono text-[7px] uppercase tracking-[0.12em] text-secondary">
                      Open
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex min-h-32 flex-col items-center justify-center px-5 py-8 text-center sm:px-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-muted/15 text-muted-foreground">
                  <Paperclip className="h-4 w-4" />
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                  No attachments provided.
                </p>
              </div>
            )}
          </section>
        </div>

        {/*===== SIDEBAR =====*/}

        <aside className="space-y-6">
          {/*===== REQUEST DETAILS =====*/}

          <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/20 to-transparent"
            />

            <div className="border-b border-border px-5 py-4">
              <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-secondary">
                Request metadata
              </span>

              <h2 className="mt-1 text-base font-semibold text-heading">
                Details
              </h2>
            </div>

            <dl className="divide-y divide-border">
              <DetailItem icon={Tag} label="Pillar" value={brief.pillar} />

              <DetailItem
                icon={DollarSign}
                label="Budget"
                value={
                  brief.budget
                    ? `${brief.budget} ${brief.currency || "EUR"}`
                    : "—"
                }
              />

              <DetailItem
                icon={Calendar}
                label="Deadline"
                value={brief.deadline ?? "—"}
              />

              <DetailItem
                icon={Calendar}
                label="Submitted"
                value={format(new Date(brief.createdAt), "MMM d, h:mm a")}
              />
            </dl>
          </section>

          {/*===== CLIENT RECORD =====*/}

          <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="border-b border-border px-5 py-4">
              <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/40">
                Request owner
              </span>

              <h2 className="mt-1 text-base font-semibold text-heading">
                Client
              </h2>
            </div>

            <div className="px-5 py-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-secondary/15 bg-secondary/[0.05] text-secondary">
                  <User className="h-4 w-4" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-heading">
                    {brief.user.name || brief.user.email}
                  </p>

                  {brief.user.companyName && (
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {brief.user.companyName}
                    </p>
                  )}

                  <p className="mt-2 break-all text-xs text-muted-foreground">
                    {brief.user.email}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/35">
                  Client ID
                </span>

                <span className="max-w-[160px] truncate font-mono text-[8px] text-heading">
                  {brief.user.id}
                </span>
              </div>
            </div>
          </section>
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
  mono = false,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-secondary" />

        <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
          {label}
        </span>
      </div>

      <p
        className={`
          mt-1.5
          truncate
          text-xs
          font-medium
          text-heading
          ${mono ? "font-mono text-[10px]" : ""}
        `}
        title={value}
      >
        {value}
      </p>
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
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-5 px-5 py-4">
      <dt className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />

        {label}
      </dt>

      <dd className="min-w-0 break-words text-right text-xs font-medium text-heading">
        {value}
      </dd>
    </div>
  );
}
