// components/dashboard/QuickActions/QuickActions.tsx
"use client";

import {
  FiFileText,
  FiUpload,
  FiMessageCircle,
  FiTrendingUp,
} from "react-icons/fi";
import { Button } from "@/components/ui/Button";

export const QuickActions = () => {
  return (
    <div className="bg-[var(--color-card-bg)] border border-[var(--color-card-border)] rounded-xl p-4 md:p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[var(--color-heading)] mb-4">
        ⚡ Quick Actions
      </h2>
      <div className="space-y-2">
        <Button
          variant="outline"
          size="md"
          className="w-full justify-start gap-2"
        >
          <FiFileText /> Request Proposal
        </Button>
        <Button
          variant="outline"
          size="md"
          className="w-full justify-start gap-2"
        >
          <FiUpload /> Upload Files
        </Button>
        <Button
          variant="outline"
          size="md"
          className="w-full justify-start gap-2"
        >
          <FiMessageCircle /> Send Message
        </Button>
        <Button
          variant="outline"
          size="md"
          className="w-full justify-start gap-2"
        >
          <FiTrendingUp /> Request Report
        </Button>
      </div>
    </div>
  );
};
