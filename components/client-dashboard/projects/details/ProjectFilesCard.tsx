"use client";

import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { fadeInUp } from "@/lib/utils/animations";
import type { ProjectFile } from "@/types/dashboard/client/projectsType";

interface ProjectFilesCardProps {
  files: ProjectFile[];
}

export const ProjectFilesCard = ({ files }: ProjectFilesCardProps) => {
  return (
    //===== Project Files Card =====//
    <motion.div variants={fadeInUp} initial="hidden" animate="visible">
      <Card padding="base" hoverEffect>
        <h2 className="mb-4 text-base font-semibold text-foreground">Files</h2>

        <div className="flex flex-col divide-y divide-border">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between gap-3 py-3"
            >
              <div className="flex items-center gap-3">
                <FileText size={18} className="shrink-0 text-secondary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {file.size} &middot; Uploaded by {file.uploadedBy}
                  </p>
                </div>
              </div>
              <a
                href={file.url}
                className="text-muted-foreground transition-colors hover:text-secondary"
                aria-label={`Download ${file.name}`}
              >
                <Download size={16} />
              </a>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};
