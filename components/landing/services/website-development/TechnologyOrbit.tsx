"use client";

//===== imports =====//
import { motion, useReducedMotion } from "framer-motion";

import type { IconType } from "react-icons";

import {
  SiCloudinary,
  SiDocker,
  SiExpress,
  SiFramer,
  SiGithub,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

import {
  Activity,
  ArrowRight,
  Boxes,
  Braces,
  Check,
  CircleDot,
  Cloud,
  Code2,
  Cpu,
  Database,
  Gauge,
  GitBranch,
  Layers3,
  Network,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

//==============================================================//
// TYPES
//==============================================================//

interface Technology {
  label: string;
  icon: IconType;
}

interface StackLayer {
  id: string;
  index: string;
  title: string;
  description: string;
  icon: typeof Code2;
  technologies: Technology[];
}

//==============================================================//
// STACK DATA
//==============================================================//

const stackLayers: StackLayer[] = [
  {
    id: "experience",
    index: "01",
    title: "Experience Layer",
    description:
      "Interfaces engineered for clarity, speed and responsive interaction.",
    icon: Layers3,
    technologies: [
      {
        label: "Next.js",
        icon: SiNextdotjs,
      },
      {
        label: "React",
        icon: SiReact,
      },
      {
        label: "TypeScript",
        icon: SiTypescript,
      },
      {
        label: "Tailwind",
        icon: SiTailwindcss,
      },
      {
        label: "Framer Motion",
        icon: SiFramer,
      },
    ],
  },
  {
    id: "services",
    index: "02",
    title: "Application Layer",
    description:
      "Server-side systems, APIs and business logic built for maintainability.",
    icon: Server,
    technologies: [
      {
        label: "Node.js",
        icon: SiNodedotjs,
      },
      {
        label: "Express",
        icon: SiExpress,
      },
      {
        label: "Prisma",
        icon: SiPrisma,
      },
    ],
  },
  {
    id: "data",
    index: "03",
    title: "Data Layer",
    description:
      "Reliable persistence, structured access and high-performance data flows.",
    icon: Database,
    technologies: [
      {
        label: "PostgreSQL",
        icon: SiPostgresql,
      },
      {
        label: "MongoDB",
        icon: SiMongodb,
      },
      {
        label: "Redis",
        icon: SiRedis,
      },
    ],
  },
  {
    id: "infrastructure",
    index: "04",
    title: "Infrastructure Layer",
    description:
      "Deployment, media delivery and development infrastructure built to scale.",
    icon: Cloud,
    technologies: [
      {
        label: "Docker",
        icon: SiDocker,
      },
      {
        label: "Vercel",
        icon: SiVercel,
      },
      {
        label: "Cloudinary",
        icon: SiCloudinary,
      },
      {
        label: "GitHub",
        icon: SiGithub,
      },
    ],
  },
];

//==============================================================//
// ENGINEERING OUTPUTS
//==============================================================//

const outputs = [
  {
    label: "Performance",
    value: "Optimised",
    icon: Gauge,
  },
  {
    label: "Security",
    value: "Engineered",
    icon: ShieldCheck,
  },
  {
    label: "Architecture",
    value: "Scalable",
    icon: Network,
  },
  {
    label: "Delivery",
    value: "Production Ready",
    icon: GitBranch,
  },
];

//==============================================================//
// TECHNOLOGY RUNTIME
//==============================================================//

export default function TechnologyOrbit() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section className="relative isolate overflow-hidden bg-navy-deep py-16 text-white sm:py-20 lg:py-28">
      {/*===== ENVIRONMENT =====*/}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
      >
        {/* large technical grid */}
        <div className="absolute inset-0 opacity-[0.09] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:72px_72px]"/>

        {/* micro dot field */}
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(rgba(255,255,255,0.75)_0.7px,transparent_0.7px)] [background-size:15px_15px]"/>

        {/* gold energy field */}
        <div className="absolute left-[34%] top-[25%] h-[420px] w-[420px] rounded-full bg-gold-light/[0.075] blur-[150px]"/>

        <div className="absolute -right-40 bottom-[-80px] h-[480px] w-[480px] rounded-full bg-white/[0.03] blur-[160px]"/>

        {/* architectural rails */}
        <div className="absolute left-[7%] top-0 h-full w-px bg-white/[0.055]"/>

        <div className="absolute right-[7%] top-0 h-full w-px bg-white/[0.055]"/>
      </div>

      <Container>
        {/*===== SECTION BAR =====*/}

        <motion.div
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 18,
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
            amount: 0.4,
          }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <Cpu className="h-3.5 w-3.5 text-gold-light" />

            <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-gold-light">
              05 / Technology Runtime
            </span>

            <span className="h-px w-10 bg-gold-light/35" />
          </div>

          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              {!shouldReduceMotion && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-success"
                  animate={{
                    scale: [1, 2.3, 1],
                    opacity: [0.7, 0, 0.7],
                  }}
                  transition={{
                    duration: 2.3,
                    repeat: Infinity,
                  }}
                />
              )}

              <span className="relative h-2 w-2 rounded-full bg-success"/>
            </span>

            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-white/30">
              Runtime / Online
            </span>
          </div>
        </motion.div>

        {/*===== INTRO =====*/}

        <div className="grid gap-8 py-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-16 lg:py-14">
          <motion.div
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    x: -20,
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
              amount: 0.4,
            }}
            transition={{
              duration: 0.65,
            }}
          >
            <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.17em] text-gold-light">
              The engineering stack
            </span>

            <p className="mt-4 max-w-sm text-sm leading-7 text-white/42">
              Technology is selected around the product, not around trends.
              Every tool must earn its place in the architecture.
            </p>
          </motion.div>

          <motion.div
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 24,
                    filter: "blur(5px)",
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }
            }
            viewport={{
              once: true,
              amount: 0.35,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h2 className="max-w-4xl text-3xl font-semibold leading-[1.02] tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl xl:text-[58px]">
              Not a stack of tools.
              <span className="block text-gold-light">
                A working ecosystem.
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/45 sm:text-base sm:leading-8">
              Frontend, application logic, data, infrastructure and delivery
              operate as one engineering system — designed for speed,
              maintainability and long-term scalability.
            </p>
          </motion.div>
        </div>

        {/*===== RUNTIME BOARD =====*/}

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
            amount: 0.12,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative overflow-hidden border border-white/10 bg-white/[0.018]"
        >
          {/*===== BOARD HEADER =====*/}

          <div className="flex flex-col gap-3 border-b border-white/10 bg-white/[0.015] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-3">
              <Terminal className="h-3.5 w-3.5 text-gold-light" />

              <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-white/45">
                blackcrest://technology/runtime
              </span>
            </div>

            <div className="flex items-center gap-5">
              <span className="font-mono text-[7px] uppercase tracking-[0.13em] text-white/25">
                Layers 04
              </span>

              <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-success">
                Stable
              </span>
            </div>
          </div>

          {/*===== MAIN RUNTIME =====*/}

          <div className="grid min-w-0 xl:grid-cols-[minmax(0,1fr)_310px]">
            {/*===== STACK PIPELINE =====*/}

            <div className="relative min-w-0 border-b border-white/10 xl:border-b-0 xl:border-r">
              {/* internal grid */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:42px_42px]"
              />

              {/*===== CENTRAL SIGNAL SPINE =====*/}

              <div
                aria-hidden="true"
                className="absolute bottom-12 left-[34px] top-12 w-px bg-white/10 sm:left-[42px]"
              />

              {!shouldReduceMotion && (
                <motion.div
                  aria-hidden="true"
                  className="absolute left-[33px] top-12 h-28 w-[2px] bg-gradient-to-b from-transparent via-gold-light to-transparent shadow-[0_0_18px_rgba(232,207,143,0.32)] sm:left-[41px]"
                  animate={{
                    y: [0, 570, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}

              {/*===== STACK ROWS =====*/}

              <div className="relative z-10">
                {stackLayers.map((layer, layerIndex) => (
                  <StackRow
                    key={layer.id}
                    layer={layer}
                    layerIndex={layerIndex}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                ))}
              </div>
            </div>

            {/*===== RUNTIME MONITOR =====*/}

            <aside className="min-w-0">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-gold-light" />

                  <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-gold-light">
                    Runtime Monitor
                  </span>
                </div>

                <CircleDot className="h-3 w-3 text-success" />
              </div>

              {/*===== CORE =====*/}

              <div className="relative overflow-hidden border-b border-white/10 px-5 py-8 text-center">
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-light/[0.06] blur-[65px]"
                />

                <div className="relative mx-auto flex h-36 w-36 items-center justify-center">
                  {/* outer rotating ring */}
                  {!shouldReduceMotion && (
                    <motion.div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border border-dashed border-gold-light/18"
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 24,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}

                  {/* second ring */}
                  <motion.div
                    aria-hidden="true"
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: [1, 1.08, 1],
                            opacity: [0.25, 0.6, 0.25],
                          }
                    }
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                    }}
                    className="absolute inset-5 rounded-full border border-gold-light/20"
                  />

                  <div className="relative z-10 flex h-20 w-20 flex-col items-center justify-center border border-gold-light/25 bg-navy-deep shadow-[0_0_40px_rgba(232,207,143,0.1)]">
                    <Cpu className="h-5 w-5 text-gold-light" />

                    <span className="mt-2 font-mono text-[6px] font-semibold uppercase tracking-[0.14em] text-white/35">
                      Runtime
                    </span>
                  </div>
                </div>

                <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-gold-light">
                  Blackcrest Core
                </span>

                <p className="mx-auto mt-3 max-w-[220px] text-xs leading-5 text-white/38">
                  Technologies orchestrated around the needs of the product.
                </p>
              </div>

              {/*===== OUTPUTS =====*/}

              <div>
                {outputs.map((output, index) => {
                  const Icon = output.icon;

                  return (
                    <motion.div
                      key={output.label}
                      initial={
                        shouldReduceMotion
                          ? undefined
                          : {
                              opacity: 0,
                              x: 15,
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
                      }}
                      transition={{
                        delay: 0.15 + index * 0.08,
                      }}
                      className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-3.5 w-3.5 text-gold-light" />

                        <span className="text-xs font-medium text-white/58">
                          {output.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Check className="h-3 w-3 text-success" />

                        <span className="font-mono text-[6px] font-semibold uppercase tracking-[0.11em] text-success">
                          {output.value}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </aside>
          </div>

          {/*===== SYSTEM FOOTER =====*/}

          <div className="grid border-t border-white/10 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="flex items-center gap-3 px-5 py-4 sm:px-6">
              <Braces className="h-3.5 w-3.5 text-gold-light" />

              <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-white/32">
                Interface → Application → Data → Infrastructure
              </span>
            </div>

            <div className="flex items-center gap-3 border-t border-white/10 px-5 py-4 md:border-l md:border-t-0 sm:px-6">
              <Zap className="h-3.5 w-3.5 text-gold-light" />

              <span className="whitespace-nowrap font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-white/30">
                Built for production
              </span>
            </div>
          </div>
        </motion.div>

        {/*===== DELIVERY PIPELINE =====*/}

        <motion.div
          initial={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 20,
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
            amount: 0.4,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative mt-6 overflow-hidden border border-white/10"
        >
          <div className="flex flex-col gap-3 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-3">
              <GitBranch className="h-3.5 w-3.5 text-gold-light" />

              <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-gold-light">
                Delivery Pipeline
              </span>
            </div>

            <span className="font-mono text-[7px] uppercase tracking-[0.13em] text-white/25">
              Development → Production
            </span>
          </div>

          <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            <PipelineNode index="01" label="Design" icon={Layers3} />

            <PipelineNode index="02" label="Develop" icon={Code2} />

            <PipelineNode index="03" label="Validate" icon={ShieldCheck} />

            <PipelineNode index="04" label="Build" icon={Boxes} />

            <PipelineNode index="05" label="Deploy" icon={Cloud} />

            <PipelineNode index="06" label="Monitor" icon={Activity} isLast />

            {!shouldReduceMotion && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 hidden h-[2px] w-[12%] bg-gradient-to-r from-transparent via-gold-light to-transparent shadow-[0_0_14px_rgba(232,207,143,0.35)] lg:block"
                initial={{
                  left: "-12%",
                }}
                animate={{
                  left: "100%",
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 0.6,
                }}
              />
            )}
          </div>
        </motion.div>

        {/*===== CLOSING LINE =====*/}

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-gold-light">
            Technology follows architecture. Architecture follows the goal.
          </span>

          <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-white/22">
            Blackcrest / Engineering Stack
          </span>
        </div>
      </Container>

      {/*===== GLOBAL SCAN =====*/}

      {!shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 top-0 z-20 w-px bg-gradient-to-b from-transparent via-gold-light/25 to-transparent"
          initial={{
            left: "-1%",
            opacity: 0,
          }}
          animate={{
            left: "101%",
            opacity: [0, 0.65, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2,
          }}
        />
      )}
    </Section>
  );
}

//==============================================================//
// STACK ROW
//==============================================================//

function StackRow({
  layer,
  layerIndex,
  shouldReduceMotion,
}: {
  layer: StackLayer;
  layerIndex: number;
  shouldReduceMotion: boolean | null;
}) {
  const Icon = layer.icon;

  return (
    <motion.article
      initial={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 0,
              x: -25,
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
        amount: 0.35,
      }}
      transition={{
        duration: 0.65,
        delay: layerIndex * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative min-w-0 border-b border-white/10 px-5 py-6 last:border-b-0 sm:px-6 lg:px-8"
    >
      {/* connector */}
      <div
        aria-hidden="true"
        className="absolute left-[34px] top-1/2 h-px w-6 -translate-y-1/2 bg-white/10 sm:left-[42px]"
      />

      <div className="grid min-w-0 gap-5 pl-10 sm:pl-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-center lg:gap-8">
        {/* metadata */}
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center border border-gold-light/18 bg-gold-light/[0.045] text-gold-light">
              <Icon className="h-4 w-4" />
            </div>

            <div>
              <span className="block font-mono text-[7px] font-semibold text-gold-light">
                {layer.index}
              </span>

              <h3 className="mt-1 text-sm font-semibold text-white">
                {layer.title}
              </h3>
            </div>
          </div>

          <p className="mt-3 max-w-[230px] text-[10px] leading-5 text-white/32">
            {layer.description}
          </p>
        </div>

        {/* technologies */}
        <div className="grid min-w-0 grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3 xl:grid-cols-5">
          {layer.technologies.map((technology, techIndex) => {
            const TechIcon = technology.icon;

            return (
              <motion.div
                key={technology.label}
                initial={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: 10,
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
                  delay: layerIndex * 0.08 + techIndex * 0.05,
                }}
                className="group/tech relative min-w-0 bg-navy-deep/95 px-3 py-4 transition-colors duration-300 hover:bg-gold-light/[0.045]"
              >
                <TechIcon className="h-5 w-5 text-white/60 transition-all duration-300 group-hover/tech:text-gold-light"/>

                <span className="mt-3 block truncate text-[10px] font-medium text-white/48 transition-colors group-hover/tech:text-white">
                  {technology.label}
                </span>

                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[2px] w-0 bg-gold-light transition-all duration-500 group-hover/tech:w-full"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
}

//==============================================================//
// PIPELINE NODE
//==============================================================//

function PipelineNode({
  index,
  label,
  icon: Icon,
  isLast = false,
}: {
  index: string;
  label: string;
  icon: typeof Code2;
  isLast?: boolean;
}) {
  return (
    <div
      className={`
        relative
        min-w-0
        border-b border-r border-white/10
        px-4 py-5
        sm:px-5
        lg:border-b-0

        ${isLast ? "lg:border-r-0" : ""}
      `}
    >
      <span className="font-mono text-[7px] font-semibold text-gold-light/55">
        {index}
      </span>

      <div className="mt-3 flex items-center gap-3">
        <Icon className="h-3.5 w-3.5 text-gold-light" />

        <span className="text-xs font-medium text-white/55">
          {label}
        </span>
      </div>

      {!isLast && (
        <ArrowRight
          aria-hidden="true"
          className="absolute -right-2 top-1/2 z-10 hidden h-3.5 w-3.5 -translate-y-1/2 bg-navy-deep text-gold-light/45 lg:block"
        />
      )}
    </div>
  );
}
