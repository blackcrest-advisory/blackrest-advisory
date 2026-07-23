"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "@/api-client/client";
import { ProjectDetailsHeader } from "@/components/client-dashboard/projects/details/ProjectDetailsHeader";
import { ProjectOverviewCards } from "@/components/client-dashboard/projects/details/ProjectOverviewCards";
import { ProjectDescription } from "@/components/client-dashboard/projects/details/ProjectDescription";
import { ProjectTimelineCard } from "@/components/client-dashboard/projects/details/ProjectTimelineCard";
import { ProjectTeamCard } from "@/components/client-dashboard/projects/details/ProjectTeamCard";
import { ProjectMilestones } from "@/components/client-dashboard/projects/details/ProjectMilestones";
import { ProjectFilesCard } from "@/components/client-dashboard/projects/details/ProjectFilesCard";
import { ProjectActivityLog } from "@/components/client-dashboard/projects/details/ProjectActivityLog";
import type { Project } from "@/types/dashboard/client/projectsType";

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

  useEffect(() => {
    let isMounted = true;

    axios
      .get<SerializedProject[]>("/api/client/projects/list")
      .then((response) => {
        if (!isMounted) {
          return;
        }

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

  if (loading) {
    return (
      <div className="text-center py-24 text-[var(--color-body)]">
        Loading project...
      </div>
    );
  }

  if (notFound || project === null) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-lg font-medium text-[var(--color-heading)]">
          Project not found
        </p>
        <p className="mt-1 text-sm text-[var(--color-body)]">
          The project you are looking for does not exist.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 py-6">
      <ProjectDetailsHeader project={project} onBack={() => router.back()} />

      <ProjectOverviewCards project={project} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column: main content */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <ProjectDescription description={project.description} />
          <ProjectTimelineCard
            timeline={project.timeline}
            progress={project.progress}
          />
          <ProjectMilestones milestones={project.milestones} />
          <ProjectActivityLog activity={project.activity} />
        </div>

        {/* Right column: side info */}
        <div className="flex flex-col gap-6">
          <ProjectTeamCard
            assignedTeam={project.assignedTeam}
            clientContact={project.clientContact}
          />
          <ProjectFilesCard files={project.files} />
        </div>
      </div>
    </div>
  );
}
