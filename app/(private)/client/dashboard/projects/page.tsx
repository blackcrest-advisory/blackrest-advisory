"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ProjectHeader } from "@/components/client-dashboard/projects/ProjectHeader";
import { ProjectStats } from "@/components/client-dashboard/projects/ProjectStats";
import { ProjectFilters } from "@/components/client-dashboard/projects/ProjectFilters";
import { ProjectGrid } from "@/components/client-dashboard/projects/ProjectGrid";
import { ProjectPagination } from "@/components/client-dashboard/projects/ProjectPagination";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";
import type {
  Project,
  ProjectStatus,
  Industry,
  ServiceType,
} from "@/types/dashboard/client/projectsType";
import {
  fetchClientProjects,
  type SerializedProject,
} from "@/api-client/client/projects.api";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
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

  //===== Fetch projects =====//
  useEffect(() => {
    let isMounted = true;

    fetchClientProjects()
      .then((projectsData) => {
        if (!isMounted) return;

        setProjects(
          projectsData.map((project: SerializedProject) => ({
            ...project,
            timeline: {
              start: new Date(project.timeline.start),
              end: new Date(project.timeline.end),
            },
            dueDate: new Date(project.dueDate),
            lastUpdated: new Date(project.lastUpdated),
            milestones: project.milestones.map((milestone) => ({
              ...milestone,
              dueDate: new Date(milestone.dueDate),
            })),
            files: project.files.map((file) => ({
              ...file,
              uploadedAt: new Date(file.uploadedAt),
            })),
            activity: project.activity.map((activity) => ({
              ...activity,
              timestamp: new Date(activity.timestamp),
            })),
          })),
        );
      })
      .catch(() => {
        if (isMounted) setProjects([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  //===== Filter projects =====//
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
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
  }, [projects, searchQuery, statusFilter, industryFilter, serviceFilter]);

  //===== Pagination =====//
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, currentPage]);

  //===== Reset page when filters change =====//
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  //===== Loading state =====//
  if (loading) {
    return (
      <PageWrapper>
        <Section className="py-2 md:py-2 lg:py-2">
          <Container>
            <div className="py-12 text-center text-muted-foreground">
              Loading projects...
            </div>
          </Container>
        </Section>
      </PageWrapper>
    );
  }

  return (
    //===== Client Projects Page =====//
    <PageWrapper>
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <div className="space-y-8">
            {/*===== Header =====*/}
            <motion.div variants={fadeInUp} initial="hidden" animate="visible">
              <ProjectHeader />
            </motion.div>

            {/*===== Stats =====*/}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <ProjectStats projects={projects} />
            </motion.div>

            {/*===== Filters =====*/}
            <motion.div variants={fadeInUp}>
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
            </motion.div>

            {/*===== Project Grid =====*/}
            <motion.div variants={fadeInUp}>
              <ProjectGrid projects={paginatedProjects} />
            </motion.div>

            {/*===== Pagination =====*/}
            {totalPages > 1 && (
              <motion.div variants={fadeInUp}>
                <ProjectPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </motion.div>
            )}
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
