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
  base: "p-6",
  lg: "p-8",
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
        "rounded-[10px] border border-border bg-card text-card-foreground",
        paddingStyles[padding],
        hoverEffect &&
          "transition-all duration-200 hover:border-secondary/40 hover:shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
};
