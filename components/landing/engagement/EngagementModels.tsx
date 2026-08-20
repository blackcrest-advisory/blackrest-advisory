"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Clock,
  Layers3,
  MoveRight,
  Sparkles,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const models = [
  {
    id: "retained",
    number: "01",
    title: "Retained Partnership",
    shortTitle: "Retained",
    icon: BadgeCheck,
    bestFor: "Businesses wanting an ongoing growth partner",
    description:
      "Monthly fixed retainer covering one or more service pillars. Regular strategy sessions, ongoing delivery, and monthly performance reporting.",
    features: [
      "Dedicated account team",
      "Monthly strategy review",
      "Performance dashboards",
      "Unlimited ad-hoc support",
    ],
    characteristics: [
      {
        label: "Relationship",
        value: "Ongoing",
      },
      {
        label: "Scope",
        value: "Adaptive",
      },
      {
        label: "Cadence",
        value: "Monthly",
      },
    ],
    cta: "Start a retained partnership",
    popular: true,
  },
  {
    id: "project",
    number: "02",
    title: "Project-Based",
    shortTitle: "Project",
    icon: Clock,
    bestFor: "Defined deliverables with clear scope",
    description:
      "Fixed-price engagements for specific deliverables — such as a new website, application, campaign launch, or sales audit — with a clear scope and delivery timeline.",
    features: [
      "Fixed scope & budget",
      "Milestone payments",
      "Dedicated project manager",
      "Post-launch handover",
    ],
    characteristics: [
      {
        label: "Relationship",
        value: "Defined",
      },
      {
        label: "Scope",
        value: "Fixed",
      },
      {
        label: "Cadence",
        value: "Milestones",
      },
    ],
    cta: "Discuss a project",
    popular: false,
  },
  {
    id: "hybrid",
    number: "03",
    title: "Hybrid Engagement",
    shortTitle: "Hybrid",
    icon: Layers3,
    bestFor: "Ongoing support plus defined projects",
    description:
      "Combine an ongoing strategic or delivery retainer with separately scoped projects when additional specialist capability or larger initiatives are required.",
    features: [
      "Flexible ongoing scope",
      "Priority access",
      "Blended commercial model",
      "Strategic advisory included",
    ],
    characteristics: [
      {
        label: "Relationship",
        value: "Ongoing",
      },
      {
        label: "Scope",
        value: "Blended",
      },
      {
        label: "Cadence",
        value: "Flexible",
      },
    ],
    cta: "Explore a hybrid model",
    popular: false,
  },
];

export const EngagementModels = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = Boolean(useReducedMotion());

  const activeModel = models[activeIndex];
  const ActiveIcon = activeModel.icon;

  return (
    <Section
      id="engagement-models"
      className="relative overflow-hidden bg-background py-16 text-foreground transition-colors duration-300 sm:py-20 lg:py-28"
    >
      {/* ========================================
          BACKGROUND
      ======================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-[-16rem] top-[-15rem] h-[38rem] w-[38rem] opacity-60"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 8%, transparent), transparent 68%)",
          }}
        />

        <div
          className="absolute bottom-[-18rem] left-[-14rem] h-[36rem] w-[36rem] opacity-30"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 7%, transparent), transparent 70%)",
          }}
        />
      </div>

      <Container className="relative">
        {/* ========================================
            SECTION INTRO
        ======================================== */}

        <div
          className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[1fr_0.8fr] lg:items-end"
        >
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
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-secondary">
                Engagement models
              </span>

              <span className="h-px w-12 bg-secondary/40" />

              <span className="font-mono text-[9px] text-muted-foreground/40">
                03 OPTIONS
              </span>
            </div>

            <h2
              className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.045em] text-heading sm:text-5xl"
            >
              Different needs.
              <span className="block text-muted-foreground">
                Different ways to
              </span>
              <span className="text-gold-gradient">work together.</span>
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
            <p className="max-w-lg text-sm leading-7 text-body sm:text-base">
              There is no single engagement structure that works for every
              business. Choose the model that best matches your objectives,
              level of support, and delivery requirements.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <Sparkles className="h-3.5 w-3.5 text-secondary" />

              <span className="text-xs text-muted-foreground">
                Engagements can evolve as your requirements change.
              </span>
            </div>
          </motion.div>
        </div>

        {/* ========================================
            MODEL SELECTOR
        ======================================== */}

        <div className="grid border-b border-border sm:grid-cols-3">
          {models.map((model, index) => {
            const Icon = model.icon;
            const isActive = activeIndex === index;

            return (
              <button
                key={model.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                aria-pressed={isActive}
                className={`
                  group relative
                  flex items-center justify-between
                  gap-4
                  border-b border-border
                  px-1 py-6
                  text-left
                  transition-colors duration-300

                  sm:border-b-0
                  sm:border-r
                  sm:px-6

                  first:sm:pl-0
                  last:sm:border-r-0
                  last:sm:pr-0

                  ${
                    isActive
                      ? "text-heading"
                      : "text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`
                      flex h-10 w-10
                      shrink-0 items-center justify-center
                      border
                      transition-all duration-300

                      ${
                        isActive
                          ? `
                            border-secondary
                            bg-secondary
                            text-secondary-foreground
                            shadow-[var(--shadow-gold-glow)]
                          `
                          : `
                            border-border
                            bg-card
                            text-muted-foreground
                            group-hover:border-secondary/30
                            group-hover:text-secondary
                          `
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div>
                    <span
                      className="font-mono text-[8px] uppercase tracking-[0.16em] text-secondary"
                    >
                      Model {model.number}
                    </span>

                    <p className="mt-1 text-sm font-semibold">
                      {model.shortTitle}
                    </p>
                  </div>
                </div>

                {model.popular && (
                  <span
                    className="hidden font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary lg:block"
                  >
                    Preferred
                  </span>
                )}

                {isActive && (
                  <motion.div
                    layoutId="engagement-model-active"
                    className="absolute bottom-[-1px] left-0 h-[2px] w-full bg-secondary"
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ========================================
            ACTIVE MODEL
        ======================================== */}

        <div
          className="relative grid min-h-[520px] border-b border-border lg:grid-cols-[1.15fr_0.85fr]"
        >
          {/* LEFT */}
          <div
            className="relative overflow-hidden border-b border-border py-10 lg:border-b-0 lg:border-r lg:py-14 lg:pr-14"
          >
            {/* Giant model number */}
            <AnimatePresence mode="wait">
              <motion.span
                key={`number-${activeModel.number}`}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                transition={{
                  duration: 0.3,
                }}
                aria-hidden="true"
                className="pointer-events-none absolute -right-5 -top-10 font-mono text-[12rem] font-semibold leading-none tracking-[-0.1em] text-secondary/[0.045] sm:text-[16rem]"
              >
                {activeModel.number}
              </motion.span>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeModel.id}
                initial={{
                  opacity: 0,
                  x: reduceMotion ? 0 : 20,
                  filter: reduceMotion ? "none" : "blur(4px)",
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  x: reduceMotion ? 0 : -16,
                  filter: reduceMotion ? "none" : "blur(4px)",
                }}
                transition={{
                  duration: 0.38,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-10"
              >
                {/* model identifier */}
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{
                      scale: 0.9,
                      rotate: -6,
                    }}
                    animate={{
                      scale: 1,
                      rotate: 0,
                    }}
                    className="flex h-12 w-12 items-center justify-center border border-secondary/20 bg-secondary/[0.07] text-secondary"
                  >
                    <ActiveIcon className="h-5 w-5" />
                  </motion.div>

                  <div>
                    <p
                      className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground/50"
                    >
                      Engagement model
                    </p>

                    <p className="mt-1 text-xs font-semibold text-secondary">
                      {activeModel.number} / 03
                    </p>
                  </div>
                </div>

                <h3
                  className="mt-8 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-heading sm:text-4xl lg:text-5xl"
                >
                  {activeModel.title}
                </h3>

                {/* Best for */}
                <div className="mt-6 flex max-w-2xl items-start gap-3">
                  <span
                    className="mt-0.5 shrink-0 font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-secondary"
                  >
                    Best for
                  </span>

                  <span className="h-px w-6 shrink-0 translate-y-2 bg-secondary/30" />

                  <p className="text-sm font-medium leading-6 text-foreground">
                    {activeModel.bestFor}
                  </p>
                </div>

                <p
                  className="mt-7 max-w-2xl text-sm leading-7 text-body sm:text-base sm:leading-8"
                >
                  {activeModel.description}
                </p>

                {/* Features */}
                <div className="mt-9 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
                  {activeModel.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.08 + index * 0.06,
                      }}
                      className="group/feature flex items-center gap-3 bg-background p-4 transition-colors duration-300 hover:bg-secondary/[0.045]"
                    >
                      <div
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/[0.08]"
                      >
                        <Check className="h-3 w-3 text-secondary" />
                      </div>

                      <span className="text-xs font-medium text-foreground">
                        {feature}
                      </span>

                      <span
                        className="ml-auto font-mono text-[7px] text-muted-foreground/30"
                      >
                        0{index + 1}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-9">
                  <Button
                    variant="primary"
                    size="lg"
                    href="/contact"
                    className="group"
                  >
                    {activeModel.cta}

                    <ArrowRight
                      className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ========================================
              RIGHT — MODEL PROFILE
          ======================================== */}

          <div
            className="relative flex flex-col bg-card py-10 text-card-foreground lg:py-14 lg:pl-12"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`profile-${activeModel.id}`}
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: reduceMotion ? 0 : -12,
                }}
                transition={{
                  duration: 0.35,
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground/50"
                    >
                      Model profile
                    </p>

                    <p className="mt-2 text-sm font-semibold text-heading">
                      Engagement characteristics
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.span
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              opacity: [0.35, 1, 0.35],
                            }
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="h-1.5 w-1.5 rounded-full bg-success"
                    />

                    <span
                      className="font-mono text-[8px] uppercase tracking-[0.15em] text-success"
                    >
                      Available
                    </span>
                  </div>
                </div>

                {/* characteristics */}
                <div className="mt-9 border-t border-border">
                  {activeModel.characteristics.map((characteristic, index) => (
                    <motion.div
                      key={characteristic.label}
                      initial={{
                        opacity: 0,
                        x: 10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.08 + index * 0.07,
                      }}
                      className="grid grid-cols-[minmax(0,1fr)_minmax(90px,auto)] items-center gap-6 border-b border-border py-5 pr-4 sm:pr-6"
                    >
                      <div className="min-w-0">
                        <span
                          className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/50"
                        >
                          0{index + 1}
                        </span>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {characteristic.label}
                        </p>
                      </div>

                      <p
                        className="min-w-0 text-right text-sm font-semibold text-heading sm:text-base"
                      >
                        {characteristic.value}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* visual spectrum */}
                <div className="mt-9">
                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/50"
                    >
                      Flexibility
                    </span>

                    <span className="font-mono text-[8px] text-secondary">
                      {activeModel.id === "project"
                        ? "40%"
                        : activeModel.id === "retained"
                          ? "78%"
                          : "94%"}
                    </span>
                  </div>

                  <div className="mt-3 h-[3px] overflow-hidden bg-muted">
                    <motion.div
                      key={`flex-${activeModel.id}`}
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX:
                          activeModel.id === "project"
                            ? 0.4
                            : activeModel.id === "retained"
                              ? 0.78
                              : 0.94,
                      }}
                      transition={{
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-full origin-left bg-secondary"
                    />
                  </div>

                  <div className="mt-2 flex justify-between">
                    <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted-foreground/30">
                      Fixed
                    </span>

                    <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted-foreground/30">
                      Adaptive
                    </span>
                  </div>
                </div>

                {/* Recommended */}
                {activeModel.popular && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.97,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay: 0.2,
                    }}
                    className="mt-9 border border-secondary/20 bg-secondary/[0.055] p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center bg-secondary/[0.1] text-secondary"
                      >
                        <Sparkles className="h-4 w-4" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-heading">
                          Most common starting point
                        </p>

                        <p className="mt-1 text-xs leading-6 text-muted-foreground">
                          Best suited to organisations looking for continuity,
                          strategic involvement, and ongoing execution.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Bottom */}
            <div className="mt-auto pt-10">
              <div className="flex items-center justify-between border-t border-border pt-5">
                <span
                  className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/40"
                >
                  Not sure which model fits?
                </span>

                <a
                  href="/contact"
                  className="group flex items-center gap-2 text-xs font-semibold text-foreground transition-colors hover:text-secondary"
                >
                  Talk to us
                  <MoveRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================
            CLOSING
        ======================================== */}

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
          className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-xl text-xs leading-6 text-muted-foreground">
            Not every engagement needs to start large. We can begin with a
            focused scope and evolve the relationship as priorities become
            clearer.
          </p>

          <span
            className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/40"
          >
            Choose → Validate → Engage → Evolve
          </span>
        </motion.div>
      </Container>
    </Section>
  );
};
