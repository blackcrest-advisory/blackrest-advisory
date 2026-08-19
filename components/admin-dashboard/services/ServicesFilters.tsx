"use client";

//===== imports =====//
import { Search, SlidersHorizontal } from "lucide-react";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

import type { ServiceStatus } from "@/types/dashboard/admin/servicesType";

//===== options =====//
const statusOptions = [
  {
    value: "all",
    label: "All statuses",
  },
  {
    value: "active",
    label: "Active",
  },
  {
    value: "paused",
    label: "Paused",
  },
];

//==============================================================//
// SERVICES FILTERS
//==============================================================//

export const ServicesFilters = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: {
  search: string;
  status: ServiceStatus | "all";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ServiceStatus | "all") => void;
}) => {
  return (
    <div
      className="
        relative
        border border-border
        bg-card
        shadow-[var(--shadow-card)]
      "
    >
      {/* top signal */}
      <div
        aria-hidden="true"
        className="
          absolute
          left-0 top-0
          h-[2px] w-14
          bg-secondary/60
        "
      />

      {/* ====================================================== */}
      {/* HEADER                                                 */}
      {/* ====================================================== */}

      <div
        className="
          flex
          items-center
          gap-3
          border-b border-border
          px-4 py-4
        "
      >
        <div
          className="
            flex h-8 w-8
            shrink-0
            items-center
            justify-center
            rounded-md
            border border-border
            bg-background
            text-secondary
          "
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
        </div>

        <div>
          <span
            className="
              font-mono
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-secondary
            "
          >
            Portfolio control
          </span>

          <p
            className="
              mt-0.5
              text-xs
              text-muted-foreground
            "
          >
            Refine the capability register.
          </p>
        </div>
      </div>

      {/* ====================================================== */}
      {/* FILTERS                                                */}
      {/* ====================================================== */}

      <div className="space-y-4 px-4 py-4">
        <div>
          <label
            className="
              mb-2
              block
              font-mono
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.13em]
              text-muted-foreground/40
            "
          >
            Search capability
          </label>

          <Input
            icon={Search}
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search services..."
            className="w-full"
          />
        </div>

        <div>
          <label
            className="
              mb-2
              block
              font-mono
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.13em]
              text-muted-foreground/40
            "
          >
            Availability
          </label>

          <Select
            options={statusOptions}
            value={status}
            onChange={(value) => onStatusChange(value as ServiceStatus | "all")}
            className="w-full"
            align="center"
          />
        </div>
      </div>

      {/* ====================================================== */}
      {/* FILTER FOOTER                                         */}
      {/* ====================================================== */}

      <div
        className="
          flex
          items-center
          gap-2
          border-t border-border
          bg-muted/10
          px-4 py-2.5
        "
      >
        <span className="h-1.5 w-1.5 rounded-full bg-secondary" />

        <span
          className="
            font-mono
            text-[7px]
            uppercase
            tracking-[0.13em]
            text-muted-foreground/40
          "
        >
          Portfolio filters
        </span>
      </div>
    </div>
  );
};
