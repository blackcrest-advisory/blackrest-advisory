"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import axios from "@/api-client/client";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ProjectDetailsHeader } from "@/components/client-dashboard/projects/details/ProjectDetailsHeader";
import { ProjectOverviewCards } from "@/components/client-dashboard/projects/details/ProjectOverviewCards";
import { ProjectDescription } from "@/components/client-dashboard/projects/details/ProjectDescription";
import { ProjectTimelineCard } from "@/components/client-dashboard/projects/details/ProjectTimelineCard";
import { ProjectTeamCard } from "@/components/client-dashboard/projects/details/ProjectTeamCard";
import { ProjectMilestones } from "@/components/client-dashboard/projects/details/ProjectMilestones";
import { ProjectFilesCard } from "@/components/client-dashboard/projects/details/ProjectFilesCard";
import { ProjectActivityLog } from "@/components/client-dashboard/projects/details/ProjectActivityLog";
import { fadeInUp, staggerContainer } from "@/utils/animations";
import type { Project } from "@/types/dashboard/client/projectsType";

//===== Serialized project type from API =====//
type SerializedProject = Omit<
  Project,
  "timeline" | "dueDate" | "lastUpdated" | "milestones" | "activity"
> & {
  timeline: {
    start: string;
    end: string;
  };
  dueDate: string;
  lastUpdated: string;
  milestones: Array<
    Omit<Project["milestones"][number], "dueDate"> & { dueDate: string }
  >;
  activity: Array<
    Omit<Project["activity"][number], "timestamp"> & { timestamp: string }
  >;
};

export default function ProjectDetailsPage() {
  const router = useRouter();
  const params = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  //===== Fetch project data =====//
  useEffect(() => {
    let isMounted = true;

    axios
      .get<SerializedProject[]>("/api/client/projects/list")
      .then((response) => {
        if (!isMounted) return;

        const foundProject = response.data.find(
          (item) => item.id === params.projectId,
        );

        if (!foundProject) {
          setNotFound(true);
          setProject(null);
          return;
        }

        setProject({
          ...foundProject,
          timeline: {
            start: new Date(foundProject.timeline.start),
            end: new Date(foundProject.timeline.end),
          },
          dueDate: new Date(foundProject.dueDate),
          lastUpdated: new Date(foundProject.lastUpdated),
          milestones: foundProject.milestones.map((milestone) => ({
            ...milestone,
            dueDate: new Date(milestone.dueDate),
          })),
          activity: foundProject.activity.map((activity) => ({
            ...activity,
            timestamp: new Date(activity.timestamp),
          })),
        });
      })
      .catch(() => {
        if (isMounted) {
          setNotFound(true);
          setProject(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [params.projectId]);

  //===== Loading state =====//
  if (loading) {
    return (
      <PageWrapper>
        <Section className="py-2 md:py-2 lg:py-2">
          <Container>
            <div className="py-24 text-center text-muted-foreground">
              Loading project...
            </div>
          </Container>
        </Section>
      </PageWrapper>
    );
  }

  //===== Not found state =====//
  if (notFound || project === null) {
    return (
      <PageWrapper>
        <Section className="py-2 md:py-2 lg:py-2">
          <Container>
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-lg font-medium text-foreground">
                Project not found
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                The project you are looking for does not exist.
              </p>
            </div>
          </Container>
        </Section>
      </PageWrapper>
    );
  }

  return (
    //===== Project Details Page =====//
    <PageWrapper>
      <Section className="py-2 md:py-2 lg:py-2">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 py-6"
          >
            {/*===== Header =====*/}
            <motion.div variants={fadeInUp}>
              <ProjectDetailsHeader
                project={project}
                onBack={() => router.back()}
              />
            </motion.div>

            {/*===== Overview Cards =====*/}
            <motion.div variants={fadeInUp}>
              <ProjectOverviewCards project={project} />
            </motion.div>

            {/*===== Main Content + Sidebar =====*/}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/*===== Left column: main content =====*/}
              <div className="flex flex-col gap-6 lg:col-span-2">
                <motion.div variants={fadeInUp}>
                  <ProjectDescription description={project.description} />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <ProjectTimelineCard
                    timeline={project.timeline}
                    progress={project.progress}
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <ProjectMilestones milestones={project.milestones} />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <ProjectActivityLog activity={project.activity} />
                </motion.div>
              </div>

              {/*===== Right column: side info =====*/}
              <div className="flex flex-col gap-6">
                <motion.div variants={fadeInUp}>
                  <ProjectTeamCard
                    assignedTeam={project.assignedTeam}
                    clientContact={project.clientContact}
                  />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <ProjectFilesCard files={project.files} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
