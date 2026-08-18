"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Check,
  CircleDot,
  PenTool,
  Rocket,
  Search,
  Target,
  TrendingUp,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const processSteps = [
  {
    id: "discovery",
    number: "01",
    icon: Search,
    title: "Discovery",
    label: "Understand",
    description:
      "We begin every engagement by understanding your business, market, commercial goals, customers, existing capabilities, and the constraints we need to work within.",
    outcome: "A shared understanding of the real problem.",
    deliverables: [
      "Business & market context",
      "Current-state assessment",
      "Goals and success criteria",
    ],
  },
  {
    id: "strategy",
    number: "02",
    icon: Target,
    title: "Strategise",
    label: "Define",
    description:
      "Discovery becomes a focused strategy. We identify priorities, define the right services, establish measurable KPIs, and create a practical route from the current state to the desired outcome.",
    outcome: "A commercially focused direction.",
    deliverables: [
      "Strategic priorities",
      "Engagement roadmap",
      "KPIs & measurement framework",
    ],
  },
  {
    id: "design",
    number: "03",
    icon: PenTool,
    title: "Design",
    label: "Shape",
    description:
      "The strategy is translated into an executable plan — from user journeys and wireframes to technical specifications, campaign architecture, and delivery requirements.",
    outcome: "A clear blueprint before execution begins.",
    deliverables: [
      "Solution architecture",
      "Experience & campaign design",
      "Delivery specifications",
    ],
  },
  {
    id: "execute",
    number: "04",
    icon: Rocket,
    title: "Execute",
    label: "Build",
    description:
      "Our delivery teams execute against the agreed plan with clear ownership, regular checkpoints, visible progress, and iterative refinement where it improves the final outcome.",
    outcome: "Controlled execution with visible progress.",
    deliverables: [
      "Active delivery",
      "Quality assurance",
      "Stakeholder checkpoints",
    ],
  },
  {
    id: "report",
    number: "05",
    icon: BarChart3,
    title: "Report",
    label: "Measure",
    description:
      "Performance is measured against the agreed objectives. Reporting focuses on what matters commercially — what changed, what worked, what did not, and what should happen next.",
    outcome: "Clarity around performance and decisions.",
    deliverables: [
      "Performance reporting",
      "KPI analysis",
      "Actionable recommendations",
    ],
  },
  {
    id: "grow",
    number: "06",
    icon: TrendingUp,
    title: "Grow",
    label: "Improve",
    description:
      "Delivery is not treated as the finish line. We use performance data, market feedback, and new opportunities to continuously evolve the strategy as your business grows.",
    outcome: "A system designed to improve over time.",
    deliverables: [
      "Continuous optimisation",
      "Growth opportunities",
      "Next-stage roadmap",
    ],
  },
];

export const EngagementProcess = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = Boolean(useReducedMotion());

  const activeStep = processSteps[activeIndex];
  const ActiveIcon = activeStep.icon;

  const progress =
    processSteps.length > 1
      ? (activeIndex / (processSteps.length - 1)) * 100
      : 0;

  const handleNext = () => {
    setActiveIndex((current) =>
      current === processSteps.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <Section
      id="process"
      className="
        relative overflow-hidden
        bg-background
        py-16 text-foreground
        transition-colors duration-300
        sm:py-20 lg:py-28
      "
    >
      {/* =========================================
          BACKGROUND
      ========================================== */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[-16rem] top-[10%] h-[38rem] w-[38rem] opacity-60"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 7%, transparent), transparent 68%)",
          }}
        />

        <div
          className="absolute bottom-[-20rem] right-[-12rem] h-[38rem] w-[38rem] opacity-40"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 6%, transparent), transparent 70%)",
          }}
        />

        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--color-border), transparent)",
          }}
        />
      </div>

      <Container className="relative">
        {/* =========================================
            HEADER
        ========================================== */}
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <motion.div
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : -18,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center gap-3">
              <CircleDot className="h-4 w-4 text-secondary" />

              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-secondary">
                How we work / 06 stages
              </span>

              <span className="h-px w-12 bg-secondary/40" />
            </div>

            <h2 className="mt-5 max-w-xl text-4xl font-semibold tracking-[-0.045em] text-heading sm:text-5xl">
              From ambiguity
              <span className="block text-muted-foreground">to measurable</span>
              <span className="text-gold-gradient">progress.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 16,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              delay: 0.1,
              duration: 0.55,
            }}
            className="lg:justify-self-end"
          >
            <p className="max-w-xl text-sm leading-7 text-body sm:text-base">
              Our process gives every engagement structure without making it
              rigid. Each stage creates the clarity needed for the next —
              keeping decisions, delivery, and commercial objectives aligned.
            </p>

            <div className="mt-5 flex items-center gap-4">
              <span className="font-mono text-[8px] uppercase tracking-[0.17em] text-muted-foreground/50">
                Structured
              </span>

              <span className="h-1 w-1 rounded-full bg-secondary" />

              <span className="font-mono text-[8px] uppercase tracking-[0.17em] text-muted-foreground/50">
                Transparent
              </span>

              <span className="h-1 w-1 rounded-full bg-secondary" />

              <span className="font-mono text-[8px] uppercase tracking-[0.17em] text-muted-foreground/50">
                Adaptive
              </span>
            </div>
          </motion.div>
        </div>

        {/* =========================================
            PROCESS WORKSPACE
        ========================================== */}
        <div className="mt-14 grid border-y border-border lg:grid-cols-[0.72fr_1.28fr]">
          {/* =====================================
              LEFT PROCESS NAVIGATION
          ====================================== */}
          <div className="relative border-b border-border lg:border-b-0 lg:border-r">
            {/* vertical progress rail */}
            <div className="absolute bottom-8 left-[27px] top-8 hidden w-px bg-border sm:block">
              <motion.div
                animate={{
                  height: `${progress}%`,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute left-0 top-0 w-px bg-secondary"
              />

              {!reduceMotion && (
                <motion.span
                  animate={{
                    top: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute -left-[3px] h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-secondary shadow-[0_0_12px_var(--color-secondary)]"
                />
              )}
            </div>

            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeIndex === index;
              const isComplete = index < activeIndex;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  aria-pressed={isActive}
                  className={`
                    group relative flex w-full
                    items-center gap-4
                    border-b border-border
                    px-0 py-5 text-left
                    transition-colors duration-300
                    last:border-b-0
                    sm:px-2
                    ${isActive ? "bg-secondary/[0.045]" : "hover:bg-muted/40"}
                  `}
                >
                  {/* node */}
                  <div
                    className={`
                      relative z-10 flex h-11 w-11 shrink-0
                      items-center justify-center
                      border transition-all duration-300
                      ${
                        isActive
                          ? "border-secondary bg-secondary text-secondary-foreground shadow-[var(--shadow-gold-glow)]"
                          : isComplete
                            ? "border-secondary/30 bg-background text-secondary"
                            : "border-border bg-background text-muted-foreground"
                      }
                    `}
                  >
                    {isComplete ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={`
                          text-sm font-semibold transition-colors
                          ${
                            isActive
                              ? "text-heading"
                              : "text-muted-foreground group-hover:text-foreground"
                          }
                        `}
                      >
                        {step.title}
                      </span>

                      <span
                        className={`
                          font-mono text-[8px] uppercase
                          tracking-[0.15em]
                          ${
                            isActive
                              ? "text-secondary"
                              : "text-muted-foreground/35"
                          }
                        `}
                      >
                        {step.label}
                      </span>
                    </div>

                    <div className="mt-2 h-px w-full overflow-hidden bg-border/60">
                      {isActive && (
                        <motion.div
                          layoutId="process-active-line"
                          className="h-full bg-secondary"
                        />
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* =====================================
              RIGHT ACTIVE STAGE
          ====================================== */}
          <div className="relative min-h-[570px] overflow-hidden bg-card">
            {/* decorative number */}
            <AnimatePresence mode="wait">
              <motion.span
                key={`number-${activeStep.number}`}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -15,
                }}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
                className="
                  pointer-events-none absolute
                  -right-2 -top-10
                  font-mono text-[10rem]
                  font-semibold leading-none
                  tracking-[-0.1em]
                  text-secondary/[0.045]
                  sm:text-[13rem]
                  lg:text-[16rem]
                "
              >
                {activeStep.number}
              </motion.span>
            </AnimatePresence>

            {/* scan effect */}
            {!reduceMotion && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-[20%]"
                animate={{
                  x: ["-150%", "650%"],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  background:
                    "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-secondary) 4%, transparent), transparent)",
                }}
              />
            )}

            <div className="relative z-10 flex h-full flex-col p-6 sm:p-8 lg:p-12">
              {/* top */}
              <div className="flex items-start justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`icon-${activeStep.id}`}
                    initial={{
                      opacity: 0,
                      scale: 0.85,
                      rotate: -8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.85,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="
                      flex h-12 w-12 items-center
                      justify-center
                      border border-secondary/20
                      bg-secondary/[0.07]
                      text-secondary
                    "
                  >
                    <ActiveIcon className="h-5 w-5" />
                  </motion.div>
                </AnimatePresence>

                <div className="text-right">
                  <p className="font-mono text-[8px] uppercase tracking-[0.17em] text-muted-foreground/40">
                    Current stage
                  </p>

                  <p className="mt-1 font-mono text-[10px] font-semibold text-secondary">
                    {activeStep.number} / 06
                  </p>
                </div>
              </div>

              {/* changing content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep.id}
                  initial={{
                    opacity: 0,
                    x: reduceMotion ? 0 : 22,
                    filter: reduceMotion ? "none" : "blur(4px)",
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    x: reduceMotion ? 0 : -18,
                    filter: reduceMotion ? "none" : "blur(4px)",
                  }}
                  transition={{
                    duration: 0.38,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mt-10"
                >
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-secondary">
                    {activeStep.label}
                  </p>

                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-heading sm:text-4xl lg:text-5xl">
                    {activeStep.title}
                  </h3>

                  <p className="mt-6 max-w-2xl text-sm leading-7 text-body sm:text-base sm:leading-8">
                    {activeStep.description}
                  </p>

                  {/* outcome */}
                  <div className="mt-8 border-l-2 border-secondary pl-5">
                    <p className="font-mono text-[8px] uppercase tracking-[0.17em] text-muted-foreground/50">
                      Stage outcome
                    </p>

                    <p className="mt-2 text-base font-semibold text-heading">
                      {activeStep.outcome}
                    </p>
                  </div>

                  {/* outputs */}
                  <div className="mt-9">
                    <p className="font-mono text-[8px] uppercase tracking-[0.17em] text-muted-foreground/50">
                      Typical outputs
                    </p>

                    <div className="mt-4 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
                      {activeStep.deliverables.map((item, index) => (
                        <motion.div
                          key={item}
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay: 0.08 + index * 0.07,
                          }}
                          className="
                            group/output
                            bg-background
                            p-4
                            transition-colors duration-300
                            hover:bg-secondary/[0.045]
                          "
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[8px] text-secondary/70">
                              0{index + 1}
                            </span>

                            <span className="h-1 w-1 rounded-full bg-secondary/40 transition-transform duration-300 group-hover/output:scale-[2]" />
                          </div>

                          <p className="mt-5 text-xs font-medium leading-5 text-foreground">
                            {item}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* next stage */}
              <div className="mt-auto flex items-center justify-between border-t border-border pt-6">
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.17em] text-muted-foreground/40">
                    Next
                  </span>

                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    {
                      processSteps[(activeIndex + 1) % processSteps.length]
                        .title
                    }
                  </p>
                </div>

                <motion.button
                  type="button"
                  onClick={handleNext}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          x: 3,
                        }
                  }
                  whileTap={
                    reduceMotion
                      ? undefined
                      : {
                          scale: 0.96,
                        }
                  }
                  className="
                    group flex items-center gap-3
                    text-xs font-semibold text-foreground
                    transition-colors hover:text-secondary
                  "
                >
                  Next stage
                  <span
                    className="
                      flex h-9 w-9 items-center justify-center
                      border border-border
                      bg-background
                      transition-all duration-300
                      group-hover:border-secondary/30
                      group-hover:bg-secondary/[0.06]
                    "
                  >
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            FOOTER STRIP
        ========================================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="
            flex flex-col gap-4
            border-b border-border py-5
            sm:flex-row sm:items-center
            sm:justify-between
          "
        >
          <p className="max-w-xl text-xs leading-6 text-muted-foreground">
            The exact activities change by engagement. The operating logic stays
            consistent: understand first, execute deliberately, measure, then
            improve.
          </p>

          <div className="flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/45">
            Discovery
            <span className="text-secondary">→</span>
            Strategy
            <span className="text-secondary">→</span>
            Growth
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};
