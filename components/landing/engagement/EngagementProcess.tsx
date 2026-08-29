"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Rocket, Search, Target, TrendingUp } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const steps = [
  {
    number: "01",
    title: "Understand",
    description:
      "We clarify the challenge, the people it affects, and the outcome that matters most.",
    icon: Search,
  },
  {
    number: "02",
    title: "Plan",
    description:
      "We agree a practical scope, priorities, and a delivery path that fits the work.",
    icon: Target,
  },
  {
    number: "03",
    title: "Build",
    description:
      "We deliver with clear ownership, regular updates, and focused execution.",
    icon: Rocket,
  },
  {
    number: "04",
    title: "Improve",
    description:
      "We review the progress, learn from the work, and choose the right next step.",
    icon: TrendingUp,
  },
];

export const EngagementProcess = () => {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <Section id="process" className="relative overflow-hidden bg-navy-deep text-white">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute right-[-16rem] top-[-14rem] h-[38rem] w-[38rem]"
          style={{
            background:
              "radial-gradient(circle, rgb(166 124 39 / 0.14), transparent 68%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.65) 1px, transparent 1px)",
            backgroundSize: "25% 100%",
          }}
        />
      </div>

      <Container className="relative">
        <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, x: reduceMotion ? 0 : -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-gold-light">
                A simple working rhythm
              </span>
              <span className="h-px w-12 bg-secondary/45" />
            </div>

            <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-[3.35rem] lg:leading-[1.04]">
              Clear from the start.
              <span className="block text-white/40">Useful at every step.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="max-w-xl text-sm leading-7 text-white/55 sm:text-base lg:justify-self-end"
          >
            The process stays simple: understand the real need, decide what is
            useful, deliver with visibility, and improve from what we learn.
          </motion.p>
        </div>

        <div className="relative grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:py-12">
          <div className="absolute left-[12.5%] right-[12.5%] top-[4.1rem] hidden h-px bg-white/10 lg:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className={`relative ${index > 0 ? "lg:border-l lg:border-white/10 lg:pl-7" : "lg:pr-7"} ${index < steps.length - 1 ? "lg:pr-7" : ""}`}
              >
                <div className="relative z-10 flex h-12 w-12 items-center justify-center border border-secondary/30 bg-navy-deep text-gold-light shadow-[0_0_0_5px_rgb(7_18_35/1)]">
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                </div>

                <div className="mt-7 flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold tracking-[-0.025em] text-white">
                    {step.title}
                  </h3>
                  <span className="font-mono text-[10px] font-semibold tracking-[0.15em] text-gold-light/65">
                    {step.number}
                  </span>
                </div>

                <p className="mt-3 max-w-xs text-sm leading-7 text-white/50">
                  {step.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center border border-secondary/20 bg-secondary/[0.08] text-gold-light">
              <Check className="h-3.5 w-3.5" />
            </div>
            <p className="text-sm text-white/55">
              You stay informed about priorities, progress, and the decisions
              shaping the work.
            </p>
          </div>

          <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-white/35">
            Understand / Plan / Build / Improve
          </span>
        </div>
      </Container>
    </Section>
  );
};
