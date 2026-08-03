// components/landing/start-project/StepsSection.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";
import { FileText, Phone, FileCheck, Rocket } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Project Inquiry",
    description: "Tell us about your business and project goals.",
  },
  {
    icon: Phone,
    title: "Discovery Call",
    description: "Our team reviews your request and schedules a consultation.",
  },
  {
    icon: FileCheck,
    title: "Proposal & Planning",
    description:
      "We prepare a detailed proposal, timeline, and project estimate.",
  },
  {
    icon: Rocket,
    title: "Project Kickoff",
    description:
      "Once approved, your dedicated client portal and project are created.",
  },
];

export const StepsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <Section>
      <Container>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.h2
            variants={fadeInUp}
            className="mb-4 text-3xl font-bold text-heading md:text-4xl"
          >
            What Happens After You Submit?
          </motion.h2>
          <motion.p variants={fadeInUp} className="mx-auto max-w-2xl text-body">
            A clear, transparent process from inquiry to launch.
          </motion.p>
        </motion.div>

        <div className="relative mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 hidden h-0.5 w-full -translate-y-1/2 bg-border lg:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.15 }}
                className="relative flex flex-col items-center rounded-2xl border border-border bg-card-bg p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-heading">
                  {step.title}
                </h3>
                <p className="text-center text-body">{step.description}</p>
                <span className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-bold text-cta-text">
                  {index + 1}
                </span>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};
