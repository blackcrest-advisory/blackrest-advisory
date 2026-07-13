// components/sales-support/SalesCapabilities.tsx
"use client";

import { motion, Variants } from "framer-motion"; // ← import Variants
import {
  FaBullseye,
  FaRocket,
  FaHandshake,
  FaChartLine,
} from "react-icons/fa6";
import {
  FaChalkboardTeacher,
  FaCogs,
  FaFileAlt,
  FaFunnelDollar,
} from "react-icons/fa";
import { SectionHeading } from "@/components/services/sales&business/SectionHeading";

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
  // ✅ Explicit Variants typing
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section
      id="capabilities"
      className="py-20 md:py-28 bg-[var(--color-background)]"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading
          label="Our Capabilities"
          // ✅ title now uses JSX so the <span> renders correctly
          title={
            <>
              Sales & Business Support{" "}
              <span className="text-[var(--color-secondary)]">
                Capabilities
              </span>
            </>
          }
          subtitle="We cover every aspect of the sales process—from strategy to execution—to help you grow."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-14"
        >
          {capabilities.map((cap, idx) => (
            <motion.div
              key={idx}
              variants={item}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] mb-4">
                <cap.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--color-heading)] mb-2">
                {cap.title}
              </h3>
              <p className="text-sm text-[var(--color-body)] leading-relaxed">
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
