"use client";

import { Container } from "@/components/landing/services/website-development/shared/Container";
import { SectionHeading } from "@/components/landing/services/website-development/shared/SectionHeading";
import { motion } from "framer-motion";
import { Palette } from "lucide-react";
import { useRef } from "react";
import {
  FiLayers,
  FiPenTool,
  FiMonitor,
  FiServer,
  FiEdit,
  FiTrendingUp,
  FiCheckCircle,
} from "react-icons/fi";
import { GiFireworkRocket } from "react-icons/gi";

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
    description: "Pixel‑perfect UI development",
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
    description: "Deployment, testing & go‑live",
    icon: GiFireworkRocket,
  },
];

const BuildLayers = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative py-16 md:py-24 bg-[var(--color-background)] overflow-hidden"
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-[var(--color-secondary)]/5 opacity-40 pointer-events-none" />

      <Container>
        {/* Gold-accented heading */}
        <div className="text-center">
          <motion.span
            className="inline-block rounded-full bg-[var(--color-secondary)]/10 px-4 py-1.5 text-sm font-medium text-[var(--color-secondary)]"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            ✦ Our Process
          </motion.span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--color-heading)] sm:text-4xl md:text-5xl">
            Built{" "}
            <span className="text-[var(--color-secondary)]">
              Layer by Layer
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-body)]">
            We construct your website like a skyscraper – each level built on a
            solid foundation, with precision and care.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Glowing golden vertical line */}
          <div className="absolute left-8 top-0 h-full w-0.5 bg-linear-to-b from-[var(--color-secondary)] via-[var(--color-secondary)]/60 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

          {/* Glowing dot at the top of the line */}
          <div className="absolute left-8 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-[var(--color-secondary)] shadow-lg shadow-[var(--color-secondary)]/50 sm:left-1/2" />

          <div className="relative flex flex-col gap-10">
            {layersData.map((layer, index) => {
              const isEven = index % 2 === 0;
              const Icon = layer.icon;

              return (
                <motion.div
                  key={layer.id}
                  className={`relative flex w-full flex-col items-start gap-4 sm:flex-row ${
                    isEven ? "sm:justify-start" : "sm:justify-end"
                  }`}
                  initial={{ opacity: 0, x: isEven ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  {/* Connector dot on the vertical line */}
                  <div className="absolute left-8 top-6 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-[var(--color-secondary)] bg-[var(--color-background)] shadow-md sm:block sm:left-1/2" />

                  {/* Content Card */}
                  <div
                    className={`w-full sm:w-[calc(50%-32px)] ${
                      isEven ? "sm:pr-8" : "sm:pl-8 sm:text-right"
                    }`}
                  >
                    <motion.div
                      className="group relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-bg)] p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[var(--color-secondary)]/50"
                      whileHover={{ y: -4 }}
                    >
                      {/* Golden left border accent */}
                      <div className="absolute left-0 top-1/2 h-12 w-1 -translate-y-1/2 rounded-r-full bg-[var(--color-secondary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="flex items-start gap-4">
                        {/* Icon with golden circle */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] transition-colors duration-300 group-hover:bg-[var(--color-secondary)] group-hover:text-white">
                          <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            {/* Step number - golden badge */}
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-secondary)] text-xs font-bold text-white">
                              {layer.id}
                            </span>
                            <h3 className="text-lg font-semibold text-[var(--color-heading)]">
                              {layer.label}
                            </h3>
                          </div>
                          <p className="mt-1 text-sm text-[var(--color-body)]">
                            {layer.description}
                          </p>
                        </div>
                      </div>

                      {/* Progress indicator icon at bottom right */}
                      <div className="absolute bottom-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <FiCheckCircle className="h-5 w-5 text-[var(--color-secondary)]" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA / Golden badge */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-4 rounded-full border border-[var(--color-secondary)]/20 bg-[var(--color-card-bg)] px-6 py-3 shadow-sm">
            <span className="text-[var(--color-secondary)]">✦</span>
            <span className="text-sm font-medium text-[var(--color-heading)]">
              From concept to launch in 8 structured steps
            </span>
            <span className="text-[var(--color-secondary)]">✦</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default BuildLayers;
