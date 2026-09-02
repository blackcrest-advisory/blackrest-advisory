"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, FolderKanban } from "lucide-react";

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

import { cn } from "@/lib/utils/utils";
import { fadeInUp } from "@/lib/utils/animations";

import type { AdminProject } from "@/types/dashboard/admin/overviewType";

interface AdminActiveProjectsProps {
  projects: AdminProject[];
}

export const AdminActiveProjects = ({ projects }: AdminActiveProjectsProps) => {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative h-full overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
    >
      {/*===== TOP ACCENT =====*/}

      <div className="pointer-events-none absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/35 to-transparent"/>

      {/*===== HEADER =====*/}

      <div className="relative flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <FolderKanban className="h-3.5 w-3.5 text-secondary" />

            <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
              Delivery pipeline
            </span>

            <span className="h-px w-8 bg-secondary/30" />
          </div>

          <div className="mt-2 flex items-baseline gap-3">
            <h3 className="text-lg font-semibold tracking-[-0.025em] text-heading sm:text-xl">
              Active Projects
            </h3>

            <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-muted-foreground/40">
              {projects.length} active
            </span>
          </div>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Monitor current client engagements and delivery progress.
          </p>
        </div>

        <Button
          href="/admin/dashboard/projects"
          variant="ghost"
          size="sm"
          className="group self-start sm:self-auto"
        >
          View all
          <ArrowUpRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/>
        </Button>
      </div>

      {/*===== DESKTOP TABLE =====*/}

      <div className="hidden overflow-x-auto md:block">
        <Table>
          <TableHeader>
            <TableRow className="border-border bg-muted/20 hover:bg-muted/20">
              <TableHead className="h-11 pl-6 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45">
                Project
              </TableHead>

              <TableHead className="h-11 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45">
                Client
              </TableHead>

              <TableHead className="h-11 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45">
                Status
              </TableHead>

              <TableHead className="h-11 font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45">
                Priority
              </TableHead>

              <TableHead className="h-11 min-w-[170px] font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45">
                Progress
              </TableHead>

              <TableHead className="h-11 pr-6 text-right font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45">
                Deadline
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {projects.map((project, index) => (
              <TableRow
                key={project.id}
                className="group/row border-border transition-colors duration-200 hover:bg-secondary/[0.025]"
              >
                {/* Project */}
                <TableCell className="py-4 pl-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-background font-mono text-[8px] font-semibold text-muted-foreground/40 transition-all duration-200 group-hover/row:border-secondary/20 group-hover/row:text-secondary">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0">
                      <Link
                        href={`/admin/dashboard/projects/${project.id}`}
                        className="group/link inline-flex max-w-[220px] items-center gap-1.5 truncate text-sm font-semibold text-heading transition-colors hover:text-secondary"
                      >
                        <span className="truncate">{project.name}</span>

                        <ArrowUpRight className="h-3 w-3 shrink-0 opacity-0 transition-all duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:opacity-100"/>
                      </Link>
                    </div>
                  </div>
                </TableCell>

                {/* Client */}
                <TableCell>
                  <span className="max-w-[160px] truncate text-sm text-muted-foreground">
                    {project.clientName}
                  </span>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <StatusBadge status={project.status} />
                </TableCell>

                {/* Priority */}
                <TableCell>
                  <PriorityBadge priority={project.priority} />
                </TableCell>

                {/* Progress */}
                <TableCell>
                  <div className="flex min-w-[150px] items-center gap-3">
                    <div className="relative h-1.5 flex-1 overflow-hidden bg-muted">
                      <motion.div
                        initial={{
                          width: reduceMotion ? `${project.progress}%` : 0,
                        }}
                        animate={{
                          width: `${project.progress}%`,
                        }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.7,
                          delay: reduceMotion ? 0 : index * 0.05,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute inset-y-0 left-0 bg-secondary"
                      />
                    </div>

                    <span className="w-9 text-right font-mono text-[9px] font-medium text-muted-foreground">
                      {project.progress}%
                    </span>
                  </div>
                </TableCell>

                {/* Deadline */}
                <TableCell className="pr-6 text-right">
                  <span className="whitespace-nowrap text-xs font-medium text-foreground/75">
                    {project.deadline}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/*===== MOBILE / SMALL TABLET =====*/}

      <div className="divide-y divide-border md:hidden">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.3,
              delay: reduceMotion ? 0 : index * 0.04,
            }}
            className="relative px-5 py-5 transition-colors hover:bg-secondary/[0.025]"
          >
            {/* top */}
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-border bg-background font-mono text-[8px] font-semibold text-muted-foreground/40">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="min-w-0 flex-1">
                <Link
                  href={`/admin/dashboard/projects/${project.id}`}
                  className="group/link flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-heading transition-colors group-hover/link:text-secondary">
                      {project.name}
                    </p>

                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {project.clientName}
                    </p>
                  </div>

                  <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/40 transition-all group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-secondary"/>
                </Link>
              </div>
            </div>

            {/* badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              <StatusBadge status={project.status} />
              <PriorityBadge priority={project.priority} />
            </div>

            {/* progress */}
            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                  Progress
                </span>

                <span className="font-mono text-[9px] font-medium text-foreground">
                  {project.progress}%
                </span>
              </div>

              <div className="relative h-1.5 overflow-hidden bg-muted">
                <motion.div
                  initial={{
                    width: reduceMotion ? `${project.progress}%` : 0,
                  }}
                  animate={{
                    width: `${project.progress}%`,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.7,
                    delay: reduceMotion ? 0 : index * 0.05,
                  }}
                  className="absolute inset-y-0 left-0 bg-secondary"
                />
              </div>
            </div>

            {/* deadline */}
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <span className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted-foreground/40">
                Deadline
              </span>

              <span className="text-xs font-medium text-foreground">
                {project.deadline}
              </span>
            </div>
          </motion.article>
        ))}
      </div>

      {/*===== EMPTY STATE =====*/}

      {projects.length === 0 && (
        <div className="flex min-h-[220px] flex-col items-center justify-center px-6 py-10 text-center">
          <div className="flex h-11 w-11 items-center justify-center border border-secondary/15 bg-secondary/[0.05] text-secondary">
            <FolderKanban className="h-5 w-5" />
          </div>

          <p className="mt-4 text-sm font-semibold text-heading">
            No active projects
          </p>

          <p className="mt-1 max-w-xs text-xs leading-5 text-muted-foreground">
            Active client projects will appear here once delivery begins.
          </p>
        </div>
      )}
    </motion.section>
  );
};
