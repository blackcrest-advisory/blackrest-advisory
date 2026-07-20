"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";

interface ProjectDescriptionProps {
  description: string;
}

export const ProjectDescription = ({
  description,
}: ProjectDescriptionProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6 shadow-sm"
    >
      <h2 className="mb-3 text-base font-semibold text-[var(--color-heading)]">
        Project Overview
      </h2>
      <p className="text-sm leading-relaxed text-[var(--color-body)]">
        {description}
      </p>
    </motion.div>
  );
};
