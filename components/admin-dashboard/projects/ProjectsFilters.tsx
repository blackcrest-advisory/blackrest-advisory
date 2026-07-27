"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

import type { ProjectHealth } from "@/types/dashboard/admin/projectsType";
import type { ProjectStatus } from "@/types/dashboard/client/projectsType";
import { Card } from "@/components/ui/Card";

const statusOptions = [
  "all",
  "active",
  "planning",
  "in-review",
  "on-hold",
  "completed",
].map((value) => ({
  value,
  label:
    value === "all"
      ? "All statuses"
      : value
          .replace("-", " ")
          .replace(/\b\w/g, (letter) => letter.toUpperCase()),
}));

const healthOptions = [
  { value: "all", label: "All health" },
  { value: "on-track", label: "On track" },
  { value: "at-risk", label: "At risk" },
  { value: "overdue", label: "Overdue" },
];

interface ProjectsFiltersProps {
  search: string;
  status: ProjectStatus | "all";
  health: ProjectHealth | "all";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ProjectStatus | "all") => void;
  onHealthChange: (value: ProjectHealth | "all") => void;
}

export const ProjectsFilters = ({
  search,
  status,
  health,
  onSearchChange,
  onStatusChange,
  onHealthChange,
}: ProjectsFiltersProps) => {
  return (
    <Card className="flex flex-col gap-3 rounded-xl p-4 lg:flex-row lg:items-center">
      <Input
        icon={Search}
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search project, client, or manager..."
        className="lg:max-w-sm"
      />

      <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
        <Select
          options={statusOptions}
          value={status}
          onChange={(value) => onStatusChange(value as ProjectStatus | "all")}
        />

        <Select
          options={healthOptions}
          value={health}
          onChange={(value) => onHealthChange(value as ProjectHealth | "all")}
        />
      </div>
    </Card>
  );
};
