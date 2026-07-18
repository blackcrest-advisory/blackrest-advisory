"use client";

import { FiCalendar, FiMessageCircle } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

export const SupportSection = () => {
  return (
    <div className="bg-[var(--color-card-bg)] border border-[var(--color-card-border)] rounded-xl p-4 md:p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[var(--color-muted)] flex items-center justify-center text-2xl">
          👩‍💼
        </div>
        <div>
          <p className="font-medium text-[var(--color-heading)]">
            Your Account Manager: Sarah Mitchell
          </p>
          <p className="text-sm text-[var(--color-body)]">
            📧 sarah@blackcrestadvisory.com &nbsp;·&nbsp; 📞 +44 20 1234 5678
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="primary" size="sm">
          <FiCalendar className="mr-1" /> Schedule Call
        </Button>
        <Button variant="outline" size="sm">
          <FiMessageCircle className="mr-1" /> Send Message
        </Button>
      </div>
    </div>
  );
};
