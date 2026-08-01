"use client";

import { motion } from "framer-motion";
import { FileText, HardDrive, Layers, UploadCloud } from "lucide-react";
import { FileStatCard } from "@/components/client-dashboard/files/FileStatCard";
import { FilesStats } from "@/types/dashboard/client/filesType";
import { formatFileSize, formatStorageSummary } from "@/lib/utils/format";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

interface FilesStatsGridProps {
  stats: FilesStats;
}

export const FilesStatsGrid = ({ stats }: FilesStatsGridProps) => {
  const storagePercent =
    (stats.storageUsedInBytes / stats.storageLimitInBytes) * 100;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <motion.div variants={fadeInUp}>
        <FileStatCard
          icon={FileText}
          label="Total Files"
          value={stats.totalFiles.toString()}
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
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

      <motion.div variants={fadeInUp}>
        <FileStatCard
          icon={Layers}
          label="Active Projects"
          value={stats.activeProjectsCount.toString()}
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <FileStatCard
          icon={UploadCloud}
          label="Recent Uploads"
          value={stats.recentUploadsCount.toString()}
          subLabel="In the last 7 days"
        />
      </motion.div>
    </motion.div>
  );
};
