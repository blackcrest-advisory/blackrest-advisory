"use client";

//===== imports =====//
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ProposalForm } from "./ProposalForm";
import { ProposalView } from "./ProposalView";

interface ProposalSectionProps {
  briefId: string;
  hasProposal: boolean;
  proposalData: any;
  briefStatus: string;
}

export function ProposalSection({
  briefId,
  hasProposal,
  proposalData,
  briefStatus,
}: ProposalSectionProps) {
  const [showForm, setShowForm] = useState(false);

  // If proposal exists, show the view (read-only + send button)
  if (hasProposal) {
    return <ProposalView proposal={proposalData} briefStatus={briefStatus} />;
  }

  // No proposal yet – show button or form
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      {!showForm ? (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            You haven&apos;t created a proposal for this request yet.
          </p>
          <Button
            variant="primary"
            size="md"
            className="mt-4"
            onClick={() => setShowForm(true)}
          >
            Create Proposal
          </Button>
        </div>
      ) : (
        <ProposalForm briefId={briefId} onSuccess={() => setShowForm(false)} />
      )}
    </div>
  );
}
