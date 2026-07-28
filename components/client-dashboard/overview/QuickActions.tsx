"use client";

import { motion } from "framer-motion";
import {
  FiFileText,
  FiUpload,
  FiMessageCircle,
  FiTrendingUp,
} from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { fadeInUp, hoverScale } from "@/utils/animations";

export const QuickActions = () => {
  return (
    //===== Quick Actions Card =====//
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      {...hoverScale}
    >
      <Card padding="base" hoverEffect className="rounded-xl">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Quick Actions
        </h2>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="md"
            className="w-full justify-start gap-2"
          >
            <FiFileText /> Request Proposal
          </Button>
          <Button
            variant="outline"
            size="md"
            className="w-full justify-start gap-2"
          >
            <FiUpload /> Upload Files
          </Button>
          <Button
            variant="outline"
            size="md"
            className="w-full justify-start gap-2"
          >
            <FiMessageCircle /> Send Message
          </Button>
          <Button
            variant="outline"
            size="md"
            className="w-full justify-start gap-2"
          >
            <FiTrendingUp /> Request Report
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
