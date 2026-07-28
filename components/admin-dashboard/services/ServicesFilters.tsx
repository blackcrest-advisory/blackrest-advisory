"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { ServiceStatus } from "@/types/dashboard/admin/servicesType";
import { Card } from "@/components/ui/Card";

const statusOptions = [
  { value: "all", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
  { value: "paused", label: "Paused" },
];

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
}) => (
  <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
    <Input
      icon={Search}
      value={search}
      onChange={(event) => onSearchChange(event.target.value)}
      placeholder="Search services..."
      className="sm:max-w-sm"
    />
    <Select
      options={statusOptions}
      value={status}
      onChange={(value) => onStatusChange(value as ServiceStatus | "all")}
      className="sm:w-40"
    />
  </Card>
);
