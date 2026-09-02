"use client";

//===== imports =====//
import { motion, useReducedMotion } from "framer-motion";

import {
  FilePenLine,
  Gauge,
  Layers3,
  Monitor,
  Palette,
  PenTool,
  Rocket,
  Server,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

//==============================================================//
// PROCESS DATA
//==============================================================//

const layersData = [
  {
    id: 1,
    label: "Foundation",
    description: "Business goals, sitemap, and technical direction",
    meta: "Strategy",
    icon: Layers3,
  },
  {
    id: 2,
    label: "Wireframe",
    description: "Clear structure and customer journeys",
    meta: "Structure",
    icon: PenTool,
  },
  {
    id: 3,
    label: "Design System",
    description: "Visual language and reusable interface patterns",
    meta: "Design",
    icon: Palette,
  },
  {
    id: 4,
    label: "Frontend",
    description: "Responsive, user-facing interface development",
    meta: "Interface",
    icon: Monitor,
  },
  {
    id: 5,
    label: "Backend",
    description: "APIs, data, and business logic where needed",
    meta: "Engineering",
    icon: Server,
  },
  {
    id: 6,
    label: "CMS",
    description: "Content workflows and flexible page management",
    meta: "Content",
    icon: FilePenLine,
  },
  {
    id: 7,
    label: "Optimization",
    description: "Performance, accessibility, and search foundations",
    meta: "Performance",
    icon: Gauge,
  },
  {
    id: 8,
    label: "Launch",
    description: "Testing, release, and a clear handover",
    meta: "Delivery",
    icon: Rocket,
  },
];

//==============================================================//
// BUILD LAYERS
//==============================================================//

export default function BuildLayers() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section className="relative bg-background py-16 sm:py-20 lg:py-28">
      <Container>
        {/*===== HEADER =====*/}

        <div className="overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
          <div className="grid lg:grid-cols-[190px_minmax(0,1fr)]">
            <div className="relative overflow-hidden bg-navy-deep px-6 py-7 text-white sm:px-8 lg:flex lg:flex-col lg:justify-between lg:px-9 lg:py-9">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-light">
                03 / How we build
              </span>

              <span className="mt-8 block text-6xl font-semibold leading-none tracking-[-0.08em] text-white/15 lg:mt-0 lg:text-7xl">
                08
              </span>

              <span className="mt-3 block font-mono text-[9px] uppercase tracking-[0.12em] text-white/55">
                Connected stages
              </span>
            </div>

            <div className="px-6 py-8 sm:px-8 lg:px-10 lg:py-9">
              <h2 className="max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-heading sm:text-5xl lg:text-[3.35rem]">
                A clear path from
                <span className="block text-secondary">idea to release.</span>
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-body sm:text-base sm:leading-8">
                We bring together the parts your project needs, from early
                planning through design, engineering, testing, and launch.
              </p>

              <div className="mt-7 grid grid-cols-2 border-t border-border pt-5 sm:grid-cols-4">
                {["Plan", "Design", "Build", "Release"].map((phase, index) => (
                  <div
                    key={phase}
                    className={`flex items-center gap-2 py-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground ${
                      index > 0 ? "sm:border-l sm:border-border sm:pl-4" : ""
                    }`}
                  >
                    <span className="text-secondary">0{index + 1}</span>
                    {phase}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/*===== PROCESS CARDS =====*/}

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {layersData.map((layer, index) => {
            const Icon = layer.icon;

            return (
              <motion.article
                key={layer.id}
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
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative min-w-0 overflow-hidden border border-border bg-card px-5 py-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-secondary/30 hover:shadow-[var(--shadow-card-hover)] sm:px-6 sm:py-7"
              >
                {/*===== TOP GOLD SIGNAL =====*/}

                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-[2px] w-10 bg-secondary transition-all duration-500 group-hover:w-full"
                />

                {/*===== CARD TOP =====*/}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-secondary/15 bg-secondary/[0.045] text-secondary transition-colors duration-300 group-hover:border-secondary/25 group-hover:bg-secondary/[0.075]">
                    <Icon className="h-4 w-4" />
                  </div>

                  <span className="font-mono text-[22px] font-medium leading-none tracking-[-0.05em] text-muted-foreground/15 transition-colors duration-300 group-hover:text-secondary/25">
                    {String(layer.id).padStart(2, "0")}
                  </span>
                </div>

                {/*===== CONTENT =====*/}

                <div className="mt-8">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-secondary">
                    {layer.meta}
                  </span>

                  <h3 className="mt-2 text-lg font-semibold tracking-[-0.025em] text-heading sm:text-xl">
                    {layer.label}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {layer.description}
                  </p>
                </div>

                {/*===== CARD FOOTER =====*/}

                <div className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-4">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.11em] text-muted-foreground/55">
                    Step
                  </span>

                  <span className="font-mono text-[9px] font-semibold text-secondary">
                    {String(layer.id).padStart(2, "0")}
                    <span className="text-muted-foreground/25"> / 08</span>
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/*===== PROCESS SUMMARY =====*/}

        <div className="mt-6 overflow-hidden border border-border bg-muted/15">
          <div className="grid sm:grid-cols-5">
            <ProcessPhase index="01" label="Plan" />

            <ProcessPhase index="02" label="Design" />

            <ProcessPhase index="03" label="Build" />

            <ProcessPhase index="04" label="Refine" />

            <ProcessPhase index="05" label="Launch" last />
          </div>
        </div>

        {/*===== CLOSING MESSAGE =====*/}

        <div className="mt-10 flex flex-col gap-5 border-t border-border pt-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-secondary">
              From concept to launch
            </span>

            <p className="mt-2 max-w-xl text-lg font-medium leading-7 tracking-[-0.015em] text-heading">
              A focused sequence, shaped around the work your project needs.
            </p>
          </div>

          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground/55">
            Strategy → Experience → Engineering → Delivery
          </span>
        </div>
      </Container>
    </Section>
  );
}

//==============================================================//
// PROCESS PHASE
//==============================================================//

function ProcessPhase({
  index,
  label,
  last = false,
}: {
  index: string;
  label: string;
  last?: boolean;
}) {
  return (
    <div
      className={`
        flex
        items-center
        gap-3
        px-4
        py-4
        sm:justify-center
        sm:px-3

        ${!last ? "border-b border-border sm:border-b-0 sm:border-r" : ""}
      `}
    >
      <span className="font-mono text-[9px] font-semibold text-secondary/70">
        {index}
      </span>

      <span className="text-xs font-medium text-heading">
        {label}
      </span>
    </div>
  );
}
