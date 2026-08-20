"use client";

//===== imports =====//
import { motion, useReducedMotion } from "framer-motion";
import { FileText, HardDrive, Layers, UploadCloud } from "lucide-react";

import { FileStatCard } from "@/components/client-dashboard/files/FileStatCard";

import type { FilesStats } from "@/types/dashboard/client/filesType";

import { formatFileSize, formatStorageSummary } from "@/lib/utils/format";

import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

//===== props =====//
interface FilesStatsGridProps {
  stats: FilesStats;
}

//==============================================================//
// FILES STATS GRID
//==============================================================//

export const FilesStatsGrid = ({ stats }: FilesStatsGridProps) => {
  const shouldReduceMotion = useReducedMotion();

  const storagePercent =
    (stats.storageUsedInBytes / stats.storageLimitInBytes) * 100;

  return (
    <motion.section
      variants={shouldReduceMotion ? undefined : staggerContainer}
      initial={shouldReduceMotion ? undefined : "hidden"}
      animate={shouldReduceMotion ? undefined : "visible"}
      className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
    >
      {/*===== SECTION LABEL =====*/}

      <div
        className="flex flex-col gap-2 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
      >
        <div>
          <span
            className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary"
          >
            Workspace overview
          </span>

          <p
            className="mt-1 text-xs text-muted-foreground"
          >
            A snapshot of your shared documents and project storage.
          </p>
        </div>

        <span
          className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted-foreground/40"
        >
          Client file portfolio
        </span>
      </div>

      {/*===== METRIC STRIP =====*/}

      <div
        className="grid min-w-0 sm:grid-cols-2 xl:grid-cols-4"
      >
        <motion.div
          variants={shouldReduceMotion ? undefined : fadeInUp}
          className="min-w-0 border-b border-border sm:border-r xl:border-b-0"
        >
          <FileStatCard
            icon={FileText}
            label="Total Files"
            value={stats.totalFiles.toString()}
          />
        </motion.div>

        <motion.div
          variants={shouldReduceMotion ? undefined : fadeInUp}
          className="min-w-0 border-b border-border xl:border-b-0 xl:border-r"
        >
          <FileStatCard
            icon={HardDrive}
            label="Storage Used"
            value={formatFileSize(stats.storageUsedInBytes)}
            subLabel={formatStorageSummary(
              stats.storageUsedInBytes,
              stats.storageLimitInBytes,
            )}
            progressPercent={storagePercent}
          />
        </motion.div>

        <motion.div
          variants={shouldReduceMotion ? undefined : fadeInUp}
          className="min-w-0 border-b border-border sm:border-b-0 sm:border-r"
        >
          <FileStatCard
            icon={Layers}
            label="Active Projects"
            value={stats.activeProjectsCount.toString()}
          />
        </motion.div>

        <motion.div
          variants={shouldReduceMotion ? undefined : fadeInUp}
          className="min-w-0"
        >
          <FileStatCard
            icon={UploadCloud}
            label="Recent Uploads"
            value={stats.recentUploadsCount.toString()}
            subLabel="In the last 7 days"
          />
        </motion.div>
      </div>

      {/*===== FOOTER =====*/}

      <div
        className="flex flex-col gap-2 border-t border-border bg-muted/10 px-5 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
      >
        <div
          className="flex items-center gap-2"
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-success"
          />

          <span
            className="font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/40"
          >
            Workspace synchronized
          </span>
        </div>

        <span
          className="text-[10px] text-muted-foreground"
        >
          {formatFileSize(stats.storageUsedInBytes)} currently stored
        </span>
      </div>
    </motion.section>
  );
};
