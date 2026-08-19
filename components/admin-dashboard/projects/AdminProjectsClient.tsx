"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Pagination } from "@/components/shared/Pagination";
import {
  AdminProjectsTable,
  type AdminProject,
} from "@/components/admin-dashboard/projects/AdminProjectsTable";

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

function getProjectService(project: AdminProject) {
  return project.serviceType || project.proposal.brief.pillar;
}

function formatServiceLabel(service: string) {
  return service
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function AdminProjectsClient({
  projects,
}: {
  projects: AdminProject[];
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
        project.user.name?.toLowerCase().includes(search) ||
        project.user.email.toLowerCase().includes(search) ||
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

  const updateSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const updateStatus = (value: string) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const updateService = (value: string) => {
    setService(value);
    setCurrentPage(1);
  };

  return (
    <section className="overflow-hidden rounded-[var(--radius-surface)] border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="border-b border-border bg-muted/15 px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
          <div className="min-w-0 flex-1">
            <Input
              icon={Search}
              placeholder="Search project, client, manager, or project ID..."
              value={searchTerm}
              onChange={(event) => updateSearch(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 xl:flex xl:items-center">
            <div className="hidden h-10 w-10 items-center justify-center border border-border text-muted-foreground xl:flex">
              <SlidersHorizontal className="h-4 w-4" />
            </div>
            <Select
              options={statusOptions}
              value={status}
              onChange={updateStatus}
              className="w-full xl:w-40"
            />
            <Select
              options={serviceOptions}
              value={service}
              onChange={updateService}
              className="w-full xl:w-48"
            />
          </div>
        </div>
      </div>

      <AdminProjectsTable
        projects={paginatedProjects}
        emptyMessage="No projects match the current filters."
      />

      {filteredProjects.length > 0 && (
        <div className="border-t border-border bg-muted/15 px-5 py-4 sm:px-6">
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
