"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Globe2,
  Handshake,
  Smartphone,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const services = [
  {
    id: "marketing",
    number: "01",
    title: "Digital Marketing",
    shortTitle: "Growth",
    description:
      "Build a predictable acquisition engine with strategy, content, paid media, and conversion systems designed around B2B growth.",
    icon: BarChart3,
    features: [
      "SEO & content strategy",
      "Paid media & LinkedIn",
      "Conversion optimisation",
      "Campaign analytics",
    ],
    metric: "Acquisition",
    metricValue: "01",
    statement: "Turn attention into qualified demand.",
  },
  {
    id: "web",
    number: "02",
    title: "Web Development",
    shortTitle: "Platforms",
    description:
      "High-performance digital platforms built around credibility, user experience, conversion, and long-term maintainability.",
    icon: Globe2,
    features: [
      "Corporate websites",
      "Custom web applications",
      "E-commerce systems",
      "Performance engineering",
    ],
    metric: "Experience",
    metricValue: "02",
    statement: "Build digital infrastructure that performs.",
  },
  {
    id: "mobile",
    number: "03",
    title: "Mobile Applications",
    shortTitle: "Products",
    description:
      "Native and cross-platform mobile products designed to deepen customer engagement and create new digital opportunities.",
    icon: Smartphone,
    features: [
      "iOS & Android products",
      "React Native development",
      "Product UX",
      "App optimisation",
    ],
    metric: "Engagement",
    metricValue: "03",
    statement: "Put your business closer to your customers.",
  },
  {
    id: "sales",
    number: "04",
    title: "Sales & Business Support",
    shortTitle: "Revenue",
    description:
      "Connect marketing activity to revenue through stronger funnels, CRM systems, sales processes, and commercial enablement.",
    icon: Handshake,
    features: [
      "Sales funnel design",
      "CRM implementation",
      "Pipeline optimisation",
      "Team enablement",
    ],
    metric: "Revenue",
    metricValue: "04",
    statement: "Turn opportunity into repeatable growth.",
  },
];

export default function Services() {
  const [activeId, setActiveId] = useState("marketing");

  const activeService =
    services.find((service) => service.id === activeId) ?? services[0];

  const ActiveIcon = activeService.icon;

  return (
    <Section className="relative overflow-hidden bg-background">
      {/* Background composition */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute right-[-10%] top-[5%] h-[38rem] w-[38rem] rounded-full border border-border/60"
          animate={{ rotate: 360 }}
          transition={{
            duration: 55,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute right-[2%] top-[17%] h-[26rem] w-[26rem] rounded-full border border-secondary/10"
          animate={{ rotate: -360 }}
          transition={{
            duration: 42,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute right-[13%] top-[28%] h-[14rem] w-[14rem] rounded-full border border-secondary/20"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0a1628 1px, transparent 1px), linear-gradient(to bottom, #0a1628 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <motion.div
          key={activeService.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute right-[8%] top-[18%] h-[22rem] w-[22rem] rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgb(166 124 39 / 0.15), transparent 70%)",
          }}
        />
      </div>

      <Container className="relative">
        {/* Intro */}
        <div className="grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="flex items-center gap-3"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Capabilities
              </span>

              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: 48 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="h-px bg-secondary/60"
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.6 }}
              className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.045em] text-heading sm:text-5xl lg:text-6xl"
            >
              Four capabilities.
              <span className="block text-muted-foreground">
                One connected growth system.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="max-w-lg text-sm leading-7 text-body sm:text-base"
          >
            Instead of treating marketing, technology, product, and sales as
            separate problems, we connect them into one commercial system.
          </motion.p>
        </div>

        {/* Experience */}
        <div className="mt-14 overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
          <div className="grid min-h-[620px] lg:grid-cols-[0.34fr_0.66fr]">
            {/* Service rail */}
            <div className="border-b border-border bg-muted/30 lg:border-b-0 lg:border-r">
              <div className="flex overflow-x-auto lg:block">
                {services.map((service) => {
                  const Icon = service.icon;
                  const isActive = service.id === activeId;

                  return (
                    <button
                      key={service.id}
                      type="button"
                      onMouseEnter={() => setActiveId(service.id)}
                      onFocus={() => setActiveId(service.id)}
                      onClick={() => setActiveId(service.id)}
                      className={`
                        group relative min-w-[220px] flex-1 border-r border-border
                        px-5 py-6 text-left transition-colors duration-300
                        last:border-r-0
                        lg:min-w-0 lg:border-b lg:border-r-0 lg:px-7 lg:py-8
                        lg:last:border-b-0
                        ${
                          isActive
                            ? "bg-navy text-white"
                            : "bg-transparent text-foreground hover:bg-card"
                        }
                      `}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="service-indicator"
                          className="absolute bottom-0 left-0 h-[3px] w-full bg-secondary lg:bottom-auto lg:left-0 lg:top-0 lg:h-full lg:w-[3px]"
                          transition={{
                            type: "spring",
                            stiffness: 320,
                            damping: 30,
                          }}
                        />
                      )}

                      <div className="flex items-start justify-between gap-4">
                        <div
                          className={`
                            flex h-10 w-10 items-center justify-center
                            border transition-all duration-300
                            ${
                              isActive
                                ? "border-secondary/35 bg-secondary/10 text-gold-light"
                                : "border-border bg-card text-secondary"
                            }
                          `}
                        >
                          <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                        </div>

                        <span
                          className={`text-[10px] font-semibold tracking-[0.18em] ${
                            isActive
                              ? "text-white/30"
                              : "text-muted-foreground/50"
                          }`}
                        >
                          {service.number}
                        </span>
                      </div>

                      <div className="mt-8">
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${
                            isActive ? "text-gold-light" : "text-secondary"
                          }`}
                        >
                          {service.shortTitle}
                        </span>

                        <h3 className="mt-2 max-w-[180px] text-lg font-semibold tracking-[-0.02em]">
                          {service.title}
                        </h3>
                      </div>

                      <motion.div
                        initial={false}
                        animate={{
                          x: isActive ? 0 : -8,
                          opacity: isActive ? 1 : 0,
                        }}
                        className="mt-5 flex items-center gap-2 text-xs font-medium text-gold-light"
                      >
                        Explore capability
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </motion.div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active service */}
            <div className="relative overflow-hidden bg-card">
              {/* Huge changing number */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={`number-${activeService.id}`}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.05,
                    y: -20,
                  }}
                  transition={{ duration: 0.4 }}
                  className="pointer-events-none absolute -right-5 -top-16 select-none text-[13rem] font-semibold tracking-[-0.08em] text-navy/[0.025] sm:text-[18rem]"
                >
                  {activeService.number}
                </motion.span>
              </AnimatePresence>

              {/* Moving gold orb */}
              <motion.div
                key={`orb-${activeService.id}`}
                initial={{ x: 80, y: -40, opacity: 0 }}
                animate={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 18,
                }}
                className="pointer-events-none absolute right-[12%] top-[18%] h-36 w-36"
              >
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, 8, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative h-full w-full"
                >
                  <div className="absolute inset-0 rounded-full border border-secondary/20" />
                  <div className="absolute inset-[16%] rounded-full border border-secondary/25" />
                  <div className="absolute inset-[34%] rounded-full bg-secondary/15" />

                  <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-secondary shadow-[0_0_18px_rgb(166_124_39/0.65)]" />
                </motion.div>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{
                    opacity: 0,
                    x: 32,
                    filter: "blur(5px)",
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    x: -18,
                    filter: "blur(4px)",
                  }}
                  transition={{
                    duration: 0.38,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative flex h-full flex-col justify-between p-7 sm:p-10 lg:p-12"
                >
                  <div>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center bg-navy text-gold-light shadow-[var(--shadow-action)]">
                        <ActiveIcon className="h-5 w-5" strokeWidth={1.8} />
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          Service {activeService.number}
                        </p>

                        <p className="mt-1 text-sm font-semibold text-secondary">
                          {activeService.metric}
                        </p>
                      </div>
                    </div>

                    <h3 className="mt-9 max-w-xl text-3xl font-semibold tracking-[-0.04em] text-heading sm:text-4xl lg:text-5xl">
                      {activeService.statement}
                    </h3>

                    <p className="mt-6 max-w-2xl text-base leading-8 text-body">
                      {activeService.description}
                    </p>
                  </div>

                  <div className="mt-12 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
                    {/* Capabilities */}
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Key capabilities
                      </p>

                      <div className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                        {activeService.features.map((feature, index) => (
                          <motion.div
                            key={feature}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.08 + index * 0.07,
                              duration: 0.35,
                            }}
                            className="group flex items-center gap-3"
                          >
                            <span className="flex h-6 w-6 items-center justify-center border border-secondary/20 bg-secondary/[0.06] text-[9px] font-semibold text-secondary">
                              0{index + 1}
                            </span>

                            <span className="text-sm font-medium text-foreground/75">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <motion.button
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      className="group flex items-center gap-3 text-sm font-semibold text-navy"
                    >
                      Explore service
                      <span className="flex h-9 w-9 items-center justify-center bg-navy text-white transition-colors duration-300 group-hover:bg-secondary">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-7 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-2xl text-muted-foreground">
            Most engagements combine multiple capabilities into one integrated
            programme.
          </p>

          <p className="font-semibold text-navy">
            Strategy → Build → Acquire → Scale
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
