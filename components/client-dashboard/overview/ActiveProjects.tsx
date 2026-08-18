"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, FolderKanban, Sparkles } from "lucide-react";

import { Project } from "@/types/dashboard/client/overviewType";
import { Button } from "@/components/ui/Button";
import { ProjectItem } from "@/components/client-dashboard/overview/ProjectItem";
import { fadeInUp } from "@/lib/utils/animations";

interface ActiveProjectsProps {
  projects: Project[];
}

export const ActiveProjects = ({ projects }: ActiveProjectsProps) => {
  const reduceMotion = Boolean(useReducedMotion());

  const showFirstFourProjects = projects.slice(0, 4);

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        h-full
        overflow-hidden
        border border-border
        bg-card
        shadow-[var(--shadow-card)]
      "
    >
      {/* ====================================================== */}
      {/* BACKGROUND                                             */}
      {/* ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-24 -top-24
          h-64 w-64
          rounded-full
          bg-secondary/[0.08]
          blur-[90px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          hidden opacity-[0.05]
          lg:block
        "
        style={{
          backgroundImage: `
            linear-gradient(
              to right,
              var(--color-border) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "20% 100%",
        }}
      />

      {/* top signal */}
      <div
        className="
          absolute left-0 top-0
          h-[2px] w-full
          bg-gradient-to-r
          from-secondary
          via-secondary/40
          to-transparent
        "
      />

      {/* ====================================================== */}
      {/* HEADER                                                 */}
      {/* ====================================================== */}

      <div
        className="
          relative z-10
          flex flex-col
          gap-4
          border-b border-border
          px-5 py-5

          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-6
        "
      >
        <div>
          <div className="flex items-center gap-2">
            <FolderKanban className="h-3.5 w-3.5 text-secondary" />

            <span
              className="
                font-mono
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-secondary
              "
            >
              Engagement portfolio
            </span>

            <span className="h-px w-8 bg-secondary/30" />
          </div>

          <div className="mt-2 flex flex-wrap items-baseline gap-3">
            <h2
              className="
                text-lg
                font-semibold
                tracking-[-0.025em]
                text-heading
                sm:text-xl
              "
            >
              Active Projects
            </h2>

            <span
              className="
                font-mono
                text-[8px]
                uppercase
                tracking-[0.15em]
                text-muted-foreground/40
              "
            >
              {projects.length} total
            </span>
          </div>

          <p
            className="
              mt-1
              max-w-xl
              text-xs
              leading-5
              text-muted-foreground
            "
          >
            Track the work currently moving forward across your Blackcrest
            engagement.
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          disabled={projects.length === 0}
          className="group self-start sm:self-auto"
        >
          View All
          <ArrowUpRight
            className="
              ml-2
              h-3.5 w-3.5
              transition-transform
              duration-300

              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </Button>
      </div>

      {/* ====================================================== */}
      {/* PROJECTS                                               */}
      {/* ====================================================== */}

      {projects.length === 0 ? (
        <div
          className="
            relative z-10
            flex min-h-[300px]
            flex-col
            items-center
            justify-center
            px-6 py-10
            text-center
          "
        >
          <div
            className="
              flex h-12 w-12
              items-center justify-center
              border border-secondary/15
              bg-secondary/[0.05]
              text-secondary
            "
          >
            <FolderKanban className="h-5 w-5" />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-secondary" />

            <span
              className="
                font-mono
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.16em]
                text-secondary
              "
            >
              Project workspace
            </span>
          </div>

          <p
            className="
              mt-3
              text-sm
              font-semibold
              text-heading
            "
          >
            No active projects yet
          </p>

          <p
            className="
              mt-1
              max-w-sm
              text-xs
              leading-5
              text-muted-foreground
            "
          >
            Once a project begins, its delivery progress and latest updates will
            appear here.
          </p>
        </div>
      ) : (
        <div
          className="
            relative z-10
            divide-y divide-border
          "
        >
          {showFirstFourProjects.map((project, index) => (
            <motion.div
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
                duration: reduceMotion ? 0 : 0.35,
                delay: reduceMotion ? 0 : index * 0.05,
              }}
              className="
                group/project
                relative
                px-5 py-4
                transition-colors
                duration-200
                hover:bg-secondary/[0.02]

                sm:px-6
              "
            >
              {/* left project signal */}
              <span
                className="
                  absolute
                  bottom-0 left-0 top-0
                  w-[2px]
                  bg-secondary
                  opacity-0
                  transition-opacity
                  duration-300
                  group-hover/project:opacity-100
                "
              />

              <ProjectItem project={project} />
            </motion.div>
          ))}
        </div>
      )}

      {/* ====================================================== */}
      {/* FOOTER                                                 */}
      {/* ====================================================== */}

      {projects.length > 0 && (
        <div
          className="
            relative z-10
            flex flex-col
            gap-3
            border-t border-border
            bg-muted/15
            px-5 py-4

            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-6
          "
        >
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />

            <span
              className="
                font-mono
                text-[7px]
                uppercase
                tracking-[0.16em]
                text-muted-foreground/40
              "
            >
              Delivery tracking active
            </span>
          </div>

          <span
            className="
              text-xs
              text-muted-foreground
            "
          >
            Showing {showFirstFourProjects.length} of {projects.length} projects
          </span>
        </div>
      )}
    </motion.section>
  );
};
