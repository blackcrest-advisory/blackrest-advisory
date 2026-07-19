"use client";

import { useState, useMemo } from "react";
import { ProjectHeader } from "@/components/client-dashboard/projects/ProjectHeader";
import { ProjectStats } from "@/components/client-dashboard/projects/ProjectStats";
import { ProjectFilters } from "@/components/client-dashboard/projects/ProjectFilters";
import { ProjectGrid } from "@/components/client-dashboard/projects/ProjectGrid";
import { ProjectPagination } from "@/components/client-dashboard/projects/ProjectPagination";
import type {
  ProjectStatus,
  Industry,
  ServiceType,
} from "@/types/dashboard/client/projects";
import { mockProjects } from "@/data/mock-projects";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">(
    "all",
  );
  const [industryFilter, setIndustryFilter] = useState<Industry | "all">("all");
  const [serviceFilter, setServiceFilter] = useState<ServiceType | "all">(
    "all",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter projects
  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.clientCompany.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || project.status === statusFilter;
      const matchesIndustry =
        industryFilter === "all" || project.industry === industryFilter;
      const matchesService =
        serviceFilter === "all" || project.serviceType === serviceFilter;
      return (
        matchesSearch && matchesStatus && matchesIndustry && matchesService
      );
    });
  }, [searchQuery, statusFilter, industryFilter, serviceFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage]);

  // Reset page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      <ProjectHeader />
      <ProjectStats projects={mockProjects} />
      <ProjectFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={(v) => {
          setStatusFilter(v);
          handleFilterChange();
        }}
        industryFilter={industryFilter}
        onIndustryChange={(v) => {
          setIndustryFilter(v);
          handleFilterChange();
        }}
        serviceFilter={serviceFilter}
        onServiceChange={(v) => {
          setServiceFilter(v);
          handleFilterChange();
        }}
      />
      <ProjectGrid projects={paginatedProjects} />
      {totalPages > 1 && (
        <ProjectPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
