"use client";

import { motion } from "framer-motion";
import { Palette } from "lucide-react";
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
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import {
  fadeInUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
  hoverScale,
} from "@/utils/animations";

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

export default function BuildLayers() {
  return (
    <Section className="relative overflow-hidden bg-background">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-secondary/5 opacity-40 pointer-events-none" />

      <Container className="max-w-5xl">
        {/*===== Section header =====*/}
        <div className="text-center">
          <motion.span
            className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            ✦ Our Process
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Built <span className="text-secondary">Layer by Layer</span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            We construct your website like a skyscraper – each level built on a
            solid foundation, with precision and care.
          </motion.p>
        </div>

        {/*===== Timeline =====*/}
        <div className="relative mt-16">
          {/* Glowing golden vertical line */}
          <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-secondary via-secondary/60 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

          {/* Glowing dot at the top */}
          <div className="absolute left-8 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-secondary shadow-lg shadow-secondary/50 sm:left-1/2" />

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
                  variants={isEven ? slideInLeft : slideInRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  {/* Connector dot on the vertical line */}
                  <div className="absolute left-8 top-6 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-secondary bg-background shadow-md sm:block sm:left-1/2" />

                  {/* Content Card */}
                  <div
                    className={`w-full sm:w-[calc(50%-32px)] ${
                      isEven ? "sm:pr-8" : "sm:pl-8 sm:text-right"
                    }`}
                  >
                    <motion.div {...hoverScale}>
                      <Card
                        padding="base"
                        hoverEffect
                        className="group relative border-border/50"
                      >
                        {/* Golden left border accent */}
                        <div className="absolute left-0 top-1/2 h-12 w-1 -translate-y-1/2 rounded-r-full bg-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        <div className="flex items-start gap-4">
                          {/* Icon with golden circle */}
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                            <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              {/* Step number - golden badge */}
                              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                                {layer.id}
                              </span>
                              <h3 className="text-lg font-semibold text-foreground">
                                {layer.label}
                              </h3>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {layer.description}
                            </p>
                          </div>
                        </div>

                        {/* Progress indicator icon at bottom right */}
                        <div className="absolute bottom-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <FiCheckCircle className="h-5 w-5 text-secondary" />
                        </div>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/*===== Bottom CTA badge =====*/}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-4 rounded-full border border-secondary/20 bg-card px-6 py-3 shadow-sm">
            <span className="text-secondary">✦</span>
            <span className="text-sm font-medium text-foreground">
              From concept to launch in 8 structured steps
            </span>
            <span className="text-secondary">✦</span>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
