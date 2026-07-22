"use client";

import { motion } from "framer-motion";
import { FolderOpen } from "lucide-react";

export function ProjectEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-12 text-center"
    >
      <FolderOpen className="h-12 w-12 text-muted-foreground/50" />
      <h3 className="mt-4 text-lg font-medium text-foreground">
        No projects found
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Try adjusting your filters or create a new project.
      </p>
    </motion.div>
  );
}
