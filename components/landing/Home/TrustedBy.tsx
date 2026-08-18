"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  Building2,
  Check,
  Globe2,
  Users2,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

const stats = [
  {
    number: "100+",
    label: "Businesses supported",
    description:
      "Growing companies supported with digital strategy, engineering, and execution.",
    icon: Users2,
  },
  {
    number: "5+",
    label: "European markets",
    description:
      "Experience working across multiple European business markets.",
    icon: Globe2,
  },
  {
    number: "99%",
    label: "Client satisfaction",
    description:
      "Built around clear communication, quality, and measurable outcomes.",
    icon: Award,
  },
  {
    number: "50+",
    label: "Projects delivered",
    description:
      "From focused launches to larger digital transformation projects.",
    icon: Building2,
  },
];

const trustPoints = [
  "Strategy-led execution",
  "Direct senior communication",
  "Built for long-term partnerships",
];

export default function TrustedBy() {
  return (
    <Section className="relative overflow-hidden border-y border-border/50 bg-background">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/[0.055] blur-[130px]" />

        <div
          className="
            absolute inset-0 opacity-[0.025]
            [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)]
            [background-size:64px_64px]
          "
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>

      <Container className="relative">
        <div className="grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Left content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="lg:sticky lg:top-28"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1.5 shadow-sm backdrop-blur-xl"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-30" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>

              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Proven Partnership
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="mt-6 max-w-xl text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]"
            >
              Trusted where
              <span className="text-muted-foreground"> results matter.</span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg"
            >
              European businesses choose us when they need more than a service
              provider — they need a digital partner that understands growth,
              execution, and accountability.
            </motion.p>

            {/* Trust points */}
            <motion.div variants={fadeInUp} className="mt-8 space-y-3">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 text-sm font-medium text-foreground/80"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                    <Check className="h-3 w-3 text-primary" strokeWidth={2.5} />
                  </div>

                  {point}
                </div>
              ))}
            </motion.div>

            {/* Small trust footer */}
            <motion.div
              variants={fadeInUp}
              className="mt-10 flex items-center gap-4 border-t border-border/60 pt-6"
            >
              <div className="flex -space-x-2">
                {["BC", "EU", "01"].map((item) => (
                  <div
                    key={item}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-bold text-muted-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div>
                <p className="text-sm font-medium text-foreground">
                  Built on repeat business
                </p>
                <p className="text-xs text-muted-foreground">
                  Relationships over transactions
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Metrics */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {/* Featured stat */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="group relative overflow-hidden rounded-[2rem] border border-border/70 bg-foreground p-7 text-background shadow-[0_24px_80px_-35px_rgba(0,0,0,0.45)] sm:col-span-2 sm:p-9"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />

              <div className="pointer-events-none absolute right-7 top-7 opacity-10">
                <Users2 className="h-28 w-28" strokeWidth={1} />
              </div>

              <div className="relative flex min-h-[250px] flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-background/15 bg-background/10 backdrop-blur">
                    <Users2 className="h-5 w-5" />
                  </div>

                  <ArrowUpRight className="h-5 w-5 text-background/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-background" />
                </div>

                <div className="mt-12">
                  <div className="flex items-end gap-3">
                    <span className="text-6xl font-semibold tracking-[-0.06em] sm:text-7xl">
                      {stats[0].number}
                    </span>

                    <span className="mb-2 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                      and growing
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-medium">{stats[0].label}</h3>

                  <p className="mt-2 max-w-md text-sm leading-6 text-background/60">
                    {stats[0].description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Supporting stats */}
            {stats.slice(1).map((stat, index) => {
              const Icon = stat.icon;

              return (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className={`group relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-card p-6 transition-[border-color,box-shadow] duration-300 hover:border-primary/20 hover:shadow-[0_20px_60px_-35px_rgba(0,0,0,0.3)] ${
                    index === 2 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="absolute right-0 top-0 h-28 w-28 translate-x-10 -translate-y-10 rounded-full bg-primary/[0.06] blur-2xl transition-transform duration-500 group-hover:scale-150" />

                  <div
                    className={`relative ${
                      index === 2
                        ? "sm:flex sm:items-end sm:justify-between"
                        : ""
                    }`}
                  >
                    <div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-muted/50 text-muted-foreground transition-colors duration-300 group-hover:border-primary/20 group-hover:bg-primary/10 group-hover:text-primary">
                        <Icon className="h-5 w-5" strokeWidth={1.8} />
                      </div>

                      <p className="mt-8 text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">
                        {stat.number}
                      </p>

                      <h3 className="mt-2 text-sm font-semibold text-foreground">
                        {stat.label}
                      </h3>
                    </div>

                    <p
                      className={`mt-3 text-sm leading-6 text-muted-foreground ${
                        index === 2 ? "sm:mt-0 sm:max-w-xs sm:text-right" : ""
                      }`}
                    >
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 flex flex-col gap-4 border-t border-border/60 pt-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            We measure success through business impact — not vanity metrics,
            unnecessary complexity, or endless deliverables.
          </p>

          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            Blackcrest
            <span className="h-1 w-1 rounded-full bg-primary" />
            Digital growth partner
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
