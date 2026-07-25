"use client";

import { useMemo, useState } from "react";
import { adminProjectsMock } from "@/mock-data/adminProjectsMockData";
import type { ProjectHealth } from "@/types/dashboard/admin/projectsType";
import type { ProjectStatus } from "@/types/dashboard/client/projectsType";
import { ProjectsFilters } from "./ProjectsFilters";
import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectsStats } from "./ProjectsStats";
import { ProjectsTable } from "./ProjectsTable";

const nextStatus: Record<ProjectStatus, ProjectStatus> = {
  planning: "active",
  active: "in-review",
  "in-review": "completed",
  "on-hold": "active",
  completed: "completed",
};

export const AdminProjectsDashboard = () => {
  // TODO: Replace this local state with data from the admin projects API.
  const [projects, setProjects] = useState(adminProjectsMock);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "all">("all");
  const [health, setHealth] = useState<ProjectHealth | "all">("all");

  const filteredProjects = useMemo(() => projects.filter((project) => {
    const query = search.toLowerCase();
    const matchesSearch = [project.name, project.clientName, project.manager, project.service].some((value) => value.toLowerCase().includes(query));
    return matchesSearch && (status === "all" || project.status === status) && (health === "all" || project.health === health);
  }), [health, projects, search, status]);

  const advanceStatus = (id: string) => setProjects((current) => current.map((project) => project.id === id ? { ...project, status: nextStatus[project.status] } : project));

  return <div className="flex flex-col gap-6"><ProjectsHeader /><ProjectsStats projects={projects} /><ProjectsFilters search={search} status={status} health={health} onSearchChange={setSearch} onStatusChange={setStatus} onHealthChange={setHealth} /><ProjectsTable projects={filteredProjects} onAdvanceStatus={advanceStatus} /></div>;
};
