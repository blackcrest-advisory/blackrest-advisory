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
    description: "Strategy, sitemap & technical planning",
    meta: "Strategy",
    icon: Layers3,
  },
  {
    id: 2,
    label: "Wireframe",
    description: "User flow & interactive blueprint",
    meta: "Structure",
    icon: PenTool,
  },
  {
    id: 3,
    label: "Design System",
    description: "Visual identity & component library",
    meta: "Design",
    icon: Palette,
  },
  {
    id: 4,
    label: "Frontend",
    description: "Pixel-perfect UI development",
    meta: "Interface",
    icon: Monitor,
  },
  {
    id: 5,
    label: "Backend",
    description: "APIs, databases & business logic",
    meta: "Engineering",
    icon: Server,
  },
  {
    id: 6,
    label: "CMS",
    description: "Content management & dynamic pages",
    meta: "Content",
    icon: FilePenLine,
  },
  {
    id: 7,
    label: "Optimization",
    description: "Speed, SEO & performance tuning",
    meta: "Performance",
    icon: Gauge,
  },
  {
    id: 8,
    label: "Launch",
    description: "Deployment, testing & go-live",
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
    <Section
      className="relative bg-background py-16 sm:py-20 lg:py-28"
    >
      <Container>
        {/*===== HEADER =====*/}

        <div
          className="grid gap-7 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-16"
        >
          {/* left */}
          <div>
            <div
              className="flex items-center gap-3"
            >
              <span
                className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-secondary"
              >
                03 / Our Process
              </span>

              <span
                className="h-px w-10 bg-secondary/35"
              />
            </div>

            <p
              className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground"
            >
              A structured approach that keeps every part of the project
              focused, connected and moving forward.
            </p>
          </div>

          {/* right */}
          <div>
            <h2
              className="max-w-4xl text-3xl font-semibold leading-[1.03] tracking-[-0.045em] text-heading sm:text-4xl lg:text-5xl xl:text-[56px]"
            >
              Built layer by layer.
              <span
                className="block text-secondary"
              >
                Nothing left to chance.
              </span>
            </h2>

            <p
              className="mt-5 max-w-2xl text-sm leading-7 text-body sm:text-base sm:leading-8"
            >
              From planning and design to engineering, optimisation and launch,
              every stage has a clear purpose in building a stronger digital
              product.
            </p>
          </div>
        </div>

        {/*===== PROCESS CARDS =====*/}

        <div
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
        >
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

                <div
                  className="flex items-start justify-between gap-4"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center border border-secondary/15 bg-secondary/[0.045] text-secondary transition-colors duration-300 group-hover:border-secondary/25 group-hover:bg-secondary/[0.075]"
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <span
                    className="font-mono text-[22px] font-medium leading-none tracking-[-0.05em] text-muted-foreground/15 transition-colors duration-300 group-hover:text-secondary/25"
                  >
                    {String(layer.id).padStart(2, "0")}
                  </span>
                </div>

                {/*===== CONTENT =====*/}

                <div className="mt-8">
                  <span
                    className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary"
                  >
                    {layer.meta}
                  </span>

                  <h3
                    className="mt-2 text-lg font-semibold tracking-[-0.025em] text-heading sm:text-xl"
                  >
                    {layer.label}
                  </h3>

                  <p
                    className="mt-3 text-sm leading-6 text-muted-foreground"
                  >
                    {layer.description}
                  </p>
                </div>

                {/*===== CARD FOOTER =====*/}

                <div
                  className="mt-8 flex items-center justify-between gap-3 border-t border-border pt-4"
                >
                  <span
                    className="font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/30"
                  >
                    Step
                  </span>

                  <span
                    className="font-mono text-[8px] font-semibold text-secondary"
                  >
                    {String(layer.id).padStart(2, "0")}
                    <span className="text-muted-foreground/25"> / 08</span>
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/*===== PROCESS SUMMARY =====*/}

        <div
          className="mt-6 overflow-hidden border border-border bg-muted/15"
        >
          <div
            className="grid sm:grid-cols-5"
          >
            <ProcessPhase index="01" label="Plan" />

            <ProcessPhase index="02" label="Design" />

            <ProcessPhase index="03" label="Build" />

            <ProcessPhase index="04" label="Refine" />

            <ProcessPhase index="05" label="Launch" last />
          </div>
        </div>

        {/*===== CLOSING MESSAGE =====*/}

        <div
          className="mt-10 flex flex-col gap-5 border-t border-border pt-7 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <span
              className="font-mono text-[7px] font-semibold uppercase tracking-[0.16em] text-secondary"
            >
              From concept to launch
            </span>

            <p
              className="mt-2 max-w-xl text-lg font-medium leading-7 tracking-[-0.015em] text-heading"
            >
              Eight focused stages. One cohesive digital product.
            </p>
          </div>

          <span
            className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/30"
          >
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
      <span
        className="font-mono text-[7px] font-semibold text-secondary/55"
      >
        {index}
      </span>

      <span
        className="text-xs font-medium text-heading"
      >
        {label}
      </span>
    </div>
  );
}
