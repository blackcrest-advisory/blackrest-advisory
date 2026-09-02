"use client";

import { useMemo, useState } from "react";
import {
  FolderSearch2,
  RotateCcw,
  Search,
  SearchX,
  SlidersHorizontal,
} from "lucide-react";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Pagination } from "@/components/shared/Pagination";
import {
  ClientProjectsTable,
  type ClientProject,
} from "@/components/client-dashboard/projects/ClientProjectsTable";

const PROJECTS_PER_PAGE = 10;

const statusOptions = [
  { value: "all", label: "All statuses" },
  { value: "ACTIVE", label: "Active" },
  { value: "PLANNING", label: "Planning" },
  { value: "IN_REVIEW", label: "In review" },
  { value: "ON_HOLD", label: "On hold" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

function getProjectService(project: ClientProject) {
  return project.serviceType || project.proposal?.brief.pillar || "General";
}

function formatServiceLabel(service: string) {
  return service
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function ClientProjectsClient({
  projects,
}: {
  projects: ClientProject[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("all");
  const [service, setService] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const serviceOptions = useMemo(
    () => [
      { value: "all", label: "All services" },
      ...Array.from(new Set(projects.map(getProjectService)))
        .sort()
        .map((value) => ({ value, label: formatServiceLabel(value) })),
    ],
    [projects],
  );

  const filteredProjects = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !search ||
        project.title.toLowerCase().includes(search) ||
        project.id.toLowerCase().includes(search) ||
        getProjectService(project).toLowerCase().includes(search) ||
        project.assignedTo?.toLowerCase().includes(search);

      return (
        matchesSearch &&
        (status === "all" || project.status === status) &&
        (service === "all" || getProjectService(project) === service)
      );
    });
  }, [projects, searchTerm, service, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE),
  );
  const activePage = Math.min(currentPage, totalPages);
  const paginatedProjects = useMemo(() => {
    const startIndex = (activePage - 1) * PROJECTS_PER_PAGE;

    return filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
  }, [activePage, filteredProjects]);

  const hasActiveFilters =
    Boolean(searchTerm.trim()) || status !== "all" || service !== "all";

  const resetFilters = () => {
    setSearchTerm("");
    setStatus("all");
    setService("all");
    setCurrentPage(1);
  };

  if (projects.length === 0) {
    return <ClientProjectsTable projects={projects} />;
  }

  return (
    <section className="relative space-y-3">
      <div className="relative z-20 border border-border bg-card shadow-[var(--shadow-card)]">
        <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md border border-secondary/15 bg-secondary/[0.05] text-secondary">
              <FolderSearch2 className="h-3.5 w-3.5" />
            </div>

            <div>
              <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
                Portfolio directory
              </span>

              <p className="mt-0.5 text-xs text-muted-foreground">
                Search and refine your project records.
              </p>
            </div>
          </div>

          <span className="text-xs text-muted-foreground">
            <span className="font-semibold text-heading">
              {filteredProjects.length}
            </span>{" "}
            matching project{filteredProjects.length === 1 ? "" : "s"}
          </span>
        </div>

        <div className="flex flex-col gap-3 px-5 py-4 sm:px-6 xl:flex-row xl:items-center">
          <div className="min-w-0 flex-1">
            <Input
              icon={Search}
              placeholder="Search project, service, or project ID..."
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
              className="w-full"
            />
          </div>

          <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 xl:flex xl:flex-row xl:items-center">
            <div
              aria-hidden="true"
              className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground xl:flex"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </div>

            <Select
              options={statusOptions}
              value={status}
              onChange={(value) => {
                setStatus(value);
                setCurrentPage(1);
              }}
              className="w-full xl:w-44"
            />

            <Select
              options={serviceOptions}
              value={service}
              onChange={(value) => {
                setService(value);
                setCurrentPage(1);
              }}
              className="w-full xl:w-52"
            />
          </div>
        </div>

        <div className="flex min-h-10 flex-wrap items-center justify-between gap-3 border-t border-border bg-muted/10 px-5 py-2.5 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />

            <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/40">
              Portfolio records available
            </span>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-secondary transition-colors hover:text-heading"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Clear filters
            </button>
          )}
        </div>
      </div>

      {paginatedProjects.length > 0 ? (
        <ClientProjectsTable projects={paginatedProjects} />
      ) : (
        <div className="flex min-h-64 flex-col items-center justify-center border border-dashed border-border bg-card px-6 py-10 text-center shadow-[var(--shadow-card)]">
          <div className="flex h-10 w-10 items-center justify-center border border-secondary/15 bg-secondary/[0.05] text-secondary">
            <SearchX className="h-4 w-4" />
          </div>

          <h2 className="mt-4 text-base font-semibold text-heading">
            No matching projects
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            Try changing your search or clearing the filters to see the rest of
            your portfolio.
          </p>

          <button
            type="button"
            onClick={resetFilters}
            className="mt-5 text-xs font-semibold text-secondary transition-colors hover:text-heading"
          >
            Clear all filters
          </button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="border border-border bg-card px-5 py-4 shadow-[var(--shadow-card)] sm:px-6">
          <Pagination
            currentPage={activePage}
            totalItems={filteredProjects.length}
            pageSize={PROJECTS_PER_PAGE}
            itemLabel="projects"
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </section>
  );
}
