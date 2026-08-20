"use client";

//===== imports =====//
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Compass,
  Crosshair,
  Gauge,
  Search,
  Sparkles,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

//==============================================================//
// GROWTH ENGINE CONTENT
//==============================================================//

const growthSteps = [
  {
    number: "01",
    phase: "Discover",
    title: "Find the opportunity",
    description:
      "Understand your market, audience, search demand, competitors, and the commercial gaps worth pursuing.",
    meta: "Market / Audience / Demand",
    icon: Compass,
  },
  {
    number: "02",
    phase: "Attract",
    title: "Create qualified demand",
    description:
      "Use search, paid media, content, and social channels to reach the people most likely to become valuable customers.",
    meta: "Search / Paid / Content",
    icon: Crosshair,
  },
  {
    number: "03",
    phase: "Convert",
    title: "Turn attention into action",
    description:
      "Align messaging, landing experiences, and conversion journeys so qualified traffic has a clear path forward.",
    meta: "CRO / Messaging / UX",
    icon: Search,
  },
  {
    number: "04",
    phase: "Measure",
    title: "See what creates value",
    description:
      "Connect performance data to meaningful outcomes so decisions are driven by evidence instead of assumptions.",
    meta: "Analytics / Attribution / Pipeline",
    icon: BarChart3,
  },
  {
    number: "05",
    phase: "Optimize",
    title: "Improve what works",
    description:
      "Use continuous learning, experimentation, and performance insights to strengthen the system and scale efficiently.",
    meta: "Testing / Learning / Scale",
    icon: Gauge,
  },
];

//==============================================================//
// GROWTH ENGINE
//==============================================================//

export default function GrowthEngine() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      className="relative isolate overflow-hidden bg-primary py-16 text-primary-foreground sm:py-20 lg:py-28"
    >
      {/* ====================================================== */}
      {/* BACKGROUND SYSTEM                                     */}
      {/* ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
      >
        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:72px_72px]"
        />

        {/* gold glow */}
        <div
          className="absolute left-[12%] top-[20%] h-[340px] w-[340px] rounded-full bg-secondary/[0.09] blur-[130px]"
        />

        {/* secondary ambience */}
        <div
          className="absolute -right-32 bottom-[-80px] h-[420px] w-[420px] rounded-full bg-white/[0.035] blur-[140px]"
        />

        {/* vertical architecture */}
        <div
          className="absolute left-[7%] top-0 h-full w-px bg-white/[0.07]"
        />

        <div
          className="absolute right-[7%] top-0 h-full w-px bg-white/[0.07]"
        />
      </div>

      <Container>
        {/* ==================================================== */}
        {/* HEADER                                              */}
        {/* ==================================================== */}

        <motion.div
          variants={shouldReduceMotion ? undefined : staggerContainer}
          initial={shouldReduceMotion ? undefined : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-16 lg:pb-14"
        >
          {/* index */}
          <motion.div variants={shouldReduceMotion ? undefined : fadeInUp}>
            <div className="flex items-center gap-3">
              <Sparkles className="h-3.5 w-3.5 text-gold-light" />

              <span
                className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-gold-light"
              >
                03 / Growth Engine
              </span>

              <span className="h-px w-10 bg-gold-light/30" />
            </div>

            <p
              className="mt-4 max-w-sm text-sm leading-6 text-white/45"
            >
              Marketing becomes more valuable when every stage learns from the
              stage before it.
            </p>
          </motion.div>

          {/* heading */}
          <motion.div
            variants={shouldReduceMotion ? undefined : fadeInUp}
            className="min-w-0"
          >
            <h2
              className="max-w-4xl text-3xl font-semibold leading-[1.04] tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl xl:text-[58px]"
            >
              A growth engine built
              <span className="block text-gold-light">
                to learn as it moves.
              </span>
            </h2>

            <p
              className="mt-5 max-w-2xl text-sm leading-7 text-white/50 sm:text-base sm:leading-8"
            >
              Instead of running disconnected marketing activities, Blackcrest
              builds a continuous system where research informs acquisition,
              acquisition informs conversion, and performance data guides the
              next decision.
            </p>
          </motion.div>
        </motion.div>

        {/* ==================================================== */}
        {/* DESKTOP ENGINE                                      */}
        {/* ==================================================== */}

        <div
          className="relative mt-14 hidden min-w-0 lg:block xl:mt-16"
        >
          {/* top technical row */}
          <div
            className="mb-5 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-light" />

              <span
                className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-white/40"
              >
                Integrated marketing sequence
              </span>
            </div>

            <span
              className="font-mono text-[7px] uppercase tracking-[0.15em] text-white/25"
            >
              System / Continuous
            </span>
          </div>

          {/* ================================================== */}
          {/* SIGNAL LINE                                       */}
          {/* ================================================== */}

          <div
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-[146px] h-px bg-white/10"
          />

          {!shouldReduceMotion && (
            <motion.div
              aria-hidden="true"
              className="absolute left-[10%] top-[145px] h-[2px] bg-gradient-to-r from-transparent via-gold-light to-transparent shadow-[0_0_18px_rgba(232,207,143,0.38)]"
              initial={{
                width: "0%",
              }}
              whileInView={{
                width: "80%",
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1.8,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          )}

          {/* ================================================== */}
          {/* STEPS                                             */}
          {/* ================================================== */}

          <div
            className="relative z-10 grid min-w-0 grid-cols-5 border-x border-white/10"
          >
            {growthSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.phase}
                  initial={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: 0,
                          y: 30,
                        }
                  }
                  whileInView={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: 1,
                          y: 0,
                        }
                  }
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative min-w-0 border-r border-white/10 px-4 pb-6 pt-5 last:border-r-0 xl:px-5"
                >
                  {/* number */}
                  <div
                    className="flex items-center justify-between gap-3"
                  >
                    <span
                      className="font-mono text-[8px] font-semibold tracking-[0.15em] text-gold-light"
                    >
                      {step.number}
                    </span>

                    <span
                      className="font-mono text-[7px] uppercase tracking-[0.13em] text-white/20"
                    >
                      Phase
                    </span>
                  </div>

                  {/* node */}
                  <div
                    className="relative mt-7 flex h-12 w-12 items-center justify-center border border-gold-light/25 bg-navy-deep/70 text-gold-light backdrop-blur transition-all duration-300 group-hover:border-gold-light/45 group-hover:bg-navy-deep/90"
                  >
                    <Icon className="h-4 w-4" />

                    <span
                      aria-hidden="true"
                      className="absolute -bottom-[29px] left-1/2 h-[29px] w-px -translate-x-1/2 bg-gold-light/35"
                    />

                    <span
                      aria-hidden="true"
                      className="absolute -bottom-[34px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full border border-gold-light/50 bg-primary"
                    />
                  </div>

                  {/* content */}
                  <div className="mt-14">
                    <span
                      className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-gold-light"
                    >
                      {step.phase}
                    </span>

                    <h3
                      className="mt-3 text-base font-semibold leading-6 tracking-[-0.02em] text-white xl:text-lg"
                    >
                      {step.title}
                    </h3>

                    <p
                      className="mt-3 text-xs leading-6 text-white/42"
                    >
                      {step.description}
                    </p>
                  </div>

                  {/* meta */}
                  <div
                    className="mt-6 border-t border-white/10 pt-3"
                  >
                    <span
                      className="font-mono text-[7px] font-semibold uppercase leading-4 tracking-[0.12em] text-white/28"
                    >
                      {step.meta}
                    </span>
                  </div>

                  {/* hover bottom line */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold-light transition-all duration-500 group-hover:w-full"
                  />
                </motion.article>
              );
            })}
          </div>

          {/* continuation marker */}
          <div
            className="mt-5 flex items-center justify-end gap-3"
          >
            <span
              className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-white/30"
            >
              Learn → Improve → Repeat
            </span>

            <ArrowRight className="h-3.5 w-3.5 text-gold-light" />

            <span
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gold-light/20"
            >
              <motion.span
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.35, 1],
                        opacity: [1, 0.45, 1],
                      }
                }
                transition={
                  shouldReduceMotion
                    ? undefined
                    : {
                        duration: 2.2,
                        repeat: Infinity,
                      }
                }
                className="h-1.5 w-1.5 rounded-full bg-gold-light"
              />
            </span>
          </div>
        </div>

        {/* ==================================================== */}
        {/* MOBILE / TABLET ENGINE                              */}
        {/* ==================================================== */}

        <div
          className="relative mt-12 lg:hidden"
        >
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-[23px] top-8 w-px bg-white/10"
          />

          <motion.div
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    scaleY: 0,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    scaleY: 1,
                  }
            }
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              transformOrigin: "top",
            }}
            aria-hidden="true"
            className="absolute bottom-8 left-[23px] top-8 w-px bg-gradient-to-b from-gold-light via-gold-light/45 to-transparent"
          />

          <div className="space-y-0">
            {growthSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.phase}
                  initial={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: 0,
                          x: 20,
                        }
                  }
                  whileInView={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: 1,
                          x: 0,
                        }
                  }
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.06,
                  }}
                  className="relative grid grid-cols-[48px_minmax(0,1fr)] gap-4 border-b border-white/10 py-6 last:border-b-0"
                >
                  {/* node */}
                  <div className="relative z-10">
                    <div
                      className="flex h-12 w-12 items-center justify-center border border-gold-light/25 bg-primary text-gold-light"
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* content */}
                  <div className="min-w-0">
                    <div
                      className="flex flex-wrap items-center justify-between gap-3"
                    >
                      <span
                        className="font-mono text-[8px] font-semibold uppercase tracking-[0.18em] text-gold-light"
                      >
                        {step.phase}
                      </span>

                      <span
                        className="font-mono text-[7px] font-semibold text-white/25"
                      >
                        {step.number}
                      </span>
                    </div>

                    <h3
                      className="mt-2 text-lg font-semibold tracking-[-0.025em] text-white"
                    >
                      {step.title}
                    </h3>

                    <p
                      className="mt-3 text-sm leading-6 text-white/45"
                    >
                      {step.description}
                    </p>

                    <div
                      className="mt-4 flex items-center gap-3"
                    >
                      <span className="h-px w-6 bg-gold-light/30" />

                      <span
                        className="font-mono text-[7px] font-semibold uppercase tracking-[0.11em] text-white/30"
                      >
                        {step.meta}
                      </span>
                    </div>
                  </div>

                  {index < growthSteps.length - 1 && (
                    <ArrowDown
                      aria-hidden="true"
                      className="absolute -bottom-2.5 left-[18px] z-20 h-3 w-3 text-gold-light"
                    />
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* ==================================================== */}
        {/* SYSTEM OUTPUT                                       */}
        {/* ==================================================== */}

        <div
          className="mt-12 grid border-y border-white/10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center lg:mt-16"
        >
          <div
            className="px-4 py-5 sm:px-5 lg:px-6"
          >
            <span
              className="font-mono text-[7px] font-semibold uppercase tracking-[0.17em] text-gold-light"
            >
              The objective
            </span>

            <p
              className="mt-2 max-w-2xl text-sm leading-6 text-white/50"
            >
              Build a marketing system that gets smarter over time — not a
              collection of campaigns competing for attention.
            </p>
          </div>

          <div
            className="flex items-center gap-3 border-t border-white/10 px-4 py-4 sm:border-l sm:border-t-0 sm:px-5 lg:px-6"
          >
            <span
              className="relative flex h-2 w-2"
            >
              {!shouldReduceMotion && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-gold-light"
                  animate={{
                    scale: [1, 2.4, 1],
                    opacity: [0.7, 0, 0.7],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                  }}
                />
              )}

              <span
                className="relative h-2 w-2 rounded-full bg-gold-light"
              />
            </span>

            <span
              className="whitespace-nowrap font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-white/40"
            >
              Continuous optimization
            </span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
