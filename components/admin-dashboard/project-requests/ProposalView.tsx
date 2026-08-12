"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { sendProposal } from "@/lib/actions/proposals/proposal.action";
import toast from "react-hot-toast";

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
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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

  const isSentOrViewed = ["SENT", "VIEWED"].includes(proposal.status);
  const isAccepted = proposal.status === "ACCEPTED";
  const isDeclined = proposal.status === "DECLINED";
  const isDraft = proposal.status === "DRAFT";

  const statusLabels: Record<string, string> = {
    DRAFT: "Draft",
    SENT: "Sent to Client",
    VIEWED: "Viewed by Client",
    ACCEPTED: "Accepted",
    DECLINED: "Declined",
    EXPIRED: "Expired",
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Proposal</h2>
        <span className="text-sm font-medium text-muted-foreground">
          {statusLabels[proposal.status] || proposal.status}
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-foreground">Scope</h3>
          <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">
            {proposal.scope}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-foreground">Deliverables</h3>
          <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">
            {proposal.deliverables}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-foreground">Timeline</h3>
          <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">
            {proposal.timeline}
          </p>
        </div>

        {proposal.amount && (
          <div>
            <h3 className="text-sm font-medium text-foreground">Amount</h3>
            <p className="mt-1 text-sm text-foreground">
              {proposal.amount} {proposal.currency}
            </p>
          </div>
        )}

        {proposal.terms && (
          <div>
            <h3 className="text-sm font-medium text-foreground">Terms</h3>
            <p className="mt-1 text-sm text-muted-foreground whitespace-pre-wrap">
              {proposal.terms}
            </p>
          </div>
        )}

        {proposal.sentAt && (
          <div>
            <h3 className="text-sm font-medium text-foreground">Sent</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {new Date(proposal.sentAt).toLocaleDateString()}
            </p>
          </div>
        )}

        {proposal.viewedAt && (
          <div>
            <h3 className="text-sm font-medium text-foreground">Viewed</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {new Date(proposal.viewedAt).toLocaleDateString()}
            </p>
          </div>
        )}

        {isAccepted && proposal.acceptedAt && (
          <div>
            <h3 className="text-sm font-medium text-foreground text-green-600">
              Accepted
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {new Date(proposal.acceptedAt).toLocaleDateString()}
            </p>
          </div>
        )}

        {isDeclined && proposal.declinedAt && (
          <div>
            <h3 className="text-sm font-medium text-foreground text-red-600">
              Declined
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {new Date(proposal.declinedAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      {isDraft && briefStatus !== "CLOSED" && (
        <div className="mt-6 flex gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={handleSend}
            disabled={isPending}
          >
            {isPending ? "Sending..." : "Send to Client"}
          </Button>
        </div>
      )}

      {isSentOrViewed && (
        <div className="mt-4 text-sm text-muted-foreground">
          <p>Proposal has been sent to the client and awaits response.</p>
        </div>
      )}

      {isAccepted && (
        <div className="mt-4 text-sm text-green-600">
          <p>✓ Proposal accepted. Project has been created.</p>
        </div>
      )}

      {isDeclined && (
        <div className="mt-4 text-sm text-red-600">
          <p>✗ Proposal declined by client.</p>
        </div>
      )}
    </Card>
  );
}
