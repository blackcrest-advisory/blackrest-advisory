"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select, SelectOption } from "@/components/ui/Select";
import {
  FilesSortOption,
  FileTypeFilter,
} from "@/types/dashboard/client/filesType";

interface FilesFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: FileTypeFilter;
  onTypeFilterChange: (value: FileTypeFilter) => void;
  sortBy: FilesSortOption;
  onSortByChange: (value: FilesSortOption) => void;
}

const typeOptions: SelectOption[] = [
  { value: "all", label: "All Files" },
  { value: "document", label: "Documents" },
  { value: "image", label: "Images" },
  { value: "video", label: "Videos" },
  { value: "archive", label: "Archives" },
  { value: "other", label: "Others" },
];

const sortOptions: SelectOption[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "name", label: "File Name" },
  { value: "size", label: "File Size" },
];

export const FilesFilterBar = ({
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  sortBy,
  onSortByChange,
}: FilesFilterBarProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Input
        icon={Search}
        placeholder="Search files or projects..."
        aria-label="Search files"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        className="sm:max-w-xs"
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Select
          options={typeOptions}
          value={typeFilter}
          onChange={(value) => onTypeFilterChange(value as FileTypeFilter)}
          className="sm:w-44"
        />
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={(value) => onSortByChange(value as FilesSortOption)}
          className="sm:w-44"
        />
      </div>
    </div>
  );
};
