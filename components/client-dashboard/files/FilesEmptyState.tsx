"use client";

import { FolderOpen, SearchX, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { fadeIn } from "@/lib/utils/animations";

interface FilesEmptyStateProps {
  variant: "no-files" | "no-results";
  onUploadClick?: () => void;
  onClearFilters?: () => void;
}

export const FilesEmptyState = ({
  variant,
  onUploadClick,
  onClearFilters,
}: FilesEmptyStateProps) => {
  const isNoResults = variant === "no-results";

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center rounded-xl border border-dashed border-card-border bg-card-bg px-6 py-16 text-center"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10">
        {isNoResults ? (
          <SearchX className="h-8 w-8 text-secondary" />
        ) : (
          <FolderOpen className="h-8 w-8 text-secondary" />
        )}
      </span>

      <h3 className="mt-5 text-lg font-semibold text-heading">
        {isNoResults ? "No matching files" : "No files yet"}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-body">
        {isNoResults
          ? "Try a different search term or clear your filters to see all files."
          : "Upload your first project file to keep documents, designs, and deliverables organized in one place."}
      </p>

      {isNoResults ? (
        <Button
          variant="outline"
          size="md"
          onClick={onClearFilters}
          className="mt-6"
        >
          Clear Filters
        </Button>
      ) : (
        <Button
          variant="primary"
          size="md"
          onClick={onUploadClick}
          className="mt-6"
        >
          <Upload className="h-4 w-4" />
          Upload File
        </Button>
      )}
    </motion.div>
  );
};
