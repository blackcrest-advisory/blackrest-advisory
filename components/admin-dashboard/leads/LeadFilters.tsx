"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

import {
  leadStatusLabels,
  serviceLabels,
} from "@/types/dashboard/admin/leadTypes";

//===== options =====//
const statusOptions = [
  { value: "all", label: "All Statuses" },
  ...Object.entries(leadStatusLabels).map(([value, label]) => ({
    value,
    label,
  })),
];

const serviceOptions = [
  { value: "all", label: "All Services" },
  ...Object.entries(serviceLabels).map(([value, label]) => ({
    value,
    label,
  })),
];

const priorityOptions = [
  { value: "all", label: "All Priorities" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

interface LeadFiltersProps {
  onFilterChange: (filters: any) => void;
  onSearch: (term: string) => void;
}

export const LeadFilters = ({ onFilterChange, onSearch }: LeadFiltersProps) => {
  const [status, setStatus] = useState("all");
  const [service, setService] = useState("all");
  const [priority, setPriority] = useState("all");
  const [assigned] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  //===== Update filter =====//
  const updateFilter = (key: string, value: string) => {
    if (key === "status") setStatus(value);
    else if (key === "service") setService(value);
    else if (key === "priority") setPriority(value);

    onFilterChange({
      status,
      service,
      priority,
      assigned,
      [key]: value,
    });
  };

  //===== Search =====//
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div
      className="relative z-20 flex flex-col gap-3 xl:flex-row xl:items-center"
    >
      {/*===== SEARCH =====*/}

      <div className="min-w-0 flex-1">
        <Input
          icon={Search}
          placeholder="Search company or contact..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full bg-background"
        />
      </div>

      {/*===== FILTERS =====*/}

      <div
        className="flex flex-col gap-2 sm:grid sm:grid-cols-3 xl:flex xl:flex-row xl:items-center"
      >
        <div
          className="hidden h-9 w-9 shrink-0 items-center justify-center border border-border text-muted-foreground xl:flex"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </div>

        <Select
          options={statusOptions}
          value={status}
          onChange={(value) => updateFilter("status", value)}
          className="w-full sm:w-full xl:w-40"
        />

        <Select
          options={serviceOptions}
          value={service}
          onChange={(value) => updateFilter("service", value)}
          className="w-full sm:w-full xl:w-44"
        />

        <Select
          options={priorityOptions}
          value={priority}
          onChange={(value) => updateFilter("priority", value)}
          className="w-full sm:w-full xl:w-40"
          align="center"
        />
      </div>
    </div>
  );
};
