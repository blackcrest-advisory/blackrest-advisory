"use client";

//===== imports =====//
import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  CircleDot,
  Code2,
  Cpu,
  Database,
  FilePenLine,
  Gauge,
  LockKeyhole,
  Search,
  Server,
  Sparkles,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

//==============================================================//
// SYSTEM NODES
//==============================================================//

const nodes = [
  {
    number: "01",
    label: "Frontend",
    description: "UI, interactions & user experience",
    icon: Code2,
    position: "left-[6%] top-[18%] lg:left-[4%]",
  },
  {
    number: "02",
    label: "Backend",
    description: "Business logic, APIs & processing",
    icon: Server,
    position: "right-[6%] top-[18%] lg:right-[4%]",
  },
  {
    number: "03",
    label: "Database",
    description: "Structured storage & retrieval",
    icon: Database,
    position: "right-[1%] top-[48%] lg:right-0",
  },
  {
    number: "04",
    label: "Security",
    description: "Authentication & protection",
    icon: LockKeyhole,
    position: "left-[1%] top-[48%] lg:left-0",
  },
  {
    number: "05",
    label: "Analytics",
    description: "Behavior, insights & reporting",
    icon: BarChart3,
    position: "right-[9%] bottom-[11%] lg:right-[5%]",
  },
  {
    number: "06",
    label: "CMS",
    description: "Flexible content management",
    icon: FilePenLine,
    position: "left-[9%] bottom-[11%] lg:left-[5%]",
  },
  {
    number: "07",
    label: "SEO",
    description: "Structure, discovery & visibility",
    icon: Search,
    position: "left-1/2 top-[2%] -translate-x-1/2",
  },
  {
    number: "08",
    label: "Performance",
    description: "Speed, reliability & Core Web Vitals",
    icon: Gauge,
    position: "bottom-[1%] left-1/2 -translate-x-1/2",
  },
];

//==============================================================//
// SYSTEM HEALTH
//==============================================================//

const systemHealth = [
  {
    label: "Security",
    value: "Protected",
    icon: LockKeyhole,
  },
  {
    label: "Performance",
    value: "Optimised",
    icon: Gauge,
  },
  {
    label: "SEO",
    value: "Structured",
    icon: Search,
  },
];

//==============================================================//
// REQUEST FLOW
//==============================================================//

const requestFlow = [
  "Visitor",
  "Interface",
  "Application",
  "API",
  "Data",
  "Response",
];

//==============================================================//
// WEBSITE ANATOMY
//==============================================================//

export default function WebsiteAnatomy() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section
      className="relative isolate overflow-hidden bg-background py-16 sm:py-20 lg:py-28"
    >
      {/* ====================================================== */}
      {/* BACKGROUND                                            */}
      {/* ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
      >
        {/* blueprint grid */}
        <div
          className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
        />

        {/* ambient gold glow */}
        <div
          className="absolute left-[15%] top-[16%] h-[360px] w-[360px] rounded-full bg-secondary/[0.055] blur-[130px]"
        />

        {/* ambient navy glow */}
        <div
          className="absolute -right-40 bottom-[5%] h-[420px] w-[420px] rounded-full bg-primary/[0.04] blur-[150px]"
        />

        {/* architectural rails */}
        <div
          className="absolute left-[7%] top-0 h-full w-px bg-border/35"
        />

        <div
          className="absolute right-[7%] top-0 h-full w-px bg-border/35"
        />
      </div>

      <Container>
        {/* ==================================================== */}
        {/* SECTION INTRO                                       */}
        {/* ==================================================== */}

        <motion.div
          variants={shouldReduceMotion ? undefined : staggerContainer}
          initial={shouldReduceMotion ? undefined : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-16 lg:pb-14"
        >
          {/* left intro */}
          <motion.div variants={shouldReduceMotion ? undefined : fadeInUp}>
            <div
              className="flex items-center gap-3"
            >
              <Cpu className="h-3.5 w-3.5 text-secondary" />

              <span
                className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-secondary"
              >
                02 / Website Anatomy
              </span>

              <span className="h-px w-10 bg-secondary/35" />
            </div>

            <p
              className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground"
            >
              Modern websites are not isolated pages. They are interconnected
              systems where every technical layer supports the experience above
              it.
            </p>
          </motion.div>

          {/* headline */}
          <motion.div variants={shouldReduceMotion ? undefined : fadeInUp}>
            <h2
              className="max-w-4xl text-3xl font-semibold leading-[1.04] tracking-[-0.045em] text-heading sm:text-4xl lg:text-5xl xl:text-[58px]"
            >
              A website is not a page.
              <span className="block text-secondary">It&apos;s a system.</span>
            </h2>

            <p
              className="mt-5 max-w-2xl text-sm leading-7 text-body sm:text-base sm:leading-8"
            >
              Every experience your customer sees is supported by interconnected
              layers of interface design, application logic, infrastructure,
              security, content, data, and performance engineering.
            </p>
          </motion.div>
        </motion.div>

        {/* ==================================================== */}
        {/* ARCHITECTURE BOARD                                  */}
        {/* ==================================================== */}

        <div
          className="mt-10 grid min-w-0 gap-6 lg:mt-14 xl:grid-cols-[minmax(0,1fr)_290px]"
        >
          {/* ================================================== */}
          {/* SYSTEM MAP                                        */}
          {/* ================================================== */}

          <motion.div
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative min-w-0 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]"
          >
            {/* ================================================ */}
            {/* MAP HEADER                                      */}
            {/* ================================================ */}

            <div
              className="flex flex-col gap-3 border-b border-border bg-muted/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <div
                className="flex items-center gap-3"
              >
                <span
                  className="relative flex h-2 w-2"
                >
                  {!shouldReduceMotion && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-secondary"
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
                    className="relative h-2 w-2 rounded-full bg-secondary"
                  />
                </span>

                <span
                  className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/45"
                >
                  Architecture topology
                </span>
              </div>

              <span
                className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-secondary"
              >
                System / Connected
              </span>
            </div>

            {/* ================================================ */}
            {/* DESKTOP NETWORK                                 */}
            {/* ================================================ */}

            <div
              className="relative hidden min-h-[720px] overflow-hidden md:block"
            >
              {/* blueprint surface */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.22] [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] [background-size:44px_44px]"
              />

              {/* radial focus */}
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/[0.045] blur-[110px]"
              />

              {/* ============================================== */}
              {/* CONNECTION LINES                              */}
              {/* ============================================== */}

              <svg
                aria-hidden="true"
                viewBox="0 0 1000 720"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                {/* static connections */}
                {[
                  "M500 360 L190 170",
                  "M500 360 L810 170",
                  "M500 360 L900 360",
                  "M500 360 L100 360",
                  "M500 360 L810 575",
                  "M500 360 L190 575",
                  "M500 360 L500 75",
                  "M500 360 L500 650",
                ].map((path, index) => (
                  <path
                    key={index}
                    d={path}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-border"
                  />
                ))}

                {/* animated connection reveals */}
                {[
                  "M500 360 L190 170",
                  "M500 360 L810 170",
                  "M500 360 L900 360",
                  "M500 360 L100 360",
                  "M500 360 L810 575",
                  "M500 360 L190 575",
                  "M500 360 L500 75",
                  "M500 360 L500 650",
                ].map((path, index) => (
                  <motion.path
                    key={`active-${index}`}
                    d={path}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    className="text-secondary/50"
                    initial={
                      shouldReduceMotion
                        ? undefined
                        : {
                            pathLength: 0,
                            opacity: 0,
                          }
                    }
                    whileInView={
                      shouldReduceMotion
                        ? undefined
                        : {
                            pathLength: 1,
                            opacity: 1,
                          }
                    }
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.9,
                      delay: 0.2 + index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                ))}

                {/* data packets */}
                {!shouldReduceMotion && (
                  <>
                    <motion.circle
                      r="4"
                      fill="currentColor"
                      className="text-secondary"
                      initial={{
                        cx: 500,
                        cy: 360,
                      }}
                      animate={{
                        cx: [500, 190, 500],
                        cy: [360, 170, 360],
                      }}
                      transition={{
                        duration: 4.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    <motion.circle
                      r="4"
                      fill="currentColor"
                      className="text-secondary"
                      initial={{
                        cx: 500,
                        cy: 360,
                      }}
                      animate={{
                        cx: [500, 810, 500],
                        cy: [360, 575, 360],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.7,
                      }}
                    />

                    <motion.circle
                      r="3.5"
                      fill="currentColor"
                      className="text-secondary"
                      initial={{
                        cx: 500,
                        cy: 360,
                      }}
                      animate={{
                        cx: [500, 900, 500],
                      }}
                      transition={{
                        duration: 4.6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.1,
                      }}
                    />
                  </>
                )}
              </svg>

              {/* ============================================== */}
              {/* CORE NODE                                     */}
              {/* ============================================== */}

              <motion.div
                initial={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        scale: 0.86,
                      }
                }
                whileInView={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        scale: 1,
                      }
                }
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
              >
                <div
                  className="relative flex h-44 w-44 flex-col items-center justify-center rounded-full border border-secondary/30 bg-background/90 text-center shadow-[0_0_70px_rgba(166,124,39,0.1)] backdrop-blur-xl"
                >
                  {!shouldReduceMotion && (
                    <motion.div
                      aria-hidden="true"
                      className="absolute -inset-4 rounded-full border border-dashed border-secondary/15"
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 26,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}

                  <div
                    className="flex h-10 w-10 items-center justify-center border border-secondary/20 bg-secondary/[0.05] text-secondary"
                  >
                    <Cpu className="h-4 w-4" />
                  </div>

                  <span
                    className="mt-3 font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-secondary"
                  >
                    Blackcrest
                  </span>

                  <h3
                    className="mt-1 text-sm font-semibold text-heading"
                  >
                    Core System
                  </h3>

                  <span
                    className="mt-2 font-mono text-[6px] uppercase tracking-[0.13em] text-muted-foreground/35"
                  >
                    Connected Architecture
                  </span>
                </div>
              </motion.div>

              {/* ============================================== */}
              {/* SYSTEM NODES                                  */}
              {/* ============================================== */}

              {nodes.map((node, index) => {
                const Icon = node.icon;

                return (
                  <motion.article
                    key={node.label}
                    initial={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: 0,
                            scale: 0.92,
                            y: 12,
                          }
                    }
                    whileInView={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: 1,
                            scale: 1,
                            y: 0,
                          }
                    }
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.55,
                      delay: 0.45 + index * 0.08,
                    }}
                    className={`
                      group
                      absolute
                      z-20
                      w-[190px]
                      ${node.position}
                    `}
                  >
                    <div
                      className="relative overflow-hidden border border-border bg-card/95 px-4 py-3.5 shadow-[var(--shadow-card)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-secondary/30"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-0 h-[2px] w-0 bg-secondary transition-all duration-500 group-hover:w-full"
                      />

                      <div
                        className="flex items-start justify-between gap-3"
                      >
                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center border border-secondary/15 bg-secondary/[0.045] text-secondary"
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </div>

                        <span
                          className="font-mono text-[7px] font-semibold text-secondary/45"
                        >
                          {node.number}
                        </span>
                      </div>

                      <h4
                        className="mt-3 text-xs font-semibold text-heading"
                      >
                        {node.label}
                      </h4>

                      <p
                        className="mt-1.5 text-[9px] leading-4 text-muted-foreground"
                      >
                        {node.description}
                      </p>
                    </div>
                  </motion.article>
                );
              })}

              {/* ============================================== */}
              {/* COORDINATE LABELS                             */}
              {/* ============================================== */}

              <span
                className="absolute bottom-4 left-5 font-mono text-[6px] uppercase tracking-[0.15em] text-muted-foreground/25"
              >
                X: 08 / Y: 24 / Architecture
              </span>

              <span
                className="absolute bottom-4 right-5 font-mono text-[6px] uppercase tracking-[0.15em] text-muted-foreground/25"
              >
                Topology / 08 Nodes
              </span>
            </div>

            {/* ================================================ */}
            {/* MOBILE / TABLET NODE SYSTEM                     */}
            {/* ================================================ */}

            <div
              className="grid md:hidden"
            >
              <div
                className="border-b border-border bg-secondary/[0.025] px-5 py-6 text-center"
              >
                <div
                  className="mx-auto flex h-10 w-10 items-center justify-center border border-secondary/20 bg-secondary/[0.05] text-secondary"
                >
                  <Cpu className="h-4 w-4" />
                </div>

                <span
                  className="mt-3 block font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-secondary"
                >
                  Core System
                </span>

                <p
                  className="mt-1 text-xs text-muted-foreground"
                >
                  Every layer works as one connected architecture.
                </p>
              </div>

              <div className="grid sm:grid-cols-2">
                {nodes.map((node, index) => {
                  const Icon = node.icon;

                  return (
                    <motion.div
                      key={node.label}
                      initial={
                        shouldReduceMotion
                          ? undefined
                          : {
                              opacity: 0,
                              y: 16,
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
                      }}
                      transition={{
                        delay: index * 0.05,
                      }}
                      className="min-w-0 border-b border-border px-5 py-5 sm:border-r sm:[&:nth-child(even)]:border-r-0"
                    >
                      <div
                        className="flex items-start gap-3"
                      >
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center border border-secondary/15 bg-secondary/[0.045] text-secondary"
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div
                            className="flex items-center justify-between gap-3"
                          >
                            <h4
                              className="text-sm font-semibold text-heading"
                            >
                              {node.label}
                            </h4>

                            <span
                              className="font-mono text-[7px] text-secondary/45"
                            >
                              {node.number}
                            </span>
                          </div>

                          <p
                            className="mt-1 text-xs leading-5 text-muted-foreground"
                          >
                            {node.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* ================================================== */}
          {/* SYSTEM READOUT                                    */}
          {/* ================================================== */}

          <motion.aside
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    x: 25,
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
              duration: 0.7,
              delay: 0.15,
            }}
            className="min-w-0 border border-border bg-primary text-white shadow-[var(--shadow-card)]"
          >
            {/* header */}
            <div
              className="border-b border-white/10 px-5 py-4"
            >
              <div
                className="flex items-center justify-between gap-3"
              >
                <div
                  className="flex items-center gap-2"
                >
                  <CircleDot className="h-3.5 w-3.5 text-gold-light" />

                  <span
                    className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-gold-light"
                  >
                    System Health
                  </span>
                </div>

                <span
                  className="h-1.5 w-1.5 rounded-full bg-success"
                />
              </div>

              <p
                className="mt-3 text-xs leading-5 text-white/40"
              >
                Engineering quality is built across every layer, not added at
                the end.
              </p>
            </div>

            {/* health rows */}
            <div>
              {systemHealth.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4"
                  >
                    <div
                      className="flex items-center gap-3"
                    >
                      <Icon className="h-3.5 w-3.5 text-gold-light" />

                      <span
                        className="text-xs font-medium text-white/70"
                      >
                        {item.label}
                      </span>
                    </div>

                    <span
                      className="font-mono text-[7px] font-semibold uppercase tracking-[0.12em] text-success"
                    >
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* engineering note */}
            <div
              className="px-5 py-5"
            >
              <Sparkles className="h-4 w-4 text-gold-light" />

              <h3
                className="mt-4 text-lg font-semibold tracking-[-0.02em] text-white"
              >
                Every layer affects the whole.
              </h3>

              <p
                className="mt-3 text-xs leading-6 text-white/42"
              >
                Strong frontend work depends on reliable services. Strong
                services depend on sound architecture. Performance, security,
                SEO, and maintainability must be considered throughout the
                system.
              </p>
            </div>

            {/* footer */}
            <div
              className="border-t border-white/10 bg-navy-deep/40 px-5 py-4"
            >
              <span
                className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-white/30"
              >
                Architecture / Reliability / Growth
              </span>
            </div>
          </motion.aside>
        </div>

        {/* ==================================================== */}
        {/* REQUEST LIFECYCLE                                   */}
        {/* ==================================================== */}

        <motion.div
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 24,
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
            duration: 0.7,
          }}
          className="mt-6 overflow-hidden border border-border bg-card"
        >
          {/* rail header */}
          <div
            className="flex flex-col gap-3 border-b border-border bg-muted/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
          >
            <div
              className="flex items-center gap-3"
            >
              <CircleDot className="h-3 w-3 text-secondary" />

              <span
                className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-secondary"
              >
                Request lifecycle
              </span>
            </div>

            <span
              className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/35"
            >
              Input → Processing → Output
            </span>
          </div>

          {/* flow */}
          <div
            className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
          >
            {requestFlow.map((item, index) => (
              <div
                key={item}
                className="relative min-w-0 border-b border-r border-border px-4 py-5 last:border-r-0 sm:px-5 lg:border-b-0"
              >
                <span
                  className="font-mono text-[7px] font-semibold text-secondary/45"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p
                  className="mt-2 text-xs font-semibold text-heading"
                >
                  {item}
                </p>

                {index < requestFlow.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute right-[-4px] top-1/2 z-10 hidden h-2 w-2 -translate-y-1/2 rotate-45 border-r border-t border-secondary/50 lg:block"
                  />
                )}
              </div>
            ))}

            {/* moving signal */}
            {!shouldReduceMotion && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 hidden h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent shadow-[0_0_16px_rgba(166,124,39,0.3)] lg:block"
                initial={{
                  left: "-12%",
                  width: "12%",
                }}
                animate={{
                  left: "100%",
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 0.8,
                }}
              />
            )}
          </div>
        </motion.div>

        {/* ==================================================== */}
        {/* SECTION FOOTER                                      */}
        {/* ==================================================== */}

        <div
          className="mt-8 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <span
            className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary"
          >
            Interface → Logic → Infrastructure → Performance
          </span>

          <span
            className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/30"
          >
            Blackcrest / Web Engineering
          </span>
        </div>
      </Container>
    </Section>
  );
}
