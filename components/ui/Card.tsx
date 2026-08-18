import { ReactNode } from "react";
import { cn } from "@/lib/utils/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "base" | "lg";
  hoverEffect?: boolean;
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  base: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

export const Card = ({
  children,
  className = "",
  padding = "base",
  hoverEffect = false,
}: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-surface)] border border-border/80 bg-card text-card-foreground shadow-[var(--shadow-card)]",
        paddingStyles[padding],
        hoverEffect &&
          "transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-secondary/35 hover:shadow-[var(--shadow-card-hover)]",
        className,
      )}
    >
      {children}
    </div>
  );
};
