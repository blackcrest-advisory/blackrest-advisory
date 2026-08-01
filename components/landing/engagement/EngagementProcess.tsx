"use client";

import { motion } from "framer-motion";
import {
  Search,
  Target,
  PenTool,
  Rocket,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import {
  staggerContainer,
  slideInLeft,
  slideInRight,
} from "@/lib/utils/animations";

//===== Process steps data =====//
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
    //===== Engagement process section with step-by-step cards =====//
    <Section className="bg-muted/30">
      <Container>
        {/*===== Section header =====*/}
        <div className="mb-12 text-center md:mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-secondary">
            How We Work
          </span>
          <h2 className="mt-2 text-3xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Our Engagement Process
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A structured, transparent approach designed to minimise risk and
            maximise results — keeping you informed at every stage.
          </p>
        </div>

        {/*===== Process steps grid =====*/}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8"
        >
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={step.title}
                variants={isEven ? slideInLeft : slideInRight}
              >
                <Card padding="base" hoverEffect className="h-full">
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
};
