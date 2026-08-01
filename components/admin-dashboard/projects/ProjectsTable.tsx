"use client";

import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import toast from "react-hot-toast";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { fadeInUp, hoverScale } from "@/lib/utils/animations";
import { ProjectHealthBadge } from "./ProjectHealthBadge";
import type { AdminProject } from "@/types/dashboard/admin/projectsType";

interface ProjectsTableProps {
  projects: AdminProject[];
  onAdvanceStatus: (id: string) => void;
}

export const ProjectsTable = ({
  projects,
  onAdvanceStatus,
}: ProjectsTableProps) => {
  //===== Empty state =====//
  if (!projects.length) {
    return (
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        {...hoverScale}
      >
        <Card
          padding="base"
          className="rounded-xl border-dashed border-border py-14 text-center"
        >
          <p className="font-medium text-foreground">No projects found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try another search or filter combination.
          </p>
        </Card>
      </motion.div>
    );
  }

  return (
    //===== Projects Table =====//
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      {...hoverScale}
    >
      <Card padding="none" hoverEffect className="overflow-hidden rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Health</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">
                      {project.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {project.clientName} · {project.service}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar
                      name={project.manager}
                      size="sm"
                      className="h-7 w-7 text-[10px]"
                    />
                    <span className="whitespace-nowrap text-sm text-foreground">
                      {project.manager}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col items-start gap-1.5">
                    <StatusBadge status={project.status} />
                    <PriorityBadge
                      priority={project.priority}
                      className="px-2 py-0.5"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <ProjectHealthBadge health={project.health} />
                </TableCell>
                <TableCell>
                  <div className="min-w-28">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        {project.progress}%
                      </span>
                      <span className="text-muted-foreground">
                        {project.lastActivity}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-secondary"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="whitespace-nowrap font-medium text-foreground">
                    €{project.budget.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    €{project.budgetSpent.toLocaleString()} spent
                  </p>
                </TableCell>
                <TableCell>
                  <span
                    className={
                      project.health === "overdue"
                        ? "whitespace-nowrap font-medium text-red-600 dark:text-red-400"
                        : "whitespace-nowrap text-muted-foreground"
                    }
                  >
                    {project.deadline}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="!p-2"
                    onClick={() => {
                      onAdvanceStatus(project.id);
                      toast.success(
                        `${project.name} moved to the next workflow stage.`,
                      );
                    }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Advance project status</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  );
};
