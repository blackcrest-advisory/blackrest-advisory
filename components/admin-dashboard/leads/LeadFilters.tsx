"use client";

import { useState } from "react";
import { Search, Calendar } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  LeadStatus,
  LeadPriority,
  LeadService,
} from "@/types/dashboard/admin/leadTypes";
import {
  leadStatusLabels,
  serviceLabels,
} from "@/types/dashboard/admin/leadTypes";
import { Button } from "@/components/ui/Button";

const statusOptions = [
  { value: "all", label: "All Statuses" },
  ...Object.entries(leadStatusLabels).map(([value, label]) => ({
    value,
    label,
  })),
];

const serviceOptions = [
  { value: "all", label: "All Services" },
  ...Object.entries(serviceLabels).map(([value, label]) => ({ value, label })),
];

const priorityOptions = [
  { value: "all", label: "All Priorities" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const assignedOptions = [
  { value: "all", label: "All Sales" },
  { value: "Rasel", label: "Rasel" },
  { value: "Mostafa", label: "Mostafa" },
  { value: "Soumik", label: "Soumik" },
  { value: "Nahid", label: "Nahid" },
  { value: "Shakil", label: "Shakil" },
];

interface LeadFiltersProps {
  onFilterChange: (filters: any) => void;
  onSearch: (term: string) => void;
}

export const LeadFilters = ({ onFilterChange, onSearch }: LeadFiltersProps) => {
  const [status, setStatus] = useState<string>("all");
  const [service, setService] = useState<string>("all");
  const [priority, setPriority] = useState<string>("all");
  const [assigned, setAssigned] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = () => {
    onFilterChange({ status, service, priority, assigned });
  };

  //===== Trigger filter on any change =====//
  const updateFilter = (key: string, value: string) => {
    if (key === "status") setStatus(value);
    else if (key === "service") setService(value);
    else if (key === "priority") setPriority(value);
    else if (key === "assigned") setAssigned(value);
    onFilterChange({ status, service, priority, assigned, [key]: value });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:flex-wrap">
      <div className="relative flex-1 min-w-[200px]">
        <Input
          icon={Search}
          placeholder="Search company or contact..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Select
          options={statusOptions}
          value={status}
          onChange={(v) => updateFilter("status", v)}
          className="w-40"
        />
        <Select
          options={serviceOptions}
          value={service}
          onChange={(v) => updateFilter("service", v)}
          className="w-44"
        />
        <Select
          options={priorityOptions}
          value={priority}
          onChange={(v) => updateFilter("priority", v)}
          className="w-40"
        />
        {/* <Select
          options={assignedOptions}
          value={assigned}
          onChange={(v) => updateFilter("assigned", v)}
          className="w-40"
        /> */}
      </div>
    </div>
  );
};
