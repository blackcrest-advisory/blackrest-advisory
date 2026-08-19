"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Palette } from "lucide-react";
import {
  FiLayers,
  FiPenTool,
  FiMonitor,
  FiServer,
  FiEdit,
  FiTrendingUp,
  FiCheck,
} from "react-icons/fi";
import { GiFireworkRocket } from "react-icons/gi";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

const layersData = [
  {
    id: 1,
    label: "Foundation",
    description: "Strategy, sitemap & technical planning",
    icon: FiLayers,
  },
  {
    id: 2,
    label: "Wireframe",
    description: "User flow & interactive blueprint",
    icon: FiPenTool,
  },
  {
    id: 3,
    label: "Design System",
    description: "Visual identity & component library",
    icon: Palette,
  },
  {
    id: 4,
    label: "Frontend",
    description: "Pixel-perfect UI development",
    icon: FiMonitor,
  },
  {
    id: 5,
    label: "Backend",
    description: "APIs, databases & business logic",
    icon: FiServer,
  },
  {
    id: 6,
    label: "CMS",
    description: "Content management & dynamic pages",
    icon: FiEdit,
  },
  {
    id: 7,
    label: "Optimization",
    description: "Speed, SEO & performance tuning",
    icon: FiTrendingUp,
  },
  {
    id: 8,
    label: "Launch",
    description: "Deployment, testing & go-live",
    icon: GiFireworkRocket,
  },
];

export default function BuildLayers() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 72%", "end 58%"],
  });

  const gridY = useTransform(
    sectionProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-40, 80],
  );

  const glowY = useTransform(
    sectionProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-100, 160],
  );

  const markerY = useTransform(
    timelineProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "100%"],
  );

  return (
    <Section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-24 sm:py-28 lg:py-32"
    >
      {/* =========================================================
          ARCHITECTURAL BACKGROUND
      ========================================================= */}

      <motion.div
        aria-hidden
        style={{ y: gridY }}
        className="pointer-events-none absolute inset-x-0 -top-24 h-[120%] opacity-[0.45]"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, color-mix(in srgb, var(--color-secondary) 7%, transparent) 1px, transparent 1px),
              linear-gradient(to bottom, color-mix(in srgb, var(--color-secondary) 6%, transparent) 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 16%, black 82%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 16%, black 82%, transparent)",
          }}
        />
      </motion.div>

      {/* ambient gold light */}
      <motion.div
        aria-hidden
        style={{ y: glowY }}
        className="pointer-events-none absolute right-[-9rem] top-[15%] h-[30rem] w-[30rem] rounded-full bg-secondary/[0.07] blur-[120px]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute left-[-12rem] top-[54%] h-[28rem] w-[28rem] rounded-full bg-primary/[0.05] blur-[110px]"
      />

      {/* architectural side lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-6 top-0 hidden h-full w-px bg-border/40 xl:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 top-0 hidden h-full w-px bg-border/40 xl:block"
      />

      <Container className="relative max-w-6xl">
        {/* =========================================================
            SECTION HEADER
        ========================================================= */}

        <div className="relative mx-auto max-w-3xl text-center">
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.7,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-5 flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-secondary/60" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-secondary">
              Our Process
            </span>

            <span className="h-px w-8 bg-secondary/60" />
          </motion.div>

          <motion.h2
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 24,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.6,
            }}
            transition={{
              duration: 0.8,
              delay: 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-3xl font-semibold tracking-[-0.035em] text-heading sm:text-4xl lg:text-5xl"
          >
            Built with structure.
            <br />
            <span className="font-normal text-secondary">Layer by layer.</span>
          </motion.h2>

          <motion.p
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 20,
                  }
            }
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.6,
            }}
            transition={{
              duration: 0.7,
              delay: 0.12,
            }}
            className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            Every engagement moves through a deliberate sequence — from
            strategic foundations to launch-ready infrastructure.
          </motion.p>
        </div>

        {/* =========================================================
            TIMELINE
        ========================================================= */}

        <div
          ref={timelineRef}
          className="relative mx-auto mt-20 max-w-5xl sm:mt-24 lg:mt-28"
        >
          {/* inactive rail */}
          <div className="absolute bottom-0 left-[23px] top-0 w-px bg-border sm:left-1/2 sm:-translate-x-1/2" />

          {/* active rail */}
          <motion.div
            aria-hidden
            style={{
              scaleY: timelineProgress,
              transformOrigin: "top",
            }}
            className="absolute left-[23px] top-0 h-full w-px bg-gradient-to-b from-secondary via-secondary to-secondary/30 sm:left-1/2 sm:-translate-x-1/2"
          />

          {/* scroll marker */}
          {!shouldReduceMotion && (
            <motion.div
              aria-hidden
              style={{
                top: markerY,
              }}
              className="pointer-events-none absolute left-[23px] z-20 -translate-x-1/2 -translate-y-1/2 sm:left-1/2"
            >
              <div className="relative flex h-6 w-6 items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.65, 1],
                    opacity: [0.45, 0, 0.45],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 rounded-full border border-secondary/60"
                />

                <div className="h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_18px_rgba(166,124,39,0.6)]" />
              </div>
            </motion.div>
          )}

          <div className="relative flex flex-col gap-8 sm:gap-12 lg:gap-16">
            {layersData.map((layer, index) => {
              const isLeft = index % 2 === 0;
              const Icon = layer.icon;

              return (
                <motion.div
                  key={layer.id}
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: isLeft ? -56 : 56,
                          y: 24,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.45,
                    margin: "-8% 0px -8% 0px",
                  }}
                  transition={{
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`relative flex w-full ${
                    isLeft ? "sm:justify-start" : "sm:justify-end"
                  }`}
                >
                  {/* connector */}
                  <div className="absolute left-[23px] top-8 z-20 -translate-x-1/2 sm:left-1/2">
                    <motion.div
                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              scale: 0.6,
                              opacity: 0,
                            }
                      }
                      whileInView={{
                        scale: 1,
                        opacity: 1,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.8,
                      }}
                      transition={{
                        delay: 0.18,
                        duration: 0.45,
                      }}
                      className="relative flex h-5 w-5 items-center justify-center rounded-full border border-secondary/70 bg-background"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary" />

                      {!shouldReduceMotion && (
                        <motion.span
                          animate={{
                            scale: [1, 1.9],
                            opacity: [0.35, 0],
                          }}
                          transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            delay: index * 0.18,
                          }}
                          className="absolute inset-0 rounded-full border border-secondary/50"
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* horizontal connector line desktop */}
                  <motion.div
                    aria-hidden
                    initial={
                      shouldReduceMotion
                        ? false
                        : {
                            scaleX: 0,
                          }
                    }
                    whileInView={{
                      scaleX: 1,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.8,
                    }}
                    transition={{
                      duration: 0.55,
                      delay: 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      transformOrigin: isLeft ? "right" : "left",
                    }}
                    className={`absolute top-[39px] hidden h-px w-[54px] bg-gradient-to-r sm:block lg:w-[72px] ${
                      isLeft
                        ? "left-[calc(50%-72px)] from-transparent to-secondary/60"
                        : "left-1/2 from-secondary/60 to-transparent"
                    }`}
                  />

                  <div
                    className={`ml-14 w-[calc(100%-3.5rem)] sm:ml-0 sm:w-[calc(50%-54px)] lg:w-[calc(50%-72px)] ${
                      isLeft ? "sm:pr-5" : "sm:pl-5"
                    }`}
                  >
                    <motion.div
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : {
                              y: -4,
                            }
                      }
                      transition={{
                        duration: 0.25,
                      }}
                    >
                      <Card
                        padding="none"
                        className="group relative overflow-hidden rounded-md border-border/70 bg-card/85 shadow-[0_12px_45px_rgba(10,22,40,0.04)] backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-secondary/35 hover:shadow-[0_18px_60px_rgba(10,22,40,0.07)]"
                      >
                        {/* top architectural line */}
                        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-secondary/70 via-secondary/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        {/* side progress accent */}
                        <div
                          className={`absolute bottom-0 top-0 w-px bg-secondary/60 ${
                            isLeft ? "left-0" : "right-0"
                          }`}
                        />

                        <div className="relative p-5 sm:p-6">
                          <div className="flex items-start gap-4">
                            {/* icon */}
                            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center border border-secondary/20 bg-secondary/[0.07] text-secondary">
                              <Icon className="h-[20px] w-[20px]" />

                              <span className="absolute -bottom-px -right-px h-2 w-2 border-b border-r border-secondary/60" />
                              <span className="absolute -left-px -top-px h-2 w-2 border-l border-t border-secondary/60" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="mb-2 flex items-center justify-between gap-4">
                                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary">
                                  Phase {String(layer.id).padStart(2, "0")}
                                </span>

                                <motion.div
                                  initial={
                                    shouldReduceMotion
                                      ? false
                                      : {
                                          opacity: 0,
                                          scale: 0.8,
                                        }
                                  }
                                  whileInView={{
                                    opacity: 1,
                                    scale: 1,
                                  }}
                                  viewport={{
                                    once: true,
                                  }}
                                  transition={{
                                    delay: 0.35,
                                  }}
                                  className="flex h-5 w-5 items-center justify-center rounded-full border border-secondary/20 text-secondary"
                                >
                                  <FiCheck className="h-3 w-3" />
                                </motion.div>
                              </div>

                              <h3 className="text-lg font-semibold tracking-tight text-heading">
                                {layer.label}
                              </h3>

                              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                                {layer.description}
                              </p>
                            </div>
                          </div>

                          {/* technical footer */}
                          <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                            <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
                              Blackcrest Build Framework
                            </span>

                            <span className="font-mono text-[10px] text-secondary/70">
                              {String(layer.id).padStart(2, "0")}/
                              {String(layersData.length).padStart(2, "0")}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* final timeline termination */}
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.8,
                  }
            }
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.8,
            }}
            className="absolute -bottom-2 left-[23px] z-20 flex h-5 w-5 -translate-x-1/2 items-center justify-center border border-secondary/50 bg-background sm:left-1/2"
          >
            <div className="h-1.5 w-1.5 bg-secondary" />
          </motion.div>
        </div>

        {/* =========================================================
            BOTTOM STATEMENT
        ========================================================= */}

        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 32,
                }
          }
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.6,
          }}
          transition={{
            duration: 0.8,
          }}
          className="relative mx-auto mt-24 max-w-3xl border-y border-border/70 py-7"
        >
          <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-secondary">
                Structured Delivery
              </span>

              <p className="mt-1 text-sm font-medium text-heading sm:text-base">
                From first principles to production in eight deliberate phases.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-secondary/40" />

              <span className="font-mono text-xs text-muted-foreground">
                01 → 08
              </span>

              <span className="h-px w-8 bg-secondary/40" />
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
