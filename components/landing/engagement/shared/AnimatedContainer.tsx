// src/components/engagement/shared/AnimatedContainer.tsx
"use client";

import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedContainerProps extends MotionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
}

export const AnimatedContainer = ({
  children,
  className = "",
  threshold = 0.2,
  ...motionProps
}: AnimatedContainerProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      {...motionProps}
      className={className}
    >
      {children}
    </motion.div>
  );
};
