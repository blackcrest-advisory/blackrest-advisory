"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/services/website-development/shared/Container";
import { SectionHeading } from "@/components/services/website-development/shared/SectionHeading";
import {
  FiBriefcase,
  FiShoppingCart,
  FiCode,
  FiFileText,
  FiLayers,
  FiLifeBuoy,
  FiArrowRight,
} from "react-icons/fi";

const services = [
  {
    icon: FiBriefcase,
    title: "Corporate & Business Websites",
    description:
      "Professional websites built for credibility, lead generation, and brand authority – designed to convert B2B visitors into enquiries.",
  },
  {
    icon: FiShoppingCart,
    title: "E‑Commerce Platforms",
    description:
      "Full‑featured online stores with secure payment gateways, inventory management, and optimised checkout flows that maximise revenue.",
  },
  {
    icon: FiCode,
    title: "Custom Web Applications",
    description:
      "Bespoke platforms built around unique business logic – portals, dashboards, SaaS tools, and operational systems tailored to you.",
  },
  {
    icon: FiFileText,
    title: "CMS & Content Platforms",
    description:
      "WordPress, headless CMS, and custom solutions that give you full control over your content without technical dependency.",
  },
  {
    icon: FiLayers,
    title: "UI/UX Design",
    description:
      "User experience research, wireframing, and interface design that prioritises usability, accessibility, and visual impact across all devices.",
  },
  {
    icon: FiLifeBuoy,
    title: "Website Maintenance & Support",
    description:
      "Ongoing technical support, performance monitoring, security updates, and iterative improvements to keep your site fast, secure, and effective.",
  },
];

const WhatWeBuild = () => {
  return (
    <section className="relative py-16 md:py-24 bg-[var(--color-card-bg)] overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[var(--color-secondary)]/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />

      <Container>
        <SectionHeading
          title="What We Build"
          subtitle="From simple business sites to complex web applications – we deliver tailored solutions that align with your goals."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.08,
                type: "spring",
                stiffness: 80,
              }}
              className="group relative rounded-2xl bg-[var(--color-background)] p-6 shadow-sm transition-all duration-300 hover:shadow-xl border border-[var(--color-border)] hover:border-[var(--color-secondary)]/40"
              whileHover={{ y: -8 }}
            >
              {/* Golden top accent bar */}
              <div className="absolute -top-px left-6 right-6 h-0.5 rounded-full bg-linear-to-r from-transparent via-[var(--color-secondary)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Glow overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-[var(--color-secondary)]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                {/* Icon – golden gradient circle */}
                <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[var(--color-secondary)]/20 to-[var(--color-secondary)]/5 text-[var(--color-secondary)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[var(--color-secondary)]/20">
                  <service.icon className="h-7 w-7" />
                </div>

                <h3 className="mt-4 text-xl font-semibold text-[var(--color-heading)] group-hover:text-[var(--color-secondary)] transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="mt-2 text-sm text-[var(--color-body)] leading-relaxed">
                  {service.description}
                </p>

                {/* Arrow indicator at bottom right */}
                <div className="mt-4 flex justify-end">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] transition-all duration-300 group-hover:bg-[var(--color-secondary)] group-hover:text-white group-hover:translate-x-1">
                    <FiArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom golden CTA badge */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 rounded-full border border-[var(--color-secondary)]/20 bg-[var(--color-background)] px-6 py-3 shadow-sm">
            <span className="text-[var(--color-secondary)]">✦</span>
            <span className="text-sm font-medium text-[var(--color-heading)]">
              Every project is custom‑built for your unique needs
            </span>
            <span className="text-[var(--color-secondary)]">✦</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default WhatWeBuild;
