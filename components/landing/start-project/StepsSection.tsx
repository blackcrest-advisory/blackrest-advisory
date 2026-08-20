// components/landing/start-project/StepsSection.tsx

"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CircleDot,
  FileCheck,
  FileText,
  Phone,
  Rocket,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Project Inquiry",
    label: "Submit",
    description:
      "Tell us what you are trying to build, improve, launch, or solve. A clear direction is useful, but a perfect brief is not required.",
    outcome: "Initial business and project context",
  },
  {
    number: "02",
    icon: Phone,
    title: "Discovery Call",
    label: "Align",
    description:
      "We review your enquiry, clarify the objectives, understand constraints, and make sure Blackcrest is the right fit for the engagement.",
    outcome: "Shared understanding of scope and priorities",
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Proposal & Planning",
    label: "Define",
    description:
      "We shape the recommended engagement model, delivery approach, timeline, responsibilities, and commercial proposal.",
    outcome: "Clear plan before commitment",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Project Kickoff",
    label: "Launch",
    description:
      "Once approved, we establish the delivery workspace, confirm ownership, align the first priorities, and begin execution.",
    outcome: "Structured, accountable start",
  },
];

export const StepsSection = () => {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <Section className="relative overflow-hidden bg-background py-16 text-foreground transition-colors duration-300 sm:py-20 lg:py-28">
      {/* Background architecture */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -right-48 -top-32 h-[38rem] w-[38rem] opacity-55"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 8%, transparent), transparent 70%)",
          }}
        />

        <div
          className="absolute inset-0 hidden opacity-[0.14] lg:block"
          style={{
            backgroundImage: `
              linear-gradient(
                to right,
                var(--color-border) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "25% 100%",
          }}
        />
      </div>

      <Container className="relative">
        {/* Header */}
        <div className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <motion.div
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : -18,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex items-center gap-3">
              <CircleDot className="h-4 w-4 text-secondary" />

              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-secondary">
                Start a project / 04 stages
              </span>

              <span className="h-px w-12 bg-secondary/40" />
            </div>

            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-heading sm:text-5xl lg:text-[3.8rem] lg:leading-[1.04]">
              From first enquiry
              <span className="block text-muted-foreground">
                to a confident start.
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 14,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="lg:justify-self-end"
          >
            <p className="max-w-xl text-sm leading-7 text-body sm:text-base">
              Starting a project should feel structured, transparent, and
              simple. Here&apos;s what happens after you send your enquiry.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="text-xs text-muted-foreground">
                Clear ownership
              </span>

              <span className="h-1 w-1 rounded-full bg-secondary" />

              <span className="text-xs text-muted-foreground">
                Defined next steps
              </span>

              <span className="h-1 w-1 rounded-full bg-secondary" />

              <span className="text-xs text-muted-foreground">
                No unnecessary friction
              </span>
            </div>
          </motion.div>
        </div>

        {/* Process rail */}
        <div className="relative border-b border-border">
          {/* Desktop connecting rail */}
          <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[56px] hidden h-px bg-border lg:block"/>

          <motion.div
            initial={{
              scaleX: reduceMotion ? 1 : 0,
            }}
            whileInView={{
              scaleX: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[56px] hidden h-px origin-left bg-gradient-to-r from-secondary via-secondary/50 to-secondary/10 lg:block"
          />

          <div className="grid lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.number}
                  initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 22,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.25,
                  }}
                  transition={{
                    delay: index * 0.09,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`
                    group relative
                    border-b border-border
                    py-8
                    lg:min-h-[390px]
                    lg:border-b-0
                    lg:px-6
                    ${index > 0 ? "lg:border-l" : ""}
                    ${index === 0 ? "lg:pl-0" : ""}
                    ${index === steps.length - 1 ? "lg:pr-0" : ""}
                  `}
                >
                  {/* Node */}
                  <div className="relative z-10 flex items-center gap-4">
                    <motion.div
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              rotate: -6,
                              scale: 1.05,
                            }
                      }
                      className="flex h-12 w-12 shrink-0 items-center justify-center border border-border bg-background text-muted-foreground shadow-[var(--shadow-card)] transition-all duration-300 group-hover:border-secondary/30 group-hover:bg-secondary/[0.07] group-hover:text-secondary group-hover:shadow-[var(--shadow-gold-glow)]"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>

                    <div>
                      <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-secondary">
                        Stage {step.number}
                      </span>

                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {step.label}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold tracking-[-0.025em] text-heading sm:text-2xl">
                      {step.title}
                    </h2>

                    <p className="mt-4 max-w-sm text-sm leading-7 text-body">
                      {step.description}
                    </p>
                  </div>

                  {/* Outcome */}
                  <div className="mt-8 border-t border-border pt-5">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/[0.08]">
                        <Check className="h-3 w-3 text-secondary" />
                      </div>

                      <div>
                        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/45">
                          Outcome
                        </p>

                        <p className="mt-1 text-xs font-medium leading-5 text-foreground">
                          {step.outcome}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Hover signal */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-full overflow-hidden">
                    <div className="h-full w-0 bg-secondary transition-all duration-500 group-hover:w-full"/>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Closing strip */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-xl text-xs leading-6 text-muted-foreground">
            Once we understand the opportunity, we&apos;ll recommend the most
            sensible engagement structure — not automatically the largest one.
          </p>

          <div className="flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.16em] text-muted-foreground/40">
            Enquire
            <ArrowRight className="h-3 w-3 text-secondary" />
            Align
            <ArrowRight className="h-3 w-3 text-secondary" />
            Plan
            <ArrowRight className="h-3 w-3 text-secondary" />
            Launch
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};
