"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export const SectionHeading = ({
  label,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) => {
  const alignment = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn("max-w-3xl mx-auto", alignment[align], className)}
    >
      {label && (
        <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[var(--color-secondary)] mb-3">
          {label}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-heading)] leading-tight">
        {title} {/* now accepts JSX */}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-[var(--color-body)] leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
