"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { fadeInUp } from "@/lib/utils/animations";

interface ProjectDescriptionProps {
  description: string;
}

export const ProjectDescription = ({
  description,
}: ProjectDescriptionProps) => {
  return (
    //===== Project Description Card =====//
    <motion.div variants={fadeInUp} initial="hidden" animate="visible">
      <Card padding="base" hoverEffect>
        <h2 className="mb-3 text-base font-semibold text-foreground">
          Project Overview
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </Card>
    </motion.div>
  );
};
