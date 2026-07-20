"use client";

import { useRouter, useParams } from "next/navigation";
import { ProjectDetailsHeader } from "@/components/client-dashboard/projects/details/ProjectDetailsHeader";
import { ProjectOverviewCards } from "@/components/client-dashboard/projects/details/ProjectOverviewCards";
import { ProjectDescription } from "@/components/client-dashboard/projects/details/ProjectDescription";
import { ProjectTimelineCard } from "@/components/client-dashboard/projects/details/ProjectTimelineCard";
import { ProjectTeamCard } from "@/components/client-dashboard/projects/details/ProjectTeamCard";
import { ProjectMilestones } from "@/components/client-dashboard/projects/details/ProjectMilestones";
import { ProjectFilesCard } from "@/components/client-dashboard/projects/details/ProjectFilesCard";
import { ProjectActivityLog } from "@/components/client-dashboard/projects/details/ProjectActivityLog";
import { getProjectById } from "@/mock-data/projectsMockData";

export default function ProjectDetailsPage() {
  const router = useRouter();
  const params = useParams<{ projectId: string }>();

  const project = getProjectById(params.projectId);

  //===== Guard: no matching project found for this id =====//
  if (!project) {
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
