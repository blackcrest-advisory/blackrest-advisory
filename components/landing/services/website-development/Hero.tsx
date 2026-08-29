"use client";

//===== imports =====//
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Braces,
  Check,
  Code2,
  Cpu,
  Database,
  Gauge,
  Layers3,
  Network,
  Server,
  Sparkles,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

//==============================================================//
// CONTENT
//==============================================================//

const technologies = [
  "Strategy",
  "Experience",
  "Engineering",
  "Performance",
  "Support",
];

const architectureNodes = [
  {
    number: "01",
    title: "Experience",
    subtitle: "Interface & UX",
    icon: Layers3,
  },
  {
    number: "02",
    title: "Application",
    subtitle: "Next.js / React",
    icon: Code2,
  },
  {
    number: "03",
    title: "Services",
    subtitle: "APIs & Logic",
    icon: Server,
  },
  {
    number: "04",
    title: "Data",
    subtitle: "Storage & Systems",
    icon: Database,
  },
];

//==============================================================//
// WEBSITE DEVELOPMENT HERO
//==============================================================//

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section className="relative isolate overflow-hidden bg-navy-deep py-0 text-white">
      {/*===== BLUEPRINT BACKGROUND =====*/}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30"
      >
        {/* technical grid */}
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:64px_64px]"/>

        {/* micro grid */}
        <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(rgba(255,255,255,0.65)_0.75px,transparent_0.75px)] [background-size:16px_16px]"/>

        {/* gold ambient field */}
        <div className="absolute -left-32 top-[12%] h-[420px] w-[420px] rounded-full bg-gold-light/[0.08] blur-[150px]"/>

        {/* lower blue ambience */}
        <div className="absolute -right-40 bottom-[-80px] h-[500px] w-[500px] rounded-full bg-white/[0.035] blur-[160px]"/>

        {/* architecture guides */}
        <div className="absolute left-[7%] top-0 h-full w-px bg-white/[0.06]"/>

        <div className="absolute right-[7%] top-0 h-full w-px bg-white/[0.06]"/>

        <div className="absolute left-0 right-0 top-[72%] h-px bg-white/[0.055]"/>
      </div>

      <Container>
        {/*===== TOP SYSTEM BAR =====*/}

        <div className="flex flex-col gap-3 border-x border-b border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              {!shouldReduceMotion && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-gold-light"
                  animate={{
                    scale: [1, 2.4, 1],
                    opacity: [0.8, 0, 0.8],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                  }}
                />
              )}

              <span className="relative h-2 w-2 rounded-full bg-gold-light"/>
            </span>

            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-light">
              Website development
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-white/55">
              Blackcrest / Digital platforms
            </span>

            <span className="hidden font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-gold-light sm:block">
              Web / 01
            </span>
          </div>
        </div>

        {/*===== HERO =====*/}

        <div className="grid min-w-0 border-x border-white/10 lg:min-h-[720px] lg:grid-cols-[minmax(0,0.92fr)_minmax(500px,1.08fr)]">
          {/*===== LEFT CONTENT =====*/}

          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial={shouldReduceMotion ? undefined : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            className="relative flex min-w-0 flex-col justify-center border-b border-white/10 px-5 py-14 sm:px-7 sm:py-16 lg:border-b-0 lg:border-r lg:px-8 lg:py-20 xl:px-10"
          >
            {/* eyebrow */}
            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="flex h-8 w-8 items-center justify-center border border-gold-light/20 bg-gold-light/[0.05] text-gold-light">
                <Braces className="h-3.5 w-3.5" />
              </div>

              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-light">
                From first page to platform
              </span>

              <span className="h-px w-10 bg-gold-light/35"/>

              <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-white/55">
                Clear digital foundations
              </span>
            </motion.div>

            {/*===== HEADLINE =====*/}

            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="mt-8"
            >
              <h1 className="max-w-[720px] text-[clamp(2.6rem,4.7vw,4.75rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-white">
                Websites built
                <span className="block text-gold-light">
                  around your next step.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/50 sm:text-base sm:leading-8">
                Blackcrest helps businesses create clear websites and web
                platforms that communicate what matters, support real customer
                journeys, and give the business room to move forward.
              </p>
            </motion.div>

            {/*===== CTA =====*/}

            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                href="/start-project"
                size="md"
                className="group w-full !rounded-md sm:w-auto"
              >
                Start a web project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"/>
              </Button>

              <Button
                variant="outline"
                size="md"
                href="/contact"
                className="w-full !rounded-md border-white/20 text-white hover:bg-white/5 sm:w-auto"
              >
                Talk through your idea
              </Button>
            </motion.div>

            {/*===== ENGINEERING PRINCIPLES =====*/}

            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="mt-9 grid grid-cols-2 border-y border-white/10"
            >
              <div className="border-r border-white/10 py-4 pr-4">
                <div className="flex items-center gap-2">
                  <Code2 className="h-3.5 w-3.5 text-gold-light" />

                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-white/60">
                    Experience
                  </span>
                </div>

                <p className="mt-2 text-xs font-medium text-white/75">
                  Clear customer journeys
                </p>
              </div>

              <div className="py-4 pl-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-3.5 w-3.5 text-gold-light" />

                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-white/60">
                    Delivery
                  </span>
                </div>

                <p className="mt-2 text-xs font-medium text-white/75">
                  Reliable digital foundations
                </p>
              </div>
            </motion.div>

            {/*===== TECHNOLOGY RAIL =====*/}

            <motion.div
              variants={shouldReduceMotion ? undefined : fadeInUp}
              className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3"
            >
              {technologies.map((technology, index) => (
                <div
                  key={technology}
                  className="flex items-center gap-3"
                >
                  {index > 0 && (
                    <span className="hidden h-3 w-px bg-white/10 sm:block"/>
                  )}

                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/55">
                    {technology}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/*===== RIGHT / LIVE ARCHITECTURE =====*/}

          <motion.div
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    x: 35,
                  }
            }
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    x: 0,
                  }
            }
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative min-h-[620px] overflow-hidden px-4 py-8 sm:px-6 sm:py-10 lg:min-h-0 lg:px-8 lg:py-12"
          >
            {/*===== VISUAL AMBIENCE =====*/}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-light/[0.07] blur-[120px]"
            />

            {/*===== SYSTEM FRAME =====*/}

            <div className="relative mx-auto flex h-full min-h-[540px] w-full max-w-[650px] flex-col border border-white/10 bg-white/[0.018]">
              {/*===== ANIMATED BORDER BEAM =====*/}

              {!shouldReduceMotion && (
                <>
                  <motion.span
                    aria-hidden="true"
                    className="absolute left-0 top-0 z-20 h-px w-28 bg-gradient-to-r from-transparent via-gold-light to-transparent shadow-[0_0_16px_rgba(232,207,143,0.4)]"
                    animate={{
                      x: ["-100%", "600%"],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 1,
                    }}
                  />

                  <motion.span
                    aria-hidden="true"
                    className="absolute bottom-0 right-0 z-20 h-px w-28 bg-gradient-to-r from-transparent via-gold-light to-transparent shadow-[0_0_16px_rgba(232,207,143,0.4)]"
                    animate={{
                      x: ["100%", "-600%"],
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 0.5,
                    }}
                  />
                </>
              )}

              {/*===== FRAME HEADER =====*/}

              <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
                <div className="flex items-center gap-3">
                  <Cpu className="h-3.5 w-3.5 text-gold-light" />

                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white/65">
                    Architecture Runtime
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-success"/>

                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/55">
                    Live
                  </span>
                </div>
              </div>

              {/*===== ARCHITECTURE CANVAS =====*/}

              <div className="relative flex-1 overflow-hidden px-4 py-8 sm:px-6">
                {/* canvas grid */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:40px_40px]"
                />

                {/*===== NETWORK SVG =====*/}

                <svg
                  aria-hidden="true"
                  viewBox="0 0 600 430"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                >
                  {/* static architecture */}
                  <path
                    d="
                      M300 65
                      L300 130
                      M300 185
                      L300 245
                      M300 300
                      L300 365
                    "
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-white/15"
                  />

                  <path
                    d="
                      M300 158
                      L105 158
                      M300 158
                      L495 158
                    "
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-white/10"
                  />

                  <path
                    d="
                      M300 275
                      L120 275
                      M300 275
                      L480 275
                    "
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-white/10"
                  />

                  {/* animated primary signal */}
                  <motion.path
                    d="
                      M300 65
                      L300 365
                    "
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-gold-light"
                    initial={
                      shouldReduceMotion
                        ? undefined
                        : {
                            pathLength: 0,
                            opacity: 0,
                          }
                    }
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            pathLength: 1,
                            opacity: [0.35, 1, 0.35],
                          }
                    }
                    transition={{
                      pathLength: {
                        duration: 1.5,
                        delay: 0.5,
                      },
                      opacity: {
                        duration: 2.8,
                        repeat: Infinity,
                      },
                    }}
                  />

                  {/* moving signal */}
                  {!shouldReduceMotion && (
                    <motion.circle
                      r="4"
                      fill="currentColor"
                      className="text-gold-light"
                      initial={{
                        cx: 300,
                        cy: 65,
                      }}
                      animate={{
                        cy: [65, 365, 65],
                      }}
                      transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </svg>

                {/*===== NODES =====*/}

                <div className="relative z-10 mx-auto flex h-full max-w-[430px] flex-col justify-between py-2">
                  {architectureNodes.map((node, index) => {
                    const Icon = node.icon;

                    return (
                      <motion.div
                        key={node.title}
                        initial={
                          shouldReduceMotion
                            ? undefined
                            : {
                                opacity: 0,
                                scale: 0.92,
                                y: 12,
                              }
                        }
                        animate={
                          shouldReduceMotion
                            ? undefined
                            : {
                                opacity: 1,
                                scale: 1,
                                y: 0,
                              }
                        }
                        transition={{
                          duration: 0.55,
                          delay: 0.45 + index * 0.18,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative mx-auto w-full max-w-[320px]"
                      >
                        <div className="group relative flex items-center gap-4 border border-white/15 bg-navy-deep/85 px-4 py-3.5 backdrop-blur-md transition-all duration-300 hover:border-gold-light/35 hover:bg-navy-deep">
                          {/* number */}
                          <span className="font-mono text-[9px] font-semibold text-gold-light/75">
                            {node.number}
                          </span>

                          {/* icon */}
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-gold-light/20 bg-gold-light/[0.04] text-gold-light">
                            <Icon className="h-3.5 w-3.5" />
                          </div>

                          {/* copy */}
                          <div className="min-w-0 flex-1">
                            <span className="block text-xs font-semibold text-white">
                              {node.title}
                            </span>

                            <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.11em] text-white/55">
                              {node.subtitle}
                            </span>
                          </div>

                          {/* status */}
                          <div className="flex items-center gap-1.5">
                            <Check className="h-3 w-3 text-success" />

                            <span className="hidden font-mono text-[8px] font-semibold uppercase tracking-[0.1em] text-white/45 sm:block">
                              Ready
                            </span>
                          </div>

                          {/* active bottom signal */}
                          <span
                            aria-hidden="true"
                            className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold-light transition-all duration-500 group-hover:w-full"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/*===== SIDE SIGNALS =====*/}

                <motion.div
                  initial={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: 0,
                          x: -12,
                        }
                  }
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: 1,
                          x: 0,
                        }
                  }
                  transition={{
                    delay: 1.1,
                  }}
                  className="absolute left-4 top-[31%] hidden items-center gap-2 xl:flex"
                >
                  <Network className="h-3 w-3 text-gold-light/60" />

                  <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-white/45">
                    Request
                  </span>
                </motion.div>

                <motion.div
                  initial={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: 0,
                          x: 12,
                        }
                  }
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: 1,
                          x: 0,
                        }
                  }
                  transition={{
                    delay: 1.25,
                  }}
                  className="absolute right-4 top-[58%] hidden items-center gap-2 xl:flex"
                >
                  <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-white/45">
                    Response
                  </span>

                  <Activity className="h-3 w-3 text-gold-light/60" />
                </motion.div>
              </div>

              {/*===== PERFORMANCE FOOTER =====*/}

              <div className="grid grid-cols-3 border-t border-white/10">
                <SystemMetric
                  icon={Gauge}
                  label="Performance"
                  value="Optimised"
                />

                <SystemMetric
                  icon={Network}
                  label="Architecture"
                  value="Scalable"
                />

                <SystemMetric
                  icon={Sparkles}
                  label="Experience"
                  value="Refined"
                />
              </div>
            </div>

            {/*===== FRAME DETAILS =====*/}

            <span
              aria-hidden="true"
              className="absolute left-1 top-1 h-5 w-5 border-l border-t border-gold-light/35"
            />

            <span
              aria-hidden="true"
              className="absolute bottom-1 right-1 h-5 w-5 border-b border-r border-gold-light/35"
            />
          </motion.div>
        </div>

        {/*===== BOTTOM ENGINEERING RAIL =====*/}

        <div className="grid border-x border-t border-white/10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
            <Code2 className="h-3.5 w-3.5 text-gold-light" />

            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-white/55">
              Strategy → UX → Engineering → Performance
            </span>
          </div>

          <div className="flex items-center gap-3 border-t border-white/10 px-4 py-4 sm:border-l sm:border-t-0 sm:px-6">
            <span className="h-1.5 w-1.5 rounded-full bg-success"/>

            <span className="whitespace-nowrap font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white/50">
              Engineered for growth
            </span>
          </div>
        </div>
      </Container>

      {/*===== MOVING SCAN LINE =====*/}

      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 top-0 z-20 w-px bg-gradient-to-b from-transparent via-gold-light/35 to-transparent"
          initial={{
            left: "-2%",
            opacity: 0,
          }}
          animate={{
            left: "102%",
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2,
          }}
        />
      )}
    </Section>
  );
};

export default Hero;

//==============================================================//
// SYSTEM METRIC
//==============================================================//

function SystemMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Gauge;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 border-r border-white/10 px-3 py-3.5 last:border-r-0 sm:px-4">
      <div className="flex items-center gap-2">
        <Icon className="h-3 w-3 shrink-0 text-gold-light" />

        <span className="truncate font-mono text-[8px] font-semibold uppercase tracking-[0.11em] text-white/45">
          {label}
        </span>
      </div>

      <span className="mt-2 block truncate text-[10px] font-medium text-white/65">
        {value}
      </span>
    </div>
  );
}
