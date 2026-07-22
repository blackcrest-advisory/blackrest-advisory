"use client";

import { Search } from "lucide-react";
import {
  industries,
  serviceTypes,
  statuses,
} from "@/mock-data/projectsMockData";
import type {
  ProjectStatus,
  Industry,
  ServiceType,
} from "@/types/dashboard/client/projectsType";

interface ProjectFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: ProjectStatus | "all";
  onStatusChange: (value: ProjectStatus | "all") => void;
  industryFilter: Industry | "all";
  onIndustryChange: (value: Industry | "all") => void;
  serviceFilter: ServiceType | "all";
  onServiceChange: (value: ServiceType | "all") => void;
}

export function ProjectFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  industryFilter,
  onIndustryChange,
  serviceFilter,
  onServiceChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-body)]" />
        <input
          type="text"
          placeholder="Search projects or clients..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-[var(--color-card-border)] bg-[var(--color-card-bg)] py-2 pl-10 pr-4 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-body)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/20"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={statusFilter}
          onChange={(e) =>
            onStatusChange(e.target.value as ProjectStatus | "all")
          }
          className="rounded-lg border border-[var(--color-card-border)] bg-[var(--color-card-bg)] px-3 py-2 text-sm text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/20"
        >
          <option value="all">All Status</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}
            </option>
          ))}
        </select>

        <select
          value={industryFilter}
          onChange={(e) => onIndustryChange(e.target.value as Industry | "all")}
          className="rounded-lg border border-[var(--color-card-border)] bg-[var(--color-card-bg)] px-3 py-2 text-sm text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/20"
        >
          <option value="all">All Industries</option>
          {industries.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>

        <select
          value={serviceFilter}
          onChange={(e) =>
            onServiceChange(e.target.value as ServiceType | "all")
          }
          className="rounded-lg border border-[var(--color-card-border)] bg-[var(--color-card-bg)] px-3 py-2 text-sm text-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]/20"
        >
          <option value="all">All Services</option>
          {serviceTypes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
