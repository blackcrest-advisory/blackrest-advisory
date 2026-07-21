"use client";

import toast from "react-hot-toast";
import { FilesPageHeader } from "@/components/client-dashboard/files/FilesPageHeader";
import { FilesStatsGrid } from "@/components/client-dashboard/files/FilesStatsGrid";
import { FilesFilterBar } from "@/components/client-dashboard/files/FilesFilterBar";
import { FilesTable } from "@/components/client-dashboard/files/FilesTable";
import { FilesEmptyState } from "@/components/client-dashboard/files/FilesEmptyState";
import { useFilesFilter } from "@/hooks/useFilesFilter";
import { mockFilesStats, mockProjectFiles } from "@/mock-data/filesMockData";

export default function FilesPage() {
  const {
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    sortBy,
    setSortBy,
    filteredFiles,
  } = useFilesFilter(mockProjectFiles);

  const hasAnyFiles = mockProjectFiles.length > 0;
  const hasFilteredResults = filteredFiles.length > 0;

  //===== Upload is disabled until the storage backend is wired up =====//
  const handleUploadClick = () => {
    toast("File upload will be available once storage is connected.");
  };

  const handleClearFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setSortBy("newest");
  };

  return (
    <div className="flex flex-col gap-6">
      <FilesPageHeader onUploadClick={handleUploadClick} />

      <FilesStatsGrid stats={mockFilesStats} />

      {hasAnyFiles && (
        <FilesFilterBar
          search={search}
          onSearchChange={setSearch}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
        />
      )}

      {!hasAnyFiles && (
        <FilesEmptyState variant="no-files" onUploadClick={handleUploadClick} />
      )}

      {hasAnyFiles && hasFilteredResults && (
        <FilesTable files={filteredFiles} />
      )}

      {hasAnyFiles && !hasFilteredResults && (
        <FilesEmptyState
          variant="no-results"
          onClearFilters={handleClearFilters}
        />
      )}
    </div>
  );
}
