// src/components/engagement/EngagementProcess.tsx
"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../../shared/SectionHeader";
import {
  staggerContainer,
  fadeInUp,
  slideInLeft,
  slideInRight,
} from "@/utils/animations";
import {
  Search,
  Target,
  PenTool,
  Rocket,
  BarChart3,
  TrendingUp,
} from "lucide-react";

const processSteps = [
  {
    icon: Search,
    title: "01. Discovery",
    description:
      "We begin every engagement with a thorough discovery process — understanding your business, market, goals, and challenges.",
  },
  {
    icon: Target,
    title: "02. Strategise",
    description:
      "Based on discovery, we develop a tailored strategy that maps the right services to your specific commercial objectives with clear KPIs.",
  },
  {
    icon: PenTool,
    title: "03. Design",
    description:
      "Our designers translate strategy into detailed plans — wireframes, technical specs, campaign blueprints — reviewed and approved by you.",
  },
  {
    icon: Rocket,
    title: "04. Execute",
    description:
      "Our delivery teams execute with precision using agile methodology with regular check-ins, preview deliverables, and iterative refinements.",
  },
  {
    icon: BarChart3,
    title: "05. Report",
    description:
      "We provide transparent, regular reporting against the KPIs — so you always know what is working and what is being optimised.",
  },
  {
    icon: TrendingUp,
    title: "06. Grow",
    description:
      "Our partnerships don't end at delivery. We analyse performance data and work proactively to evolve your digital strategy as you scale.",
  },
];

export const EngagementProcess = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32 bg-muted/30 dark:bg-muted/10">
      <div className="container px-4 sm:px-6">
        <SectionHeader
          tag="How We Work"
          title="Our Engagement Process"
          description="A structured, transparent approach designed to minimise risk and maximise results — keeping you informed at every stage."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
        >
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={step.title}
                variants={isEven ? slideInLeft : slideInRight}
                className="bg-background dark:bg-background/50 rounded-xl p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow border border-border/40"
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-body/70 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
