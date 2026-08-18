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
  "Strategy & commercial direction",
  "Client communication",
  "Quality assurance",
  "Project ownership",
];

const partnerCapabilities = [
  "Specialist engineering",
  "Platform-specific expertise",
  "Regional & market knowledge",
  "Flexible delivery capacity",
];

const steps = [
  {
    number: "01",
    title: "Understand",
    description: "Goals, challenges and commercial priorities.",
  },
  {
    number: "02",
    title: "Design",
    description: "The right strategy, team and delivery approach.",
  },
  {
    number: "03",
    title: "Execute",
    description: "Core team leads delivery with specialists when needed.",
  },
  {
    number: "04",
    title: "Improve",
    description: "Measure outcomes, optimise and support the next stage.",
  },
];

export default function DeliveryModel() {
  return (
    <Section className="relative overflow-hidden bg-background">
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
            Delivery model
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-heading sm:text-5xl lg:text-6xl"
          >
            Senior ownership.
            <span className="block text-muted-foreground">
              Specialist depth when needed.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-8 text-body"
          >
            Blackcrest combines a focused internal team with a curated network
            of specialists — giving clients consistency at the core and
            flexibility at the edges.
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
                In-House Core Team
              </h3>

              <p className="mt-3 text-sm leading-7 text-body">
                The Blackcrest team owns the relationship, strategy, delivery
                direction, and quality from beginning to end.
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
                  Delivery Control
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
                Specialist Partner Network
              </h3>

              <p className="mt-3 text-sm leading-7 text-body">
                When a project needs niche expertise or additional capacity, we
                bring in vetted specialists under Blackcrest supervision.
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
                One accountable partner
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                You always work through Blackcrest — never a disconnected chain
                of freelancers or third parties.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-secondary">
            Controlled
            <ArrowRight className="h-3 w-3" />
            Flexible
            <ArrowRight className="h-3 w-3" />
            Scalable
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
                How delivery moves
              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-heading sm:text-3xl">
                From business problem to measurable outcome.
              </h3>
            </div>

            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Every engagement follows a clear operating rhythm, while remaining
              flexible enough for the needs of each client.
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
