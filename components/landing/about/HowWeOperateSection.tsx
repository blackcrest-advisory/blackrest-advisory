"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  CircleDot,
  MessageSquareText,
  Network,
  ShieldCheck,
  Target,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const operatingPrinciples = [
  {
    id: "ownership",
    number: "01",
    title: "Senior Ownership",
    short: "Ownership",
    icon: ShieldCheck,
    headline: "You always know who owns the outcome.",
    description:
      "Every engagement has clear accountability. Strategy, communication, quality, and delivery direction remain visible and owned throughout the project.",
    points: [
      "Direct senior involvement",
      "Clear decision ownership",
      "Visible delivery responsibility",
    ],
  },
  {
    id: "communication",
    number: "02",
    title: "Clear Communication",
    short: "Clarity",
    icon: MessageSquareText,
    headline: "No black boxes. No guessing where the work stands.",
    description:
      "Clients receive straightforward communication, clear priorities, and honest progress updates so decisions can be made with confidence.",
    points: [
      "Transparent project status",
      "Concise reporting",
      "Fast escalation when needed",
    ],
  },
  {
    id: "outcomes",
    number: "03",
    title: "Commercial Outcomes",
    short: "Impact",
    icon: Target,
    headline: "Activity only matters when it moves the business.",
    description:
      "We connect delivery decisions back to commercial objectives — whether the goal is acquisition, conversion, operational efficiency, or growth.",
    points: [
      "Outcome-led prioritisation",
      "Measurable success criteria",
      "Continuous optimisation",
    ],
  },
  {
    id: "network",
    number: "04",
    title: "Flexible Expertise",
    short: "Expertise",
    icon: Network,
    headline: "The right expertise, without unnecessary complexity.",
    description:
      "Our core team stays accountable while specialist capability is introduced only when it creates real value for the engagement.",
    points: [
      "Curated specialist network",
      "Flexible project capacity",
      "Blackcrest-led quality control",
    ],
  },
];

const engagementSteps = ["Understand", "Prioritise", "Execute", "Measure"];

export const HowWeOperateSection = () => {
  const reduceMotion = Boolean(useReducedMotion());
  const [activeId, setActiveId] = useState("ownership");

  const active =
    operatingPrinciples.find((item) => item.id === activeId) ??
    operatingPrinciples[0];

  const ActiveIcon = active.icon;

  return (
    <Section className="relative overflow-hidden bg-navy-deep py-16 text-white sm:py-20 lg:py-28">
      {/* Background system */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                rgba(255,255,255,0.65) 1px,
                transparent 1px
              ),
              linear-gradient(
                to bottom,
                rgba(255,255,255,0.65) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "84px 84px",
          }}
        />

        <div
          className="absolute right-[-14rem] top-[8%] h-[38rem] w-[38rem]"
          style={{
            background:
              "radial-gradient(circle, rgb(166 124 39 / 0.16), transparent 68%)",
          }}
        />

        <motion.div
          aria-hidden="true"
          className="absolute left-[-8rem] top-[42%] h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_14px_rgb(166_124_39/0.45)]"
          animate={
            reduceMotion
              ? undefined
              : {
                  x: ["0vw", "115vw"],
                  opacity: [0, 1, 1, 0],
                }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "linear",
          }}
        />
      </div>

      <Container className="relative">
        {/* Header */}
        <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <CircleDot className="h-4 w-4 text-gold-light" />

              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light">
                How we operate
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.08,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl"
            >
              Structured enough for clarity.
              <span className="block text-white/35">
                Flexible enough for reality.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.14 }}
            className="max-w-lg text-sm leading-7 text-white/55 sm:text-base"
          >
            We use a disciplined operating model without forcing every client
            into the same process. The principles stay consistent; the delivery
            adapts around the business.
          </motion.p>
        </div>

        {/* Principle selector */}
        <div className="mt-10 grid border-b border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {operatingPrinciples.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeId;

            return (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => setActiveId(item.id)}
                onFocus={() => setActiveId(item.id)}
                onClick={() => setActiveId(item.id)}
                className={`
                  group relative flex items-center gap-4
                  border-white/10 px-0 py-5 text-left
                  transition-colors duration-300
                  sm:px-5
                  lg:border-r
                  first:lg:pl-0
                  last:lg:border-r-0
                  ${
                    isActive
                      ? "text-white"
                      : "text-white/35 hover:text-white/70"
                  }
                `}
              >
                <div
                  className={`
                    flex h-10 w-10 shrink-0 items-center justify-center
                    border transition-all duration-300
                    ${
                      isActive
                        ? "border-gold/30 bg-gold text-navy shadow-[var(--shadow-gold-glow)]"
                        : "border-white/10 bg-white/[0.035]"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-gold-light/70">
                    {item.number}
                  </span>

                  <span className="mt-1 block text-sm font-semibold">
                    {item.short}
                  </span>
                </div>

                {isActive && (
                  <motion.span
                    layoutId="operate-active"
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-gold"
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

        {/* Active operating principle */}
        <div className="grid min-h-[470px] gap-12 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 lg:py-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{
                opacity: 0,
                x: -20,
                filter: "blur(4px)",
              }}
              animate={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                x: 16,
                filter: "blur(4px)",
              }}
              transition={{
                duration: 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center border border-gold/25 bg-gold/10 text-gold-light">
                  <ActiveIcon className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                    Operating principle
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gold-light">
                    {active.title}
                  </p>
                </div>
              </div>

              <h3 className="mt-8 max-w-2xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-[3rem] lg:leading-[1.05]">
                {active.headline}
              </h3>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/55">
                {active.description}
              </p>

              <div className="mt-9 max-w-2xl border-t border-white/10">
                {active.points.map((point, index) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.08 + index * 0.07,
                    }}
                    className="flex items-center justify-between border-b border-white/10 py-4 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/10">
                        <Check className="h-3 w-3 text-gold-light" />
                      </div>

                      <span className="text-sm font-medium text-white/75">
                        {point}
                      </span>
                    </div>

                    <span className="font-mono text-[9px] text-white/20">
                      0{index + 1}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Operating system panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="relative border border-white/10 bg-white/[0.045] p-6 backdrop-blur-sm sm:p-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                  Engagement system
                </p>

                <p className="mt-2 text-sm font-semibold text-white">
                  Blackcrest operating rhythm
                </p>
              </div>

              <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-success">
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
                Active
              </span>
            </div>

            <div className="relative mt-10">
              <div className="absolute left-5 top-5 h-[calc(100%-2.5rem)] w-px bg-white/10" />

              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute left-5 top-5 h-[calc(100%-2.5rem)] w-px origin-top bg-gradient-to-b from-gold via-gold/40 to-transparent"
              />

              <div className="space-y-3">
                {engagementSteps.map((step, index) => (
                  <motion.div
                    key={step}
                    initial={{
                      opacity: 0,
                      x: 14,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.12 + index * 0.09,
                    }}
                    className="relative flex items-center gap-5 py-3"
                  >
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center border border-gold/20 bg-navy text-[10px] font-semibold text-gold-light">
                      0{index + 1}
                    </div>

                    <div className="flex flex-1 items-center justify-between gap-4 border-b border-white/[0.07] pb-3">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {step}
                        </p>

                        <p className="mt-1 text-xs text-white/35">
                          {index === 0 &&
                            "Understand the commercial context first."}
                          {index === 1 &&
                            "Focus effort where it creates the most value."}
                          {index === 2 &&
                            "Deliver with clear accountability and visibility."}
                          {index === 3 &&
                            "Review outcomes and improve what comes next."}
                        </p>
                      </div>

                      <ArrowUpRight className="h-3.5 w-3.5 text-white/20" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* assurance */}
            <div className="mt-8 border border-gold/15 bg-gold/[0.055] p-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gold-light">
                What stays constant
              </p>

              <p className="mt-2 text-sm leading-6 text-white/70">
                Clear ownership, visible progress, commercial thinking, and
                accountability — regardless of the size or shape of the
                engagement.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Closing bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-5 border-t border-white/10 pt-7 sm:grid-cols-[1fr_auto] sm:items-center"
        >
          <p className="max-w-2xl text-sm leading-7 text-white/40">
            Good delivery should feel predictable without becoming rigid. That
            balance is what the Blackcrest operating model is designed to
            achieve.
          </p>

          <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] uppercase tracking-[0.15em] text-white/35">
            Clarity
            <span className="h-1 w-1 rounded-full bg-gold" />
            Ownership
            <span className="h-1 w-1 rounded-full bg-gold" />
            Execution
            <span className="h-1 w-1 rounded-full bg-gold" />
            Improvement
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};
