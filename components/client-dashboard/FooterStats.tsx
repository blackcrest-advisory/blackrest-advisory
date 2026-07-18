// components/dashboard/FooterStats/FooterStats.tsx
"use client";

import { FiStar } from "react-icons/fi";

export const FooterStats = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-[var(--color-body)] border-t border-[var(--color-border)] pt-6">
      <div className="flex items-center gap-6">
        <span>
          ⭐ Partner Since:{" "}
          <strong className="text-[var(--color-heading)]">Jan 2026</strong>
        </span>
        <span>
          📊 Total Projects:{" "}
          <strong className="text-[var(--color-heading)]">4</strong>
        </span>
        <span>
          ✅ Success Rate:{" "}
          <strong className="text-[var(--color-heading)]">100%</strong>
        </span>
      </div>
      <div className="flex items-center gap-1">
        <FiStar className="text-[var(--color-gold)]" />
        <span>
          Client Rating:{" "}
          <strong className="text-[var(--color-heading)]">4.9 / 5.0</strong>
        </span>
      </div>
    </div>
  );
};
