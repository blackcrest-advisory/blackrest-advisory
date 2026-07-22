"use client";

import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import { fadeInUp } from "@/utils/animations";
import { ProjectFile } from "@/types/dashboard/client/projectsType";

interface ProjectFilesCardProps {
  files: ProjectFile[];
}

export const ProjectFilesCard = ({ files }: ProjectFilesCardProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6 shadow-sm"
    >
      <h2 className="mb-4 text-base font-semibold text-[var(--color-heading)]">
        Files
      </h2>

      <div className="flex flex-col divide-y divide-[var(--color-border)]">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between gap-3 py-3"
          >
            <div className="flex items-center gap-3">
              <FileText size={18} className="shrink-0 text-secondary" />
              <div>
                <p className="text-sm font-medium text-[var(--color-heading)]">
                  {file.name}
                </p>
                <p className="text-xs text-[var(--color-body)]">
                  {file.size} &middot; Uploaded by {file.uploadedBy}
                </p>
              </div>
            </div>
            <a
              href={file.url}
              className="text-[var(--color-body)] transition-colors hover:text-secondary"
              aria-label={`Download ${file.name}`}
            >
              <Download size={16} />
            </a>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
