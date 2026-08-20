"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  FileText,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { fadeInUp } from "@/lib/utils/animations";

const actions = [
  {
    label: "Request Project",
    description: "Start a new engagement with Blackcrest.",
    icon: FileText,
    href: "/client/dashboard/request",
  },
  {
    label: "Upload Files",
    description: "Share documents and project materials.",
    icon: Upload,
  },
  {
    label: "Send Message",
    description: "Reach your Blackcrest team directly.",
    icon: MessageCircle,
  },
  {
    label: "Request Report",
    description: "Ask for a performance or strategy report.",
    icon: TrendingUp,
  },
];

export const QuickActions = () => {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative h-full overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
    >
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 h-52 w-52 rounded-full bg-secondary/[0.08] blur-[85px]"
      />

      {/* top line */}
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-secondary via-secondary/40 to-transparent"/>

      {/* header */}
      <div className="relative z-10 border-b border-border px-5 py-5 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-secondary" />

              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-secondary">
                Client concierge
              </span>

              <span className="h-px w-7 bg-secondary/30" />
            </div>

            <h2 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-heading sm:text-xl">
              Quick Actions
            </h2>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Access the services you&apos;re most likely to need.
            </p>
          </div>
        </div>
      </div>

      {/* actions */}
      <div className="relative z-10 divide-y divide-border">
        {actions.map((action, index) => {
          const Icon = action.icon;

          const content = (
            <>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-secondary/15 bg-secondary/[0.05] text-secondary transition-all duration-300 group-hover:border-secondary/30 group-hover:bg-secondary group-hover:text-secondary-foreground">
                <Icon className="h-4 w-4" strokeWidth={1.8} />
              </div>

              <div className="min-w-0 flex-1 text-left">
                <p className="text-sm font-semibold text-heading transition-colors group-hover:text-secondary">
                  {action.label}
                </p>

                <p className="mt-0.5 text-[11px] leading-5 text-muted-foreground">
                  {action.description}
                </p>
              </div>

              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-secondary"/>
            </>
          );

          if (action.href) {
            return (
              <motion.div
                key={action.label}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        x: 3,
                      }
                }
                transition={{
                  duration: 0.2,
                }}
              >
                <Button
                  href={action.href}
                  variant="ghost"
                  size="md"
                  className="group h-auto w-full justify-start gap-3 rounded-none px-5 py-4 text-left hover:bg-secondary/[0.025] sm:px-6"
                >
                  {content}
                </Button>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={action.label}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      x: 3,
                    }
              }
              transition={{
                duration: 0.2,
              }}
            >
              <Button
                variant="ghost"
                size="md"
                className="group h-auto w-full justify-start gap-3 rounded-none px-5 py-4 text-left hover:bg-secondary/[0.025] sm:px-6"
              >
                {content}
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* footer */}
      <div className="relative z-10 flex items-center justify-between border-t border-border bg-muted/15 px-5 py-3.5 sm:px-6">
        <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-muted-foreground/40">
          Blackcrest support access
        </span>

        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-secondary">
          BCR / CLIENT
        </span>
      </div>
    </motion.section>
  );
};
