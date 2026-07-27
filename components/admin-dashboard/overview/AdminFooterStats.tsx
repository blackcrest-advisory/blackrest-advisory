"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { fadeInUp, hoverScale } from "@/utils/animations";
import type { FooterStat } from "@/types/dashboard/admin/overviewType";

interface AdminFooterStatsProps {
  stats: FooterStat[];
}

export const AdminFooterStats = ({ stats }: AdminFooterStatsProps) => {
  return (
    //===== Footer Stats Grid =====//
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      {...hoverScale}
    >
      <Card padding="base" hoverEffect className="rounded-xl">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};
