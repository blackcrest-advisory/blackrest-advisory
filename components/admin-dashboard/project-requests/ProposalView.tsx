"use client";

//===== imports =====//
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  ReceiptText,
  Send,
  WalletCards,
  XCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/Button";

import { sendProposal } from "@/lib/actions/proposals/proposal.action";

//===== types =====//
interface ProposalViewProps {
  proposal: {
    id: string;
    briefId: string;
    status: string;
    scope: string;
    deliverables: string;
    timeline: string;
    amount: number | null;
    currency: string;
    terms: string | null;
    sentAt: string | null;
    viewedAt: string | null;
    acceptedAt: string | null;
    declinedAt: string | null;
  };
  briefStatus: string;
}

export function ProposalView({ proposal, briefStatus }: ProposalViewProps) {
  //===== state =====//
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  //===== actions =====//
  const handleSend = () => {
    startTransition(async () => {
      const result = await sendProposal(proposal.id);

      if (result.success) {
        toast.success("Proposal sent to client");

        router.refresh();
      } else {
        toast.error(result.error || "Failed to send proposal");
      }
    });
  };

  //===== status state =====//
  const isSentOrViewed = ["SENT", "VIEWED"].includes(proposal.status);

  const isAccepted = proposal.status === "ACCEPTED";

  const isDeclined = proposal.status === "DECLINED";

  const isDraft = proposal.status === "DRAFT";

  //===== labels =====//
  const statusLabels: Record<string, string> = {
    DRAFT: "Draft",
    SENT: "Sent to Client",
    VIEWED: "Viewed by Client",
    ACCEPTED: "Accepted",
    DECLINED: "Declined",
    EXPIRED: "Expired",
  };

  //===== render =====//
  return (
    <section className="relative overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
      {/*===== TOP SIGNAL =====*/}

      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/35 to-transparent"
      />

      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-secondary/[0.06] blur-[90px]"
      />

      {/*===== HEADER =====*/}

      <div className="relative z-10 flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-secondary/15 bg-secondary/[0.05] text-secondary">
            <FileText className="h-4 w-4" />
          </div>

          <div>
            <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-secondary">
              Client proposal
            </span>

            <h2 className="mt-1 text-lg font-semibold tracking-[-0.025em] text-heading">
              Proposal
            </h2>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Commercial scope and delivery terms prepared for this request.
            </p>
          </div>
        </div>

        <ProposalStatus
          status={statusLabels[proposal.status] || proposal.status}
          rawStatus={proposal.status}
        />
      </div>

      {/*===== SUMMARY STRIP =====*/}

      <div className="relative z-10 grid border-b border-border bg-muted/10 sm:grid-cols-3">
        <SummaryItem
          icon={WalletCards}
          label="Proposal value"
          value={
            proposal.amount
              ? `${proposal.amount} ${proposal.currency}`
              : "Not specified"
          }
        />

        <SummaryItem icon={Clock3} label="Timeline" value={proposal.timeline} />

        <SummaryItem
          icon={FileCheck2}
          label="Status"
          value={statusLabels[proposal.status] || proposal.status}
        />
      </div>

      {/*===== BODY =====*/}

      <div className="relative z-10 grid gap-6 px-5 py-6 sm:px-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.5fr)]">
        {/*===== MAIN =====*/}

        <div className="space-y-5">
          <ProposalBlock icon={FileText} eyebrow="Engagement" title="Scope">
            <p className="whitespace-pre-wrap text-sm leading-7 text-body">
              {proposal.scope}
            </p>
          </ProposalBlock>

          <ProposalBlock
            icon={FileCheck2}
            eyebrow="Delivery"
            title="Deliverables"
          >
            <p className="whitespace-pre-wrap text-sm leading-7 text-body">
              {proposal.deliverables}
            </p>
          </ProposalBlock>

          {proposal.terms && (
            <ProposalBlock
              icon={ReceiptText}
              eyebrow="Agreement"
              title="Terms & Conditions"
            >
              <p className="whitespace-pre-wrap text-sm leading-7 text-body">
                {proposal.terms}
              </p>
            </ProposalBlock>
          )}
        </div>

        {/*===== SIDEBAR =====*/}

        <aside className="space-y-5">
          <section className="border border-border bg-background/30">
            <div className="border-b border-border px-4 py-3.5">
              <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40">
                Commercial
              </span>

              <h3 className="mt-0.5 text-sm font-semibold text-heading">
                Proposal Details
              </h3>
            </div>

            <dl className="divide-y divide-border">
              {proposal.amount && (
                <DetailRow
                  icon={WalletCards}
                  label="Amount"
                  value={`${proposal.amount} ${proposal.currency}`}
                />
              )}

              <DetailRow
                icon={Clock3}
                label="Timeline"
                value={proposal.timeline}
              />

              {proposal.sentAt && (
                <DetailRow
                  icon={CalendarDays}
                  label="Sent"
                  value={new Date(proposal.sentAt).toLocaleDateString()}
                />
              )}

              {proposal.viewedAt && (
                <DetailRow
                  icon={CalendarDays}
                  label="Viewed"
                  value={new Date(proposal.viewedAt).toLocaleDateString()}
                />
              )}

              {isAccepted && proposal.acceptedAt && (
                <DetailRow
                  icon={CheckCircle2}
                  label="Accepted"
                  value={new Date(proposal.acceptedAt).toLocaleDateString()}
                />
              )}

              {isDeclined && proposal.declinedAt && (
                <DetailRow
                  icon={XCircle}
                  label="Declined"
                  value={new Date(proposal.declinedAt).toLocaleDateString()}
                />
              )}
            </dl>
          </section>

          {/*===== STATE MESSAGE =====*/}

          {isSentOrViewed && (
            <StatusMessage
              tone="default"
              icon={Send}
              title="Awaiting client response"
              description="Proposal has been sent to the client and awaits response."
            />
          )}

          {isAccepted && (
            <StatusMessage
              tone="success"
              icon={CheckCircle2}
              title="Proposal accepted"
              description="Proposal accepted. Project has been created."
            />
          )}

          {isDeclined && (
            <StatusMessage
              tone="danger"
              icon={XCircle}
              title="Proposal declined"
              description="Proposal declined by client."
            />
          )}
        </aside>
      </div>

      {/*===== ACTION BAR =====*/}

      {isDraft && briefStatus !== "CLOSED" && (
        <div className="relative z-10 flex flex-col gap-3 border-t border-border bg-muted/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-warning"/>

            <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40">
              Draft ready for review
            </span>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={handleSend}
            disabled={isPending}
            className="w-full !rounded-md sm:w-auto"
          >
            <Send className="h-4 w-4" />

            <span className="ml-2">
              {isPending ? "Sending..." : "Send to Client"}
            </span>
          </Button>
        </div>
      )}
    </section>
  );
}

//==============================================================//
// PROPOSAL STATUS
//==============================================================//

function ProposalStatus({
  status,
  rawStatus,
}: {
  status: string;
  rawStatus: string;
}) {
  const styles: Record<string, string> = {
    DRAFT: "border-warning/30 bg-warning/10 text-warning",

    SENT: "border-info/30 bg-info/10 text-info",

    VIEWED: "border-secondary/30 bg-secondary/10 text-secondary",

    ACCEPTED: "border-success/30 bg-success/10 text-success",

    DECLINED: "border-destructive/30 bg-destructive/10 text-destructive",

    EXPIRED: "border-border bg-muted/40 text-muted-foreground",
  };

  return (
    <span
      className={`
        inline-flex
        w-fit
        items-center
        gap-1.5
        rounded-md
        border
        px-2.5
        py-1
        text-[10px]
        font-semibold
        uppercase
        tracking-[0.08em]

        ${
          styles[rawStatus] ?? "border-border bg-muted/20 text-muted-foreground"
        }
      `}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70"/>

      {status}
    </span>
  );
}

//==============================================================//
// SUMMARY ITEM
//==============================================================//

function SummaryItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof FileText;
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-border px-5 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-secondary" />

        <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
          {label}
        </span>
      </div>

      <p
        className="mt-1.5 line-clamp-2 text-xs font-medium text-heading"
        title={value}
      >
        {value}
      </p>
    </div>
  );
}

//==============================================================//
// PROPOSAL BLOCK
//==============================================================//

function ProposalBlock({
  icon: Icon,
  eyebrow,
  title,
  children,
}: {
  icon: typeof FileText;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-border bg-background/20">
      <div className="flex items-center gap-3 border-b border-border bg-muted/10 px-4 py-3.5 sm:px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-secondary">
          <Icon className="h-3.5 w-3.5" />
        </div>

        <div>
          <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/40">
            {eyebrow}
          </span>

          <h3 className="mt-0.5 text-sm font-semibold text-heading">
            {title}
          </h3>
        </div>
      </div>

      <div className="px-4 py-4 sm:px-5">
        {children}
      </div>
    </section>
  );
}

//==============================================================//
// DETAIL ROW
//==============================================================//

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 px-4 py-3.5">
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

//==============================================================//
// STATUS MESSAGE
//==============================================================//

function StatusMessage({
  tone,
  icon: Icon,
  title,
  description,
}: {
  tone: "default" | "success" | "danger";
  icon: typeof Send;
  title: string;
  description: string;
}) {
  const styles = {
    default: {
      border: "border-secondary/15",
      bg: "bg-secondary/[0.035]",
      icon: "text-secondary",
      dot: "bg-secondary",
    },

    success: {
      border: "border-success/20",
      bg: "bg-success/[0.04]",
      icon: "text-success",
      dot: "bg-success",
    },

    danger: {
      border: "border-destructive/20",
      bg: "bg-destructive/[0.04]",
      icon: "text-destructive",
      dot: "bg-destructive",
    },
  };

  const style = styles[tone];

  return (
    <div
      className={`
        border
        p-4
        ${style.border}
        ${style.bg}
      `}
    >
      <div className="flex items-start gap-3">
        <Icon
          className={`
            mt-0.5
            h-4 w-4
            shrink-0
            ${style.icon}
          `}
        />

        <div>
          <div className="flex items-center gap-2">
            <span
              className={`
                h-1.5 w-1.5
                rounded-full
                ${style.dot}
              `}
            />

            <p className="text-xs font-semibold text-heading">
              {title}
            </p>
          </div>

          <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
