"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { AdminProject } from "@/types/dashboard/admin/overviewType";

interface AdminActiveProjectsProps {
  projects: AdminProject[];
}

export const AdminActiveProjects = ({ projects }: AdminActiveProjectsProps) => {
  return (
    <div className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--color-heading)]">
          Active Projects
        </h3>
        <Button href="/admin/dashboard/projects" variant="ghost" size="sm">
          View all
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Deadline</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>
                <Link
                  href={`/admin/dashboard/projects/${project.id}`}
                  className="font-medium text-[var(--color-heading)] hover:text-secondary"
                >
                  {project.name}
                </Link>
              </TableCell>
              <TableCell>{project.clientName}</TableCell>
              <TableCell>
                <StatusBadge status={project.status} />
              </TableCell>
              <TableCell>
                <PriorityBadge priority={project.priority} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-24 rounded-full bg-[var(--color-muted)]">
                    <div
                      className="h-1.5 rounded-full bg-[var(--color-secondary)]"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-[var(--color-body)]">
                    {project.progress}%
                  </span>
                </div>
              </TableCell>
              <TableCell>{project.deadline}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
