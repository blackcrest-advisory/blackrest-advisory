"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BriefcaseBusiness,
  Code2,
  FilePenLine,
  ShoppingCart,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const services = [
  {
    number: "01",
    title: "Business websites",
    description:
      "Clear, credible websites that explain your offer and give the right people a reason to get in touch.",
    icon: BriefcaseBusiness,
  },
  {
    number: "02",
    title: "E-commerce experiences",
    description:
      "Practical online shopping journeys that make products easier to discover, understand, and buy.",
    icon: ShoppingCart,
  },
  {
    number: "03",
    title: "Custom web applications",
    description:
      "Purpose-built portals, dashboards, and operational tools shaped around the way your business works.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Content and ongoing support",
    description:
      "Content systems and practical improvements that help your website stay useful after the first launch.",
    icon: FilePenLine,
  },
];

export default function WhatWeBuild() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <Section className="relative isolate overflow-hidden bg-muted/20 py-16 sm:py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16] [background-image:linear-gradient(to_right,var(--color-border)_1px,transparent_1px)] [background-size:25%_100%]"
      />

      <Container>
        <div className="relative border-b border-border pb-10 text-center lg:pb-14">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : 0.55 }}
            className="inline-flex items-center gap-3 border border-secondary/15 bg-secondary/[0.04] px-3 py-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />

            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-secondary">
              02 / What we build
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: reduceMotion ? 0 : 0.08, duration: 0.55 }}
          >
            <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.045em] text-heading sm:text-5xl lg:text-[3.35rem]">
              Digital spaces that make
              <span className="block text-secondary">the next step clear.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-body sm:text-base sm:leading-8">
              Whether you need a focused website, a commerce experience, or a
              more capable web platform, we shape the work around the outcome
              you are trying to achieve.
            </p>
          </motion.div>

          <p className="mx-auto mt-6 max-w-md text-xs leading-6 text-muted-foreground">
            The right website depends on the job it needs to do for your
            customers and your business.
          </p>
        </div>

        <div className="grid border-b border-border sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: reduceMotion ? 0 : index * 0.07,
                  duration: 0.5,
                }}
                className={`group relative min-h-[280px] border-b border-border px-5 py-7 transition-colors duration-300 hover:bg-card sm:px-6 lg:min-h-[310px] lg:border-b-0 lg:px-7 lg:py-8 ${
                  index > 0 ? "sm:border-l" : ""
                } ${index === 2 ? "sm:border-l-0 lg:border-l" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-10 w-10 items-center justify-center border border-secondary/15 bg-secondary/[0.05] text-secondary transition-colors group-hover:border-secondary/30 group-hover:bg-secondary/[0.1]">
                    <Icon className="h-4 w-4" />
                  </div>

                  <span className="font-mono text-[10px] font-semibold text-secondary/70">
                    {service.number}
                  </span>
                </div>

                <h3 className="mt-8 text-lg font-semibold tracking-[-0.025em] text-heading sm:text-xl">
                  {service.title}
                </h3>

                <p className="mt-3 max-w-xs text-sm leading-7 text-muted-foreground">
                  {service.description}
                </p>

                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-secondary transition-all duration-500 group-hover:w-full" />
              </motion.article>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm font-medium leading-6 text-heading">
            Start with the business need, then choose the right level of website
            or platform support.
          </p>

          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-secondary">
            Strategy / Experience / Engineering
          </span>
        </div>
      </Container>
    </Section>
  );
}
