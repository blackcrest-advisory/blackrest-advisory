"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FilesPageHeader } from "@/components/client-dashboard/files/FilesPageHeader";
import { FilesStatsGrid } from "@/components/client-dashboard/files/FilesStatsGrid";
import { FilesFilterBar } from "@/components/client-dashboard/files/FilesFilterBar";
import { FilesTable } from "@/components/client-dashboard/files/FilesTable";
import { FilesEmptyState } from "@/components/client-dashboard/files/FilesEmptyState";
import { useFilesFilter } from "@/hooks/useFilesFilter";
import {
  fetchClientFiles,
  type ClientFilesResponse,
} from "@/api-client/client/files.api";
import type {
  FilesStats,
  ProjectFile,
} from "@/types/dashboard/client/filesType";

export default function FilesPage() {
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [stats, setStats] = useState<FilesStats>({
    totalFiles: 0,
    storageUsedInBytes: 0,
    storageLimitInBytes: 53687091200,
    activeProjectsCount: 0,
    recentUploadsCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetchClientFiles();
        setFiles(response.files);
        setStats(response.stats);
      } catch {
        toast.error("Failed to load files");
      } finally {
        setLoading(false);
      }
    };

    void fetchFiles();
  }, []);

  const {
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    sortBy,
    setSortBy,
    filteredFiles,
  } = useFilesFilter(files);

  const hasAnyFiles = files.length > 0;
  const hasFilteredResults = filteredFiles.length > 0;

  const handleUploadClick = () => {
    toast("File upload will be available once storage is connected.");
  };

  const handleClearFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setSortBy("newest");
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-[var(--color-body)]">
        Loading files...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <FilesPageHeader onUploadClick={handleUploadClick} />

      <FilesStatsGrid stats={stats} />

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
