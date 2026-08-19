"use client";

//===== imports =====//
import { useMemo, useState } from "react";
import { FolderSearch2, Search, SlidersHorizontal } from "lucide-react";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

import { Pagination } from "@/components/shared/Pagination";

import {
  AdminProjectsTable,
  type AdminProject,
} from "@/components/admin-dashboard/projects/AdminProjectsTable";

//===== constants =====//
const PROJECTS_PER_PAGE = 10;

const statusOptions = [
  {
    value: "all",
    label: "All statuses",
  },
  {
    value: "ACTIVE",
    label: "Active",
  },
  {
    value: "PLANNING",
    label: "Planning",
  },
  {
    value: "IN_REVIEW",
    label: "In review",
  },
  {
    value: "ON_HOLD",
    label: "On hold",
  },
  {
    value: "COMPLETED",
    label: "Completed",
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
  },
];

//===== helpers =====//
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
  //===== state =====//
  const [searchTerm, setSearchTerm] = useState("");

  const [status, setStatus] = useState("all");

  const [service, setService] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  //===== service options =====//
  const serviceOptions = useMemo(
    () => [
      {
        value: "all",
        label: "All services",
      },

      ...Array.from(new Set(projects.map(getProjectService)))
        .sort()
        .map((value) => ({
          value,
          label: formatServiceLabel(value),
        })),
    ],
    [projects],
  );

  //===== filtered projects =====//
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

  //===== pagination =====//
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE),
  );

  const activePage = Math.min(currentPage, totalPages);

  const paginatedProjects = useMemo(() => {
    const startIndex = (activePage - 1) * PROJECTS_PER_PAGE;

    return filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
  }, [activePage, filteredProjects]);

  //===== handlers =====//
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

  //===== filter state =====//
  const hasActiveFilters =
    Boolean(searchTerm) || status !== "all" || service !== "all";

  //===== render =====//
  return (
    <section className="relative">
      {/* ====================================================== */}
      {/* PROJECT DIRECTORY CONTROLS                            */}
      {/* ====================================================== */}

      <div
        className="
          relative
          z-20
          border border-border
          bg-card
          shadow-[var(--shadow-card)]
        "
      >
        {/* directory heading */}
        <div
          className="
            flex
            flex-col
            gap-3
            border-b border-border
            px-5 py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-6
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-8 w-8
                items-center
                justify-center
                rounded-md
                border border-secondary/15
                bg-secondary/[0.05]
                text-secondary
              "
            >
              <FolderSearch2 className="h-3.5 w-3.5" />
            </div>

            <div>
              <span
                className="
                  font-mono
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-secondary
                "
              >
                Project directory
              </span>

              <p
                className="
                  mt-0.5
                  text-xs
                  text-muted-foreground
                "
              >
                Search and refine delivery records.
              </p>
            </div>
          </div>

          <span
            className="
              text-xs
              text-muted-foreground
            "
          >
            <span className="font-semibold text-heading">
              {filteredProjects.length}
            </span>{" "}
            matching project
            {filteredProjects.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* ==================================================== */}
        {/* FILTERS                                             */}
        {/* ==================================================== */}

        <div
          className="
            flex
            flex-col
            gap-3
            px-5 py-4
            sm:px-6
            xl:flex-row
            xl:items-center
          "
        >
          {/* search */}
          <div className="min-w-0 flex-1">
            <Input
              icon={Search}
              placeholder="Search project, client, manager, or project ID..."
              value={searchTerm}
              onChange={(event) => updateSearch(event.target.value)}
              className="w-full"
            />
          </div>

          {/* filters */}
          <div
            className="
              flex
              flex-col
              gap-2
              sm:grid
              sm:grid-cols-2
              xl:flex
              xl:flex-row
              xl:items-center
            "
          >
            <div
              aria-hidden="true"
              className="
                hidden
                h-10 w-10
                shrink-0
                items-center
                justify-center
                rounded-md
                border border-border
                bg-background
                text-muted-foreground
                xl:flex
              "
            >
              <SlidersHorizontal className="h-4 w-4" />
            </div>

            <Select
              options={statusOptions}
              value={status}
              onChange={updateStatus}
              className="w-full xl:w-44"
            />

            <Select
              options={serviceOptions}
              value={service}
              onChange={updateService}
              className="w-full xl:w-52"
            />
          </div>
        </div>

        {/* ==================================================== */}
        {/* FILTER STATE                                        */}
        {/* ==================================================== */}

        <div
          className="
            flex
            min-h-10
            flex-wrap
            items-center
            justify-between
            gap-3
            border-t border-border
            bg-muted/10
            px-5 py-2.5
            sm:px-6
          "
        >
          <div className="flex items-center gap-2">
            <span
              className="
                h-1.5 w-1.5
                rounded-full
                bg-success
              "
            />

            <span
              className="
                font-mono
                text-[7px]
                uppercase
                tracking-[0.14em]
                text-muted-foreground/40
              "
            >
              Portfolio records available
            </span>
          </div>

          {hasActiveFilters && (
            <div className="flex items-center gap-2">
              <span
                className="
                  font-mono
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-secondary
                "
              >
                Filters active
              </span>

              <span className="h-px w-6 bg-secondary/30" />
            </div>
          )}
        </div>
      </div>

      {/* ====================================================== */}
      {/* PROJECT TABLE                                         */}
      {/* ====================================================== */}

      <div className="relative z-10 mt-3 min-w-0">
        <AdminProjectsTable
          projects={paginatedProjects}
          emptyMessage="No projects match the current filters."
        />
      </div>

      {/* ====================================================== */}
      {/* PAGINATION                                            */}
      {/* ====================================================== */}

      {totalPages > 1 && (
        <div
          className="
            mt-3
            border border-border
            bg-card
            px-5 py-4
            shadow-[var(--shadow-card)]
            sm:px-6
          "
        >
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
