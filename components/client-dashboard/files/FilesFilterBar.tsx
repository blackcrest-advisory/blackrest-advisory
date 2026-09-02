"use client";

//===== imports =====//
import { Filter, Search, SlidersHorizontal } from "lucide-react";

import { Input } from "@/components/ui/Input";
import { Select, type SelectOption } from "@/components/ui/Select";

import type {
  FilesSortOption,
  FileTypeFilter,
} from "@/types/dashboard/client/filesType";

//===== props =====//
interface FilesFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: FileTypeFilter;
  onTypeFilterChange: (value: FileTypeFilter) => void;
  sortBy: FilesSortOption;
  onSortByChange: (value: FilesSortOption) => void;
}

//==============================================================//
// OPTIONS
//==============================================================//

const typeOptions: SelectOption[] = [
  {
    value: "all",
    label: "All Files",
  },
  {
    value: "document",
    label: "Documents",
  },
  {
    value: "image",
    label: "Images",
  },
  {
    value: "video",
    label: "Videos",
  },
  {
    value: "archive",
    label: "Archives",
  },
  {
    value: "other",
    label: "Others",
  },
];

const sortOptions: SelectOption[] = [
  {
    value: "newest",
    label: "Newest First",
  },
  {
    value: "oldest",
    label: "Oldest First",
  },
  {
    value: "name",
    label: "File Name",
  },
  {
    value: "size",
    label: "File Size",
  },
];

//==============================================================//
// FILES FILTER BAR
//==============================================================//

export const FilesFilterBar = ({
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  sortBy,
  onSortByChange,
}: FilesFilterBarProps) => {
  return (
    <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
      {/*===== SEARCH =====*/}

      <div className="min-w-0">
        <div className="mb-2 flex items-center gap-2">
          <Search className="h-3.5 w-3.5 text-secondary" />

          <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/45">
            Search library
          </span>
        </div>

        <Input
          icon={Search}
          placeholder="Search files or projects..."
          aria-label="Search files"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full lg:max-w-md"
        />
      </div>

      {/*===== FILTER CONTROLS =====*/}

      <div className="grid gap-3 sm:grid-cols-2 lg:flex lg:items-end">
        {/* type */}
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-secondary" />

            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/45">
              File type
            </span>
          </div>

          <Select
            options={typeOptions}
            value={typeFilter}
            onChange={(value) => onTypeFilterChange(value as FileTypeFilter)}
            className="w-full sm:min-w-44"
          />
        </div>

        {/* sort */}
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <SlidersHorizontal className="h-3.5 w-3.5 text-secondary" />

            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/45">
              Sort by
            </span>
          </div>

          <Select
            options={sortOptions}
            value={sortBy}
            onChange={(value) => onSortByChange(value as FilesSortOption)}
            className="w-full sm:min-w-44"
          />
        </div>
      </div>
    </div>
  );
};
