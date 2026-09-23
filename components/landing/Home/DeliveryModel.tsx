"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Network,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const coreResponsibilities = [
  "An agreed plan and priorities",
  "Regular updates in plain language",
  "Checks on quality and progress",
  "One main point of contact",
];

const partnerCapabilities = [
  "Website and app development",
  "Design, marketing, and sales support",
  "Extra support when the work needs it",
  "Skills matched to your business needs",
];

const steps = [
  {
    number: "01",
    title: "Understand",
    description: "We listen to your idea and what you need help with.",
  },
  {
    number: "02",
    title: "Plan",
    description: "We agree the priorities, work, and next steps.",
  },
  {
    number: "03",
    title: "Deliver",
    description: "We carry out the agreed work and keep you informed.",
  },
  {
    number: "04",
    title: "Improve",
    description: "We review progress and decide what to focus on next.",
  },
];

export default function DeliveryModel() {
  return (
    <Section className="relative overflow-hidden bg-muted/20">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-[28%] h-[38rem] w-[38rem] -translate-x-1/2 rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgb(166 124 39 / 0.08), transparent 67%)",
          }}
        />

        <motion.div
          className="absolute left-1/2 top-[19%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full border border-border/40"
          animate={{ rotate: 360 }}
          transition={{
            duration: 70,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute left-1/2 top-[26%] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full border border-secondary/10"
          animate={{ rotate: -360 }}
          transition={{
            duration: 52,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <Container className="relative">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary"
          >
            <Workflow className="h-4 w-4" />
            How we work with you
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-heading sm:text-5xl lg:text-[3.35rem] lg:leading-[1.04]"
          >
            One team to guide you.
            <span className="block text-muted-foreground">
              Support to get things done.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-8 text-body"
          >
            You work directly with Blackcrest from the first conversation. We
            help plan the work, bring in specialist partners when needed, and
            keep you informed so you know what is happening.
          </motion.p>
        </div>

        {/* Delivery system */}
        <div className="relative mt-16">
          {/* Desktop connector */}
          <div className="pointer-events-none absolute left-1/2 top-[120px] hidden h-px w-[70%] -translate-x-1/2 bg-border lg:block" />

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.25,
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="pointer-events-none absolute left-1/2 top-[120px] hidden h-px w-[70%] -translate-x-1/2 origin-center bg-gradient-to-r from-transparent via-secondary/50 to-transparent lg:block"
          />

          <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr_1fr] lg:items-center">
            {/* Core team */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative border border-border bg-card p-7 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center bg-navy text-gold-light">
                  <Users className="h-5 w-5" strokeWidth={1.8} />
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
                  Core
                </span>
              </div>

              <h3 className="mt-7 text-2xl font-semibold tracking-[-0.03em] text-heading">
                Your Blackcrest team
              </h3>

              <p className="mt-3 text-sm leading-7 text-body">
                We help you make decisions, agree the next steps, and keep the
                work focused on your business.
              </p>

              <div className="mt-6 space-y-3 border-t border-border pt-5">
                {coreResponsibilities.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-foreground/75"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary/10">
                      <Check className="h-3 w-3 text-secondary" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-secondary transition-all duration-500 group-hover:w-full" />
            </motion.div>

            {/* Blackcrest control center */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.15,
                type: "spring",
                stiffness: 140,
                damping: 18,
              }}
              className="relative mx-auto flex h-56 w-56 items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 24,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border border-secondary/20"
              />

              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-5 rounded-full border border-dashed border-border"
              />

              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full bg-navy text-center shadow-[var(--shadow-overlay)]"
              >
                <ShieldCheck className="h-6 w-6 text-gold-light" />

                <span className="mt-2 text-sm font-semibold text-white">
                  Blackcrest
                </span>

                <span className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/40">
                  Clear oversight
                </span>
              </motion.div>

              {/* Orbit nodes */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0"
              >
                <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-secondary shadow-[0_0_18px_rgb(166_124_39/0.45)]" />
              </motion.div>
            </motion.div>

            {/* Partner network */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative border border-border bg-card p-7 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center border border-secondary/20 bg-secondary/[0.07] text-secondary">
                  <Network className="h-5 w-5" strokeWidth={1.8} />
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-secondary">
                  Network
                </span>
              </div>

              <h3 className="mt-7 text-2xl font-semibold tracking-[-0.03em] text-heading">
                The right specialists
              </h3>

              <p className="mt-3 text-sm leading-7 text-body">
                When your business needs skills in development, design, marketing,
                or sales, we involve specialist partners and coordinate their work.
              </p>

              <div className="mt-6 space-y-3 border-t border-border pt-5">
                {partnerCapabilities.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-foreground/75"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary/10">
                      <Check className="h-3 w-3 text-secondary" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              <div className="absolute bottom-0 right-0 h-[2px] w-0 bg-secondary transition-all duration-500 group-hover:w-full" />
            </motion.div>
          </div>
        </div>

        {/* Assurance strip */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-10 flex flex-col gap-5 border border-secondary/15 bg-secondary/[0.045] px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-start gap-4">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />

            <div>
              <p className="text-sm font-semibold text-heading">
                One clear point of contact
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                You keep one main point of contact at Blackcrest, even when
                specialist partners are involved.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-secondary">
            Focused
            <ArrowRight className="h-3 w-3" />
            Coordinated
            <ArrowRight className="h-3 w-3" />
            Flexible
          </div>
        </motion.div>

        {/* Process */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
                Your next steps
              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-heading sm:text-3xl">
                A simple process, from day one.
              </h3>
            </div>

            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              We agree what you need, explain the work, and review progress
              together as your business takes shape.
            </p>
          </motion.div>

          <div className="relative mt-10 grid gap-8 md:grid-cols-4">
            <div className="absolute left-0 top-5 hidden h-px w-full bg-border md:block" />

            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                }}
                className="relative"
              >
                <div className="relative z-10 flex h-10 w-10 items-center justify-center border border-secondary/30 bg-background text-xs font-semibold text-secondary">
                  {step.number}
                </div>

                <h4 className="mt-5 text-base font-semibold text-heading">
                  {step.title}
                </h4>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
