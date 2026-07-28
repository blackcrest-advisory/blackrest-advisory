"use client";

import { motion } from "framer-motion";
import { FiStar, FiCalendar, FiBriefcase, FiCheckCircle } from "react-icons/fi";
import { Card } from "@/components/ui/Card";
import { fadeInUp, hoverScale } from "@/utils/animations";

export const FooterStats = () => {
  return (
    //===== Footer Stats Card =====//
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      {...hoverScale}
    >
      <Card padding="base" hoverEffect className="rounded-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-1.5">
              <FiCalendar className="h-4 w-4 text-secondary" />
              Partner Since:{" "}
              <strong className="text-foreground">Jan 2026</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <FiBriefcase className="h-4 w-4 text-secondary" />
              Total Projects: <strong className="text-foreground">4</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <FiCheckCircle className="h-4 w-4 text-secondary" />
              Success Rate: <strong className="text-foreground">100%</strong>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FiStar className="h-4 w-4 text-secondary" />
            <span>
              Client Rating:{" "}
              <strong className="text-foreground">4.9 / 5.0</strong>
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
