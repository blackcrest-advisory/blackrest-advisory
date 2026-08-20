"use client";

//===== imports =====//
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

//==============================================================//
// CLIENT FILES PAGE
//==============================================================//

export default function FilesPage() {
  //===== state =====//
  const [files, setFiles] = useState<ProjectFile[]>([]);

  const [stats, setStats] = useState<FilesStats>({
    totalFiles: 0,
    storageUsedInBytes: 0,
    storageLimitInBytes: 53687091200,
    activeProjectsCount: 0,
    recentUploadsCount: 0,
  });

  const [loading, setLoading] = useState(true);

  //===== fetch files =====//
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response: ClientFilesResponse = await fetchClientFiles();

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

  //===== filters =====//
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

  //===== actions =====//
  const handleUploadClick = () => {
    toast("File upload will be available once storage is connected.");
  };

  const handleClearFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setSortBy("newest");
  };

  return (
    <div
      className="relative min-w-0 max-w-full space-y-6"
    >
      {/* ====================================================== */}
      {/* FILES HEADER                                          */}
      {/* ====================================================== */}

      <FilesPageHeader onUploadClick={handleUploadClick} />

      {/* ====================================================== */}
      {/* FILES OVERVIEW                                        */}
      {/* ====================================================== */}

      <div className="min-w-0">
        <FilesStatsGrid stats={stats} />
      </div>

      {/* ====================================================== */}
      {/* DOCUMENT WORKSPACE                                    */}
      {/* ====================================================== */}

      <section
        className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
      >
        {/* subtle top signal */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 h-[2px] w-32 bg-gradient-to-r from-secondary/55 to-transparent"
        />

        {/* ==================================================== */}
        {/* WORKSPACE HEADER                                    */}
        {/* ==================================================== */}

        <div
          className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-6"
        >
          <div>
            <span
              className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary"
            >
              Document library
            </span>

            <h2
              className="mt-1 text-base font-semibold text-heading"
            >
              Project Files
            </h2>

            <p
              className="mt-1 text-xs leading-5 text-muted-foreground"
            >
              Access files shared across your active Blackcrest engagements.
            </p>
          </div>

          {hasAnyFiles && (
            <div className="text-left sm:text-right">
              <span
                className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted-foreground/40"
              >
                Available records
              </span>

              <p
                className="mt-1 text-sm font-semibold text-heading"
              >
                {filteredFiles.length}
              </p>
            </div>
          )}
        </div>

        {/* ==================================================== */}
        {/* FILTER BAR                                          */}
        {/* ==================================================== */}

        {hasAnyFiles && (
          <div
            className="border-b border-border bg-background/20 px-5 py-4 sm:px-6"
          >
            <FilesFilterBar
              search={search}
              onSearchChange={setSearch}
              typeFilter={typeFilter}
              onTypeFilterChange={setTypeFilter}
              sortBy={sortBy}
              onSortByChange={setSortBy}
            />
          </div>
        )}

        {/* ==================================================== */}
        {/* EMPTY: NO FILES                                     */}
        {/* ==================================================== */}

        {!hasAnyFiles && (
          <div
            className="px-5 py-6 sm:px-6 sm:py-8"
          >
            <FilesEmptyState
              variant="no-files"
              onUploadClick={handleUploadClick}
            />
          </div>
        )}

        {/* ==================================================== */}
        {/* FILE TABLE                                          */}
        {/* ==================================================== */}

        {hasAnyFiles && hasFilteredResults && (
          <div className="min-w-0">
            <FilesTable files={filteredFiles} />
          </div>
        )}

        {/* ==================================================== */}
        {/* EMPTY: FILTER RESULTS                               */}
        {/* ==================================================== */}

        {hasAnyFiles && !hasFilteredResults && (
          <div
            className="px-5 py-6 sm:px-6 sm:py-8"
          >
            <FilesEmptyState
              variant="no-results"
              onClearFilters={handleClearFilters}
            />
          </div>
        )}

        {/* ==================================================== */}
        {/* WORKSPACE FOOTER                                    */}
        {/* ==================================================== */}

        {hasAnyFiles && (
          <div
            className="flex flex-col gap-2 border-t border-border bg-muted/10 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6"
          >
            <div
              className="flex items-center gap-2"
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-success"
              />

              <span
                className="font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/40"
              >
                Client document access
              </span>
            </div>

            <span
              className="text-[11px] text-muted-foreground"
            >
              {filteredFiles.length} of {files.length} files shown
            </span>
          </div>
        )}
      </section>
    </div>
  );
}
