"use client";

import { motion } from "framer-motion";
import {
  FaBullseye,
  FaRocket,
  FaHandshake,
  FaChartLine,
  FaChalkboardTeacher,
  FaCogs,
  FaFileAlt,
  FaFunnelDollar,
} from "react-icons/fa";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { staggerContainer, fadeInUp, hoverScale } from "@/utils/animations";

//===== Capabilities data =====//
const capabilities = [
  {
    icon: FaBullseye,
    title: "B2B Sales Strategy Development",
    desc: "Tailored strategies that align with your market and drive measurable results.",
  },
  {
    icon: FaFunnelDollar,
    title: "Sales Funnel Design & Optimisation",
    desc: "End‑to‑end funnel mapping and continuous optimisation to boost conversions.",
  },
  {
    icon: FaCogs,
    title: "CRM Setup & Pipeline Management",
    desc: "Seamless CRM implementation and pipeline oversight for maximum efficiency.",
  },
  {
    icon: FaRocket,
    title: "Lead Generation Programme Design",
    desc: "Targeted lead generation programmes that feed your pipeline with quality prospects.",
  },
  {
    icon: FaFileAlt,
    title: "Proposal & Pitch Deck Creation",
    desc: "Compelling proposals and pitch decks that win clients and close deals.",
  },
  {
    icon: FaChalkboardTeacher,
    title: "Sales Team Training & Coaching",
    desc: "Empower your team with modern sales techniques and ongoing coaching.",
  },
  {
    icon: FaHandshake,
    title: "Client Retention & Account Growth",
    desc: "Proven strategies to retain clients and expand existing accounts.",
  },
  {
    icon: FaChartLine,
    title: "Business Development Consulting",
    desc: "Expert consulting to identify new opportunities and drive sustainable growth.",
  },
];

export const SalesCapabilities = () => {
  return (
    <Section className="bg-background">
      <Container>
        {/*===== Section header =====*/}
        <div className="text-center">
          <span className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
            ✦ Our Capabilities
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Sales & Business Support{" "}
            <span className="text-secondary">Capabilities</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We cover every aspect of the sales process—from strategy to
            execution—to help you grow.
          </p>
        </div>

        {/*===== Capabilities grid =====*/}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8"
        >
          {capabilities.map((cap, idx) => (
            <motion.div key={idx} variants={fadeInUp} {...hoverScale}>
              <Card
                padding="base"
                hoverEffect
                className="group relative overflow-hidden"
              >
                {/* Decorative top line */}
                <div className="absolute -top-px left-6 right-6 h-0.5 rounded-full bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <cap.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {cap.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {cap.desc}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
};
