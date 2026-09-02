"use client";

//===== imports =====//
import { motion, useReducedMotion } from "framer-motion";

import {
  Eye,
  HeartHandshake,
  Mail,
  MessageCircle,
  RefreshCw,
  Rocket,
} from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";

//==============================================================//
// EXPERIENCE DATA
//==============================================================//

const steps = [
  {
    id: 1,
    label: "You Contact Us",
    description:
      "Tell us about your goals, challenges and what you want to build.",
    meta: "Start",
    icon: Mail,
  },
  {
    id: 2,
    label: "Strategy Call",
    description:
      "We align on scope, priorities, users and the right path forward.",
    meta: "Align",
    icon: MessageCircle,
  },
  {
    id: 3,
    label: "Design Preview",
    description:
      "You see the direction early and can shape the experience with us.",
    meta: "Preview",
    icon: Eye,
  },
  {
    id: 4,
    label: "Weekly Updates",
    description:
      "Clear progress updates keep you informed throughout development.",
    meta: "Progress",
    icon: RefreshCw,
  },
  {
    id: 5,
    label: "Launch",
    description:
      "We test, refine and release your new digital experience with confidence.",
    meta: "Go Live",
    icon: Rocket,
  },
  {
    id: 6,
    label: "Ongoing Support",
    description:
      "We stay available after launch for improvements, support and growth.",
    meta: "Support",
    icon: HeartHandshake,
  },
];

//==============================================================//
// EXPERIENCE TIMELINE
//==============================================================//

export default function ExperienceTimeline() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section className="relative bg-background py-16 sm:py-20 lg:py-28">
      <Container>
        {/*===== HEADER =====*/}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-end lg:gap-16">
          {/* left */}
          <motion.div
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 12,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.45,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-secondary">
                07 / Your Experience
              </span>

              <span className="h-px w-10 bg-secondary/35"/>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
              Clear communication, visible progress and no mystery about what
              happens next.
            </p>
          </motion.div>

          {/* right */}
          <motion.div
            initial={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    y: 14,
                  }
            }
            whileInView={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 1,
                    y: 0,
                  }
            }
            viewport={{
              once: true,
              amount: 0.35,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <h2 className="max-w-4xl text-3xl font-semibold leading-[1.03] tracking-[-0.045em] text-heading sm:text-4xl lg:text-5xl xl:text-[56px]">
              You always know
              <span className="block text-secondary">what happens next.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-body sm:text-base sm:leading-8">
              From the first conversation to post-launch support, we keep the
              process clear, collaborative and easy to follow.
            </p>
          </motion.div>
        </div>

        {/*===== JOURNEY =====*/}

        <div className="relative mt-12 lg:mt-16">
          {/* desktop line */}
          <div
            aria-hidden="true"
            className="absolute left-[8%] right-[8%] top-[25px] hidden h-px bg-border lg:block"
          />

          {/* active gold section */}
          <div
            aria-hidden="true"
            className="absolute left-[8%] right-[8%] top-[25px] hidden h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent lg:block"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-3">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.id}
                  initial={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: 0,
                          y: 14,
                        }
                  }
                  whileInView={
                    shouldReduceMotion
                      ? undefined
                      : {
                          opacity: 1,
                          y: 0,
                        }
                  }
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.045,
                  }}
                  className="group relative min-w-0"
                >
                  {/*===== TOP NODE =====*/}

                  <div className="relative z-10 flex items-center gap-3 lg:flex-col lg:items-center lg:text-center">
                    <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center border border-border bg-background text-secondary transition-all duration-300 group-hover:border-secondary/30 group-hover:bg-secondary/[0.04]">
                      <Icon className="h-4.5 w-4.5" />
                    </div>

                    <div className="lg:hidden">
                      <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.14em] text-secondary">
                        {String(step.id).padStart(2, "0")} / {step.meta}
                      </span>
                    </div>
                  </div>

                  {/*===== CARD =====*/}

                  <div className="mt-4 border border-border bg-card px-5 py-5 transition-all duration-300 group-hover:border-secondary/25 group-hover:shadow-[var(--shadow-card)] lg:mt-5 lg:min-h-[190px] lg:px-4">
                    <div className="hidden items-center justify-between gap-2 lg:flex">
                      <span className="font-mono text-[7px] font-semibold text-secondary">
                        {String(step.id).padStart(2, "0")}
                      </span>

                      <span className="font-mono text-[6px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/30">
                        {step.meta}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold tracking-[-0.02em] text-heading lg:mt-5">
                      {step.label}
                    </h3>

                    <p className="mt-3 text-xs leading-5 text-muted-foreground">
                      {step.description}
                    </p>

                    {/* subtle bottom signal */}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-[2px] w-0 bg-secondary transition-all duration-500 group-hover:w-10"
                    />
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/*===== COMMUNICATION STATEMENT =====*/}

        <div className="mt-10 grid overflow-hidden border border-border bg-card md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="px-5 py-5 sm:px-6">
            <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
              Communication standard
            </span>

            <p className="mt-2 text-base font-medium tracking-[-0.015em] text-heading">
              Transparent process. Consistent communication. No surprises.
            </p>
          </div>

          <div className="flex items-center gap-6 border-t border-border bg-muted/15 px-5 py-5 md:border-l md:border-t-0 sm:px-6">
            <div>
              <span className="block font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/35">
                Updates
              </span>

              <span className="mt-1 block text-xs font-semibold text-heading">
                Weekly
              </span>
            </div>

            <span className="h-8 w-px bg-border"/>

            <div>
              <span className="block font-mono text-[7px] font-semibold uppercase tracking-[0.13em] text-muted-foreground/35">
                Support
              </span>

              <span className="mt-1 block text-xs font-semibold text-heading">
                Ongoing
              </span>
            </div>
          </div>
        </div>

        {/*===== FOOTER =====*/}

        <div className="mt-7 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[7px] font-semibold uppercase tracking-[0.15em] text-secondary">
            Contact → Collaborate → Build → Launch → Support
          </span>

          <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted-foreground/30">
            Blackcrest / Client Experience
          </span>
        </div>
      </Container>
    </Section>
  );
}
