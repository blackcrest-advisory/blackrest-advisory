"use client";

//===== imports =====//
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

import { Pagination } from "@/components/shared/Pagination";

import { ProjectRequestsTable } from "@/components/admin-dashboard/project-requests/ProjectRequestsTable";

//===== types =====//
interface AdminBrief {
  id: string;
  title: string;
  pillar: string;
  budget: string | null;
  currency: string | null;
  status: string;
  createdAt: Date;
  deadline: string | null;
  assignedTo: string | null;
  user: {
    name: string | null;
    email: string;
  };
}

//===== constants =====//
const REQUESTS_PER_PAGE = 10;

const statusOptions = [
  {
    value: "all",
    label: "All statuses",
  },
  {
    value: "SUBMITTED",
    label: "Submitted",
  },
  {
    value: "UNDER_REVIEW",
    label: "Under review",
  },
  {
    value: "ASSIGNED",
    label: "Assigned",
  },
  {
    value: "CLOSED",
    label: "Closed",
  },
];

const pillarOptions = [
  {
    value: "all",
    label: "All services",
  },
  {
    value: "DIGITAL_MARKETING",
    label: "Digital marketing",
  },
  {
    value: "WEBSITE_DEVELOPMENT",
    label: "Website development",
  },
  {
    value: "MOBILE_APP",
    label: "Mobile applications",
  },
  {
    value: "SALES_SUPPORT",
    label: "Sales support",
  },
];

export function AdminProjectRequestsClient({
  briefs,
}: {
  briefs: AdminBrief[];
}) {
  //===== state =====//
  const [searchTerm, setSearchTerm] = useState("");

  const [status, setStatus] = useState("all");

  const [pillar, setPillar] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  //===== derived data =====//
  const filteredBriefs = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return briefs.filter((brief) => {
      const matchesSearch =
        !search ||
        brief.title.toLowerCase().includes(search) ||
        brief.id.toLowerCase().includes(search) ||
        brief.user.name?.toLowerCase().includes(search) ||
        brief.user.email.toLowerCase().includes(search);

      return (
        matchesSearch &&
        (status === "all" || brief.status === status) &&
        (pillar === "all" || brief.pillar === pillar)
      );
    });
  }, [briefs, pillar, searchTerm, status]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBriefs.length / REQUESTS_PER_PAGE),
  );

  const activePage = Math.min(currentPage, totalPages);

  const paginatedBriefs = useMemo(() => {
    const startIndex = (activePage - 1) * REQUESTS_PER_PAGE;

    return filteredBriefs.slice(startIndex, startIndex + REQUESTS_PER_PAGE);
  }, [activePage, filteredBriefs]);

  //===== handlers =====//
  const updateSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const updateStatus = (value: string) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const updatePillar = (value: string) => {
    setPillar(value);
    setCurrentPage(1);
  };

  //===== render =====//
  return (
    <section className="relative">
      {/*===== CONTROL WORKSPACE =====*/}

      <div className="relative z-20 border border-border bg-card shadow-[var(--shadow-card)]">
        {/* top signal */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/35 to-transparent"
        />

        {/*===== CONTROL BAR =====*/}

        <div className="flex flex-col gap-3 px-4 py-4 sm:px-5 lg:px-6 xl:flex-row xl:items-center">
          {/*===== SEARCH =====*/}

          <div className="min-w-0 flex-1">
            <Input
              icon={Search}
              placeholder="Search project, client, email, or request ID..."
              value={searchTerm}
              onChange={(event) => updateSearch(event.target.value)}
              className="w-full"
            />
          </div>

          {/*===== FILTERS =====*/}

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
              onChange={updateStatus}
              className="w-full xl:w-44"
            />

            <Select
              options={pillarOptions}
              value={pillar}
              onChange={updatePillar}
              className="w-full xl:w-52"
            />
          </div>
        </div>

        {/*===== RESULT METADATA =====*/}

        <div className="flex min-h-11 flex-wrap items-center justify-between gap-3 border-t border-border bg-muted/10 px-4 py-2.5 sm:px-5 lg:px-6">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-success"/>

            <span className="text-xs text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-heading">
                {filteredBriefs.length}
              </span>{" "}
              matching request
              {filteredBriefs.length === 1 ? "" : "s"}
            </span>
          </div>

          {(searchTerm || status !== "all" || pillar !== "all") && (
            <div className="flex items-center gap-2">
              <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
                Filters active
              </span>

              <span className="h-px w-6 bg-secondary/30"/>
            </div>
          )}
        </div>
      </div>

      {/*===== REQUEST RECORDS =====*/}

      <div className="relative z-10 mt-3 min-w-0">
        <ProjectRequestsTable
          briefs={paginatedBriefs}
          basePath="/admin/dashboard/project-requests"
          isAdmin
          emptyMessage="No project requests match the current filters."
        />
      </div>

      {/*===== PAGINATION =====*/}

      {totalPages > 1 && (
        <div className="mt-3 border border-border bg-card px-4 py-4 shadow-[var(--shadow-card)] sm:px-5 lg:px-6">
          <Pagination
            currentPage={activePage}
            totalItems={filteredBriefs.length}
            pageSize={REQUESTS_PER_PAGE}
            itemLabel="project requests"
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </section>
  );
}
