"use client";

//===== imports =====//
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  clientAcceptProposal,
  clientDeclineProposal,
} from "@/lib/actions/proposals/proposal.action";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/TextArea";

interface ClientProposalActionsProps {
  proposalId: string;
  briefId: string;
  currentStatus: string; // proposal status
}

export function ClientProposalActions({
  proposalId,
  briefId,
  currentStatus,
}: ClientProposalActionsProps) {
  const [isAccepting, startAccepting] = useTransition();
  const [isDeclining, startDeclining] = useTransition();
  const [feedback, setFeedback] = useState("");
  const [declineReason, setDeclineReason] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const router = useRouter();

  const handleAccept = () => {
    startAccepting(async () => {
      const result = await clientAcceptProposal({
        proposalId,
        feedback: feedback || undefined,
      });
      if (result.success) {
        toast.success("Proposal accepted! Project has been created.");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to accept proposal");
      }
    });
  };

  const handleDecline = () => {
    startDeclining(async () => {
      const result = await clientDeclineProposal({
        proposalId,
        feedback: feedback || undefined,
        declinedReason: declineReason || "Client declined the proposal",
      });
      if (result.success) {
        toast.success("Proposal declined.");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to decline proposal");
      }
    });
  };

  if (currentStatus !== "SENT" && currentStatus !== "VIEWED") {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">
          {currentStatus === "ACCEPTED" &&
            "You have accepted this proposal. Project is being set up."}
          {currentStatus === "DECLINED" && "You have declined this proposal."}
          {currentStatus === "DRAFT" &&
            "Proposal is still being prepared by the team."}
          {currentStatus === "EXPIRED" && "This proposal has expired."}
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-foreground">
        Proposal Response
      </h2>

      <div className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="feedback"
            className="text-sm font-medium text-foreground"
          >
            Feedback (optional)
          </label>
          <Textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Any comments or questions about the proposal..."
            className="mt-1"
            rows={3}
          />
        </div>

        {showFeedback && (
          <div>
            <label
              htmlFor="declineReason"
              className="text-sm font-medium text-foreground"
            >
              Reason for declining <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="declineReason"
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              placeholder="Why are you declining this proposal?"
              className="mt-1"
              rows={2}
            />
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            size="md"
            onClick={handleAccept}
            disabled={isAccepting || isDeclining}
          >
            {isAccepting ? "Accepting..." : "Accept Proposal"}
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={() => setShowFeedback(!showFeedback)}
            disabled={isAccepting || isDeclining}
          >
            {showFeedback ? "Hide decline options" : "Decline Proposal"}
          </Button>

          {showFeedback && (
            <Button
              variant="ghost"
              size="md"
              onClick={handleDecline}
              disabled={isDeclining || isAccepting || !declineReason.trim()}
            >
              {isDeclining ? "Declining..." : "Confirm Decline"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
