"use client";

import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiShoppingCart,
  FiCode,
  FiFileText,
  FiLayers,
  FiLifeBuoy,
  FiArrowRight,
} from "react-icons/fi";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { fadeInUp, staggerContainer, hoverScale } from "@/lib/utils/animations";

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

export default function WhatWeBuild() {
  return (
    //===== What We Build Section =====//
    <Section className="relative overflow-hidden bg-muted/30">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-secondary/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none" />

      <Container>
        {/*===== Section header =====*/}
        <div className="text-center">
          <motion.span
            className="inline-block rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            ✦ What We Build
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            What We Build
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
          >
            From simple business sites to complex web applications – we deliver
            tailored solutions that align with your goals.
          </motion.p>
        </div>

        {/*===== Services grid =====*/}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={fadeInUp} {...hoverScale}>
              <Card
                padding="base"
                hoverEffect
                className="group relative overflow-hidden border-border/50"
              >
                {/* Golden top accent bar */}
                <div className="absolute -top-px left-6 right-6 h-0.5 rounded-full bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Glow overlay on hover */}
                <div className="absolute inset-0 rounded-2xl bg-secondary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  {/* Icon – golden gradient circle */}
                  <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 text-secondary transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-secondary/20">
                    <service.icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-4 text-xl font-semibold text-foreground transition-colors duration-300 group-hover:text-secondary">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  {/* Arrow indicator at bottom right */}
                  <div className="mt-4 flex justify-end">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10 text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:translate-x-1">
                      <FiArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/*===== Bottom golden CTA badge =====*/}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <div className="flex items-center gap-3 rounded-full border border-secondary/20 bg-card px-6 py-3 shadow-sm">
            <span className="text-secondary">✦</span>
            <span className="text-sm font-medium text-foreground">
              Every project is custom‑built for your unique needs
            </span>
            <span className="text-secondary">✦</span>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
