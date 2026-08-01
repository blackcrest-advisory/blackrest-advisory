"use client";

import { cn } from "@/lib/utils/utils";
import { motion } from "framer-motion";

interface LoaderProps {
  /** Size variant */
  size?: "sm" | "md" | "lg" | "xl";
  /** If true, renders a full‑page overlay with backdrop blur */
  fullPage?: boolean;
  /** Additional className for the spinner */
  className?: string;
  /** Optional label text shown below the spinner */
  label?: string;
}

const sizeMap = {
  sm: "h-6 w-6 border-2",
  md: "h-10 w-10 border-3",
  lg: "h-16 w-16 border-4",
  xl: "h-24 w-24 border-[5px]",
};

export function Loader({
  size = "md",
  fullPage = false,
  className = "",
  label,
}: LoaderProps) {
  const spinner = (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 1,
        ease: "linear",
      }}
      className={cn(
        "rounded-full border-solid border-[var(--color-card-border)] border-t-[var(--color-secondary)]",
        sizeMap[size],
        className,
      )}
    />
  );

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      {spinner}
      {label && (
        <p className="text-sm text-[var(--color-body)] font-medium">{label}</p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-background)]/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return content;
}
