"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
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
import { Card } from "@/components/ui/Card";

//===== Map status values to display labels =====//
const statusOptions = [
  { value: "all", label: "All Status" },
  ...statuses.map((s) => ({
    value: s,
    label: s.charAt(0).toUpperCase() + s.slice(1).replace("-", " "),
  })),
];

const industryOptions = [
  { value: "all", label: "All Industries" },
  ...industries.map((i) => ({ value: i, label: i })),
];

const serviceOptions = [
  { value: "all", label: "All Services" },
  ...serviceTypes.map((s) => ({ value: s, label: s })),
];

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
    //===== Project Filters =====//
    <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 max-w-sm">
        <Input
          icon={Search}
          type="text"
          placeholder="Search projects or clients..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={(value) => onStatusChange(value as ProjectStatus | "all")}
          className="min-w-36"
        />

        <Select
          options={industryOptions}
          value={industryFilter}
          onChange={(value) => onIndustryChange(value as Industry | "all")}
          className="min-w-40"
        />

        <Select
          options={serviceOptions}
          value={serviceFilter}
          onChange={(value) => onServiceChange(value as ServiceType | "all")}
          className="min-w-36"
        />
      </div>
    </Card>
  );
}
