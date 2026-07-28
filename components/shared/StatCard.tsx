"use client";

import { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  change?: string;
  color?: string;
  className?: string;
}

export const StatCard = ({
  icon,
  label,
  value,
  change,
  color,
  className = "",
}: StatCardProps) => {
  return (
    //===== Stat Card =====//
    <Card padding="base" hoverEffect className={cn("rounded-xl", className)}>
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className={color || "text-secondary"}>{icon}</span>
        <span className="text-sm">{label}</span>
      </div>
      <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
      {change && (
        <p className="mt-0.5 text-xs text-green-600 dark:text-green-400">
          {change}
        </p>
      )}
    </Card>
  );
};
