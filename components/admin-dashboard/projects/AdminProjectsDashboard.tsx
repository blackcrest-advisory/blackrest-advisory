"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { adminProjectsMock } from "@/mock-data/adminProjectsMockData";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";
import { ProjectsFilters } from "./ProjectsFilters";
import { ProjectsHeader } from "./ProjectsHeader";
import { ProjectsStats } from "./ProjectsStats";
import { ProjectsTable } from "./ProjectsTable";
import type { ProjectHealth } from "@/types/dashboard/admin/projectsType";
import type { ProjectStatus } from "@/types/dashboard/client/projectsType";

//===== Status transition map =====//
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

  //===== Filter projects =====//
  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const query = search.toLowerCase();
        const matchesSearch = [
          project.name,
          project.clientName,
          project.manager,
          project.service,
        ].some((value) => value.toLowerCase().includes(query));
        return (
          matchesSearch &&
          (status === "all" || project.status === status) &&
          (health === "all" || project.health === health)
        );
      }),
    [health, projects, search, status],
  );

  //===== Advance project status =====//
  const advanceStatus = (id: string) =>
    setProjects((current) =>
      current.map((project) =>
        project.id === id
          ? { ...project, status: nextStatus[project.status] }
          : project,
      ),
    );

  return (
    //===== Admin Projects Dashboard =====//
    <PageWrapper>
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="flex flex-col gap-6">
            {/*===== Header =====*/}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible">
              <ProjectsHeader />
            </motion.div>

            {/*===== Stats =====*/}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <ProjectsStats projects={projects} />
            </motion.div>

            {/*===== Filters =====*/}
            <ProjectsFilters
              search={search}
              status={status}
              health={health}
              onSearchChange={setSearch}
              onStatusChange={setStatus}
              onHealthChange={setHealth}
            />

            {/*===== Table =====*/}
            <ProjectsTable
              projects={filteredProjects}
              onAdvanceStatus={advanceStatus}
            />
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
};
