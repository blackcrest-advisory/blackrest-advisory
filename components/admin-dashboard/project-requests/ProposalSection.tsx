"use client";

//===== imports =====//
import { useState } from "react";
import { FilePlus2, Sparkles } from "lucide-react";

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

  //===== existing proposal =====//
  if (hasProposal) {
    return <ProposalView proposal={proposalData} briefStatus={briefStatus} />;
  }

  //===== no proposal yet =====//
  return (
    <section
      className="
        relative
        overflow-hidden
        border border-border
        bg-card
        shadow-[var(--shadow-card)]
      "
    >
      {/* top signal */}
      <div
        aria-hidden="true"
        className="
          absolute left-0 top-0
          h-[2px] w-full
          bg-gradient-to-r
          from-secondary
          via-secondary/35
          to-transparent
        "
      />

      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-20 -top-20
          h-44 w-44
          rounded-full
          bg-secondary/[0.06]
          blur-[80px]
        "
      />

      {!showForm ? (
        <div
          className="
            relative z-10
            flex
            flex-col
            items-center
            justify-center
            px-5 py-10
            text-center
            sm:px-6
            sm:py-12
          "
        >
          <div
            className="
              flex h-11 w-11
              items-center
              justify-center
              rounded-md
              border border-secondary/15
              bg-secondary/[0.05]
              text-secondary
            "
          >
            <FilePlus2 className="h-4.5 w-4.5" />
          </div>

          <div
            className="
              mt-4
              flex
              items-center
              gap-2
            "
          >
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
              Proposal workspace
            </span>
          </div>

          <h2
            className="
              mt-2
              text-lg
              font-semibold
              tracking-[-0.02em]
              text-heading
            "
          >
            No proposal created yet
          </h2>

          <p
            className="
              mt-2
              max-w-md
              text-sm
              leading-6
              text-muted-foreground
            "
          >
            You haven&apos;t created a proposal for this request yet.
          </p>

          <Button
            variant="primary"
            size="md"
            className="
              mt-5
              !rounded-md
            "
            onClick={() => setShowForm(true)}
          >
            Create Proposal
          </Button>

          <div
            className="
              mt-6
              flex
              items-center
              gap-2
              border-t border-border
              pt-4
            "
          >
            <span
              className="
                h-1.5 w-1.5
                rounded-full
                bg-secondary
              "
            />

            <span
              className="
                font-mono
                text-[7px]
                uppercase
                tracking-[0.14em]
                text-muted-foreground/40
              "
            >
              Proposal not started
            </span>
          </div>
        </div>
      ) : (
        <div className="relative z-10">
          {/* form header */}
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
              border-b border-border
              px-5 py-4
              sm:px-6
            "
          >
            <div>
              <span
                className="
                  font-mono
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-secondary
                "
              >
                Proposal creation
              </span>

              <h2
                className="
                  mt-1
                  text-base
                  font-semibold
                  text-heading
                "
              >
                Create Proposal
              </h2>
            </div>

            <span
              className="
                hidden
                font-mono
                text-[7px]
                uppercase
                tracking-[0.14em]
                text-muted-foreground/35
                sm:block
              "
            >
              Draft workspace
            </span>
          </div>

          <div
            className="
              px-5 py-5
              sm:px-6
              sm:py-6
            "
          >
            <ProposalForm
              briefId={briefId}
              onSuccess={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </section>
  );
}
