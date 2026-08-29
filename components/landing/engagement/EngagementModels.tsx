"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Clock3, FolderKanban, Layers3 } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const models = [
  {
    number: "01",
    title: "Project work",
    eyebrow: "A defined outcome",
    description:
      "For a clearly scoped website, mobile application, campaign, or sales-support initiative.",
    icon: FolderKanban,
    details: ["Clear scope and priorities", "Practical delivery plan", "Agreed milestones"],
  },
  {
    number: "02",
    title: "Ongoing support",
    eyebrow: "Continued progress",
    description:
      "For businesses that need regular digital, marketing, or commercial support as priorities evolve.",
    icon: Clock3,
    details: ["Regular planning and updates", "Flexible priorities", "Continuous improvement"],
  },
  {
    number: "03",
    title: "Flexible partnership",
    eyebrow: "Support that adapts",
    description:
      "For a mix of planned work and additional specialist support when a project needs it.",
    icon: Layers3,
    details: ["Connected capabilities", "Support matched to scope", "One clear point of contact"],
  },
];

export const EngagementModels = () => {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <Section
      id="engagement-models"
      className="relative overflow-hidden border-y border-border bg-muted/20"
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -right-40 -top-40 h-[34rem] w-[34rem] opacity-60"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 8%, transparent), transparent 68%)",
          }}
        />
      </div>

      <Container className="relative">
        <div className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, x: reduceMotion ? 0 : -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-secondary">
                Ways to work together
              </span>
              <span className="h-px w-12 bg-secondary/40" />
            </div>

            <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.045em] text-heading sm:text-5xl lg:text-[3.35rem] lg:leading-[1.04]">
              Choose the support
              <span className="block text-muted-foreground">
                that fits what you need now.
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="max-w-xl text-sm leading-7 text-body sm:text-base lg:justify-self-end"
          >
            There is no need to commit to more than the work requires. We can
            start with one focused project, provide ongoing support, or combine
            the right capabilities around a wider goal.
          </motion.p>
        </div>

        <div className="grid border-b border-border md:grid-cols-3">
          {models.map((model, index) => {
            const Icon = model.icon;

            return (
              <motion.article
                key={model.title}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className={`group relative flex min-h-[320px] flex-col border-b border-border py-8 md:border-b-0 md:px-7 ${index > 0 ? "md:border-l" : ""} ${index === 0 ? "md:pl-0" : ""} ${index === models.length - 1 ? "md:pr-0" : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center border border-secondary/20 bg-secondary/[0.06] text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-secondary-foreground">
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                  </div>
                  <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-muted-foreground/45">
                    {model.number}
                  </span>
                </div>

                <p className="mt-7 font-mono text-[9px] font-semibold uppercase tracking-[0.17em] text-secondary">
                  {model.eyebrow}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-heading">
                  {model.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-body">
                  {model.description}
                </p>

                <div className="mt-6 space-y-2.5 border-t border-border pt-5">
                  {model.details.map((detail) => (
                    <div key={detail} className="flex items-center gap-2.5 text-sm text-foreground/75">
                      <Check className="h-3.5 w-3.5 shrink-0 text-secondary" />
                      {detail}
                    </div>
                  ))}
                </div>

                <Button
                  variant="link"
                  size="sm"
                  href="/start-project"
                  className="group/link mt-auto w-fit pt-7"
                >
                  Discuss this option
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </Button>

                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-secondary transition-all duration-500 group-hover:w-full" />
              </motion.article>
            );
          })}
        </div>

        <p className="pt-6 text-center text-sm text-muted-foreground">
          Not sure which option fits? Start with the challenge and we will help
          you choose a practical first step.
        </p>
      </Container>
    </Section>
  );
};
