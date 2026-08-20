"use client";

//===== imports =====//
import { FolderOpen, SearchX, Upload } from "lucide-react";

import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { fadeIn } from "@/lib/utils/animations";

//===== props =====//
interface FilesEmptyStateProps {
  variant: "no-files" | "no-results";
  onUploadClick?: () => void;
  onClearFilters?: () => void;
}

//==============================================================//
// FILES EMPTY STATE
//==============================================================//

export const FilesEmptyState = ({
  variant,
  onUploadClick,
  onClearFilters,
}: FilesEmptyStateProps) => {
  const shouldReduceMotion = useReducedMotion();

  const isNoResults = variant === "no-results";

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : fadeIn}
      initial={shouldReduceMotion ? undefined : "hidden"}
      animate={shouldReduceMotion ? undefined : "visible"}
      className="relative flex min-h-[320px] flex-col items-center justify-center overflow-hidden border border-dashed border-border bg-background/20 px-6 py-12 text-center sm:px-10 sm:py-14"
    >
      {/*===== AMBIENT DETAIL =====*/}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/[0.035] blur-[70px]"
      />

      {/*===== ICON =====*/}

      <div
        className="relative flex h-14 w-14 items-center justify-center rounded-md border border-secondary/15 bg-secondary/[0.045] text-secondary"
      >
        {isNoResults ? (
          <SearchX className="h-5 w-5" />
        ) : (
          <FolderOpen className="h-5 w-5" />
        )}

        <span
          aria-hidden="true"
          className="absolute -bottom-1 -right-1 h-2 w-2 border border-card bg-secondary"
        />
      </div>

      {/*===== COPY =====*/}

      <span
        className="relative mt-5 font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-secondary"
      >
        {isNoResults ? "No records found" : "Document library empty"}
      </span>

      <h3
        className="relative mt-2 text-lg font-semibold tracking-[-0.02em] text-heading"
      >
        {isNoResults ? "No matching files" : "No files yet"}
      </h3>

      <p
        className="relative mt-2 max-w-md text-sm leading-6 text-body"
      >
        {isNoResults
          ? "Try a different search term or clear your filters to see all files."
          : "Upload your first project file to keep documents, designs, and deliverables organized in one place."}
      </p>

      {/*===== ACTION =====*/}

      <div className="relative mt-6">
        {isNoResults ? (
          <Button
            variant="outline"
            size="md"
            onClick={onClearFilters}
            className="!rounded-md"
          >
            Clear Filters
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            onClick={onUploadClick}
            className="!rounded-md"
          >
            <Upload className="h-4 w-4" />
            Upload File
          </Button>
        )}
      </div>

      {/*===== FOOTNOTE =====*/}

      <div
        className="relative mt-7 flex items-center gap-2"
      >
        <span
          className="h-px w-8 bg-secondary/25"
        />

        <span
          className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted-foreground/35"
        >
          Blackcrest document workspace
        </span>

        <span
          className="h-px w-8 bg-secondary/25"
        />
      </div>
    </motion.div>
  );
};
