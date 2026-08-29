"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Check,
  Globe2,
  Handshake,
  Smartphone,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const services = [
  {
    number: "01",
    eyebrow: "Digital foundation",
    title: "Web Development",
    description:
      "Websites and platforms built to explain your value clearly, earn trust, and make the next customer action easier.",
    icon: Globe2,
    features: [
      "Business websites",
      "Web applications",
      "E-commerce experiences",
      "Performance improvements",
    ],
    href: "/services/website-development",
  },
  {
    number: "02",
    eyebrow: "Product experience",
    title: "Mobile Applications",
    description:
      "Mobile products designed around practical customer journeys, clear product experiences, and the needs of your business.",
    icon: Smartphone,
    features: [
      "iOS and Android apps",
      "Cross-platform products",
      "Product UX",
      "App improvements",
    ],
    href: "/services/mobile-applications",
  },
  {
    number: "03",
    eyebrow: "Demand generation",
    title: "Digital Marketing",
    description:
      "Marketing activity that helps the right audience find your business, understand your offer, and take the next step.",
    icon: BarChart3,
    features: [
      "SEO and content",
      "Paid campaigns",
      "Conversion improvement",
      "Performance reporting",
    ],
    href: "/services/digital-marketing",
  },
  {
    number: "04",
    eyebrow: "Commercial momentum",
    title: "Sales & Business Support",
    description:
      "Focused support for stronger sales processes, clearer opportunities, and better follow-through with your customers.",
    icon: Handshake,
    features: [
      "Sales process design",
      "CRM support",
      "Pipeline improvement",
      "Client retention",
    ],
    href: "/services/sales-support",
  },
];

export default function Services() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <Section className="relative overflow-hidden border-y border-border bg-background">
      {/*===== BACKGROUND =====*/}

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-48 top-1/4 h-[34rem] w-[34rem] rounded-full bg-secondary/[0.045] blur-[140px]" />

        <div
          className="absolute inset-0 hidden opacity-[0.08] lg:block"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "25% 100%",
          }}
        />
      </div>

      <Container className="relative">
        {/*===== HEADER =====*/}

        <div className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, x: reduceMotion ? 0 : -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : 0.6 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />

              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-secondary">
                What we build
              </span>

              <span className="h-px w-10 bg-secondary/40" />
            </div>

            <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.045em] text-heading sm:text-5xl lg:text-[3.35rem] lg:leading-[1.04]">
              The digital work
              <span className="block text-muted-foreground">
                that moves business forward.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: reduceMotion ? 0 : 0.1, duration: 0.55 }}
            className="lg:justify-self-end"
          >
            <p className="max-w-xl text-sm leading-7 text-body sm:text-base">
              From a first website to a mobile product, marketing activity, or
              a stronger sales process, we provide focused support where it can
              create the most value.
            </p>
          </motion.div>
        </div>

        {/*===== SERVICE GRID =====*/}

        <div className="mt-10 grid overflow-hidden border border-border bg-card shadow-[var(--shadow-card)] md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: reduceMotion ? 0 : index * 0.07,
                  duration: reduceMotion ? 0 : 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group relative flex min-w-0 flex-col border-b border-border p-6 transition-colors duration-300 hover:bg-muted/[0.18] sm:p-8 ${
                  index % 2 !== 0 ? "md:border-l" : ""
                } ${index >= 2 ? "md:border-b-0" : ""} ${
                  index === services.length - 1 ? "border-b-0" : ""
                }`}
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-secondary/[0.06] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex items-start justify-between gap-5">
                  <div className="flex h-11 w-11 items-center justify-center border border-secondary/15 bg-secondary/[0.045] text-secondary transition-colors duration-300 group-hover:border-secondary/30 group-hover:bg-secondary group-hover:text-secondary-foreground">
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                  </div>

                  <span className="font-mono text-[10px] font-semibold tracking-[0.18em] text-muted-foreground/45">
                    {service.number}
                  </span>
                </div>

                <div className="relative mt-8">
                  <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-secondary">
                    {service.eyebrow}
                  </p>

                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-heading sm:text-[1.7rem]">
                    {service.title}
                  </h3>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-body sm:text-base">
                    {service.description}
                  </p>
                </div>

                <ul className="relative mt-7 grid gap-3 sm:grid-cols-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-xs font-medium text-muted-foreground"
                    >
                      <Check className="h-3.5 w-3.5 shrink-0 text-secondary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.href}
                  className="group/link relative mt-8 inline-flex items-center gap-2 self-start border-b border-secondary/30 pb-1 text-sm font-semibold text-heading transition-colors hover:border-secondary hover:text-secondary"
                >
                  Explore service
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/*===== CLOSING NOTE =====*/}

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
          className="mt-7 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-2xl text-muted-foreground">
            Start with the service that matters most now, then add support as
            the business needs it.
          </p>

          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-secondary">
            One project or connected support
          </span>
        </motion.div>
      </Container>
    </Section>
  );
}
