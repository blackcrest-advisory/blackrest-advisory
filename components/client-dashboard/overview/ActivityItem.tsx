// components/dashboard/RecentActivity/ActivityItem.tsx
"use client";

import {
  FiFileText,
  FiMessageCircle,
  FiCheckCircle,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";
import { Activity } from "@/types/dashboard/client/overviewType";

const iconMap = {
  file: FiFileText,
  message: FiMessageCircle,
  check: FiCheckCircle,
  dollar: FiDollarSign,
  trending: FiTrendingUp,
};

export const ActivityItem = ({ activity }: { activity: Activity }) => {
  const Icon = iconMap[activity.iconName as keyof typeof iconMap] || FiFileText;
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-[var(--color-body)]">
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-[var(--color-heading)]">{activity.text}</p>
        <p className="text-xs text-[var(--color-body)]">{activity.time}</p>
      </div>
    </div>
  );
};
