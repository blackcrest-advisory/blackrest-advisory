// src/components/engagement/shared/SectionHeader.tsx
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";

interface SectionHeaderProps {
  tag?: string;
  title: string;
  description?: string;
  className?: string;
}

export const SectionHeader = ({
  tag,
  title,
  description,
  className = "",
}: SectionHeaderProps) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`text-center max-w-3xl mx-auto mb-16 ${className}`}
    >
      {tag && (
        <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-3">
          {tag}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-body/80 text-lg md:text-xl leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
};
