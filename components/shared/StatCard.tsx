"use client";

import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  change?: string;
  color?: string;
}

export const StatCard = ({
  icon,
  label,
  value,
  change,
  color,
}: StatCardProps) => {
  return (
    <div className="bg-[var(--color-card-bg)] border border-[var(--color-card-border)] rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 text-[var(--color-body)]">
        <span style={{ color }}>{icon}</span>
        <span className="text-sm">{label}</span>
      </div>
      <p className="text-2xl font-bold text-[var(--color-heading)] mt-1">
        {value}
      </p>
      {change && (
        <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">
          {change}
        </p>
      )}
    </div>
  );
};
